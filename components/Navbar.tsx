"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useReducedMotion } from "framer-motion";
import { List, X, MagnifyingGlass } from "@phosphor-icons/react";
import { navItems, profile } from "@/lib/content";
import { Socials } from "./Socials";
import { EASE_OUT } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

/**
 * Fixed single-line nav, capped under 72px. Three pieces of state, each with a
 * job:
 *  - `scrolled`  : fades a blurred surface in once the hero is left, via a
 *                  Motion scroll value (no scroll event listeners).
 *  - `active`    : the section under the viewport's midline, tracked with an
 *                  IntersectionObserver. Drives the sliding indicator (a real
 *                  state transition, the one motivated animation here) and
 *                  aria-current for assistive tech.
 *  - `open`      : the mobile sheet.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // active-section detection: a section is "active" when it crosses the middle
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={false}
        animate={{
          backgroundColor: scrolled ? "rgba(5,5,7,0.72)" : "rgba(5,5,7,0)",
          borderColor: scrolled ? "rgba(26,26,36,1)" : "rgba(26,26,36,0)",
        }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="border-b backdrop-blur-md"
        style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <nav aria-label="Primary" className="shell flex h-[68px] items-center justify-between">
          {/* brand / monogram */}
          <a
            href="#top"
            aria-label={`${profile.name}, back to top`}
            className="group flex items-center gap-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-btn border border-line bg-surface font-display text-sm font-bold tracking-tight text-ink transition-colors group-hover:border-accent/60">
              AP
            </span>
            <span className="hidden font-display text-[15px] font-semibold tracking-tight text-ink sm:block">
              Andy Azhari
            </span>
          </a>

          <div className="flex items-center gap-2">
          {/* desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block px-3.5 py-2 text-sm transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <span className="mr-1.5 font-mono text-[11px] text-accent-bright/70">
                      {item.index}
                    </span>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2 -bottom-px h-px bg-accent-green shadow-glow-green"
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* command menu trigger (works on every breakpoint) */}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("command-palette:open"))}
            aria-label="Open command menu"
            className="flex h-10 items-center gap-2 rounded-btn border border-line bg-surface px-3 text-muted transition-colors hover:border-accent/60 hover:text-ink"
          >
            <MagnifyingGlass size={17} weight="bold" />
            <span className="hidden text-sm lg:block">Search</span>
          </button>

          {/* mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-btn border border-line bg-surface text-ink lg:hidden"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
          </div>
        </nav>
      </motion.div>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="border-b border-line bg-bg/95 backdrop-blur-md lg:hidden"
          >
            <ul className="shell flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      scrollToId(item.id);
                    }}
                    className="flex items-center gap-3 py-3 text-base text-ink"
                  >
                    <span className="font-mono text-xs text-accent-bright/70">{item.index}</span>
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <Socials />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
