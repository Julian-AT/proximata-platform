// Event partners with the organisers' one-liners. START Vienna co-organises
// the hackathon and always comes first. Only START has a logo file so far;
// partners without `logo` render as mono wordmark tiles until theirs arrive.

import { event } from "./event";

export type PartnerLogo = {
  /** White artwork on a transparent background, under public/sites/proximata/images/partners/. */
  src: string;
  /** Intrinsic pixel size of the file (used for the aspect ratio). */
  width: number;
  height: number;
};

export type Partner = {
  name: string;
  /** The organisers' one-line description. */
  description: string;
  /** Small role label shown on the tile, e.g. "Co-organiser". */
  role?: string;
  url?: string;
  logo?: PartnerLogo;
};

export const partnersCopy = {
  tag: "PARTNERS",
  title: "In Cooperation With START Vienna",
} as const;

export const partners: readonly Partner[] = [
  {
    name: event.coHost.name,
    description: "A leading student community focusing on entrepreneurial talent",
    role: "Co-organiser",
    url: event.coHost.url,
    logo: { src: "/sites/proximata/images/partners/start-vienna-white.png", width: 222, height: 90 },
  },
  {
    name: event.poweredBy.name,
    description: "Vienna's premier innovation and creative platform",
    role: "Venue",
  },
  {
    name: "Hackathonhub",
    description: "The fastest growing hackathon platform of the EU",
  },
  {
    name: "Rhomberg",
    description: "A leading Austrian construction company",
  },
  {
    name: "Kicks Vienna",
    description: "Creative production & marketing agency",
  },
  {
    name: "TU Robotics Club",
    description: "Robotics association of TU Wien",
  },
];
