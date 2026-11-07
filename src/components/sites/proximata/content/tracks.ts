// The four confirmed hackathon tracks (Luma event page). Descriptions are
// neutral theme lines pending organiser review; challenge partners are not
// announced yet.

export type TrackGlyph = "xbox" | "crosshair" | "dotted-ring" | "asterisk";

export type Track = {
  /** Two-digit index shown as the large numeral, e.g. "01". */
  number: string;
  name: string;
  /** One-line theme description (draft copy, organiser review pending). */
  description: string;
  /** Challenge partner once confirmed; `null` renders "announced soon". */
  partner: string | null;
  /** HUD glyph drawn in the track's visual panel. */
  glyph: TrackGlyph;
};

export const tracks: readonly Track[] = [
  {
    number: "01",
    name: "Systems for built space",
    description: "Tools and intelligence for how we design, build and run physical spaces.",
    partner: null,
    glyph: "xbox",
  },
  {
    number: "02",
    name: "Robotics and embodied AI",
    description: "Machines that sense, move and act alongside people in the real world.",
    partner: null,
    glyph: "crosshair",
  },
  {
    number: "03",
    name: "AI systems and agentic infrastructure",
    description: "The models, agents and plumbing that let software reason and act on its own.",
    partner: null,
    glyph: "dotted-ring",
  },
  {
    number: "04",
    name: "Fintech and crypto",
    description: "New ways to move, manage and program value for people and businesses.",
    partner: null,
    glyph: "asterisk",
  },
];
