// Mentors, jury and hosts for the Mentors & Jury carousel. No one is confirmed
// yet, so `mentors` is empty and the carousel renders `mentorPlaceholders`.
// Add real people here (photo under public/sites/proximata/images/mentors/)
// and the real cards replace the placeholders automatically.

export type MentorRole = "Mentor" | "Jury" | "Host";

export type Mentor = {
  name: string;
  /** Position and organisation, e.g. "CTO, Example GmbH". */
  role: string;
  /** Which part of the event they take part in. */
  kind: MentorRole;
  /** Public path to a portrait (≈ 319×291 crop). */
  photo: string;
  links?: {
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
};

export const mentors: readonly Mentor[] = [];

/** Placeholder slots shown while `mentors` is empty. */
export const mentorPlaceholders: readonly { kind: MentorRole }[] = [
  { kind: "Mentor" },
  { kind: "Mentor" },
  { kind: "Mentor" },
  { kind: "Mentor" },
  { kind: "Jury" },
  { kind: "Jury" },
];
