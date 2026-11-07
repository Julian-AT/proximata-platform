import Image from "next/image";
import { agendaRays, type AgendaSpeaker } from "../data";

/**
 * "Small" speaker card: 84px portrait on a green radial glow with a rays
 * pattern blended over it, followed by name and role. Grows past 84px only
 * when the copy wraps (e.g. two-line roles on desktop).
 */
export function AgendaSpeakerChip({ speaker }: { speaker: AgendaSpeaker }) {
  return (
    <div className="relative flex min-h-[84px] w-full shrink-0 items-center gap-3 overflow-clip tablet:w-[254px]">
      <div className="relative isolate size-[84px] shrink-0 overflow-clip bg-[radial-gradient(50%_50%,#3546b8_0%,#202d85_100%)]">
        <Image
          src={agendaRays}
          alt=""
          fill
          sizes="84px"
          className="object-cover opacity-[0.34] mix-blend-overlay"
        />
        <Image
          src={speaker.image}
          alt=""
          fill
          sizes="84px"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-2 pr-3">
        <p className="font-vietnam text-[16px] leading-[1.2] text-balance text-white desktop:text-[20px]">
          {speaker.name}
        </p>
        <p className="font-vietnam text-[16px] leading-[1.4] text-balance text-soft">
          {speaker.role}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-solid border-brand"
      />
    </div>
  );
}
