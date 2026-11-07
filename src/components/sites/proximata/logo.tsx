import Image from "next/image";
import { cn } from "@/lib/utils";

// Logo stand-ins: white rasters extracted from the brand book (see
// scripts/build-brand-assets.py) and START Vienna's own white navbar logo.
// Swap the files for SVG originals once the organisers send them.
const WORDMARK = { src: "/sites/proximata/images/brand/proximata-wordmark.png", w: 865, h: 147 };
const MARK = { src: "/sites/proximata/images/brand/proximata-mark.png", w: 1016, h: 1024 };
const START = { src: "/sites/proximata/images/partners/start-vienna-white.png", w: 222, h: 90 };

type LogoProps = {
  /** Rendered width in px; height follows the artwork's aspect ratio. */
  width: number;
  className?: string;
  priority?: boolean;
};

/**
 * Proximata wordmark, always flat white on ink or blue. The brand book sets a
 * 120px minimum width and clear space equal to the height of the "o".
 */
export function ProximataWordmark({ width, className, priority }: LogoProps) {
  return (
    <Image
      src={WORDMARK.src}
      alt="Proximata"
      width={width}
      height={Math.round((width * WORDMARK.h) / WORDMARK.w)}
      priority={priority}
      className={cn("block select-none", className)}
    />
  );
}

/** Proximata mark ("favicon" in the brand book); never rotated or recoloured. */
export function ProximataMark({ width, className, priority }: LogoProps) {
  return (
    <Image
      src={MARK.src}
      alt="Proximata"
      width={width}
      height={Math.round((width * MARK.h) / MARK.w)}
      priority={priority}
      className={cn("block select-none", className)}
    />
  );
}

export function StartViennaLogo({ width, className, priority }: LogoProps) {
  return (
    <Image
      src={START.src}
      alt="START Vienna"
      width={width}
      height={Math.round((width * START.h) / START.w)}
      priority={priority}
      className={cn("block select-none", className)}
    />
  );
}

/** "in cooperation with [START Vienna]" lockup for the hero and footer. */
export function CoopLockup({ className, logoWidth = 89 }: { className?: string; logoWidth?: number }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-[14px] leading-none text-soft", className)}>
      <span>in cooperation with</span>
      <StartViennaLogo width={logoWidth} />
    </p>
  );
}
