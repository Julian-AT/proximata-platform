import { event, LUMA_URL, proximataLinks } from "./event";

const { venue } = event;

export const footerCopy = {
  ctaNote: "Registration requires host approval. Places are limited.",
  register: { label: "Register on Luma", href: LUMA_URL },
  follow: { label: "Follow Proximata on Luma", href: proximataLinks.luma },
  venue: {
    label: "Venue",
    value: `${venue.name} · ${venue.street}, ${venue.postcode} ${venue.city}`,
    href: venue.mapsUrl,
  },
  contact: { label: "Contact", value: event.contactEmail, href: `mailto:${event.contactEmail}` },
  rights: "© 2026 Proximata. All rights reserved.",
  poweredBy: `Powered by ${event.poweredBy.name}`,
} as const;

/** Image credits for the About cut-outs (licence terms in assets/source/about/CREDITS.md). */
export const imageCredits = [
  {
    label: "Pallas Athene photo: Viennpixelart, CC BY-SA 4.0, cropped and recoloured",
    href: "https://commons.wikimedia.org/wiki/File:Pallas_Athene-Kopf,Vienna.jpg",
  },
  {
    label: "Robonaut 2 photo: NASA / Robert Markowitz",
    href: "https://commons.wikimedia.org/wiki/File:Robonaut_2.jpg",
  },
] as const;

/** External link pills next to the in-page anchors. */
export const footerExternalLinks = [
  { label: "Luma", href: LUMA_URL },
  { label: "Instagram", href: proximataLinks.instagram },
  { label: "LinkedIn", href: proximataLinks.linkedin },
  { label: "proximata.io", href: proximataLinks.website },
] as const;
