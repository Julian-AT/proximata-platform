"use client";

import { motion } from "motion/react";
import { SCROLL_TARGETS } from "../background";
import { heroInfo } from "../data";
import { ArrowUpRightIcon } from "../icons";
import { LogoGlass } from "../logo-glass";
import { EASE_FRAMER, EASE_OUT } from "../motion";

const cardEntrance = [
  { opacity: 0.001, x: -10 },
  { opacity: 0.001, x: 0 },
  { opacity: 0.001, x: 10 },
];

/** Circle of dots that slowly spins around the down arrow. */
function ScrollBadge() {
  return (
    <span className="relative flex size-[47px] items-center justify-center">
      <span className="absolute inset-[-1px] opacity-[0.66]">
        <svg
          viewBox="0 0 100 100"
          overflow="visible"
          aria-hidden="true"
          className="absolute inset-0 size-full animate-[confer-spin_20s_linear_infinite]"
        >
          <path
            id="confer-scroll-curve"
            d="M 0 50 L 0 50 A 1 1 0 0 1 100 50 L 100 50 L 100 50 A 1 1 0 0 1 0 50 L 0 50"
            fill="transparent"
          />
          <text>
            <textPath
              href="#confer-scroll-curve"
              startOffset="0"
              dominantBaseline="hanging"
              className="fill-white font-inter text-[16px] font-black"
            >
              {".  ".repeat(38)}
            </textPath>
          </text>
        </svg>
      </span>
      <ArrowUpRightIcon className="relative z-[1] size-[23px] rotate-[135deg] text-white opacity-[0.78]" />
    </span>
  );
}

export function Hero() {
  return (
    <header className="relative z-[1] flex h-screen min-h-[600px] flex-col items-center justify-center gap-[53px] overflow-clip pt-[10px] pb-[60px] tablet:pt-0">
      <div className="flex w-full flex-col items-center justify-center gap-[86px]">
        <div className="flex w-full flex-col items-center">
          <motion.div
            className="w-[289px] tablet:w-[707px] desktop:w-[850px]"
            initial={{ opacity: 0.001 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: EASE_OUT }}
          >
            <LogoGlass
              fallbackSrc="/sites/confer/images/brand/first-ai-summit-hero.png"
              className="aspect-[850/169] w-full"
            />
          </motion.div>
          <motion.h1
            className="w-[289px] text-center font-clash text-[32px] leading-[1.2] font-normal tablet:w-auto tablet:text-[38px] desktop:text-[48px]"
            initial={{ opacity: 0.001, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: EASE_FRAMER }}
          >
            The Premier In-Person AI Event
          </motion.h1>
        </div>

        <div
          id={SCROLL_TARGETS.heroInfo}
          className="relative flex w-full justify-center desktop:after:pointer-events-none desktop:after:absolute desktop:after:inset-0 desktop:after:border desktop:after:border-dashed desktop:after:border-white/[0.14] desktop:after:content-['']"
        >
          <ul className="flex w-full flex-col items-center gap-[19px] tablet:w-[940px] tablet:gap-5 desktop:flex-row">
            {heroInfo.map((item, i) => (
              <motion.li
                key={item.label}
                className="dashed-frame w-full bg-black/80 p-4 backdrop-blur-[5px] [--frame-color:rgb(255_255_255/0.14)] desktop:w-[300px] desktop:after:hidden"
                initial={cardEntrance[i]}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.4, ease: EASE_FRAMER }}
              >
                <p className="text-center font-clash-bold text-[16px] leading-[1.2] tracking-[1.6px] text-white/60 uppercase">
                  {item.label}
                </p>
                <p className="mt-[10px] text-center font-vietnam text-[16px] leading-[1.2] text-white desktop:text-[20px]">
                  {item.value}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <motion.div
        className="absolute bottom-[17px] left-1/2 z-[1] hidden -translate-x-1/2 items-center gap-1 tablet:flex"
        initial={{ opacity: 0.001 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, ease: EASE_FRAMER }}
      >
        <span className="font-clash-bold text-[16px] leading-[1.2] tracking-[1.6px] text-white/60 uppercase">
          Scroll
        </span>
        <ScrollBadge />
        <span className="font-clash-bold text-[16px] leading-[1.2] tracking-[1.6px] text-white/60 uppercase">
          More
        </span>
      </motion.div>
    </header>
  );
}
