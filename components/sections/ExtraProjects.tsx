import Link from "next/link";
import Reveal, { RevealItem } from "@/components/ui/Reveal";

const poppins = { fontFamily: "var(--font-poppins)" };
const bricolage = { fontFamily: "var(--font-bricolage)", fontWeight: 600 };

// Lightweight explorations — kept separate from the main Work case studies.
// TODO(Saanvi): swap the faux phone screens for real screenshots (add `screen`
// image paths) and link each card to a write-up if/when they exist.
type Side = {
  title: string;
  desc: string;
  tags: string[];
  accent: string; // card background
  tint: string; // phone-screen accent
  href?: string; // optional link to a full case study
};

const sideProjects: Side[] = [
  {
    title: "UN Time Odyssey — booking travel through time",
    desc: "A conceptual time-travel booking app with holographic memories and smartwatch sync.",
    tags: ["Concept", "Self-initiated"],
    accent: "var(--sp-card-sand)",
    tint: "#e6d8c6",
    href: "/work/time-odyssey",
  },
  {
    title: "WhatsApp Business — redesign",
    desc: "Rethinking catalog browsing and checkout for small sellers.",
    tags: ["Mobile", "Concept"],
    accent: "var(--sp-card-green)",
    tint: "#cfe0d4",
  },
  {
    title: "Shopify — storefront revamp",
    desc: "A cleaner, faster product-to-cart flow.",
    tags: ["E-commerce", "Web"],
    accent: "var(--sp-card-sand)",
    tint: "#e6d8c6",
  },
  {
    title: "App autopsy — Paytm",
    desc: "Breaking down what works and what quietly gets in the way.",
    tags: ["Teardown"],
    accent: "var(--sp-card-blue)",
    tint: "#d6dcec",
  },
];

function PhoneMock({ tint }: { tint: string }) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-1/2 w-[190px] -translate-x-1/2 translate-y-[30%] transition-transform duration-500 ease-out group-hover:translate-y-[12%]">
      <div className="rounded-t-[28px] bg-[#141414] p-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.18)]">
        <div className="overflow-hidden rounded-t-[20px] bg-white" style={{ height: 300 }}>
          <div className="flex items-center justify-between px-4 pb-1 pt-2 text-[8px] font-medium text-[#9a9a9a]">
            <span>9:41</span>
            <span>●●●</span>
          </div>
          <div className="px-4 pt-1">
            <div
              className="h-3 w-20 rounded-full"
              style={{ backgroundColor: tint }}
            />
          </div>
          <div
            className="mx-4 mt-3 h-24 rounded-xl"
            style={{ backgroundColor: tint }}
          />
          <div className="mx-4 mt-3 space-y-2">
            <div className="h-2.5 w-full rounded-full bg-[#ededed]" />
            <div className="h-2.5 w-2/3 rounded-full bg-[#ededed]" />
          </div>
          <div className="mx-4 mt-3 h-16 rounded-xl bg-[#f4f4f4]" />
          <div className="mt-4 flex justify-around border-t border-[#f1f1f1] pt-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="size-4 rounded-full"
                style={{ backgroundColor: i === 0 ? tint : "#e8e8e8" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExtraProjects() {
  return (
    <section id="side-projects" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1100px] px-6 py-20 sm:py-24 lg:py-28">
        <Reveal>
          <h2
            className="text-center text-[40px] leading-none sm:text-[52px] lg:text-left lg:text-[60px]"
            style={bricolage}
          >
            Side Projects
          </h2>
          <p
            className="mt-4 text-center text-[16px] leading-[1.7] text-soft sm:text-[18px] lg:text-left"
            style={poppins}
          >
            Quick redesigns, concepts, and app teardowns I do on the side.
          </p>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sideProjects.map((p) => {
            const card = (
              <article
                className="group relative flex h-[460px] flex-col overflow-hidden rounded-[24px] border border-hair"
                style={{ backgroundColor: p.accent }}
              >
                <div className="relative z-10 p-7">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-card px-2.5 py-1 text-[12px] text-eyebrow"
                        style={{ ...poppins, fontWeight: 500 }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="text-[20px] leading-snug text-ink"
                    style={{ ...poppins, fontWeight: 600 }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[240px] text-[14px] leading-normal text-soft"
                    style={poppins}
                  >
                    {p.desc}
                  </p>
                </div>
                <PhoneMock tint={p.tint} />
              </article>
            );

            return (
              <RevealItem key={p.title}>
                {p.href ? (
                  <Link href={p.href} aria-label={`View ${p.title}`} className="block">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </RevealItem>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
