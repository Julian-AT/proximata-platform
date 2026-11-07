import type { ComponentType, SVGProps } from "react";
import { audience } from "../content/ticker";
import {
  AsteriskIcon,
  BracketPlusIcon,
  DottedRingIcon,
  GlobeIcon,
  XBoxIcon,
} from "../icons";
import { Ticker } from "../ticker";

type Glyph = ComponentType<SVGProps<SVGSVGElement>>;

/** HUD marks cycled between the words, each sized to sit on the cap height. */
const GLYPHS: { Icon: Glyph; className: string }[] = [
  { Icon: AsteriskIcon, className: "size-[30px] tablet:size-[36px] desktop:size-[44px]" },
  {
    Icon: BracketPlusIcon,
    className: "h-[24px] w-[41px] tablet:h-[29px] tablet:w-[49px] desktop:h-[36px] desktop:w-[61px]",
  },
  { Icon: DottedRingIcon, className: "size-[36px] tablet:size-[44px] desktop:size-[54px]" },
  { Icon: XBoxIcon, className: "size-[30px] tablet:size-[36px] desktop:size-[44px]" },
  { Icon: GlobeIcon, className: "size-[32px] tablet:size-[38px] desktop:size-[46px]" },
];

/** Brand-blue marquee band listing who should join the hackathon. */
export function TickerStrip() {
  return (
    <div className="relative z-[1] flex w-full items-center justify-center overflow-clip bg-brand py-3 shadow-[inset_0_0_4px_4px_rgb(200_241_255/0.22)]">
      <div aria-hidden="true" className="noise-overlay z-0 opacity-[0.14]" />
      <Ticker velocity={50} gap={32} hoverFactor={1} className="relative w-full">
        {audience.map((label, i) => {
          const { Icon, className } = GLYPHS[i % GLYPHS.length];
          return (
            <div key={label} className="flex items-center justify-center gap-4 overflow-clip">
              <span className="flex size-[65px] shrink-0 items-center justify-center text-ice">
                <Icon className={className} />
              </span>
              <h3 className="font-display text-[48px] leading-[1.2] whitespace-pre text-white tablet:text-[58px] desktop:text-[72px]">
                {label}
              </h3>
            </div>
          );
        })}
      </Ticker>
    </div>
  );
}
