import { event } from "./event";
import { tracks } from "./tracks";

// Key figures band in the Mentors section (under the carousel once mentors are
// announced). "Builders signed up" should be the total registrations in the
// Luma admin dashboard, rounded down to the nearest 5. Until that figure is in,
// it shows 200+: the public page already lists 201 approved guests (12 Nov).

export type Metric = { value: string; label: string };

export const metrics: readonly Metric[] = [
  { value: event.duration, label: "Build time" },
  { value: String(tracks.length), label: "Tracks" },
  // Matches event.teamSize ("2–4 people").
  { value: "2–4", label: "Team size" },
  { value: "200+", label: "Builders signed up" },
];
