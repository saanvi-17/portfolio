"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const poppins = { fontFamily: "var(--font-poppins)" };
const bricolage = { fontFamily: "var(--font-bricolage)", fontWeight: 600 };
const HAIRLINE = "bg-hair";

type Position = { role: string; period: string };

type Role = {
  period: string;
  company: string;
  role: string;
  /** Multiple positions at one company (LinkedIn-style progression). */
  positions?: Position[];
  blurb: string;
  skills: string[];
  current?: boolean;
};

// Real roles from Saanvi's resume / LinkedIn.
const experience: Role[] = [
  {
    period: "Oct 2024 — Present",
    company: "Be Bodywise (Mosaic Wellness)",
    role: "Product Designer",
    positions: [
      { role: "Senior Product Designer", period: "Jun 2026 — Present · 1 mo" },
      { role: "Product Designer", period: "Oct 2024 — Jun 2026 · 1 yr 9 mos" },
    ],
    blurb:
      "Own end-to-end design for Be Bodywise — UX and visual work that lifts conversion and brand consistency, plus cross-brand experiments for Little Joys.",
    skills: ["Product Design", "User Research", "Webflow"],
    current: true,
  },
  {
    period: "Jun 2022 — Sep 2024",
    company: "Auzmor",
    role: "Product Designer",
    blurb:
      "Led design for Auzmor Office, Learn (LXP) and Freshflows — building B2B SaaS products from scratch.",
    skills: ["Product Design", "B2B SaaS", "Prototyping"],
  },
  {
    period: "Aug 2021 — May 2022",
    company: "Sopra Steria",
    role: "Software Engineer",
    blurb:
      "ETL developer (Talend DI/ESB) — optimized jobs and routes for reliable, performant data integration.",
    skills: ["ETL", "Talend", "Optimization"],
  },
];

function Skill({ label }: { label: string }) {
  return (
    <span
      className="rounded-full bg-chip px-2 py-1 text-[13px] text-ink lg:text-[14px]"
      style={{ fontFamily: "var(--font-poppins)", fontWeight: 500 }}
    >
      {label}
    </span>
  );
}

function Polaroid({
  src,
  alt,
  rotate,
  aspect,
  objectPos = "center",
  z,
  rect,
  floatDur,
  onShow,
  onHide,
  onToggle,
}: {
  src: string;
  alt: string;
  rotate: number;
  aspect: string;
  objectPos?: string;
  z: string;
  rect: { left: string; top: string; width: string };
  floatDur: number;
  onShow: () => void;
  onHide: () => void;
  onToggle: () => void;
}) {
  return (
    <div
      className={`absolute cursor-pointer ${z}`}
      style={{ ...rect, animation: `expFloat ${floatDur}s ease-in-out infinite` }}
      onMouseEnter={onShow}
      onMouseLeave={onHide}
      onClick={onToggle}
    >
      {/* Polaroid — gentle idle float on the wrapper; no hover lift / z-raise. */}
      <div
        className="bg-white p-[6%] pb-[18%] shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <img
          src={src}
          alt={alt}
          className="block w-full object-cover"
          style={{ aspectRatio: aspect, objectPosition: objectPos }}
        />
      </div>
    </div>
  );
}

function Caption({
  show,
  style,
  children,
}: {
  show: boolean;
  style: { left: string; top: string };
  children: string;
}) {
  return (
    <span
      className={`pointer-events-none absolute z-[60] -translate-x-1/2 whitespace-nowrap rounded-md bg-tip px-2.5 py-1 text-[12px] font-medium text-tip-ink shadow-md transition-opacity duration-200 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      style={style}
    >
      {children}
    </span>
  );
}

function Scrapbook() {
  const [shown, setShown] = useState<"team" | "desk" | null>(null);
  const toggle = (id: "team" | "desk") =>
    setShown((cur) => (cur === id ? null : id));

  return (
    <div
      className="relative mx-auto w-full max-w-[420px]"
      style={{ aspectRatio: "481 / 696" }}
    >
      <Polaroid
        src="/experience/team.jpg"
        alt="Saanvi with the Mosaic design team"
        rotate={-6.59}
        aspect="4 / 5"
        z="z-10"
        rect={{ left: "3%", top: "15%", width: "63%" }}
        floatDur={5}
        onShow={() => setShown("team")}
        onHide={() => setShown(null)}
        onToggle={() => toggle("team")}
      />
      <Polaroid
        src="/experience/desk.jpg"
        alt="Saanvi's work desk and pinboard"
        rotate={5.86}
        aspect="4 / 5"
        objectPos="center bottom"
        z="z-20"
        rect={{ left: "32%", top: "47%", width: "61%" }}
        floatDur={6.4}
        onShow={() => setShown("desk")}
        onHide={() => setShown(null)}
        onToggle={() => toggle("desk")}
      />
      {/* Safety pin — static, placed high so it clears the faces. */}
      <img
        src="/experience/safety-pin.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute z-30"
        style={{ left: "26%", top: "1%", width: "56.4%" }}
      />
      {/* Captions sit above everything (z-60); Mosaic at the top, desk at the bottom. */}
      <Caption show={shown === "team"} style={{ left: "32%", top: "13%" }}>
        Mosaic design fam
      </Caption>
      <Caption show={shown === "desk"} style={{ left: "60%", top: "84%" }}>
        My work desk
      </Caption>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-24 lg:py-28">
        <div className="lg:grid lg:grid-cols-[1fr_440px] lg:items-start lg:gap-x-12 lg:gap-y-10">
          {/* Heading */}
          <h2
            className="text-center text-[40px] leading-none sm:text-[52px] lg:col-start-1 lg:row-start-1 lg:text-left lg:text-[60px]"
            style={bricolage}
          >
            Work Experience
          </h2>

          {/* Timeline */}
          <ol className="mt-10 flex flex-col gap-12 lg:col-start-1 lg:row-start-2 lg:mt-0">
              {experience.map((r, i) => (
                <li key={r.company + r.period} className="flex gap-4">
                  {/* Timeline spine + node */}
                  <div className="relative flex w-3.5 shrink-0 justify-center">
                    <span
                      aria-hidden
                      className={`relative z-10 mt-[7px] size-3.5 rounded-full ${
                        r.current ? "bg-faint" : "bg-edge"
                      }`}
                    />
                    {i < experience.length - 1 && (
                      <span
                        aria-hidden
                        className={`absolute left-1/2 top-[7px] -bottom-12 w-px -translate-x-1/2 ${HAIRLINE}`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="whitespace-nowrap text-[14px] uppercase tracking-[1.2px] text-eyebrow lg:text-[20px] lg:tracking-[1.6px]"
                        style={poppins}
                      >
                        {r.period}
                      </span>
                      <span className={`h-px flex-1 ${HAIRLINE}`} />
                    </div>

                    <h3
                      className="mt-1.5 text-[18px] leading-snug text-ink lg:text-[20px]"
                      style={{ fontFamily: "var(--font-poppins)", fontWeight: 600 }}
                    >
                      {r.company}
                    </h3>
                    {r.positions ? (
                      <div className="mt-1.5 flex flex-col gap-1.5">
                        {r.positions.map((pos, pi) => (
                          <div key={pos.role} className="flex items-baseline gap-2">
                            <span
                              aria-hidden
                              className={`mt-1 size-1.5 shrink-0 self-start rounded-full ${
                                pi === 0 ? "bg-faint" : "bg-edge"
                              }`}
                            />
                            <div>
                              <p
                                className="text-[14px] text-ink lg:text-[15px]"
                                style={{ fontFamily: "var(--font-poppins)", fontWeight: 600 }}
                              >
                                {pos.role}
                              </p>
                              <p
                                className="text-[12px] text-soft2 lg:text-[13px]"
                                style={poppins}
                              >
                                {pos.period}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p
                        className="mt-0.5 text-[13px] text-soft2 lg:text-[14px]"
                        style={poppins}
                      >
                        {r.role}
                      </p>
                    )}

                    <p
                      className="mt-2.5 max-w-[520px] text-[14px] leading-normal tracking-[0.32px] text-soft lg:text-[16px]"
                      style={poppins}
                    >
                      {r.blurb}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {r.skills.map((s) => (
                        <Skill key={s} label={s} />
                      ))}
                    </div>
                  </div>
                </li>
              ))}
          </ol>

          {/* Scrapbook cluster — mobile: below the list; desktop: right column */}
          <Reveal
            direction="left"
            className="mt-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:pt-2"
          >
            <Scrapbook />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
