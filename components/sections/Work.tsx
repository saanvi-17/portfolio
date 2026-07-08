"use client";

import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import DeviceShot from "@/components/ui/DeviceShot";
import { projects, type Project } from "@/lib/projects";

const poppins = { fontFamily: "var(--font-poppins)" };
const bricolage = { fontFamily: "var(--font-bricolage)", fontWeight: 600 };
// Very subtle in-card hairline (the previous tone read too bright).
const HAIRLINE = "bg-hair";

function TagPill({ tags }: { tags: string[] }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-chip px-2 py-1 text-[12px] text-ink"
      style={{ fontFamily: "var(--font-poppins)", fontWeight: 500 }}
    >
      {tags.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span className="size-[3px] shrink-0 rounded-full bg-faint" />
          )}
          {t}
        </span>
      ))}
    </span>
  );
}

function ProjectCard({ p, reversed }: { p: Project; reversed: boolean }) {
  return (
    <article
      className={`grid gap-2 lg:h-[500px] lg:items-stretch lg:gap-6 ${
        reversed
          ? "lg:grid-cols-[minmax(0,1fr)_340px]"
          : "lg:grid-cols-[340px_minmax(0,1fr)]"
      }`}
    >
      {/* Info card (fixed 340px on desktop) */}
      <div
        className={`flex flex-col gap-3 rounded-lg border border-edge bg-card px-3 py-4 lg:gap-6 lg:rounded-[20px] lg:px-5 lg:py-8 ${
          reversed ? "lg:order-last" : ""
        }`}
      >
        <div className="flex flex-col items-start gap-2.5">
          {/* Eyebrow + rule */}
          <div className="flex w-full items-center gap-2.5">
            <span
              className="whitespace-nowrap text-[12px] tracking-[0.96px] text-eyebrow"
              style={poppins}
            >
              {p.eyebrow}
            </span>
            <span className={`h-px flex-1 ${HAIRLINE}`} />
          </div>

          <h3
            className="text-[20px] leading-[1.2] text-ink lg:text-[26px]"
            style={bricolage}
          >
            {p.title}
          </h3>

          <p
            className="text-[14px] leading-normal tracking-[0.28px] text-soft lg:text-[15px]"
            style={poppins}
          >
            {p.blurb}
          </p>

          <TagPill tags={p.tags} />
        </div>

        {/* Stats anchored to the bottom of the card */}
        <div className="mt-auto flex flex-col gap-3 pt-2 lg:gap-6">
          <span className={`h-px w-full ${HAIRLINE}`} />
          <div className="flex gap-5 text-center">
            {p.stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <span
                  className="text-[24px] leading-[1.2] text-ink lg:text-[34px]"
                  style={bricolage}
                >
                  {s.value}
                </span>
                <span
                  className="text-[12px] tracking-[0.24px] text-soft lg:text-[13px]"
                  style={poppins}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail + CTA */}
      <div className="flex flex-col gap-2 lg:gap-6">
        <Link
          href={`/work/${p.slug}`}
          aria-label={`View ${p.title}`}
          className={`group relative block h-[400px] overflow-hidden rounded-lg border border-edge sm:h-[460px] lg:h-auto lg:min-h-0 lg:flex-1 lg:rounded-[20px] ${p.accent}`}
        >
          {p.shot && p.device ? (
            <span className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <DeviceShot src={p.shot} device={p.device} title={p.title} />
            </span>
          ) : p.thumb ? (
            <span className="absolute inset-0 flex items-center justify-center p-5 sm:p-7 lg:p-10">
              <img
                src={p.thumb}
                alt=""
                className="max-h-full max-w-full rounded-lg object-contain shadow-[0_12px_34px_rgba(0,0,0,0.14)] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </span>
          ) : null}
        </Link>
        <Link
          href={`/work/${p.slug}`}
          className="group flex items-center justify-center rounded-lg border border-edge bg-card py-4 text-[16px] tracking-[0.32px] text-ink transition-colors hover:bg-chip-hover lg:rounded-[20px] lg:py-5"
          style={{ fontFamily: "var(--font-poppins)", fontWeight: 500 }}
        >
          View Project
          <span className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1040px] px-6 py-20 sm:py-24 lg:py-28">
        <Reveal>
          <h2
            className="text-center text-[40px] leading-none sm:text-[52px] lg:text-[60px]"
            style={bricolage}
          >
            Selected Work
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-10 lg:mt-20 lg:gap-20">
          {projects
            .filter((p) => !p.side)
            .map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProjectCard p={p} reversed={i % 2 === 1} />
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
