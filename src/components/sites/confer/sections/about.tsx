import { SCROLL_TARGETS } from "../background";

// Placeholder until the About section is built.
export function About() {
  return (
    <section id="about" aria-label="About" className="relative z-[1] min-h-[834px] pt-[178px]">
      <div id={SCROLL_TARGETS.aboutTitle} className="h-[115px]" />
    </section>
  );
}
