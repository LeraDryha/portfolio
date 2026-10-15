"use client";

import { useEffect } from "react";
import { THEME_KEY } from "@/components/shell/theme";

const THEMES = ["auto", "light", "dark"] as const;
type Theme = (typeof THEMES)[number];

/**
 * Home page behaviour, wired onto server-rendered markup:
 * filter (All / About / Work / Writing), theme switch, More work, copy email,
 * tile animations and cursors waking up on screen, the live size on Figma selections,
 * and the visitor's "You" tag next to the pointer.
 */
export function HomeBehavior() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off: (() => void)[] = [];
    const on = <K extends keyof HTMLElementEventMap>(el: EventTarget, type: K | string, fn: (e: Event) => void, opts?: AddEventListenerOptions) => {
      el.addEventListener(type, fn, opts);
      off.push(() => el.removeEventListener(type, fn, opts));
    };

    /* Theme */
    const tbtn = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
    let mode: Theme = "auto";
    try {
      mode = (localStorage.getItem(THEME_KEY) as Theme) || "auto";
    } catch {}
    const paintTheme = () => {
      if (mode === "auto") root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", mode);
      if (!tbtn) return;
      tbtn.querySelector("use")?.setAttribute("href", `#i-${mode}`);
      const label = tbtn.querySelector("span");
      if (label) label.textContent = mode[0].toUpperCase() + mode.slice(1);
      tbtn.setAttribute("aria-label", `Theme: ${mode}`);
    };
    paintTheme();
    if (tbtn)
      on(tbtn, "click", () => {
        mode = THEMES[(THEMES.indexOf(mode) + 1) % THEMES.length];
        try {
          localStorage.setItem(THEME_KEY, mode);
        } catch {}
        paintTheme();
      });

    /* Live size on each Figma selection */
    const sized = Array.from(document.querySelectorAll<HTMLElement>(".sel")).map((s) => s.parentElement!);
    const sizes = () =>
      sized.forEach((el) => {
        const b = el.querySelector(":scope > .sel b");
        if (b) b.textContent = `${Math.round(el.offsetWidth)} × ${Math.round(el.offsetHeight)}`;
      });
    sizes();
    const ro = new ResizeObserver(sizes);
    sized.forEach((el) => ro.observe(el));
    off.push(() => ro.disconnect());

    /* Filter */
    const tiles = Array.from(document.querySelectorAll<HTMLElement>("#bento > [data-cat]"));
    const fbtns = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-filter]"));
    const moreRow = document.querySelector<HTMLElement>("[data-more-row]");
    const moreList = document.getElementById("more-list");
    const moreBtn = document.querySelector<HTMLButtonElement>("[data-more]");
    const filter = (f: string) => {
      fbtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
      tiles.forEach((t) => (t.hidden = !(f === "all" || t.dataset.cat === f)));
      const showMore = f === "all" || f === "work";
      if (moreRow) moreRow.hidden = !showMore;
      if (moreList && moreBtn) moreList.hidden = !showMore || moreBtn.getAttribute("aria-expanded") !== "true";
    };
    fbtns.forEach((b) =>
      on(b, "click", () => {
        const go = () => filter(b.dataset.filter!);
        const d = document as Document & { startViewTransition?: (cb: () => void) => unknown };
        if (d.startViewTransition && !reduce) d.startViewTransition(go);
        else go();
      }),
    );

    /* More work */
    if (moreBtn && moreList)
      on(moreBtn, "click", () => {
        const open = moreList.hidden;
        moreList.hidden = !open;
        moreBtn.setAttribute("aria-expanded", String(open));
        moreBtn.textContent = open ? "Less work" : "More work";
      });

    /* Copy email, with a short confirmation */
    document.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((btn) => {
      const toast = btn.querySelector<HTMLElement>(".toast");
      let timer: ReturnType<typeof setTimeout>;
      on(btn, "click", () => {
        const text = btn.dataset.copy!;
        const show = (t: string) => {
          if (!toast) return;
          toast.textContent = t;
          toast.classList.add("is-on");
          clearTimeout(timer);
          timer = setTimeout(() => toast.classList.remove("is-on"), 1800);
        };
        if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => show("Email copied"), () => show(text));
        else show(text);
      });
    });

    /* Animations and cursors wake up when a tile is on screen */
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          e.target.classList.toggle("is-running", e.isIntersecting);
          if (e.isIntersecting && !reduce) e.target.querySelectorAll("[data-cursor]:not(.is-in)").forEach((c) => c.classList.add("is-in"));
        }),
      { threshold: 0.25 },
    );
    tiles.forEach((t) => io.observe(t));
    off.push(() => io.disconnect());

    /* The visitor's own name tag, next to the real pointer */
    const you = document.getElementById("you");
    if (you && window.matchMedia("(pointer: fine)").matches) {
      on(document, "pointermove", (e) => {
        const p = e as PointerEvent;
        you.style.transform = `translate(${p.clientX + 14}px, ${p.clientY + 18}px)`;
        you.classList.add("is-on");
      });
      on(root, "pointerleave", () => you.classList.remove("is-on"));
    }

    return () => off.forEach((f) => f());
  }, []);

  return (
    <div className="you" id="you" aria-hidden="true">
      <span>You</span>
    </div>
  );
}
