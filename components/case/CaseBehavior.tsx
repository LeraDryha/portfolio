"use client";

import { useEffect } from "react";
import { motionOff } from "@/components/shell/motion";

/** Case page behaviour: Esc closes the case, a back-to-top button after scrolling, live sizes on Figma selections. */
export function CaseBehavior() {
  useEffect(() => {
    const close = document.querySelector<HTMLAnchorElement>("[data-close]");
    const top = document.querySelector<HTMLButtonElement>("[data-to-top]");
    const reduce = motionOff();

    const onKey = (e: KeyboardEvent) => {
      // Esc closes an open modal (the screen lightbox) first, and only then the case
      if (e.key === "Escape" && close && !document.querySelector("dialog[open]")) window.location.href = close.href;
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

    /* Copy the email at the end of the case, with a short confirmation */
    const copies = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-copy]"));
    let toastTimer = 0;
    const onCopy = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const toast = btn.parentElement?.querySelector<HTMLElement>("[role=status]");
      const show = (t: string) => {
        if (!toast) return;
        toast.textContent = t;
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => (toast.textContent = ""), 1800);
      };
      const text = btn.dataset.copy!;
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => show("Email copied"), () => show(text));
      else show(text);
    };
    copies.forEach((b) => b.addEventListener("click", onCopy));

    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    top?.addEventListener("click", toTop);
    onScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      top?.removeEventListener("click", toTop);
      ro.disconnect();
      copies.forEach((b) => b.removeEventListener("click", onCopy));
      window.clearTimeout(toastTimer);
    };
  }, []);

  return null;
}
