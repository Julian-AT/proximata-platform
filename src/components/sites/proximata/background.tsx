"use client";

import { motion, useMotionValue, type MotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "./motion";
import { SCROLL_TARGETS } from "./scroll-targets";

// Re-exported for client components that already import it from here.
export { SCROLL_TARGETS };

type Keyframe = { target: string; threshold: number; value: number };

/**
 * Framer "scroll transform" with section targets: the value moves from the
 * previous keyframe to the next while the target element crosses the line at
 * `threshold` × viewport height (from its top edge to its bottom edge).
 */
function useScrollKeyframes(
  initial: number,
  keyframes: Keyframe[],
  responsive?: (width: number) => Keyframe[],
): MotionValue<number> {
  const value = useMotionValue(initial);
  const keyframesRef = useRef(keyframes);
  const responsiveRef = useRef(responsive);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const frames = responsiveRef.current?.(window.innerWidth) ?? keyframesRef.current;
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

/** Grain overlay: random grey pixels redrawn every frame (Framer AnimatedNoise). */
/** Grey of the grain specks. 87 on the template's black; lifted for ink so
 * the specks keep the same contrast against #23201E. */
const GRAIN_GREY = 122;
const GRAIN_OPACITY = 0.18;
/** Share of pixels left empty (0.5 + 0.4 * (1 - min(scale 1.3, 1))). */
const GRAIN_THRESHOLD = 0.5;
/** Pre-rendered frames cycled at 60fps instead of regenerating every frame. */
const GRAIN_FRAMES = 8;

function AnimatedNoise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { width, height } = canvas;

    const frames = Array.from({ length: GRAIN_FRAMES }, () => {
      const image = ctx.createImageData(width, height);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const n = Math.random();
        data[i] = GRAIN_GREY;
        data[i + 1] = GRAIN_GREY;
        data[i + 2] = GRAIN_GREY;
        data[i + 3] =
          n > GRAIN_THRESHOLD
            ? ((n - GRAIN_THRESHOLD) / (1 - GRAIN_THRESHOLD)) * GRAIN_OPACITY * 255
            : 0;
      }
      return image;
    });

    let index = 0;
    ctx.putImageData(frames[0], 0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = 0;
    let frame = requestAnimationFrame(function tick(now) {
      if (now - last >= 1000 / 60 && !document.hidden) {
        index = (index + 1) % frames.length;
        ctx.putImageData(frames[index], 0, 0);
        last = now;
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] block size-full [image-rendering:pixelated]"
    />
  );
}

/** Outward slide (px) once the About title scrolls in, per breakpoint. */
function pillarShift(side: "left" | "right", width: number) {
  if (width >= 1200) return side === "left" ? -50 : 50;
  if (width >= 810) return side === "left" ? -32 : 30;
  return side === "left" ? -32 : 32;
}

function Pillar({ side }: { side: "left" | "right" }) {
  const direction = side === "left" ? -1 : 1;
  const x = useScrollKeyframes(0, [], (width) => [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: pillarShift(side, width) },
  ]);

  return (
    <motion.div
      aria-hidden="true"
      className={
        side === "left"
          ? "pointer-events-none fixed top-px -bottom-px left-[-100px] z-[4] aspect-[0.2278] tablet:left-[-108px] desktop:left-[-68px]"
          : "pointer-events-none fixed top-px -bottom-px right-[-105px] z-[4] aspect-[0.2278] tablet:right-[-111px] desktop:right-[-75px]"
      }
      initial={{ opacity: 0.001, x: direction * 110 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
    >
      <motion.div className="relative size-full" style={{ x }}>
        <Image
          src="/sites/confer/images/bg/pillar.png"
          alt="Decorative classical column"
          fill
          priority
          sizes="246px"
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}

function Flower({ side }: { side: "left" | "right" }) {
  const opacity = useScrollKeyframes(1, [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: 0.1 },
    // Back up to 0.6 while the pricing section crosses the viewport bottom.
    { target: SCROLL_TARGETS.pricing, threshold: 1, value: 0.6 },
  ]);
  const left = side === "left";

  return (
    <motion.div
      aria-hidden="true"
      className={
        left
          ? "absolute bottom-[-54px] left-[-290px] z-[1] h-[560px] w-[457px] tablet:bottom-[-230px] tablet:left-[-210px] tablet:h-[696px] tablet:w-[568px] desktop:bottom-[-140px]"
          : "absolute right-[-200px] bottom-[-50px] z-[1] h-[527px] w-[349px] tablet:right-[-120px] tablet:bottom-[-270px] tablet:h-[697px] tablet:w-[461px] desktop:bottom-[-170px]"
      }
      initial={{ opacity: 0.001, x: left ? -110 : 110 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.7, ease: EASE_OUT }}
    >
      <motion.div className="relative size-full" style={{ opacity }}>
        <Image
          src={left ? "/sites/confer/images/bg/flower-left.png" : "/sites/confer/images/bg/flower-right.png"}
          alt=""
          fill
          priority
          sizes={left ? "568px" : "461px"}
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGlow() {
  const factor = useScrollKeyframes(1, [
    { target: SCROLL_TARGETS.heroInfo, threshold: 0.5, value: 0.1 },
  ]);

  return (
    <motion.div aria-hidden="true" className="absolute inset-0 opacity-[0.22]">
      <motion.div className="relative size-full" style={{ opacity: factor }}>
        <Image
          src="/sites/confer/images/bg/hero-glow.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/** Fixed layers behind the page: glow, grain, flowers, and edge pillars. */
export function Background() {
  return (
    <>
      <Pillar side="left" />
      <Pillar side="right" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-clip">
        <HeroGlow />
        <AnimatedNoise />
        <Flower side="left" />
        <Flower side="right" />
      </div>
    </>
  );
}
