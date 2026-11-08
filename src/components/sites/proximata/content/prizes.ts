// Prize podium. Amounts are not approved for publishing: every prize keeps
// `details: null` until the organisers confirm it. While no prize has details
// the section shows a slim "announced soon" podium; once one does, the full
// prize cards replace it.

export type PrizeDetails = {
  description: string;
  /** Listed under "What you win:". */
  features: readonly string[];
};

export type Prize = {
  /** Podium label set in Archivo, e.g. "1st". */
  place: string;
  title: string;
  /** Highlighted middle card (brand-blue panel). */
  featured: boolean;
  /** Confirmed prize contents, or `null` while still unannounced. */
  details: PrizeDetails | null;
};

export const prizesSection = {
  tag: "PRIZES",
  title: "Exceptional Prizes.",
  /** In-page anchor; the section root keeps the "ticket" scroll target id. */
  anchor: "prizes",
  featuresLabel: "What you win:",
  /** Shown in place of a prize's details while they are unannounced. */
  pending: "Announced soon",
  // Confirmed: track winners pitch to the jury. Who decides the places is not.
  note: "Track winners pitch to an external jury.",
  cta: "Register on Luma",
} as const;

/** In place order (1st, 2nd, 3rd); the desktop layout reorders them into a podium. */
export const prizes: readonly Prize[] = [
  { place: "1st", title: "First place", featured: true, details: null },
  { place: "2nd", title: "Second place", featured: false, details: null },
  { place: "3rd", title: "Third place", featured: false, details: null },
];
