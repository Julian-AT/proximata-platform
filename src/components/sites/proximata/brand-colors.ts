// Brand palette as plain values for code that cannot read Tailwind classes
// (WebGL shader uniforms, canvas drawing, generated images). Mirrors the
// colour tokens in src/app/globals.css.

export const brandColors = {
  ink: "#23201E",
  paper: "#F4F7F8",
  brand: "#202D85",
  ice: "#C8F1FF",
  highlight: "#9DE146",
  signal: "#D82434",
  white: "#FFFFFF",
} as const;

export type BrandColor = keyof typeof brandColors;

/** "#RRGGBB" → [r, g, b] in 0–1. */
export function hexToRgb01(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}
