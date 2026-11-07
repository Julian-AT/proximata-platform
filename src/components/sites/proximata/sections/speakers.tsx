import { cn } from "@/lib/utils";
import { metrics } from "../data";
import { Reveal, SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { SpeakersCarousel } from "./speakers-carousel";

/**
 * Every metric cell has a dashed left rule; the cell closing a row also gets a
 * right rule (every second cell in the phone 2×2 grid, the last one otherwise).
 */
function rightRule(index: number) {
  if (index === metrics.length - 1) return "border-r";
  if (index % 2 === 1) return "border-r tablet:border-r-0";
  return null;
}

export function Speakers() {
  return (
    <section
      aria-label="Speakers"
      className="relative z-[1] flex flex-col items-center gap-14 overflow-clip py-[100px]"
    >
      <div className="flex w-full flex-col items-center gap-4 overflow-clip px-8 tablet:px-0">
        <SectionTag label="SPEAKERS" />
        <SectionTitle text="The Voices Driving the AI Movement Forward" className="w-full max-w-[720px] text-balance" />
      </div>

      <SpeakersCarousel />

      <div className="grid w-full grid-cols-2 gap-y-6 px-8 tablet:flex tablet:items-start tablet:px-[100px]">
        {metrics.map((metric, i) => (
          <Reveal
            key={metric.label}
            className={cn(
              "flex min-w-0 flex-col items-center gap-[10px] overflow-clip border-l border-dashed border-rule tablet:flex-1",
              rightRule(i),
            )}
          >
            <p className="text-center text-balance font-display text-[32px] leading-[1.2] font-normal text-white tablet:text-[38px] desktop:text-[48px]">
              {metric.value}
            </p>
            <p className="text-center text-balance font-mono text-[16px] leading-[1.2] text-soft desktop:text-[20px]">
              {metric.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
