#!/usr/bin/env python3
"""Build the Tracks section's "hands touching" picture.

The template split one Michelangelo-style picture of two reaching hands
across three green-tinted card images (left arm | left hand + right index
finger | right arm). This script joins them into one strip and makes it
transparent and on-brand:

1. Trim export edges: thin dark lines along a source's borders, detected as a
   sharp brightness step between the outermost lines and the content inside.
2. Align the tiles vertically by matching their facing boundary columns, so
   the arms run through the joins without a step.
3. Map luminance to alpha so every background (flat green, halftone, noise)
   becomes transparent, and recolour the hands with a duotone ramp
   (periwinkle -> ice -> white). Both depend only on luminance, so the output
   is a lossless 256-entry palette PNG.
4. Crop horizontally so the gap between the fingertips sits exactly at the
   image's horizontal centre (widest window centred there).
5. Fade the two arms out where the source cuts them off vertically, by
   darkening luminance towards the cut (darker means more transparent).

The Tracks cards each show one quarter of the result, so on desktop the four
cards form one picture and the fingertips meet between cards 2 and 3.

Usage: python3 scripts/build-hands.py
Output: public/sites/proximata/images/tracks/hands.png
"""

import pathlib

from PIL import Image, ImageChops

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCES = [
    ROOT / "assets/source/hand-left.png",
    ROOT / "assets/source/hands-center.png",
    ROOT / "assets/source/hand-right.png",
]
# The tile that holds both fingertips (left hand + right index finger).
MEETING_TILE = 1
TARGET = ROOT / "public/sites/proximata/images/tracks/hands.png"

# Luminance -> alpha: t = (L - LO) / (HI - LO), clamped to 0..1,
# alpha = min(1, t * ALPHA_GAIN).
LO, HI = 78, 190
ALPHA_GAIN = 1.15

# Duotone ramp over t: periwinkle -> ice until ICE_STOP, then ice -> white.
PERIWINKLE = (120, 150, 220)
ICE = (200, 241, 255)  # #C8F1FF
WHITE = (255, 255, 255)
ICE_STOP = 0.6

# Export edges: up to MAX_EDGE lines from a border, ending in a step of at
# least EDGE_STEP mean luminance up to the content.
MAX_EDGE = 8
EDGE_STEP = 20

# Vertical alignment: compare the mean luminance of ALIGN_COLUMNS facing
# columns per row, searching shifts of up to MAX_SHIFT rows.
ALIGN_COLUMNS = 4
MAX_SHIFT = 6

# A pixel belongs to a hand when its output alpha is at least this much.
HAND_ALPHA = 0.5

# Width (px) of the fade where each arm is cut off at the picture's edges.
ARM_FADE = 280

Box = tuple[int, int, int, int]


def ramp_t(lum: int) -> float:
    return min(1.0, max(0.0, (lum - LO) / (HI - LO)))


def alpha_for(lum: int) -> int:
    return round(min(1.0, ramp_t(lum) * ALPHA_GAIN) * 255)


def lerp(c0: tuple[int, int, int], c1: tuple[int, int, int], k: float) -> tuple[int, int, int]:
    return tuple(round(a + (b - a) * k) for a, b in zip(c0, c1))


def colour_for(lum: int) -> tuple[int, int, int]:
    t = ramp_t(lum)
    if t < ICE_STOP:
        return lerp(PERIWINKLE, ICE, t / ICE_STOP)
    return lerp(ICE, WHITE, (t - ICE_STOP) / (1 - ICE_STOP))


def load_luminance(path: pathlib.Path) -> Image.Image:
    """Greyscale of the source composited on black (transparent -> dark)."""
    rgba = Image.open(path).convert("RGBA")
    black = Image.new("RGBA", rgba.size, (0, 0, 0, 255))
    return Image.alpha_composite(black, rgba).convert("L")


def line_mean(image: Image.Image, box: Box) -> float:
    data = image.crop(box).tobytes()
    return sum(data) / len(data)


def edge_depth(means: list[float]) -> int:
    """Lines to trim, given line means ordered from the border inwards."""
    steps = [(means[k] - means[k - 1], k) for k in range(1, len(means))]
    step, depth = max(steps)
    return depth if step >= EDGE_STEP else 0


def trim_edges(image: Image.Image) -> tuple[Image.Image, dict[str, int]]:
    w, h = image.size
    n = MAX_EDGE + 1
    trims = {
        "left": edge_depth([line_mean(image, (x, 0, x + 1, h)) for x in range(n)]),
        "right": edge_depth([line_mean(image, (w - 1 - x, 0, w - x, h)) for x in range(n)]),
        "top": edge_depth([line_mean(image, (0, y, w, y + 1)) for y in range(n)]),
        "bottom": edge_depth([line_mean(image, (0, h - 1 - y, w, h - y)) for y in range(n)]),
    }
    box = (trims["left"], trims["top"], w - trims["right"], h - trims["bottom"])
    return image.crop(box), trims


def row_profile(image: Image.Image, x0: int, x1: int) -> list[float]:
    px = image.load()
    return [sum(px[x, y] for x in range(x0, x1)) / (x1 - x0) for y in range(image.size[1])]


def vertical_shift(left: Image.Image, right: Image.Image) -> int:
    """Rows `right` sits above `left`: left row y continues right row y + shift."""
    a = row_profile(left, left.size[0] - ALIGN_COLUMNS, left.size[0])
    b = row_profile(right, 0, ALIGN_COLUMNS)

    def mismatch(shift: int) -> float:
        pairs = [(a[y], b[y + shift]) for y in range(len(a)) if 0 <= y + shift < len(b)]
        return sum(abs(p - q) for p, q in pairs) / len(pairs)

    return min(range(-MAX_SHIFT, MAX_SHIFT + 1), key=mismatch)


def join(tiles: list[Image.Image]) -> tuple[Image.Image, list[int], list[int]]:
    xs = [sum(t.size[0] for t in tiles[:i]) for i in range(len(tiles))]
    ys = [0]
    for left, right in zip(tiles, tiles[1:]):
        ys.append(ys[-1] - vertical_shift(left, right))
    top = min(ys)
    ys = [y - top for y in ys]
    height = max(y + t.size[1] for y, t in zip(ys, tiles))
    strip = Image.new("L", (sum(t.size[0] for t in tiles), height), 0)
    for tile, x, y in zip(tiles, xs, ys):
        strip.paste(tile, (x, y))
    return strip, xs, ys


def column_has_hand(strip: Image.Image, x: int, threshold: int) -> bool:
    return strip.crop((x, 0, x + 1, strip.size[1])).getextrema()[1] >= threshold


def fingertip_gap(strip: Image.Image, x0: int, x1: int) -> tuple[int, int]:
    """Rightmost hand column of the left fingers and leftmost of the right finger.

    Within the meeting tile, the fingertips are separated by the widest run of
    columns with no hand pixels that has hand pixels on both sides.
    """
    threshold = next(lum for lum in range(256) if alpha_for(lum) >= HAND_ALPHA * 255)
    filled = [column_has_hand(strip, x, threshold) for x in range(x0, x1)]
    best: tuple[int, int] | None = None
    start: int | None = None
    for i, has_hand in enumerate(filled):
        if not has_hand and start is None:
            start = i
        elif has_hand and start is not None:
            if start > 0 and (best is None or i - start > best[1] - best[0]):
                best = (start, i)
            start = None
    if best is None:
        raise SystemExit("No fingertip gap found in the meeting tile")
    return x0 + best[0] - 1, x0 + best[1]


def hand_rows(strip: Image.Image, x: int, threshold: int) -> tuple[int, int]:
    column = strip.crop((x, 0, x + 1, strip.size[1])).tobytes()
    rows = [y for y, lum in enumerate(column) if lum >= threshold]
    return rows[0], rows[-1]


def smoothstep(k: float) -> float:
    k = min(1.0, max(0.0, k))
    return k * k * (3 - 2 * k)


def fade_arm_ends(image: Image.Image, threshold: int) -> tuple[Image.Image, int, int]:
    """Darken luminance over ARM_FADE px inward from the first and last hand columns."""
    width, height = image.size
    left = next(x for x in range(width) if column_has_hand(image, x, threshold))
    right = next(x for x in range(width - 1, -1, -1) if column_has_hand(image, x, threshold))
    row = bytes(
        round(255 * smoothstep((x - left) / ARM_FADE) * smoothstep((right - x) / ARM_FADE))
        for x in range(width)
    )
    mask = Image.frombytes("L", (width, 1), row).resize((width, height), Image.Resampling.NEAREST)
    return ImageChops.multiply(image, mask), left, right


def main() -> None:
    tiles = []
    for path in SOURCES:
        tile, trims = trim_edges(load_luminance(path))
        cut = ", ".join(f"{side} {n}px" for side, n in trims.items() if n) or "none"
        print(f"{path.name}: trimmed {cut} -> {tile.size[0]}x{tile.size[1]}")
        tiles.append(tile)

    strip, xs, ys = join(tiles)
    print(f"joined strip {strip.size[0]}x{strip.size[1]}, tile offsets x={xs} y={ys}")

    meet_x0 = xs[MEETING_TILE]
    meet_x1 = meet_x0 + tiles[MEETING_TILE].size[0]
    left_tip, right_tip = fingertip_gap(strip, meet_x0, meet_x1)
    threshold = next(lum for lum in range(256) if alpha_for(lum) >= HAND_ALPHA * 255)
    print(
        f"fingertips: left x={left_tip} (rows {hand_rows(strip, left_tip, threshold)}), "
        f"right x={right_tip} (rows {hand_rows(strip, right_tip, threshold)})"
    )

    # The gap spans the columns left_tip + 1 .. right_tip - 1; centre it.
    twice_centre = left_tip + 1 + right_tip
    twice_half = min(twice_centre, 2 * strip.size[0] - twice_centre)
    crop_x0 = (twice_centre - twice_half) // 2
    crop_x1 = (twice_centre + twice_half) // 2
    cropped = strip.crop((crop_x0, 0, crop_x1, strip.size[1]))
    print(f"gap centre x={twice_centre / 2}, crop x {crop_x0}-{crop_x1}")

    faded, arm_left, arm_right = fade_arm_ends(cropped, threshold)
    print(f"arm ends faded over {ARM_FADE}px from x={arm_left} and x={arm_right}")

    image = Image.frombytes("P", faded.size, faded.tobytes())
    image.putpalette([channel for lum in range(256) for channel in colour_for(lum)])
    alphas = bytes(alpha_for(lum) for lum in range(256))

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    image.save(TARGET, optimize=True, transparency=alphas)
    w, h = image.size
    kib = TARGET.stat().st_size / 1024
    print(
        f"wrote {TARGET.relative_to(ROOT)}: {w}x{h} ({kib:.0f} KiB), "
        f"quarter {w / 4}x{h} -> CSS aspect-[{w}/{4 * h}]"
    )


if __name__ == "__main__":
    main()
