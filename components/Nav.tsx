"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", target: "#home" },
  { label: "Work", target: "#work" },
  { label: "Experience", target: "#experience" },
  { label: "Get in Touch", target: "#contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);
  const lockRef = useRef(false);

  // Scroll-spy: highlight whichever nav section sits in the middle of the viewport.
  // Only runs on the home page (re-runs on route change so it re-binds the fresh
  // sections after client-side navigation back home).
  useEffect(() => {
    if (!onHome) return;
    const byId: Record<string, string> = Object.fromEntries(
      links.map((l) => [l.target.slice(1), l.label]),
    );
    const sections = links
      .map((l) => document.querySelector(l.target))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockRef.current) return; // ignore while a click-scroll is in flight
        for (const e of entries) {
          if (e.isIntersecting && byId[e.target.id]) setActive(byId[e.target.id]);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome]);

  function go(label: string, target: string) {
    setActive(label);
    setOpen(false);
    // On a sub-page (e.g. a case study) the section anchors live on the home
    // page — navigate there with the hash so it lands on the right section.
    if (!onHome) {
      window.location.href = `/${target}`;
      return;
    }
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, 900);
    const el = document.querySelector(target);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el as HTMLElement, { offset: -20 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {/* Desktop: pill nav */}
      <nav
        className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 sm:block"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <div className="flex items-center gap-3 rounded-xl border border-edge bg-card p-2">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={() => go(l.label, l.target)}
              className={`cursor-pointer whitespace-nowrap rounded-lg px-3 py-2 text-[20px] leading-normal tracking-[0.4px] text-ink transition-colors ${
                onHome && active === l.label ? "bg-chip" : "hover:bg-chip-hover"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile: hamburger + dropdown */}
      <nav
        className="fixed right-3.5 top-[34px] z-50 sm:hidden"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
          className="flex size-[52px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[14px] border border-edge bg-card"
        >
          <span className="block h-[2px] w-5 rounded-full bg-ink" />
          <span className="block h-[2px] w-5 rounded-full bg-ink" />
          <span className="block h-[2px] w-5 rounded-full bg-ink" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 flex w-44 flex-col gap-1 rounded-2xl border border-edge bg-card p-2 shadow-lg">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.label, l.target)}
                className={`cursor-pointer rounded-xl px-3 py-2 text-left text-[15px] leading-none text-ink transition-colors ${
                  onHome && active === l.label ? "bg-chip" : "hover:bg-chip-hover"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
