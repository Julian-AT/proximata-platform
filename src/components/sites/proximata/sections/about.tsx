"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { about } from "../content/about";
import { SectionTitle } from "../motion";
import { SCROLL_TARGETS } from "../scroll-targets";
import { SectionTag } from "../section-tag";

const WORDS = about.paragraph.split(" ");

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

          <div className="relative z-[2] w-full max-w-[720px]">
            <ScrollRevealParagraph />
          </div>
        </div>
      </div>
    </section>
  );
}
