"use client";

import { useEffect, useRef } from "react";
import type { Assemble } from "@/content/site";
import { startAssemble } from "@/components/shell/assemble";

/** GRG's tile: the product put together from its real parts (see assemble.ts). Decorative: the tile's link names the case. */
export function AssembleVis({ v, viewTransitionName }: { v: Assemble; viewTransitionName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? startAssemble(ref.current, v) : undefined), [v]);
  return <div ref={ref} className="vis vis--full asm" style={{ viewTransitionName }} aria-hidden="true" />;
}
