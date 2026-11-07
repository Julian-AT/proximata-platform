import { galleryCopy, galleryPhotos } from "../content/gallery";
import { SectionTitle } from "../motion";
import { SectionTag } from "../section-tag";
import { GalleryTicker } from "./gallery-ticker";

/** Last-event photos; hidden until content/gallery.ts lists some. */
export function Gallery() {
  if (galleryPhotos.length === 0) return null;

  return (
    <section
      aria-label="Gallery"
      className="relative z-[1] flex w-full flex-col items-center justify-center overflow-clip py-[100px]"
    >
      <div className="relative z-[1] flex w-full flex-col items-center justify-center gap-[56px] overflow-clip">
        <div className="relative z-[1] flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 overflow-clip px-8 tablet:px-0">
          <SectionTag label={galleryCopy.tag} />
          <SectionTitle
            text={galleryCopy.title}
            className="w-full max-w-[720px] [&_h2]:text-balance"
          />
        </div>

        <GalleryTicker photos={galleryPhotos} />
      </div>
    </section>
  );
}
