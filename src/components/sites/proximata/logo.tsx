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

type Art = { src: string; w: number; h: number };

/**
 * Logo artwork in a box sized from `width` and the artwork's aspect ratio.
 * Using `fill` avoids next/image warnings when the height is fractional.
 */
function LogoImage({ art, alt, width, className, priority }: LogoProps & { art: Art; alt: string }) {
  return (
    <span
      className={cn("relative block shrink-0 select-none", className)}
      style={{ width, aspectRatio: `${art.w} / ${art.h}` }}
    >
      <Image src={art.src} alt={alt} fill sizes={`${width}px`} priority={priority} className="object-contain" />
    </span>
  );
}

/**
 * Proximata wordmark, always flat white on ink or blue. The brand book sets a
 * 120px minimum width and clear space equal to the height of the "o".
 */
export function ProximataWordmark(props: LogoProps) {
  return <LogoImage art={WORDMARK} alt="Proximata" {...props} />;
}

/** Proximata mark ("favicon" in the brand book); never rotated or recoloured. */
export function ProximataMark(props: LogoProps) {
  return <LogoImage art={MARK} alt="Proximata" {...props} />;
}

export function StartViennaLogo(props: LogoProps) {
  return <LogoImage art={START} alt="START Vienna" {...props} />;
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
