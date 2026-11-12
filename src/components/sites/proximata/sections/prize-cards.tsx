import { cn } from "@/lib/utils";
import { prizesSection, type WinnerPrize } from "../content/prizes";
import { CheckIcon } from "../icons";
import { Reveal } from "../motion";

/**
 * Ticket perforation between the perks heading and the list: a half-pill
 * notch bites into each edge (covering the card's own outline) with a dashed
 * rule running between them.
 */
function Perforation() {
  return (
    <div aria-hidden="true" className="relative z-[3] flex h-[25px] w-full items-center">
      <span className="h-[25px] w-[14px] shrink-0 rounded-r-[20px] border-y-2 border-r-2 border-dashed border-white/14 bg-ink" />
      <span className="h-0.5 flex-1 border-t-2 border-dashed border-ice/30" />
      <span className="h-[25px] w-[14px] shrink-0 rounded-l-[20px] border-y-2 border-l-2 border-dashed border-white/20 bg-ink" />
    </div>
  );
}

/**
 * One winner prize on translucent ink: the amount in Archivo, then the prize
 * and what comes with it. A prize without an amount is a text-only tile.
 */
export function PrizeTile({ prize, index, className }: { prize: WinnerPrize; index: number; className?: string }) {
  return (
    <Reveal
      as="li"
      delay={0.06 * index}
      amount={0.4}
      className={cn(
        "frame relative flex h-full flex-col items-start gap-3 bg-ink/40 p-6 backdrop-blur-[8px] [--frame-color:rgb(255_255_255/0.12)] [--frame-width:2px]",
        className,
      )}
    >
      {prize.eligibility ? (
        <p className="font-mono text-[12px] leading-none font-medium tracking-[0.12em] text-ice uppercase">
          {prize.eligibility}
        </p>
      ) : null}
      {prize.amount ? (
        <p className="font-display text-[26px] leading-[1.2] text-white desktop:text-[36px]">{prize.amount}</p>
      ) : null}
      <h4 className="font-mono text-[16px] leading-[1.3] font-medium text-white desktop:text-[18px]">{prize.title}</h4>
      {prize.detail ? <p className="font-mono text-[16px] leading-[1.4] text-soft">{prize.detail}</p> : null}
    </Reveal>
  );
}

/**
 * What every participant gets, as one brand-blue ticket (grain + inset ice
 * glow, white and ice copy) with the perforation between heading and list.
 */
export function PerksTicket({ perks }: { perks: readonly string[] }) {
  return (
    <Reveal
      amount={0.3}
      className="frame relative flex w-full flex-col gap-6 overflow-clip bg-brand py-6 shadow-[inset_0_0_24px_6px_rgba(200,241,255,0.22)] [--frame-color:rgb(200_241_255/0.3)] [--frame-width:2px]"
    >
      <span aria-hidden="true" className="noise-overlay opacity-[0.11]" />
      <h3 className="relative px-6 font-display text-[24px] leading-[1.2] text-white tablet:text-[32px]">
        {prizesSection.perksLabel}
      </h3>
      <Perforation />
      <ul className="relative grid w-full grid-cols-1 gap-4 px-6 tablet:grid-cols-2 tablet:gap-x-10">
        {perks.map((perk) => (
          <li key={perk} className="flex min-h-6 items-start gap-3">
            <CheckIcon className="size-6 shrink-0 text-ice" />
            <span className="font-mono text-[16px] leading-[1.4] text-white">{perk}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
