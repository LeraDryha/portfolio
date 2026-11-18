import { loadCase, caseSlugs } from "@/lib/cases";
import { ogCard, ogCover, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A case study by Lera Starychenko, product designer.";

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

/** A More work case shows its cover; a lead case (a live product on its tile) gets a text card with its proof. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await loadCase(slug);
  if (!c) return ogCard({ kicker: "Lera Starychenko", title: "Product designer" });
  if ("cover" in c.entry) return ogCover(c.entry.cover.src);
  return ogCard({ kicker: "Case study · Product designer", title: c.entry.title, mark: c.meta.proof?.mark, cap: c.meta.proof?.cap });
}
