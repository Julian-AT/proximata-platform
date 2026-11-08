import Image from "next/image";
import { cn } from "@/lib/utils";
import { tracks, type Track } from "../content/tracks";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

/** One picture of two reaching hands, split across the four track panels
 * (built by scripts/build-hands.py; the fingertips meet at its centre). */
const HANDS_SRC = "/sites/proximata/images/tracks/hands.png";

/** Shifts the 4×-wide picture so panel `i` shows its quarter `i`. */
const QUARTER_OFFSET = ["left-0", "-left-full", "-left-[200%]", "-left-[300%]"] as const;

/** Desktop: the inner picture spans the four cards of the settled row. */
const HANDS_SIZES = "(min-width: 1400px) 1200px, calc(100vw - 200px)";

/** Below desktop: the banner's inner picture is twice the banner width. */
const BANNER_SIZES = "(min-width: 810px) calc(200vw - 240px), calc(200vw - 128px)";

const panel = "relative overflow-clip bg-brand shadow-[inset_0_0_24px_rgba(200,241,255,0.18)]";

/**
 * Phone and tablet: the cards stack, so a slice per card would show lone arm
 * ends. Instead one banner above the cards shows the middle half of the
 * picture, the two hands reaching with their fingertips about to touch.
 */
function HandsBanner() {
  return (
    // The middle half of hands.png (1440×535 of 2880×535).
    <div aria-hidden="true" className={cn(panel, "aspect-[1440/535] w-full desktop:hidden")}>
      <span className="noise-overlay opacity-[0.11]" />
      <div className="absolute inset-y-0 -left-1/2 w-[200%]">
        <Image src={HANDS_SRC} alt="" fill sizes={BANNER_SIZES} className="object-cover" />
      </div>
    </div>
  );
}

/** Desktop: brand-blue panel showing quarter `quarter` of the hands picture,
 * so the four settled cards form the whole image (replaces the template's photo). */
function TrackVisual({ track, quarter }: { track: Track; quarter: number }) {
  return (
    <div
      aria-hidden="true"
      // One quarter of hands.png (2880×535), so neighbouring panels line up.
      className={cn(panel, "hidden aspect-[720/535] w-full shrink-0 desktop:block")}
    >
      <span className="noise-overlay opacity-[0.11]" />
      <div className={cn("absolute inset-y-0 w-[400%]", QUARTER_OFFSET[quarter])}>
        <Image src={HANDS_SRC} alt="" fill sizes={HANDS_SIZES} className="object-cover" />
      </div>
      <span className="absolute top-4 left-5 font-mono text-[12px] leading-[1.4] font-medium text-ice">
        {track.number}
      </span>
    </div>
  );
}

function TrackCard({
  track,
  quarter,
  className,
}: {
  track: Track;
  quarter: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "frame flex flex-col gap-5 overflow-clip bg-ink py-5 desktop:pt-0 desktop:pb-6",
        className,
      )}
    >
      <TrackVisual track={track} quarter={quarter} />
      <div className="flex w-full flex-1 flex-col gap-[10px] px-5 desktop:px-6">
        {/* On desktop the number sits on the picture panel instead. */}
        <span
          aria-hidden="true"
          className="font-mono text-[12px] leading-[1.4] font-medium text-ice desktop:hidden"
        >
          {track.number}
        </span>
        <h3 className="text-balance font-display text-[18px] leading-[1.2] text-white tablet:text-[22px] desktop:text-[24px]">
          <span className="sr-only">Track {track.number}: </span>
          {track.name}
        </h3>
        <p className="font-mono text-[16px] leading-[1.4] text-soft">{track.description}</p>
        {track.partner && (
          <p className="mt-auto flex items-start gap-2 pt-[6px] font-mono text-[12px] leading-[1.4] font-medium text-soft uppercase">
            <span aria-hidden="true" className="mt-[5.5px] size-[6px] shrink-0 rounded-full bg-signal" />
            <span>Challenge partner: {track.partner}</span>
          </p>
        )}
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

        <HandsBanner />

        {/* Phone: one column. Tablet: 2×2 grid (rows dissolve via `contents`).
            Desktop: one sticky row per track; each shows its card in its own
            column so the rows settle into a single row of four as they stack.
            The invisible copies in the other columns give every row the same
            height, so the settled cards line up. The columns have no gap, so
            the settled row shows the hands picture as one image. A spacer
            after the last row keeps the settled row pinned for a while before
            the section scrolls on, so there is time to read it. */}
        <div className="-mt-10 grid w-full grid-cols-1 gap-3 tablet:grid-cols-2 tablet:gap-4 desktop:mt-0 desktop:flex desktop:flex-col desktop:gap-14">
          {tracks.map((track, row) => (
            <div
              key={track.number}
              className="contents desktop:sticky desktop:top-[300px] desktop:z-[1] desktop:grid desktop:grid-cols-4 desktop:overflow-clip"
            >
              {tracks.map((slot, column) =>
                column === row ? (
                  <TrackCard key={slot.number} track={slot} quarter={column} />
                ) : (
                  <TrackCard
                    key={slot.number}
                    track={slot}
                    quarter={column}
                    className="pointer-events-none invisible hidden desktop:flex"
                  />
                ),
              )}
            </div>
          ))}
          <div aria-hidden="true" className="hidden desktop:block desktop:h-[70vh]" />
        </div>
      </div>
    </section>
  );
}
