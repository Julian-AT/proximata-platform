#!/usr/bin/env python3
"""Build the About section's two cut-outs: Pallas Athene and a robot head.

Both get the screen-print look of the Tracks hands: four flat tones
(periwinkle -> ice -> white) with halftone dots where the subject fades into
the background, which is transparent.

1. Brightness: both photos are shot against blue (sky, studio backdrop), so a
   channel mix keeps the warm subject bright and pushes the blue to black:
   L = 0.6 R + 0.6 G - 0.35 B, then normalised between the background level
   and the subject's highlights.
2. Tones: the thresholds sit at the same quantiles of each subject's own
   brightness, so the two figures carry the same balance of dark, mid and
   light tones even though one is stone and the other glossy plastic.
3. Halftone: below the darkest tone, a dot grid whose dot size follows the
   brightness, like the hands' shadow texture.

Each output is a tiny indexed PNG. Sources and licences:
assets/source/about/CREDITS.md.

Usage: python3 scripts/build-about-art.py
Output: public/sites/proximata/images/about/{athena,robot}-print.png
"""

import pathlib

import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets/source/about"
TARGET_DIR = ROOT / "public/sites/proximata/images/about"

# (source, output, crop as fractions (left, top, right, bottom), output height)
ART = [
    # Head and helmet, without most of the crest and the shoulders.
    ("athena-parliament-vienna.jpg", "athena-print.png", (0.02, 0.22, 0.98, 0.95), 900),
    # Head and neck; the stored source is already cropped clear of the NASA insignia.
    ("robonaut-2.jpg", "robot-print.png", (0.045, 0.023, 1.0, 0.86), 900),
]

PERIWINKLE = np.array([120, 150, 220], np.float32)
ICE = np.array([200, 241, 255], np.float32)  # #C8F1FF
WHITE = np.array([255, 255, 255], np.float32)
# Flat tones from dark to light (index 1..4; 0 is transparent).
TONES = [PERIWINKLE * 0.85, PERIWINKLE * 0.4 + ICE * 0.6, ICE, WHITE]
# Quantiles of the subject's brightness where each lighter tone starts.
TONE_QUANTILES = [0.30, 0.58, 0.84]
# Brightness (0..1) below which a pixel is background or halftone.
SUBJECT_FLOOR = 0.18
# Halftone cell size as a share of the output height.
CELL = 1 / 120


def brightness(path: pathlib.Path, crop: tuple[float, float, float, float], height: int) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    w, h = image.size
    left, top, right, bottom = crop
    image = image.crop((round(left * w), round(top * h), round(right * w), round(bottom * h)))
    image = image.resize((round(image.width * height / image.height), height), Image.Resampling.LANCZOS)
    rgb = np.asarray(image).astype(np.float32) / 255
    light = np.clip(0.6 * rgb[..., 0] + 0.6 * rgb[..., 1] - 0.35 * rgb[..., 2], 0, 1)
    # Background level from the top strip; subject level from the top 3%.
    lo = float(np.percentile(light[: int(height * 0.05)], 60)) + 0.06
    hi = max(lo + 0.12, float(np.percentile(light, 97)) * 0.92)
    return np.clip((light - lo) / (hi - lo), 0, 1)


def screen_print(t: np.ndarray) -> np.ndarray:
    """Palette indices: 0 transparent, 1..4 flat tones (1 also draws the halftone dots)."""
    subject = t[t >= SUBJECT_FLOOR]
    bounds = [SUBJECT_FLOOR, *np.quantile(subject, TONE_QUANTILES)]
    index = np.digitize(t, bounds).astype(np.uint8)  # 0 below the floor, then 1..4

    h, w = t.shape
    cell = max(4, round(h * CELL))
    yy, xx = np.mgrid[0:h, 0:w]
    dx = xx % cell - (cell - 1) / 2
    dy = yy % cell - (cell - 1) / 2
    radius = np.sqrt(dx * dx + dy * dy)
    faint = (index == 0) & (t > 0.05)
    dots = radius < (t / SUBJECT_FLOOR) * cell * 0.42
    index[faint & dots] = 1
    return index


def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    palette = [0, 0, 0] + [round(c) for tone in TONES for c in tone]
    for source, output, crop, height in ART:
        index = screen_print(brightness(SOURCE_DIR / source, crop, height))
        image = Image.fromarray(index, "P")
        image.putpalette(palette)
        target = TARGET_DIR / output
        image.save(target, optimize=True, transparency=0)
        kib = target.stat().st_size / 1024
        print(f"{source} -> {target.relative_to(ROOT)}: {image.size[0]}x{image.size[1]}, {kib:.0f} KiB")


if __name__ == "__main__":
    main()
