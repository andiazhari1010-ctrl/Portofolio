"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, staggerTight, viewportOnce } from "@/lib/motion";

/**
 * Scroll-reveal primitives. All motion lives in this client leaf so section
 * components can stay declarative. Under prefers-reduced-motion every variant
 * collapses to a static render (no transform, no fade), per the skill's
 * non-negotiable reduced-motion rule.
 */

type RevealProps = HTMLMotionProps<"div"> & {
  as?: "div" | "section" | "li" | "ul";
};

export function Reveal({ children, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its RevealItem children as the group scrolls in. */
export function RevealGroup({
  children,
  tight = false,
  className,
}: {
  children: React.ReactNode;
  tight?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={viewportOnce}
      variants={tight ? staggerTight : stagger}
    >
      {children}
    </motion.div>
  );
}

/** A single staggered child. Inherits the parent's hidden/show timeline. */
export function RevealItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  );
}
