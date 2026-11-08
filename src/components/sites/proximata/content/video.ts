export type Aftermovie = {
  /** Path under public/sites/proximata/video/, e.g. "/sites/proximata/video/aftermovie.mp4". */
  src: string;
  /** Still frame shown before playback starts. */
  poster?: string;
  /** Accessible description of the footage. */
  label: string;
};

/**
 * Last event's aftermovie. `null` until the organisers send it; the video band
 * is not rendered while this is unset.
 */
export const aftermovie: Aftermovie | null = null;
