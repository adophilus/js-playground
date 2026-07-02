# Image Processing — Plan v2

## What went wrong

### Problem 1: "Watermark still visible"
The current mask covers only the text strokes (170K px = 0.7% of image).
After 60px dilation, it's ~2.1%. But the watermark is **semi-transparent white**
— it has soft, feathered edges that extend well beyond the visible text. The
mask doesn't cover these edges, so they survive after inpainting.

**Fix**: Much wider mask. Either generous dilation (~200px) or a solid
rectangular region covering the full watermark area with padding.

### Problem 2: "Smudged faces"
LaMa is a **generic** inpainting model. It's good at extending textures
(fabric, sky, background) but has no semantic understanding of faces. When
the watermark text crosses a face, LaMa produces a blurry, averaged mess
where the face should be.

**Fix**: After LaMa inpainting, detect faces in the inpainted region and run
a **face restoration model** (CodeFormer) to reconstruct facial detail.

### Constraint: No GPU
- No NVIDIA GPU, 15GB RAM, 18GB free disk
- Stable Diffusion inpainting is impractical on CPU (~5-10 min/image)
- All models must run on CPU via ONNX Runtime (already in shell.nix)
- This rules out SDXL, ControlNet, and other heavy diffusion models

---

## Watermark removal approaches

### Option A: LaMa + wider mask + CodeFormer face restoration ⭐ recommended

| Aspect | Detail |
|---|---|
| Mask | Rectangular region covering watermark + 150px padding |
| Inpaint | LaMa ONNX (already have model, ~10s/image on CPU) |
| Face fix | CodeFormer ONNX (~300MB model, ~15s/face on CPU) |
| Quality | Good — faces reconstructed, backgrounds clean |
| Total time | ~15-25s/image → ~1-1.5 hr for 257 |
| Disk | +300MB (CodeFormer model) |

**Why this works**: LaMa handles the bulk inpainting fast. CodeFormer is
specifically trained to restore degraded faces — it can take LaMa's blurry
face output and reconstruct realistic facial features. Two-stage pipeline
leverages each model's strength.

**When faces are NOT in the watermark area**: LaMa alone is sufficient
(these images already look fine). Face restoration only runs when a face
is detected in the inpainted region.

### Option B: LaMa + wider mask only (cheapest)

Same as Option A but skip CodeFormer. Fixes the "still visible" problem
(wider mask) but NOT the "smudged faces" problem. Faces in the watermark
area will still be blurry.

~10s/image → ~45 min for 257.

### Option C: Stable Diffusion Inpainting (if GPU available later)

SDXL Inpainting or SD 1.5 Inpainting would produce the best results —
strong semantic priors mean faces, hands, and complex details are
reconstructed properly without needing a separate face restoration step.

**Not viable now** (no GPU), but the pipeline architecture should make
swapping the inpainting backend trivial if a GPU is added later.

---

## Background removal approaches

### Option A: rembg (U2-Net) ⭐ recommended

| Aspect | Detail |
|---|---|
| Model | U2-Net (~170MB, ONNX) |
| Setup | `pip install rembg[onnxruntime]` (or via nix-shell) |
| Speed | ~3-5s/image on CPU |
| Quality | Good for portraits — clean subject/background separation |
| Output | RGBA PNG (transparent background) or mask |
| Total time | ~20 min for 257 |

rembg is the standard tool. U2-Net handles portrait matting well. Edge
quality is decent (not pixel-perfect hair strands, but good enough for
most use cases).

### Option B: BiRefNet via ONNX

Newer model with better edge quality (especially hair). ~900MB model.
Available as ONNX. Would need custom inference code (no pip package
wrapper like rembg). Higher quality but more setup work.

### Option C: rembg + matting refinement

Use rembg for coarse segmentation, then a matting model (e.g., MODNet)
for fine edge refinement. Best quality but two-model pipeline adds
complexity. Only worth it if hair-edge quality is critical.

---

## Pipeline architecture

### Processing order

```
Raw (watermark + background)
  │
  ├──► watermark removal ──► without_watermark (clean, has background)
  │         │
  │         └──► background removal ──► without_background_and_watermark
  │
  └──► [apply bg mask from above to raw] ──► without_background (has watermark)
```

**Why this order:**
1. Watermark removal first — background removal works better on clean images
   (watermark could confuse the segmentation model)
2. Background removal on the clean image produces a high-quality mask
3. That same mask is applied to the raw image to produce the "watermarked
   but no background" variant — one background-removal pass, two outputs

### Schema change

```sql
-- update CHECK constraint to add new types
ALTER TABLE images ... CHECK (type IN (
  'raw',
  'without_watermark',
  'without_background',
  'without_background_and_watermark'
));
```

Since SQLite can't easily ALTER a CHECK constraint, this means either:
- Drop + recreate the table (lose data — need full re-ingest)
- Or create a new DB from scratch

**Recommendation**: Start fresh. The raw images are in `mr/Highlights/`
and re-ingestion is trivial (~30s). This also clears the old
poor-quality watermark removal results.

### Output format

- Raw + without_watermark: JPEG (quality 95, same as now)
- without_background + without_background_and_watermark: **PNG** (lossless,
  supports transparency via RGBA). JPEG doesn't support alpha channel.

---

## Implementation phases

### Phase 1: Wider mask + re-process watermark removal
- Replace text-footprint mask with generous rectangular region
- Re-run LaMa inpainting on all 257 images
- Spot-check: watermark fully covered? Any visible remnants?
- ~1 hr (45 min processing + verification)

### Phase 2: Face restoration
- Download CodeFormer ONNX model
- Add face detection (OpenCV Haar cascade or MediaPipe)
- After LaMa inpainting, check if any faces overlap the inpainted region
- If yes, crop face region, run CodeFormer, paste back
- Re-process images where faces are in the watermark area
- ~1.5 hr (setup + processing)

### Phase 3: Background removal
- Install rembg with ONNX backend
- Run on all `without_watermark` images → `without_background_and_watermark`
- Apply same masks to raw images → `without_background`
- Spot-check edge quality
- ~30 min (setup + 20 min processing)

### Phase 4: Frontend integration
- Update gallery to show all 4 variants
- Add toggle between raw / no-watermark / no-bg / no-watermark-no-bg
- ~30 min

### Phase 5: Verify + handoff
- Export samples for visual review
- Update README
- ~15 min

**Total estimated time: ~4 hours**

---

## Disk space check

| Item | Size |
|---|---|
| Current DB (raw + watermark) | ~700 MB |
| + New watermark removal (replaces old) | ~0 (same count) |
| + Background removed (PNG with alpha) | ~500 MB |
| + Watermark + background removed (PNG) | ~400 MB |
| CodeFormer model | ~300 MB |
| **New total DB** | **~1.6 GB** |
| **Free disk** | 18 GB ✓ |

---

## Open questions

1. **Watermark removal quality**: Option A (LaMa + CodeFormer) or Option B
   (LaMa only, accept blurry faces)? The quality/effort trade-off.

2. **Background removal**: Is rembg quality sufficient, or do we need
   BiRefNet for hair-level edge detail?

3. **Background style**: Transparent (RGBA PNG) or solid white/color
   background? Transparent is more flexible but some use cases want solid.

4. **Re-processing**: OK to wipe the current DB and start fresh? The raw
   images are safe in `mr/Highlights/`.
