"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { event } from "./content/event";

const START = Date.parse(event.startsAt);
const END = Date.parse(event.endsAt);

function subscribe(onTick: () => void) {
  const id = window.setInterval(onTick, 1000);
  return () => window.clearInterval(id);
}

/** Current time in whole seconds; `null` while rendering on the server. */
export function useNowSeconds(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null,
  );
}

export type EventPhase =
  | { phase: "upcoming"; seconds: number }
  | { phase: "live"; seconds: number }
  | { phase: "ended" };

export function eventPhase(nowSeconds: number): EventPhase {
  const now = nowSeconds * 1000;
  if (now < START) return { phase: "upcoming", seconds: Math.floor((START - now) / 1000) };
  if (now < END) return { phase: "live", seconds: Math.floor((END - now) / 1000) };
  return { phase: "ended" };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "DD:HH:MM:SS" (days included) or "HH:MM:SS". */
export function formatDuration(seconds: number, withDays: boolean) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const hms = `${pad(withDays ? hours : days * 24 + hours)}:${pad(minutes)}:${pad(secs)}`;
  return withDays ? `${pad(days)}:${hms}` : hms;
}

/**
 * HUD countdown: time to kick-off, time left while hacking, then a sign-off.
 * The ticking digits are hidden from screen readers; the start time is
 * announced once instead.
 */
export function Countdown({ className }: { className?: string }) {
  const now = useNowSeconds();
  const state = now === null ? null : eventPhase(now);

  let label = "T–--:--:--:-- // KICK-OFF";
  if (state?.phase === "upcoming") label = `T–${formatDuration(state.seconds, true)} // KICK-OFF`;
  if (state?.phase === "live") label = `LIVE // ${formatDuration(state.seconds, false)} LEFT`;
  if (state?.phase === "ended") label = "SHIPPED // THANK YOU, BUILDERS";

  return (
    <p className={cn("flex items-center gap-2 font-mono text-[11px] leading-none font-medium uppercase", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 shrink-0 rounded-full",
          state?.phase === "live" ? "animate-pulse bg-signal" : "bg-highlight",
        )}
      />
      <span aria-hidden="true">{label}</span>
      <span className="sr-only">
        Starts <time dateTime={event.startsAt}>Friday 13 November 2026, 14:00 CET</time>
      </span>
    </p>
  );
}
