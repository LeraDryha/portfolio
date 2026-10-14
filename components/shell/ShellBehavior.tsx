"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Shell behaviour, shared by every page:
 * - index links get aria-current="location" for the section in view;
 * - on case pages the phase being read fills in proportion to reading progress,
 *   finished phases get .is-done, and the phone bar names the current section.
 * Same logic as ui/shell.html.
 */
export function ShellBehavior() {
  // Re-bind on every client-side navigation: the layout (and this component) stays mounted,
  // but the page's index links and sections are new elements.
  const pathname = usePathname();

  useEffect(() => {
    const LINE = 0.35;
    const spyLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".index a[href^='#']:not(.index__back)"));
    const sections = spyLinks
      .map((a) => document.getElementById(a.getAttribute("href")!.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    const phaseLinks = Array.from(document.querySelectorAll<HTMLElement>("[data-phase], [data-hphase]"));
    const now = document.querySelector<HTMLElement>(".bar__now");
    let ticking = false;
    // A section picked from the menu stays current while it is on screen, even when it is
    // too close to the bottom to reach the line; any scrolling by the reader releases it.
    let picked: string | null = null;

    const progressOf = (el: HTMLElement, line: number) => {
      const r = el.getBoundingClientRect();
      return Math.max(0, Math.min(1, (line - r.top) / r.height));
    };

    const update = () => {
      ticking = false;
      const line = window.innerHeight * LINE;
      let current = sections[0]?.id ?? null;
      sections.forEach((s) => {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      });
      // At the very bottom the last sections can never reach the line: treat the last one as current.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom && sections.length) current = sections[sections.length - 1].id;
      const pickedEl = picked ? document.getElementById(picked) : null;
      if (pickedEl && pickedEl.getBoundingClientRect().top < window.innerHeight) current = pickedEl.id;

      spyLinks.forEach((a) => {
        if (a.getAttribute("href") === `#${current}`) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });

      phaseLinks.forEach((link) => {
        const id = link.getAttribute("data-phase") || link.getAttribute("data-hphase");
        const sec = id ? document.getElementById(id) : null;
        if (!sec) return;
        const prog = progressOf(sec, line);
        const isCur = id === current;
        const done = !isCur && prog >= 1;
        link.classList.toggle("is-done", done);
        if (isCur) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
        const fill = link.querySelector(".phase__fill");
        const amount = isCur ? prog : done ? 1 : 0;
        if (!fill) return;
        if (link.hasAttribute("data-phase")) fill.setAttribute("height", String(amount * 34));
        else fill.setAttribute("width", String(amount * 26));
      });

      if (now && current) now.textContent = current;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onPick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href^='#']");
      const id = a?.getAttribute("href")!.slice(1);
      if (id && sections.some((s) => s.id === id)) {
        picked = id;
        onScroll();
      }
    };
    const release = () => {
      picked = null;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("click", onPick);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", release);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("click", onPick);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", release);
    };
  }, [pathname]);

  return null;
}
