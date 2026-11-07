import Image from "next/image";
import type { AgendaSpeaker } from "../content/agenda";

/**
 * "Small" speaker card: 84px portrait on a flat brand-blue box with grain and
 * an ice inset glow, followed by name and role. Grows past 84px only when the
 * copy wraps (e.g. two-line roles on desktop).
 */
export function AgendaSpeakerChip({ speaker }: { speaker: AgendaSpeaker }) {
  return (
    <div className="relative flex min-h-[84px] w-full shrink-0 items-center gap-3 overflow-clip tablet:w-[254px]">
      <div className="relative isolate size-[84px] shrink-0 overflow-clip bg-brand shadow-[inset_0_0_8px_4px_rgba(200,241,255,0.3)]">
        <span aria-hidden="true" className="noise-overlay opacity-[0.11]" />
        <Image src={speaker.image} alt="" fill sizes="84px" className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-2 pr-3">
        <p className="font-mono text-[16px] leading-[1.2] font-medium text-balance text-white desktop:text-[20px]">
          {speaker.name}
        </p>
        <p className="font-mono text-[16px] leading-[1.4] text-balance text-soft">{speaker.role}</p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-dashed border-white/20"
      />
    </div>
  );
}
