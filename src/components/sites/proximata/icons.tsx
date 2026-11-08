// Icons copied from the SVG symbols the source page references with <use>.
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <g transform="translate(3 3)" stroke="currentColor" strokeWidth={1.5}>
        <path
          d="M4.5 18C2.015 18 0 15.985 0 13.5V4.5C0 2.015 2.015 0 4.5 0h9C15.985 0 18 2.015 18 4.5v9c0 2.485-2.015 4.5-4.5 4.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        transform="translate(8.25 8.25)"
        d="M0 3.75C0 1.679 1.679 0 3.75 0S7.5 1.679 7.5 3.75 5.821 7.5 3.75 7.5 0 5.821 0 3.75Z"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        transform="translate(15.75 6)"
        d="M0 1.125C0 .504.504 0 1.125 0S2.25.504 2.25 1.125 1.746 2.25 1.125 2.25 0 1.746 0 1.125Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          transform="translate(3 3)"
          d="M.75 18A.75.75 0 0 1 0 17.25V.75A.75.75 0 0 1 .75 0h16.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75Z"
        />
        <path transform="translate(11.25 10.5)" d="M0 0v6" />
        <path transform="translate(8.25 10.5)" d="M0 0v6" />
        <path
          transform="translate(11.25 10.5)"
          d="M0 2.625C0 1.175 1.175 0 2.625 0S5.25 1.175 5.25 2.625V6"
        />
      </g>
      <path
        transform="translate(7.125 6.75)"
        d="M0 1.125C0 .504.504 0 1.125 0S2.25.504 2.25 1.125 1.746 2.25 1.125 2.25 0 1.746 0 1.125Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M20.348 7.564 9.748 18.164a.5.5 0 0 1-.71 0l-5.39-5.39a.5.5 0 0 1 0-.71l.7-.7a.5.5 0 0 1 .71 0l4.33 4.33 9.55-9.55a.51.51 0 0 1 .71 0l.7.71a.5.5 0 0 1 0 .71Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M11.833 3.833l-8 8M4.633 3.833h7.2v7.2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronIcon({
  direction = "right",
  ...props
}: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <path
        d={direction === "right" ? "M17.5 12.5 25 20l-7.5 7.5" : "M22.5 12.5 15 20l7.5 7.5"}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Proximata brand glyphs.
// ---------------------------------------------------------------------------

/**
 * Plus cut from the Proximata mark: the long blade of the mark's upper-right
 * cross (tapered neck, slanted tip), mirrored across the diagonal and turned
 * 180° for the other two arms, so it keeps the mark's diagonal lean.
 */
export function ProximataPlusIcon(props: IconProps) {
  return (
    <svg viewBox="-400 -400 800 800" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M-27.5 -43L-54 -116L-54 -287L54 -386L54 -116L27.5 -43Z" />
      <path d="M43 27.5L116 54L287 54L386 -54L116 -54L43 -27.5Z" />
      <path d="M27.5 43L54 116L54 287L-54 386L-54 116L-27.5 43Z" />
      <path d="M-43 -27.5L-116 -54L-287 -54L-386 54L-116 54L-43 27.5Z" />
    </svg>
  );
}
