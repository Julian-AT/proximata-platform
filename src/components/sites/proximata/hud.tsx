"use client";

import { motion } from "motion/react";
import { Countdown } from "./event-clock";
import { EASE_OUT } from "./motion";
import { useScrollKeyframes } from "./scroll-keyframes";
import { SCROLL_TARGETS } from "./scroll-targets";

const pill =
  "pointer-events-auto rounded-none bg-ink/70 px-3 py-2 text-ice/80 backdrop-blur-[6px] frame frame-dashed [--frame-color:rgb(200_241_255/0.18)]";

/**
 * Fixed countdown in the bottom-right corner (desktop only; on narrower
 * screens the stacked hero puts its buttons in the corner's way). Hidden
 * over the footer.
 */
export function Hud() {
  // Fade the whole HUD out as the footer (with its own Register CTA) scrolls in,
  // so the countdown never covers the footer's bottom row.
  const hudOpacity = useScrollKeyframes(1, [
    { target: SCROLL_TARGETS.footer, threshold: 1, value: 0 },
  ]);

  return (
    <motion.div
      style={{ opacity: hudOpacity }}
      className="pointer-events-none fixed inset-x-0 bottom-5 z-[6] hidden px-16 desktop:block"
    >
      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0.001, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: EASE_OUT }}
      >
        <Countdown className={pill} />
      </motion.div>
    </motion.div>
  );
}
