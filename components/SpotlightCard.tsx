"use client";

import { useRef } from "react";

/**
 * A surface that lights up under the cursor: a soft radial glow tracks the
 * pointer across the card. The pointer position is written straight to CSS
 * custom properties on the element (no React state, no re-renders per move),
 * so it stays smooth even with several cards on screen.
 *
 * Pass the full panel classes via `className` (including a radius and
 * overflow-hidden) so the glow is clipped to the card shape.
 */
export function SpotlightCard({
  children,
  className = "",
  glow = "rgba(0,170,255,0.16)",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onPointerMove={onPointerMove} className={`group/spot ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), ${glow}, transparent 72%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
