import type { MDXComponents } from "mdx/types";
import * as Blocks from "@/components/case/CaseBlocks";

/** Markdown in case files maps onto the kit through the .prose styles; the blocks add the rest. */
const components: MDXComponents = {
  ...Blocks,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
