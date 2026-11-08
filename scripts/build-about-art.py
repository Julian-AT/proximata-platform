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

Like the template's statue head and helmet, both are square busts turned
towards the middle of the page: Athena (left) is mirrored to look right, the
robot (right) is mirrored to look left. The tones lean dark so the figures
stay quiet next to the title.

Each output is a tiny indexed PNG. Sources and licences:
assets/source/about/CREDITS.md.

Usage: python3 scripts/build-about-art.py
Output: public/sites/proximata/images/about/{athena,robot}-bust.png
"""

import pathlib

import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets/source/about"
TARGET_DIR = ROOT / "public/sites/proximata/images/about"

# (source, output, square crop as fractions (left, top, right, bottom), mirror)
ART = [
    # Three-quarter view of head, helmet and shoulders; mirrored to face right.
    ("athena-parliament-night.jpg", "athena-bust.png", (0.07, 0.17, 0.87, 0.902), True),
    # Head and neck, clear of the NASA insignia; mirrored to face left.
    ("robonaut-2.jpg", "robot-bust.png", (0.0, 0.0, 1.0, 0.77), True),
]
# Output size (square), about 2x the largest display size.
SIZE = 700

PERIWINKLE = np.array([120, 150, 220], np.float32)
ICE = np.array([200, 241, 255], np.float32)  # #C8F1FF
WHITE = np.array([255, 255, 255], np.float32)
# Flat tones from dark to light (index 1..4; 0 is transparent).
TONES = [PERIWINKLE * 0.85, PERIWINKLE * 0.4 + ICE * 0.6, ICE, WHITE]
# Quantiles of the subject's brightness where each lighter tone starts.
TONE_QUANTILES = [0.45, 0.74, 0.93]
# Brightness (0..1) below which a pixel is background or halftone.
SUBJECT_FLOOR = 0.18
# Halftone cell size as a share of the output height.
CELL = 1 / 120


def brightness(path: pathlib.Path, crop: tuple[float, float, float, float], mirror: bool) -> np.ndarray:
    image = Image.open(path).convert("RGB")
    w, h = image.size
    left, top, right, bottom = crop
    image = image.crop((round(left * w), round(top * h), round(right * w), round(bottom * h)))
    image = image.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    if mirror:
        image = image.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    height = SIZE
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
    for source, output, crop, mirror in ART:
        index = screen_print(brightness(SOURCE_DIR / source, crop, mirror))
        image = Image.fromarray(index, "P")
        image.putpalette(palette)
        target = TARGET_DIR / output
        image.save(target, optimize=True, transparency=0)
        kib = target.stat().st_size / 1024
        print(f"{source} -> {target.relative_to(ROOT)}: {image.size[0]}x{image.size[1]}, {kib:.0f} KiB")


if __name__ == "__main__":
    main()
