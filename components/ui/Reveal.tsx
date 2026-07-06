"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = 28;

function hidden(direction: Direction) {
  switch (direction) {
    case "up":
      return { opacity: 0, y: offset };
    case "down":
      return { opacity: 0, y: -offset };
    case "left":
      return { opacity: 0, x: offset };
    case "right":
      return { opacity: 0, x: -offset };
    default:
      return { opacity: 0 };
  }
}

/**
 * Fades/slides its children in when they scroll into view. Set `stagger` on a
 * Reveal to have direct <Reveal.Item> children animate in sequence.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  stagger,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
}) {
  const variants: Variants = {
    hidden: hidden(direction),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        ...(stagger ? { staggerChildren: stagger } : {}),
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child of a staggered Reveal — inherits the parent's stagger timing.
 * Exported as a named component (not a static on Reveal) so it works when
 * imported into Server Components across the RSC boundary.
 */
export function RevealItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  const variants: Variants = {
    hidden: hidden(direction),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
