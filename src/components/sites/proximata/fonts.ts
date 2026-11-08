import { Archivo_Black, JetBrains_Mono } from "next/font/google";

// Proximata brand fonts (brand book, section 06), self-hosted by next/font.

/** Titles, headlines, and short high-impact statements only. */
export const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--nf-archivo",
  display: "swap",
});

/** Body text and every other label (Regular and Medium). */
export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--nf-mono",
  display: "swap",
});

export const fontVariables = [archivoBlack.variable, jetBrainsMono.variable].join(" ");
