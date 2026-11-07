"use client";

import { motion, useInView, type TargetAndTransition } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Framer's default tween curve. */
export const EASE_FRAMER = [0.44, 0, 0.56, 1] as const;
/** Ease-out curve used by the template's appear effects. */
export const EASE_OUT = [0.12, 0.23, 0.5, 1] as const;

type RevealProps = {
  children?: ReactNode;
  className?: string;
  /** Starting state; animates to opacity 1 and no transform. */
  from?: TargetAndTransition;
  delay?: number;
  duration?: number;
  ease?: readonly [number, number, number, number];
  /** Share of the element that must be visible before it plays. */
  amount?: number;
  as?: "div" | "li" | "span" | "figure";
};

/**
 * Plays once when the element scrolls into view, mirroring Framer's
 * "appear" effect (default: fade up from 20px).
 */
export function Reveal({
  children,
  className,
  from = { opacity: 0, y: 20 },
  delay = 0,
  duration = 0.5,
  ease = EASE_OUT,
  amount = 0.5,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount });
  const Tag = motion[as];

  return (
    <Tag
      ref={ref as never}
      className={className}
      initial={from}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
          : from
      }
      transition={{ delay, duration, ease }}
    >
      {children}
    </Tag>
  );
}

type SectionTitleProps = {
  /** Lines of the heading; each renders on its own line at desktop width. */
  text: string;
  className?: string;
  as?: "h1" | "h2";
};

/**
 * Section heading whose words un-blur and rise one after another when the
 * heading is half visible.
 */
export function SectionTitle({ text, className, as = "h2" }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const Heading = as;
  const words = text.split(" ");

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE_FRAMER }}
    >
      <Heading className="text-center font-clash text-[32px] leading-[1.2] font-normal text-white [-webkit-text-stroke:1px_white] tablet:text-[38px] desktop:text-[48px]">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0.001, y: 10, filter: "blur(10px)" }}
              animate={
                inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
              }
              transition={{ delay: 0.05 * i, duration: 0.6, ease: EASE_FRAMER }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </span>
        ))}
      </Heading>
    </motion.div>
  );
}
