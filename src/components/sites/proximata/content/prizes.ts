// Prizes and perks from the organisers' prizes brief (12 Nov 2026). Prizes go
// to track winners and sponsor challenges, not to overall 1st/2nd/3rd places.
// Most of the headline value is credits every participant gets, so never call
// the whole amount "prizes" or a "prize pool".
//
// Never add discount codes, referral links or redemption steps here (that
// includes the Lovable code): registered participants get them on Discord.

export type WinnerPrize = {
  title: string;
  /** Who can win it, shown above the title, e.g. "Open to every track". */
  eligibility?: string;
  /** Headline amount in the prize's own currency; `null` for a text-only tile. */
  amount: string | null;
  /** What the amount is or comes with. */
  detail?: string;
};

export const prizesSection = {
  tag: "PRIZES",
  title: "€290,000+ in prizes, credits and tools",
  /** In-page anchor; the section root keeps the "ticket" scroll target id. */
  anchor: "prizes",
  winnersLabel: "Winner prizes",
  perksLabel: "Every participant gets",
  note: "Track winners pitch to an external jury.",
  cta: "Register on Luma",
} as const;

/** Block A, in display order. */
export const winnerPrizes: readonly WinnerPrize[] = [
  { title: "Rhomberg Track Winner", amount: "€1,500" },
  // Always in US dollars, even next to euro amounts (agreed with Talona).
  { title: "Talona Track Winner", amount: "US$1,000" },
  {
    title: "Best use of Adaption",
    eligibility: "Open to every track",
    amount: "$1,000",
    detail: "in Adaption credits for each team member, plus Adaption's Builder tier and swag",
  },
  { title: "Maritime, top 3 teams", amount: "$100 / $50 / $50", detail: "in LLM credits" },
  {
    title: "More track prizes",
    amount: null,
    detail: "proximata, techbold and HOIV track prizes announced soon",
  },
];

/** Block B: what every participant gets, in display order. */
export const participantPerks: readonly string[] = [
  "$1,250 in Adaption credits via our referral link",
  "3 months of Maritime Growth",
  "1 month of n8n Cloud Pro",
  "Lovable Pro Plan 1 (100 credits), free during the event",
  "Biscuit credits and support",
  "A 30-minute workshop with an Adaption engineer on training a model from your own data",
];
