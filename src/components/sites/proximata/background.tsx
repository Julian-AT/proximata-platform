"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Globe } from "./globe";
import { EASE_OUT } from "./motion";
import { useScrollKeyframes } from "./scroll-keyframes";
import { SCROLL_TARGETS } from "./scroll-targets";

// Re-exported for client components that already import it from here.
export { SCROLL_TARGETS };


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
function rulerShift(side: "left" | "right", width: number) {
  const distance = width >= 1200 ? 18 : width >= 810 ? 12 : 8;
  return side === "left" ? -distance : distance;
}

/**
 * Thin measuring scale along a viewport edge (replaces the template's
 * pillars): a tick every 8px, a long tick every 40px, in faint ice. It slides
 * in on load and eases outward once the About title scrolls into view.
 */
function EdgeRuler({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  const patternId = `edge-ruler-${side}`;
  const x = useScrollKeyframes(0, [], (width) => [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: rulerShift(side, width) },
  ]);

  return (
    <motion.div
      aria-hidden="true"
      className={
        left
          ? "pointer-events-none fixed inset-y-0 left-1 z-[4] w-4 tablet:left-3 tablet:w-7 desktop:left-5"
          : "pointer-events-none fixed inset-y-0 right-1 z-[4] w-4 tablet:right-3 tablet:w-7 desktop:right-5"
      }
      initial={{ opacity: 0.001, x: left ? -110 : 110 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
    >
      <motion.svg className="size-full text-ice/30" style={{ x }}>
        <defs>
          <pattern id={patternId} width="100%" height="40" patternUnits="userSpaceOnUse">
            {[0, 8, 16, 24, 32].map((y) => (
              <line
                key={y}
                x1={left ? 0 : "100%"}
                x2={left ? (y === 0 ? "100%" : "45%") : y === 0 ? 0 : "55%"}
                y1={y + 0.5}
                y2={y + 0.5}
                stroke="currentColor"
                strokeWidth={1}
              />
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        <line
          x1={left ? 0.5 : "100%"}
          x2={left ? 0.5 : "100%"}
          y1={0}
          y2="100%"
          stroke="currentColor"
          strokeWidth={1}
        />
      </motion.svg>
    </motion.div>
  );
}

/** Rotating globe behind the hero; dims as the page scrolls and returns near the end. */
function GlobeLayer() {
  const opacity = useScrollKeyframes(1, [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: 0.2 },
    { target: SCROLL_TARGETS.pricing, threshold: 1, value: 0.45 },
  ]);

  return (
    <motion.div
      aria-hidden="true"
      className="absolute top-[48%] left-1/2 aspect-square w-[125vw] -translate-x-1/2 -translate-y-1/2 tablet:w-[min(96vh,880px)]"
      initial={{ opacity: 0.001, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 1.2, ease: EASE_OUT }}
    >
      <motion.div className="size-full" style={{ opacity }}>
        <Globe className="size-full" />
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
          src="/sites/proximata/images/bg/hero-glow.png"
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

/** Fixed layers behind the page: brand glow, globe, grain, and edge rulers. */
export function Background() {
  return (
    <>
      <EdgeRuler side="left" />
      <EdgeRuler side="right" />
      <div className="pointer-events-none fixed inset-0 z-0 overflow-clip">
        <HeroGlow />
        <GlobeLayer />
        <AnimatedNoise />
      </div>
    </>
  );
}
