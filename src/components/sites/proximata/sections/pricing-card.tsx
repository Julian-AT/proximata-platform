"use client";

import { motion, type TargetAndTransition, type Transition } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LUMA_URL } from "../content/event";
import { prizesSection, type Prize } from "../content/prizes";
import { ButtonLink } from "../framer-button";
import { CheckIcon } from "../icons";
import { EASE_OUT } from "../motion";

const SHOWN: TargetAndTransition = { opacity: 1, y: 0 };

/** Plays once when the element itself scrolls into view. */
function FadeUp({
  y,
  transition,
  amount = 0.5,
  className,
  children,
  as = "div",
}: {
  y: number;
  transition: Transition;
  amount?: number;
  className?: string;
  children: ReactNode;
  as?: "div" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={SHOWN}
      viewport={{ once: true, amount }}
      transition={transition}
    >
      {children}
    </Tag>
  );
}

/**
 * Ticket perforation between the place block and the feature list: a
 * half-pill notch bites into each edge (covering the card's own outline)
 * with a dashed rule running between them.
 */
function Perforation({ featured }: { featured: boolean }) {
  return (
    <div aria-hidden="true" className="relative z-[3] flex h-[25px] w-full items-center">
      <span className="h-[25px] w-[14px] shrink-0 rounded-r-[20px] border-y-2 border-r-2 border-dashed border-white/14 bg-ink" />
      <span
        className={cn(
          "h-0.5 flex-1 border-t-2 border-dashed",
          featured ? "border-ice/30" : "border-white/14",
        )}
      />
      <span className="h-[25px] w-[14px] shrink-0 rounded-l-[20px] border-y-2 border-l-2 border-dashed border-white/20 bg-ink" />
    </div>
  );
}

/**
 * One podium ticket. The featured (1st place) card is a flat brand-blue panel
 * with grain and an ice inset glow, so its copy follows the blue pairing
 * (white + ice); the others sit on translucent ink (white + ice).
 */
export function PricingCard({ prize }: { prize: Prize }) {
  const featured = prize.featured;

  return (
    <motion.div
      className={cn(
        "frame relative flex h-full flex-col items-start justify-center gap-8 backdrop-blur-[8px] [--frame-width:2px]",
        featured
          ? "bg-brand shadow-[inset_0_0_24px_6px_rgba(200,241,255,0.22)] [--frame-color:rgb(200_241_255/0.3)]"
          : "bg-ink/40 [--frame-color:rgb(255_255_255/0.12)]",
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={SHOWN}
      viewport={{ once: true, amount: 0.3 }}
      // The source staggers the middle podium card behind its neighbours.
      transition={{ delay: featured ? 0.15 : 0, duration: 0.7, ease: EASE_OUT }}
    >
      {featured ? <span aria-hidden="true" className="noise-overlay opacity-[0.11]" /> : null}

      <div className="relative flex w-full flex-col items-start gap-8">
        <div className="relative z-[1] flex w-full flex-col items-start gap-4 px-6 pt-6">
          <FadeUp y={16} transition={{ duration: 0.5, ease: EASE_OUT }}>
            <p className="font-display text-[24px] leading-[1.2] text-white tablet:text-[32px] desktop:text-[40px]">
              {prize.place}
            </p>
          </FadeUp>
          <FadeUp
            y={58}
            className="flex w-full flex-col items-start gap-2"
            transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 26, mass: 1 }}
          >
            <h3 className="font-mono text-[16px] leading-[1.2] font-medium text-white desktop:text-[20px]">
              {prize.title}
            </h3>
            <p className={cn("font-mono text-[16px] leading-[1.4]", featured ? "text-ice" : "text-soft")}>
              {prize.description}
            </p>
          </FadeUp>
        </div>

        <Perforation featured={featured} />

        <div className="flex w-full flex-col items-start gap-5 px-6">
          <FadeUp y={40} transition={{ duration: 0.7, ease: EASE_OUT }}>
            <p
              className={cn(
                "font-mono text-[16px] leading-[1.4] desktop:text-[18px]",
                featured ? "text-ice" : "text-soft",
              )}
            >
              {prizesSection.featuresLabel}
            </p>
          </FadeUp>
          <ul className="flex w-full flex-col items-start gap-4">
            {prize.features.map((feature, i) => (
              <FadeUp
                key={feature}
                as="li"
                y={40}
                amount={1}
                className="flex min-h-6 w-full items-start gap-3"
                transition={{ delay: 0.05 * i, duration: 0.7, ease: EASE_OUT }}
              >
                <CheckIcon className="size-6 shrink-0 text-ice" />
                <span
                  className={cn(
                    "font-mono text-[16px] leading-[1.4]",
                    featured ? "text-white" : "text-white/70",
                  )}
                >
                  {feature}
                </span>
              </FadeUp>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center px-6 pb-6">
        <ButtonLink
          href={LUMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "h-[54px] w-full",
            // Blue on blue would vanish: the featured card takes the ice/blue pairing.
            featured &&
              "bg-ice text-brand shadow-none [--frame-color:rgb(32_45_133/0.35)] hover:bg-ice/80 hover:shadow-none",
          )}
        >
          {prizesSection.cta}
        </ButtonLink>
      </div>
    </motion.div>
  );
}
