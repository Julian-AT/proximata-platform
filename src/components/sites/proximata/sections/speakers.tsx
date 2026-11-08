import { cn } from "@/lib/utils";
import { mentors } from "../content/mentors";
import { metrics } from "../content/metrics";
import { Reveal, SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { MentorsCarousel } from "./speakers-carousel";

/**
 * Every metric cell has a hairline left rule; the cell closing a row also gets a
 * right rule (every second cell in the phone 2×2 grid, the last one otherwise).
 */
function rightRule(index: number) {
  if (index === metrics.length - 1) return "border-r";
  if (index % 2 === 1) return "border-r tablet:border-r-0";
  return null;
}

/**
 * Mentors & Jury carousel followed by the key-figures row. Until
 * `content/mentors.ts` lists someone, the heading and carousel stay hidden and
 * the section is just the key-figures band.
 */
export function Speakers() {
  const hasMentors = mentors.length > 0;

  return (
    <section
      id="mentors"
      aria-label={hasMentors ? "Mentors and jury" : "Key figures"}
      className={cn(
        "relative z-[1] flex flex-col items-center gap-14 overflow-clip",
        hasMentors ? "py-[100px]" : "py-10 tablet:py-12",
      )}
    >
      {hasMentors ? (
        <>
          <div className="flex w-full flex-col items-center gap-4 overflow-clip px-8 tablet:px-0">
            <SectionTag label="MENTORS" />
            <SectionTitle text="The People Behind Your Build" className="w-full max-w-[720px] text-balance" />
          </div>

          <MentorsCarousel />
        </>
      ) : null}

      {/* Capped at the site's 1200px content width (1400 minus the padding). */}
      <div className="grid w-full grid-cols-2 gap-y-6 px-8 tablet:flex tablet:max-w-[1400px] tablet:items-start tablet:px-[100px]">
        {metrics.map((metric, i) => (
          <Reveal
            key={metric.label}
            className={cn(
              "flex min-w-0 flex-col items-center gap-[10px] overflow-clip border-l border-rule tablet:flex-1",
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
