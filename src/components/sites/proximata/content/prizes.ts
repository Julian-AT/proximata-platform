// Prize podium. Amounts are not published yet: keep every card an honest
// placeholder until the organisers confirm the prizes.

export type Prize = {
  /** Podium label set in Archivo, e.g. "1st". */
  place: string;
  title: string;
  description: string;
  features: readonly string[];
  /** Highlighted middle card (brand-blue panel). */
  featured: boolean;
};

export const prizesSection = {
  tag: "PRIZES",
  title: "Exceptional Prizes.",
  /** In-page anchor; the section root keeps the "ticket" scroll target id. */
  anchor: "prizes",
  featuresLabel: "What you win:",
  cta: "Register on Luma",
} as const;

const placeholderFeatures = [
  "Prize details announced soon",
  // Confirmed: track winners pitch to the jury. Who decides the places is not.
  "Track winners pitch to an external jury",
] as const;

/** In place order (1st, 2nd, 3rd); the desktop grid reorders them into a podium. */
export const prizes: readonly Prize[] = [
  {
    place: "1st",
    title: "First place",
    description: "Details announced soon.",
    features: placeholderFeatures,
    featured: true,
  },
  {
    place: "2nd",
    title: "Second place",
    description: "Details announced soon.",
    features: placeholderFeatures,
    featured: false,
  },
  {
    place: "3rd",
    title: "Third place",
    description: "Details announced soon.",
    features: placeholderFeatures,
    featured: false,
  },
];
