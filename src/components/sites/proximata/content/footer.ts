import { event, LUMA_URL, proximataLinks } from "./event";

const { venue } = event;

export const footerCopy = {
  tagline: event.tagline,
  about:
    "Proximata is a Vienna-based builder space and tech agency focusing on the most ambitious technical challenges and enabling top innovation in the EU.",
  ctaNote: "Registration requires host approval. Places are limited.",
  register: { label: "Register on Luma", href: LUMA_URL },
  follow: { label: "Follow Proximata on Luma", href: proximataLinks.luma },
  /** Postcode left out until the organisers confirm it. */
  venue: {
    label: "Venue",
    value: `${venue.name} · ${venue.street}, ${venue.city}`,
    href: venue.mapsUrl,
  },
  contact: { label: "Contact", value: event.contactEmail, href: `mailto:${event.contactEmail}` },
  rights: "© 2026 Proximata. All rights reserved.",
  poweredBy: `Powered by ${event.poweredBy.name}`,
} as const;

/** External link pills next to the in-page anchors. */
export const footerExternalLinks = [
  { label: "Luma", href: LUMA_URL },
  { label: "Instagram", href: proximataLinks.instagram },
  { label: "LinkedIn", href: proximataLinks.linkedin },
  { label: "proximata.io", href: proximataLinks.website },
] as const;
