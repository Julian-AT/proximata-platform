import { cn } from "@/lib/utils";

const roll = "transition-transform duration-[400ms] ease-[var(--ease-framer)]";

/**
 * Dashed link pill used in the nav and footer. On hover a green fill rises
 * from below while the label rolls up and a black copy takes its place.
 */
export function NavPill({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "dashed-frame group/pill relative inline-flex overflow-hidden px-4 py-1 [--frame-color:rgb(255_255_255/0.14)]",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-ink/25" />
      <span
        className={cn(
          "relative block font-mono text-[14px] leading-[21px] tracking-[-0.42px] text-white/60 group-hover/pill:-translate-y-9",
          roll,
        )}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute -inset-x-px -top-[3px] z-[1] h-[45px] translate-y-8 bg-ice group-hover/pill:translate-y-0",
          roll,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1 left-4 z-[1] block translate-y-9 font-mono text-[14px] leading-[21px] tracking-[-0.42px] text-black group-hover/pill:translate-y-0",
          roll,
        )}
      >
        {label}
      </span>
    </a>
  );
}
