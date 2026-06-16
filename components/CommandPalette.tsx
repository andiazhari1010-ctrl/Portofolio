"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MagnifyingGlass, ArrowUpRight } from "@phosphor-icons/react";
import { navItems, profile } from "@/lib/content";
import { EASE_OUT } from "@/lib/motion";
import { scrollToId } from "@/lib/scroll";

/**
 * A keyboard-driven command menu (Cmd/Ctrl + K), opened from anywhere on the
 * page or by the nav button. On-theme for a security/developer portfolio:
 * everything is reachable from the keyboard. Sections smooth-scroll into view;
 * links open externally. Accessible as a modal dialog with a listbox, arrow-key
 * navigation, Esc to close, focus moved into the input and restored on close.
 */

type Item = {
  label: string;
  hint?: string;
  kind: "section" | "link";
  target: string;
  external?: boolean;
};

const baseItems: Item[] = [
  ...navItems.map((n) => ({
    label: n.label,
    hint: n.index,
    kind: "section" as const,
    target: n.id,
  })),
  { label: "Open GitHub", kind: "link", target: profile.github, external: true },
  { label: "Open LinkedIn", kind: "link", target: profile.linkedin, external: true },
  { label: "Email me", kind: "link", target: `mailto:${profile.email}` },
  { label: "Download CV", kind: "link", target: profile.cv },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseItems;
    return baseItems.filter((i) => i.label.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => setActive(0), [query]);

  // global hotkeys + open event from the nav button
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("command-palette:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("command-palette:open", onOpen);
    };
  }, []);

  // focus + scroll lock while open; restore focus on close
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => inputRef.current?.focus(), 20);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    setQuery("");
    lastFocused.current?.focus?.();
  }, [open]);

  function run(item: Item) {
    setOpen(false);
    if (item.kind === "section") {
      // wait a tick so the dialog unmounts and scroll lock releases first
      window.setTimeout(() => scrollToId(item.target), 0);
    } else if (item.external) {
      window.open(item.target, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.target;
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[active];
      if (item) run(item);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            onKeyDown={onKeyDown}
            initial={reduce ? {} : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? {} : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="panel relative z-10 w-full max-w-xl overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <MagnifyingGlass size={18} weight="bold" className="shrink-0 text-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or jump to..."
                aria-label="Search sections and links"
                className="w-full bg-transparent py-4 text-[15px] text-ink placeholder:text-muted/70 focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded-tag border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block">
                ESC
              </kbd>
            </div>

            <ul role="listbox" aria-label="Results" className="max-h-[320px] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-muted">No matches.</li>
              )}
              {results.map((item, i) => (
                <li key={item.label} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-surface-2 text-ink" : "text-muted"
                    }`}
                  >
                    {item.hint ? (
                      <span className="w-6 font-mono text-xs text-accent-bright/70">{item.hint}</span>
                    ) : (
                      <ArrowUpRight size={15} weight="bold" className="w-6 text-muted" />
                    )}
                    <span className="flex-1">{item.label}</span>
                    {i === active && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        enter
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
