// Everything on the site that is not a case page body.
// Case pages live in content/work/<slug>.mdx; a case listed here without an .mdx file
// links to its Notion page until its case page is written.

export type Proof =
  | { kind: "num"; mark: string; cap: string; sr: string }
  | { kind: "words"; lines: string[]; cap: string; sr: string }
  | { kind: "quote"; mark: string; cap: string }
  | { kind: "specimen" }
  | { kind: "hero"; mark: string; cap: string; sr: string };

/** A logo beside a case title, drawn in the title's colour. src is a one-colour SVG used as a mask; ratio is width / height. */
/** Logo beside a title: one-colour mask, plus how it looks on hover (original file, a coloured layer over it, or brand colour). */
export type Mark = { src: string; ratio: string; art?: string; overlay?: boolean; color?: string };

export type CaseEntry = {
  slug: string;
  title: string;
  /** Full title, used in "Next case" links */
  fullTitle: string;
  desc: string;
  meta: string;
  notionUrl?: string;
  proof?: Proof;
  appStoreUrl?: string;
  /** Logos beside the title; more than one are joined with "+" (for example client + school) */
  marks?: Mark[];
};

export const person = {
  name: "Lera Dryha",
  fullName: "Valeriia Dryha",
  role: "Product Designer",
  email: "dryga_v@yahoo.com",
  linkedin: "https://www.linkedin.com/in/valeriia-dryha-37b083247/",
};

export const intro = {
  lead: "Hi, I’m Lera,",
  accent: "a product designer.",
  text: "I design intuitive interfaces for mobile and web, across B2B and B2C products in SaaS, fintech, healthtech, adtech, e-commerce and media.",
};

/** Featured cases, in order. The first one is the full-width hero tile. */
export const featured: CaseEntry[] = [
  {
    slug: "prevently",
    title: "Prevently",
    fullTitle: "Prevently",
    desc: "A personal preventive-care planner for women. Research, design and build, from idea to App Store, solo.",
    meta: "Personal product · iOS and Android",
    marks: [{ src: "/logos/prevently.svg", ratio: "1 / 1", art: "/logos/color/prevently.svg" }],
    notionUrl: "https://preventlyapp.com",
    appStoreUrl:
      "https://apps.apple.com/ua/app/prevently-%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-%D0%BE%D0%B1%D1%81%D1%82%D0%B5%D0%B6%D0%B5%D0%BD%D1%8C/id6789842262",
    proof: {
      kind: "hero",
      mark: "Designed, built, shipped.",
      cap: "iOS in SwiftUI is live. Android in Kotlin is in review.",
      sr: "Designed, built and shipped by Lera. iOS in SwiftUI is live, Android in Kotlin is in review.",
    },
  },
  {
    slug: "comfy",
    title: "Comfy",
    fullTitle: "Comfy: UX Case Study",
    desc: "Redesigned the credit order flow to grow its share of orders.",
    meta: "2024 · E-commerce · Projector course, handed over to Comfy",
    marks: [
      { src: "/logos/comfy.svg", ratio: "33 / 36", art: "/logos/color/comfy.svg" },
      { src: "/logos/projector.svg", ratio: "74 / 32", color: "var(--brand-projector)" },
    ],
    notionUrl: "https://app.notion.com/p/Comfy-UX-Case-Study-23a9d4c6be1c4d28abaeb971a83b0e43",
    proof: {
      kind: "num",
      mark: "30% → 40%",
      cap: "credit order share, business goal",
      sr: "Business goal: grow the credit order share from 30% to 40%.",
    },
  },
  {
    slug: "adtelligent",
    title: "Adtelligent",
    fullTitle: "Solutions for Adtelligent (AdTech B2B SaaS platform)",
    desc: "Reports and a new overview built around what users check every day.",
    meta: "2025 · AdTech B2B SaaS",
    marks: [{ src: "/logos/adtelligent.svg", ratio: "40 / 35", art: "/logos/color/adtelligent.svg", overlay: true }],
    notionUrl: "https://app.notion.com/p/Solutions-for-Adtelligent-AdTech-B2B-SaaS-platform-26d44bdcbfce8057b34ecc668599d5f2",
    proof: {
      kind: "words",
      lines: ["Ad Requests", "Impressions", "Spent · eCPM"],
      cap: "what users open the platform for, every day",
      sr: "Users check ad requests, impressions, spend and eCPM every day.",
    },
  },
  {
    slug: "smart-financial-assistant",
    title: "Smart Financial Assistant",
    fullTitle: "From Transaction Log to Smart Financial Assistant",
    desc: "Turning a transaction log into an assistant people come back to.",
    meta: "2024 · Fintech · US market",
    marks: [{ src: "/logos/hubmee.svg", ratio: "38.92 / 38.06", color: "var(--brand-hubmee)" }],
    notionUrl: "https://app.notion.com/p/From-Transaction-Log-to-Smart-Financial-Assistant-24244bdcbfce8040876dfe857d29eb36",
    proof: { kind: "quote", mark: "“I connected my accounts… and then what?”", cap: "a user, before the redesign" },
  },
  {
    slug: "grg-design-system",
    title: "GRG Design System",
    fullTitle: "GRG Design System",
    desc: "A large design system with detailed component specs, plus a Storybook built from scratch.",
    meta: "Design system · Storybook",
    marks: [{ src: "/logos/grg.svg", ratio: "159 / 104.3", color: "var(--brand-grg)" }],
    proof: { kind: "specimen" },
  },
];

/** "More work": a plain list under the tiles. */
export const moreWork: CaseEntry[] = [
  {
    slug: "task-creation-reimagined",
    title: "Task Creation Reimagined",
    fullTitle: "Task Creation Reimagined",
    desc: "2025 · Sole designer. A simpler task creation flow and new repeat logic.",
    meta: "2025",
    notionUrl: "https://app.notion.com/p/Task-Creation-Reimagined-22f44bdcbfce803b8820ff2f98222f09",
  },
  {
    slug: "onboarding-ab-testing",
    title: "Onboarding through Hypotheses & A/B Testing",
    fullTitle: "Onboarding through Hypotheses & A/B Testing",
    desc: "2025 · Concept. Onboarding framed as a product experiment.",
    meta: "2025",
    notionUrl: "https://app.notion.com/p/Onboarding-through-Hypotheses-A-B-Testing-26e44bdcbfce8067a499f30c9ae13e82",
  },
  {
    slug: "mental-health-mvp",
    title: "Mental health support MVP",
    fullTitle: "Mental health support MVP",
    desc: "2023 · An MVP to help Ukrainians with information and practices.",
    meta: "2023",
    notionUrl: "https://app.notion.com/p/Case-Study-ce5fb0f537104a5eb7d2346460588691",
  },
  {
    slug: "dneprtest",
    title: "Dnipropetrovsk Regional Center for Educational Quality Assessment",
    fullTitle: "Dnipropetrovsk Regional Center for Educational Quality Assessment",
    desc: "UX audit and redesign of a public education website.",
    meta: "",
    notionUrl: "https://app.notion.com/p/Dnipropetrovsk-Regional-Center-for-Educational-Quality-Assessment-13b44bdcbfce8050b01ecb958ac85f3b",
  },
];

export const writing = [
  {
    title: "Місце, де UX помер",
    gloss: "Where UX died",
    url: "https://medium.com/@dynya.90/місце-де-ux-помер-0227edc2c2b7",
  },
  {
    title: "Hand-off без сліз: як не стати єдиним хранителем знань у команді",
    gloss: "Hand-off without tears: how not to become the only keeper of knowledge on your team",
    url: "https://medium.com/@dynya.90/hand-off-без-сліз-як-не-стати-єдиним-хранителем-знань-у-команді-415ebc85b2c9",
  },
];

export const contact = {
  closing: "Looking for a product designer who",
  accent: "also ships?",
  after: "Let’s talk.",
  cv: "CV · coming soon",
};

/** Greeting on the first visit: English first, then Ukrainian. Never Russian or Belarusian. */
export const greetingWords = ["Hello", "Привіт", "Hola", "Bonjour", "Ciao", "Cześć", "Hallo", "Olá", "こんにちは"];

export const allCases = [...featured, ...moreWork];
