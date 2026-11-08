import { event } from "./event";
import { tracks } from "./tracks";

// Key figures band in the Mentors section (under the carousel once mentors are
// announced). "Builders signed up" is the Luma "going" count at the time of
// writing; update it before launch.

export type Metric = { value: string; label: string };

export const metrics: readonly Metric[] = [
  { value: event.duration, label: "Build time" },
  { value: String(tracks.length), label: "Tracks" },
  // Matches event.teamSize ("2–4 people").
  { value: "2–4", label: "Team size" },
  { value: "135+", label: "Builders signed up" },
];
