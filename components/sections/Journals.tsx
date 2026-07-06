"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const poppins = { fontFamily: "var(--font-poppins)" };
const bricolage = { fontFamily: "var(--font-bricolage)", fontWeight: 600 };

// One entry = one open-book spread (left + right page). Pages live in
// /public/journals as <spread><L|R>.jpg (1L, 1R, 2L, …), cropped to the cream
// page and 600px wide. `place` isn't rendered today — kept for future use.
type Spread = { L: string; R: string; place: string; dates?: string };

const spreads: Spread[] = [
  { L: "/journals/1L.jpg", R: "/journals/1R.jpg", place: "Tokyo" },
  { L: "/journals/2L.jpg", R: "/journals/2R.jpg", place: "Bangalore" },
  { L: "/journals/3L.jpg", R: "/journals/3R.jpg", place: "London" },
  { L: "/journals/4L.jpg", R: "/journals/4R.jpg", place: "Kasol" },
  { L: "/journals/5L.jpg", R: "/journals/5R.jpg", place: "Pondicherry" },
  { L: "/journals/6L.jpg", R: "/journals/6R.jpg", place: "Chennai" },
  { L: "/journals/7L.jpg", R: "/journals/7R.jpg", place: "Rishikesh" },
];

function Face({ src, back }: { src: string; back?: boolean }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden bg-[var(--page-mat)]"
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

function Page({ src, side }: { src: string; side: "left" | "right" }) {
  return (
    <div
      className="absolute top-0 h-full w-1/2 overflow-hidden bg-[var(--page-mat)]"
      style={{
        left: side === "left" ? 0 : "50%",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
    </div>
  );
}

export default function Journals() {
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState<null | "next" | "prev">(null);
  const reduced = useReducedMotion();
  const dragX = useRef<number | null>(null);
  const S = spreads.length;

  const cur = spreads[spread];
  const atStart = spread <= 0;
  const atEnd = spread >= S - 1;

  function go(dir: "next" | "prev") {
    if (flip) return;
    if (dir === "next" && atEnd) return;
    if (dir === "prev" && atStart) return;
    if (reduced) {
      setSpread((s) => s + (dir === "next" ? 1 : -1));
      return;
    }
    setFlip(dir);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft") go("prev");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flip, spread]);

  // Base layers + the turning leaf's two faces, derived from the flip direction.
  let leftBase = cur.L;
  let rightBase = cur.R;
  let frontImg = cur.R;
  let backImg = cur.L;
  if (flip === "next") {
    leftBase = cur.L;
    rightBase = spreads[spread + 1].R;
    frontImg = cur.R;
    backImg = spreads[spread + 1].L;
  } else if (flip === "prev") {
    leftBase = spreads[spread - 1].L;
    rightBase = cur.R;
    frontImg = spreads[spread - 1].R;
    backImg = cur.L;
  }

  return (
    <section id="journals" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-24 lg:py-28">
        <Reveal>
          <p
            className="text-center text-[13px] uppercase tracking-[1.2px] text-eyebrow lg:text-left"
            style={poppins}
          >
            Off the clock
          </p>
          <h2
            className="mt-3 text-center text-[40px] leading-none sm:text-[52px] lg:text-left lg:text-[60px]"
            style={bricolage}
          >
            From my journals
          </h2>
          <p
            className="mt-4 text-center text-[16px] leading-[1.7] text-soft sm:text-[18px] lg:text-left"
            style={poppins}
          >
            I keep a travel journal wherever I go. Flip through a few spreads.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-center">
          {/* Gentle idle float, like the hero objects */}
          <div
            className="w-full max-w-[760px]"
            style={
              reduced
                ? undefined
                : { animation: "expFloat 6.5s ease-in-out infinite" }
            }
          >
          {/* The book — slightly tilted, like a journal set down on a desk */}
          <div
            className="relative w-full cursor-pointer select-none"
            style={{
              aspectRatio: "760 / 543",
              perspective: "2200px",
              transform: "rotate(-3deg)",
            }}
            onPointerDown={(e) => (dragX.current = e.clientX)}
            onPointerUp={(e) => {
              if (dragX.current == null) return;
              const dx = e.clientX - dragX.current;
              dragX.current = null;
              if (dx < -40) go("next");
              else if (dx > 40) go("prev");
              else {
                // treat as a click on a half
                const rect = e.currentTarget.getBoundingClientRect();
                go(e.clientX - rect.left < rect.width / 2 ? "prev" : "next");
              }
            }}
          >
            {/* Static pages underneath */}
            <Page src={leftBase} side="left" />
            <Page src={rightBase} side="right" />

            {/* Center spine shadow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-16 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 48%, rgba(0,0,0,0.10) 52%, rgba(0,0,0,0) 100%)",
              }}
            />

            {/* Turning leaf */}
            {flip && (
              <motion.div
                className="absolute left-1/2 top-0 z-30 h-full w-1/2"
                style={{
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
                initial={{ rotateY: flip === "next" ? 0 : -180 }}
                animate={{ rotateY: flip === "next" ? -180 : 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  setSpread((s) => s + (flip === "next" ? 1 : -1));
                  setFlip(null);
                }}
              >
                <Face src={frontImg} />
                <Face src={backImg} back />
              </motion.div>
            )}

            {/* Outer book edge */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-40 rounded-[4px] shadow-[0_24px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
            />
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
