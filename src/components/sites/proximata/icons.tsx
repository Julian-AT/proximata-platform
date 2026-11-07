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

export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11 11" aria-hidden="true" {...props}>
      <path
        d="M5.441 11a.41.41 0 0 1-.414-.412V7.103l-2.92-.001a.414.414 0 0 1-.364-.609L5.177.215a.414.414 0 0 1 .778.197v3.492h2.938a.414.414 0 0 1 .364.609l-3.453 6.273A.41.41 0 0 1 5.441 11Z"
        fill="currentColor"
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
// Proximata HUD glyphs (brand book, section 07 "Visual elements"). Thin,
// technical marks; use at most two per composition, small or in corners.
// ---------------------------------------------------------------------------

/** "[+]" bracketed plus. */
export function BracketPlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 34 20" fill="none" aria-hidden="true" {...props}>
      <path d="M6 2H2v16h4M28 2h4v16h-4" stroke="currentColor" strokeWidth={2.2} />
      <path d="M17 5v10M12 10h10" stroke="currentColor" strokeWidth={2.6} />
    </svg>
  );
}

/** Thin crosshair plus, as used in the brand book's page corners. */
export function CrosshairIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 0v24M0 12h24" stroke="currentColor" strokeWidth={1} />
    </svg>
  );
}

/** Ring of dots ("loading" mark). */
export function DottedRingIcon(props: IconProps) {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return [12 + Math.cos(a) * 9, 12 + Math.sin(a) * 9] as const;
  });
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      {dots.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.4} fill="currentColor" />
      ))}
    </svg>
  );
}

/** Wireframe globe glyph (sphere with meridians and parallels). */
export function GlobeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <g stroke="currentColor" strokeWidth={1}>
        <circle cx={12} cy={12} r={11} />
        <ellipse cx={12} cy={12} rx={5} ry={11} />
        <ellipse cx={12} cy={12} rx={11} ry={4.5} />
        <path d="M12 1v22M1 12h22" />
      </g>
    </svg>
  );
}

/** Square with a cut-out X ("box" mark). */
export function XBoxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M2 2h20v20H2Zm2.5 1.5L12 10.2l7.5-6.7Zm0 17L12 13.8l7.5 6.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Eight-point asterisk / spark. */
export function AsteriskIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17"
        stroke="currentColor"
        strokeWidth={1.4}
      />
    </svg>
  );
}

/** Horizontal rule with round terminals ("•———•"). */
export function DotRuleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 6" fill="none" aria-hidden="true" {...props}>
      <path d="M3 3h42" stroke="currentColor" strokeWidth={1} />
      <circle cx={3} cy={3} r={2} fill="currentColor" />
      <circle cx={45} cy={3} r={2} fill="currentColor" />
    </svg>
  );
}
