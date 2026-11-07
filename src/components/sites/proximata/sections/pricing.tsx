import { prizes, prizesSection } from "../content/prizes";
import { SCROLL_TARGETS } from "../scroll-targets";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { PricingCard } from "./pricing-card";

/**
 * Per place (1st, 2nd, 3rd): desktop podium columns 2nd · 1st · 3rd; phone and
 * tablet keep place order, with the lone 3rd card centred on tablet.
 */
const PODIUM_CLASSES = [
  "desktop:order-2",
  "desktop:order-1",
  "tablet:col-span-2 tablet:mx-auto tablet:w-[calc(50%-16px)] desktop:order-3 desktop:col-span-1 desktop:w-full",
] as const;

/**
 * Prizes podium (formerly the template's passes). The root keeps the "ticket"
 * scroll target the fixed background fades on; `#prizes` is the public anchor.
 */
export function Pricing() {
  return (
    <section
      id={SCROLL_TARGETS.pricing}
      aria-label="Prizes"
      className="relative flex justify-center overflow-clip px-8 py-[100px] tablet:px-0"
    >
      <span id={prizesSection.anchor} aria-hidden="true" className="absolute inset-x-0 top-0" />

      <div className="relative z-[1] flex w-full flex-col items-center gap-14 tablet:px-[100px]">
        <div className="flex w-full flex-col items-center gap-4 overflow-clip">
          <SectionTag label={prizesSection.tag} />
          <SectionTitle
            text={prizesSection.title}
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <ol className="grid w-full max-w-[1200px] grid-cols-1 gap-8 tablet:grid-cols-2 desktop:grid-cols-3">
          {prizes.map((prize, i) => (
            <li key={prize.place} className={PODIUM_CLASSES[i]}>
              <PricingCard prize={prize} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
