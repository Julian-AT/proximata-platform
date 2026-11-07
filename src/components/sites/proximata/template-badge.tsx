import { templateLink } from "./data";
import { BoltIcon } from "./icons";

const ease = "duration-[400ms] ease-[var(--ease-framer)]";

/**
 * Fixed "Get a Template" pill (desktop only). On hover the green dot floods
 * the pill and the label rolls to "Grab Now".
 */
export function TemplateBadge() {
  return (
    <div className="fixed right-5 bottom-[63px] z-10 hidden desktop:block">
      <a
        href={templateLink}
        target="_blank"
        rel="noopener"
        className="group/badge relative flex h-9 w-[140px] items-center overflow-hidden rounded-[10px] bg-white py-2 pr-2 pl-[13px] font-mono text-[14px] leading-[14px] font-semibold tracking-[-0.7px] shadow-[0_0.6px_0.6px_-1.25px_rgba(0,0,0,0.26),0_2.29px_2.29px_-2.5px_rgba(0,0,0,0.23),0_10px_10px_-3.75px_rgba(0,0,0,0.09)]"
      >
        <span
          aria-hidden="true"
          className={`absolute top-[18.5px] left-[120.5px] z-[1] size-[17px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice transition-transform group-hover/badge:scale-[16.5] ${ease}`}
        />
        <span
          className={`relative z-[2] text-black transition-[transform,color] group-hover/badge:translate-y-7 group-hover/badge:text-black/25 ${ease}`}
        >
          Get a Template
        </span>
        <span
          aria-hidden="true"
          className={`absolute top-[11px] left-[13px] z-[2] -translate-y-[27px] text-white transition-[transform,color] group-hover/badge:translate-y-0 group-hover/badge:text-black/80 ${ease}`}
        >
          Grab Now
        </span>
        <BoltIcon
          className={`absolute top-[13px] left-[115px] z-[2] size-[11px] text-black transition-[width,height,top,left] group-hover/badge:top-[10px] group-hover/badge:left-[114px] group-hover/badge:size-4 ${ease}`}
        />
      </a>
    </div>
  );
}
