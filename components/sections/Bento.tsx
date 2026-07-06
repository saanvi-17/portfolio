"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

// Lottie player is client-only and heavy — load it lazily (footer is below the fold).
const HeroLottie = dynamic(() => import("./HeroLottie"), { ssr: false });

// The app screenshot leaves the hero zone blank; we layer the animated hero
// banner (Lottie, behind) and the product cards (in front, overlapping the
// banner's lower half) into it. Tops are % of the screenshot's height; both
// are full-width and sized by their own aspect ratio. Easy to nudge.
const HERO_TOP = "3.06%"; // Lottie banner, just below the search bar
const CARDS_TOP = "6.63%"; // product-cards row, overlapping the banner

const poppins = { fontFamily: "var(--font-poppins)" };
const poppinsMed = { fontFamily: "var(--font-poppins)", fontWeight: 500 };
const bricolage = { fontFamily: "var(--font-bricolage)", fontWeight: 600 };

const EMAIL = "saanvijain1999@gmail.com";
// TODO(Saanvi): link your resume PDF. Placeholder "#" until then.
const RESUME_URL = "#";

// Medium posts (newest first, from the RSS feed). Each links to the article.
const MEDIUM_URL = "https://medium.com/@saanvijain1999";
const ARTICLES = [
  { title: "Everyday design in Japan: A designer’s field notes", url: "https://medium.com/design-bootcamp/everyday-design-in-japan-a-designers-field-notes-ba28d223f7e1" },
  { title: "Be Bodywise product detail page redesign", url: "https://medium.com/@saanvijain1999/be-bodywise-product-detail-page-redesign-9659d0eae962" },
  { title: "UN Time Odyssey — A Time Travel app", url: "https://medium.com/@saanvijain1999/un-time-odyssey-a-time-travel-app-56ebb8fe5b12" },
  { title: "Reimagining Paytm’s Metro E-Ticket Experience", url: "https://medium.com/@saanvijain1999/reimagining-paytms-metro-e-ticket-experience-255b12fa8a34" },
  { title: "Building Employee Experience — an intranet case study", url: "https://medium.com/@saanvijain1999/building-employee-experience-an-intranet-design-case-study-d72ce4b7800a" },
  { title: "Enhancing the Shopping Experience in the Alle App", url: "https://medium.com/@saanvijain1999/enhancing-the-shopping-experience-in-the-alle-app-8694b4d1b9c9" },
  { title: "Designing an Intuitive Organizational Hub", url: "https://medium.com/@saanvijain1999/designing-an-intuitive-organizational-hub-bb5a3f5af762" },
  { title: "Revisiting the WhatsApp Business Redesign", url: "https://medium.com/@saanvijain1999/revisiting-the-whatsapp-business-redesign-350f58eb7d26" },
  { title: "BCare — Nanny finding app", url: "https://medium.com/@saanvijain1999/bcare-nanny-finding-app-588ec052cba9" },
  { title: "WhatsApp Business redesign — UI/UX case study", url: "https://medium.com/@saanvijain1999/whatsapp-business-redesign-ui-ux-case-study-2ca29210a110" },
];

// Socials — order + icons taken straight from the Figma (image tiles).
const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saanvi-jain/", img: "/social/linkedin.png" },
  { label: "X", href: "https://x.com/SaanviJain17", img: "/social/x.png" },
  { label: "Dribbble", href: "https://dribbble.com/SaanviJain", img: "/social/dribbble.png" },
  { label: "Medium", href: "https://medium.com/@saanvijain1999", img: "/social/medium.png" },
  { label: "Instagram", href: "https://www.instagram.com/artsy_by_saanvi/?hl=en", img: "/social/instagram.png" },
  { label: "Behance", href: "https://www.behance.net/saanvijain", img: "/social/behance.png" },
];

const CARD = "rounded-[20px] border border-edge bg-chip";
const SOFT_SHADOW = "0px 2px 8px rgba(0,0,0,0.1)";

// Resume card (Figma 753:2707). At rest it shows the "Checkout my resume"
// label + a single cream "My Resume" sticker; on hover the background fills
// warm yellow and the pink (star) + peach (heart) stickers fan out from behind
// it — the "peel to reveal" motion from resume-mov. Links to the resume.
const RES_SPRING = { type: "spring" as const, stiffness: 320, damping: 26 };

function ResumeCard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  // On touch devices (no hover) show the revealed state permanently + static.
  const [noHover, setNoHover] = useState(false);

  useEffect(() => {
    const mark = () => setNoHover(true);
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) mark();
    window.addEventListener("touchstart", mark, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", mark);
  }, []);

  const on = noHover || (hover && !reduced);
  const revealT = noHover ? { duration: 0 } : RES_SPRING;

  return (
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Checkout my resume"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative block overflow-hidden ${CARD} ${className ?? ""}`}
    >
      {/* warm accent fill on hover */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#fce89a]"
        initial={false}
        animate={{ opacity: on ? 1 : 0 }}
        transition={noHover ? { duration: 0 } : { duration: 0.3 }}
      />

      {/* label — shared card-header style (Bricolage 16 / ink / top-left) */}
      <div className="absolute left-5 top-5 z-30 flex items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bento/resume/icon-resume.svg" alt="" className="size-[20px]" />
        <span
          className="text-[16px] leading-none"
          style={{ ...bricolage, color: on ? "#3a2e0a" : "var(--ink)" }}
        >
          Checkout my resume
        </span>
      </div>

      {/* sticker cluster — centered, so it stays put at any card width */}
      <div className="absolute left-1/2 top-[33%] z-10 h-[110px] w-[300px] -translate-x-1/2">
        {/* peach — heart (fans top-right) */}
        <motion.div
          className="absolute left-[190px] top-[2px]"
          initial={false}
          animate={{ x: on ? 0 : -88, y: on ? 0 : 27, rotate: on ? -12 : 0, opacity: on ? 1 : 0 }}
          transition={revealT}
        >
          <div className="relative h-[48px] w-[96px] overflow-hidden rounded-[5px] rounded-br-none bg-[#fbded3] shadow-[0px_3.4px_8px_rgba(128,64,38,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bento/resume/heart.svg" alt="" className="absolute left-[39px] top-[15px] h-[17px] w-[18px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bento/resume/fold-peach.svg" alt="" className="absolute left-[80px] top-[32px] size-[16px]" />
          </div>
        </motion.div>

        {/* pink — star (fans bottom-left) */}
        <motion.div
          className="absolute left-[2px] top-[52px]"
          initial={false}
          animate={{ x: on ? 0 : 105, y: on ? 0 : -23, rotate: on ? -3 : 0, opacity: on ? 1 : 0 }}
          transition={revealT}
        >
          <div className="relative h-[48px] w-[87px] overflow-hidden rounded-[5px] rounded-br-none bg-[#f9c4e5] shadow-[0px_3.4px_8px_rgba(115,51,84,0.2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bento/resume/star.svg" alt="" className="absolute left-[34px] top-[14px] size-[19px]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bento/resume/fold-pink.svg" alt="" className="absolute left-[73px] top-[34px] size-[14px]" />
          </div>
        </motion.div>

        {/* cream — My Resume (stays, on top) */}
        <motion.div
          className="absolute left-[83px] top-[20px] z-10"
          initial={false}
          animate={{ rotate: on ? 6 : 3, y: on ? -2 : 0 }}
          transition={revealT}
        >
          <div className="relative h-[67px] w-[135px] overflow-hidden rounded-[6px] rounded-br-none bg-[#faf4de] shadow-[0px_4.5px_10px_rgba(107,87,26,0.22)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bento/resume/squiggle.svg" alt="" className="absolute left-[15px] top-[11px] h-[9px] w-[30px]" />
            <p className="absolute left-[15px] top-[25px] text-[14px] leading-none text-[#24221d]" style={poppinsMed}>
              My Resume
            </p>
            <div className="absolute left-[39px] top-[50px] h-[3px] w-[60px] rounded-full bg-[#f2c643]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bento/resume/fold-cream.svg" alt="" className="absolute left-[118px] top-[50px] size-[17px]" />
          </div>
        </motion.div>
      </div>
    </a>
  );
}

// Design-skills pill pile. Positions are centre-x/centre-y as % of the card,
// hand-placed so the pile fills the cell. TODO(Saanvi): tweak the list/order.
const SKILLS = [
  { label: "UX/UI Design", cx: 36, cy: 22, r: -7 },
  { label: "Figma", cx: 77, cy: 20, r: 8 },
  { label: "User Research", cx: 27, cy: 38, r: 5 },
  { label: "Design Engineering", cx: 64, cy: 39, r: -5 },
  { label: "Framer", cx: 15, cy: 55, r: 6 },
  { label: "Visual Design", cx: 46, cy: 55, r: -6 },
  { label: "Shopify", cx: 81, cy: 56, r: 7 },
  { label: "Design Systems", cx: 33, cy: 73, r: -5 },
  { label: "Webflow", cx: 67, cy: 74, r: 6 },
];

// A pile of skill pills. They settle in with a staggered spring on scroll,
// then can be dragged/flung on any device — elastic spring-back, gentle idle
// wiggle, plus a hover lift on mouse. Reduced-motion → static pile.
function SkillsCard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${CARD} ${className ?? ""}`}>
      <span className="absolute left-5 top-5 z-40 text-[16px] text-ink" style={bricolage}>
        Skills
      </span>

      <motion.div
        className="absolute inset-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.label}
            className="absolute"
            style={{ left: `${s.cx}%`, top: `${s.cy}%`, x: "-50%", y: "-50%" }}
            variants={{
              hidden: { opacity: 0, scale: 0.4 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { type: "spring", stiffness: 420, damping: 22 },
              },
            }}
          >
            <motion.div
              className="select-none whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[13px] text-[#232019] shadow-[0px_2px_10px_rgba(0,0,0,0.18)] cursor-grab touch-none active:cursor-grabbing"
              style={{ rotate: s.r, ...poppinsMed }}
              drag={!reduced}
              dragConstraints={cardRef}
              dragElastic={0.6}
              whileHover={{ scale: 1.06, y: -3 }}
              whileDrag={{ scale: 1.12, zIndex: 30 }}
              animate={reduced ? { rotate: s.r } : { rotate: [s.r, s.r + (i % 2 ? 3.5 : -3.5), s.r] }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { rotate: { repeat: Infinity, duration: 4.5 + i * 0.35, ease: "easeInOut" } }
              }
            >
              {s.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// Featured (latest) post shown in the folder. ARTICLES[0] is the Japan piece,
// which is what the folder art (stamp + matcha polaroid) depicts.
const FEATURED = {
  title: "Everyday Design in Japan",
  subtitle: "A designer’s field notes",
  url: ARTICLES[0].url,
};

// Writing card — a "folder": at rest the article card is tucked behind a
// translucent blue folder front (only the title peeks); on hover the card +
// stamp/photo slide up out of the folder. Design: Figma 825:189 → 825:256.
// The 340×294 stage is centred so the px layout is stable at any card width.
function FolderArticleCard({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [hover, setHover] = useState(false);
  const [noHover, setNoHover] = useState(false);

  useEffect(() => {
    const mark = () => setNoHover(true);
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) mark();
    window.addEventListener("touchstart", mark, { once: true, passive: true });
    return () => window.removeEventListener("touchstart", mark);
  }, []);

  const open = noHover || (hover && !reduced); // touch → open by default
  const slideT =
    noHover || reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 260, damping: 26 };

  return (
    <div
      className={`relative overflow-hidden ${CARD} ${className ?? ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <a
        href={MEDIUM_URL}
        target="_blank"
        rel="noreferrer"
        className="absolute left-5 top-5 z-40 text-[16px] text-ink transition-colors hover:text-soft"
        style={bricolage}
      >
        Writing ↗
      </a>

      {/* centred 340×294 stage — folder art positioned in px within it */}
      <div className="absolute left-1/2 top-1/2 h-[294px] w-[340px] -translate-x-1/2 -translate-y-1/2">
        {/* folder back panel */}
        <div
          className="absolute rounded-[16px] bg-[#b8ddf3] shadow-[2px_4px_8px_rgba(0,0,0,0.15)]"
          style={{ left: 52, top: 96, width: 236, height: 180 }}
        />

        {/* white card — slides up out of the folder (Figma 831:417/440) */}
        <motion.div
          className="absolute z-10"
          style={{ left: 64, top: 30, width: 214, height: 150 }}
          initial={false}
          animate={
            noHover ? (reduced ? { y: 0 } : { y: [0, -4, 0] }) : { y: open ? 0 : 80 }
          }
          transition={
            noHover
              ? reduced
                ? { duration: 0 }
                : { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
              : slideT
          }
        >
          <div className="h-full w-full rounded-[12px] border border-black/10 bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.18)]">
            <div className="px-3 py-2">
              <p className="whitespace-nowrap text-[14px] leading-[1.2] text-black" style={bricolage}>
                {FEATURED.title}
              </p>
              <p className="mt-1 text-[12px] leading-[1.2] text-black/75" style={poppinsMed}>
                A designer&rsquo;s field
                <br />
                notes
              </p>
              <a
                href={FEATURED.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex rounded-full border border-[#e3dccd] bg-white px-2 py-1 text-[12px] tracking-[0.24px] text-black transition-colors hover:bg-chip-hover"
                style={poppinsMed}
              >
                Read →
              </a>
            </div>
          </div>
        </motion.div>

        {/* torii stamp — slides up and swings right on open (831:425/472) */}
        <motion.div
          className="absolute z-10"
          style={{ left: 161, top: 52 }}
          initial={false}
          animate={
            noHover
              ? reduced
                ? { x: 0, y: 0 }
                : { y: [0, -6, 0] }
              : { x: open ? 0 : -20, y: open ? 0 : 80 }
          }
          transition={
            noHover
              ? reduced
                ? { duration: 0 }
                : { repeat: Infinity, duration: 5.2, ease: "easeInOut" }
              : slideT
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bento/folder/stamp.png"
            alt="A stamp from Japan"
            className="block drop-shadow-[0px_3px_6px_rgba(0,0,0,0.2)]"
            style={{ width: 173 }}
          />
        </motion.div>

        {/* matcha popsicle cut-out — sits on top of the stamp (831:431/454) */}
        <motion.div
          className="absolute z-10"
          style={{ left: 138, top: 89 }}
          initial={false}
          animate={
            noHover ? (reduced ? { y: 0 } : { y: [0, -5, 0] }) : { y: open ? 0 : 50 }
          }
          transition={
            noHover
              ? reduced
                ? { duration: 0 }
                : { repeat: Infinity, duration: 4, ease: "easeInOut" }
              : slideT
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bento/folder/matcha.png"
            alt=""
            className="block rotate-[-7deg] drop-shadow-[0px_3px_6px_rgba(0,0,0,0.22)]"
            style={{ width: 63 }}
          />
        </motion.div>

        {/* folder front flap — frosted glass (backdrop-blur), masked to the
            folder shape. Crossfades between the taller "closed" flap (deep
            notch) and the shorter "open" one so it folds down as the card
            slides out. Both bottom-anchored (~y276). */}
        <motion.div
          className="pointer-events-none absolute z-20"
          style={{
            left: 34,
            top: 124,
            width: 278,
            height: 160,
            backgroundColor: "rgba(184,221,243,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            maskImage: "url(/bento/folder/mask-rest.svg)",
            WebkitMaskImage: "url(/bento/folder/mask-rest.svg)",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
          }}
          initial={false}
          animate={{ opacity: open ? 0 : 1 }}
          transition={{ duration: 0.18 }}
        />
        <motion.div
          className="pointer-events-none absolute z-20"
          style={{
            left: 35,
            top: 166,
            width: 276,
            height: 118,
            backgroundColor: "rgba(184,221,243,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            maskImage: "url(/bento/folder/mask-open.svg)",
            WebkitMaskImage: "url(/bento/folder/mask-open.svg)",
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            maskRepeat: "no-repeat",
          }}
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        />
      </div>
    </div>
  );
}

// Be Bodywise phone showcase. Motion matches the Figma prototype (721:2577):
// the phone rests tilted at -25° and, while hovered, smart-animates upright to
// 0° with a springy overshoot, then settles back on leave. Rotation is a 2D
// in-plane rotation about a pivot near the phone's top (≈65% x / 10% y),
// derived from the two frames' geometry. Spring params straight from Figma
// (stiffness 514, damping 17.3, ~694ms).
//
// On hover the phone screen also becomes scrollable — you flick through the
// full app screen inside the phone. `data-lenis-prevent` keeps Lenis from
// stealing the wheel and scrolling the page instead. (The screen image is a
// placeholder crop until the real tall screenshot + hero Lottie are dropped in.)
function PhoneShowcase({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [engaged, setEngaged] = useState(false);
  const [armed, setArmed] = useState(false); // mount the Lottie only once engaged
  const screenRef = useRef<HTMLDivElement>(null);
  const tapStart = useRef<{ x: number; y: number } | null>(null);

  function engage() {
    setEngaged(true);
    setArmed(true);
  }
  function disengage() {
    setEngaged(false);
    if (screenRef.current) screenRef.current.scrollTop = 0; // reset to top
  }

  const active = engaged && !reduced;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${CARD} ${
        className ?? ""
      }`}
      // Resolved per interaction via pointerType (no device sniffing):
      // mouse → hover to engage; touch/pen → tap to toggle (a drag is treated
      // as a scroll, not a tap).
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") engage();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") disengage();
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") tapStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        if (e.pointerType === "mouse" || !tapStart.current) return;
        const dx = Math.abs(e.clientX - tapStart.current.x);
        const dy = Math.abs(e.clientY - tapStart.current.y);
        tapStart.current = null;
        if (dx < 10 && dy < 10) (engaged ? disengage() : engage()); // tap, not swipe
      }}
    >
      {/* the phone body (drawn in CSS) — this is what tilts/springs */}
      <motion.div
        className="relative aspect-[72/147] h-[84%] rounded-[2rem] bg-neutral-950 p-[5px] shadow-[0_18px_45px_rgba(0,0,0,0.3)]"
        style={{ transformOrigin: "65% 10%" }}
        initial={false}
        animate={{ rotate: reduced ? 0 : engaged ? 0 : -25 }}
        transition={
          reduced
            ? { duration: 0 }
            : { type: "spring", stiffness: 514, damping: 17.3, mass: 1 }
        }
      >
        {/* the screen — scrollable while hovered */}
        <div
          ref={screenRef}
          data-lenis-prevent
          className={`relative h-full w-full overflow-x-hidden rounded-[1.65rem] bg-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            active ? "overflow-y-auto" : "overflow-y-hidden"
          }`}
        >
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bento/app-screen.jpg"
              alt="Be Bodywise app"
              draggable={false}
              className="block w-full select-none"
            />
            {/* hero banner (behind the cards); animates on hover */}
            {armed && (
              <div
                className="absolute left-0 right-0 z-10 aspect-[1080/900] overflow-hidden"
                style={{ top: HERO_TOP }}
              >
                <HeroLottie playing={active} />
              </div>
            )}
            {/* product cards, layered in front of the banner */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bento/product-cards.png"
              alt=""
              draggable={false}
              className="pointer-events-none absolute left-0 right-0 z-20 w-full select-none"
              style={{ top: CARDS_TOP }}
            />
          </div>
        </div>
        {/* dynamic island / notch */}
        <div className="pointer-events-none absolute left-1/2 top-[11px] z-10 h-[15px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
      </motion.div>
    </div>
  );
}

function EmailCard({ className }: { className?: string }) {
  return (
    <div className={`${CARD} flex flex-col gap-4 p-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[20px] leading-[1.2] text-ink" style={poppinsMed}>
            Saanvi Jain
          </p>
          <p className="mt-1 text-[14px] text-soft" style={poppins}>
            {EMAIL}
          </p>
        </div>
        <div
          className="grid size-[60px] shrink-0 place-items-center rounded-[8px] bg-card"
          style={{ boxShadow: SOFT_SHADOW }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/social/gmail.png" alt="Gmail" className="size-11" />
        </div>
      </div>

      {/* compose preview — flush to the card's right edge */}
      <div
        className="-mr-4 flex flex-col gap-5 rounded-l-[8px] bg-card p-3"
        style={{ ...poppins, boxShadow: SOFT_SHADOW }}
      >
        <p className="flex gap-2.5 text-[14px] text-ink">
          <span>To</span>
          <span>{EMAIL}</span>
        </p>
        <p className="text-[14px] text-ink">Let’s Chat</p>
        <p className="text-[13px] text-soft">Say hello</p>
      </div>

      <a
        href={`mailto:${EMAIL}`}
        className="flex flex-1 items-center justify-center rounded-[8px] border border-edge bg-card py-3 text-[16px] tracking-[0.32px] text-ink transition-colors hover:bg-chip-hover"
        style={poppinsMed}
      >
        Email Me
      </a>
    </div>
  );
}

export default function Bento() {
  return (
    <footer id="contact" className="bg-paper text-ink">
      <div className="mx-auto max-w-[1040px] px-6 py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-[340fr_640fr]">
          {/* LEFT COLUMN — CTA on top, email below */}
          <div className="grid gap-5">
            {/* CTA */}
            <FolderArticleCard className="min-h-[294px] lg:h-[294px]" />

            <EmailCard className="lg:h-[290px]" />
          </div>

          {/* RIGHT CLUSTER */}
          <div className="grid gap-5">
            <div className="grid gap-5 sm:grid-cols-[340fr_280fr]">
              {/* middle column: skills pile + resume card */}
              <div className="grid gap-5">
                <SkillsCard className="min-h-[240px] lg:h-[270px]" />
                <ResumeCard className="min-h-[164px] lg:h-[172px]" />
              </div>

              {/* right tall — tilted phone showcase */}
              <PhoneShowcase className="min-h-[320px] lg:h-[462px]" />
            </div>

            {/* Socials — image tiles, order per the Figma. Fixed tile sizes
                (48px mobile / 64px desktop) spread with justify-between. */}
            <div className={`${CARD} flex items-center justify-between px-2.5 sm:px-8 h-[68px] lg:h-[124px]`}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="size-12 shrink-0 overflow-hidden rounded-[12px] transition-transform hover:-translate-y-0.5 lg:size-16 lg:rounded-[16px]"
                  style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.15)" }}
                >
                  {/* scale-105 clips the icon's ~2% transparent margin so the
                      tile fills the frame (no bg-chip ring), matching Figma. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt="" className="h-full w-full scale-[1.05] object-cover" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright — the very bottom */}
        <div
          className="mt-10 flex flex-col justify-between gap-2 border-t border-hair pt-6 text-[13px] text-soft2 sm:flex-row"
          style={poppins}
        >
          <span>© {new Date().getFullYear()} Saanvi Jain</span>
          <div className="flex items-center gap-4">
            <span>Made with Figma, Claude Code &amp; far too much matcha 🍵</span>
            <a href="#home" className="whitespace-nowrap text-soft transition-colors hover:text-ink">
              Back to top <span aria-hidden>↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
