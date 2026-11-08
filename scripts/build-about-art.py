#!/usr/bin/env python3
"""Build the About section's two cut-outs: Pallas Athene and a robot head.

Both photos are shot against a blue background (sky, studio backdrop), so the
script uses a channel mix that keeps the warm subject bright and pushes the
blue background to black: L = 0.6 R + 0.6 G - 0.35 B. That brightness then
drives the alpha (background transparent, subject opaque) and the same
periwinkle -> ice -> white ramp the Tracks hands use, so the figures read as
one family with them. Colour and alpha depend only on L, so each output is a
lossless 256-entry palette PNG.

Sources and licences: assets/source/about/CREDITS.md.

Usage: python3 scripts/build-about-art.py
Output: public/sites/proximata/images/about/{athena,robot}.png
"""

import pathlib

import numpy as np
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets/source/about"
TARGET_DIR = ROOT / "public/sites/proximata/images/about"

# (source, output, output height in px: about 2x the largest display size)
ART = [
    ("athena-parliament-vienna.jpg", "athena.png", 900),
    ("robonaut-2.jpg", "robot.png", 800),
]

# Same duotone as scripts/build-hands.py.
PERIWINKLE = np.array([120, 150, 220], np.float32)
ICE = np.array([200, 241, 255], np.float32)  # #C8F1FF
WHITE = np.array([255, 255, 255], np.float32)
ICE_STOP = 0.6


def brightness(rgb: np.ndarray) -> np.ndarray:
    """Channel mix that turns blue backgrounds dark, 0..1."""
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    return np.clip(0.6 * r + 0.6 * g - 0.35 * b, 0, 1)


def ramp_bounds(light: np.ndarray) -> tuple[float, float]:
    """Background level from the top and upper side strips; subject level from the top 3%."""
    h, w = light.shape
    strips = np.concatenate(
        [
            light[: int(h * 0.04)].ravel(),
            light[: int(h * 0.6), : int(w * 0.04)].ravel(),
            light[: int(h * 0.6), -int(w * 0.04) :].ravel(),
        ]
    )
    lo = float(np.percentile(strips, 60)) + 0.06
    hi = max(lo + 0.12, float(np.percentile(light, 97)) * 0.92)
    return lo, hi


def colour_for(t: np.ndarray) -> np.ndarray:
    k1 = np.clip(t / ICE_STOP, 0, 1)[..., None]
    k2 = np.clip((t - ICE_STOP) / (1 - ICE_STOP), 0, 1)[..., None]
    low = PERIWINKLE + (ICE - PERIWINKLE) * k1
    return np.where(t[..., None] < ICE_STOP, low, ICE + (WHITE - ICE) * k2)


def build(source: pathlib.Path, target: pathlib.Path, height: int) -> None:
    image = Image.open(source).convert("RGB")
    image = image.resize((round(image.width * height / image.height), height), Image.Resampling.LANCZOS)
    light = brightness(np.asarray(image).astype(np.float32) / 255)
    lo, hi = ramp_bounds(light)

    # Quantise t to 256 levels and build a palette: index -> (colour, alpha).
    t = np.clip((light - lo) / (hi - lo), 0, 1)
    index = np.round(t * 255).astype(np.uint8)
    levels = np.linspace(0, 1, 256)
    smooth = levels * levels * (3 - 2 * levels)
    palette = colour_for(levels).round().astype(np.uint8)
    alphas = bytes(np.round(smooth * 255).astype(np.uint8))

    out = Image.fromarray(index, "P")
    out.putpalette(palette.ravel().tolist())
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    out.save(target, optimize=True, transparency=alphas)
    kib = target.stat().st_size / 1024
    print(f"{source.name} -> {target.relative_to(ROOT)}: {out.size[0]}x{out.size[1]}, "
          f"ramp {lo:.2f}-{hi:.2f}, {kib:.0f} KiB")


def main() -> None:
    for source, output, height in ART:
        build(SOURCE_DIR / source, TARGET_DIR / output, height)


if __name__ == "__main__":
    main()
