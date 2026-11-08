"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { aftermovie, type Aftermovie } from "../content/video";

/** Full-width looping footage; plays only while near the viewport. */
function VideoBand({ video }: { video: Aftermovie }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (inView) {
      element.play().catch(() => {});
    } else {
      element.pause();
    }
  }, [inView]);

  return (
    <div className="relative z-[1] flex w-full items-center justify-center overflow-clip bg-ink">
      {/* Phone: the source's column layout lets the loaded 16:9 video set the height. */}
      <div className="relative aspect-video w-full tablet:aspect-[1.90779]">
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          aria-label={video.label}
          muted
          loop
          playsInline
          preload="none"
          className="block size-full object-cover"
        />
      </div>
    </div>
  );
}

/** Last event's aftermovie; renders nothing until `content/video.ts` provides one. */
export function VideoSection() {
  if (!aftermovie) return null;
  return <VideoBand video={aftermovie} />;
}
