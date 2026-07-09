import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, projects, type Block, type Media } from "@/lib/projects";
import Reveal from "@/components/ui/Reveal";

const poppins = { fontFamily: "var(--font-poppins)" };
const bricolage = { fontFamily: "var(--font-bricolage)", fontWeight: 600 };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project ? `${project.title} — Saanvi Jain` : "Case study",
    description: project?.blurb,
  };
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const cs = project.caseStudy;

  return (
    <article className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          href="/#work"
          className="text-[14px] text-soft transition-colors hover:text-ink"
          style={poppins}
        >
          ← Back to work
        </Link>

        <Reveal className="mt-8">
          <p
            className="text-[13px] uppercase tracking-[1.2px] text-eyebrow"
            style={poppins}
          >
            {project.year} · {project.role}
          </p>
          <h1
            className="mt-3 text-[40px] leading-[1.1] sm:text-[56px]"
            style={bricolage}
          >
            {project.title}
          </h1>
          <p
            className="mt-4 max-w-prose text-[16px] leading-[1.7] tracking-[0.32px] text-soft sm:text-[18px]"
            style={poppins}
          >
            {project.blurb}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-chip px-2.5 py-1 text-[13px] text-ink"
                style={{ ...poppins, fontWeight: 500 }}
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap gap-x-12 gap-y-4">
          {project.stats.map((s) => (
            <div key={s.label}>
              <p className="text-[32px] leading-none sm:text-[40px]" style={bricolage}>
                {s.value}
              </p>
              <p className="mt-1.5 text-[13px] text-soft" style={poppins}>
                {s.label}
              </p>
            </div>
          ))}
        </Reveal>

        {/* Cover — real image if present, else the tinted accent block. */}
        <Reveal className="mt-10">
          {cs.cover ? (
            <figure className="overflow-hidden rounded-[20px] border border-edge">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cs.cover} alt={project.title} className="w-full" />
            </figure>
          ) : (
            <div
              className={`aspect-[16/9] w-full rounded-[20px] border border-edge ${project.accent}`}
            />
          )}
        </Reveal>

        {cs.story ? (
          <div className="mt-14">
            {cs.story.map((block, i) => (
              <StoryBlock key={i} block={block} />
            ))}
          </div>
        ) : (
          <div className="mt-14 space-y-12">
            <Section title="Overview">{cs.overview}</Section>
            <Section title="The problem">{cs.problem}</Section>
            <Reveal>
              <Eyebrow>Process</Eyebrow>
              <ol className="mt-4 space-y-3">
                {cs.process.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-4 text-[16px] leading-[1.7] text-ink sm:text-[18px]"
                    style={poppins}
                  >
                    <span className="text-[20px] leading-[1.4] text-faint" style={bricolage}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Section title="Outcome">{cs.outcome}</Section>
          </div>
        )}

        {cs.links && (
          <Reveal className="mt-12 flex flex-wrap gap-3">
            {cs.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-edge px-4 py-2 text-[14px] font-medium text-ink transition-colors hover:bg-chip-hover"
                style={poppins}
              >
                {l.label}
              </a>
            ))}
          </Reveal>
        )}

        <div className="mt-16 border-t border-hair pt-8">
          <Link
            href="/#work"
            className="text-[15px] font-medium text-ink hover:underline"
            style={poppins}
          >
            ← See more work
          </Link>
        </div>
      </div>
    </article>
  );
}

function StoryBlock({ block }: { block: Block }) {
  if ("h" in block) {
    return (
      <Reveal>
        <h2
          className="mt-14 text-[24px] leading-tight sm:text-[30px]"
          style={bricolage}
        >
          {block.h}
        </h2>
      </Reveal>
    );
  }
  if ("sub" in block) {
    return (
      <h3
        className="mt-9 text-[18px] text-ink sm:text-[20px]"
        style={{ ...poppins, fontWeight: 600 }}
      >
        {block.sub}
      </h3>
    );
  }
  if ("p" in block) {
    return (
      <p
        className="mt-4 text-[16px] leading-[1.7] text-ink sm:text-[17px]"
        style={poppins}
      >
        {block.p}
      </p>
    );
  }
  if ("lead" in block) {
    return (
      <Reveal>
        <p
          className="mt-6 text-center text-[15px] leading-[1.6] tracking-[0.3px] text-soft sm:text-[16px]"
          style={{ ...poppins, fontWeight: 500 }}
        >
          {block.lead}
        </p>
      </Reveal>
    );
  }
  if ("quote" in block) {
    return (
      <blockquote
        className="mt-5 border-l-2 border-edge pl-4 text-[17px] leading-[1.6] text-ink sm:text-[19px]"
        style={{ ...poppins, fontWeight: 500 }}
      >
        {block.quote}
      </blockquote>
    );
  }
  if ("list" in block) {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.list.map((it) => (
          <li
            key={it}
            className="flex gap-3 text-[16px] leading-[1.6] text-ink sm:text-[17px]"
            style={poppins}
          >
            <span className="mt-[10px] size-1.5 shrink-0 rounded-full bg-faint" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );
  }
  if ("meta" in block) {
    return (
      <dl className="flex flex-wrap gap-x-10 gap-y-3">
        {block.meta.map((m) => (
          <div key={m.k}>
            <dt
              className="text-[12px] uppercase tracking-[1px] text-faint"
              style={poppins}
            >
              {m.k}
            </dt>
            <dd className="mt-0.5 text-[15px] text-ink" style={poppins}>
              {m.v}
            </dd>
          </div>
        ))}
      </dl>
    );
  }
  if ("video" in block) {
    return (
      <Reveal className="mt-8">
        <MediaEl m={{ src: block.video, video: true, frame: block.frame }} poster={block.poster} />
        {block.cap && <Caption>{block.cap}</Caption>}
      </Reveal>
    );
  }
  if ("group" in block) {
    return (
      <Reveal className="mt-8">
        <div className="rounded-[20px] bg-chip p-5 sm:p-7">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-stretch sm:justify-center sm:gap-5">
            {block.group.map((m, i) => (
              <div key={i} className="w-full max-w-[280px] sm:flex-1">
                <MediaEl m={m} />
              </div>
            ))}
          </div>
        </div>
        {block.cap && <Caption>{block.cap}</Caption>}
      </Reveal>
    );
  }
  // image
  return (
    <Reveal className="mt-8">
      <MediaEl m={{ src: block.img, frame: block.frame }} alt={block.cap} />
      {block.cap && <Caption>{block.cap}</Caption>}
    </Reveal>
  );
}

/** A single image or video, optionally wrapped in a soft phone bezel. */
function MediaEl({
  m,
  alt,
  poster,
}: {
  m: Media;
  alt?: string;
  poster?: string;
}) {
  const inner = m.video ? (
    <video
      src={m.src}
      poster={poster}
      className="block w-full"
      autoPlay
      muted
      loop
      playsInline
    />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={m.src} alt={alt ?? ""} className="block w-full" loading="lazy" />
  );

  if (m.frame === "phone") {
    return (
      <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[34px] border-[7px] border-[#0e0e10] bg-[#0e0e10] shadow-[0_18px_44px_rgba(0,0,0,0.20)]">
        <div className="overflow-hidden rounded-[27px] bg-white">{inner}</div>
      </div>
    );
  }
  return (
    <figure className="overflow-hidden rounded-[16px] border border-edge">
      {inner}
    </figure>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption
      className="mt-2 text-center text-[13px] text-faint"
      style={poppins}
    >
      {children}
    </figcaption>
  );
}


function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[13px] uppercase tracking-[1.2px] text-eyebrow"
      style={poppins}
    >
      {children}
    </h2>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <Eyebrow>{title}</Eyebrow>
      <p
        className="mt-4 text-[16px] leading-[1.7] text-ink sm:text-[18px]"
        style={poppins}
      >
        {children}
      </p>
    </Reveal>
  );
}
