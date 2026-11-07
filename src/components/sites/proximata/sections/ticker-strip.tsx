import Image from "next/image";
import { tickerItems } from "../data";
import { Ticker } from "../ticker";

/** Green marquee band listing who the summit is for. */
export function TickerStrip() {
  return (
    <div className="relative z-[1] flex w-full items-center justify-center overflow-clip bg-[radial-gradient(38%_200%,#2f3fa6_0%,#202d85_100%)] py-3 shadow-[inset_0_0_4px_4px_rgba(255,255,255,0.27)]">
      <div aria-hidden="true" className="noise-overlay z-0 opacity-[0.14]" />
      <Ticker velocity={50} gap={32} hoverFactor={1} className="relative w-full">
        {tickerItems.map((item) => (
          <div key={item.label} className="flex items-center justify-center gap-4 overflow-clip">
            <span className="relative block size-[65px] shrink-0 overflow-clip">
              <Image src={item.icon} alt="" fill sizes="65px" className="object-cover" />
            </span>
            <h3 className="font-clash-bold text-[48px] leading-[1.2] whitespace-pre text-white tablet:text-[58px] desktop:text-[72px]">
              {item.label}
            </h3>
          </div>
        ))}
      </Ticker>
    </div>
  );
}
