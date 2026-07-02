# Image Processing — Plan

## 0. What we're working with

- **257 JPGs** in `mr/Highlights/`, full-res 4032×6048, Nikon Z6_3 EXIF intact.
- Professional portrait/headshot set.
- Watermark: the word **"sample"**, semi-transparent white, **centered**.
  Consistent placement → detection is trivial, removal is a standard inpaint.
- Environment: Python 3.12 + `sqlite3` present. **This project runs in Python,
  not JS** — every library we need (OpenCV, inpainting models, OCR) is Python.

## 1. Goal (the stated scope — nothing more)

1. Remove the "sample" watermark from every image.
2. Store raw + processed images and their metadata in a SQLite DB.

Out of scope unless asked (see §6): background removal, face recognition.

## 2. Tech stack

| Need | Choice | Why |
|---|---|---|
| Image I/O + masking | `opencv-python` | stdlib of image work |
| Text-box detection | `easyocr` or `paddleocr` | finds "sample" box per image |
| Watermark removal | `cv2.inpaint` (baseline) → **LaMa** model if quality too low | ladder: try the free thing first |
| DB | `sqlite3` (stdlib) | zero deps |
| IDs | `uuid4` (stdlib) | matches the `text` PK design |
| Orchestration | plain `for` loop over the folder | no framework needed |

Single `requirements.txt`, one `process.py`, one `db.py`. No web server,
no queue, no API. 257 images is a batch job that finishes in minutes.

## 3. Watermark removal approach

The watermark is consistent, so per image:

1. **Detect** the "sample" text bounding box (OCR). Dilate the box by a few
   px to catch anti-aliased edges → binary mask.
2. **Inpaint** the masked region.
   - **Rung 1:** `cv2.inpaint(img, mask, radius, INPAINT_TELEA)`. No model
     download, instant. Try this on ~5 images first.
   - **Rung 2 (only if Rung 1 looks bad):** LaMa inpainting model. Handles
     larger/texture areas better. Adds a torch dependency.
3. **Fallback if OCR ever misses:** the watermark is always centered and
   always says "sample" — define the center band as the mask. Never silent.

Each processed image keeps EXIF + dimensions. Output quality = JPEG 95.

## 4. Storage decision

Your sketch stores image bytes as `files.data BLOB`. Two options:

- **A) Blobs in DB** (your sketch): one portable `.db` file holds everything.
  Simplest to ship/backup. Fine at this scale (~330 MB with both versions).
- **B) Paths in DB, files on disk**: DB stays tiny; images live as files.

**Recommend A** (your original) — it's what you drew, it's simpler to hand
over ("here's the .db"), and 257 images won't strain SQLite. Revisit only if
the set grows 10×.

## 5. Refined schema

Trimmed to the stated goal. Fixed the dangling `images.id -> files.id`
line (real FKs called out explicitly).

```sql
-- raw file bytes (one row per physical file)
CREATE TABLE files (
  id          TEXT PRIMARY KEY,        -- uuid4
  data        BLOB NOT NULL,           -- the JPEG bytes
  created_at  INTEGER NOT NULL         -- unix epoch
);

-- logical image; raw OR derived. derived points back to its source.
CREATE TABLE images (
  id                 TEXT PRIMARY KEY,               -- uuid4
  type               TEXT NOT NULL CHECK (
                       type IN ('raw', 'without_watermark')
                     ),
  source_image_id    TEXT REFERENCES images(id),     -- NULL for raw
  file_id            TEXT NOT NULL REFERENCES files(id),
  created_at         INTEGER NOT NULL
);

CREATE INDEX idx_images_source ON images(source_image_id);
CREATE INDEX idx_images_type   ON images(type);
```

Invariants the app enforces:
- Exactly one row with `type='raw'` per original file.
- `without_watermark` rows always have `source_image_id` set to their raw image.

**Dropped from your sketch** (add when the need is real — see §6):
- image types `without_background` / `without_background_and_watermark`
- `faces` table (face *features* → recognition/clustering)
- `face_identifications` table (bounding boxes)

## 6. How to add the deferred pieces (when, not now)

- **Background removal** → add `without_background` to the `type` CHECK
  constraint + a processing step using `rembg`. No schema change beyond the enum.
- **Face detection** (just bounding boxes, no recognition) → add
  `face_detections(image_id, x, y, w, h)` + a script using
  `face_recognition` or `mediapipe`.
- **Face recognition** (cluster identities across photos) → then you need the
  `faces` table with embeddings + a `face_detections.face_id` FK. Build this
  *after* detection exists and only if identifying people is a goal.

Each is an additive migration, none blocks the watermark job.

## 7. Phased work

1. **Scaffold** — `requirements.txt`, `db.py` (schema + insert/get helpers),
   empty `process.py`. Verify schema applies on a temp DB. (~30 min)
2. **Ingest** — walk `mr/`, write each raw JPG into `files` + an `images`
   row (`type='raw'`). Verify count = 257. (~30 min)
3. **Watermark removal prototype** — OCR + `cv2.inpaint` on 5 images, eyeball
   results. Decide Rung 1 vs Rung 2 (LaMa). (~1–2 hr)
4. **Batch run** — produce `without_watermark` images for all 257, store
   bytes + `images` rows. Spot-check a sample. (~1 hr incl. runtime)
5. **Handoff** — a one-line query to export/dump, a short README in this
   folder. Done.

## 8. Decisions to confirm before we build

1. **Storage:** blobs-in-DB (recommend) vs. paths-on-disk?
2. **Inpainting baseline:** start with free `cv2.inpaint` and escalate to
   LaMa only if needed (recommend), or go straight to LaMa?
3. **The deferred schema (bg removal, faces):** confirm we drop it for now
   and add later — or is any of it actually in scope today?
