export type Stat = { value: string; label: string };

/** A single image or video, optionally shown inside a phone bezel. When
    `scroll` is set (phone frame only), the frame is a fixed height and the tall
    screenshot scrolls manually inside it. */
export type Media = {
  src: string;
  video?: boolean;
  frame?: "phone";
  scroll?: boolean;
};

/** Ordered content block for an article-style case study. */
export type Block =
  | { h: string }
  | { sub: string }
  | { p: string }
  /** Centered value-prop / highlight line. */
  | { lead: string }
  | { quote: string }
  | { list: string[] }
  | { img: string; cap?: string; frame?: "phone" }
  | { video: string; cap?: string; frame?: "phone"; poster?: string }
  /** A responsive row of 2–3 images/videos (before/after, screen triptychs).
      `row` keeps them side-by-side on mobile instead of stacking. */
  | { group: Media[]; cap?: string; row?: boolean }
  | { meta: { k: string; v: string }[] };

export type Project = {
  slug: string;
  /** Small wide-tracked label above the title, e.g. "Design + Vibe Code". */
  eyebrow: string;
  title: string;
  blurb: string;
  /** Rendered as a single grey pill, items separated by a dot. */
  tags: string[];
  /** Exactly two headline stats shown under the divider. */
  stats: [Stat, Stat];
  /** Soft per-project tint for the thumbnail placeholder + case-study cover. */
  accent: string;
  /** Optional real thumbnail (swapped in when art lands). */
  thumb?: string;
  /** Full-length screenshot shown in a scroll-panning device frame. */
  shot?: string;
  /** Device frame for `shot`: "phone" for mobile screens, "browser" for web. */
  device?: "phone" | "browser";
  role: string;
  year: string;
  /** When true, shown under "Side Projects" instead of "Selected Work". */
  side?: boolean;
  caseStudy: {
    overview: string;
    problem: string;
    process: string[];
    outcome: string;
    /** Full article-style flow (used by the Be Bodywise case study). */
    cover?: string;
    story?: Block[];
    links?: { label: string; href: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "cove",
    eyebrow: "Design + Vibe Code",
    title: "Creating a digital wardrobe organizer called Cove",
    blurb:
      "Catalogs your clothes so your outfits are finally findable and re-wearable.",
    tags: ["Personal Project", "Design + Build"],
    stats: [
      { value: "0 → 1", label: "shipped end to end" },
      { value: "Rs. 0", label: "per upload cost" },
    ],
    accent: "bg-accent-rose",
    role: "Design + Build",
    year: "2026",
    device: "phone",
    shot: "/work/shots/cove.jpg",
    caseStudy: {
      overview:
        "Cove started as a fix for my own messy wardrobe in the notes app and grew into a real product I designed and built end to end.",
      problem:
        "Clothes pile up but outfits don't — without a way to see what you own, you re-buy and re-wear the same few pieces.",
      process: [
        "Mapped the catalog → outfit → re-wear loop",
        "Designed the upload and tagging flow",
        "Built it with in-browser ML so uploads are free",
        "Shipped solo and iterated on real use",
      ],
      outcome:
        "A working 0→1 product, shipped end to end, with zero per-upload cost thanks to on-device processing.",
      cover: "/work/cove/hero.webp", // ① hero — baked browser + phone composite
      story: [
        {
          meta: [
            { k: "Year", v: "2026" },
            { k: "Tools", v: "Designed with Figma, built with Claude Code" },
          ],
        },
        {
          lead: "One photo per piece · 3 steps from hanger to catalogued · $0/month to run",
        },
        {
          p: "Cove turns a physical wardrobe into a searchable digital diary. It’s live on desktop and mobile.",
        },

        { h: "Where it Started" },
        {
          p: "For years, my wardrobe lived in my Notes app. Every time I bought an outfit I liked or remembered a piece I owned but kept forgetting about , I'd take a photo and drop it into a note. It half-worked. I had the pictures, but no way to search them, organize them, or actually turn them into outfits. The photos piled up and nothing ever came of them.",
        },
        {
          group: [
            { src: "/work/cove/notes-before.webp", frame: "phone", scroll: true },
            { src: "/work/shots/cove.jpg", frame: "phone", scroll: true },
          ],
          row: true,
          cap: "Scroll each → before: a folder in my Notes app. After: Cove.",
        },
        {
          p: "With Cove, I photograph a piece once and it's cut out, catalogued, and ready to style into outfits. I didn't have to imagine a user. I'd been doing this by hand, badly, for years.",
        },
        {
          p: "I designed and shipped Cove end to end. I defined the product strategy, interaction model, information architecture, design system, and implementation. Claude Code generated production code from my specifications and tickets while I directed architecture, reviewed every implementation, and owned the product from idea to launch.",
        },

        { h: "The bet" },
        {
          p: "The real risk here wasn't technical. It was behavioural. I'd tolerated the friction of the Notes app because it was mine, but no one else would. Most wardrobe apps lose users at the same point: the first few uploads. Ask someone to photograph, crop, and label forty items, and you'll lose them by item three.",
        },
        { p: "So I designed the product around a single question:" },
        { quote: "How quickly can one garment go from hanger to catalogued?" },
        { p: "The answer became a simple three-step flow." },
        { list: ["Photograph", "Automatic background removal", "One-tap save"] },
        // ③ capture flow — the centrepiece (video)

        { h: "The craft" },
        { sub: "Designing the empty state" },
        {
          p: "A brand-new wardrobe is where these apps lose people. Cove opens with one clear action: capture your first item. No onboarding tour and no unnecessary decisions before users experience value.",
        },
        { sub: "A diary, not a filing cabinet" },
        {
          p: "Pieces accumulate in a searchable, filterable stream instead of a hierarchy of folders.",
        },
        {
          p: "To support both browsing and retrieval, I introduced category filters that let users quickly explore their wardrobe by garment type while keeping the diary-like experience intact.",
        },
        { sub: "Styling you can predict" },
        {
          p: "“Today’s Look Idea” generates outfits from saved pieces based on occasion, while Style Rules let users define constraints such as “Always include a bag.”",
        },
        {
          p: "Instead of relying on an ML recommendation model, I chose transparent rules so users always understand why an outfit was suggested.",
        },
        {
          img: "/work/cove/style-rules.webp",
          cap: "Style Rules — transparent constraints the outfit builder follows.",
        },
        {
          group: [
            { src: "/work/cove/empty-state.webp", frame: "phone" },
            { src: "/work/cove/diary.webp", frame: "phone" },
            { src: "/work/cove/outfit.webp", frame: "phone" },
          ],
          cap: "The empty state, the diary stream (filtered), and the outfit generator.",
        },

        { h: "Iterations" },
        {
          p: "My first version treated every upload like a form. Users named garments, assigned categories, occasions, and processing options before saving. After living with the product, I realized every extra decision slowed the one thing Cove needed to optimize: getting clothes into the wardrobe. I simplified the flow to capture first and let the product organize everything else.",
        },
        {
          img: "/work/cove/iteration.webp",
          cap: "The first version — every upload was a form.",
        },

        { h: "The architecture decision" },
        { p: "Background removal became the core technical challenge." },
        {
          p: "Processing images locally was essentially free but unreliable on mobile. A fully cloud-based approach could have been more reliable but increased operating costs with every upload.",
        },
        {
          p: "Instead of committing to one solution, I built a hybrid architecture. Desktop performs background removal locally whenever possible, while mobile falls back to the cloud when device constraints require it.",
        },
        {
          p: "The result is a near-instant capture experience while keeping the product essentially free to operate.",
        },
        { sub: "Designing around imperfection" },
        {
          p: "Background-removal models occasionally leave imperfect edges. Instead of trying to eliminate every artifact, I designed the interface to absorb those imperfections.",
        },
        {
          p: "Each garment is automatically placed on a consistent 2:3 portrait canvas with fixed framing, so every card aligns visually regardless of the original image. A warm cream background softens small artifacts, while consistent cropping prevents distracting shifts across the grid.",
        },
        {
          quote: "The design absorbs the imperfections so the user never has to notice them.",
        },
        {
          img: "/work/cove/remove-bg.webp",
        },

        { h: "The systems layer" },
        {
          p: "I built a reusable design system covering typography, spacing, motion, color tokens, and shared components across desktop and mobile. Although created for a single product, the system was designed with the same scalability principles I’d apply when building design systems inside a larger organization.",
        },
        { img: "/work/cove/ds-1.webp" },
        { img: "/work/cove/ds-2.webp" },
        { img: "/work/cove/ds-3.webp" },

        { h: "Where it stands" },
        {
          p: "Cove is live and fully functional, but I haven’t launched it publicly yet.",
        },
        {
          p: "Rather than optimizing for downloads, my first goal is to validate whether the problem resonates. I’m launching a demo site with a waitlist to understand genuine interest before investing in the operational costs of running background removal and AI services at scale.",
        },
        {
          p: "The north-star metric isn’t how many clothes someone catalogs during their first week — that’s a one-time activity. The real signal is whether they’re still creating and saving outfits a month later.",
        },
        {
          quote: "AI made it possible to build the product alone. Understanding the onboarding problem is what made it worth building.",
        },
      ],
    },
  },
  {
    slug: "bodywise-pdp",
    eyebrow: "Product Design",
    title: "Redesigning the Be Bodywise sunscreen PDP",
    blurb:
      "Rebuilt the sunscreen product page around trust, social proof, and a mobile-first hierarchy — lifting add-to-cart conversion by 3.3%.",
    tags: ["Client Work", "D2C Wellness", "Conversion"],
    stats: [
      { value: "+3.3%", label: "conversion lift" },
      { value: "2", label: "variants A/B tested" },
    ],
    accent: "bg-accent-green",
    device: "phone",
    shot: "/work/shots/bodywise.jpg",
    role: "Product Designer · Mosaic Wellness",
    year: "2025",
    caseStudy: {
      overview:
        "Redesigned Be Bodywise's sunscreen PDP to build conviction faster and guide shoppers to add-to-cart.",
      problem:
        "Of ~47K monthly visitors, only 5% added the product to cart — the page overwhelmed shoppers and lacked trust.",
      process: [
        "Audited the live PDP and its drop-off points",
        "A/B-studied the India and Dubai variants",
        "Restructured around trust and visual storytelling",
        "Prototyped in Webflow and measured in Mixpanel",
      ],
      outcome: "A cleaner, more convincing PDP that lifted conversion by 3.3%.",
      cover: "/work/bodywise/01.jpg",
      story: [
        {
          meta: [
            { k: "Role", v: "Product Designer" },
            { k: "Timeline", v: "March 2025" },
            { k: "Tools", v: "Figma, Webflow, Mixpanel" },
          ],
        },
        { h: "Project overview" },
        {
          p: "Redesign Be Bodywise's sunscreen PDP to increase conversions by simplifying information, building trust, and adding social proof — all while keeping engineering effort minimal.",
        },
        { h: "The problem" },
        {
          p: "The original Be Bodywise product display page wasn't creating enough product conviction or conversion. The challenge was to reimagine the PDP to address decision fatigue and build stronger emotional connections with target personas — ultimately driving measurable conversion improvements.",
        },
        { img: "/work/bodywise/02.jpg", cap: "The original PDP" },
        { h: "Understanding our users" },
        {
          p: "Before designing, I referred to Be Bodywise's core user personas to make sure the PDP resonated with real users.",
        },
        { sub: "Active users" },
        { quote: "Health-conscious women who frequently explore new wellness products." },
        {
          list: [
            "Want fast conviction and visible product benefits.",
            "Respond well to clear offers and easy purchase flows.",
          ],
        },
        { sub: "Inactive users" },
        { quote: "Women who have purchased before but lost engagement." },
        {
          list: [
            "Need reasons to return.",
            "Sensitive to clutter or overwhelming layouts.",
          ],
        },
        { sub: "Skeptic users" },
        { quote: "Women curious about wellness but hesitant due to trust concerns." },
        {
          list: [
            "Need proof: social validation, science-backed results, low-risk ways to try products.",
          ],
        },
        { h: "Mixpanel data" },
        { img: "/work/bodywise/03.jpg", cap: "Sunscreen PDP viewed and conversion rate" },
        { quote: "Out of 47K visitors, only 5% added the product to cart." },
        { p: "Users might have faced decision fatigue due to:" },
        {
          list: [
            "Overwhelming information density.",
            "Mixed typography and visuals.",
            "Lack of trust cues and clear product conviction.",
            "A page that failed to connect emotionally with the target user.",
          ],
        },
        { p: "To get more insight, we ran user-calling sessions." },
        { h: "UX goals" },
        {
          list: [
            "Create FOMO & urgency — highlight limited stock, high demand, and social proof.",
            "Instant conviction — convince users within seconds why this sunscreen is a must-have.",
            "Seamless decision-making — reduce cognitive load with clear benefits, visuals, and comparisons.",
            "Mobile-first & fast — prioritize speed, lightweight visuals, and easy interaction.",
            "Visual delight & trust — showcase the ultralight texture with immersive shots and real-user proof.",
          ],
        },
        { h: "User research" },
        {
          p: "We ran A/B testing comparing the Be Bodywise India and Dubai PDPs, to identify the elements that would drive conversion and build a stronger emotional connection with our audience.",
        },
        { sub: "1 · Hero section" },
        { img: "/work/bodywise/04.jpg" },
        {
          p: "The India page showed price and size options upfront, which users liked — but it felt crowded and messy, with too much text and poor typography. The Dubai page looked cleaner and more premium, but hid key info like price and offers under less important sections.",
        },
        {
          p: "What users want: a page that combines India's useful layout (price, size, offers at the top) with Dubai's neat, simple design.",
        },
        { sub: "2 · Hero section images" },
        { img: "/work/bodywise/05.jpg", cap: "India vs Dubai — hero section images" },
        {
          p: "India felt informative but cluttered — too many images and mixed styles. Dubai had a clean, minimal vibe, and its photo carousel worked better.",
        },
        {
          p: "What users want: to see offers, benefits, and product info first. Only 5–6 images are enough, and sections like 'How to Use' were skipped when they weren't seen as useful.",
        },
        { sub: "3 · Details section" },
        { img: "/work/bodywise/06.jpg", cap: "India vs Dubai — details section" },
        {
          p: "India suffered from poor typography, emojis, and a cluttered layout that felt less trustworthy. Dubai looked cleaner and more premium, with effective numbers, visuals, and layout.",
        },
        {
          p: "What users want: concise, visually engaging information upfront; ingredients and key benefits shown early to build trust; and a focus on clarity and hierarchy over anything that feels 'homemade' or over-explained.",
        },
        { sub: "4 · Reviews & FAQs section" },
        { img: "/work/bodywise/07.jpg", cap: "India vs Dubai — reviews and FAQ section" },
        {
          p: "Dubai's layout was better structured — reviews appeared early — but their authenticity was questionable without profile data or filters. India's reviews felt more genuine but lacked polish. In both, the FAQ needed clearer headings, larger fonts, and no gimmicky language.",
        },
        {
          p: "What users want: trustworthy-looking reviews with credibility cues, a less cluttered, skimmable layout, and clear, user-minded FAQ headings.",
        },
        { h: "Key insights from user calling" },
        { sub: "India variant" },
        {
          list: [
            "Shows important info like price, offers, and ingredients upfront — which users liked.",
            "But it feels cluttered, with poor typography and inconsistent images.",
            "Emojis and long text make it feel less professional and harder to trust.",
          ],
        },
        { sub: "Dubai variant" },
        {
          list: [
            "Feels more minimal, clean, and premium, with better image quality and early review visibility.",
            "Users liked the carousel format and how reviews show up early.",
            "But offers and ingredients are hidden below, which made some users lose trust.",
            "Reviews look less real because there are no images.",
          ],
        },
        { sub: "What users want" },
        {
          list: [
            "A hybrid layout: Dubai's neat design + India's upfront product info.",
            "Just 5–6 good images — too many can distract.",
            "A readable, skimmable layout with clear hierarchy and consistent fonts.",
            "Sections like 'How to Use' reimagined — users skipped them when misplaced or text-heavy.",
            "Reviews that feel real and trustworthy.",
            "Clear, easy-to-scan FAQs — big, bold headings, no playful language.",
          ],
        },
        { h: "Framework for the redesign" },
        { img: "/work/bodywise/08.jpg" },
        {
          p: "Across our conversations and analysis, we found four issues stopping people from buying: too much information, lack of trust, uncertainty about how the product works, and missing social proof.",
        },
        {
          p: "We built a roadmap that pairs each issue with a specific solution — so every new element on the page has a clear purpose, making it easier for customers to understand the product and feel confident buying it.",
        },
        { h: "PDP structure" },
        { sub: "Hero section" },
        { img: "/work/bodywise/09.jpg" },
        {
          list: [
            "Side panel with key features — shows benefits (SPF rating, skin-type fit) with progressive disclosure to avoid overload.",
            "Popular tag & units sold — adds social proof and reassures on credibility.",
            "Clear product imagery — clean visuals keep focus on the product and its benefits.",
            "Image slider — signals how many images are available without overwhelming the hero.",
            "First-fold pricing & offers — price and discounts upfront for quicker decisions.",
            "Key USP callout — highlights unique benefits (e.g. blends in 3 seconds) to build conviction.",
            "Sticky add-to-cart — quick action, minimal purchase friction.",
          ],
        },
        { sub: "Product images" },
        { img: "/work/bodywise/10.jpg" },
        {
          p: "We developed new product visuals that are clearer, more engaging, and more purpose-driven than the old PDP.",
        },
        {
          list: [
            "Hero shots — from plain packshots to high-quality images with refined lighting for a premium, trustworthy feel.",
            "Product demos — close-up shots of the sunscreen flowing, so users can visualize its texture.",
            "Ingredients breakdown — clean infographics instead of long, hard-to-scan text lists.",
            "User proof — bold infographics with stats like '97% saw zero white cast', making trust visible at a glance.",
            "Bundle promotions — unified shots for bundles like the 'Summer Trio' to lift order value.",
          ],
        },
        {
          quote: "These updates make the PDP more visually engaging, easier to understand, and significantly more trustworthy.",
        },
        { sub: "Details & ingredients" },
        { img: "/work/bodywise/11.jpg" },
        {
          list: [
            "Narrative GIF — a quick clip of the sunscreen blending in 3 seconds, so users grasp performance instantly.",
            "Details & How to Use — a concise description, with 'How to Use' split into its own tab to cut clutter.",
            "Ingredients — transparency for trust building, with minimal, clean UI.",
            "'No Nasties' — a dedicated section listing what the product doesn't contain, to reassure cautious users.",
          ],
        },
        { sub: "Reviews & FAQs" },
        { img: "/work/bodywise/12.jpg" },
        {
          list: [
            "Badges & certifications — clinical proof (In-Vivo / In-Vitro SPF tests) that builds credibility for skeptics.",
            "Reviews & AI summary — star ratings and a summary so users grasp real experiences fast.",
            "UGC — embedded user videos and real customer stories for authentic social proof.",
            "FAQs — common questions answered in a clean, collapsible format.",
            "Regimes — bundle suggestions to raise cart value.",
          ],
        },
        { h: "Before & after" },
        { img: "/work/bodywise/13.jpg", cap: "Before and after" },
        {
          p: "The original PDP was text-heavy and cluttered with mixed fonts, emojis, and dense blocks of information — users felt overwhelmed and struggled to find key details. The new design is clearer, faster to navigate, and tailored to diverse user needs, improving both trust and likelihood of conversion.",
        },
        { h: "The result" },
        {
          p: "After building and testing the redesign as Webflow prototypes, we achieved a +3.3% lift in conversions on the Be Bodywise sunscreen page. Usability tests and stakeholder feedback also showed:",
        },
        {
          list: [
            "Users found the new layout clearer and less overwhelming.",
            "Trust signals — badges, UGC, clean visuals — increased perceived credibility.",
            "The hybrid layout balanced detailed product info with a clean, premium design.",
          ],
        },
        {
          p: "Off the back of these results, we're rolling these elements out to other PDPs to further improve site performance and trust.",
        },
        { h: "Key learnings" },
        {
          list: [
            "Visual hierarchy matters most — users respond strongly to clean, organized IA.",
            "Show, don't tell — a 5-second video created more conviction than paragraphs of text.",
            "Social validation is critical — real numbers (9.8K units sold) and authentic reviews beat marketing claims.",
            "Mobile-first pays off — optimizing for mobile first meant a better experience on every device.",
          ],
        },
      ],
      links: [
        {
          label: "Live PDP ↗",
          href: "https://try.bebodywise.com/ultra-light-sunscreen-spf50",
        },
        {
          label: "Full case study on Medium ↗",
          href: "https://medium.com/@saanvijain1999/be-bodywise-product-detail-page-redesign-9659d0eae962",
        },
      ],
    },
  },
  {
    slug: "auzmor-employee-experience",
    eyebrow: "Product Design",
    title: "Building Auzmor Office — an intranet for employee experience",
    blurb:
      "Designed and shipped the MVP for Auzmor's employee-experience intranet — research, IA, homepage concepts, and a LinkedIn-familiar home + people hub.",
    tags: ["Client Work", "B2B SaaS", "0 → 1 MVP"],
    stats: [
      { value: "0 → 1", label: "MVP shipped" },
      { value: "Web + Mobile", label: "design system" },
    ],
    accent: "bg-accent-blue",
    device: "browser",
    shot: "/work/shots/auzmor.jpg",
    role: "Product Designer · Auzmor",
    year: "2022 — 2023",
    caseStudy: {
      overview:
        "Designed and shipped the MVP for Auzmor's employee-experience intranet — an internal hub for connection and communication.",
      problem:
        "Fragmented internal tools didn't support meaningful communication, so employees stayed disengaged.",
      process: [
        "Researched user needs and ran a competitor analysis",
        "Defined the release plan and information architecture",
        "Explored homepage concepts and wireframed",
        "Designed the home + people hub and prototyped for stakeholders",
      ],
      outcome:
        "A clean, LinkedIn-familiar intranet MVP that drew strongly positive stakeholder feedback and lifted customer conversion in demos.",
      cover: "/work/auzmor/16.jpg",
      story: [
        {
          meta: [
            { k: "Role", v: "Product Designer · Auzmor" },
            { k: "Duration", v: "Nov 2022 — Mar 2023" },
            { k: "Tools", v: "Figma, FigJam, Confluence" },
            { k: "Skills", v: "Wireframing, Prototyping, Web & Mobile, Competitive Analysis" },
          ],
        },
        { h: "Context" },
        {
          p: "An organization's intranet is a private, internal network for communication and collaboration among employees — a central hub to access company resources and interact. In simple terms: a LinkedIn or Facebook, but exclusively within the organization, so employees stay connected, share information, and work together more effectively.",
        },
        { h: "About Auzmor" },
        {
          p: "Auzmor is an HR SaaS company focused on employee training, recruitment, and employee experience, built around three core products — Auzmor Office, Auzmor Learn, and Auzmor Hire. Through these, Auzmor helps organizations foster growth, improve engagement, and drive better outcomes.",
        },
        { h: "Projects I worked on" },
        {
          list: [
            "Creating an MVP for Employee Experience",
            "Creating channels and documents",
            "Building the LXP — a merger of Auzmor Learn and Office",
          ],
        },
        { h: "Project 1: An MVP for Employee Experience" },
        {
          p: "This product lets employees engage at a deeper level, intertwined with meaningful communication.",
        },
        { sub: "My role" },
        {
          p: "My role was to create an MVP and ship it. Along with one other designer, I ran the research, wireframes, and stakeholder prototypes, the UI design, feedback rounds, regular syncs with the PM, and dev handoff.",
        },
        { h: "Design process" },
        { img: "/work/auzmor/01.jpg" },
        { h: "Define" },
        { sub: "Problem statement" },
        {
          p: "Employees needed a more engaging, effective way to communicate and interact through the company's internal platforms. Existing tools were fragmented and didn't fully support meaningful communication or collaboration.",
        },
        {
          p: "The challenge: build Auzmor's intranet to enhance employee engagement — a more cohesive, intuitive experience that enables deeper interactions and better collaboration.",
        },
        { img: "/work/auzmor/02.jpg" },
        { h: "Ideation" },
        {
          p: "I started by reviewing the data the Product Manager had already gathered, which gave initial insight into user needs and challenges. From there I moved into ideation — additional research to build on those insights and refine our ideas, so the solutions were well-informed and effective.",
        },
        { h: "Competitor analysis" },
        {
          p: "There are many intranet applications with overlapping features. To understand how they work and find common patterns, I ran a thorough competitor analysis — examining key functionalities, evaluating UI patterns, and getting a sense of industry standards.",
        },
        {
          img: "/work/auzmor/03.jpg",
          cap: "Tools we looked at — Workvivo, Happeo, Vantage Circle, and more",
        },
        { p: "The analysis surfaced some clear findings:" },
        {
          list: [
            "Lack of intuitive design — the goal isn't always to make something totally new, but to keep it familiar and easy to use. Some products were too complex, leading to poor experiences.",
            "Outdated UI — some had cluttered, dated designs; we wanted something familiar yet fresh and minimal.",
            "Positives worth keeping — effective collaboration tools (messaging, spaces), mobile availability, and an engaging news feed.",
          ],
        },
        {
          p: "Using these insights, I focused Auzmor's intranet on the shortcomings — which also shaped the release plan and clarified what to build for the MVP.",
        },
        { h: "Release 1 — Connection & communication" },
        {
          p: "Based on requirements from the sales team, stakeholders, and potential clients, we made a release plan of the components and functionality to ship first.",
        },
        { img: "/work/auzmor/04.jpg", cap: "Release 1 components list" },
        { h: "Information architecture" },
        { img: "/work/auzmor/05.jpg", cap: "The full flow for Auzmor Office" },
        { h: "Visual direction" },
        {
          p: "The goal was a clean, modern, user-friendly interface. We ran multiple stakeholder meetings and extensive internal testing so it was not just aesthetic but intuitive and well received. For instance, we first chose illustrations from Designstripe, but the team felt they were too linear and flat — so we switched to more dynamic, engaging illustrations from Storyset, which landed much better.",
        },
        { img: "/work/auzmor/06.jpg" },
        { img: "/work/auzmor/07.jpg" },
        { img: "/work/auzmor/08.jpg" },
        { img: "/work/auzmor/09.jpg" },
        { h: "Initial concepts" },
        {
          p: "With the problem clearly defined, we focused on the homepage — the first page a user sees on login, and a chance to set the product's design language. The goal: a user-centric homepage that surfaces essential metrics and workflows.",
        },
        { sub: "Concept 1" },
        {
          p: "As a content-heavy intranet, I designed a two-column layout to ease the content and progressively reveal the rest — posts on the left, widgets on the right. I used a left + top navigation: the left nav (with apps) is easily scannable for fast navigation, while the top nav holds the most important, accessible features — home, discover, apps, and search.",
        },
        { img: "/work/auzmor/10.jpg" },
        {
          p: "Feedback: the design was well received for its modern, appealing look — but a more central layout could better match the natural movement of the eye, for faster processing and less cognitive load.",
        },
        { sub: "Concept 2" },
        {
          p: "I introduced a three-column layout — widgets split left and right, feed in the middle — which meant a top nav (a left nav would feel crowded and distract from the newsfeed).",
        },
        { img: "/work/auzmor/11.jpg" },
        {
          p: "Feedback: the three-column layout hit the mark. They liked personal information on the left and other widgets on the right. This let us finalize the direction and move into development.",
        },
        { h: "Wireframing" },
        { img: "/work/auzmor/12.jpg" },
        { h: "Home page & people-hub components" },
        { img: "/work/auzmor/13.jpg" },
        { img: "/work/auzmor/14.jpg", cap: "Home page and people hub components" },
        {
          p: "The homepage and people-hub components and widgets were largely based on the competitor analysis, the initial concepts, and the IA from research.",
        },
        { img: "/work/auzmor/15.jpg", cap: "Role and access" },
        {
          p: "This maps three user types — super admin, admin, and end user — detailing the actions each role can perform and the permissions assigned to each.",
        },
        { h: "Final designs" },
        {
          p: "After feedback and refinement of the initial concepts, we built the final designs for the homepage, people hub, apps, and more.",
        },
        { sub: "News feed" },
        { img: "/work/auzmor/17.jpg" },
        { img: "/work/auzmor/18.jpg", cap: "Some design decisions for the news feed" },
        { sub: "People Hub — design & iterations" },
        {
          p: "The people hub shows people cards listing everyone in the organization, with a toggle between People Hub, Teams Hub, and an org-chart view. Clicking a card opens that member's profile.",
        },
        {
          p: "Feedback: the functionality was appreciated, but there was room to improve — space at the top was wasted on buttons, and six cards per row felt cluttered.",
        },
        { img: "/work/auzmor/19.jpg" },
        { img: "/work/auzmor/20.jpg", cap: "Iterations on the people hub page" },
        {
          p: "To address it, we combined the first two rows to use the space better and reduced the row from six cards to five, made it responsive so the count adjusts to screen size, and improved the text hierarchy inside the cards so the information reads clearly.",
        },
        { h: "Prototyping" },
        {
          p: "I built prototypes from the initial designs — for the sales team and the official Auzmor website.",
        },
        { h: "Feedback" },
        {
          p: "Showcasing the prototypes to potential customers and stakeholders drew overwhelmingly positive feedback:",
        },
        {
          list: [
            "Users appreciated the intuitive design and liked its resemblance to LinkedIn, which made the interface familiar and easy to navigate.",
            "Where market products tend to be complex, they liked Auzmor Office's minimal, clean, user-friendly design.",
            "We saw an uptick in customer conversion after showcasing prototypes — they became a centrepiece of potential-customer calls.",
          ],
        },
        {
          p: "Stakeholders were also curious about the product's future — channels, onboarding, documents — and keen to see how they'd be added, showing confidence in Auzmor Office's ability to grow.",
        },
        { sub: "More from release 1" },
        { img: "/work/auzmor/21.jpg", cap: "Additional release 1 designs" },
        { h: "Learnings" },
        {
          list: [
            "Responsive-first — I used to not think much about how designs translate across screens. Building our design system and the mobile app taught me the importance of responsive design.",
            "Get feedback early, not just at handoff — it surfaces real-world constraints and helps you adapt. And a harder lesson: don't take your designs personally — you have to accept constructive criticism to grow.",
          ],
        },
        { h: "Other projects at Auzmor" },
        {
          list: [
            "Creating the channels and documents section",
            "Building the LXP — a merger of Auzmor Learn and Office",
            "Creating the design system for Auzmor Office",
            "The mobile app for Auzmor Office",
          ],
        },
      ],
      links: [
        {
          label: "Full case study on Medium ↗",
          href: "https://medium.com/@saanvijain1999/building-employee-experience-an-intranet-design-case-study-d72ce4b7800a",
        },
      ],
    },
  },
  {
    slug: "time-odyssey",
    eyebrow: "Concept",
    title: "UN Time Odyssey — booking travel through time",
    blurb:
      "A conceptual time-travel booking app with holographic memories and smartwatch sync.",
    tags: ["Concept", "Self-initiated"],
    stats: [
      { value: "20+", label: "screens designed" },
      { value: "Wearable", label: "+ holographic UI" },
    ],
    accent: "bg-accent-sand",
    role: "Product Design",
    year: "2024",
    side: true,
    caseStudy: {
      overview:
        "A self-initiated concept: a 2080 time-travel booking app for the UN Centre for Timekeeping, designed to make first-time travellers feel informed and safe.",
      problem:
        "Most travellers are first-timers, so anxiety and uncertainty are big deterrents. How do you help them understand time travel and its risks, and book a slot with confidence?",
      process: [
        "Framed the 2080 world and its assumptions",
        "Mapped user flows and brainstormed the home",
        "Iterated the home, ticket, and slot-booking screens",
        "Designed high-fidelity onboarding, booking, and the ticket",
      ],
      outcome:
        "A polished concept — home, onboarding, slot discovery, booking, and a chip/hologram ticket — that pushes interaction patterns beyond the screen with holographic memories and a Tesla smartwatch.",
      cover: "/work/time-odyssey/01.jpg",
      story: [
        {
          meta: [
            { k: "Type", v: "Self-initiated concept" },
            { k: "Year", v: "2024" },
            { k: "Tools", v: "Figma" },
          ],
        },
        { h: "Overview" },
        {
          p: "It's the year 2080. The United Nations Centre for Timekeeping has opened its gates for the public to experience time travel. Most travellers will be first-timers, so anxiety and uncertainty are big deterrents. The brief: propose a solution that helps time travellers understand the notions of time travel, get acquainted with the risks, find vacant slots, and book tickets accordingly.",
        },
        { h: "Challenge" },
        {
          list: [
            "Create an app that helps users understand the concept, risks, and exciting elements of time travel.",
            "Let users book time slots and get tickets for their chosen time period.",
          ],
        },
        { h: "Assumptions" },
        {
          p: "To give a clear framework, I made some assumptions about what a user can and can't do while travelling.",
        },
        { img: "/work/time-odyssey/02.jpg" },
        { img: "/work/time-odyssey/03.jpg" },
        {
          p: "Sticking to these assumptions lets us create a safe, educational, user-friendly experience that attracts and retains users while keeping the timeline intact.",
        },
        { h: "Basic user flow" },
        {
          p: "I started with a simple user flow to map the steps — from choosing a time period to booking a slot. This helped me understand the journey and keep the design smooth and intuitive.",
        },
        { img: "/work/time-odyssey/04.jpg" },
        { h: "Brainstorming" },
        {
          p: "I sketched initial ideas for the homepage. Letting users travel their own timeline felt compelling at first — but impossible, since they'd be able to see how they die. So I let users book specific era tours or jump to a specific date instead.",
        },
        { img: "/work/time-odyssey/05.jpg", cap: "Home page sketches" },
        { img: "/work/time-odyssey/06.jpg" },
        { h: "Iterations — Home page" },
        { img: "/work/time-odyssey/07.jpg" },
        { sub: "Iteration 1" },
        { p: "Features:" },
        {
          list: [
            "A 'jump time' slider on the homepage to select time-travel dates.",
            "Special offers and top historic places shown prominently.",
            "A nav bar with Home, Friends, Safety, My Trips, and Me.",
          ],
        },
        { p: "Issues:" },
        {
          list: [
            "Limited categories for essential actions, so important actions weren't visible enough.",
            "The referrals feature took a backseat.",
            "The jump-time slider needed more data than the homepage could hold — it really needs its own section.",
          ],
        },
        { sub: "Iteration 2" },
        { p: "Changes:" },
        {
          list: [
            "Moved the referral section to the top to highlight the invite feature.",
            "Added essential categories — 'Book a Slot,' 'View Destinations,' 'Health & Safety,' etc.",
            "Reduced the offer-card width for a cleaner layout.",
          ],
        },
        { p: "Issues:" },
        {
          list: [
            "The referral position was still less ideal than the other key actions.",
            "Some essential actions were still missing from the homepage.",
          ],
        },
        { sub: "Final design" },
        {
          p: "Added new features — 'Travel Collection' and 'Travel with the Tesla Watch'.",
        },
        { quote: "Travel Collection" },
        {
          list: [
            "Snap holographic pictures of the moments you're experiencing (phones might not work in every era).",
            "Since taking artifacts isn't allowed, get 3D models of the ones you want — even miniature versions if they're too big.",
          ],
        },
        {
          p: "These holograms and 3D artifacts are saved in a dedicated 'Travel Collection' section in the app.",
        },
        { quote: "Travel with Tesla 2.0" },
        { img: "/work/time-odyssey/08.jpg" },
        {
          p: "Since it's 2080, we have holographic smart watches by Tesla, in collaboration with the UN Centre for Timekeeping. Tesla's technology lets you travel through time using your watch — a seamless, futuristic experience.",
        },
        {
          list: [
            "A holographic interface that starts time travel by voice command.",
            "Doubles as an emergency SOS and for taking snapshots.",
          ],
        },
        { sub: "More fixes on the homepage" },
        {
          list: [
            "Referral section — moved lower but still prominent; it can shift up once the user is comfortable with the app.",
            "Key actions — added more, like slot booking, travel with pets, and find a nearby time station.",
            "Carousel — moved to the top for visibility; dynamic, focusing on safety and education for first-timers, new features for returning users.",
            "Time-travel & safety section — educates people so they feel safe and build trust in the technology.",
            "Nav bar — 'Safety' replaced with 'Connect' for better alignment of functionality.",
            "Categories — added at the bottom, covering different eras to make exploring options easier.",
          ],
        },
        { h: "Iterations — Ticket details" },
        { img: "/work/time-odyssey/09.jpg" },
        { h: "Iterations — Slot booking" },
        { img: "/work/time-odyssey/10.jpg" },
        { sub: "Iteration 1" },
        { p: "Features:" },
        {
          list: [
            "Book slots up to 30 days in advance.",
            "Separate slots by Morning, Noon, etc. for better organization.",
          ],
        },
        { p: "Issues:" },
        { list: ["Too many slots visible at once."] },
        { sub: "Final design" },
        {
          list: [
            "Slot range — show the range for each section so users can identify the different slots clearly.",
            "Collapsible widgets — divided and collapsible to reduce cognitive load.",
            "Tesla Watch — a toggle to travel via the watch instead of visiting a time station.",
          ],
        },
        { h: "Some more iterations" },
        { img: "/work/time-odyssey/11.jpg" },
        { h: "Onboarding user flow" },
        { img: "/work/time-odyssey/12.jpg" },
        { h: "Slot discovery & ticket-booking user flow" },
        { img: "/work/time-odyssey/13.jpg" },
        { h: "High-fidelity UI — Onboarding" },
        {
          p: "Tweaked the widget styling and sizes a little to fit the final designs.",
        },
        { img: "/work/time-odyssey/14.jpg" },
        { sub: "Home page carousels" },
        {
          p: "The carousels can be dynamic — safety and educational information for first-timers, then a shift to features like 3D artifacts and travelling with the Tesla Watch once the user is familiar.",
        },
        { img: "/work/time-odyssey/15.jpg" },
        { h: "High-fidelity UI — Slot discovery & ticket booking" },
        {
          list: [
            "The first screen helps the user pick a destination or time period via search or a manual slider.",
            "The second screen shows available slots and lets them book.",
          ],
        },
        { img: "/work/time-odyssey/16.jpg" },
        { h: "Ticket to access time travel" },
        {
          p: "The ticket grants access via a unique chip embedded in each person since birth — holding your essential information, including bank and contact details. Tapping the blue icon summons a hologram that scans the ticket holder, verifies identity, and grants access. If your chip malfunctions, there are two fallbacks: scan a QR code to activate your Tesla Watch 2.0, or visit the nearest time station — so you can still travel even if your primary method fails.",
        },
        { img: "/work/time-odyssey/17.jpg" },
        { h: "Conclusion" },
        {
          p: "User testing could validate features like using the watch for time travel, to gauge perspective and acceptance. Balancing education and safety with the app's appeal was the real challenge — but overall, this project was a unique chance to push creative boundaries and design a product that genuinely enhances how people experience time travel.",
        },
      ],
      links: [
        {
          label: "Full case study on Medium ↗",
          href: "https://medium.com/@saanvijain1999/un-time-odyssey-a-time-travel-app-56ebb8fe5b12",
        },
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
