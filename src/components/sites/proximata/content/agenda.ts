// Agenda for the two event days. Only confirmed anchors from the organisers'
// copy; rows without a confirmed time render "TBA" in the time column.

import { event } from "./event";

export type AgendaSpeaker = { name: string; role: string; image: string };

export type AgendaSession = {
  /** Time column label, e.g. "14:00". Omit while unconfirmed (shows "TBA"). */
  time?: string;
  /** Machine-readable value for `<time>` when `time` is a confirmed moment. */
  dateTime?: string;
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
  note: "Full schedule announced soon",
} as const;

export const agenda: readonly AgendaDay[] = [
  {
    day: "Fri · 13 Nov",
    date: "2026-11-13",
    theme: "Kick-off & build",
    sessions: [
      {
        time: "14:00",
        dateTime: event.startsAt,
        title: `Doors open & kick-off at ${event.poweredBy.short}`,
        description: `We open the doors at ${event.venue.name} in ${event.city} and kick off the hackathon.`,
      },
      {
        title: "Teams pick case preferences — we match you to a case",
        description:
          "Teams pick their case preferences. We match every team to a real case from a real company.",
      },
      {
        time: "Fri → Sat",
        title: "24h of hacking",
        description: "24 hours to build something truly disruptive on your case, in person.",
      },
    ],
  },
  {
    day: "Sat · 14 Nov",
    date: "2026-11-14",
    theme: "Pitch & award",
    sessions: [
      {
        title: "Track winners pitch to an external jury of VCs, founders & tech leads",
        description:
          "Each case partner picks a Track Winner. The Track Winners pitch in front of an external jury of VCs, founders, and tech leads.",
      },
      {
        time: "18:00",
        dateTime: event.endsAt,
        title: "Closing",
        description: "The hackathon wraps up on Saturday at 18:00.",
      },
    ],
  },
];
