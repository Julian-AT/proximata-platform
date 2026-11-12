import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Logo stand-ins: white rasters extracted from the brand book (see
// scripts/build-brand-assets.py), START Vienna's own white navbar logo and the
// flat white HOIV logo from scripts/build-partner-logos.py. Swap the files for
// SVG originals once the organisers send them.
const WORDMARK = { src: "/sites/proximata/images/brand/proximata-wordmark.png", w: 865, h: 147 };
const MARK = { src: "/sites/proximata/images/brand/proximata-mark.png", w: 1016, h: 1024 };
const START = { src: "/sites/proximata/images/partners/start-vienna-white.png", w: 222, h: 90 };
const HOIV = { src: "/sites/proximata/images/partners/hoiv.png", w: 302, h: 96 };

/**
 * Rendered size in px: give either side and the other follows the artwork's
 * aspect ratio. Height suits logos that sit side by side at one height.
 */
type LogoSize = { width: number; height?: never } | { height: number; width?: never };

type LogoProps = LogoSize & {
  className?: string;
  priority?: boolean;
};

type Art = { src: string; w: number; h: number };

/**
 * Logo artwork in a box sized from the given width or height and the
 * artwork's aspect ratio. Using `fill` avoids next/image warnings when a side
 * is fractional.
 */
function LogoImage({ art, alt, className, priority, ...size }: LogoProps & { art: Art; alt: string }) {
  const width = size.height !== undefined ? (size.height * art.w) / art.h : size.width;

  return (
    <span
      className={cn("relative block shrink-0 select-none", className)}
      style={{ width, aspectRatio: `${art.w} / ${art.h}` }}
    >
      <Image
        src={art.src}
        alt={alt}
        fill
        sizes={`${Math.ceil(width)}px`}
        priority={priority}
        className="object-contain"
      />
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

export function HoivLogo(props: LogoProps) {
  return <LogoImage art={HOIV} alt="HOIV – Home of InnoVation" {...props} />;
}

/**
 * proximata and HOIV, the event's two hosts, side by side: HOIV at the
 * wordmark's height after a hairline. Pass `wordmark` to wrap the wordmark,
 * e.g. in the header's home link.
 */
export function HostLockup({
  wordmarkWidth,
  wordmark,
  priority,
  className,
}: {
  wordmarkWidth: number;
  wordmark?: ReactNode;
  priority?: boolean;
  className?: string;
}) {
  const height = (wordmarkWidth * WORDMARK.h) / WORDMARK.w;

  return (
    <span className={cn("flex shrink-0 items-center gap-3", className)}>
      {wordmark ?? <ProximataWordmark width={wordmarkWidth} priority={priority} />}
      <span aria-hidden="true" className="w-px self-stretch bg-white/25" />
      <HoivLogo height={height} priority={priority} />
    </span>
  );
}

/** "in cooperation with [START Vienna]" lockup for the hero and footer. */
export function CoopLockup({ className, logoHeight = 36 }: { className?: string; logoHeight?: number }) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-3 font-mono text-[14px] leading-none text-soft",
        className,
      )}
    >
      <span>in cooperation with</span>
      <StartViennaLogo height={logoHeight} />
    </p>
  );
}
