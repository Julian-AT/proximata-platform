#!/usr/bin/env python3
"""Build the link-preview card (Open Graph and Twitter) from the site's assets.

The card mirrors the hero: the hero glow at the page's 22% over ink, the
site's grain, "BUILDING BETTER WORLDS" in Archivo Black and brand ice, the
"24h hackathon" line, and the organiser lockup proximata × HOIV × START
Vienna as on the partners section. It names no sponsors, so it stays correct
when the sponsor list changes.

Usage: python3 -I scripts/build-og-image.py
Output: public/sites/proximata/images/og/building-better-worlds.jpg (1200x630)
"""

from __future__ import annotations

import pathlib
import random

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMAGES = ROOT / "public/sites/proximata/images"
OUT = IMAGES / "og/building-better-worlds.jpg"
FONT = ROOT / "assets/fonts/ArchivoBlack-Regular.ttf"

WIDTH, HEIGHT = 1200, 630
# Drawn at 2x and scaled down, so edges and the thin divider strokes stay smooth.
SCALE = 2

# Mirrors src/components/sites/proximata/brand-colors.ts.
INK = (0x23, 0x20, 0x1E)
ICE = (0xC8, 0xF1, 0xFF)
WHITE = (0xFF, 0xFF, 0xFF)
SOFT = (0xFF, 0xFF, 0xFF, 153)  # white at 60%, the site's text-soft

GLOW_OPACITY = 0.22  # HeroGlow in background.tsx
# Grain as in AnimatedNoise (background.tsx); seeded so builds are identical.
GRAIN_GREY, GRAIN_OPACITY, GRAIN_THRESHOLD, GRAIN_SEED = 122, 0.18, 0.5, 13

TITLE_LINES = ("BUILDING BETTER", "WORLDS")
TITLE_WIDTH = 0.74  # widest line, as a share of the card width
TITLE_LEADING = 0.98  # line advance in ems, as in scripts/build-title-svg.mjs
SUBTITLE = "A 24h hackathon in Vienna · 13–14 Nov 2026"

# Organiser lockup, sized like the partners section: START Vienna and HOIV
# share one height and the Proximata wordmark is 148px wide next to 40px.
CO_LOGO_HEIGHT = 44
WORDMARK_WIDTH = round(148 * CO_LOGO_HEIGHT / 40)
LOCKUP_GAP = 36
LOGOS = (
    IMAGES / "brand/proximata-wordmark.png",
    IMAGES / "partners/hoiv.png",
    IMAGES / "partners/start-vienna-white.png",
)


def px(value: float) -> int:
    return round(value * SCALE)


def cover(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Scales and centre-crops like CSS object-fit: cover."""
    ratio = max(size[0] / image.width, size[1] / image.height)
    resized = image.resize((round(image.width * ratio), round(image.height * ratio)), Image.Resampling.LANCZOS)
    left, top = (resized.width - size[0]) // 2, (resized.height - size[1]) // 2
    return resized.crop((left, top, left + size[0], top + size[1]))


def grain(size: tuple[int, int]) -> Image.Image:
    rng = random.Random(GRAIN_SEED)
    alpha = bytes(
        round((n - GRAIN_THRESHOLD) / (1 - GRAIN_THRESHOLD) * GRAIN_OPACITY * 255) if n > GRAIN_THRESHOLD else 0
        for n in (rng.random() for _ in range(size[0] * size[1]))
    )
    layer = Image.new("RGBA", size, (GRAIN_GREY, GRAIN_GREY, GRAIN_GREY, 0))
    layer.putalpha(Image.frombytes("L", size, alpha))
    return layer


def logo(path: pathlib.Path, *, width: int | None = None, height: int | None = None) -> Image.Image:
    image = Image.open(path).convert("RGBA")
    if width is not None:
        height = round(image.height * width / image.width)
    else:
        assert height is not None
        width = round(image.width * height / image.height)
    return image.resize((px(width), px(height)), Image.Resampling.LANCZOS)


def centred_text(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, y: float, fill: tuple[int, ...]) -> None:
    draw.text((px(WIDTH) / 2, y), text, font=font, fill=fill, anchor="ma")


def main() -> None:
    size = (px(WIDTH), px(HEIGHT))
    glow = cover(Image.open(IMAGES / "bg/hero-glow.png").convert("RGB"), size)
    card = Image.blend(Image.new("RGB", size, INK), glow, GLOW_OPACITY).convert("RGBA")
    draw = ImageDraw.Draw(card)

    # Title: size the widest line to TITLE_WIDTH of the card.
    probe = ImageFont.truetype(str(FONT), 100)
    widest = max(probe.getlength(line) for line in TITLE_LINES)
    title_font = ImageFont.truetype(str(FONT), round(100 * px(WIDTH) * TITLE_WIDTH / widest))
    subtitle_font = ImageFont.truetype(str(FONT), px(30))
    em = title_font.size
    cap = title_font.getbbox("B", anchor="ls")[1] * -1  # cap height above the baseline

    lockup_logos = [logo(LOGOS[0], width=WORDMARK_WIDTH), *(logo(p, height=CO_LOGO_HEIGHT) for p in LOGOS[1:])]
    lockup_height = max(image.height for image in lockup_logos)

    # Stack: title, subtitle, lockup, centred as one block.
    title_height = cap + em * TITLE_LEADING * (len(TITLE_LINES) - 1)
    subtitle_gap, lockup_gap = px(40), px(64)
    subtitle_height = subtitle_font.getbbox(SUBTITLE, anchor="ma")[3]
    block = title_height + subtitle_gap + subtitle_height + lockup_gap + lockup_height
    top = (size[1] - block) / 2

    baseline = top + cap
    for line in TITLE_LINES:
        draw.text((size[0] / 2, baseline), line, font=title_font, fill=ICE, anchor="ms")
        baseline += em * TITLE_LEADING
    subtitle_top = top + title_height + subtitle_gap
    centred_text(draw, SUBTITLE, subtitle_font, subtitle_top, WHITE)

    # Lockup row: logos with × dividers between them, vertically centred.
    divider = px(14)
    row_width = sum(image.width for image in lockup_logos) + (len(lockup_logos) - 1) * (2 * px(LOCKUP_GAP) + divider)
    x = (size[0] - row_width) / 2
    centre_y = subtitle_top + subtitle_height + lockup_gap + lockup_height / 2
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    lines = ImageDraw.Draw(overlay)
    for i, image in enumerate(lockup_logos):
        if i:
            x += px(LOCKUP_GAP)
            half = divider / 2
            for start, end in (((x, centre_y - half), (x + divider, centre_y + half)), ((x + divider, centre_y - half), (x, centre_y + half))):
                lines.line((start, end), fill=SOFT, width=px(1.5))
            x += divider + px(LOCKUP_GAP)
        overlay.alpha_composite(image, (round(x), round(centre_y - image.height / 2)))
        x += image.width
    card.alpha_composite(overlay)

    # Grain goes on at the final size, so scaling down doesn't blur it away.
    final = card.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS)
    final.alpha_composite(grain((WIDTH, HEIGHT)))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    final.convert("RGB").save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{OUT.relative_to(ROOT)} ({WIDTH}x{HEIGHT}, {OUT.stat().st_size:,} B)")


if __name__ == "__main__":
    main()
