import { audience } from "../content/ticker";
import { Ticker } from "../ticker";

/** Brand-blue marquee band listing who should join, words split by small ice dots. */
export function TickerStrip() {
  return (
    <div className="relative z-[1] flex w-full items-center justify-center overflow-clip bg-brand py-4 shadow-[inset_0_0_4px_4px_rgb(200_241_255/0.18)]">
      <div aria-hidden="true" className="noise-overlay z-0 opacity-[0.14]" />
      <Ticker velocity={40} gap={28} hoverFactor={1} className="relative w-full">
        {audience.map((label) => (
          <div key={label} className="flex items-center gap-7">
            <h3 className="font-display text-[28px] leading-[1.2] whitespace-pre text-white tablet:text-[34px] desktop:text-[40px]">
              {label}
            </h3>
            <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-ice" />
          </div>
        ))}
      </Ticker>
    </div>
  );
}
