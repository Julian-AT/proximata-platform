"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Globe } from "./globe";
import { MARK_PATHS, MARK_VIEWBOX } from "./mark-paths";
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

/** Rotating globe behind the hero; fades out as the About title scrolls in. */
function GlobeLayer() {
  const opacity = useScrollKeyframes(1, [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: 0 },
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

/**
 * The Proximata mark at supergraphic scale (as on the brand book's Logo page),
 * one copy just off each edge so only its inner column shows: the lower-left
 * cross's vertical blades on the left, the upper-right cross's on the right.
 * They take the template pillars' place, fade out before the content and
 * slide outward once the About title arrives.
 *
 * Geometry, with the mark 135vh tall (1 source px = 135/1024 vh):
 * - left: source x 340 (desktop) / 395 (tablet) sits on the left edge, and the
 *   lower-left cross's centre (y 636) at 60vh;
 * - right: source x 680 (desktop) / 625 (tablet) sits on the right edge, and
 *   the upper-right cross's centre (y 388) at 38vh.
 */
function MarkEdge({ side }: { side: "left" | "right" }) {
  const left = side === "left";
  const x = useScrollKeyframes(0, [
    { target: SCROLL_TARGETS.aboutTitle, threshold: 1, value: left ? -24 : 24 },
  ]);

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0.001, x: left ? -48 : 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 1.2, ease: EASE_OUT }}
    >
      <motion.svg
        viewBox={MARK_VIEWBOX}
        aria-hidden="true"
        style={{ x }}
        className={
          left
            ? "absolute -top-[23.85vh] -left-[52.08vh] h-[135vh] w-[133.95vh] fill-brand desktop:-left-[44.82vh]"
            : "absolute -top-[13.15vh] -right-[51.55vh] h-[135vh] w-[133.95vh] fill-brand desktop:-right-[44.3vh]"
        }
      >
        {MARK_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </motion.svg>
    </motion.div>
  );
}

/** Both mark edges, faded out towards the content column (tablet and up). */
function MarkEdges() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 hidden opacity-80 [mask-image:linear-gradient(90deg,#000_0,#000_7vw,transparent_15vw,transparent_85vw,#000_93vw,#000_100%)] tablet:block"
    >
      <MarkEdge side="left" />
      <MarkEdge side="right" />
    </div>
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

/** Fixed layers behind the page: brand glow, globe (hero only), mark edges, and grain. */
export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-clip">
      <HeroGlow />
      <GlobeLayer />
      <MarkEdges />
      <AnimatedNoise />
    </div>
  );
}
