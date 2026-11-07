/**
 * Element ids the fixed background reacts to while scrolling. Kept in a plain
 * module so Server Components can read the values (exports of "use client"
 * files become client references on the server).
 */
export const SCROLL_TARGETS = {
  heroInfo: "info-tile",
  aboutTitle: "about-title",
  footer: "site-footer",
} as const;
