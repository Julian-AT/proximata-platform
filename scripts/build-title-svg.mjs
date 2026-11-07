#!/usr/bin/env node
// Convert "BUILDING BETTER WORLDS" set in Archivo Black into SVG outlines.
// The glass shader builds its heightmap from these files' alpha, and the
// same files (filled ice) are the static fallback, so no pre-rendered PNG
// is needed.
//
// Usage: node scripts/build-title-svg.mjs
// Output: public/sites/proximata/images/brand/title-{1,2,3}-line.svg

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontPath = join(root, "assets/fonts/ArchivoBlack-Regular.ttf");
const outDir = join(root, "public/sites/proximata/images/brand");

const FILL = "#C8F1FF"; // brand ice
const SIZE = 200; // em size in SVG units
const LEADING = 0.98; // line advance, in ems
const PADDING = 0.04; // padding around the artwork, as a share of the em size

const layouts = {
  "title-1-line": ["BUILDING BETTER WORLDS"],
  "title-2-line": ["BUILDING BETTER", "WORLDS"],
  "title-3-line": ["BUILDING", "BETTER", "WORLDS"],
};

const buffer = readFileSync(fontPath);
const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));

const scale = SIZE / font.unitsPerEm;

/**
 * SVG path data with one decimal. opentype.js 2.0's own toPathData() turns
 * tiny fractional parts (e.g. 1e-13) into NaN, so commands are formatted here.
 */
function pathData(path) {
  const n = (v) => {
    const rounded = Math.round(v * 10) / 10;
    return Object.is(rounded, -0) ? "0" : String(rounded);
  };
  return path.commands
    .map((c) => {
      switch (c.type) {
        case "M":
        case "L":
          return `${c.type}${n(c.x)} ${n(c.y)}`;
        case "Q":
          return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case "C":
          return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        case "Z":
          return "Z";
        default:
          throw new Error(`Unsupported path command ${c.type}`);
      }
    })
    .join("");
}

/**
 * Glyphs with pair kerning applied. opentype.js 2.0 returns NaN for some
 * pairs in this font (e.g. "TT"), so invalid kerning values count as 0.
 */
function layoutLine(line) {
  const glyphs = font.stringToGlyphs(line);
  const positions = [];
  let x = 0;
  glyphs.forEach((glyph, i) => {
    positions.push(x);
    const kerning = i < glyphs.length - 1 ? font.getKerningValue(glyph, glyphs[i + 1]) : 0;
    x += ((glyph.advanceWidth ?? 0) + (Number.isFinite(kerning) ? kerning : 0)) * scale;
  });
  return { glyphs, positions, width: x };
}

function build(lines) {
  const pad = SIZE * PADDING;
  const laidOut = lines.map(layoutLine);
  const width = Math.ceil(Math.max(...laidOut.map((l) => l.width)) + pad * 2);
  const capHeight = ((font.tables.os2?.sCapHeight ?? font.ascender * 0.7) / font.unitsPerEm) * SIZE;
  const height = Math.ceil(capHeight + (lines.length - 1) * SIZE * LEADING + pad * 2);

  const paths = laidOut.map(({ glyphs, positions, width: lineWidth }, i) => {
    // Centre each line; baseline sits capHeight below the top padding.
    const x0 = (width - lineWidth) / 2;
    const y = pad + capHeight + i * SIZE * LEADING;
    return glyphs
      .map((glyph, g) => pathData(glyph.getPath(x0 + positions[g], y, SIZE)))
      .join(" ");
  });
  const data = paths.join(" ");
  if (data.includes("NaN")) throw new Error("Invalid path data generated");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path fill="${FILL}" d="${data}"/></svg>\n`;
}

mkdirSync(outDir, { recursive: true });
for (const [name, lines] of Object.entries(layouts)) {
  const svg = build(lines);
  writeFileSync(join(outDir, `${name}.svg`), svg);
  const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
  console.log(`${name}.svg ${w}x${h} (${(w / h).toFixed(2)}:1)`);
}
