// The four confirmed hackathon tracks (Luma event page). Tracks 03 and 04 are
// worded so every name sets on exactly two lines in the desktop row of cards
// (24px Archivo Black in a 202-252px column); recheck that when renaming one.
// Descriptions are neutral theme lines pending organiser review; challenge
// partners are not announced yet.

export type Track = {
  /** Two-digit index shown on the track's panel, e.g. "01". */
  number: string;
  name: string;
  /** One-line theme description (draft copy, organiser review pending). */
  description: string;
  /** Challenge partner once confirmed; `null` hides the partner line. */
  partner: string | null;
};

export const tracks: readonly Track[] = [
  {
    number: "01",
    name: "Systems for built space",
    description:
      "Tools and intelligence for how we design, build and run physical spaces, including developing a tool for an industry leader like DB tech.",
    partner: null,
  },
  {
    number: "02",
    name: "Robotics and embodied AI",
    description: "Machines that sense, move and act alongside people in the real world.",
    partner: null,
  },
  {
    number: "03",
    // Non-breaking spaces keep "Agentic AI and" on the first line, so the
    // title always breaks before "infrastructure" (both lines nearly full).
    name: "Agentic AI and infrastructure",
    description: "The models, agents and plumbing that let software reason and act on its own.",
    partner: null,
  },
  {
    number: "04",
    name: "Fintech, crypto and payments",
    description: "New ways to move, manage and program value for people and businesses.",
    partner: null,
  },
];
