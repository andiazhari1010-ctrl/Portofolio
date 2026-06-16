"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin neon line at the very top that fills with scroll position. Pure
 * navigation feedback (motivated), driven by a motion value so it never
 * re-renders React. The spring just smooths the fill.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-accent to-accent-bright"
    />
  );
}
