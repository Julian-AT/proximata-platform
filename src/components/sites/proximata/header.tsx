"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks, registerLink } from "./content/navigation";
import { ButtonLink } from "./framer-button";
import { HostLockup, ProximataWordmark } from "./logo";
import { EASE_FRAMER } from "./motion";
import { NavPill } from "./nav-pill";

/**
 * The wordmark as the home link with HOIV, the co-host, right beside it.
 * Widths stay at or above the brand book's 120px minimum.
 */
function Logo({ width }: { width: number }) {
  return (
    <HostLockup
      wordmarkWidth={width}
      priority
      wordmark={
        <Link href="/" aria-label="Proximata home" className="block shrink-0">
          <ProximataWordmark width={width} priority />
        </Link>
      }
    />
  );
}

function RegisterButton({ className, onClick }: { className: string; onClick?: () => void }) {
  return (
    <ButtonLink
      href={registerLink.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {registerLink.label}
    </ButtonLink>
  );
}

/** Four dots that fold into an X when the menu is open. */
function MenuIcon({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const transition = { duration: 0.3, ease: EASE_FRAMER };
  return (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={onToggle}
      className="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-full"
    >
      {[
        [11, 11],
        [11, 20],
        [20, 11],
        [20, 20],
      ].map(([top, left], i) => (
        <motion.span
          key={i}
          className="absolute block bg-white"
          style={{ top, left, translateX: "-3px", translateY: "-3px" }}
          animate={
            open
              ? i === 0 || i === 2
                ? { opacity: 0, width: 6, height: 6, borderRadius: 3 }
                : {
                    opacity: 1,
                    // 19×2.5 bar centred on the 36px button (offset by the -3px translate).
                    width: 19,
                    height: 2.5,
                    borderRadius: 2,
                    top: 19.75,
                    left: 11.5,
                    rotate: i === 1 ? 45 : -45,
                  }
              : { opacity: 1, width: 6, height: 6, borderRadius: 3, top, left, rotate: 0 }
          }
          transition={transition}
        />
      ))}
    </button>
  );
}

/** `compact` (tablets once scrolled) tightens the bar so it fits from 810px up. */
function DesktopNav({ compact = false }: { compact?: boolean }) {
  return (
    <nav aria-label="Primary" className="flex justify-center px-10 pb-2">
      <div
        className={cn(
          "relative flex items-center justify-center bg-ink/70 px-4 py-[10px] backdrop-blur-[10px] after:pointer-events-none after:absolute after:inset-0 after:border after:border-t-0 after:border-dashed after:border-white/[0.14] after:content-['']",
          compact ? "gap-8" : "gap-[52px]",
        )}
      >
        <Logo width={compact ? 130 : 150} />
        <ul className="flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NavPill href={link.href} label={link.label} />
            </li>
          ))}
        </ul>
        <RegisterButton className="h-10 w-[138px] px-0" />
      </div>
    </nav>
  );
}

function CompactNav({ variant }: { variant: "phone" | "tablet" }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        "flex flex-col items-center transition-colors duration-300",
        variant === "phone" ? "px-5 pb-4" : "px-10 py-4",
        open && "bg-panel pt-4",
      )}
    >
      <div
        className={cn(
          "relative flex bg-ink/70 backdrop-blur-[10px] after:pointer-events-none after:absolute after:inset-0 after:border after:border-dashed after:border-white/[0.14] after:content-['']",
          open
            ? "w-full flex-col items-start gap-6 px-4 pt-[10px] pb-4"
            : variant === "phone"
              ? "items-center gap-9 py-[6px] pr-2 pl-4 after:border-t-0"
              : "items-center px-4 py-[10px] after:border-t-0",
        )}
      >
        <div
          className={cn(
            "flex items-center",
            open ? "w-full justify-between" : variant === "phone" ? "gap-3" : "gap-[15px]",
          )}
        >
          <Logo width={open ? 150 : 120} />
          <MenuIcon open={open} onToggle={() => setOpen((value) => !value)} />
        </div>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="menu"
              className="flex w-full flex-col gap-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE_FRAMER }}
            >
              <ul className="flex flex-col items-start gap-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <NavPill href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
              <RegisterButton className="h-[54px] w-full" onClick={() => setOpen(false)} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </nav>
  );
}

/**
 * Fixed top navigation. Desktop shows the full bar; phones get the compact
 * menu. Tablets show the compact bar only while the page is at the very top.
 */
export function Header() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < 1);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="fixed top-0 left-1/2 z-[8] w-full -translate-x-1/2">
      <div className="hidden desktop:block">
        <DesktopNav />
      </div>
      <div className={cn("hidden tablet:max-desktop:block", atTop && "tablet:max-desktop:hidden")}>
        <DesktopNav compact />
      </div>
      <div className={cn("hidden", atTop && "tablet:max-desktop:block")}>
        <CompactNav variant="tablet" />
      </div>
      <div className="tablet:hidden">
        <CompactNav variant="phone" />
      </div>
    </header>
  );
}
