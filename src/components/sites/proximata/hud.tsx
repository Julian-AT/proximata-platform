"use client";

import { motion } from "motion/react";
import { coordinatesLabel, event } from "./content/event";
import { Countdown } from "./event-clock";
import { CrosshairIcon } from "./icons";
import { EASE_OUT } from "./motion";
import { useScrollKeyframes } from "./scroll-keyframes";
import { SCROLL_TARGETS } from "./scroll-targets";

const pill =
  "pointer-events-auto rounded-none bg-ink/70 px-3 py-2 text-ice/80 backdrop-blur-[6px] dashed-frame [--frame-color:rgb(200_241_255/0.18)]";

/**
 * Fixed HUD micro-copy in the bottom corners (tablet and up): venue
 * coordinates while the hero is in view, and a persistent countdown.
 * Two elements per composition, per the brand book.
 */
export function Hud() {
  const coordinatesOpacity = useScrollKeyframes(1, [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: 0 },
  ]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[6] hidden px-12 tablet:block desktop:px-16">
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0.001, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE_OUT }}
      >
        <motion.a
          href={event.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ opacity: coordinatesOpacity }}
          className={`${pill} flex items-center gap-2 font-mono text-[11px] leading-none font-medium uppercase`}
          aria-label={`${event.venue.name} on the map`}
        >
          <CrosshairIcon className="size-3 text-ice/70" />
          <span>{`${event.poweredBy.short} // ${coordinatesLabel()}`}</span>
        </motion.a>
        <Countdown className={pill} />
      </motion.div>
    </div>
  );
}
