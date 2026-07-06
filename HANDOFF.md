# Portfolio — Handoff (for a fresh Claude session)

Saanvi Jain's personal product-design portfolio. Code-based (Next.js, **not** Framer). Deploy target: Vercel + domain `saanvijain.xyz` (not deployed yet).

## Run / stack
- Root: `~/Documents/portfolio`. Run: `npm run dev` (→ **localhost:3000**). Build: `npm run build`.
- **Next.js 16** (App Router, **Turbopack**) · TypeScript · **Tailwind v4** (no config file — theme lives in `app/globals.css` via `@theme inline`) · **Framer Motion** · GSAP/ScrollTrigger · **Lenis** smooth scroll (`window.__lenis`, honors `data-lenis-prevent`) · **lottie-react** (`^2.4.1`, footer folder/phone) · react-icons (installed, unused).
- Fonts (next/font, `app/layout.tsx`): **Bricolage Grotesque** (headings, `--font-bricolage`) + **Poppins** (body, `--font-poppins`). Used via inline `style={{ fontFamily: "var(--font-...)" }}` (Bento defines `bricolage`/`poppins`/`poppinsMed` style objects).

## ⚠️ Critical gotchas (read before working)
1. **You cannot start a preview** — port 3000 is held by Saanvi's own `npm run dev`. Preview MCP can't bind; screenshots don't work. **Verify with `curl -s localhost:3000`** (HTTP 200 + grep for content / "Failed to compile"). Always ask Saanvi to **hard-refresh (Cmd+Shift+R)** — she views changes in her own browser, and stale builds are common.
2. **No live preview → verify layout/positions with static mocks.** Reproduce a card's geometry in PIL (draw rects + composite the real assets) and eyeball it before shipping. Half the footer was built this way. Animations (springs, drag, backdrop-blur) can't be mocked — flag them for Saanvi to check.
3. **Turbopack stale CSS**: editing `globals.css` `@theme`/tokens sometimes doesn't hot-reload. Fix: nudge a recompile — `printf '\n/* nudge */\n' >> app/globals.css && sed -i '' '/nudge/d' app/globals.css`, then re-curl. If still stale, Saanvi restarts the dev server.
4. **Figma assets**: `get_design_context` image URLs 404 on curl; use **`get_screenshot`** (those URLs *do* download via `curl --dangerouslyDisableSandbox`). To export one element, screenshot its node. SVGs come back as SVG text (rename `.png`→`.svg`). No local SVG renderer (cairosvg/rsvg absent) — can't rasterize SVGs for mocks.
5. **Medium**: article pages 403; pull from the RSS feed `https://medium.com/feed/@saanvijain1999` (titles/links in `<item>`, full HTML in `<content:encoded>`, images on `cdn-images-1.medium.com`).
6. Bash network is sandboxed — external `curl` needs `dangerouslyDisableSandbox: true`.
7. **Pasted chat images aren't on disk.** Saanvi drops real files into `~/Downloads` (often a subfolder); `cp`/process from there.

## Section flow (`app/page.tsx`)
`Hero → About → Work → Experience → ExtraProjects(Side Projects) → Journals → Bento(footer #contact)`
- The old **BreakingSection marquee** ("playfulness · detail · curiosity") was **removed** from the page (Saanvi's call). `components/sections/BreakingSection.tsx` still exists but is **unimported/unused** — safe to delete.

## Theming / dark mode ✅ (whole-site, lamp-driven)
- `components/providers/ThemeProvider.tsx` — context, **default light, no persistence**, toggles `class="dark"` on `<html>`. The **hero lamp** is the only switch.
- Tokens in `globals.css`: `:root` = light, `.dark {}` overrides, `@theme inline` exposes utilities. Surfaces `bg-paper`/`bg-card`/`bg-chip`(+`-hover`); text `text-ink`/`text-soft`/`text-soft2`/`text-faint`/`text-eyebrow`; `border-edge`/`border-hair`; accents `bg-accent-rose/green/blue/sand`. `@custom-variant dark (&:where(.dark,.dark *))`.
- **Dark-mode trap**: anything with a *fixed light background* (folder card yellow fill, sticky-note colors, white skill pills) needs **fixed dark text** on it, not `text-ink` (which flips light in dark mode and washes out). See the resume header's `on ? "#3a2e0a" : "var(--ink)"` pattern.

## Case studies (`lib/projects.ts` + `app/work/[slug]/page.tsx`) ✅
- 4 projects: `cove`, `bodywise-pdp`, `auzmor-employee-experience`, `time-odyssey`. 3 are full Medium case studies (bodywise/auzmor/time-odyssey); `cove` is on the short template. Process to add: curl RSS → parse `<content:encoded>` → download+optimize images to `public/work/<slug>/NN.jpg` → build a `story: Block[]`.

## Footer Bento (`components/sections/Bento.tsx`) — where most of this session went
Layout: `grid lg:grid-cols-[340fr_640fr]`. **Left col** = FolderArticleCard (`lg:h-294`) + EmailCard (`lg:h-290`). **Right cluster** = inner `sm:grid-cols-[340fr_280fr]` [ SkillsCard (`lg:h-270`) + ResumeCard (`lg:h-172`) | PhoneShowcase (`lg:h-462`) ] then Socials row (`h-68 lg:h-124`), then copyright strip (has "Back to top ↑"). `max-w-[1040px]`.

**Shared conventions**
- Card shell: `const CARD = "rounded-[20px] border border-edge bg-chip"` (flat, no elevation shadow — matches siblings).
- **Card headers are unified**: Bricolage 16px / `text-ink` / positioned `absolute left-5 top-5` (Skills, "Checkout my resume", Writing). Keep any new card's header the same.
- **Touch detection** (reused by folder/resume/phone): `useEffect` sets `noHover` via `matchMedia("(hover: none), (pointer: coarse)")` + a `touchstart` fallback (some phones misreport hover, so the touchstart is essential). Phone showcase uses per-interaction `e.pointerType` instead.

**FolderArticleCard** ("Writing", left-top) — replaced the old "Let's make something" CTA. Design: Figma **831:437** (rest) → **831:414** (hover). A blue **folder**: at rest the white card is tucked (only the single-line title peeks through the flap notch); on hover the card + torii **stamp** + matcha **popsicle** slide up out of the folder — **each element animates by a different amount** (card +80, stamp +80 & swings right 20, matcha +50), NOT a group slide. The **flap** is frosted glass (`backdrop-filter: blur` on a `mask-image`-shaped div) and **crossfades** between a taller "closed" flap (`front-rest`/`mask-rest`) and a shorter "open" one (`front`/`mask-open`), both bottom-anchored at y≈276.
- Features the **latest** Medium post only — `FEATURED` (title/subtitle/url) is **hardcoded to the Japan article**, because the stamp+popsicle art is Japan-specific. `ARTICLES` (10 posts from RSS) + `MEDIUM_URL` power the "Writing ↗" label (→ Medium profile) and the `Read →` link.
- Assets in `public/bento/folder/`: `stamp.png` (torii, bg knocked out via flood-fill), `matcha.png` (cut-out popsicle), `front.svg`/`front-rest.svg` (translucent flap shapes), `mask-open.svg`/`mask-rest.svg` (solid-fill masks generated from the flap paths for the blur).
- Positions are px inside a centred `340×294` stage (matches Figma's container). All coords are commented with their Figma node ids.
- **Mobile** (`noHover`): shows the fully-open state statically **plus a gentle staggered breathing float** (card −4px/4.5s, stamp −6px/5.2s, matcha −5px/4s); reduced-motion → static, no float. **Desktop is untouched** by the mobile branch.

**SkillsCard** (middle-top) — replaced the footer-nav links card (redundant with the sticky top nav). A pile of **draggable white skill pills** (`SKILLS` const: `{label, cx, cy, r}`, 9 items). They **settle in on scroll** (`whileInView` stagger, opacity+scale), are **draggable on every device** (`drag`, `dragConstraints={cardRef}`, `dragElastic`, `whileDrag`, gated only on reduced-motion), with a gentle idle rotate-wiggle and hover lift. Pills are **fixed white** (`bg-white text-[#232019]`) so they pop in dark mode.

**ResumeCard** (middle-bottom, `lg:h-172`) — "Checkout my resume" sticky-note collage (Figma 753:2707). Rest: cream "My Resume" note; on hover the card fills warm yellow and the pink (star) + peach (heart) notes fan out (`RES_SPRING = spring 320/26`). Fold corners need a **square bottom-right** (`rounded-br-none`). Assets in `public/bento/resume/` (icon-resume, squiggle, star, heart, fold-cream/pink/peach SVGs). Mobile → revealed static. Links to `RESUME_URL` (**`"#"` placeholder — needs Saanvi's resume PDF**). Header text switches to dark on the yellow fill.

**PhoneShowcase** (right, `lg:h-462`) — Be Bodywise phone, Figma prototype 721:2577. **Rest tilted −25°** about pivot **`transformOrigin: "65% 10%"`**; on hover **springs upright** (`spring stiffness 514, damping 17.3` — straight from Figma). The screen becomes **scrollable** (`data-lenis-prevent`) through the full app; the **hero banner is a Lottie** (`HeroLottie.tsx` + `heroLottie.json`, lazy-loaded on first engage) layered **behind** the product-cards image over a blank hero zone in the screenshot (`HERO_TOP`/`CARDS_TOP` %). CSS-drawn phone body (bezel + notch). **Desktop** = hover; **touch** = tap-to-toggle (per-interaction `pointerType`, drag≠tap). Assets: `public/bento/app-screen.jpg` (blank-hero full page), `product-cards.png`, `phone-upright.png` (**unused now — safe to delete**).

**EmailCard** = Gmail-compose mock (unchanged). **Socials** = 6 fixed-size image tiles (`size-12` mobile / `lg:size-16`), `justify-between`, sliced from Figma into `public/social/` (order LinkedIn·X·Dribbble·Medium·Instagram·Behance). `CV_URL` was removed with the old CTA card.

## Journals (`components/sections/Journals.tsx`) ✅
Realistic 3D page-turn flip-book, tilted −3°, gentle float. Now **7 real spreads** (was 3 identical): `spreads[]` maps to `public/journals/<n><L|R>.jpg` (1L…7R). Order: **Tokyo → Bangalore → London → Lakshadweep/Kasol → Pondicherry → Chennai → Auroville/Rishikesh**. `place` field exists but **isn't rendered**. Process for new pages: crop the white/cream frame to the page, resize to **600px wide JPG** (`object-cover` fits ~0.70 aspect). Watch for pages that include desk/binding borders (grey/maroon, not white) — the plain white-crop misses those; bound the cream page instead.

## Other built pieces
- **Nav** (`components/Nav.tsx`) — segmented pill + scroll-spy (IntersectionObserver). Add a section id + a `links` entry to register a new section.
- **ExtraProjects / Side Projects** — peeking phone-mockup cards (faux skeletons; real screenshots pending).
- **Experience** — timeline + scrapbook polaroids (per-role `skills[]`, `Skill` pill).
- **About** — Kodak contact-sheet (videos + photos), Story↔TL;DR toggle.

## Open TODOs / placeholders
1. **`RESUME_URL`** in Bento is `"#"` — drop in Saanvi's resume PDF link (the resume card links to it).
2. **Folder card** features only the Japan post (hardcoded `FEATURED` + Japan stamp/popsicle art). If a newer post should headline, swap `FEATURED` **and** the art.
3. **Delete dead files**: `phone-upright.png` (unused) and `components/sections/BreakingSection.tsx` (unimported).
4. **Frosted-glass flap** uses `backdrop-filter` — confirm it renders (blur, not just translucent tint) across Saanvi's browsers.
5. The old **"Open to product design roles"** status pill + **Download CV** button were removed with the CTA card — re-home them if that hire-me signal is wanted.
6. **Deploy** to Vercel + connect `saanvijain.xyz`. Optionally hide the dev-only "N" badge (`devIndicators`).
7. Journals `place`/`dates` aren't shown — wire captions onto the book if desired.

## Companion docs
- Memory: `/Users/mosaic/.claude/projects/-Users-mosaic-Documents/memory/portfolio-website.md`.
- Plan file (skills pile): `/Users/mosaic/.claude/plans/which-one-looks-better-swift-kahan.md`.
- Deeper history in git.
