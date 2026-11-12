import type { CSSProperties } from "react";
import Image from "next/image";
import { event } from "../content/event";
import { partnerGroups, partners, partnersCopy, type Partner } from "../content/partners";
import { HoivLogo, ProximataWordmark, StartViennaLogo } from "../logo";
import { Reveal, SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";

const caption = "font-mono text-[12px] leading-none text-soft";

/** Desktop logo height at optical scale 1; also sizes next/image's srcset. */
const LOGO_HEIGHT = 30;

/** Equal-height slots so all organiser captions sit on one line. */
const organiserSlot = "flex h-10 items-center justify-center tablet:h-12";

/** HOIV and START Vienna share one height, so neither reads larger. */
const CO_ORGANISER_LOGO_HEIGHT = 40;

const hoiv = event.coHost;

function Divider() {
  return (
    <span aria-hidden="true" className={`${organiserSlot} hidden text-soft tablet:flex`}>
      <svg viewBox="0 0 16 16" fill="none" className="size-3.5">
        <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth={1.5} />
      </svg>
    </span>
  );
}

/**
 * Proximata × HOIV × START Vienna, the hackathon's three organisers: HOIV
 * co-hosts beside Proximata, START Vienna cooperates. Phones give Proximata
 * its own row with the other two side by side below; from tablet up all three
 * sit in one row with × dividers.
 */
function Organisers() {
  return (
    <Reveal className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8 tablet:flex-nowrap tablet:gap-12">
      <figure className="m-0 flex basis-full flex-col items-center gap-4 tablet:basis-auto">
        <span className={organiserSlot}>
          {/* Above the brand book's 120px minimum on every screen. */}
          <ProximataWordmark width={148} />
        </span>
        <figcaption className={caption}>{partnersCopy.organiser}</figcaption>
      </figure>
      <Divider />
      <figure className="m-0 flex flex-col items-center gap-4">
        <a
          href={hoiv.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${organiserSlot} focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ice`}
        >
          <HoivLogo height={CO_ORGANISER_LOGO_HEIGHT} />
        </a>
        <figcaption className={caption}>{partnersCopy.coOrganiserVenue}</figcaption>
      </figure>
      <Divider />
      <figure className="m-0 flex flex-col items-center gap-4">
        <span className={organiserSlot}>
          <StartViennaLogo height={CO_ORGANISER_LOGO_HEIGHT} />
        </span>
        <figcaption className={caption}>{partnersCopy.coOrganiser}</figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * One logo, linked to the organisation. Height comes from the row's
 * `--logo-h` times the logo's optical scale; width follows the artwork.
 * The box + `fill` keeps next/image quiet when the height is fractional.
 */
function PartnerLogo({ partner }: { partner: Partner }) {
  const { logo, label, role } = partner;
  const scale = logo?.scale ?? 1;

  return (
    <li className="relative flex flex-col items-center">
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-[0.4em] text-[length:var(--logo-h)] opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ice"
      >
        {logo ? (
          <span
            className="relative block h-[calc(var(--logo-h)*var(--logo-scale))] shrink-0 select-none"
            style={{ "--logo-scale": scale, aspectRatio: `${logo.width} / ${logo.height}` } as CSSProperties}
          >
            <Image
              src={logo.src}
              alt={label ? "" : partner.name}
              fill
              sizes={`${Math.ceil((LOGO_HEIGHT * scale * logo.width) / logo.height)}px`}
              className="object-contain"
            />
          </span>
        ) : null}
        {label || !logo ? (
          <span className="font-mono text-[0.72em] leading-none font-semibold tracking-[-0.02em] whitespace-nowrap text-white">
            {label ?? partner.name}
          </span>
        ) : null}
      </a>
      {role ? <span className={`absolute top-full mt-2.5 ${caption}`}>{role}</span> : null}
    </li>
  );
}

export function Sponsors() {
  return (
    <section
      id="partners"
      aria-label="Partners"
      className="relative z-[1] flex w-full flex-col items-center overflow-clip px-4 py-[100px] tablet:px-8"
    >
      <div className="flex w-full max-w-[1160px] flex-col items-center gap-14 tablet:gap-16">
        <div className="flex w-full flex-col items-center gap-4 px-4 tablet:px-0">
          <SectionTag label={partnersCopy.tag} />
          <SectionTitle
            text={partnersCopy.title}
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <Organisers />

        <div className="flex w-full flex-col items-center gap-14 tablet:gap-16">
          {partnerGroups.map((group, i) => (
            <Reveal key={group.id} delay={0.1 * i} className="flex w-full flex-col items-center gap-8 tablet:gap-10">
              <h3 className="font-mono text-[12px] leading-none font-medium tracking-[0.12em] text-soft uppercase">
                {group.label}
              </h3>
              <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-9 [--logo-h:22px] tablet:gap-x-14 tablet:gap-y-10 tablet:[--logo-h:27px] desktop:[--logo-h:30px]">
                {partners
                  .filter((partner) => partner.group === group.id)
                  .map((partner) => (
                    <PartnerLogo key={partner.name} partner={partner} />
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
