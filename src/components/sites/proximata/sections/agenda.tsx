import { cn } from "@/lib/utils";
import { agenda, type AgendaDay, type AgendaSession } from "../data";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { AgendaSpeakerChip } from "./agenda-speaker-chip";

/** Green "Day : N | theme" pill that pins below the nav while its day scrolls by. */
function DayPill({ day }: { day: AgendaDay }) {
  return (
    <div className="sticky top-[100px] z-[1] flex w-full items-center">
      <div className="relative flex w-full items-center justify-center gap-[14px] overflow-clip bg-brand p-4 shadow-[inset_0_0_8px_4px_rgba(200,241,255,0.3)] tablet:w-auto">
        <span aria-hidden="true" className="noise-overlay z-0 opacity-[0.11]" />
        <h3 className="relative font-display text-[20px] leading-[1.2] whitespace-nowrap text-white tablet:text-[26px] desktop:text-[32px]">
          {day.day}
        </h3>
        <span aria-hidden="true" className="relative w-px self-stretch bg-white opacity-[0.29]" />
        <p className="relative font-mono text-[16px] leading-[1.4] whitespace-nowrap text-white">
          {day.theme}
        </p>
      </div>
    </div>
  );
}

/**
 * One timetable row. Every row of a day pins at the same offset, so each
 * later row slides over the one before it.
 */
function SessionRow({ session, last }: { session: AgendaSession; last: boolean }) {
  const beside = session.layout === "row";

  return (
    <article className="sticky top-[200px] z-[1] flex w-full flex-col overflow-clip bg-ink tablet:flex-row tablet:items-start tablet:pl-6">
      <div className="flex w-full shrink-0 flex-col py-3 pl-6 tablet:w-[150px] tablet:pt-6 tablet:pb-0 tablet:pl-0 desktop:w-[226px]">
        <p className="font-mono text-[16px] leading-[1.4] text-balance text-white">{session.time}</p>
      </div>

      <div className="relative flex w-full min-w-0 flex-col p-6 tablet:flex-1 tablet:self-stretch">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border-t border-dashed border-rule tablet:border-t-0 tablet:border-l"
        />
        <div className={cn("flex w-full flex-col items-start gap-8", beside && "desktop:flex-row")}>
          <div className={cn("flex w-full flex-col gap-[10px]", beside && "desktop:min-w-0 desktop:flex-1")}>
            <h4
              className={cn(
                "w-full font-display text-[18px] leading-[1.2] text-balance text-white tablet:text-[22px] desktop:text-[28px]",
                beside && "max-w-[540px]",
              )}
            >
              {session.title}
            </h4>
            <p
              className={cn(
                "w-full font-mono text-[16px] leading-[1.4] text-balance text-soft",
                beside ? "max-w-[540px]" : "max-w-[550px]",
              )}
            >
              {session.description}
            </p>
          </div>

          {session.speakers.length === 1 ? (
            <AgendaSpeakerChip speaker={session.speakers[0]} />
          ) : (
            <div className="flex w-full flex-col gap-5 tablet:flex-row tablet:flex-wrap tablet:items-center">
              {session.speakers.map((speaker) => (
                <AgendaSpeakerChip key={speaker.name} speaker={speaker} />
              ))}
            </div>
          )}
        </div>
      </div>

      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[2] border border-dashed",
          // The source's very last row uses the lighter card border.
          last ? "border-white/20" : "border-rule",
        )}
      />
    </article>
  );
}

export function Agenda() {
  return (
    <section
      aria-label="Agenda"
      className="relative z-[1] flex justify-center overflow-clip px-8 py-[100px] tablet:px-[100px]"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-[56px]">
        <div className="flex w-full flex-col items-center gap-4">
          <SectionTag label="AGENDA" />
          <SectionTitle
            text="Explore the Complete First AI Summit Agenda"
            className="w-full max-w-[560px] [&_h2]:text-balance"
          />
        </div>

        <div className="flex w-full flex-col gap-[72px]">
          {agenda.map((day, d) => (
            <div key={day.day} className="flex w-full flex-col">
              <DayPill day={day} />
              <div className="flex w-full flex-col gap-6">
                {day.sessions.map((session, s) => (
                  <SessionRow
                    key={session.title}
                    session={session}
                    last={d === agenda.length - 1 && s === day.sessions.length - 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
