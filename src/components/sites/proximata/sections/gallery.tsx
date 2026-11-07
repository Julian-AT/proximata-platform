import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { GalleryTicker } from "./gallery-ticker";

export function Gallery() {
  return (
    <section
      aria-label="Gallery"
      className="relative z-[1] flex w-full flex-col items-center justify-center overflow-clip py-[100px]"
    >
      <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-[56px] overflow-clip">
        <div className="relative z-[1] flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 overflow-clip px-8 tablet:px-0">
          <SectionTag label="GALLERY" />
          <SectionTitle
            text="Moments From Past Events That Sparked It All"
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <GalleryTicker />
      </div>
    </section>
  );
}
