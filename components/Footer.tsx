import MagneticButton from "@/components/ui/MagneticButton";

const socials = [
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Resume", href: "#" },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-foreground px-6 py-20 text-background"
    >
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-widest text-background/60">
          Let&apos;s talk
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
          Got an idea? <br />
          Let&apos;s make it delightful.
        </h2>

        <div className="mt-10 flex flex-wrap gap-3">
          {socials.map((s) => (
            <MagneticButton
              key={s.label}
              href={s.href}
              className="inline-block rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-background hover:text-foreground"
            >
              {s.label}
            </MagneticButton>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-background/15 pt-6 text-sm text-background/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Saanvi Jain</span>
          <span>Designed &amp; built with care · Placeholder content</span>
        </div>
      </div>
    </footer>
  );
}
