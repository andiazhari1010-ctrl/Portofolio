"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Text "decode" effect: characters resolve from random glyphs to the final
 * string, left to right. On-theme for a security portfolio (decryption), and
 * motivated as a load / reveal moment, not perpetual motion.
 *
 * Renders an aria-hidden span; the parent element owns the accessible name
 * (aria-label), so screen readers never read the scrambling glyphs. The whole
 * effect is skipped under prefers-reduced-motion.
 *
 * A short, finite interval drives it (not a per-frame rAF on user input), so it
 * stays cheap and stops cleanly.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#%";
const STEP_MS = 45;
const FRAMES_PER_CHAR = 1.4;

export function ScrambleText({
  text,
  className,
  trigger = "view",
}: {
  text: string;
  className?: string;
  trigger?: "load" | "view";
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? text : "");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }

    let timer: ReturnType<typeof setInterval> | undefined;
    let frame = 0;
    const total = text.length * FRAMES_PER_CHAR + 6;

    const start = () => {
      if (started.current) return;
      started.current = true;
      timer = setInterval(() => {
        let out = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            out += " ";
          } else if (frame >= i * FRAMES_PER_CHAR) {
            out += text[i];
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        frame += 1;
        if (frame > total && timer) {
          clearInterval(timer);
          setDisplay(text);
        }
      }, STEP_MS);
    };

    if (trigger === "load") {
      start();
      return () => {
        if (timer) clearInterval(timer);
        // reset so a re-run (StrictMode double-invoke, dep change) restarts
        // cleanly instead of finding the guard stuck and never animating
        started.current = false;
      };
    }

    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
      started.current = false;
    };
  }, [text, trigger, reduce]);

  return (
    <span ref={ref} aria-hidden="true" className={className}>
      {display || " "}
    </span>
  );
}
