# Image Processing — Watermark Removal Pipeline

Removes semi-transparent "sample" watermarks from 257 recovered photos using
LaMa inpainting, storing raw + processed images in SQLite.

## Prerequisites

- **NixOS** — all deps via `shell.nix` (pip/venv broken on this machine)
- **LaMa model** — download `lama_fp32.onnx` (208 MB) from
  [Carve/LaMa-ONNX](https://huggingface.co/Carve/LaMa-ONNX) into this folder.
  Gitignored (too large for the repo).

## Usage

```bash
# every command runs inside nix-shell:
nix-shell --run "python process.py <command>"

python process.py ingest     # load mr/Highlights/*.jpg → DB as 'raw'
python process.py makemask    # compute watermark masks from cross-image stats
python process.py watermark   # LaMa-inpaint all images (~45 min, resumable)
python process.py count       # show row counts by type
```

## How it works

1. **Ingest** — walks `mr/Highlights/`, stores each JPEG blob in `files`, creates
   an `images` row (`type='raw'`).

2. **Makemask** — accumulates per-pixel mean/std across all portrait images.
   The watermark text stands out (high mean, low std) → binary footprint mask.
   Landscape reuses the portrait mask scaled proportionally (its own stats are
   too noisy — 50 group photos share venue backgrounds).

3. **Watermark** — dilates the footprint (portrait 60 px, landscape 170 px for
   position-error coverage), then LaMa-inpaints the masked region. Crops to the
   mask bbox + 64 px pad, runs at 512×512, pastes only masked pixels back so
   unmasked detail is preserved bit-for-bit. Resumable (skips images that
   already have a `without_watermark` child).

## Schema

```
files:   id (PK) | data (blob) | created_at
images:  id (PK) | type ('raw'|'without_watermark') | source_image_id (self-FK) | file_id (FK) | created_at
```

Each `without_watermark` image points back to its `raw` source via
`source_image_id`. Exactly one raw per original, one derived per raw.

## Exporting images

```python
import db, process
conn = db.connect()
for iid, data in conn.execute(
    "SELECT i.id, f.data FROM images i JOIN files f ON i.file_id=f.id"
    " WHERE i.type='without_watermark'"
):
    with open(f"{iid}.jpg", "wb") as fh:
        fh.write(data)
```

## Files

| File | Purpose |
|---|---|
| `process.py` | Main pipeline (ingest, makemask, watermark, count) |
| `db.py` | SQLite schema + helpers |
| `shell.nix` | NixOS environment (numpy, opencv4, pillow, onnxruntime, tesseract4) |
| `mask_portrait.npz` | Portrait watermark footprint (regenerable via `makemask`) |
| `mask_landscape.npz` | Landscape footprint (scaled from portrait) |
| `lama_fp32.onnx` | LaMa model (not in repo — download separately) |
