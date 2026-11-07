import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "./icons";

const roll = "transition-transform duration-[400ms] ease-[var(--ease-framer)]";

const labelText = "flex items-center gap-1 font-mono text-[14px] leading-[21px]";

/**
 * Dashed link pill used in the nav and footer. On hover an ice fill rises
 * from below while the label rolls up and an ink copy takes its place.
 * `external` opens the link in a new tab and adds an arrow glyph.
 */
export function NavPill({
  href,
  label,
  className,
  external = false,
}: {
  href: string;
  label: string;
  className?: string;
  external?: boolean;
}) {
  const arrow = external ? <ArrowUpRightIcon className="size-3" /> : null;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "dashed-frame group/pill relative inline-flex overflow-hidden px-4 py-1 [--frame-color:rgb(255_255_255/0.14)]",
        className,
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-ink/25" />
      <span className={cn("relative text-white/60 group-hover/pill:-translate-y-9", labelText, roll)}>
        {label}
        {arrow}
        {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
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
          "absolute top-1 left-4 z-[1] translate-y-9 text-ink group-hover/pill:translate-y-0",
          labelText,
          roll,
        )}
      >
        {label}
        {arrow}
      </span>
    </a>
  );
}
