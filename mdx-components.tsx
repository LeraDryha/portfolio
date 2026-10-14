import type { MDXComponents } from "mdx/types";
import * as Blocks from "@/components/case/CaseBlocks";

/** Markdown in case files maps onto the kit: ### becomes a chapter sub-heading. */
const components: MDXComponents = {
  h3: ({ children }) => <h3 className="subhead">{children}</h3>,
  ...Blocks,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
