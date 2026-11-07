import { footerBlurb, footerOtherLinks, navLinks } from "../data";
import { LogoGlass } from "../logo-glass";
import { Reveal } from "../motion";
import { NavPill } from "../nav-pill";
import { SCROLL_TARGETS } from "../scroll-targets";
import { FooterNewsletter } from "./footer-newsletter";

/** Dashed rule along the top edge, drawn as an overlay so it takes no space. */
const topRule =
  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:border-t before:border-dashed before:border-white/20";

const rightsText =
  "w-full text-center font-mono text-[14px] leading-[1.5] tracking-[-0.42px] text-soft tablet:flex-1";

export function Footer() {
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
            fallbackSrc="/sites/confer/images/brand/first-ai-summit-footer.png"
            className="aspect-[1392/278] w-full"
          />
        </Reveal>

        <div className="flex w-full justify-center overflow-clip pb-10 desktop:px-10">
          <div className="flex w-full max-w-[1200px] flex-col items-start gap-14 tablet:flex-row tablet:gap-[10px]">
            <div className="flex w-full flex-col items-start gap-12 tablet:flex-1 tablet:gap-[100px] desktop:gap-12">
              <h6 className="max-w-[425px] font-display text-[16px] leading-[1.2] text-white tablet:text-[19px] desktop:text-[24px]">
                {footerBlurb}
              </h6>
              <FooterNewsletter />
            </div>

            <div className="flex w-full items-start gap-8 overflow-clip tablet:flex-1 tablet:justify-end">
              <nav
                aria-label="Footer"
                className="flex flex-1 flex-col items-start gap-[10px] tablet:flex-none"
              >
                {navLinks.map((link) => (
                  <NavPill key={link.label} href={link.href} label={link.label} />
                ))}
              </nav>
              <div className="flex flex-1 flex-col items-start gap-[10px] tablet:flex-none">
                {footerOtherLinks.map((link) => (
                  <NavPill key={link.label} href={link.href} label={link.label} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`relative flex w-full justify-center py-[14px] tablet:py-6 desktop:px-10 ${topRule}`}>
          <div className="flex w-full max-w-[1200px] flex-col items-center gap-[6px] tablet:flex-row tablet:items-start tablet:gap-6">
            <p className={`${rightsText} tablet:text-left`}>
              © 2026 First AI Summit. All rights reserved.
            </p>
            <p className={`${rightsText} tablet:text-right`}>Built for the future of AI.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
