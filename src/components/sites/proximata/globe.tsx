"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { event } from "./content/event";
import { GLOBE_CENTER, GLOBE_RADIUS, GLOBE_VIEWBOX, buildGlobeFrame } from "./globe-geometry";

const TILT = 20; // degrees the axis leans towards the viewer
const SPIN_PER_SECOND = 4; // degrees
const FRAME_MS = 1000 / 30;
const MARKER = { lat: event.venue.latitude, lon: event.venue.longitude };
/**
 * Start with Vienna on the left of the visible hemisphere; the spin carries
 * the marker across the front for about half a minute after load.
 */
const START_SPIN = -MARKER.lon - 45;
const FIRST_FRAME = buildGlobeFrame(START_SPIN, TILT, MARKER);

const markerOpacity = (z: number) => Math.min(Math.max(z * 4, 0), 1);

/**
 * Slowly rotating wireframe globe (the brand's sphere glyph) with a signal
 * marker (a pulsing dot) on HOIV, Vienna. The first frame is server-rendered; reduced motion
 * keeps it static.
 */
export function Globe({ className }: { className?: string }) {
  const frontRef = useRef<SVGPathElement>(null);
  const backRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let spin = START_SPIN;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const elapsed = now - last;
      if (elapsed >= FRAME_MS && !document.hidden) {
        spin += (SPIN_PER_SECOND * Math.min(elapsed, 100)) / 1000;
        last = now;
        const next = buildGlobeFrame(spin, TILT, MARKER);
        frontRef.current?.setAttribute("d", next.front);
        backRef.current?.setAttribute("d", next.back);
        const marker = markerRef.current;
        if (marker) {
          marker.setAttribute("transform", `translate(${next.marker.x} ${next.marker.y})`);
          marker.style.opacity = String(markerOpacity(next.marker.z));
        }
      } else if (document.hidden) {
        last = now;
      }
      frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      viewBox={`0 0 ${GLOBE_VIEWBOX} ${GLOBE_VIEWBOX}`}
      aria-hidden="true"
      className={cn("pointer-events-none overflow-visible", className)}
      fill="none"
    >
      <circle
        cx={GLOBE_CENTER}
        cy={GLOBE_CENTER}
        r={GLOBE_RADIUS}
        className="stroke-ice/40"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
      <path
        ref={backRef}
        d={FIRST_FRAME.back}
        className="stroke-ice/12"
        strokeWidth={1}
        strokeDasharray="2 6"
        vectorEffect="non-scaling-stroke"
        suppressHydrationWarning
      />
      <path
        ref={frontRef}
        d={FIRST_FRAME.front}
        className="stroke-ice/35"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        suppressHydrationWarning
      />
      <g
        ref={markerRef}
        transform={`translate(${FIRST_FRAME.marker.x} ${FIRST_FRAME.marker.y})`}
        style={{ opacity: markerOpacity(FIRST_FRAME.marker.z) }}
        suppressHydrationWarning
      >
        <circle r={14} className="stroke-signal" strokeWidth={1.5} vectorEffect="non-scaling-stroke">
          <animate attributeName="r" values="8;30" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r={6} className="fill-signal" />
      </g>
    </svg>
  );
}
