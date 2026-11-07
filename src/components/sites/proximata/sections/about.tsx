"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { about } from "../content/about";
import { BracketPlusIcon, CrosshairIcon } from "../icons";
import { SectionTitle } from "../motion";
import { SCROLL_TARGETS } from "../scroll-targets";
import { SectionTag } from "../section-tag";

const WORDS = about.paragraph.split(" ");

/** Shared type for the HUD micro-copy on the side marks. */
const HUD_LABEL =
  "m-0 font-mono text-[10px] leading-[1.4] whitespace-nowrap uppercase tablet:text-[11px] desktop:text-[12px]";

/** One word of the paragraph; brightens from 15% as its slice of the scroll range passes. */
function RevealWord({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: string;
}) {
  const raw = useTransform(progress, [index / total, (index + 1) / total], [0.15, 1]);
  const opacity = useSpring(raw, { stiffness: 400, damping: 60 });

  return (
    <motion.span className="will-change-[opacity]" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/** Paragraph whose words light up one by one while it scrolls through the viewport. */
function ScrollRevealParagraph() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.5"],
  });

  return (
    <p
      ref={ref}
      className="relative m-0 text-center font-mono text-[24px] leading-[1.3] font-normal whitespace-pre-wrap text-white desktop:text-[28px]"
    >
      {WORDS.map((word, i) => (
        <span key={`${word}-${i}`}>
          <RevealWord progress={scrollYProgress} index={i} total={WORDS.length}>
            {word}
          </RevealWord>
          {i < WORDS.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}

/**
 * Dotted ring in the shape of `DottedRingIcon`, with finer dots for large sizes.
 * Coordinates are rounded so server and client render identical attributes
 * (the shared icon's raw float maths differs in the last digit and breaks hydration).
 */
const RING_DOTS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return [12 + Math.cos(angle) * 9, 12 + Math.sin(angle) * 9].map(
    (value) => Math.round(value * 1000) / 1000,
  );
});

function DottedRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      {RING_DOTS.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={0.75} fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * Left mark: crosshair reticle with a signal dot on the venue and the
 * location read-out in its upper-right quadrant.
 */
function LocationMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[-179px] left-[-86px] z-[1] h-[265px] w-[204px] -rotate-3 overflow-clip [mask-image:linear-gradient(#000_0%,transparent_80%)] tablet:top-[-60px] tablet:left-[-55px] tablet:h-[284px] tablet:w-[216px] desktop:top-[-43px] desktop:left-[-51px] desktop:h-[445px] desktop:w-[338px]"
    >
      <div className="absolute top-[2%] left-[10%] aspect-square w-[80%]">
        <CrosshairIcon className="size-full text-ice/35 [&_*]:[vector-effect:non-scaling-stroke]" />
        <span className="absolute inset-[22%] rounded-full border border-dashed border-ice/35" />
        <span className="absolute top-1/2 left-1/2 size-[7px] -translate-1/2">
          <span className="absolute inset-0 rounded-full bg-signal opacity-60 motion-safe:animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <span className="absolute inset-0 rounded-full bg-signal" />
        </span>
        <div className="absolute bottom-[calc(50%+8px)] left-[calc(50%+10px)]">
          <p className={cn(HUD_LABEL, "font-medium text-ice/80")}>{about.hud.location}</p>
          <p className={cn(HUD_LABEL, "text-white/40")}>{about.hud.locationDetail}</p>
        </div>
      </div>
    </div>
  );
}

/** Right mark: slowly turning dotted ring around a bracketed plus, with the format micro-copy. */
function FormatMark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-[-166px] right-[-76px] z-[1] h-[210px] w-[159px] rotate-[8deg] overflow-clip [mask-image:linear-gradient(#000_0%,transparent_86%)] tablet:top-[-53px] tablet:right-[-48px] tablet:h-[252px] tablet:w-[191px] desktop:top-[-16px] desktop:right-[-63px] desktop:h-[391px] desktop:w-[296px]"
    >
      <div className="absolute top-[4%] left-[4%] desktop:left-[12%]">
        <p className={cn(HUD_LABEL, "font-medium text-ice/80")}>{about.hud.format}</p>
        <p className={cn(HUD_LABEL, "hidden text-white/40 tablet:block")}>
          {about.hud.formatDetail}
        </p>
      </div>
      <div className="absolute top-[20%] left-[12%] aspect-square w-[76%]">
        <DottedRing className="size-full text-ice/30 motion-safe:animate-[spin_60s_linear_infinite]" />
        <BracketPlusIcon className="absolute inset-0 m-auto h-[14%] w-[24%] text-ice/70" />
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="relative z-[1] flex w-full justify-center overflow-clip py-[100px]"
    >
      <div className="relative flex w-full max-w-[1200px] flex-col items-center justify-center gap-[56px] px-10">
        <SectionTag label={about.tag} />

        <div className="relative flex w-full flex-col items-center justify-center gap-8 tablet:gap-[56px]">
          <div
            id={SCROLL_TARGETS.aboutTitle}
            className="relative z-[2] flex w-full flex-col items-center justify-center gap-[10px] overflow-clip"
          >
            <SectionTitle text={about.title} className="w-full max-w-[720px] [&_h2]:text-balance" />
          </div>

          <LocationMark />
          <FormatMark />

          <div className="relative z-[2] w-full max-w-[720px]">
            <ScrollRevealParagraph />
          </div>
        </div>
      </div>
    </section>
  );
}
