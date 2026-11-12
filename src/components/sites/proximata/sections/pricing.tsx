import { event } from "../content/event";
import { participantPerks, prizesSection, winnerPrizes } from "../content/prizes";
import { ButtonLink } from "../framer-button";
import { Reveal, SectionTitle } from "../motion";
import { SCROLL_TARGETS } from "../scroll-targets";
import { SectionTag } from "../section-tag";
import { PerksTicket, PrizeTile } from "./prize-cards";

const groupLabel = "font-mono text-[12px] leading-none font-medium tracking-[0.12em] text-soft uppercase";

/**
 * Prizes (formerly the template's passes). The root keeps the "ticket" scroll
 * target the fixed background fades on; `#prizes` is the public anchor.
 * Block A: winner prizes per track and sponsor. Block B: what every
 * participant gets. One register CTA closes the section.
 */
export function Pricing() {
  return (
    <section
      id={SCROLL_TARGETS.pricing}
      aria-label="Prizes"
      className="relative flex justify-center overflow-clip px-8 py-[100px] tablet:px-0"
    >
      <span id={prizesSection.anchor} aria-hidden="true" className="absolute inset-x-0 top-0" />

      <div className="relative z-[1] flex w-full flex-col items-center gap-14 tablet:px-[100px]">
        <div className="flex w-full flex-col items-center gap-4 overflow-clip">
          <SectionTag label={prizesSection.tag} />
          <SectionTitle
            text={prizesSection.title}
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <div className="flex w-full max-w-[1200px] flex-col items-center gap-8">
          <h3 className={groupLabel}>{prizesSection.winnersLabel}</h3>
          {/* The last tile spans the row's remaining columns, so no row is left ragged. */}
          <ul className="grid w-full grid-cols-1 gap-4 tablet:grid-cols-2 tablet:gap-6 desktop:grid-cols-3">
            {winnerPrizes.map((prize, i) => (
              <PrizeTile
                key={prize.title}
                prize={prize}
                index={i}
                className={i === winnerPrizes.length - 1 ? "tablet:col-span-2" : undefined}
              />
            ))}
          </ul>
        </div>

        <div className="flex w-full max-w-[1200px] flex-col items-center">
          <PerksTicket perks={participantPerks} />
        </div>

        <Reveal className="flex flex-col items-center gap-6">
          <p className="text-center text-balance font-mono text-[16px] leading-[1.4] text-soft">
            {prizesSection.note}
          </p>
          <ButtonLink
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-[54px]"
          >
            {prizesSection.cta}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
