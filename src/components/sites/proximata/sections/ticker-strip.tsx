import { audience } from "../content/ticker";
import { ProximataPlusIcon } from "../icons";
import { Ticker } from "../ticker";

/** Slim brand-blue marquee listing who should join, words split by the Proximata plus. */
export function TickerStrip() {
  return (
    <div className="relative z-[1] flex w-full items-center justify-center overflow-clip bg-brand py-2.5 shadow-[inset_0_0_4px_4px_rgb(200_241_255/0.18)] tablet:py-3">
      <div aria-hidden="true" className="noise-overlay z-0 opacity-[0.14]" />
      <Ticker velocity={36} gap={22} hoverFactor={1} className="relative w-full">
        {audience.map((label) => (
          <div key={label} className="flex items-center gap-[22px]">
            <h3 className="font-display text-[20px] leading-[1.2] whitespace-pre text-white tablet:text-[24px] desktop:text-[28px]">
              {label}
            </h3>
            <ProximataPlusIcon className="size-4 shrink-0 text-ice tablet:size-5" />
          </div>
        ))}
      </Ticker>
    </div>
  );
}
