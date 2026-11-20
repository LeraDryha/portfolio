"use client";

import { useEffect } from "react";
import { THEME_KEY } from "@/components/shell/theme";
import { motionOff, setMotion } from "@/components/shell/motion";

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

    /* Motion: pause or play every animation on the site (the live products rest on their still frame) */
    const mbtn = document.querySelector<HTMLButtonElement>("[data-motion-toggle]");
    const paintMotion = () => {
      if (!mbtn) return;
      const off = motionOff();
      const label = off ? "Play animations" : "Pause animations";
      mbtn.querySelector("use")?.setAttribute("href", off ? "#i-play" : "#i-pause");
      mbtn.setAttribute("aria-pressed", String(off));
      mbtn.setAttribute("aria-label", label);
      mbtn.title = label;
    };
    paintMotion();
    if (mbtn)
      on(mbtn, "click", () => {
        setMotion(!motionOff());
        paintMotion();
        // Cursors that waited for motion arrive now
        if (!motionOff()) document.querySelectorAll(".is-running [data-cursor]:not(.is-in)").forEach((c) => c.classList.add("is-in"));
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
    const more = document.querySelector<HTMLElement>("[data-more]");
    const filter = (f: string) => {
      fbtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
      tiles.forEach((t) => (t.hidden = !(f === "all" || t.dataset.cat === f)));
      const bento = document.getElementById("bento");
      if (bento) bento.dataset.view = f;
      // Other work shows with All and Work
      if (more) more.hidden = !(f === "all" || f === "work");
    };
    fbtns.forEach((b) =>
      on(b, "click", () => {
        const go = () => filter(b.dataset.filter!);
        const d = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
        if (d.startViewTransition && !motionOff()) {
          // While the tiles slide, the live products inside them move with their tile, not as their own layer
          document.documentElement.classList.add("is-filtering");
          d.startViewTransition(go).finished.finally(() => document.documentElement.classList.remove("is-filtering"));
        } else go();
      }),
    );

    /* Back from an Other work case: bring the list into view */
    if (location.hash === "#more-list") more?.scrollIntoView({ block: "center" });

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

    /* A case tile opens its case from anywhere on it, not only from its name: the live product inside sits above
       the name's stretched link, so a click on it is passed on to that link (with the same modifier keys). */
    document.querySelectorAll<HTMLElement>(".case-tile").forEach((tile) => {
      const link = tile.querySelector<HTMLAnchorElement>(".case-tile__name");
      if (!link) return;
      on(tile, "click", (e) => {
        const m = e as MouseEvent;
        if ((m.target as Element).closest("a, button")) return;
        link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, ctrlKey: m.ctrlKey, metaKey: m.metaKey, shiftKey: m.shiftKey, altKey: m.altKey }));
      });
      on(tile, "auxclick", (e) => {
        const m = e as MouseEvent;
        if (m.button === 1 && !(m.target as Element).closest("a, button")) window.open(link.href, "_blank", "noopener");
      });
    });

    /* Animations and cursors wake up when a tile is on screen */
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          e.target.classList.toggle("is-running", e.isIntersecting);
          if (e.isIntersecting && !motionOff()) e.target.querySelectorAll("[data-cursor]:not(.is-in)").forEach((c) => c.classList.add("is-in"));
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
