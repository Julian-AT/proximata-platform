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
import { SCROLL_TARGETS } from "../scroll-targets";
import { aboutParagraph } from "../data";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

const TITLE = "Why the First AI Summit Belongs on Your Calendar";
const WORDS = aboutParagraph.split(" ");

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
      className="relative m-0 text-center font-vietnam text-[24px] leading-[1.2] font-normal tracking-[-1.2px] whitespace-pre-wrap text-white tablet:text-[32px]"
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
        <SectionTag label="ABOUT" />

        <div className="relative flex w-full flex-col items-center justify-center gap-8 tablet:gap-[56px]">
          <div
            id={SCROLL_TARGETS.aboutTitle}
            className="relative flex w-full flex-col items-center justify-center gap-[10px] overflow-clip"
          >
            <SectionTitle text={TITLE} className="w-full max-w-[560px] [&_h2]:text-balance" />
          </div>

          <figure className="absolute top-[-179px] left-[-86px] z-[1] h-[265px] w-[204px] -rotate-3 overflow-clip [mask-image:linear-gradient(#000_0%,transparent_80%)] tablet:top-[-60px] tablet:left-[-55px] tablet:h-[284px] tablet:w-[216px] desktop:top-[-43px] desktop:left-[-51px] desktop:h-[445px] desktop:w-[338px]">
            <Image
              src="/sites/confer/images/about/statue-head.png"
              alt="First AI Summit event moment"
              fill
              sizes="(min-width: 1200px) 338px, (min-width: 810px) 216px, 204px"
              className="object-contain"
            />
          </figure>

          <figure className="absolute top-[-166px] right-[-76px] z-[1] h-[210px] w-[159px] rotate-[8deg] overflow-clip [mask-image:linear-gradient(#000_0%,transparent_86%)] tablet:top-[-53px] tablet:right-[-48px] tablet:h-[252px] tablet:w-[191px] desktop:top-[-16px] desktop:right-[-63px] desktop:h-[391px] desktop:w-[296px]">
            <Image
              src="/sites/confer/images/about/helmet.png"
              alt="First AI Summit audience gathering"
              fill
              sizes="(min-width: 1200px) 296px, (min-width: 810px) 191px, 159px"
              className="object-contain"
            />
          </figure>

          <div className="relative w-full max-w-[660px]">
            <ScrollRevealParagraph />
          </div>
        </div>
      </div>
    </section>
  );
}
