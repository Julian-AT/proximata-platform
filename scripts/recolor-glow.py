#!/usr/bin/env python3
"""Recolour the template's green hero glow into the Proximata palette.

The glow is an indexed PNG with 11 palette entries, so recolouring is a
lossless palette remap: entries are ranked by luminance and mapped onto a
ramp ink -> brand blue -> ice. The image data is untouched.

Usage: python3 scripts/recolor-glow.py
Output: public/sites/proximata/images/bg/hero-glow.png
"""

import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets/source/template-hero-glow.png"
TARGET = ROOT / "public/sites/proximata/images/bg/hero-glow.png"

# (position on the ramp, colour)
RAMP = [
    (0.0, (35, 32, 30)),  # ink
    (0.55, (32, 45, 133)),  # brand blue
    (1.0, (200, 241, 255)),  # ice
]


def luminance(rgb: tuple[int, int, int]) -> float:
    r, g, b = rgb
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ramp(t: float) -> tuple[int, int, int]:
    for (t0, c0), (t1, c1) in zip(RAMP, RAMP[1:]):
        if t <= t1:
            k = (t - t0) / (t1 - t0)
            return tuple(round(a + (b - a) * k) for a, b in zip(c0, c1))
    return RAMP[-1][1]


def main() -> None:
    image = Image.open(SOURCE)
    if image.mode != "P":
        raise SystemExit(f"Expected an indexed PNG, got {image.mode}")
    used = sorted(set(image.tobytes()))
    palette = image.getpalette()
    colours = {i: tuple(palette[i * 3 : i * 3 + 3]) for i in used}
    lums = {i: luminance(c) for i, c in colours.items()}
    low, high = min(lums.values()), max(lums.values())

    for i in used:
        t = (lums[i] - low) / (high - low) if high > low else 0
        palette[i * 3 : i * 3 + 3] = ramp(t)

    image.putpalette(palette)
    TARGET.parent.mkdir(parents=True, exist_ok=True)
    image.save(TARGET, optimize=True)
    print(f"recoloured {len(used)} palette entries -> {TARGET.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
