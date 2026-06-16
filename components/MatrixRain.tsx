"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Contained "digital rain" rendered to a canvas. Used once, behind the Security
 * Labs panel, where the motif is thematically earned (the hacking section), not
 * sprayed across the whole site.
 *
 * Performance and restraint:
 *  - draws straight to canvas via requestAnimationFrame; never touches React
 *    state, so it forces zero re-renders;
 *  - pauses entirely when scrolled out of view (IntersectionObserver);
 *  - renders a single static frame and stops under prefers-reduced-motion;
 *  - pointer-events-none and aria-hidden: pure atmosphere.
 */
const GLYPHS = "アイウエオカキクケコサシスセソ0123456789<>[]{}/=+*".split("");
const FONT = 15;

export function MatrixRain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = false;
    let w = 0;
    let h = 0;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent?.clientWidth ?? 0;
      h = parent?.clientHeight ?? 0;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(w / FONT);
      drops = Array.from({ length: columns }, () => Math.random() * -40);
    };

    const drawFrame = () => {
      // translucent wash leaves fading trails behind each glyph
      ctx.fillStyle = "rgba(5,5,7,0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${FONT}px ui-monospace, monospace`;
      for (let i = 0; i < columns; i++) {
        const ch = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const y = drops[i] * FONT;
        // electric blue, on-brand, with an occasional brighter cyan "head"
        ctx.fillStyle = Math.random() > 0.92 ? "#8fd6ff" : "#0a7bff";
        ctx.fillText(ch, i * FONT, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    // throttle to a calm cadence (~20 fps): not too fast, not too slow
    const STEP_MS = 50;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < STEP_MS) return;
      last = now;
      drawFrame();
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      // one quiet static frame, then leave it be
      drawFrame();
      drawFrame();
      return () => window.removeEventListener("resize", resize);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
