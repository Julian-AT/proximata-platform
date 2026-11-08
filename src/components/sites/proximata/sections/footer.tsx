import { footerCopy, footerExternalLinks } from "../content/footer";
import { navLinks } from "../content/navigation";
import { ButtonLink } from "../framer-button";
import { CoopLockup, ProximataWordmark } from "../logo";
import { LogoGlass } from "../logo-glass";
import { Reveal } from "../motion";
import { NavPill } from "../nav-pill";
import { SCROLL_TARGETS } from "../scroll-targets";

/** Dashed rule along the top edge, drawn as an overlay so it takes no space. */
const topRule =
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:border-t before:border-dashed before:border-white/20";

const rightsText =
  "w-full text-center font-mono text-[14px] leading-[1.5] text-soft tablet:flex-1";

const detailLink =
  "text-white/90 underline decoration-white/25 underline-offset-4 transition-colors duration-300 hover:decoration-ice focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ice";

export function Footer() {
  const { venue, contact } = footerCopy;

  return (
    <footer
      id={SCROLL_TARGETS.footer}
      className={`relative z-[1] flex flex-col items-center overflow-clip bg-[linear-gradient(rgb(35_32_30/0)_0%,rgb(35_32_30/0.8)_100%)] px-7 pt-10 backdrop-blur-[10px] tablet:px-0 ${topRule}`}
    >
      <div className="flex w-full flex-col items-center gap-3 overflow-clip tablet:gap-0 tablet:px-6">
        <Reveal
          amount={0.3}
          className="w-full [mask-image:linear-gradient(0deg,rgb(0_0_0/0)_0%,rgb(0_0_0)_100%)] tablet:[mask-image:linear-gradient(0deg,rgb(0_0_0/0)_18.5362%,rgb(0_0_0)_100%)]"
        >
          <LogoGlass
            seed={11}
            speed={0.34}
            src="/sites/proximata/images/brand/title-2-line.svg"
            className="aspect-[2067/350] w-full"
          />
        </Reveal>

        <div className="flex w-full justify-center overflow-clip pt-4 pb-10 tablet:pt-0 desktop:px-10">
          <div className="flex w-full max-w-[1200px] flex-col items-start gap-14 tablet:flex-row tablet:gap-10">
            <div className="flex w-full flex-col items-start gap-10 tablet:flex-1">
              {/* Wordmark clear space (height of its "o") is kept by the gaps around it. */}
              <div className="flex flex-col items-start gap-6">
                <ProximataWordmark width={180} />
                <CoopLockup />
              </div>

              <div className="flex max-w-[460px] flex-col gap-3">
                <p className="font-display text-[16px] leading-[1.2] text-white tablet:text-[19px] desktop:text-[24px]">
                  {footerCopy.tagline}
                </p>
                <p className="font-mono text-[14px] leading-[1.5] font-medium text-soft tablet:text-[16px]">
                  {footerCopy.about}
                </p>
              </div>

              <div className="flex w-full flex-col items-start gap-4">
                <p className="font-mono text-[14px] leading-[1.5] text-balance text-soft">
                  {footerCopy.ctaNote}
                </p>
                <div className="flex w-full flex-col gap-4 tablet:max-w-[300px] desktop:max-w-none desktop:flex-row">
                  <ButtonLink
                    href={footerCopy.register.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[50px] w-full desktop:w-auto"
                  >
                    {footerCopy.register.label}
                  </ButtonLink>
                  <ButtonLink
                    variant="unfilled"
                    href={footerCopy.follow.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-[50px] w-full desktop:w-auto"
                  >
                    {footerCopy.follow.label}
                  </ButtonLink>
                </div>
              </div>
            </div>

            <div className="flex w-full tablet:flex-1 tablet:justify-end">
              <div className="flex w-full flex-col items-start gap-10 tablet:w-auto tablet:max-w-full">
                <div className="flex w-full items-start gap-8 tablet:w-auto">
                  <nav
                    aria-label="Footer"
                    className="flex flex-1 flex-col items-start gap-[10px] tablet:flex-none"
                  >
                    {navLinks.map((link) => (
                      <NavPill key={link.label} href={link.href} label={link.label} />
                    ))}
                  </nav>
                  <div className="flex flex-1 flex-col items-start gap-[10px] tablet:flex-none">
                    {footerExternalLinks.map((link) => (
                      <NavPill key={link.label} href={link.href} label={link.label} external />
                    ))}
                  </div>
                </div>

                <dl className="m-0 flex flex-col gap-4 font-mono text-[14px] leading-[1.5]">
                  <div className="flex flex-col gap-1">
                    <dt className="font-medium text-soft">{venue.label}</dt>
                    <dd className="m-0">
                      <a
                        href={venue.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={detailLink}
                      >
                        {venue.value}
                      </a>
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <dt className="font-medium text-soft">{contact.label}</dt>
                    <dd className="m-0">
                      <a href={contact.href} className={detailLink}>
                        {contact.value}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className={`relative flex w-full justify-center py-[14px] tablet:py-6 desktop:px-10 ${topRule}`}>
          <div className="flex w-full max-w-[1200px] flex-col items-center gap-[6px] tablet:flex-row tablet:items-start tablet:gap-6">
            <p className={`${rightsText} tablet:text-left`}>{footerCopy.rights}</p>
            <p className={`${rightsText} tablet:text-right`}>{footerCopy.poweredBy}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
