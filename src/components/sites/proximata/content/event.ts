// Single source for confirmed event facts (Luma event page and the organisers'
// planning document). Section content lives next to this file in content/.

/** Public Luma page. Never use a personal `?tk=` invite link here. */
export const LUMA_URL = "https://luma.com/rrnm4pul";

export const event = {
  name: "Building Better Worlds",
  fullName: "Building Better Worlds Hackathon",
  organiser: "Proximata",
  /** Co-organiser; shown as "in cooperation with START Vienna". */
  coHost: { name: "START Vienna", url: "https://www.start-vienna.com/" },
  poweredBy: { name: "HOIV – Home of InnoVation", short: "HOIV" },
  /** CET (UTC+1) on both days. */
  startsAt: "2026-11-13T14:00:00+01:00",
  endsAt: "2026-11-14T18:00:00+01:00",
  dateLabel: "13–14 Nov 2026",
  timeLabel: "Fri 14:00 – Sat 18:00",
  duration: "24h",
  city: "Vienna",
  venue: {
    name: "HOIV – Home of InnoVation",
    // Postcode intentionally omitted until the organisers confirm 1030 vs 1100.
    street: "Arsenalstraße 11",
    city: "Vienna",
    country: "Austria",
    latitude: 48.1761,
    longitude: 16.3953,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=48.1761151%2C16.3953038",
  },
  format: "In person",
  teamSize: "2–4 people",
  contactEmail: "contact@proximata.io",
  registerUrl: LUMA_URL,
  tagline: "A new generation of innovation.",
  description:
    "Proximata's flagship 24-hour hackathon in Vienna, in cooperation with START Vienna. Real cases from real companies, four tracks, one weekend to build something truly disruptive.",
} as const;

export const proximataLinks = {
  website: "https://proximata.io",
  instagram: "https://instagram.com/proximata.io",
  linkedin: "https://linkedin.com/company/proximata",
  luma: "https://luma.com/proximata",
} as const;
