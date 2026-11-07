"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT, Reveal } from "../motion";

/** Variant change tween used by the source accordion (0.4s ease-out). */
const TOGGLE = { duration: 0.4, ease: EASE_OUT } as const;

type FaqItemProps = {
  question: string;
  answer: string;
};

/**
 * Accordion card. Like the source, a click anywhere on the card toggles it;
 * the question is a real button so keyboard and screen-reader users get the
 * same control (its click bubbles up to the card handler).
 */
export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  // Keep the icon top-aligned until the answer has collapsed so it doesn't jump.
  const [collapsing, setCollapsing] = useState(false);
  const answerId = useId();

  const toggle = () => {
    if (open) setCollapsing(true);
    setOpen(!open);
  };

  return (
    <Reveal delay={0.1} duration={0.6} className="w-full">
      <div
        data-open={open}
        onClick={toggle}
        className="group dashed-frame flex w-full cursor-pointer flex-col items-start overflow-clip bg-black/80 px-6 py-4 [--frame-color:rgb(255_255_255/0.2)]"
      >
        <div className="flex w-full items-start gap-[10px]">
          <div className="flex min-h-[30px] min-w-0 flex-1 flex-col justify-center">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={open ? answerId : undefined}
              className="w-full cursor-pointer text-left font-vietnam text-[16px] leading-[1.2] font-normal text-balance text-white desktop:text-[20px]"
            >
              {question}
            </button>
            <AnimatePresence initial={false} onExitComplete={() => setCollapsing(false)}>
              {open && (
                <motion.div
                  key="answer"
                  id={answerId}
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  // The source drops the answer at once and only the card shrinks.
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: { height: TOGGLE, opacity: { duration: 0 } },
                  }}
                  transition={TOGGLE}
                >
                  <p className="m-0 max-w-[540px] pt-[10px] font-vietnam text-[16px] leading-[1.4] font-normal text-balance text-white/60">
                    {answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <motion.div
            aria-hidden="true"
            className={cn(
              "relative size-[30px] shrink-0",
              open || collapsing ? "self-start" : "self-center",
            )}
            initial={false}
            animate={{ rotate: open ? 45 : 0 }}
            transition={TOGGLE}
          >
            <Image
              src="/sites/confer/images/faq/sparkle.png"
              alt=""
              fill
              sizes="30px"
              className="object-cover brightness-[0.92] transition-[filter] duration-400 ease-framer-out group-hover:group-data-[open=false]:brightness-[1.55]"
            />
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
}
