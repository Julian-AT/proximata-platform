"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { galleryFrame, galleryPhotos } from "../data";
import { EASE_OUT, Reveal } from "../motion";
import { Ticker } from "../ticker";

type Photo = (typeof galleryPhotos)[number];
type ActivePhoto = { layoutId: string; photo: Photo };

/** Framer's lightbox tween (0.4s, template ease-out). */
const LIGHTBOX_TRANSITION = { duration: 0.4, ease: EASE_OUT } as const;

/** Photo aspect inside the frame (Framer: 81% wide, 1.6631:1). */
const PHOTO_ASPECT = "aspect-[1.6631016042780749]";

/** The source sizes each frame individually; phone widths alternate too. */
const ITEM_WIDTHS = [
  "w-[285.0088px] tablet:w-[570.0094px]",
  "w-[289.2267px] tablet:w-[569.3837px]",
  "w-[285.0088px] tablet:w-[570.0094px]",
  "w-[285.0088px] tablet:w-[570.0094px]",
  "w-[289.2267px] tablet:w-[570.0094px]",
  "w-[285.0088px] tablet:w-[569.3837px]",
];

const TABLET_QUERY = "(min-width: 810px)";

function subscribeTablet(onChange: () => void) {
  const query = window.matchMedia(TABLET_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const noopSubscribe = () => () => {};

type GalleryItemProps = {
  photo: Photo;
  widthClass: string;
  activeId: string | null;
  onOpen: (active: ActivePhoto) => void;
};

/** Ornate frame with the photo laid over its opening; scales in when it enters view. */
function GalleryItem({ photo, widthClass, activeId, onOpen }: GalleryItemProps) {
  const layoutId = useId();

  return (
    <Reveal
      from={{ opacity: 0, scale: 0.9 }}
      delay={0.1}
      duration={0.6}
      className={widthClass}
    >
      <div className="relative flex w-full items-center justify-center overflow-clip">
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          {activeId !== layoutId && (
            <motion.figure
              layoutId={layoutId}
              transition={LIGHTBOX_TRANSITION}
              className={`relative m-0 w-[81%] overflow-clip ${PHOTO_ASPECT}`}
              onClick={() => onOpen({ layoutId, photo })}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 809px) 235px, 462px"
                className="object-cover"
              />
            </motion.figure>
          )}
        </div>
        <figure className="relative m-0 aspect-[1.49609375] w-full overflow-clip">
          <Image
            src={galleryFrame}
            alt=""
            fill
            sizes="(max-width: 809px) 290px, 570px"
            className="object-contain"
          />
        </figure>
      </div>
    </Reveal>
  );
}

/** Framer lightbox: dimmed backdrop, photo grows to at most 800px wide. */
function Lightbox({ active, onClose }: { active: ActivePhoto; onClose: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-10 bg-ink/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={LIGHTBOX_TRANSITION}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-label={active.photo.alt}
        className="pointer-events-none fixed inset-5 z-10 flex items-center justify-center"
      >
        <div
          className={`relative w-full max-w-[min(800px,calc((100dvh-40px)*1.6631))] ${PHOTO_ASPECT}`}
        >
          <motion.figure
            layoutId={active.layoutId}
            transition={LIGHTBOX_TRANSITION}
            className="pointer-events-auto absolute inset-0 m-0 overflow-clip"
          >
            <Image
              src={active.photo.src}
              alt={active.photo.alt}
              fill
              sizes="800px"
              className="object-cover"
            />
          </motion.figure>
        </div>
      </div>
    </>
  );
}

/** Endless row of framed photos (30px/s, pauses on hover); a click opens the lightbox. */
export function GalleryTicker() {
  const tabletUp = useSyncExternalStore(
    subscribeTablet,
    () => window.matchMedia(TABLET_QUERY).matches,
    () => true,
  );
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const [active, setActive] = useState<ActivePhoto | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <Ticker
        velocity={30}
        gap={tabletUp ? 48 : 20}
        hoverFactor={0}
        className="relative z-[1] w-full"
      >
        {galleryPhotos.map((photo, i) => (
          <GalleryItem
            key={photo.src}
            photo={photo}
            widthClass={ITEM_WIDTHS[i % ITEM_WIDTHS.length]}
            activeId={active?.layoutId ?? null}
            onOpen={setActive}
          />
        ))}
      </Ticker>
      {isClient &&
        createPortal(
          <AnimatePresence>
            {active && <Lightbox key={active.layoutId} active={active} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
