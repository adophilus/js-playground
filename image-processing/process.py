"""Image pipeline: ingest raw images, remove the 'sample' watermark.

Usage:
    python process.py ingest            # load mr/ -> DB as 'raw'
    python process.py prototype [N]     # process N images to prototype/ for review
    python process.py watermark         # produce 'without_watermark' for all (resumable)
    python process.py count             # show row counts
"""
from __future__ import annotations

import io
import sys
from pathlib import Path

import cv2
import numpy as np
import pytesseract
from PIL import Image

import db

ROOT = Path(__file__).parent
SRC = ROOT / "mr"
IMAGE_EXTS = {".jpg", ".jpeg"}
JPEG_Q = 95


# --- image I/O (EXIF-preserving) -----------------------------------------

def decode(data: bytes):
    """JPEG bytes -> (BGR ndarray, exif_bytes)."""
    pil = Image.open(io.BytesIO(data))
    exif = pil.info.get("exif", b"")
    rgb = np.array(pil.convert("RGB"))
    return cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR), exif


def encode(bgr, exif: bytes = b"") -> bytes:
    """BGR ndarray -> JPEG bytes (quality 95, EXIF reattached)."""
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    buf = io.BytesIO()
    Image.fromarray(rgb).save(buf, format="JPEG", quality=JPEG_Q, exif=exif)
    return buf.getvalue()


# --- watermark detection + removal ---------------------------------------

def find_sample_mask(img):
    """Locate the 'sample' watermark via OCR. Returns (mask, found)."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    h, w = gray.shape
    mask = np.zeros((h, w), np.uint8)
    found = False
    for i, txt in enumerate(data["text"]):
        if "sample" in (txt or "").lower():
            x, y, ww, hh = (data["left"][i], data["top"][i],
                            data["width"][i], data["height"][i])
            cv2.rectangle(mask, (x, y), (x + ww, y + hh), 255, -1)
            found = True
    # dilate to cover anti-aliased edges of the text strokes
    mask = cv2.dilate(mask, np.ones((9, 9), np.uint8), iterations=2)
    return mask, found


def remove_watermark(img):
    """Inpaint over the 'sample' watermark. Returns result or None if none found."""
    mask, found = find_sample_mask(img)
    if not found:
        return None
    return cv2.inpaint(img, mask, 5, cv2.INPAINT_TELEA)


# --- commands ------------------------------------------------------------

def cmd_ingest():
    files = sorted(p for p in SRC.rglob("*") if p.suffix.lower() in IMAGE_EXTS)
    conn = db.connect()
    n = 0
    for path in files:
        data = path.read_bytes()
        fid = db.insert_file(conn, data)
        db.insert_image(conn, "raw", fid)
        conn.commit()
        n += 1
    conn.close()
    print(f"ingested {n} raw images into {db.DB_PATH}")


def cmd_prototype(n: int = 5):
    """Process the first N raw images, writing original/mask/result to prototype/."""
    out = ROOT / "prototype"
    out.mkdir(exist_ok=True)
    conn = db.connect()
    rows = list(db.raw_images(conn))[:n]
    detected = 0
    for idx, (image_id, data) in enumerate(rows, 1):
        img, exif = decode(data)
        mask, found = find_sample_mask(img)
        tag = "hit" if found else "MISS"
        if found:
            detected += 1
            result = cv2.inpaint(img, mask, 5, cv2.INPAINT_TELEA)
        else:
            result = img
        overlay = cv2.addWeighted(img, 0.7,
                                  cv2.cvtColor(mask, cv2.COLOR_GRAY2BGR), 0.3, 0)
        stem = f"{idx:02d}_{image_id[:8]}_{tag}"
        cv2.imwrite(str(out / f"{stem}_1_original.jpg"), img)
        cv2.imwrite(str(out / f"{stem}_2_mask.jpg"), overlay)
        cv2.imwrite(str(out / f"{stem}_3_result.jpg"), result)
        print(f"  [{idx}/{n}] {tag}")
    conn.close()
    print(f"prototype done: {detected}/{n} watermarks detected -> {out}/")


def cmd_watermark():
    """Produce 'without_watermark' images for all raw images (resumable)."""
    conn = db.connect()
    rows = list(db.raw_images(conn))
    total = len(rows)
    done = skipped = missed = 0
    for idx, (image_id, data) in enumerate(rows, 1):
        if db.has_watermark_child(conn, image_id):
            skipped += 1
            continue
        img, exif = decode(data)
        result = remove_watermark(img)
        if result is None:
            missed += 1
            print(f"  [{idx}/{total}] {image_id[:8]} NO WATERMARK FOUND - skipped")
            continue
        fid = db.insert_file(conn, encode(result, exif))
        db.insert_image(conn, "without_watermark", fid, source_image_id=image_id)
        conn.commit()
        done += 1
        if idx % 25 == 0:
            print(f"  ... {idx}/{total}")
    conn.close()
    print(f"watermark removal: {done} done, {skipped} skipped (already had),"
          f" {missed} missed (no watermark detected)")


def cmd_count():
    conn = db.connect()
    print(db.counts(conn))
    conn.close()


COMMANDS = {
    "ingest": cmd_ingest,
    "prototype": cmd_prototype,
    "watermark": cmd_watermark,
    "count": cmd_count,
}


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "count"
    if cmd == "prototype" and len(sys.argv) > 2:
        cmd_prototype(int(sys.argv[2]))
    else:
        COMMANDS[cmd]()


if __name__ == "__main__":
    main()
