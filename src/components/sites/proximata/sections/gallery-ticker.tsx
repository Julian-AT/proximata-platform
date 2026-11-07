"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "../content/gallery";
import { EASE_OUT, Reveal } from "../motion";
import { Ticker } from "../ticker";

type ActivePhoto = { layoutId: string; photo: GalleryPhoto };

/** Framer's lightbox tween (0.4s, template ease-out). */
const LIGHTBOX_TRANSITION = { duration: 0.4, ease: EASE_OUT } as const;

/** Photo aspect inside the frame (kept from the template, 1.6631:1). */
const PHOTO_ASPECT = "aspect-[1.6631016042780749]";

const TABLET_QUERY = "(min-width: 810px)";

function subscribeTablet(onChange: () => void) {
  const query = window.matchMedia(TABLET_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const noopSubscribe = () => () => {};

const corner =
  "absolute size-5 border-ice/40 transition-colors duration-300 ease-framer group-hover:border-ice/80 tablet:size-8";

/** HUD corner brackets around the photo (replaces the template's ornate frame). */
function CornerBrackets() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={cn(corner, "top-0 left-0 border-t-[1.5px] border-l-[1.5px]")} />
      <span className={cn(corner, "top-0 right-0 border-t-[1.5px] border-r-[1.5px]")} />
      <span className={cn(corner, "bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]")} />
      <span className={cn(corner, "right-0 bottom-0 border-r-[1.5px] border-b-[1.5px]")} />
    </span>
  );
}

type GalleryItemProps = {
  photo: GalleryPhoto;
  activeId: string | null;
  onOpen: (active: ActivePhoto) => void;
};

/** Bracket-framed photo; scales in when it enters view, click opens the lightbox. */
function GalleryItem({ photo, activeId, onOpen }: GalleryItemProps) {
  const layoutId = useId();

  return (
    <Reveal
      from={{ opacity: 0, scale: 0.9 }}
      delay={0.1}
      duration={0.6}
      className="w-[285px] tablet:w-[570px]"
    >
      {/* Percentage padding resolves against the width, so the inset is even on all sides. */}
      <div className="group relative w-full p-[5%]">
        <CornerBrackets />
        <div className={`relative w-full ${PHOTO_ASPECT}`}>
          {activeId !== layoutId && (
            <motion.figure
              layoutId={layoutId}
              transition={LIGHTBOX_TRANSITION}
              className="absolute inset-0 m-0 cursor-pointer overflow-clip"
              onClick={() => onOpen({ layoutId, photo })}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 809px) 257px, 513px"
                className="object-cover"
              />
            </motion.figure>
          )}
        </div>
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
export function GalleryTicker({ photos }: { photos: readonly GalleryPhoto[] }) {
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
        {photos.map((photo) => (
          <GalleryItem
            key={photo.src}
            photo={photo}
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
