import type { ComponentType, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { cases, moreWork, type CaseEntry, type MoreEntry } from "@/content/site";

/** What a case file exports besides its body (see content/work/*.mdx). */
export type CaseMeta = {
  /** The page's h1 */
  heading: string;
  /** A small line over the h1 (the case's name when the h1 is a thesis) */
  kicker?: string;
  lead: string;
  facts: { label: string; value: ReactNode; href?: string }[];
  /** The case in three blocks; short cases leave it out */
  answer?: { problem: ReactNode; did: ReactNode; result: ReactNode; /** "What we did" unless the work was one person's */ didTitle?: string };
  /** Figures under the result, three or four in a row */
  stats?: { value: string; cap: string }[];
  /** A live artefact to open, shown big after the facts (e.g. a Storybook) */
  cta?: { eyebrow?: string; title: string; line: string; href: string; action: string };
  /** One proof in the accent, under the summary */
  proof?: { mark: string; cap: string };
};

type CaseModule = { default: ComponentType<{ components?: MDXComponents }>; meta: CaseMeta };

/** Every case has a page. Add a line here when a new content/work/<slug>.mdx appears. */
const pages: Record<string, () => Promise<CaseModule>> = {
  prevently: () => import("@/content/work/prevently.mdx") as Promise<CaseModule>,
  comfy: () => import("@/content/work/comfy.mdx") as Promise<CaseModule>,
  "grg-design-system": () => import("@/content/work/grg-design-system.mdx") as Promise<CaseModule>,
  adtelligent: () => import("@/content/work/adtelligent.mdx") as Promise<CaseModule>,
  "smart-financial-assistant": () => import("@/content/work/smart-financial-assistant.mdx") as Promise<CaseModule>,
  "task-creation": () => import("@/content/work/task-creation.mdx") as Promise<CaseModule>,
  "onboarding-ab-testing": () => import("@/content/work/onboarding-ab-testing.mdx") as Promise<CaseModule>,
  "mental-health-mvp": () => import("@/content/work/mental-health-mvp.mdx") as Promise<CaseModule>,
  "dnipro-education-center": () => import("@/content/work/dnipro-education-center.mdx") as Promise<CaseModule>,
};

/** A page belongs either to a tile in the bento or to a "More work" card. */
export type PageEntry = CaseEntry | MoreEntry;
const order: PageEntry[] = [...cases, ...moreWork];

export const caseSlugs = Object.keys(pages);

export async function loadCase(slug: string) {
  const load = pages[slug];
  if (!load) return null;
  const mod = await load();
  const entry = order.find((c) => c.slug === slug)!;
  return { entry, meta: mod.meta, Body: mod.default };
}

/** A case page. A plain link on purpose: the full navigation lets the browser animate the tile into the page. */
export function caseHref(entry: PageEntry) {
  return `/work/${entry.slug}`;
}

/** The case after this one in site order (the tiles, then More work), wrapping around. */
export function nextCase(slug: string) {
  const i = order.findIndex((c) => c.slug === slug);
  return order[(i + 1) % order.length];
}
