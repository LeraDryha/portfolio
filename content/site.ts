import grgParts from "./grg-assemble.json";

// Everything on the site that is not a case page body.
// Case pages live in content/work/<slug>.mdx (registered in lib/cases.ts).

/** The product shown inside a tile and, the same element, at the top of its case page. */
export type Vis =
  | Bloom // the flower opens into a lock screen with the app's reminders (Prevently)
  | Story // whole screens: zoom into the before, wipe to the after, zoom in, then a drawer slides in; a comment opens on each step
  | { kind: "name"; src: string; width: number; height: number; alt: string } // a new report's title typed in place: close up on the tile, the whole screen on the case
  | { kind: "phones"; src: string } // a 4 × 2 sheet of phone screens, one after another
  | Log // a transaction log turns into the recurring payments screen, the forecast fills, a reminder arrives (Smart Financial Assistant)
  | Assemble; // a product put together from its parts, primitive to page (GRG); live on the case page

export type Shot = { src: string; alt: string };

/** Smart Financial Assistant: the log of transactions becomes the recurring payments screen. */
export type Log = {
  kind: "log";
  /** The transactions, top to bottom; a group marks a recurring payment */
  rows: { logo: string; name: string; date: string; amount: string; group?: number }[];
  /** The groups of recurring payments, in order */
  groups: { label: string; total: string }[];
  forecast: { title: string; total: string; mark: string; axis: [string, string, string] };
  /** The reminder that arrives at the end (a concept from the case's What's next) */
  reminder: { logo: string; title: string; body: string };
};

/** Prevently: the flower turns and opens, a lock screen shows through, the app's reminders arrive one by one. */
export type Bloom = {
  kind: "bloom";
  logo: string;
  /** The lock screen inside the glass phone */
  time: string;
  date: string;
  notes: { title: string; body: string }[];
  /** The app icon on the reminders */
  icon: string;
  /** Counted up at the end: the first big, the rest in a row under it; star: a rating */
  figures: { to: number; decimals?: number; suffix?: string; star?: boolean; cap: string }[];
};

/** A point on a screenshot, as fractions of its width and height (0–1). */
export type Point = { x: number; y: number };

/** Where the camera looks: zoom s, with point (x, y) of the screenshot brought to the centre. */
export type Focus = Point & { s: number };

/** An open Figma comment: the tip of the pin sits on a point of the screenshot, the note opens above it, to the left or the right. */
export type Pin = Point & { side: "left" | "right"; who: string; text: string };

export type Story = {
  kind: "story";
  /** Screenshot width / height; every screen of the story shares it */
  ratio: number;
  before: Shot;
  after: Shot;
  /** A drawer over the after: its left edge as a fraction of the width, full height */
  drawer: Shot & { left: number };
  /** Where the camera zooms on the before and on the after; the drawer is shown whole */
  focus: { before: Focus; after: Focus };
  /** One comment per step */
  pins: { before: Pin; after: Pin; drawer: Pin };
};

/** A box on a screenshot, in the screenshot's pixels. */
export type Box = { name: string; x: number; y: number; w: number; h: number; custom?: boolean };

/** A product shown live on its case page: a Storybook story with its components layer, a screenshot until it loads. */
export type Live = {
  /** The same screen in both themes, width × height px */
  shots: { light: string; dark: string; alt: string };
  width: number;
  height: number;
  /** The parts the page lists before the frame reports its own (custom = made for this page only) */
  boxes: Box[];
  /** try: what to click, under the title */
  live: { storybook: string; story: string; title: string; try?: string };
};

/**
 * GRG on its tile: primitives become tokens, tokens components, components the Invoices page,
 * from the real parts captured in the Storybook (npm run grg:assemble → parts, images).
 */
export type Assemble = Live & {
  kind: "assemble";
  parts: {
    width: number;
    height: number;
    parts: Record<string, { x: number; y: number; w: number; h: number }>;
    themes: Record<"light" | "dark", { page: string; surface: string; divider: string; tokens: { name: string; primitive: string; hex: string }[]; primitives: { name: string; hex: string }[] }>;
  };
  /** Where the part images live: <dir>/<theme>/<part>.webp */
  dir: string;
};

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
  /** The tile's headline: one real piece of evidence (left out when the case can't show one) */
  proof?: { text: string; cap?: string; quote?: boolean };
  vis: Vis;
  /** Tile shape in the bento */
  shape: "brand" | "wide-tall" | "wide-side" | "tall" | "wide";
  /** Its place in the desktop bento (grid area) */
  area: "prevently" | "grg" | "comfy" | "adtelligent" | "sfa";
  /** The three lead cases: the product fills the tile, the name and one small fact sit at the bottom on a blur of it */
  full?: { fact: string; /** the product stays light at night, so the caption does too */ lightProduct?: boolean };
  cursor?: Cursor;
  notionUrl?: string;
};

export const person = {
  name: "Lera Starychenko",
  fullName: "Valeriia Starychenko",
  role: "Product Designer",
  email: "dryga_v@yahoo.com",
  linkedin: "https://www.linkedin.com/in/valeriia-starychenko-37b083247/",
  telegram: "https://t.me/lera_starychenko",
  medium: "https://medium.com/@dynya.90",
};

export const intro = {
  lead: "Hi, I’m Lera,",
  accent: "a product designer.",
  // What she brings to a team, from her own profile: platforms, domains, the whole process, design systems
  text: "I design web and native iOS and Android products, B2B and B2C, in fintech, adtech, healthtech and e-commerce. From research and usability tests to design systems that hold up in code.",
};

/** Writing: Lera's articles on Medium, in Ukrainian (marked as such on the English site). */
export const articles = [
  { title: "Місце, де UX помер", href: "https://medium.com/@dynya.90/місце-де-ux-помер-0227edc2c2b7" },
  { title: "Hand-off без сліз: як не стати єдиним хранителем знань у команді", href: "https://medium.com/@dynya.90/hand-off-без-сліз-як-не-стати-єдиним-хранителем-знань-у-команді-415ebc85b2c9" },
];

const APP_STORE =
  "https://apps.apple.com/ua/app/prevently-%D1%82%D1%80%D0%B5%D0%BA%D0%B5%D1%80-%D0%BE%D0%B1%D1%81%D1%82%D0%B5%D0%B6%D0%B5%D0%BD%D1%8C/id6789842262";

export const links = { preventlyApp: APP_STORE, preventlySite: "https://preventlyapp.com" };

/** Comfy's product, alive: the old and the new product page, whole and in scale. */
const comfyVis: Story = {
  kind: "story",
  ratio: 2506 / 2074,
  before: { src: "/work/comfy/before.webp", alt: "Comfy product page before the redesign: a generic monobank tooltip and a separate “Buy on credit” button" },
  after: { src: "/work/comfy/after-1.webp", alt: "After the redesign: “Pay in installments, from 1,233.27 ₴ a month” next to “Buy”, with every bank offer below" },
  drawer: { src: "/work/comfy/drawer.webp", alt: "Installment offers with “How it works” open: what is charged today, then each month", left: 505 / 2506 },
  focus: {
    before: { s: 1.5, x: 0.667, y: 0.456 },
    after: { s: 1.75, x: 0.714, y: 0.46 },
  },
  pins: {
    before: { x: 0.622, y: 0.592, side: "right", who: "Lera · needs improvement", text: "A click on a bank icon only shows general info, nothing about this purchase." },
    after: { x: 0.856, y: 0.421, side: "left", who: "Lera · design decision", text: "Not “Buy on credit”: that word made people anxious. Now it’s “Pay in installments”, with the monthly price." },
    drawer: { x: 0.44, y: 0.614, side: "right", who: "Lera · design decision", text: "“How it works” opens a clear timeline: what’s charged today, then every month." },
  },
};

/** GRG's product, alive: on the tile the Invoices page is put together from its parts; the case page embeds the Dashboard live. */
const grgVis: Assemble = {
  kind: "assemble",
  parts: grgParts,
  dir: "/work/grg-design-system/assemble",
  shots: {
    light: "/work/grg-design-system/dashboard-light.webp",
    dark: "/work/grg-design-system/dashboard-dark.webp",
    alt: "The GRG Dashboard: the menu, the total balance by coin, a chart of successful payments and the last transactions",
  },
  width: 1440,
  height: 900,
  boxes: [
    { name: "Page Header", x: 296, y: 84, w: 1120, h: 32 },
    { name: "Link", x: 589, y: 160, w: 52, h: 20 },
    { name: "Bar of shares", x: 320, y: 232, w: 321, h: 12, custom: true },
    { name: "Coin Icon", x: 320, y: 279, w: 24, h: 24 },
    { name: "Action Button", x: 621, y: 278, w: 20, h: 20 },
  ],
  live: {
    storybook: "https://grg-design-system.vercel.app",
    story: "in-product-dashboard--live-flow",
    title: "Dashboard, built only from the system",
    try: "Everything here is live: click around, it all works.",
  },
};

/** Cases in site order (tiles and "Next case"). The bento places them by shape. */
export const cases: CaseEntry[] = [
  {
    slug: "prevently",
    name: "Prevently.",
    line: "From idea to App Store, solo.",
    title: "Prevently",
    proof: { text: "Designed, built, shipped.", cap: "iOS live · Android in review" },
    vis: {
      kind: "bloom",
      logo: "/logos/prevently.svg",
      icon: "/logos/prevently-app.svg",
      time: "9:41",
      date: "Thursday, 12 November",
      // The app's own reminder texts (NotificationContent.swift), translated
      notes: [
        { title: "Check-up coming up", body: "In 7 days you have a mammography planned. There’s time to pick a clinic and book." },
        { title: "Check-up soon", body: "In 2 days: blood pressure." },
        { title: "Today: dentist", body: "Check-up day. Mark it in your plan when you’re done." },
        { title: "A check-up is due again", body: "There’s a check-up in your plan that’s time to repeat." },
      ],
      figures: [
        { to: 2650, cap: "Downloads in the first four months" },
        { to: 39.5, decimals: 1, suffix: "%", cap: "App Store page conversion" },
        { to: 5, decimals: 1, star: true, cap: "Rating from 44 ratings" },
      ],
    },
    shape: "brand",
    area: "prevently",
    full: { fact: "iOS live · Android in review" },
  },
  {
    slug: "grg-design-system",
    name: "GRG Design System.",
    line: "From tokens to product.",
    title: "GRG Design System",
    proof: { text: "59 components. 12 live screens." },
    vis: grgVis,
    shape: "wide-tall",
    area: "grg",
    full: { fact: "59 components" },
  },
  {
    slug: "comfy",
    name: "Comfy.",
    line: "Making credit purchases clear and calm.",
    title: "Comfy: UX Case Study",
    proof: { text: "75% → 100%", cap: "task completion, Comfy today vs the redesign" },
    vis: comfyVis,
    shape: "wide-tall",
    area: "comfy",
    full: { fact: "75% → 100% task completion", lightProduct: true },
    notionUrl: "https://app.notion.com/p/Comfy-UX-Case-Study-23a9d4c6be1c4d28abaeb971a83b0e43",
  },
  {
    slug: "adtelligent",
    name: "Adtelligent.",
    line: "Reports built around what users check every day.",
    title: "Solutions for Adtelligent (AdTech B2B SaaS platform)",
    vis: { kind: "name", src: "/work/adtelligent/redesign/v1.webp", width: 1440, height: 960, alt: "A new report whose title becomes a field where its name is typed." },
    shape: "tall",
    area: "adtelligent",
    cursor: { role: "designer", label: "Product designer", x: "58%", y: "58%" },
    notionUrl: "https://app.notion.com/p/Solutions-for-Adtelligent-AdTech-B2B-SaaS-platform-26d44bdcbfce8057b34ecc668599d5f2",
  },
  {
    slug: "smart-financial-assistant",
    name: "Smart Financial Assistant.",
    line: "From transaction log to assistant.",
    title: "From Transaction Log to Smart Financial Assistant",
    vis: {
      kind: "log",
      rows: [
        { logo: "spotify", name: "Spotify", date: "Oct 18", amount: "−$10.99", group: 0 },
        { logo: "walmart", name: "Walmart", date: "Oct 17", amount: "−$78.00" },
        { logo: "netflix", name: "Netflix", date: "Oct 18", amount: "−$15.49", group: 0 },
        { logo: "starbucks", name: "Starbucks", date: "Oct 16", amount: "−$6.45" },
        { logo: "zillow", name: "Zillow Rentals", date: "Oct 24", amount: "−$1,450.00", group: 1 },
        { logo: "amazon", name: "Amazon", date: "Oct 15", amount: "−$32.89" },
        { logo: "conedison", name: "Con Edison", date: "Oct 30", amount: "−$110.00", group: 2 },
        { logo: "apple", name: "Apple", date: "Oct 14", amount: "−$2.99" },
      ],
      groups: [
        { label: "Subscription", total: "$1,095.00 per year" },
        { label: "Rent and mortgage", total: "$21,095.00 per year" },
        { label: "Utilities", total: "$3,095.00 per year" },
      ],
      forecast: { title: "Projected recurring expenses for December", total: "$1,280", mark: "$845", axis: ["$0", "$640", "$1,280"] },
      reminder: { logo: "spotify", title: "Spotify", body: "$10.99 is due today." },
    },
    shape: "tall",
    area: "sfa",
    cursor: { role: "research", label: "Researcher", x: "16%", y: "62%" },
    notionUrl: "https://app.notion.com/p/From-Transaction-Log-to-Smart-Financial-Assistant-24244bdcbfce8040876dfe857d29eb36",
  },
];

/** "Other work": smaller cases, square tiles in their own section under the bento, always visible. Each has its own page with a cover at the top. */
export type MoreEntry = {
  slug: string;
  title: string;
  meta: string;
  /** The picture at the top of the case page (no live product) */
  cover: { src: string; width: number; height: number; alt: string };
};

export const moreWork: MoreEntry[] = [
  { slug: "task-creation", title: "Task Creation Reimagined", meta: "2025", cover: { src: "/work/task-creation/01.webp", width: 1800, height: 1125, alt: "The redesigned task form and custom repeat beside the results: +94% task saves, ~96% faster task creation, −65% drop-offs in custom repeat setup, +22 SUS." } },
  { slug: "onboarding-ab-testing", title: "Onboarding through Hypotheses & A/B Testing", meta: "2025 · concept", cover: { src: "/work/onboarding-ab-testing/01.webp", width: 1800, height: 910, alt: "Onboarding screens of a heart rate measurement app." } },
  { slug: "mental-health-mvp", title: "Mental health support MVP", meta: "2023", cover: { src: "/work/mental-health-mvp/cover.webp", width: 1800, height: 1125, alt: "11 user interviews, 9 resources researched, 2 personas and journey maps; beside them the app’s home, a coping card and statistics." } },
  { slug: "dnipro-education-center", title: "Dnipropetrovsk Regional Center for Educational Quality Assessment", meta: "2023 · UX audit and redesign", cover: { src: "/work/dnipro-education-center/cover.webp", width: 1800, height: 1125, alt: "Usability results of the redesign: task completion 50% to 100%, time on task about 5 to 1.5 minutes, errors 5 to 0, satisfaction 2.16 to 4.14 out of 5; next to them the new main page on desktop and on a phone." } },
];

/** Greeting on the first visit: English first, then Ukrainian. Never Russian or Belarusian. */
export const greetingWords = ["Hello", "Привіт", "Hola", "Bonjour", "Ciao", "Cześć", "Hallo", "Olá", "こんにちは"];
