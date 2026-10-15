"use client";

import { useEffect } from "react";

/** Case page behaviour: Esc closes the case, a back-to-top button after scrolling, live sizes on Figma selections. */
export function CaseBehavior() {
  useEffect(() => {
    const close = document.querySelector<HTMLAnchorElement>("[data-close]");
    const top = document.querySelector<HTMLButtonElement>("[data-to-top]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && close) window.location.href = close.href;
    };
    const onScroll = () => top?.classList.toggle("is-on", window.scrollY > 600);
    const toTop = () => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

    const frames = Array.from(document.querySelectorAll<HTMLElement>(".fig__frame"));
    const sizes = () =>
      frames.forEach((f) => {
        const b = f.querySelector(".sel b");
        if (b) b.textContent = `${Math.round(f.offsetWidth)} × ${Math.round(f.offsetHeight)}`;
      });
    const ro = new ResizeObserver(sizes);
    frames.forEach((f) => ro.observe(f));

    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    top?.addEventListener("click", toTop);
    onScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      top?.removeEventListener("click", toTop);
      ro.disconnect();
    };
  }, []);

  return null;
}
