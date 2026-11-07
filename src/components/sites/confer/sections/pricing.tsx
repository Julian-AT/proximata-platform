import { passes } from "../data";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { PricingCard } from "./pricing-card";

export function Pricing() {
  return (
    // No z-index here: the eagle's `lighten` blend has to reach the fixed
    // background, which a stacking context on the section would cut off.
    <section
      id="ticket"
      aria-label="Passes"
      className="relative flex justify-center overflow-clip px-8 py-[100px] tablet:px-0"
    >
      <video
        aria-hidden="true"
        className="pointer-events-none absolute top-[-13px] left-[calc(18.5%-114px)] z-[1] h-[166px] w-[228px] object-cover mix-blend-lighten tablet:top-[-21px] tablet:left-[calc(12.3%-151px)] tablet:h-[219px] tablet:w-[302px] desktop:top-[38px] desktop:left-[calc(15.5%-186px)] desktop:h-[270px] desktop:w-[372px]"
        src="/sites/confer/video/eagle.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="relative z-[1] flex w-full flex-col items-center gap-14 tablet:px-[100px]">
        <div className="flex w-full flex-col items-center gap-4 overflow-clip">
          <SectionTag label="PASSES" />
          <SectionTitle
            text="Pick the Pass That Fits Your First AI Summit"
            className="w-full max-w-[560px] [&_h2]:text-balance"
          />
        </div>

        <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
          {passes.map((pass, i) => (
            <PricingCard key={pass.name} pass={pass} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
