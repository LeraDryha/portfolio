import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import { allCases, type CaseEntry } from "@/content/site";
import type { Phase } from "@/components/shell/CaseIndex";

export type CaseMeta = {
  lead: string;
  facts: { label: string; value: string }[];
  answer: { problem: string; did: string; result: string };
  proof: { mark: string; cap: string; sr: string };
  hero: { src: string; width: number; height: number; alt: string; label?: string; caption: string };
  phases: Phase[];
};

type CaseModule = { default: ComponentType<{ components?: MDXComponents }>; meta: CaseMeta };

/** Cases that have a written page. Add a line here when a new content/work/<slug>.mdx appears. */
const pages: Record<string, () => Promise<CaseModule>> = {
  comfy: () => import("@/content/work/comfy.mdx") as Promise<CaseModule>,
};

export const caseSlugs = Object.keys(pages);

export function hasPage(slug: string) {
  return slug in pages;
}

export async function loadCase(slug: string) {
  const load = pages[slug];
  if (!load) return null;
  const mod = await load();
  const entry = allCases.find((c) => c.slug === slug)!;
  return { entry, meta: mod.meta, Body: mod.default };
}

/** Where a case links to: its own page, or its Notion page until the case page is written. */
export function caseHref(entry: CaseEntry): { href: string; external: boolean } | null {
  if (hasPage(entry.slug)) return { href: `/work/${entry.slug}`, external: false };
  if (entry.notionUrl) return { href: entry.notionUrl, external: true };
  return null;
}

/** The case after this one in site order, wrapping around. */
export function nextCase(slug: string) {
  const i = allCases.findIndex((c) => c.slug === slug);
  return allCases[(i + 1) % allCases.length];
}
