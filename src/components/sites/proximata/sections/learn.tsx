import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { tracks, type Track, type TrackGlyph } from "../content/tracks";
import { AsteriskIcon, CrosshairIcon, DottedRingIcon, XBoxIcon } from "../icons";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

const GLYPHS: Record<TrackGlyph, ComponentType<SVGProps<SVGSVGElement>>> = {
  xbox: XBoxIcon,
  crosshair: CrosshairIcon,
  "dotted-ring": DottedRingIcon,
  asterisk: AsteriskIcon,
};

/** Brand-blue panel with the track numeral and one HUD glyph (replaces the template's photo). */
function TrackVisual({ track }: { track: Track }) {
  const Glyph = GLYPHS[track.glyph];

  return (
    <div
      aria-hidden="true"
      className="relative aspect-[400/211] w-full shrink-0 overflow-clip bg-brand shadow-[inset_0_0_24px_rgba(200,241,255,0.18)]"
    >
      <span className="noise-overlay opacity-[0.11]" />
      <span className="absolute top-4 left-5 font-mono text-[12px] leading-[1.4] font-medium text-ice uppercase">
        Track
      </span>
      <Glyph className="absolute top-4 right-4 size-6 text-ice tablet:size-8" />
      <span className="absolute bottom-3 left-5 font-display text-[56px] leading-none text-white tablet:text-[72px] desktop:text-[64px]">
        {track.number}
      </span>
    </div>
  );
}

function TrackCard({ track, className }: { track: Track; className?: string }) {
  return (
    <article className={cn("dashed-frame flex flex-col gap-5 overflow-clip bg-ink pb-6", className)}>
      <TrackVisual track={track} />
      <div className="flex w-full flex-1 flex-col gap-[10px] px-6">
        <h3 className="text-balance font-display text-[18px] leading-[1.2] text-white tablet:text-[22px] desktop:text-[24px]">
          <span className="sr-only">Track {track.number}: </span>
          {track.name}
        </h3>
        <p className="font-mono text-[16px] leading-[1.4] text-soft">{track.description}</p>
        <p className="mt-auto flex items-start gap-2 pt-[6px] font-mono text-[12px] leading-[1.4] font-medium text-highlight uppercase">
          <span aria-hidden="true" className="mt-[5.5px] size-[6px] shrink-0 rounded-full bg-signal" />
          <span>Challenge partner: {track.partner ?? "announced soon"}</span>
        </p>
      </div>
    </article>
  );
}

export function Learn() {
  return (
    <section
      id="tracks"
      aria-label="Tracks"
      className="relative z-[1] flex justify-center overflow-clip px-8 py-[100px] tablet:px-[60px] desktop:px-[100px]"
    >
      <div className="relative z-[1] flex w-full max-w-[1200px] flex-col items-center gap-14 overflow-clip">
        <div className="relative z-[1] flex w-full flex-col items-center gap-4 overflow-clip desktop:sticky desktop:top-[100px]">
          <SectionTag label="TRACKS" />
          <SectionTitle text="Four Tracks. Real Challenges." className="w-full max-w-[720px] text-balance" />
        </div>

        {/* Phone: one column. Tablet: 2×2 grid (rows dissolve via `contents`).
            Desktop: one sticky row per track; each shows its card in its own
            column so the rows settle into a single row of four as they stack.
            The invisible copies in the other columns give every row the same
            height, so the settled cards line up. */}
        <div className="grid w-full grid-cols-1 gap-14 tablet:grid-cols-2 tablet:gap-5 desktop:flex desktop:flex-col desktop:gap-14">
          {tracks.map((track, row) => (
            <div
              key={track.number}
              className="contents desktop:sticky desktop:top-[300px] desktop:z-[1] desktop:grid desktop:grid-cols-4 desktop:overflow-clip"
            >
              {tracks.map((slot, column) =>
                column === row ? (
                  <TrackCard key={slot.number} track={slot} />
                ) : (
                  <TrackCard
                    key={slot.number}
                    track={slot}
                    className="pointer-events-none invisible hidden desktop:flex"
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
