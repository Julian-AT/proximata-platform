// Agenda for the two event days, taken from the "Key info" schedule in the
// Luma event description (the single source of truth for times). Every row has
// a confirmed time.

import { event } from "./event";

export type AgendaSpeaker = { name: string; role: string; image: string };

export type AgendaSession = {
  /** Time column label, e.g. "14:00". */
  time: string;
  /** Machine-readable value for the time column's `<time>`. */
  dateTime: string;
  title: string;
  description: string;
  /** "row": single speaker beside the copy; "column": speakers below the copy. */
  layout?: "row" | "column";
  /** Hosts, mentors or jury on stage; the chip only renders when present. */
  speakers?: readonly AgendaSpeaker[];
};

export type AgendaDay = {
  /** Pill headline, e.g. "Fri · 13 Nov". */
  day: string;
  /** ISO date for the pill's `<time>`. */
  date: string;
  theme: string;
  sessions: readonly AgendaSession[];
};

export const agendaSection = {
  tag: "AGENDA",
  title: "Two Days. One Build.",
} as const;

export const agenda: readonly AgendaDay[] = [
  {
    day: "Fri · 13 Nov",
    date: "2026-11-13",
    theme: "Kick-off & build",
    sessions: [
      {
        time: "12:00",
        dateTime: "2026-11-13T12:00:00+01:00",
        title: "Keynote panel with Hubert Rhomberg, CEO of Rhomberg",
        description: `Hubert Rhomberg, CEO of Rhomberg, gives a panel talk at ${event.poweredBy.short} before the build starts.`,
      },
      {
        time: "14:00",
        dateTime: event.startsAt,
        title: "Hackathon start",
        description: `24 hours to build something truly disruptive, in person at ${event.venue.name} in ${event.city}.`,
      },
    ],
  },
  {
    day: "Sat · 14 Nov",
    date: "2026-11-14",
    theme: "Pitch & award",
    sessions: [
      {
        time: "11:00",
        dateTime: "2026-11-14T11:00:00+01:00",
        title: "n8n & Adaption workshops",
        description:
          "An n8n workshop, plus a 30-minute online session with an Adaption engineer on training a model from your own data.",
      },
      {
        time: "15:00",
        dateTime: "2026-11-14T15:00:00+01:00",
        title: "Code freeze",
        description: "Building stops and every team submits its project.",
      },
      {
        time: "16:00",
        dateTime: "2026-11-14T16:00:00+01:00",
        title: "Winner announcement & demos",
        description:
          "Each case partner picks a Track Winner. The Track Winners pitch in front of an external jury of VCs, founders, and tech leads.",
      },
      {
        time: "18:00",
        dateTime: event.endsAt,
        title: "Closing",
        description: "The hackathon wraps up on Saturday at 18:00, followed by networking.",
      },
    ],
  },
];
