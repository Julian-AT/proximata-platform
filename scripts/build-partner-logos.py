#!/usr/bin/env python3
"""Build the flat white partner logos for the Partners section.

Each logo comes from the organisation's own file (the URLs in LOGOS below) or,
where none is online, from the organisers' marketing doc in brand-book/
(git-ignored; only the derived white logos are committed):

- SVG: every fill and stroke becomes #FFFFFF, raster, style and script content
  is dropped, and the viewBox is cropped to the artwork and moved to 0 0.
- PNG: the shape comes from alpha (or from luminance when the file has none),
  is rendered pure white, trimmed to its bounds and scaled to OUT_HEIGHT.

Downloads are untrusted data: they go to a cache directory outside the repo
and are only parsed, never executed. Some hosts (redbull.com) refuse scripted
requests; save that file from a browser to <cache>/<name>/source and pass the
same --cache. Run with an isolated interpreter:

Usage: python3 -I scripts/build-partner-logos.py [--cache DIR] [name ...]
Output: public/sites/proximata/images/partners/<name>.svg|png
"""

from __future__ import annotations

import argparse
import io
import math
import pathlib
import re
import tempfile
import urllib.request
import xml.etree.ElementTree as ET
import zipfile
from collections.abc import Callable, Iterator
from dataclasses import dataclass
from urllib.parse import urljoin

from PIL import Image, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
TARGET = ROOT / "public/sites/proximata/images/partners"
DOC = ROOT / "brand-book/Hackathon planning/Promos, logo, and marketing.docx"

WHITE = "#FFFFFF"
# PNG output height: about 2x the largest display height on the page.
OUT_HEIGHT = 96
# Mask values below this don't count when trimming (soft shadows, noise).
TRIM_THRESHOLD = 16
MAX_DOWNLOAD = 20 * 1024 * 1024
# Some hosts drop requests without a browser-like user agent.
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"


@dataclass(frozen=True)
class Logo:
    name: str
    """Output file stem."""
    url: str | None = None
    """The organisation's own logo file (or page, with `extract`)."""
    doc_image: str | None = None
    """Fallback (or only source): word/media/<file> inside DOC."""
    extract: Callable[[str], bytes] | None = None
    """Builds the source file from `url` when there is no static file."""
    drop_tags: tuple[str, ...] = ()
    """SVG elements to remove, e.g. background boxes behind the letters."""
    levels: tuple[int, int] | None = None
    """PNG: mask values at or below the first become 0, at or above the second 255."""
    prepare: Callable[[bytes], bytes] | None = None
    """Rebuilds the source before whitening, e.g. a colour logo as one colour."""


def biscuit_wordmark(url: str) -> bytes:
    """biscuit.so has no static logo file. Its logo menu ("Download white logo
    as .svg") builds biscuit-logo-white.svg in the browser from the wordmark
    paths in one of the page's JS modules; rebuild that file the same way."""
    html = fetch(url).decode("utf-8", "replace")
    for href in re.findall(r'href="(/_uc/[^"]+\.js)"', html):
        js = fetch(urljoin(url, href)).decode("utf-8", "replace")
        block = re.search(r"BISCUIT_LOGO_PATHS = \[(.*?)\];", js, re.S)
        if not block:
            continue
        paths = re.findall(r"\bd: `([^`]+)`", block.group(1))
        view_box = re.search(r"LOGO_VIEW_BOX = `([\d. ]+)`", js)
        if not paths or not all(re.fullmatch(r"[MmLlHhVvCcSsQqTtZz\d.,\se+-]+", d) for d in paths):
            raise RuntimeError("unexpected Biscuit wordmark path data")
        markup = "".join(f'<path d="{d}"/>' for d in paths)
        box = view_box.group(1) if view_box else "0 0 3380 780"
        return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{box}" fill="{WHITE}">{markup}</svg>'.encode()
    raise RuntimeError("Biscuit wordmark paths not found")


LOGOS: tuple[Logo, ...] = (
    # Sponsors
    Logo("n8n", url="https://guidelines.n8n.design/downloads/logo/lockup/n8n-logo-white.svg"),
    Logo("techbold", url="https://www.techbold.at/wp-content/uploads/2015/10/techbold_Logo_RGB.png"),
    # Sail icon only; the site sets the name "maritime" as text next to it.
    Logo("maritime", url="https://maritime.sh/maritimelogo.png", doc_image="image8.png"),
    # White letters on a red and a slate box: keep the letters, drop the boxes.
    Logo("rhomberg", url="https://www.rhomberg.com/rhomberg/images/logos/horizontal.svg", drop_tags=("rect",)),
    Logo("biscuit", url="https://www.biscuit.so", extract=biscuit_wordmark, doc_image="image18.png"),
    # Partners
    Logo(
        "hoiv",
        url="https://homeofinnovationx.com/wp-content/uploads/2024/08/HOIV-logo-full-1.png",
        doc_image="image10.png",
    ),
    Logo(
        "ewor",
        url="https://cdn.prod.website-files.com/6621450113fa0186b23a5e6f/68b997135519bf37ee924d27_Logo_Dark.svg",
    ),
    Logo("tuwrc", url="https://www.tuwrc.at/logo_centered.svg", doc_image="image12.png"),
    # White logo on a black square with a dim chart behind it: keep only the bright parts.
    Logo(
        "wu-crypto-club",
        url="https://cryptoclubvienna.com/wp-content/uploads/2026/02/CCV-2-scaled.png",
        levels=(110, 220),
    ),
    # Icon only; the site sets the name next to it.
    Logo("hackathonhub", url="https://hackathonhub.eu/assets/logo-dark-DSApMUkW.png"),
)


# --- Sources ---------------------------------------------------------------


def fetch(url: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read(MAX_DOWNLOAD + 1)
    if len(data) > MAX_DOWNLOAD:
        raise RuntimeError(f"{url} is larger than {MAX_DOWNLOAD} bytes")
    return data


def doc_image(name: str) -> bytes:
    with zipfile.ZipFile(DOC) as docx:
        return docx.read(f"word/media/{name}")


def load_source(logo: Logo, cache: pathlib.Path) -> tuple[bytes, str]:
    """Returns the source bytes and a label saying where they came from."""
    if logo.url:
        folder = cache / logo.name
        cached = folder / "source"
        try:
            if not cached.exists():
                folder.mkdir(parents=True, exist_ok=True)
                cached.write_bytes(logo.extract(logo.url) if logo.extract else fetch(logo.url))
            return cached.read_bytes(), logo.url
        except Exception as error:  # noqa: BLE001 - any failure falls back to the doc
            if not logo.doc_image:
                raise
            print(f"  {logo.name}: {error}; falling back to the doc's {logo.doc_image}")
    if logo.doc_image:
        return doc_image(logo.doc_image), f"doc {logo.doc_image}"
    raise RuntimeError(f"{logo.name} has no source")


# --- SVG -------------------------------------------------------------------

SVG_NS = "http://www.w3.org/2000/svg"
XLINK_NS = "http://www.w3.org/1999/xlink"
SHAPES = {"path", "rect", "circle", "ellipse", "line", "polyline", "polygon"}
UNSAFE = {"image", "style", "script", "foreignObject", "metadata", "title", "desc"}
NOT_RENDERED = {"defs", "clipPath", "mask", "symbol", "pattern", "marker", "linearGradient", "radialGradient"}
NUMBER = r"[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?"
PATH_TOKEN = re.compile(rf"[MmLlHhVvCcSsQqTtAaZz]|{NUMBER}")

ET.register_namespace("", SVG_NS)
ET.register_namespace("xlink", XLINK_NS)


def local(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def fmt(value: float) -> str:
    text = f"{value:.2f}".rstrip("0").rstrip(".")
    return "0" if text == "-0" else text


def cubic_extremes(p0: float, p1: float, p2: float, p3: float) -> list[float]:
    """Values of a cubic Bézier at its ends and where its derivative is zero."""
    a = -p0 + 3 * p1 - 3 * p2 + p3
    b = 2 * (p0 - 2 * p1 + p2)
    c = p1 - p0
    roots: list[float] = []
    if abs(a) < 1e-12:
        if abs(b) > 1e-12:
            roots.append(-c / b)
    else:
        disc = b * b - 4 * a * c
        if disc >= 0:
            roots += [(-b + s * math.sqrt(disc)) / (2 * a) for s in (1, -1)]
    values = [p0, p3]
    for t in roots:
        if 0 < t < 1:
            u = 1 - t
            values.append(u**3 * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t**3 * p3)
    return values


def quad_extremes(p0: float, p1: float, p2: float) -> list[float]:
    values = [p0, p2]
    denom = p0 - 2 * p1 + p2
    if abs(denom) > 1e-12:
        t = (p0 - p1) / denom
        if 0 < t < 1:
            values.append((1 - t) ** 2 * p0 + 2 * (1 - t) * t * p1 + t * t * p2)
    return values


def arc_extremes(
    start: tuple[float, float],
    radii: tuple[float, float],
    rotation: float,
    large: bool,
    sweep: bool,
    end: tuple[float, float],
) -> list[tuple[float, float]]:
    """Points bounding an SVG arc: its ends plus the ellipse extremes it passes
    through (centre parameterisation from SVG 1.1, appendix F.6.5)."""
    (x1, y1), (x2, y2) = start, end
    rx, ry = abs(radii[0]), abs(radii[1])
    if rx == 0 or ry == 0 or start == end:
        return [start, end]
    phi = math.radians(rotation)
    cos_p, sin_p = math.cos(phi), math.sin(phi)
    dx, dy = (x1 - x2) / 2, (y1 - y2) / 2
    x1p, y1p = cos_p * dx + sin_p * dy, -sin_p * dx + cos_p * dy
    grow = (x1p / rx) ** 2 + (y1p / ry) ** 2
    if grow > 1:  # radii too small for the chord: scale up, as renderers do
        rx, ry = rx * math.sqrt(grow), ry * math.sqrt(grow)
    num = (rx * ry) ** 2 - (rx * y1p) ** 2 - (ry * x1p) ** 2
    den = (rx * y1p) ** 2 + (ry * x1p) ** 2
    coef = math.sqrt(max(0.0, num / den)) * (-1 if large == sweep else 1)
    cxp, cyp = coef * rx * y1p / ry, -coef * ry * x1p / rx
    cx = cos_p * cxp - sin_p * cyp + (x1 + x2) / 2
    cy = sin_p * cxp + cos_p * cyp + (y1 + y2) / 2

    theta = math.atan2((y1p - cyp) / ry, (x1p - cxp) / rx)
    delta = math.atan2((-y1p - cyp) / ry, (-x1p - cxp) / rx) - theta
    if sweep and delta < 0:
        delta += 2 * math.pi
    elif not sweep and delta > 0:
        delta -= 2 * math.pi

    points = [start, end]
    # Angles where x(t), then y(t), of the rotated ellipse turn around.
    for base in (math.atan2(-ry * sin_p, rx * cos_p), math.atan2(ry * cos_p, rx * sin_p)):
        for t in (base, base + math.pi):
            travelled = (t - theta) % (2 * math.pi) if delta > 0 else (theta - t) % (2 * math.pi)
            if travelled <= abs(delta):
                points.append(
                    (
                        cx + rx * cos_p * math.cos(t) - ry * sin_p * math.sin(t),
                        cy + rx * sin_p * math.cos(t) + ry * cos_p * math.sin(t),
                    )
                )
    return points


def path_points(d: str) -> Iterator[tuple[float, float]]:
    """Points that bound a path: segment ends plus curve extremes."""
    tokens = PATH_TOKEN.findall(d)
    i = 0
    cmd = ""
    x = y = start_x = start_y = 0.0
    ctrl: tuple[float, float] | None = None  # last cubic/quadratic control point
    prev = ""

    def take(n: int) -> list[float]:
        nonlocal i
        values = [float(t) for t in tokens[i : i + n]]
        if len(values) != n or any(t.isalpha() for t in tokens[i : i + n]):
            raise ValueError(f"bad path data near token {i}")
        i += n
        return values

    while i < len(tokens):
        if tokens[i].isalpha():
            cmd = tokens[i]
            i += 1
            if cmd in "Zz":
                x, y, prev = start_x, start_y, "Z"
                continue
        if not cmd:
            raise ValueError("path data must start with a command")
        kind, rel = cmd.upper(), cmd.islower()
        ox, oy = (x, y) if rel else (0.0, 0.0)
        if kind == "M":
            x, y = (v + o for v, o in zip(take(2), (ox, oy)))
            start_x, start_y = x, y
            cmd = "l" if rel else "L"  # further pairs are line-tos
            yield x, y
        elif kind == "L":
            x, y = (v + o for v, o in zip(take(2), (ox, oy)))
            yield x, y
        elif kind == "H":
            x = take(1)[0] + ox
            yield x, y
        elif kind == "V":
            y = take(1)[0] + oy
            yield x, y
        elif kind in "CS":
            if kind == "C":
                x1, y1, x2, y2, x3, y3 = take(6)
                x1, y1 = x1 + ox, y1 + oy
            else:
                x2, y2, x3, y3 = take(4)
                x1, y1 = (2 * x - ctrl[0], 2 * y - ctrl[1]) if ctrl and prev in "CS" else (x, y)
            x2, y2, x3, y3 = x2 + ox, y2 + oy, x3 + ox, y3 + oy
            for px in cubic_extremes(x, x1, x2, x3):
                yield px, y3
            for py in cubic_extremes(y, y1, y2, y3):
                yield x3, py
            ctrl, x, y = (x2, y2), x3, y3
        elif kind in "QT":
            if kind == "Q":
                x1, y1, x3, y3 = take(4)
                x1, y1 = x1 + ox, y1 + oy
            else:
                x3, y3 = take(2)
                x1, y1 = (2 * x - ctrl[0], 2 * y - ctrl[1]) if ctrl and prev in "QT" else (x, y)
            x3, y3 = x3 + ox, y3 + oy
            for px in quad_extremes(x, x1, x3):
                yield px, y3
            for py in quad_extremes(y, y1, y3):
                yield x3, py
            ctrl, x, y = (x1, y1), x3, y3
        elif kind == "A":
            rx, ry, rotation, large, sweep, x2, y2 = take(7)
            if large not in (0, 1) or sweep not in (0, 1):
                raise ValueError("arc flags must be written apart, e.g. 'a1 1 0 0 1 2 0'")
            x2, y2 = x2 + ox, y2 + oy
            yield from arc_extremes((x, y), (rx, ry), rotation, bool(large), bool(sweep), (x2, y2))
            x, y = x2, y2
        prev = kind


def shape_points(el: ET.Element) -> Iterator[tuple[float, float]]:
    tag, get = local(el.tag), (lambda k: float(el.get(k, "0")))
    if tag == "path":
        yield from path_points(el.get("d", ""))
    elif tag in ("polygon", "polyline"):
        values = [float(v) for v in re.findall(NUMBER, el.get("points", ""))]
        yield from zip(values[::2], values[1::2])
    elif tag == "rect":
        yield get("x"), get("y")
        yield get("x") + get("width"), get("y") + get("height")
    elif tag in ("circle", "ellipse"):
        rx = get("r") if tag == "circle" else get("rx")
        ry = get("r") if tag == "circle" else get("ry")
        yield get("cx") - rx, get("cy") - ry
        yield get("cx") + rx, get("cy") + ry
    elif tag == "line":
        yield get("x1"), get("y1")
        yield get("x2"), get("y2")


def rendered_shapes(el: ET.Element) -> Iterator[ET.Element]:
    for child in el:
        tag = local(child.tag)
        if tag in NOT_RENDERED:
            continue
        if child.get("transform"):
            raise NotImplementedError("transforms are not supported when cropping")
        if tag in SHAPES:
            yield child
        yield from rendered_shapes(child)


def whiten_style(el: ET.Element) -> bool:
    """Folds the few style declarations that matter into attributes; returns
    False when the element is hidden and should be removed."""
    for declaration in el.attrib.pop("style", "").split(";"):
        key, _, value = (part.strip() for part in declaration.partition(":"))
        if key == "display" and value == "none":
            return False
        if key in ("fill", "stroke", "stroke-width", "fill-rule", "clip-rule") and value:
            el.set(key, value)
    return True


def clean(el: ET.Element, drop_tags: tuple[str, ...], whiten: bool = True) -> None:
    for child in list(el):
        tag = local(child.tag)
        if tag in UNSAFE or tag in drop_tags or not whiten_style(child):
            el.remove(child)
            continue
        # Clip paths, masks and gradients keep their ids so references resolve.
        dropped = {"class", "space", "enable-background"} | (set() if tag in NOT_RENDERED else {"id"})
        for key in list(child.attrib):
            name = local(key)
            href = name == "href" and not child.get(key, "").startswith("#")
            if name in dropped or name.startswith("on") or href:
                del child.attrib[key]
            elif whiten and name in ("fill", "stroke", "stop-color") and child.get(key) != "none":
                child.set(key, WHITE)
        # A mask's colours say what shows (white) and what is cut (black): keep them.
        clean(child, drop_tags, whiten and tag != "mask")


def white_svg(data: bytes, logo: Logo) -> tuple[bytes, tuple[float, float]]:
    if b"<!DOCTYPE" in data or b"<!ENTITY" in data:
        raise ValueError("SVG with a DOCTYPE or entities is not accepted")
    root = ET.fromstring(data)
    if local(root.tag) != "svg":
        raise ValueError("not an SVG document")
    clean(root, logo.drop_tags)

    xs: list[float] = []
    ys: list[float] = []
    for shape in rendered_shapes(root):
        half_stroke = float(shape.get("stroke-width", "1")) / 2 if shape.get("stroke", "none") != "none" else 0
        for px, py in shape_points(shape):
            xs += [px - half_stroke, px + half_stroke]
            ys += [py - half_stroke, py + half_stroke]
    left, top = math.floor(min(xs) * 100) / 100, math.floor(min(ys) * 100) / 100
    width, height = math.ceil(max(xs) * 100) / 100 - left, math.ceil(max(ys) * 100) / 100 - top

    group = ET.Element(f"{{{SVG_NS}}}g", {"transform": f"translate({fmt(-left)} {fmt(-top)})"})
    group.extend(list(root))
    for child in list(root):
        root.remove(child)
    root.append(group)
    root.attrib.clear()  # the root's own fill, size and offsets are replaced below
    root.set("viewBox", f"0 0 {fmt(width)} {fmt(height)}")
    root.set("width", fmt(width))
    root.set("height", fmt(height))
    root.set("fill", WHITE)

    for el in root.iter():
        el.text = el.text.strip() if el.text and el.text.strip() else None
        el.tail = None
        if local(el.tag) == "path":
            el.set("d", re.sub(r"\s+", " ", el.get("d", "")).strip())
    return ET.tostring(root, encoding="unicode").encode() + b"\n", (width, height)


# --- PNG -------------------------------------------------------------------


def shape_mask(image: Image.Image) -> Image.Image:
    """Alpha when the file has real transparency, else luminance (inverted
    when the artwork is dark on a light background)."""
    if image.mode in ("RGBA", "LA", "PA") or "transparency" in image.info:
        alpha = image.convert("RGBA").getchannel("A")
        if alpha.getextrema()[0] < 255:
            return alpha
    lum = image.convert("L")
    border = [lum.getpixel((x, y)) for x in (0, lum.width - 1) for y in (0, lum.height - 1)]
    return ImageOps.invert(lum) if sum(border) / len(border) > 127 else lum


def white_png(data: bytes, logo: Logo) -> tuple[bytes, tuple[float, float]]:
    image = Image.open(io.BytesIO(data))
    image.load()
    mask = shape_mask(image)
    if logo.levels:
        low, high = logo.levels
        mask = mask.point(lambda v: 0 if v <= low else 255 if v >= high else round((v - low) * 255 / (high - low)))
    bounds = mask.point(lambda v: 255 if v >= TRIM_THRESHOLD else 0).getbbox()
    if not bounds:
        raise ValueError("no artwork found")
    mask = mask.crop(bounds)
    if mask.height > OUT_HEIGHT:
        mask = mask.resize((round(mask.width * OUT_HEIGHT / mask.height), OUT_HEIGHT), Image.Resampling.LANCZOS)
    out = Image.merge("LA", (Image.new("L", mask.size, 255), mask))
    buffer = io.BytesIO()
    out.save(buffer, format="PNG", optimize=True)
    return buffer.getvalue(), (out.width, out.height)


# --- Main ------------------------------------------------------------------


def build(logo: Logo, cache: pathlib.Path) -> None:
    data, origin = load_source(logo, cache)
    if logo.prepare:
        data = logo.prepare(data)
    is_svg = data.lstrip().startswith((b"<svg", b"<?xml"))
    output, (width, height) = white_svg(data, logo) if is_svg else white_png(data, logo)
    extension, stale = (".svg", ".png") if is_svg else (".png", ".svg")
    target = TARGET / f"{logo.name}{extension}"
    target.write_bytes(output)
    (TARGET / f"{logo.name}{stale}").unlink(missing_ok=True)
    print(f"{logo.name}: {origin} -> {target.relative_to(ROOT)} ({fmt(width)}x{fmt(height)}, {len(output):,} B)")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--cache", type=pathlib.Path, help="download cache outside the repo (default: a temp dir)")
    parser.add_argument("names", nargs="*", help="only build these logos")
    args = parser.parse_args()
    cache = args.cache or pathlib.Path(tempfile.mkdtemp(prefix="partner-logos-"))
    unknown = set(args.names) - {logo.name for logo in LOGOS}
    if unknown:
        raise SystemExit(f"unknown logo(s): {', '.join(sorted(unknown))}")
    TARGET.mkdir(parents=True, exist_ok=True)
    for logo in LOGOS:
        if not args.names or logo.name in args.names:
            build(logo, cache)


if __name__ == "__main__":
    main()
