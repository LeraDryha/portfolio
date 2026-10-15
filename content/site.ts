// Everything on the site that is not a case page body.
// Case pages live in content/work/<slug>.mdx (registered in lib/cases.ts).

/** The product shown inside a tile and, the same element, at the top of its case page. */
export type Vis =
  | { kind: "reveal"; logo: string; screens: string[] } // logo appears, hides, then a strip of phone screens
  | { kind: "wipe"; before: { src: string; alt: string }; after: { src: string; alt: string }; pin?: Pin } // before and after
  | { kind: "pan"; src: string } // a report read top to bottom
  | { kind: "phones"; src: string } // a 4 × 2 sheet of phone screens, one after another
  | { kind: "spec" }; // type and colour chips being measured

/** An open Figma comment on the product. x and y place the pin, in % of the product area. */
export type Pin = { x: string; y: string; who: string; text: string };

/** A role cursor on a tile. x and y place it, in % of the tile. */
export type Cursor = { role: "lera" | "designer" | "developer" | "research"; label: string; x: string; y: string };

export type CaseEntry = {
  slug: string;
  /** Product name, bold on the tile */
  name: string;
  /** Short line after the name on the tile */
  line: string;
  /** Full title, used in "Next case" and the page title */
  title: string;
  /** The tile's headline: one real piece of evidence */
  proof: { text: string; cap?: string; quote?: boolean };
  vis: Vis;
  /** Tile shape in the bento */
  shape: "brand-tall" | "wide-tall" | "wide-side" | "tall" | "wide";
  cursor?: Cursor;
  notionUrl?: string;
};

export const person = {
  name: "Lera Dryha",
  fullName: "Valeriia Dryha",
  role: "Product Designer",
  email: "dryga_v@yahoo.com",
  linkedin: "https://www.linkedin.com/in/valeriia-dryha-37b083247/",
  medium: "https://medium.com/@dynya.90",
};

export const intro = {
  lead: "Hi, I’m Lera,",
  accent: "a product designer.",
  text: "I design intuitive interfaces for mobile and web, B2B and B2C.",
};

const APP_STORE =
  "https://apps.apple.com/ua/app/prevently-%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-%D0%BE%D0%B1%D1%81%D1%82%D0%B5%D0%B6%D0%B5%D0%BD%D1%8C/id6789842262";

export const links = { preventlyApp: APP_STORE, preventlySite: "https://preventlyapp.com" };

/** Cases in site order (tiles and "Next case"). The bento places them by shape. */
export const cases: CaseEntry[] = [
  {
    slug: "prevently",
    name: "Prevently.",
    line: "From idea to App Store, solo.",
    title: "Prevently",
    proof: { text: "Designed, built, shipped.", cap: "iOS live · Android in review" },
    vis: {
      kind: "reveal",
      logo: "/logos/prevently.svg",
      screens: [1, 2, 3, 4, 5].map((i) => `/work/prevently/screen-${i}.jpg`),
    },
    shape: "brand-tall",
  },
  {
    slug: "comfy",
    name: "Comfy.",
    line: "Making credit purchases clear and calm.",
    title: "Comfy: UX Case Study",
    proof: { text: "30% → 40%", cap: "credit order share, business goal" },
    vis: {
      kind: "wipe",
      before: { src: "/work/comfy/c15.jpg", alt: "Comfy product page before the redesign" },
      after: { src: "/work/comfy/c16.jpg", alt: "Comfy product page after the redesign, with “Pay in installments” next to “Buy”" },
      pin: { x: "80%", y: "66%", who: "Lera · design decision", text: "Renamed “Buy on credit” to “Pay in installments”: the word “credit” made people anxious." },
    },
    shape: "wide-tall",
    notionUrl: "https://app.notion.com/p/Comfy-UX-Case-Study-23a9d4c6be1c4d28abaeb971a83b0e43",
  },
  {
    slug: "grg-design-system",
    name: "GRG Design System.",
    line: "Plus a Storybook from scratch.",
    title: "GRG Design System",
    proof: { text: "Detailed component specs." },
    vis: { kind: "spec" },
    shape: "wide-side",
    cursor: { role: "developer", label: "Developer", x: "78%", y: "16%" },
  },
  {
    slug: "adtelligent",
    name: "Adtelligent.",
    line: "Reports built around what users check every day.",
    title: "Solutions for Adtelligent (AdTech B2B SaaS platform)",
    proof: { text: "Ad Requests · eCPM", cap: "what users check every day" },
    vis: { kind: "pan", src: "/work/adtelligent/report.jpg" },
    shape: "wide",
    cursor: { role: "designer", label: "UX designer", x: "58%", y: "58%" },
    notionUrl: "https://app.notion.com/p/Solutions-for-Adtelligent-AdTech-B2B-SaaS-platform-26d44bdcbfce8057b34ecc668599d5f2",
  },
  {
    slug: "smart-financial-assistant",
    name: "Smart Financial Assistant.",
    line: "From transaction log to assistant.",
    title: "From Transaction Log to Smart Financial Assistant",
    proof: { text: "“I connected my accounts… and then what?”", cap: "a user, before the redesign", quote: true },
    vis: { kind: "phones", src: "/work/smart-financial-assistant/screens.jpg" },
    shape: "tall",
    cursor: { role: "research", label: "Researcher", x: "16%", y: "62%" },
    notionUrl: "https://app.notion.com/p/From-Transaction-Log-to-Smart-Financial-Assistant-24244bdcbfce8040876dfe857d29eb36",
  },
];

/** "More work": small cards under the bento, behind a button. */
export const moreWork = [
  { title: "Task Creation Reimagined", meta: "2025", url: "https://app.notion.com/p/Task-Creation-Reimagined-22f44bdcbfce803b8820ff2f98222f09" },
  { title: "Onboarding through Hypotheses & A/B Testing", meta: "2025", url: "https://app.notion.com/p/Onboarding-through-Hypotheses-A-B-Testing-26e44bdcbfce8067a499f30c9ae13e82" },
  { title: "Mental health support MVP", meta: "2023", url: "https://app.notion.com/p/Case-Study-ce5fb0f537104a5eb7d2346460588691" },
  { title: "Dnipropetrovsk Regional Center for Educational Quality Assessment", meta: "UX audit", url: "https://app.notion.com/p/Dnipropetrovsk-Regional-Center-for-Educational-Quality-Assessment-13b44bdcbfce8050b01ecb958ac85f3b" },
];

/** Greeting on the first visit: English first, then Ukrainian. Never Russian or Belarusian. */
export const greetingWords = ["Hello", "Привіт", "Hola", "Bonjour", "Ciao", "Cześć", "Hallo", "Olá", "こんにちは"];
