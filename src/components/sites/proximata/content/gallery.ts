export type GalleryPhoto = {
  /** Path under public/sites/proximata/images/gallery/, e.g. "/sites/proximata/images/gallery/kickoff.jpg". */
  src: string;
  /** Describes what the photo shows (people, setting, moment). */
  alt: string;
};

export const galleryCopy = {
  tag: "GALLERY",
  title: "Moments From Our Last Event",
} as const;

/**
 * Last-event photos, shown in the order listed. Empty until the organisers
 * send them; the gallery section is not rendered while this is empty.
 */
export const galleryPhotos: readonly GalleryPhoto[] = [];
