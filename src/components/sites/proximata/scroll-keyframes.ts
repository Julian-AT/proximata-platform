"use client";

import { useMotionValue, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

export type Keyframe = { target: string; threshold: number; value: number };

/**
 * Framer "scroll transform" with section targets: the value moves from the
 * previous keyframe to the next while the target element crosses the line at
 * `threshold` × viewport height (from its top edge to its bottom edge).
 */
export function useScrollKeyframes(initial: number, keyframes: Keyframe[]): MotionValue<number> {
  const value = useMotionValue(initial);
  const keyframesRef = useRef(keyframes);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const frames = keyframesRef.current;
      let current = initial;
      let previous = initial;
      for (const { target, threshold, value: next } of frames) {
        const element = document.getElementById(target);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const line = window.innerHeight * threshold;
        const progress = Math.min(Math.max((line - rect.top) / (rect.height || 1), 0), 1);
        current += (next - previous) * progress;
        previous = next;
      }
      value.set(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [initial, value]);

  return value;
}
