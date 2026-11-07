import localFont from "next/font/local";

// Fonts served by confer.framer.website, self-hosted from public/sites/confer/fonts.

export const clashGrotesk = localFont({
  src: "../../../../public/sites/confer/fonts/clash-grotesk-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--nf-clash",
  display: "swap",
});

// Variable file (wght 200–700). The source renders it at "wght" 500.
export const clashGroteskVariable = localFont({
  src: "../../../../public/sites/confer/fonts/clash-grotesk-variable.woff2",
  weight: "200 700",
  style: "normal",
  variable: "--nf-clash-variable",
  display: "swap",
});

export const beVietnamPro = localFont({
  src: "../../../../public/sites/confer/fonts/be-vietnam-pro-400.woff2",
  weight: "400",
  style: "normal",
  variable: "--nf-vietnam",
  display: "swap",
});

// Latin subset covers every glyph on the page (incl. U+2019).
export const interDisplay = localFont({
  src: "../../../../public/sites/confer/fonts/inter-display-500-latin.woff2",
  weight: "500",
  style: "normal",
  variable: "--nf-inter-display",
  display: "swap",
});

export const inter = localFont({
  src: [
    {
      path: "../../../../public/sites/confer/fonts/inter-600-latin.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/sites/confer/fonts/inter-900-latin.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--nf-inter",
  display: "swap",
});

export const conferFontVariables = [
  clashGrotesk.variable,
  clashGroteskVariable.variable,
  beVietnamPro.variable,
  interDisplay.variable,
  inter.variable,
].join(" ");
