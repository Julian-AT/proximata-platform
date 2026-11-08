"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honour the visitor's reduced-motion setting in every motion component. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
