"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

type Mode = "journal" | "desk";
type Pose = { cx: number; cy: number; rot: number };
type HeroObject = {
  id: string;
  w: number;
  h: number;
  j: Pose;
  d: Pose;
  node: ReactNode;
  /** Backdrop objects (e.g. the notebook) — no idle float, no hover lift/z-raise. */
  isStatic?: boolean;
  /** Lift-only hover (no scale) — for clipped+rotated layers like polaroids that
   *  would otherwise show a sub-pixel seam when scaled. */
  gentleHover?: boolean;
  /** Uniform scale applied to the object (used to shrink desktop nodes for mobile). */
  scale?: number;
};

const STAGE_W = 1280;
const STAGE_H = 950;

const spring = { type: "spring" as const, stiffness: 70, damping: 16 };

const LAMP_TIP =
  "pointer-events-none absolute left-1/2 top-full z-[80] mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-tip px-3 py-1.5 text-sm text-tip-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100";

/** Hero lamp = the site's light/dark switch. Hover shows a tooltip; click flips
 *  the whole-site theme (and swaps the lit ↔ unlit bulb). Lit = light mode. */
function LampObject() {
  const { theme, toggle } = useTheme();
  const on = theme === "light";
  const down = useRef<{ x: number; y: number } | null>(null);
  return (
    <div
      className="group absolute inset-0 cursor-pointer"
      style={{ touchAction: "manipulation" }}
      onPointerDown={(e) => {
        down.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        // One path for mouse + touch (Lenis can swallow the synthetic click on
        // touch). Toggle only on a tap in place — not a scroll/drag.
        const d = down.current;
        down.current = null;
        if (!d) return;
        if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 10) return;
        e.stopPropagation();
        toggle();
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Both bulbs stacked; the .dark class (the same switch that themes the
            whole site) cross-fades lit ↔ unlit, so it can never desync. */}
        <img
          src="/hero/lamp.png"
          alt="Table lamp"
          className="transition-opacity duration-300 dark:opacity-0"
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
            left: "-61.42%",
            width: "221.95%",
            maxWidth: "none",
          }}
        />
        <img
          src="/hero/off-lamp.png"
          alt=""
          aria-hidden
          className="opacity-0 transition-opacity duration-300 dark:opacity-100"
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
            left: "-61.42%",
            width: "221.95%",
            maxWidth: "none",
          }}
        />
      </div>
      <span className={LAMP_TIP}>{on ? "Click to dim" : "Click to brighten"}</span>
    </div>
  );
}

const objects: HeroObject[] = [
  {
    id: "notebook",
    w: 787.013,
    h: 524.675,
    isStatic: true,
    j: { cx: 640.0, cy: 661.15, rot: -4 },
    d: { cx: 1259.507, cy: 694.337, rot: 0 },
    node: (
      <img
        src="/hero/notebook.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    ),
  },
  {
    id: "polaroid1",
    w: 197,
    h: 214.3,
    j: { cx: 399.94, cy: 539.44, rot: -5.48 },
    d: { cx: 122.5, cy: 354.5, rot: 0 },
    node: (
      <img
        src="/hero/polaroid1_full.png"
        alt="Saanvi as a child"
        className="absolute inset-0 h-full w-full object-contain"
      />
    ),
  },
  {
    id: "polaroid2",
    w: 197,
    h: 214.3,
    j: { cx: 527.94, cy: 594.44, rot: 1.69 },
    d: { cx: 335.5, cy: 354.5, rot: 0 },
    node: (
      <img
        src="/hero/polaroid2_full.png"
        alt="Saanvi traveling"
        className="absolute inset-0 h-full w-full object-contain"
      />
    ),
  },
  {
    id: "lamp",
    w: 127.563,
    h: 283.121,
    j: { cx: 937.19, cy: 490.81, rot: 2.14 },
    d: { cx: 1166.78, cy: 171.56, rot: 0 },
    node: <LampObject />,
  },
  {
    id: "img16",
    w: 86.708,
    h: 55.247,
    j: { cx: 596.78, cy: 679.61, rot: 5.44 },
    d: { cx: 80.35, cy: 212.62, rot: 0 },
    node: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero/img16.png"
          alt=""
          style={{
            position: "absolute",
            height: "193.52%",
            width: "123.3%",
            left: "-11.6%",
            top: "-44.29%",
            maxWidth: "none",
          }}
        />
      </div>
    ),
  },
  {
    id: "img18",
    w: 344.09,
    h: 229.393,
    j: { cx: 939.76, cy: 805.78, rot: -0.36 },
    d: { cx: 1000.045, cy: 329.7, rot: 0 },
    node: (
      <img
        src="/hero/img18.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    ),
  },
  {
    id: "img21",
    w: 138.632,
    h: 138.632,
    j: { cx: 582.87, cy: 846.11, rot: 0.66 },
    d: { cx: 1172.32, cy: 385.32, rot: 0 },
    node: (
      <img
        src="/hero/img21.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    ),
  },
  {
    id: "img23",
    w: 194.926,
    h: 194.926,
    j: { cx: 757.94, cy: 531.94, rot: -8.6 },
    d: { cx: 317.46, cy: 819.46, rot: 0 },
    node: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero/img23.png"
          alt=""
          style={{
            position: "absolute",
            height: "129.22%",
            width: "129.22%",
            left: "-15.71%",
            top: "-14.02%",
            maxWidth: "none",
          }}
        />
      </div>
    ),
  },
  {
    id: "img22",
    w: 56.99,
    h: 188.315,
    j: { cx: 309.15, cy: 841.18, rot: -4.72 },
    d: { cx: 908.495, cy: 849.16, rot: 0 },
    node: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero/img22.png"
          alt=""
          style={{
            position: "absolute",
            height: "118.03%",
            width: "260%",
            left: "-81.74%",
            top: "-8.22%",
            maxWidth: "none",
          }}
        />
      </div>
    ),
  },
  {
    id: "img19",
    w: 51,
    h: 51,
    j: { cx: 659.5, cy: 454.5, rot: 0 },
    d: { cx: 837.5, cy: 700.5, rot: 0 },
    node: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero/img19.png"
          alt=""
          style={{
            position: "absolute",
            height: "162.44%",
            width: "161.81%",
            left: "-33.16%",
            top: "-26.68%",
            maxWidth: "none",
          }}
        />
      </div>
    ),
  },
  {
    id: "img24",
    w: 147.096,
    h: 183.805,
    j: { cx: 820.02, cy: 691.53, rot: 5.5 },
    d: { cx: 117.55, cy: 811.9, rot: 0 },
    node: (
      <img
        src="/hero/img24.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    ),
  },
  {
    id: "img1014",
    w: 98,
    h: 160,
    j: { cx: 721, cy: 815, rot: 0 },
    d: { cx: 486, cy: 817, rot: 0 },
    node: (
      <img
        src="/hero/img1014.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
    ),
  },
  {
    id: "img25",
    w: 124.48,
    h: 106.717,
    j: { cx: 356.29, cy: 660.9, rot: -28.51 },
    d: { cx: 1004.05, cy: 149.23, rot: -12.11 },
    node: (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/hero/img25.png"
          alt=""
          style={{
            position: "absolute",
            height: "163.07%",
            width: "139.8%",
            left: "-21.07%",
            top: "-29.91%",
            maxWidth: "none",
          }}
        />
      </div>
    ),
  },
  {
    id: "airdrop",
    w: 149,
    h: 168,
    j: { cx: 435.5, cy: 797.0, rot: -0.62 },
    d: { cx: 762.5, cy: 834, rot: 0 },
    node: (
      <>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 149,
            height: 168,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.15)",
          }}
        >
          <img
            src="/hero/airdrop_bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ borderRadius: 16 }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 32,
            width: 149,
            height: 117,
            overflow: "hidden",
          }}
        >
          <img
            src="/hero/airdrop_preview.png"
            alt=""
            style={{
              position: "absolute",
              height: "198.52%",
              width: "118.79%",
              left: "-1.34%",
              top: "-0.14%",
              maxWidth: "none",
            }}
          />
        </div>
        <p
          style={{
            position: "absolute",
            left: 76,
            top: 18.97,
            transform: "translateX(-50%)",
            fontSize: 6,
            fontWeight: 600,
            fontFamily: "var(--font-poppins)",
            color: "#050505", // AirDrop card is always white → keep text dark in both modes

            whiteSpace: "nowrap",
            margin: 0,
          }}
        >
          Saanvi would like to share her work
        </p>
      </>
    ),
  },
];

function FloatObject({
  mode,
  obj,
  index,
  reduced,
}: {
  mode: Mode;
  obj: HeroObject;
  index: number;
  reduced: boolean;
}) {
  const t = mode === "journal" ? obj.j : obj.d;
  const pos = {
    left: t.cx - obj.w / 2,
    top: t.cy - obj.h / 2,
    rotate: t.rot,
    scale: obj.scale ?? 1,
  };

  // Backdrop objects (notebook): just the position morph — no float, hover, or z-raise.
  if (obj.isStatic) {
    return (
      <motion.div
        className="absolute"
        style={{ width: obj.w, height: obj.h }}
        initial={false}
        animate={pos}
        transition={spring}
      >
        <div className="relative h-full w-full">{obj.node}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute hover:z-[60]"
      style={{ width: obj.w, height: obj.h }}
      initial={false}
      animate={pos}
      transition={spring}
    >
      <motion.div
        style={{ width: "100%", height: "100%" }}
        animate={reduced ? {} : { y: [0, -(6 + (index % 3) * 2), 0] }}
        transition={
          reduced
            ? undefined
            : {
                duration: 4 + (index % 5) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (index % 4) * 0.4,
              }
        }
      >
        <motion.div
          className="relative h-full w-full"
          whileHover={
            reduced
              ? undefined
              : obj.gentleHover
                ? { y: -8 }
                : { scale: 1.06, y: -6 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          {obj.node}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const TOGGLE_TIP =
  "pointer-events-none absolute left-1/2 top-full z-[80] mt-3 -translate-x-1/2 whitespace-nowrap rounded-lg bg-tip px-3 py-1.5 text-sm text-tip-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100";
const TOGGLE_BTN =
  "relative cursor-pointer overflow-hidden transition-shadow duration-200 hover:shadow-[0_6px_18px_rgba(0,0,0,0.14)]";

function Toggle({
  isJournal,
  setMode,
  compact = false,
}: {
  isJournal: boolean;
  setMode: (m: Mode) => void;
  compact?: boolean;
}) {
  const sz = compact ? 48 : 60;
  const radius = compact ? 10 : 12;
  const book = compact
    ? { h: 74.133, w: 111.2, left: -31.2, top: -10.67 }
    : { h: 92.667, w: 139, left: -39, top: -13.33 };
  const desk = compact
    ? { h: 81.333, w: 122, left: -37.6, top: -20 }
    : { h: 101.667, w: 152.5, left: -46, top: -21 };

  return (
    <div className="flex items-center justify-center" style={{ gap: 10 }}>
      <div className="group relative">
        <button
          type="button"
          onClick={() => setMode("journal")}
          aria-label="Journal mode"
          aria-pressed={isJournal}
          className={TOGGLE_BTN}
          style={{
            width: sz,
            height: sz,
            borderRadius: radius,
            background: isJournal ? "var(--chip)" : "var(--card)",
            border: isJournal ? "none" : "1px solid var(--edge)",
          }}
        >
          <img
            src="/hero/book.png"
            alt=""
            className="dark:brightness-0 dark:invert"
            style={{
              position: "absolute",
              height: book.h,
              width: book.w,
              left: book.left,
              top: book.top,
              maxWidth: "none",
              opacity: isJournal ? 1 : 0.75,
            }}
          />
        </button>
        <span className={TOGGLE_TIP} style={{ fontFamily: "var(--font-geist-mono)" }}>
          journal mode
        </span>
      </div>

      <div className="group relative">
        <button
          type="button"
          onClick={() => setMode("desk")}
          aria-label="Desk mode"
          aria-pressed={!isJournal}
          className={TOGGLE_BTN}
          style={{
            width: sz,
            height: sz,
            borderRadius: radius,
            background: !isJournal ? "var(--chip)" : "var(--card)",
            border: !isJournal ? "none" : "1px solid var(--edge)",
          }}
        >
          <img
            src="/hero/desk.png"
            alt=""
            className="dark:brightness-0 dark:invert"
            style={{
              position: "absolute",
              height: desk.h,
              width: desk.w,
              left: desk.left,
              top: desk.top,
              maxWidth: "none",
              opacity: !isJournal ? 1 : 0.75,
            }}
          />
        </button>
        <span className={TOGGLE_TIP} style={{ fontFamily: "var(--font-geist-mono)" }}>
          desk mode
        </span>
      </div>
    </div>
  );
}

/* ---- Mobile hero (faithful port of Figma 610:4620 journal + 610:4685 desk) ---- */
const M_STAGE_W = 390;
const M_STAGE_H = 860;

function mobileObj(
  id: string,
  scale: number,
  j: Pose,
  d: Pose,
): HeroObject {
  const base = objects.find((o) => o.id === id)!;
  return { ...base, scale, j, d };
}

// Full object set, per-object scale (mobileW/desktopW) + journal/desk centers from Figma.
// Centers re-synced to the updated frames (610:4620 journal · 610:4685 desk).
const mobileObjects: HeroObject[] = [
  mobileObj("notebook", 0.888, { cx: 331.73, cy: 570.87, rot: -1.98 }, { cx: 350.34, cy: 631.89, rot: 0 }),
  mobileObj("polaroid1", 0.75, { cx: 79.86, cy: 410.45, rot: -5.48 }, { cx: 70.88, cy: 151.63, rot: 0 }),
  mobileObj("polaroid2", 0.75, { cx: 190.45, cy: 437.59, rot: 1.69 }, { cx: 209.88, cy: 150.63, rot: 0 }),
  mobileObj("lamp", 0.574, { cx: 355.72, cy: 306.6, rot: 2.14 }, { cx: 332.62, cy: 156.29, rot: 0 }),
  mobileObj("img21", 0.695, { cx: 293.85, cy: 404.74, rot: 0.66 }, { cx: 325.19, cy: 280.19, rot: 0 }),
  mobileObj("img19", 0.61, { cx: 351.56, cy: 452.5, rot: 0 }, { cx: 294.56, cy: 182.5, rot: 0 }),
  mobileObj("img16", 0.979, { cx: 71.96, cy: 742.95, rot: 5.44 }, { cx: 50.46, cy: 281.05, rot: 0 }),
  mobileObj("img25", 1.118, { cx: 66.49, cy: 576.89, rot: -31.3 }, { cx: 207.0, cy: 677.15, rot: -12.73 }),
  mobileObj("img23", 0.778, { cx: 306.29, cy: 542.96, rot: -8.6 }, { cx: 274.8, cy: 522.5, rot: -5.56 }),
  mobileObj("airdrop", 0.973, { cx: 107.37, cy: 637.07, rot: -0.62 }, { cx: 81.49, cy: 513.73, rot: 0 }),
  mobileObj("img24", 0.73, { cx: 265.71, cy: 635.89, rot: 5.5 }, { cx: 74.66, cy: 706.05, rot: 0 }),
  mobileObj("img18", 0.565, { cx: 261.64, cy: 754.66, rot: -0.36 }, { cx: 229.64, cy: 760.66, rot: -0.36 }),
  mobileObj("img22", 1.0, { cx: 353.32, cy: 658.54, rot: 0.78 }, { cx: 332.5, cy: 683.16, rot: 0 }),
];

function MobileHero({
  mode,
  setMode,
  reduced,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  reduced: boolean;
}) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / M_STAGE_W));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const isJournal = mode === "journal";

  return (
    <section
      id="home"
      className="relative flex w-full justify-center overflow-hidden bg-paper"
    >
      <div style={{ width: M_STAGE_W * scale, height: M_STAGE_H * scale }}>
        <div
          style={{
            width: M_STAGE_W,
            height: M_STAGE_H,
            position: "relative",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {mobileObjects.map((obj, i) => (
            <FloatObject key={obj.id} obj={obj} index={i} mode={mode} reduced={reduced} />
          ))}

          {/* Title — morphs from top (journal) to middle (desk) */}
          <motion.div
            className="absolute left-0 right-0 z-40 flex flex-col items-center px-5 text-center"
            initial={false}
            animate={{ top: isJournal ? 80 : 299 }}
            transition={spring}
          >
            <span
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: 16,
                letterSpacing: "1.28px",
                color: "var(--ink)",
              }}
            >
              WELCOME TO
            </span>
            <h1
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 600,
                fontSize: 40,
                lineHeight: "normal",
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              Saanvi&rsquo;s Portfolio
            </h1>
            <div style={{ width: 362, paddingTop: 4 }}>
              <p
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: 13,
                  letterSpacing: "0.26px",
                  color: "var(--ink)",
                  lineHeight: "normal",
                  margin: 0,
                }}
              >
                From messy first ideas to clean, polished products.
              </p>
            </div>
          </motion.div>

          {/* Toggle — fixed, compact (48px) */}
          <div
            className="absolute left-1/2 z-[45] -translate-x-1/2"
            style={{ top: 216 }}
          >
            <Toggle isJournal={isJournal} setMode={setMode} compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [mode, setMode] = useState<Mode>("journal");
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const update = () => setScale(Math.min(1, window.innerWidth / STAGE_W));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isJournal = mode === "journal";

  if (isMobile) {
    return <MobileHero mode={mode} setMode={setMode} reduced={reduced} />;
  }

  return (
    <section
      id="home"
      className="relative flex w-full items-center justify-center overflow-hidden bg-paper"
      style={{ minHeight: "100vh" }}
    >
      <div style={{ width: STAGE_W * scale, height: STAGE_H * scale }}>
        <div
          style={{
            width: STAGE_W,
            height: STAGE_H,
            position: "relative",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {objects.map((obj, i) => (
            <FloatObject
              key={obj.id}
              obj={obj}
              index={i}
              mode={mode}
              reduced={reduced}
            />
          ))}

          {/* Title block — animate via x/y transforms on a motion.div whose own
              className/style stay CONSTANT (the alignment swap lives on an inner
              div), so toggling never interrupts Framer's spring. */}
          <motion.div
            className="absolute z-40"
            style={{ width: 839 }}
            initial={false}
            animate={{ left: isJournal ? 220.5 : 32, top: isJournal ? 120 : 483 }}
            transition={spring}
          >
          <div
            className={`flex flex-col ${
              isJournal ? "items-center text-center" : "items-start text-left"
            }`}
          >

            <span
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: 20,
                letterSpacing: "1.6px",
                color: "var(--ink)",
                marginBottom: -12,
                whiteSpace: "nowrap",
              }}
            >
              WELCOME TO
            </span>
            <h1
              style={{
                fontFamily: "var(--font-bricolage)",
                fontWeight: 600,
                fontSize: 100,
                lineHeight: "normal",
                color: "var(--ink)",
                marginBottom: -12,
                whiteSpace: "nowrap",
              }}
            >
              Saanvi&rsquo;s Portfolio
            </h1>
            <div style={{ width: 632, paddingTop: 4 }}>
              <p
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: 20,
                  letterSpacing: "0.4px",
                  color: "var(--ink)",
                  lineHeight: "normal",
                  margin: 0,
                }}
              >
                She is a Senior Product Designer with 4 years of experience.
              </p>
            </div>
          </div>
          </motion.div>

          {/* Journal / Desk toggle (fixed across both states) */}
          <div className="absolute z-[45]" style={{ left: 575, top: 298 }}>
            <div style={{ paddingTop: 24 }}>
              <Toggle isJournal={isJournal} setMode={setMode} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
