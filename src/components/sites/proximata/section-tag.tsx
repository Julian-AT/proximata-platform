"use client";

import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "./motion";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?~";
const SCRAMBLED_LETTERS = 4;
/** Seconds per character at the source's speed setting (77%). */
const STEP = 0.2 + ((77 - 1) / 99) * (0.002 - 0.2);

const HIDDEN = 0;
const SCRAMBLED = 1;
const REVEALED = 2;
type Segment = [text: string, kind: typeof HIDDEN | typeof SCRAMBLED | typeof REVEALED];

function scramble(text: string) {
  return Array.from(text, (char) => {
    if (/\s/.test(char)) return char;
    const next = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    return char === char.toLowerCase() ? next.toLowerCase() : next;
  }).join("");
}

const lerp = (v: number, from: number, to: number) => from + v * (to - from);
const clamp = (v: number, min: number, max: number) => Math.trunc(Math.max(min, Math.min(v, max)));

/** Framer "Scramble Appear" (from: center) split into hidden/scrambled/revealed runs. */
function centerSegments(text: string, scrambled: string, progress: number): Segment[] {
  const len = text.length;
  const mid = Math.ceil(len / 2);
  const half = Math.max(Math.floor(SCRAMBLED_LETTERS / 2), 1);
  const outer = lerp(progress, mid, -half);
  const inner = lerp(progress, mid + half, 0);
  const runs: Segment[] = [
    [text.substring(0, clamp(outer, 0, len)), HIDDEN],
    [scrambled.substring(clamp(outer, 0, mid), clamp(inner, 0, mid)), SCRAMBLED],
    [text.substring(clamp(inner, 0, mid), clamp(len - inner, mid, len)), REVEALED],
    [scrambled.substring(clamp(len - outer, mid, len), clamp(len - inner, mid, len)), SCRAMBLED],
    [text.substring(clamp(len - outer, 0, len), len), HIDDEN],
  ];
  return runs
    .filter(([run]) => run.length > 0)
    .reduce<Segment[]>((merged, run) => {
      const last = merged[merged.length - 1];
      if (last && last[1] === run[1]) last[0] += run[0];
      else merged.push([...run]);
      return merged;
    }, []);
}

function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const [progress, setProgress] = useState(0);
  const [scrambled, setScrambled] = useState(text);

  useEffect(() => {
    if (!inView) return;
    const duration = STEP * (text.length + SCRAMBLED_LETTERS) * 1000;
    const start = performance.now();
    let frame = 0;
    const shuffle = window.setInterval(() => setScrambled(scramble(text)), STEP * 1000);
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
      else window.clearInterval(shuffle);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(shuffle);
    };
  }, [inView, text]);

  return (
    <p
      ref={ref}
      aria-label={text}
      className="m-0 whitespace-nowrap font-inter-display text-[16px] leading-[1.4] font-medium tracking-[0.06em] text-highlight select-none"
    >
      {centerSegments(text, scrambled, progress).map(([run, kind], i) => {
        if (kind === HIDDEN) {
          return (
            <span key={i} aria-hidden="true" className="opacity-0">
              {run}
            </span>
          );
        }
        if (kind === SCRAMBLED) {
          return (
            <span key={i} aria-hidden="true" className="text-highlight/40">
              {run}
            </span>
          );
        }
        return (
          <span key={i} aria-hidden="true">
            {run}
          </span>
        );
      })}
    </p>
  );
}

/** Green section label flanked by laurel sprigs, e.g. "ABOUT". */
export function SectionTag({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-[10px]">
      <motion.span
        className="relative block h-5 w-[55px]"
        initial={{ opacity: 0.001, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <Image
          src="/sites/confer/images/tags/laurel-left.png"
          alt=""
          fill
          sizes="55px"
          className="object-contain"
        />
      </motion.span>
      <ScrambleText text={label} />
      <motion.span
        className="relative block h-5 w-[53px]"
        initial={{ opacity: 0.001, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <Image
          src="/sites/confer/images/tags/laurel-right.png"
          alt=""
          fill
          sizes="53px"
          className="object-contain"
        />
      </motion.span>
    </div>
  );
}
