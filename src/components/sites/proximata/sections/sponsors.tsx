import { sponsors } from "../data";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { Ticker } from "../ticker";

type Sponsor = (typeof sponsors)[number];

/** CSS mask URL for a logo's inline SVG markup. */
function logoMask(svg: string) {
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** Partner tile: the logo SVG is used as a mask and filled with 82% white. */
function SponsorTile({ sponsor }: { sponsor: Sponsor }) {
  const mask = logoMask(sponsor.svg);

  return (
    <div className="dashed-frame flex w-[254px] items-center justify-center overflow-clip bg-ink/25 px-6 py-7 [--frame-color:rgb(255_255_255/0.2)]">
      <div
        role="img"
        aria-label={sponsor.name}
        className="shrink-0 bg-white/82 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
        style={{
          width: sponsor.width,
          height: sponsor.height,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
    </div>
  );
}

export function Sponsors() {
  return (
    <section
      aria-label="Sponsors"
      className="relative z-[1] flex w-full flex-col items-center justify-center overflow-clip px-8 py-[100px] tablet:px-0"
    >
      <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-[56px] overflow-clip">
        <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-4 overflow-clip">
          <SectionTag label="SPONSORS" />
          <SectionTitle
            text="The Partners Powering the First AI Summit"
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <Ticker velocity={30} gap={28} hoverFactor={0} className="relative z-[1] w-full">
          {sponsors.map((sponsor) => (
            <SponsorTile key={sponsor.name} sponsor={sponsor} />
          ))}
        </Ticker>
      </div>
    </section>
  );
}
