import type { Variants } from "framer-motion";

/**
 * Shared motion language. One easing curve everywhere so every entrance and
 * hover feels like it belongs to the same hand. MOTION_INTENSITY sits around 7
 * (calm but alive): load stagger, scroll reveal, hover lift, magnetic CTA, tilt.
 * No perpetual motion beyond the single hero aurora and the contained rain.
 */

// a confident decel curve (the "expo-out" feel) used across the site
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// distance content travels on a fade-up; small, so it reads as composure
const RISE = 22;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: RISE },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

// parent that releases its children in sequence
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// tighter child step for dense lists (tags, facts)
export const staggerTight: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

// viewport config reused by every scroll reveal: fire once, a little early
export const viewportOnce = { once: true, amount: 0.25, margin: "0px 0px -80px 0px" } as const;
