"use client";

import { useEffect, useRef, useState } from "react";
import type { Assemble } from "@/content/site";
import { startAssemble, type Theme } from "@/components/shell/assemble";

/** The site's theme: a choice in the top bar, or the system's. */
const siteTheme = (): Theme => {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/** GRG's tile: the product put together from its real parts (see assemble.ts), in the site's theme. Decorative. */
export function AssembleVis({ v, viewTransitionName }: { v: Assemble; viewTransitionName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<Theme | null>(null);

  // Follow the site's theme: the product switches to the system's dark theme with it
  useEffect(() => {
    const follow = () => setTheme(siteTheme());
    follow();
    const mo = new MutationObserver(follow);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", follow);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", follow);
    };
  }, []);

  useEffect(() => (ref.current && theme ? startAssemble(ref.current, v, theme) : undefined), [v, theme]);
  return <div ref={ref} className="vis vis--full asm" style={{ viewTransitionName }} aria-hidden="true" />;
}
