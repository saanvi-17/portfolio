"use client";

import { motion, useReducedMotion } from "framer-motion";

type Variant = "drag" | "marquee";

const dragItems = [
  { label: "✦", className: "bg-clay text-background" },
  { label: "drag me", className: "bg-olive text-background" },
  { label: "🍵", className: "bg-cream-card text-foreground" },
  { label: "delight", className: "bg-terracotta text-background" },
  { label: "✷", className: "bg-sage text-foreground" },
  { label: "play", className: "bg-foreground text-background" },
];

const marqueeWords = [
  "curiosity",
  "✦",
  "craft",
  "•",
  "delight",
  "✷",
  "playfulness",
  "•",
  "detail",
  "✦",
];

export default function BreakingSection({
  variant = "drag",
  tagline = "a little breathing room",
}: {
  variant?: Variant;
  tagline?: string;
}) {
  const reduced = useReducedMotion();

  if (variant === "marquee") {
    const row = [...marqueeWords, ...marqueeWords];
    return (
      <section className="overflow-hidden bg-band py-16 text-band-ink">
        <Marquee items={row} reduced={!!reduced} />
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.25em] text-band-ink/70">
          {tagline}
        </p>
      </section>
    );
  }

  return (
    <section className="grid-paper relative overflow-hidden bg-cream-card py-24">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          {tagline}
        </p>
        <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold text-foreground sm:text-4xl">
          Design should feel like play. Go on — fling these around.
        </h3>
      </div>

      <div className="relative mx-auto mt-10 h-56 max-w-3xl px-6">
        {dragItems.map((item, i) => (
          <motion.div
            key={item.label + i}
            className={`absolute cursor-grab select-none rounded-2xl px-5 py-3 text-base font-semibold shadow-md active:cursor-grabbing ${item.className}`}
            style={{
              left: `${8 + i * 15}%`,
              top: `${(i % 3) * 28 + 10}%`,
            }}
            drag={!reduced}
            dragElastic={0.6}
            dragConstraints={{ left: -200, right: 200, top: -100, bottom: 100 }}
            whileDrag={{ scale: 1.1, rotate: 6 }}
            whileHover={{ scale: 1.05 }}
            animate={
              reduced
                ? {}
                : { rotate: [0, i % 2 ? 4 : -4, 0] }
            }
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 4 + i,
                ease: "easeInOut",
              },
            }}
          >
            {item.label}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Marquee({ items, reduced }: { items: string[]; reduced: boolean }) {
  return (
    <div className="flex whitespace-nowrap">
      <motion.div
        className="flex shrink-0 items-center gap-8 pr-8 text-5xl font-semibold sm:text-7xl"
        animate={reduced ? {} : { x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        {items.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </motion.div>
    </div>
  );
}
