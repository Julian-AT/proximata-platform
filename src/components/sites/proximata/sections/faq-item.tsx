"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "../content/faq";
import { EASE_OUT, Reveal } from "../motion";

/** Variant change tween used by the source accordion (0.4s ease-out). */
const TOGGLE = { duration: 0.4, ease: EASE_OUT } as const;

/**
 * The brand's "[+]" glyph (same geometry as BracketPlusIcon) with only the
 * plus turning 45° when open, so it reads as "[×]" while the brackets stay put.
 */
function ToggleGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 34 20" fill="none" aria-hidden="true" className="h-5 w-[34px]">
      <path d="M6 2H2v16h4M28 2h4v16h-4" stroke="currentColor" strokeWidth={2.2} />
      <motion.path
        d="M17 5v10M12 10h10"
        stroke="currentColor"
        strokeWidth={2.6}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={false}
        animate={{ rotate: open ? 45 : 0 }}
        transition={TOGGLE}
      />
    </svg>
  );
}

/**
 * Accordion card. Like the source, a click anywhere on the card toggles it;
 * the question is a real button so keyboard and screen-reader users get the
 * same control (its click bubbles up to the card handler).
 */
export function FaqItem({ entry }: { entry: FaqEntry }) {
  const { question, answer, points, link } = entry;
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
        className="group flex w-full cursor-pointer flex-col items-start overflow-clip border-b border-rule py-5"
      >
        <div className="flex w-full items-start gap-[10px]">
          <div className="flex min-h-[30px] min-w-0 flex-1 flex-col justify-center">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={open ? answerId : undefined}
              className="w-full cursor-pointer text-left font-mono text-[16px] leading-[1.2] font-medium text-balance text-white desktop:text-[20px]"
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
                  <div className="flex max-w-[600px] flex-col gap-3 pt-[10px] font-mono text-[16px] leading-[1.4] font-normal text-soft">
                    <p className="m-0 text-pretty">{answer}</p>
                    {points ? (
                      <ul className="m-0 flex flex-col gap-[6px] p-0">
                        {points.map((point) => (
                          <li key={point} className="flex gap-3">
                            <span aria-hidden="true" className="shrink-0 text-ice/60">
                              +
                            </span>
                            <span className="text-pretty">{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {link ? (
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        // Don't let the card's toggle swallow the link click.
                        onClick={(event) => event.stopPropagation()}
                        className="self-start text-ice underline decoration-ice/40 underline-offset-4 transition-colors duration-300 hover:decoration-ice focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ice"
                      >
                        {link.label}
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span
            aria-hidden="true"
            className={cn(
              "flex h-[30px] w-[34px] shrink-0 items-center justify-center text-ice/70 transition-colors duration-400 ease-framer-out group-hover:text-ice group-data-[open=true]:text-ice",
              open || collapsing ? "self-start" : "self-center",
            )}
          >
            <ToggleGlyph open={open} />
          </span>
        </div>
      </div>
    </Reveal>
  );
}
