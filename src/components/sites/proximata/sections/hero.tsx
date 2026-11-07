"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { event } from "../content/event";
import { ButtonLink } from "../framer-button";
import { CoopLockup } from "../logo";
import { LogoGlass } from "../logo-glass";
import { EASE_FRAMER, EASE_OUT } from "../motion";
import { SCROLL_TARGETS } from "../scroll-targets";

const TITLE = {
  wide: { src: "/sites/proximata/images/brand/title-2-line.svg", aspect: "aspect-[2067/350]" },
  stacked: { src: "/sites/proximata/images/brand/title-3-line.svg", aspect: "aspect-[1111/546]" },
} as const;

const facts = [
  { label: "Date", value: event.dateLabel },
  { label: "Time", value: event.timeLabel },
  { label: "Venue", value: `${event.poweredBy.short}, ${event.city}` },
] as const;

const cardEntrance = [
  { opacity: 0.001, x: -10 },
  { opacity: 0.001, x: 0 },
  { opacity: 0.001, x: 10 },
];

const PHONE_QUERY = "(max-width: 809.98px)";

/** True on phones; false during server rendering (wide title by default). */
function usePhone() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(PHONE_QUERY);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PHONE_QUERY).matches,
    () => false,
  );
}

export function Hero() {
  const title = usePhone() ? TITLE.stacked : TITLE.wide;

  return (
    <header
      id="hero"
      className="relative z-[1] flex min-h-svh flex-col items-center justify-center gap-10 overflow-clip px-5 pt-28 pb-24 tablet:gap-12 tablet:px-10 tablet:pt-24"
    >
      <div className="flex w-full flex-col items-center gap-5 tablet:gap-6">
        <motion.h1
          className="w-full max-w-[340px] tablet:max-w-[707px] desktop:max-w-[850px]"
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: EASE_OUT }}
        >
          <LogoGlass
            key={title.src}
            src={title.src}
            label={event.fullName}
            className={`${title.aspect} w-full`}
          />
        </motion.h1>

        <motion.p
          className="text-center font-display text-[22px] leading-[1.15] text-white tablet:text-[28px] desktop:text-[32px]"
          initial={{ opacity: 0.001, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: EASE_FRAMER }}
        >
          A 24h hackathon in Vienna
        </motion.p>

        <motion.div
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: EASE_FRAMER }}
        >
          <CoopLockup />
        </motion.div>
      </div>

      <div
        id={SCROLL_TARGETS.heroInfo}
        className="relative flex w-full justify-center desktop:after:pointer-events-none desktop:after:absolute desktop:after:inset-0 desktop:after:border desktop:after:border-dashed desktop:after:border-white/[0.14] desktop:after:content-['']"
      >
        <ul className="flex w-full flex-col items-center gap-3 tablet:w-[940px] tablet:gap-5 desktop:flex-row desktop:justify-center">
          {facts.map((fact, i) => (
            <motion.li
              key={fact.label}
              className="dashed-frame w-full bg-ink/80 p-4 backdrop-blur-[5px] [--frame-color:rgb(255_255_255/0.14)] desktop:w-[300px] desktop:after:hidden"
              initial={cardEntrance[i]}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.4, ease: EASE_FRAMER }}
            >
              <p className="text-center font-mono text-[13px] leading-[1.2] font-medium text-soft uppercase">
                {fact.label}
              </p>
              <p className="mt-[10px] text-center font-mono text-[16px] leading-[1.2] text-white desktop:text-[18px]">
                {fact.value}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        className="flex w-full flex-col items-center gap-3 tablet:w-auto tablet:flex-row tablet:gap-4"
        initial={{ opacity: 0.001, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5, ease: EASE_OUT }}
      >
        <ButtonLink
          href={event.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-[54px] w-full tablet:w-auto tablet:px-10"
        >
          Register on Luma
        </ButtonLink>
        <ButtonLink
          href="#tracks"
          variant="unfilled"
          className="h-[54px] w-full tablet:w-auto tablet:px-10"
        >
          Explore the tracks
        </ButtonLink>
      </motion.div>
    </header>
  );
}
