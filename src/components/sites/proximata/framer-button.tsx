import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "filled" | "unfilled";

const base =
  "dashed-frame group/button relative isolate flex items-center justify-center gap-[14px] overflow-clip px-6 font-vietnam text-[16px] leading-[1.4] whitespace-nowrap transition-[background-color,box-shadow,color] duration-300 ease-[var(--ease-framer)]";

const variants: Record<Variant, string> = {
  // Brand-blue fill, inset ice glow; hover dims the fill and tightens the glow.
  filled:
    "bg-brand text-white shadow-[inset_0_0_8px_4px_rgba(200,241,255,0.3)] [--frame-color:rgb(200_241_255/0.35)] hover:bg-brand/60 hover:shadow-[inset_0_0_3px_1px_rgba(200,241,255,0.3)]",
  // Transparent with an ice dashed outline; hover fades the label.
  unfilled:
    "bg-transparent text-ice [--frame-color:rgb(200_241_255/0.4)] hover:text-ice/50",
};

function Content({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden="true" className="noise-overlay -z-10 opacity-[0.11]" />
      <span className="relative">{children}</span>
    </>
  );
}

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & { variant?: Variant };

/** Link styled as the template's "Filled" / "Unfilled" button. */
export function ButtonLink({
  variant = "filled",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(base, variants[variant], className)} {...props}>
      <Content>{children}</Content>
    </a>
  );
}

type ButtonProps = ComponentPropsWithoutRef<"button"> & { variant?: Variant };

export function Button({
  variant = "filled",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...props}>
      <Content>{children}</Content>
    </button>
  );
}
