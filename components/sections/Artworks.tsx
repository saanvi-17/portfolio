"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const art = [
  { emoji: "🎨", color: "bg-clay" },
  { emoji: "🪷", color: "bg-olive" },
  { emoji: "✦", color: "bg-terracotta" },
  { emoji: "🖌️", color: "bg-sage" },
  { emoji: "🌿", color: "bg-olive" },
  { emoji: "☀️", color: "bg-terracotta" },
  { emoji: "🫖", color: "bg-clay" },
  { emoji: "✷", color: "bg-sage" },
];

export default function Artworks() {
  const reduced = useReducedMotion();
  const row = [...art, ...art];

  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-5xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            Off the clock
          </p>
          <h2 className="mt-5 text-3xl font-semibold sm:text-5xl">
            Personal artworks.
          </h2>
          <p className="mt-4 max-w-prose text-muted">
            Placeholder gallery — paintings, sketches, and experiments. Real
            artwork files drop in here later.
          </p>
        </Reveal>
      </div>

      <div className="flex">
        <motion.div
          className="flex shrink-0 gap-5 pr-5"
          animate={reduced ? {} : { x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {row.map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 ? 3 : -3 }}
              className={`grid size-48 shrink-0 place-items-center rounded-3xl text-5xl shadow-md ${a.color}`}
            >
              {a.emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
