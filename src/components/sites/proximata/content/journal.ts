export type Article = {
  category: string;
  title: string;
  excerpt: string;
  /** Path under public/sites/proximata/images/journal/. */
  image: string;
  alt: string;
  href: string;
};

export const journalCopy = {
  tag: "JOURNAL",
  title: "Ideas worth carrying forward",
  moreLabel: "Explore All",
} as const;

/** Link for the "Explore All" button; the button is hidden while this is null. */
export const journalUrl: string | null = null;

/**
 * Recaps and write-ups, shown in the order listed. The section is not on the
 * page yet (see src/app/page.tsx) and renders nothing while this is empty.
 */
export const articles: readonly Article[] = [];
