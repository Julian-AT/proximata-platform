import { cn } from "@/lib/utils";
import { event } from "../content/event";
import { prizes, prizesSection, type Prize } from "../content/prizes";
import { ButtonLink } from "../framer-button";
import { Reveal, SectionTitle } from "../motion";
import { SCROLL_TARGETS } from "../scroll-targets";
import { SectionTag } from "../section-tag";
import { PricingCard } from "./pricing-card";

/**
 * Per place (1st, 2nd, 3rd): desktop podium columns 2nd · 1st · 3rd; phone and
 * tablet keep place order, with the lone 3rd card centred on tablet.
 */
const PODIUM_CLASSES = [
  "desktop:order-2",
  "desktop:order-1",
  "tablet:col-span-2 tablet:mx-auto tablet:w-[calc(50%-16px)] desktop:order-3 desktop:col-span-1 desktop:w-full",
] as const;

/**
 * Per place (1st, 2nd, 3rd) for the slim podium: on desktop the tiles step
 * down from the middle (2nd · 1st · 3rd), bottom-aligned.
 */
const SLIM_PODIUM_CLASSES = [
  "desktop:order-2 desktop:h-[184px]",
  "desktop:order-1 desktop:h-[152px]",
  "desktop:order-3 desktop:h-[136px]",
] as const;

/**
 * One compact podium step: the place and the pending line. 1st place takes the
 * brand-blue panel (grain + inset ice glow, white and ice copy).
 */
function PodiumTile({ prize, index }: { prize: Prize; index: number }) {
  const { featured } = prize;

  return (
    <Reveal
      as="li"
      delay={0.08 * index}
      amount={0.6}
      className={cn(
        "frame relative flex items-center justify-between gap-4 overflow-clip px-5 py-4",
        "tablet:h-[136px] tablet:flex-1 tablet:flex-col tablet:items-start tablet:p-6",
        featured
          ? "bg-brand shadow-[inset_0_0_24px_6px_rgba(200,241,255,0.22)] [--frame-color:rgb(200_241_255/0.3)]"
          : "bg-ink/40 backdrop-blur-[8px] [--frame-color:rgb(255_255_255/0.12)]",
        SLIM_PODIUM_CLASSES[index],
      )}
    >
      {featured ? <span aria-hidden="true" className="noise-overlay opacity-[0.11]" /> : null}
      <p className="relative font-display text-[24px] leading-[1.2] text-white tablet:text-[32px]">
        <span className="sr-only">{prize.title}: </span>
        <span aria-hidden="true">{prize.place}</span>
      </p>
      <p
        className={cn(
          "relative font-mono text-[14px] leading-[1.4] desktop:text-[16px]",
          featured ? "text-ice" : "text-soft",
        )}
      >
        {prizesSection.pending}
      </p>
    </Reveal>
  );
}

/** Placeholder podium shown while no prize has published details. */
function SlimPodium() {
  return (
    <div className="flex w-full flex-col items-center gap-10">
      <ol
        aria-label="Podium"
        className="flex w-full max-w-[880px] flex-col gap-3 tablet:flex-row tablet:items-end tablet:gap-4"
      >
        {prizes.map((prize, i) => (
          <PodiumTile key={prize.place} prize={prize} index={i} />
        ))}
      </ol>

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
  );
}

/**
 * Prizes podium (formerly the template's passes). The root keeps the "ticket"
 * scroll target the fixed background fades on; `#prizes` is the public anchor.
 * Shows a slim placeholder podium until any prize has details, then the full
 * prize cards (one CTA each).
 */
export function Pricing() {
  const announced = prizes.some((prize) => prize.details !== null);

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

        {announced ? (
          <div className="flex w-full flex-col items-center gap-10">
            <ol className="grid w-full max-w-[1200px] grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
              {prizes.map((prize, i) => (
                <li key={prize.place} className={PODIUM_CLASSES[i]}>
                  <PricingCard prize={prize} />
                </li>
              ))}
            </ol>
            <p className="text-center text-balance font-mono text-[16px] leading-[1.4] text-soft">
              {prizesSection.note}
            </p>
          </div>
        ) : (
          <SlimPodium />
        )}
      </div>
    </section>
  );
}
