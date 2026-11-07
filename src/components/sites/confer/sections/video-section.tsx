"use client";

import { useInView } from "motion/react";
import { useEffect, useRef } from "react";

/** Full-width looping crowd footage; plays only while near the viewport. */
export function VideoSection() {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <div className="relative z-[1] flex w-full items-center justify-center overflow-clip">
      {/* Phone: the source's column layout lets the loaded 16:9 video set the height. */}
      <div className="relative aspect-video w-full tablet:aspect-[1.90779]">
        <video
          ref={ref}
          src="/sites/confer/video/crowd.mp4"
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
