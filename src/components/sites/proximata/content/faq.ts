// Hackathon FAQ, built only from facts the organisers confirmed (Luma page and
// planning document). Cost, sleeping and eligibility are deliberately absent
// until they are confirmed.

import { event, LUMA_URL } from "./event";

export type FaqEntry = {
  question: string;
  answer: string;
  /** Optional list rendered under the answer. */
  points?: readonly string[];
  /** Optional link rendered after the answer. */
  link?: { label: string; href: string; external?: boolean };
};

export const faqCopy = {
  tag: "FAQ",
  title: "Before You Apply",
} as const;

const { venue } = event;

export const faqs: readonly FaqEntry[] = [
  {
    question: "Who should join?",
    answer: "Builders who ship without asking for permission. That includes:",
    points: [
      "Ambitious students",
      "Designers and PMs working on real-world interfaces",
      "Founders and operators looking for talent or ideas",
      "Robotics, finance, crypto, hardware and engineering specialists",
      "Developers and AI builders exploring agentic workflows",
    ],
  },
  {
    question: "What are the tracks?",
    answer: "Teams build in one of four tracks:",
    points: [
      "Systems for built space",
      "Robotics and embodied AI",
      "AI systems and agentic infrastructure",
      "Fintech and crypto",
    ],
  },
  {
    question: "How does it work?",
    answer:
      "Teams pick their case preferences and we match them. Then it's 24 hours of hacking. Each case partner picks a Track Winner, and the Track Winners pitch in front of an external jury of VCs, founders and tech leads.",
  },
  {
    question: "How big are the teams?",
    answer: `Teams have ${event.teamSize}.`,
  },
  {
    question: "Is it in person?",
    answer: `Yes. We build together at ${venue.name}, ${venue.street}, ${venue.city}, from Friday 13 November, 14:00 to Saturday 14 November, 18:00 (CET). Online participation is only arranged in exceptional cases.`,
  },
  {
    question: "How do I register?",
    answer: "Registration runs through Luma and requires host approval. Places are limited.",
    link: { label: "Register on Luma", href: LUMA_URL, external: true },
  },
  {
    question: "What do I get?",
    answer: "Everything you need to build for 24 hours:",
    points: [
      "Real challenges from real companies",
      "Live mentoring from case partners and industry experts",
      "Premium tool access with credits and compute from partners",
      "24h catering: food, coffee and drinks",
      "A public GitHub portfolio piece (MIT-licensed)",
    ],
  },
  {
    question: "What can I win?",
    answer: "Prize details will be announced soon.",
  },
  {
    question: "I have another question.",
    answer: "Write to us and we'll get back to you.",
    link: { label: event.contactEmail, href: `mailto:${event.contactEmail}` },
  },
];
