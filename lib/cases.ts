import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { cases, type CaseEntry } from "@/content/site";

/** What a case file exports besides its body (see content/work/*.mdx). */
export type CaseMeta = {
  /** The page's h1 */
  heading: string;
  lead: string;
  facts: { label: string; value: string }[];
  /** The case in three blocks; short cases leave it out */
  answer?: { problem: string; did: string; result: string };
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
};

export const caseSlugs = Object.keys(pages);

export async function loadCase(slug: string) {
  const load = pages[slug];
  if (!load) return null;
  const mod = await load();
  const entry = cases.find((c) => c.slug === slug)!;
  return { entry, meta: mod.meta, Body: mod.default };
}

/** A case page. A plain link on purpose: the full navigation lets the browser animate the tile into the page. */
export function caseHref(entry: CaseEntry) {
  return `/work/${entry.slug}`;
}

/** The case after this one in site order, wrapping around. */
export function nextCase(slug: string) {
  const i = cases.findIndex((c) => c.slug === slug);
  return cases[(i + 1) % cases.length];
}
