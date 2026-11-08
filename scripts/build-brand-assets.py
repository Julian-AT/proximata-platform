#!/usr/bin/env python3
"""Build Proximata logo stand-ins and app icons from the brand book PDF.

The brand book embeds the logos as raster images (an alpha mask plus a
colour layer), not vectors. Until the organisers supply SVG originals, this
script extracts the masks and writes:

  public/sites/proximata/images/brand/proximata-wordmark.png  white wordmark
  public/sites/proximata/images/brand/proximata-mark.png      white mark
  src/app/icon.png        512px favicon: white mark on brand blue
  src/app/apple-icon.png  180px touch icon: same

Requires pdftocairo (poppler) and Pillow.
Usage: python3 scripts/build-brand-assets.py ["brand-book/Proximata Brand book.pdf"]
"""

import base64
import io
import pathlib
import re
import subprocess
import sys
import tempfile

from PIL import Image, ImageDraw

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "brand-book/Proximata Brand book.pdf"
BRAND_DIR = ROOT / "public/sites/proximata/images/brand"
APP_DIR = ROOT / "src/app"

BRAND_BLUE = (32, 45, 133, 255)
IMAGE_RE = re.compile(
    r'<image[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"[^>]*href="data:image/png;base64,([^"]+)"'
)


def page_masks(page: int) -> list[Image.Image]:
    """Greyscale alpha masks embedded on one PDF page."""
    with tempfile.TemporaryDirectory() as tmp:
        svg = pathlib.Path(tmp) / "page.svg"
        subprocess.run(
            ["pdftocairo", "-svg", "-f", str(page), "-l", str(page), str(PDF), str(svg)],
            check=True,
        )
        images = [
            Image.open(io.BytesIO(base64.b64decode(data)))
            for _, _, data in IMAGE_RE.findall(svg.read_text())
        ]
    return [image for image in images if image.mode == "L"]


def white_on_alpha(mask: Image.Image) -> Image.Image:
    """White artwork using the mask as alpha, trimmed to its bounding box."""
    mask = mask.crop(mask.getbbox())
    art = Image.new("RGBA", mask.size, (255, 255, 255, 0))
    art.putalpha(mask)
    return art


def app_icon(mark: Image.Image, size: int) -> Image.Image:
    """Mark centred on a rounded brand-blue square with one blade of clear space."""
    icon = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(icon).rounded_rectangle(
        (0, 0, size - 1, size - 1), radius=round(size * 0.22), fill=BRAND_BLUE
    )
    inner = round(size * 0.64)
    scaled = mark.copy()
    scaled.thumbnail((inner, inner), Image.LANCZOS)
    icon.alpha_composite(scaled, ((size - scaled.width) // 2, (size - scaled.height) // 2))
    return icon


def main() -> None:
    BRAND_DIR.mkdir(parents=True, exist_ok=True)

    # Page 1: cover wordmark (865x147). Page 6: logo slide with the 2000px mark.
    wordmark = white_on_alpha(page_masks(1)[0])
    mark = white_on_alpha(page_masks(6)[0])

    wordmark.save(BRAND_DIR / "proximata-wordmark.png", optimize=True)
    mark_web = mark.copy()
    mark_web.thumbnail((1024, 1024), Image.LANCZOS)
    mark_web.save(BRAND_DIR / "proximata-mark.png", optimize=True)

    app_icon(mark, 512).save(APP_DIR / "icon.png", optimize=True)
    app_icon(mark, 180).save(APP_DIR / "apple-icon.png", optimize=True)

    print(f"wordmark {wordmark.size}, mark {mark_web.size}, icons 512/180")


if __name__ == "__main__":
    main()
