"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { speakers } from "../data";
import { ChevronIcon, InstagramIcon, LinkedInIcon } from "../icons";
import { Reveal } from "../motion";

/** Socials bar rests 72px below the photo and springs to 12px above its bottom edge. */
const SOCIALS_RISE = 84;
const SOCIALS_SPRING = { type: "spring", bounce: 0.2, duration: 0.4 } as const;
/** The source's cards alternate between 319px and 318px wide. */
const CARD_WIDTHS = ["w-[319px]", "w-[318px]", "w-[318px]"] as const;

type Speaker = (typeof speakers)[number];

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center text-white"
      whileHover={{ scale: 0.96 }}
      transition={SOCIALS_SPRING}
    >
      {children}
    </motion.a>
  );
}

function SpeakerCard({ speaker, index }: { speaker: Speaker; index: number }) {
  const [active, setActive] = useState(false);

  return (
    <Reveal as="li" delay={0.1 * index} amount={0.3} className="shrink-0 snap-center">
      <motion.div
        data-active={active}
        onHoverStart={() => setActive(true)}
        onHoverEnd={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setActive(false);
        }}
        className={cn(
          "dashed-frame flex flex-col items-center overflow-clip data-[active=true]:[--frame-color:rgb(69_255_134)]",
          CARD_WIDTHS[index % CARD_WIDTHS.length],
        )}
      >
        <figure className="relative aspect-[319/291.5] w-full overflow-clip">
          <Image src={speaker.image} alt={speaker.name} fill sizes="319px" className="object-cover" />
          <motion.div
            className="absolute bottom-[-72px] left-1/2 z-[1] flex items-center justify-center gap-[10px] overflow-clip bg-black p-1"
            style={{ x: "-50%" }}
            initial={false}
            animate={{ y: active ? -SOCIALS_RISE : 0 }}
            transition={SOCIALS_SPRING}
          >
            <SocialLink href={speaker.instagram} label={`${speaker.name} on Instagram`}>
              <InstagramIcon className="size-[37px]" />
            </SocialLink>
            <SocialLink href={speaker.linkedin} label={`${speaker.name} on LinkedIn`}>
              <LinkedInIcon className="h-[33px] w-[37px]" />
            </SocialLink>
          </motion.div>
        </figure>
        <div className="flex w-full flex-col items-center gap-1 bg-black/80 p-6 text-center">
          <h3 className="font-clash-bold text-[16px] leading-[1.2] text-white tablet:text-[19px] desktop:text-[24px]">
            {speaker.name}
          </h3>
          <p className="font-vietnam text-[16px] leading-[1.4] text-confer-muted">{speaker.role}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

function ArrowButton({
  direction,
  hidden,
  onClick,
}: {
  direction: "left" | "right";
  hidden: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={direction === "left" ? "Previous speakers" : "Next speakers"}
      disabled={hidden}
      onClick={onClick}
      initial={false}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black/20 text-white",
        hidden ? "pointer-events-none" : "pointer-events-auto",
      )}
    >
      <ChevronIcon direction={direction} className="size-10" />
    </motion.button>
  );
}

/**
 * Horizontally scrolling, snap-centred speaker list with edge fades and
 * paging arrows (Framer "Carousel").
 */
export function SpeakersCarousel() {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  // Mask alpha at each edge: opaque when that edge is reached, faded when more content waits there.
  const startAlpha = useMotionValue(1);
  const endAlpha = useMotionValue(0);
  const mask = useMotionTemplate`linear-gradient(to right, rgba(0, 0, 0, ${startAlpha}) 0%, rgb(0, 0, 0) 12.5%, rgb(0, 0, 0) 87.5%, rgba(0, 0, 0, ${endAlpha}) 100%)`;

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const max = list.scrollWidth - list.clientWidth;
      const start = list.scrollLeft <= 1;
      const end = list.scrollLeft >= max - 1;
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    measure();
    list.addEventListener("scroll", measure, { passive: true });
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const controls = [
      animate(startAlpha, edges.start ? 1 : 0, { duration: 0.3, ease: "easeOut" }),
      animate(endAlpha, edges.end ? 1 : 0, { duration: 0.3, ease: "easeOut" }),
    ];
    return () => controls.forEach((control) => control.stop());
  }, [edges, startAlpha, endAlpha]);

  const page = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * list.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="relative flex h-[438px] w-full px-8 py-[10px] tablet:px-10">
      <motion.ul
        ref={listRef}
        aria-label="Speakers"
        data-lenis-prevent-horizontal
        className="flex w-full snap-x snap-mandatory items-center gap-10 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {speakers.map((speaker, i) => (
          <SpeakerCard key={speaker.name} speaker={speaker} index={i} />
        ))}
      </motion.ul>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-[72px]">
        <ArrowButton direction="left" hidden={edges.start} onClick={() => page(-1)} />
        <ArrowButton direction="right" hidden={edges.end} onClick={() => page(1)} />
      </div>
    </div>
  );
}
