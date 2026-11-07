"use client";

import { motion, type TargetAndTransition, type Transition } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { passes } from "../data";
import { ButtonLink } from "../framer-button";
import { CheckIcon } from "../icons";
import { EASE_OUT } from "../motion";

type Pass = (typeof passes)[number];

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
 * Ticket perforation between the price block and the feature list: a
 * half-pill notch bites into each edge (covering the card's own outline)
 * with a dashed rule running between them.
 */
function Perforation() {
  return (
    <div aria-hidden="true" className="relative z-[3] flex h-[25px] w-full items-center">
      <span className="h-[25px] w-[14px] shrink-0 rounded-r-[20px] border-y-2 border-r-2 border-dashed border-white/14 bg-ink" />
      <span className="h-0.5 flex-1 border-t-2 border-dashed border-white/14" />
      <span className="h-[25px] w-[14px] shrink-0 rounded-l-[20px] border-y-2 border-l-2 border-dashed border-white/20 bg-ink" />
    </div>
  );
}

/** Green silk + grain behind the featured (Pro) card, fading out toward the bottom. */
function FeaturedBackdrop() {
  return (
    <>
      <span aria-hidden="true" className="noise-overlay opacity-[0.11]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(0deg,rgb(0_0_0/0)_0%,rgb(0_0_0/0.337)_23%,rgb(0_0_0)_100%)]"
      >
        <Image
          src="/sites/confer/images/pricing/green-silk.png"
          alt=""
          fill
          sizes="(min-width: 1200px) 379px, (min-width: 810px) 396px, calc(100vw - 64px)"
          className="object-cover"
        />
      </div>
    </>
  );
}

export function PricingCard({ pass, index }: { pass: Pass; index: number }) {
  const featured = pass.featured;

  return (
    <motion.div
      className={cn(
        "dashed-frame relative flex h-full flex-col items-start justify-center gap-8 backdrop-blur-[8px] [--frame-color:rgb(255_255_255/0.2)] [--frame-width:2px]",
        featured ? "bg-ink" : "bg-ink/40",
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={SHOWN}
      viewport={{ once: true, amount: 0.3 }}
      // The source staggers the middle card behind its neighbours.
      transition={{ delay: index === 1 ? 0.15 : 0, duration: 0.7, ease: EASE_OUT }}
    >
      {featured ? <FeaturedBackdrop /> : null}

      <div className="relative flex w-full flex-col items-start gap-8">
        <div className="relative z-[1] flex w-full flex-col items-start gap-4 px-6 pt-6">
          <FadeUp y={16} transition={{ duration: 0.5, ease: EASE_OUT }}>
            <p className="flex items-end font-display text-[24px] leading-[1.2] tracking-[-0.04em] text-white [font-feature-settings:'blwf','cv03','cv04','cv09','cv11'] tablet:text-[32px] desktop:text-[40px]">
              <span>$</span>
              <span>{pass.price}</span>
            </p>
          </FadeUp>
          <FadeUp
            y={58}
            className="flex w-full flex-col items-start gap-2"
            transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 26, mass: 1 }}
          >
            <h3 className="font-mono text-[16px] leading-[1.2] text-white desktop:text-[20px]">
              {pass.name}
            </h3>
            <p className="font-mono text-[16px] leading-[1.4] text-soft">
              {pass.description}
            </p>
          </FadeUp>
        </div>

        <Perforation />

        <div className="flex w-full flex-col items-start gap-5 px-6">
          {/* The source never plays this line's appear effect, so it keeps its space while invisible. */}
          <p
            className={cn(
              "translate-y-10 font-mono text-[16px] leading-[1.4] tracking-[-0.4px] opacity-0 desktop:text-[18px]",
              featured ? "text-white" : "text-soft",
            )}
          >
            What&apos;s included:
          </p>
          <ul className="flex w-full flex-col items-start gap-4">
            {pass.features.map((feature, i) => (
              <FadeUp
                key={feature}
                as="li"
                y={40}
                amount={1}
                className="flex h-6 w-full items-center gap-3"
                transition={{ delay: 0.05 * i, duration: 0.7, ease: EASE_OUT }}
              >
                <CheckIcon className="size-6 shrink-0 text-highlight" />
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
        <ButtonLink href="#ticket" className="h-[54px] w-full">
          Secure Your Spot
        </ButtonLink>
      </div>
    </motion.div>
  );
}
