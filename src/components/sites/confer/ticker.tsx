"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TickerProps = {
  children: ReactNode;
  /** Scroll speed in px per second (moves left). */
  velocity: number;
  /** Gap between items in px. */
  gap: number;
  /** Speed multiplier while hovered: 0 pauses, 1 keeps going. */
  hoverFactor?: number;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
};

/**
 * Endless horizontal marquee (Framer ticker effect). Items are repeated until
 * they overfill the container; hovering eases the speed towards
 * `velocity * hoverFactor`.
 */
export function Ticker({
  children,
  velocity,
  gap,
  hoverFactor = 1,
  className,
  listClassName,
  itemClassName,
}: TickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const hovered = useRef(false);
  const [copies, setCopies] = useState(2);
  const items = Children.toArray(children);

  // Repeat the item set enough times to cover the container plus one set.
  useEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;
    const measure = () => {
      const setWidth = list.scrollWidth / copies;
      if (setWidth <= 0) return;
      const needed = Math.ceil(container.clientWidth / setWidth) + 1;
      if (needed !== copies) setCopies(Math.max(2, needed));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [copies]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    let offset = 0;
    let speed = velocity;
    let last = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const target = hovered.current ? velocity * hoverFactor : velocity;
      speed += (target - speed) * Math.min(1, dt * 6);
      const setWidth = list.scrollWidth / copies + gap / copies;
      offset = (offset + speed * dt) % (setWidth > 0 ? setWidth : Infinity);
      list.style.transform = `translate3d(${-offset}px, 0, 0)`;
      frame = requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(frame);
  }, [velocity, hoverFactor, gap, copies]);

  return (
    <div
      ref={containerRef}
      className={cn("overflow-clip", className)}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <ul
        ref={listRef}
        className={cn("flex w-max items-center will-change-transform", listClassName)}
        style={{ gap }}
      >
        {Array.from({ length: copies }, (_, copy) =>
          items.map((item, i) => (
            <li
              key={`${copy}-${i}`}
              aria-hidden={copy > 0 ? true : undefined}
              className={cn("shrink-0", itemClassName)}
            >
              {item}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
