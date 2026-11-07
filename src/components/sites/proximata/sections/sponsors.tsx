import Image from "next/image";
import { partners, partnersCopy, type Partner } from "../content/partners";
import { CrosshairIcon } from "../icons";
import { ProximataWordmark, StartViennaLogo } from "../logo";
import { Reveal, SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { Ticker } from "../ticker";

/** Logo height inside a partner tile; width follows the artwork. */
const TILE_LOGO_HEIGHT = 40;

const roleLabel = "font-mono text-[12px] leading-none font-medium text-highlight";

/**
 * Partner tile: the white logo when we have one, otherwise a mono wordmark
 * with a crosshair, then the organisers' one-liner.
 */
function PartnerTile({ partner }: { partner: Partner }) {
  const { logo } = partner;

  return (
    <div className="dashed-frame relative flex h-[156px] w-max min-w-[300px] flex-col items-center justify-center gap-3 overflow-clip bg-ink/25 px-6 pt-6 pb-5 [--frame-color:rgb(255_255_255/0.2)]">
      {partner.role ? (
        <p className={`absolute top-3 left-4 ${roleLabel}`}>{partner.role}</p>
      ) : null}
      <div className="flex h-10 items-center justify-center">
        {logo ? (
          <Image
            src={logo.src}
            alt={partner.name}
            width={Math.round((TILE_LOGO_HEIGHT * logo.width) / logo.height)}
            height={TILE_LOGO_HEIGHT}
            className="block select-none"
          />
        ) : (
          <p className="flex items-center gap-[10px] font-mono text-[18px] leading-[1.2] font-medium whitespace-nowrap text-white/80">
            <CrosshairIcon className="size-4 shrink-0 text-ice" />
            {partner.name}
          </p>
        )}
      </div>
      <p className="max-w-[252px] text-center font-mono text-[13px] leading-[1.4] text-balance text-soft">
        {partner.description}
      </p>
    </div>
  );
}

/** Same-height slot so both captions sit on one line; also keeps the wordmark's clear space. */
const logoSlot = "flex h-11 items-center justify-center tablet:h-[60px]";

/** Proximata × START Vienna, the hackathon's two organisers. */
function CoopLockupPanel() {
  return (
    <Reveal className="w-full max-w-[640px] px-8 tablet:px-0">
      <div className="dashed-frame flex w-full items-start justify-center gap-5 bg-ink/40 px-5 py-8 [--frame-color:rgb(255_255_255/0.14)] tablet:gap-12 tablet:px-12 tablet:py-9">
        <figure className="m-0 flex flex-col items-center gap-4">
          <span className={logoSlot}>
            {/* 128px on phones stays above the brand book's 120px minimum. */}
            <ProximataWordmark width={160} className="h-auto w-[128px] tablet:w-[160px]" />
          </span>
          <figcaption className={roleLabel}>Organiser</figcaption>
        </figure>
        <span aria-hidden="true" className="flex h-11 items-center text-ice/60 tablet:h-[60px]">
          <svg viewBox="0 0 16 16" fill="none" className="size-4">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth={1.5} />
          </svg>
        </span>
        <figure className="m-0 flex flex-col items-center gap-4">
          <span className={logoSlot}>
            <StartViennaLogo width={110} className="h-auto w-[88px] tablet:w-[110px]" />
          </span>
          <figcaption className={roleLabel}>Co-organiser</figcaption>
        </figure>
      </div>
    </Reveal>
  );
}

export function Sponsors() {
  return (
    <section
      id="partners"
      aria-label="Partners"
      className="relative z-[1] flex w-full flex-col items-center justify-center overflow-clip py-[100px]"
    >
      <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-[56px] overflow-clip">
        <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-4 overflow-clip px-8 tablet:px-0">
          <SectionTag label={partnersCopy.tag} />
          <SectionTitle
            text={partnersCopy.title}
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <CoopLockupPanel />

        <Ticker velocity={30} gap={28} hoverFactor={0} className="relative z-[1] w-full">
          {partners.map((partner) => (
            <PartnerTile key={partner.name} partner={partner} />
          ))}
        </Ticker>
      </div>
    </section>
  );
}
