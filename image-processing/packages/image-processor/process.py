"""Image pipeline: ingest raw images, remove the 'sample' watermark.

The watermark is a semi-transparent white "sample" overlay, identical across
all images (same text, position, opacity per orientation). We exploit that:

  1. makemask  - across all images of each orientation, compute a per-pixel
                 mean/std map. The watermark stands out (high mean, low std).
                 Portrait is detected directly; landscape (noisy shared-venue
                 stats) reuses the portrait mask scaled to its dimensions.
  2. watermark - LaMa inpaints the masked region per image (lama_fp32.onnx).

Usage:
    python process.py ingest            # load mr/ -> DB as 'raw'
    python process.py makemask          # compute masks (one-time, ~4 min)
    python process.py watermark         # inpaint all images (resumable, ~45 min)
    python process.py count             # show row counts
"""
from __future__ import annotations

import io
import sys
from pathlib import Path

import cv2
import numpy as np
import onnxruntime as ort
from PIL import Image

import db

ROOT = Path(__file__).parent
SRC = ROOT / "mr"
IMAGE_EXTS = {".jpg", ".jpeg"}
JPEG_Q = 95
LAMA_MODEL = ROOT / "lama_fp32.onnx"


# --- image I/O (EXIF-preserving) -----------------------------------------

def decode(data: bytes):
    """JPEG bytes -> (RGB ndarray float32, exif_bytes)."""
    pil = Image.open(io.BytesIO(data))
    exif = pil.info.get("exif", b"")
    rgb = np.asarray(pil.convert("RGB"), dtype=np.float32)
    return rgb, exif


def encode(rgb, exif: bytes = b"") -> bytes:
    rgb = np.clip(rgb, 0, 255).astype(np.uint8)
    buf = io.BytesIO()
    Image.fromarray(rgb).save(buf, format="JPEG", quality=JPEG_Q, exif=exif)
    return buf.getvalue()


# --- watermark mask / alpha computation ----------------------------------

def _roi(h: int, w: int):
    """Centered ROI that comfortably contains the centered watermark."""
    return (int(h * 0.35), int(h * 0.65), int(w * 0.15), int(w * 0.85))


def _accumulate(img_bytes_list):
    """Accumulate per-pixel mean+std over a centered ROI. Returns (mean, std, bbox)."""
    Y0 = Y1 = X0 = X1 = None
    S = Sq = None
    n = 0
    for data in img_bytes_list:
        g = np.asarray(Image.open(io.BytesIO(data)).convert("L"), dtype=np.float32)
        h, w = g.shape
        if Y0 is None:
            Y0, Y1, X0, X1 = _roi(h, w)
        roi = g[Y0:Y1, X0:X1]
        if S is None:
            S = roi.copy(); Sq = roi * roi
        else:
            S += roi; Sq += roi * roi
        n += 1
    mean = S / n
    std = np.sqrt(np.maximum(Sq / n - mean ** 2, 0)).astype(np.float32)
    return mean, std, (Y0, Y1, X0, X1)


def _detect_footprint(mean, std, bbox):
    """Threshold the mean-std discriminator, keep short (text-sized) components.
    Returns (footprint, disc, text_bbox_in_roi_or_None)."""
    Y0, Y1, X0, X1 = bbox
    disc = (mean - std).astype(np.uint8)
    thr = int(np.percentile(disc.astype(np.int32), 98.5))
    _, text = cv2.threshold(disc, thr, 255, cv2.THRESH_BINARY)
    k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    text = cv2.morphologyEx(text, cv2.MORPH_CLOSE, k)
    max_h = (Y1 - Y0) * 0.35
    nc, lbl, stats, _ = cv2.connectedComponentsWithStats(text, 8)
    footprint = np.zeros_like(text)
    for i in range(1, nc):
        if (stats[i, cv2.CC_STAT_AREA] > 60
                and stats[i, cv2.CC_STAT_HEIGHT] < max_h):
            footprint[lbl == i] = 255
    footprint = cv2.dilate(footprint, k, iterations=2)
    ys, xs = np.where(footprint > 0)
    tbbox = (xs.min(), ys.min(), xs.max(), ys.max()) if len(xs) else None
    return footprint, disc, tbbox


def _place_full(roi_arr, bbox, full_dim):
    """Place an ROI-coords array into a full-image canvas. Returns full canvas."""
    Y0, Y1, X0, X1 = bbox
    canvas = np.zeros(full_dim, dtype=roi_arr.dtype)
    canvas[Y0:Y1, X0:X1] = roi_arr
    return canvas


def _scale_to(src_fp, src_dim, dst_dim):
    """Scale a full-canvas footprint from src orientation to dst orientation.
    The watermark sits at a fixed relative position and scales uniformly with
    image width, so we crop to the text bbox, scale by the width ratio, and
    re-center at the same relative coordinates."""
    sH, sW = src_dim
    dH, dW = dst_dim
    ys, xs = np.where(src_fp > 0)
    if len(xs) == 0:
        return np.zeros(dst_dim, np.uint8)
    tx0, ty0, tx1, ty1 = xs.min(), ys.min(), xs.max(), ys.max()
    cx_rel, cy_rel = (tx0 + tx1) / (2 * sW), (ty0 + ty1) / (2 * sH)
    pad = 25
    fp_t = src_fp[max(0, ty0 - pad):ty1 + pad, max(0, tx0 - pad):tx1 + pad]
    scale = dW / sW  # uniform; watermark scales with image width
    nh, nw = int(fp_t.shape[0] * scale), int(fp_t.shape[1] * scale)
    fp_s = cv2.resize(fp_t, (nw, nh), interpolation=cv2.INTER_NEAREST)
    lcy, lcx = int(cy_rel * dH), int(cx_rel * dW)
    ly0, lx0 = lcy - nh // 2, lcx - nw // 2
    out_fp = np.zeros(dst_dim, np.uint8)
    sy = max(0, -ly0); sx = max(0, -lx0)
    ly, lx = max(0, ly0), max(0, lx0)
    eh = min(nh - sy, dH - ly); ew = min(nw - sx, dW - lx)
    out_fp[ly:ly + eh, lx:lx + ew] = fp_s[sy:sy + eh, sx:sx + ew]
    return out_fp


def cmd_makemask():
    conn = db.connect()
    groups = {"portrait": [], "landscape": []}
    for _iid, data in db.raw_images(conn):
        sz = Image.open(io.BytesIO(data)).size
        groups["portrait" if sz[1] > sz[0] else "landscape"].append(data)
    conn.close()

    # portrait: direct detection (clean stats) -> full-canvas footprint
    p_items = groups["portrait"]
    mean, std, bbox = _accumulate(p_items)
    footprint, _disc, _tbbox = _detect_footprint(mean, std, bbox)
    pH, pW = 6048, 4032
    p_fp = _place_full(footprint, bbox, (pH, pW))
    print(f"  portrait: {len(p_items)} imgs, footprint {int((p_fp > 0).sum())} px")
    np.savez(ROOT / "mask_portrait.npz", footprint=p_fp)

    # landscape: proportionally scaled portrait footprint. Its own stats are too
    # noisy (50 group shots share a venue background), so we reuse the clean
    # portrait detection at the landscape scale.
    l_items = groups["landscape"]
    if l_items:
        lH, lW = 4032, 6048
        l_fp = _scale_to(p_fp, (pH, pW), (lH, lW))
        print(f"  landscape: {len(l_items)} imgs (scaled),"
              f" footprint {int((l_fp > 0).sum())} px")
        np.savez(ROOT / "mask_landscape.npz", footprint=l_fp)


_session = None


def _lama():
    global _session
    if _session is None:
        _session = ort.InferenceSession(
            str(LAMA_MODEL), providers=["CPUExecutionProvider"])
    return _session


def inpaint(rgb, mask):
    """LaMa-inpaint the masked region of a full RGB image. mask: uint8 (255=fix).
    Crops to the mask bbox + margin, runs LaMa at 512x512, pastes back only the
    masked pixels so unmasked detail is preserved exactly."""
    ys, xs = np.where(mask > 0)
    if len(xs) == 0:
        return rgb
    H, W = rgb.shape[:2]
    pad = 64
    y0, y1 = max(0, ys.min() - pad), min(H, ys.max() + pad)
    x0, x1 = max(0, xs.min() - pad), min(W, xs.max() + pad)
    img = rgb[y0:y1, x0:x1].astype(np.float32)
    msk = (mask[y0:y1, x0:x1] > 0).astype(np.float32)
    img512 = cv2.resize(img, (512, 512)).transpose(2, 0, 1)[None] / 255.0
    msk512 = cv2.resize(msk, (512, 512))[None, None]
    out = _lama().run(["output"], {"image": img512.astype(np.float32),
                                   "mask": msk512.astype(np.float32)})[0][0]
    out = np.clip(out, 0, 255).astype(np.uint8).transpose(1, 2, 0)
    out = cv2.resize(out, (x1 - x0, y1 - y0))
    result = rgb.copy()
    result[y0:y1, x0:x1][msk > 0] = out[msk > 0]
    return result


def _orientation(shape):
    h, w = shape[:2]
    return "portrait" if h > w else "landscape"


# --- commands ------------------------------------------------------------

def cmd_ingest():
    files = sorted(p for p in SRC.rglob("*") if p.suffix.lower() in IMAGE_EXTS)
    conn = db.connect()
    n = 0
    for path in files:
        fid = db.insert_file(conn, path.read_bytes())
        db.insert_image(conn, "raw", fid)
        conn.commit()
        n += 1
    conn.close()
    print(f"ingested {n} raw images into {db.DB_PATH}")


def _load_masks():
    masks = {}
    for orient in ("portrait", "landscape"):
        p = ROOT / f"mask_{orient}.npz"
        if p.exists():
            z = np.load(p)
            masks[orient] = z["footprint"]
    return masks


def cmd_watermark():
    masks = _load_masks()
    if not masks:
        sys.exit("no masks found - run 'makemask' first")
    conn = db.connect()
    rows = list(db.raw_images(conn))
    total = len(rows)
    done = skipped = 0
    for idx, (image_id, data) in enumerate(rows, 1):
        if db.has_watermark_child(conn, image_id):
            skipped += 1
            continue
        rgb, exif = decode(data)
        orient = _orientation(rgb.shape)
        if orient not in masks:
            continue
        # dilate generously: covers soft semi-transparent edges; landscape gets
        # extra to absorb the proportional-scaling position error
        d = 60 if orient == "portrait" else 170
        mask = cv2.dilate(masks[orient], np.ones((d, d), np.uint8))
        result = inpaint(np.clip(rgb, 0, 255).astype(np.uint8), mask)
        fid = db.insert_file(conn, encode(result, exif))
        db.insert_image(conn, "without_watermark", fid, source_image_id=image_id)
        conn.commit()
        done += 1
        if idx % 25 == 0:
            print(f"  ... {idx}/{total}")
    conn.close()
    print(f"watermark removal: {done} done, {skipped} skipped (already had)")


def cmd_count():
    conn = db.connect()
    print(db.counts(conn))
    conn.close()


COMMANDS = {
    "ingest": cmd_ingest,
    "makemask": cmd_makemask,
    "watermark": cmd_watermark,
    "count": cmd_count,
}


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "count"
    COMMANDS[cmd]()


if __name__ == "__main__":
    main()
