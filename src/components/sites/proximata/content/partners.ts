// Sponsors and partners for the logo wall. START Vienna and HOIV co-organise
// the hackathon (HOIV is also the venue), so they sit in the organiser cards,
// not in this list. Logos are flat white files built by
// scripts/build-partner-logos.py from each organisation's own artwork.

export type PartnerGroup = "sponsor" | "partner";

export type PartnerLogo = {
  /** Flat white artwork under public/sites/proximata/images/partners/. */
  src: string;
  /** Intrinsic size (SVG viewBox or PNG pixels); sets the aspect ratio. */
  width: number;
  height: number;
  /**
   * Optical size: multiplies the row's logo height so wide wordmarks, heavy
   * all-caps marks and compact icons read as equally large. Defaults to 1.
   */
  scale?: number;
};

export type Partner = {
  name: string;
  group: PartnerGroup;
  /** Small caption under the logo, e.g. "Venue". */
  role?: string;
  url: string;
  /** Without a logo the name renders as text. */
  logo?: PartnerLogo;
  /** Name set as text next to an icon-only logo. */
  label?: string;
};

export const partnersCopy = {
  tag: "PARTNERS",
  title: "In Cooperation With START Vienna & HOIV",
  organiser: "Organiser",
  coOrganiser: "Co-organiser",
  coOrganiserVenue: "Co-organiser & Venue",
} as const;

/** Logo rows in display order, each with its heading. */
export const partnerGroups: readonly { id: PartnerGroup; label: string }[] = [
  { id: "sponsor", label: "Sponsors" },
  { id: "partner", label: "Partners" },
];

const dir = "/sites/proximata/images/partners";

export const partners: readonly Partner[] = [
  // Sponsors
  {
    name: "n8n",
    group: "sponsor",
    url: "https://n8n.io",
    logo: { src: `${dir}/n8n.svg`, width: 480, height: 96, scale: 0.95 },
  },
  {
    name: "techbold",
    group: "sponsor",
    url: "https://www.techbold.at",
    logo: { src: `${dir}/techbold.png`, width: 482, height: 96 },
  },
  {
    name: "Maritime",
    group: "sponsor",
    url: "https://maritime.sh",
    logo: { src: `${dir}/maritime.png`, width: 71, height: 96, scale: 1.3 },
    label: "maritime",
  },
  {
    name: "Rhomberg",
    group: "sponsor",
    url: "https://www.rhomberg.com",
    logo: { src: `${dir}/rhomberg.svg`, width: 477.81, height: 93.51, scale: 1.1 },
  },
  {
    name: "Biscuit",
    group: "sponsor",
    url: "https://www.biscuit.so",
    logo: { src: `${dir}/biscuit.svg`, width: 3338.61, height: 732.86 },
  },
  // Partners
  {
    name: "EWOR",
    group: "partner",
    url: "https://www.ewor.com",
    logo: { src: `${dir}/ewor.svg`, width: 81.01, height: 20, scale: 0.8 },
  },
  {
    name: "TU Wien Robotics Club",
    group: "partner",
    url: "https://www.tuwrc.at",
    logo: { src: `${dir}/tuwrc.svg`, width: 840.1, height: 148.5, scale: 0.85 },
  },
  {
    name: "WU Crypto Club",
    group: "partner",
    url: "https://cryptoclubvienna.com",
    logo: { src: `${dir}/wu-crypto-club.png`, width: 432, height: 96, scale: 0.95 },
  },
  {
    name: "Hackathonhub",
    group: "partner",
    url: "https://hackathonhub.eu",
    logo: { src: `${dir}/hackathonhub.png`, width: 103, height: 96, scale: 1.1 },
    label: "Hackathonhub",
  },
];
