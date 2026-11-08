"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
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

/**
 * Classical meets machine, either side of the title (the template's statue
 * head and helmet): Pallas Athene from Vienna's Parliament on the left, NASA's
 * Robonaut 2 on the right, both as ice cut-outs (scripts/build-about-art.py)
 * that fade out towards the paragraph. Credits are in the footer.
 */
function AboutFigures() {
  return (
    <>
      <figure
        aria-hidden="true"
        className="pointer-events-none absolute top-[-179px] left-[-86px] z-[1] h-[265px] w-[204px] -rotate-3 overflow-clip [mask-image:linear-gradient(#000_0%,transparent_80%)] tablet:top-[-60px] tablet:left-[-55px] tablet:h-[284px] tablet:w-[216px] desktop:top-[-43px] desktop:left-[-51px] desktop:h-[445px] desktop:w-[338px]"
      >
        <Image
          src="/sites/proximata/images/about/athena.png"
          alt=""
          fill
          sizes="(min-width: 1200px) 338px, (min-width: 810px) 216px, 204px"
          className="object-contain"
        />
      </figure>
      <figure
        aria-hidden="true"
        className="pointer-events-none absolute top-[-166px] right-[-76px] z-[1] h-[210px] w-[159px] rotate-[8deg] overflow-clip [mask-image:linear-gradient(#000_0%,transparent_86%)] tablet:top-[-53px] tablet:right-[-48px] tablet:h-[252px] tablet:w-[191px] desktop:top-[-16px] desktop:right-[-63px] desktop:h-[391px] desktop:w-[296px]"
      >
        <Image
          src="/sites/proximata/images/about/robot.png"
          alt=""
          fill
          sizes="(min-width: 1200px) 296px, (min-width: 810px) 191px, 159px"
          className="object-contain"
        />
      </figure>
    </>
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

          <AboutFigures />

          <div className="relative z-[2] w-full max-w-[720px]">
            <ScrollRevealParagraph />
          </div>
        </div>
      </div>
    </section>
  );
}
