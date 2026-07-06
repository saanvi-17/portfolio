"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

type Mode = "story" | "tldr";

/**
 * Body copy as ordered segments:
 * - `t` text. `strike: true` → struck through + greyed in TL;DR mode.
 * - `br` → single line break.
 * - `img` → inline image flowing with the text (Gowtham-style). `badge: true`
 *   uses the brand-pill metrics; otherwise it's a free-floating object cut-out.
 */
type Segment = {
  t?: string;
  strike?: boolean;
  br?: boolean;
  img?: string;
  alt?: string;
  badge?: boolean;
  /** Rectangular rounded thumbnail (kept as-is, background and all) rather than
   *  a free-floating transparent cut-out. */
  framed?: boolean;
  /** Taller inline height — for portrait cut-outs (e.g. a full-length outfit). */
  tall?: boolean;
};

const PARAGRAPHS: Segment[][] = [
  [
    { img: "/about/badge-design.png", alt: "Design", badge: true },
    { t: " found me before I had a word for it.", strike: true },
    { br: true },
    {
      t: "I'm a self taught product designer, four years in. I've shipped work across D2C wellness brand ",
    },
    { img: "/about/badge-bebodywise.png", alt: "Be Bodywise", badge: true },
    { t: " and B2B software " },
    { img: "/about/badge-auzmor.png", alt: "Auzmor", badge: true },
    { t: ". " },
    {
      t: "The work changes, but the feeling I'm chasing doesn't. I want people to use something and just get it, no friction, no second guessing.",
      strike: true,
    },
  ],
  [
    { t: "I also build, not just design, which is how " },
    { img: "/about/badge-cove.png", alt: "Cove", badge: true },
    { t: " came to life. " },
    {
      t: "It began as a small fix for my own messy wardrobe in the notes app and slowly turned into something I'm proud of.",
      strike: true,
    },
  ],
  [
    { t: "Away from screens, I paint " },
    {
      img: "/about/paint.png",
      alt: "A painting of The Great Wave under a starry sky",
    },
    { t: ", cook " },
    {
      img: "/about/waffles.png",
      alt: "A plate of heart-shaped waffles with ice cream",
    },
    { t: ", look for good matcha " },
    { img: "/about/matcha.png", alt: "An iced matcha latte" },
    { t: ", explore aesthetic cafés " },
    {
      img: "/about/cafe.png",
      alt: "A latte with tree latte art",
    },
    { t: ", put outfits together " },
    {
      img: "/about/outfit.png",
      alt: "An outfit — rust top with grey wide-leg trousers",
      tall: true,
    },
    { t: ", and keep a travel journal " },
    {
      img: "/about/journal.png",
      alt: "An open ring-bound travel journal",
    },
    { t: ". " },
    {
      t: "Those small joys are where my ideas usually come from.",
      strike: true,
    },
  ],
];

/**
 * Transparent-window rectangles measured from `public/about/contact-sheet.png`
 * (a 1024×1536 film border with four see-through holes). Values are % of the
 * sheet, with a small bleed so photos tuck under the opaque film border and
 * leave no hairline gaps. Order: top-left, top-right, bottom-left, bottom-right.
 */
const WINDOWS = {
  topLeft: { left: "3.7%", top: "6.6%", width: "45.4%", height: "38.1%" },
  topRight: { left: "50.9%", top: "6.6%", width: "46.3%", height: "38.1%" },
  bottomLeft: { left: "3.7%", top: "46.7%", width: "45.4%", height: "41.6%" },
  bottomRight: { left: "50.9%", top: "46.7%", width: "46.3%", height: "41.6%" },
} as const;

function Toggle({
  mode,
  setMode,
  reduced,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  reduced: boolean | null;
}) {
  const tabs: { id: Mode; label: string }[] = [
    { id: "story", label: "Story" },
    { id: "tldr", label: "TL:DR" },
  ];
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-lg border border-edge bg-card p-1.5 sm:rounded-xl sm:p-2">
      {tabs.map((tab) => {
        const active = mode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setMode(tab.id)}
            aria-pressed={active}
            className="relative cursor-pointer rounded px-2 py-1 text-[14px] sm:rounded-lg sm:px-4 sm:py-2 sm:text-[20px]"
            style={{ fontFamily: "var(--font-poppins)", letterSpacing: "0.4px" }}
          >
            {active && (
              <motion.span
                layoutId={reduced ? undefined : "about-toggle-pill"}
                className="absolute inset-0 rounded bg-chip sm:rounded-lg"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span
              className="relative z-10 transition-colors"
              style={{ color: active ? "var(--ink)" : "var(--soft2)" }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function VideoSlot({
  src,
  rect,
}: {
  src: string;
  rect: (typeof WINDOWS)[keyof typeof WINDOWS];
}) {
  return (
    <div className="absolute overflow-hidden bg-white" style={rect}>
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function ContactSheet() {
  return (
    <div
      className="relative w-full max-w-[420px]"
      style={{ aspectRatio: "1024 / 1536" }}
    >
      {/* Photos + clips sit BEHIND the film border, showing through its windows. */}
      <VideoSlot src="/about/IMG_8622.mp4" rect={WINDOWS.topLeft} />
      <img
        src="/about/photo-4583.jpg"
        alt="Saanvi in a garden, holding flowers"
        className="absolute object-cover"
        style={{ ...WINDOWS.topRight, objectPosition: "center top" }}
      />
      <img
        src="/about/photo-8899.jpg"
        alt="An aesthetic café spread — matcha and pastries"
        className="absolute object-cover"
        style={{ ...WINDOWS.bottomLeft, objectPosition: "center" }}
      />
      <VideoSlot src="/about/IMG_8820.mp4" rect={WINDOWS.bottomRight} />

      {/* Film border + KODAK labels, on top, with the four cut-out windows. */}
      <img
        src="/about/contact-sheet.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ objectFit: "fill" }}
      />
    </div>
  );
}

export default function About() {
  const [mode, setMode] = useState<Mode>("story");
  const reduced = useReducedMotion();
  const isTldr = mode === "tldr";

  return (
    <section id="about" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1160px] px-6 py-20 sm:py-24 lg:py-28">
        <Reveal className="grid items-start gap-12 lg:grid-cols-[601fr_397fr] lg:gap-10">
          {/* Text column */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
              <h2
                className="whitespace-nowrap text-[40px] leading-none sm:text-[52px] lg:text-[60px]"
                style={{
                  fontFamily: "var(--font-bricolage)",
                  fontWeight: 600,
                }}
              >
                About Me
              </h2>
              <Toggle mode={mode} setMode={setMode} reduced={reduced} />
            </div>

            <div
              className="text-[16px] leading-[1.7] sm:text-[18px]"
              style={{
                fontFamily: "var(--font-poppins)",
                letterSpacing: "0.36px",
              }}
            >
              {PARAGRAPHS.map((para, pi) => (
                <p key={pi} className={pi > 0 ? "mt-5" : undefined}>
                  {para.map((seg, si) => {
                    if (seg.br) return <br key={si} aria-hidden />;
                    if (seg.img) {
                      const cls = seg.badge
                        ? "mx-[0.25em] inline-block h-[1.9em] w-auto translate-y-[-0.08em] align-middle"
                        : seg.framed
                          ? "mx-[0.15em] inline-block h-[2.4em] w-auto translate-y-[-0.1em] rounded-[6px] align-middle shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
                          : seg.tall
                            ? "mx-[0.15em] inline-block h-[3.4em] w-auto translate-y-[-0.35em] align-middle drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
                            : "mx-[0.1em] inline-block h-[2.2em] w-auto translate-y-[-0.05em] align-middle drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)]";
                      return (
                        <img
                          key={si}
                          src={seg.img}
                          alt={seg.alt ?? ""}
                          className={cls}
                        />
                      );
                    }
                    if (seg.strike) {
                      return (
                        <span
                          key={si}
                          className="line-through transition-[color,text-decoration-color] duration-500 ease-out"
                          style={{
                            color: isTldr ? "var(--faint)" : "var(--ink)",
                            textDecorationColor: isTldr
                              ? "var(--faint)"
                              : "transparent",
                          }}
                        >
                          {seg.t}
                        </span>
                      );
                    }
                    return <span key={si}>{seg.t}</span>;
                  })}
                </p>
              ))}
            </div>
          </div>

          {/* Contact sheet */}
          <div className="flex justify-center lg:justify-end">
            <ContactSheet />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
