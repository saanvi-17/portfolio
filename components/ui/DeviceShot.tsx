"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * A full-length screenshot inside a device frame (phone or browser). The shot
 * pans top → bottom, tied to the card's scroll progress through the viewport.
 * On desktop the frame is also a native scroll container, so the visitor can
 * scroll it by hand; on mobile it's auto-only (no scroll-hijacking). Frozen to
 * the top under prefers-reduced-motion (desktop stays manually scrollable).
 */
export default function DeviceShot({
  src,
  device,
  title,
}: {
  src: string;
  device: "phone" | "browser";
  title?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const vp = viewportRef.current;
      const img = imgRef.current;
      if (!vp || !img) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.registerPlugin(ScrollTrigger);
      const onLoad = () => ScrollTrigger.refresh();
      if (!img.complete) img.addEventListener("load", onLoad, { once: true });

      // Pan via the container's scrollTop on ALL breakpoints. Programmatic
      // scrollTop works on overflow:hidden too, and — unlike transform-panning
      // the image — it never promotes the huge screenshot to a composited GPU
      // texture (which exhausted tile memory and froze painting on mobile).
      gsap.fromTo(
        vp,
        { scrollTop: 0 },
        {
          scrollTop: () => Math.max(0, vp.scrollHeight - vp.clientHeight),
          ease: "none",
          scrollTrigger: {
            trigger: vp,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      return () => {
        img.removeEventListener("load", onLoad);
      };
    },
    { scope: viewportRef, dependencies: [src, device] },
  );

  const screen = (
    <div
      ref={viewportRef}
      className={`relative w-full overflow-hidden bg-white [scrollbar-width:none] lg:overflow-y-auto [&::-webkit-scrollbar]:hidden ${
        device === "browser" ? "min-h-0 flex-1" : "h-full"
      }`}
      style={{ scrollBehavior: "auto" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} src={src} alt={title ?? ""} className="block w-full" />
    </div>
  );

  if (device === "browser") {
    return (
      <div className="relative mx-auto aspect-[16/10] w-full max-w-[560px]">
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[14px] border border-black/10 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <div className="flex h-[28px] shrink-0 items-center gap-1.5 border-b border-black/5 bg-[#f3f3f5] px-3">
            <span className="size-[9px] rounded-full bg-[#ff5f57]" />
            <span className="size-[9px] rounded-full bg-[#febc2e]" />
            <span className="size-[9px] rounded-full bg-[#28c840]" />
            <div className="ml-3 h-[13px] w-full max-w-[220px] rounded-full bg-black/[0.06]" />
          </div>
          {screen}
        </div>
      </div>
    );
  }

  // phone
  return (
    <div
      className="relative mx-auto h-full max-h-[430px]"
      style={{ aspectRatio: "192 / 400" }}
    >
      <div className="absolute inset-0 rounded-[34px] bg-[#0e0e10] p-[7px] shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
        <div className="relative h-full w-full overflow-hidden rounded-[27px] bg-white">
          {screen}
          <div className="pointer-events-none absolute left-1/2 top-[9px] z-10 h-[18px] w-[74px] -translate-x-1/2 rounded-full bg-[#0e0e10]" />
        </div>
      </div>
    </div>
  );
}
