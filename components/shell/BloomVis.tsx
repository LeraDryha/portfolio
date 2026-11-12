"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import type { Bloom } from "@/content/site";

const EASE = "cubic-bezier(.2, .8, .2, 1)";
// The loop, in ms: the flower turns → a glass phone with the lock screen → reminders arrive in it →
// the phone slides away → the figures count up → everything fades and the flower comes back
const T = { flower: 0, phone: 2200, note: 3400, noteStep: 1300, away: 8000, figures: 8800, out: 13600, loop: 14400 };
const SHOWN = 3;

const format = (n: number, decimals: number) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

/**
 * Prevently on its tile and its case hero. The flower turns, then a phone in iOS glass shows the lock screen and
 * the app's real reminders arrive in it; the phone slides away and the results count up. Decorative (aria-hidden):
 * with reduced motion the figures rest on the screen.
 */
export function BloomVis({ v, viewTransitionName }: { v: Bloom; viewTransitionName: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = <E extends HTMLElement>(s: string) => el.querySelector<E>(s)!;
    const flower = q(".bloom__flower");
    const phone = q(".bloom__phone");
    const stack = q(".bloom__stack");
    const figures = q(".bloom__figures");
    const nums = [...el.querySelectorAll<HTMLElement>(".bloom__figure b")];
    const makeNote = (n: { title: string; body: string }) => {
      const card = document.createElement("div");
      card.className = "bloom__note";
      // iOS lock-screen notification: the app icon, a bold title with the time on the right, the body under it
      card.innerHTML = `<span class="bloom__icon"></span><div><p class="bloom__head"><b></b><span>now</span></p><span class="bloom__body"></span></div>`;
      card.querySelector("b")!.textContent = n.title;
      card.querySelector(".bloom__body")!.textContent = n.body;
      return card;
    };
    const setFinal = () => nums.forEach((b, i) => (b.textContent = format(v.figures[i].to, v.figures[i].decimals ?? 0) + (v.figures[i].suffix ?? "")));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flower.style.opacity = "0";
      phone.style.opacity = "0";
      figures.style.opacity = "1";
      setFinal();
      return;
    }

    const timers: number[] = [];
    const frames: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const count = () =>
      nums.forEach((b, i) => {
        const f = v.figures[i];
        const start = performance.now() + (i === 0 ? 0 : 350);
        const tick = (t: number) => {
          const k = Math.max(0, Math.min(1, (t - start) / 1400));
          b.textContent = format(f.to * (1 - Math.pow(1 - k, 3)), f.decimals ?? 0) + (f.suffix ?? "");
          if (k < 1) frames.push(requestAnimationFrame(tick));
        };
        frames.push(requestAnimationFrame(tick));
      });

    const run = () => {
      stack.replaceChildren();
      nums.forEach((b, i) => (b.textContent = format(0, v.figures[i].decimals ?? 0) + (v.figures[i].suffix ?? "")));
      const d = T.loop;
      const o = (ms: number) => ms / d;
      flower.animate(
        [
          { opacity: 0, transform: "rotate(-40deg) scale(.7)", offset: 0 },
          { opacity: 1, transform: "rotate(0deg) scale(1)", offset: o(500), easing: "ease-in-out" },
          { opacity: 1, transform: "rotate(240deg) scale(1)", offset: o(T.phone - 200), easing: "ease-in" },
          { opacity: 0, transform: "rotate(300deg) scale(.35)", offset: o(T.phone + 400) },
          { opacity: 0, transform: "rotate(300deg) scale(.35)", offset: 1 },
        ],
        { duration: d, fill: "both" },
      );
      phone.animate(
        [
          { opacity: 0, transform: "translateY(24px) scale(.92)", offset: 0 },
          { opacity: 0, transform: "translateY(24px) scale(.92)", offset: o(T.phone), easing: EASE },
          { opacity: 1, transform: "none", offset: o(T.phone + 700) },
          { opacity: 1, transform: "none", offset: o(T.away), easing: "ease-in" },
          { opacity: 0, transform: "translateY(70%)", offset: o(T.away + 800) },
          { opacity: 0, transform: "translateY(70%)", offset: 1 },
        ],
        { duration: d, fill: "both" },
      );
      figures.animate(
        [
          { opacity: 0, transform: "translateY(12px)", offset: 0 },
          { opacity: 0, transform: "translateY(12px)", offset: o(T.figures), easing: EASE },
          { opacity: 1, transform: "none", offset: o(T.figures + 500) },
          { opacity: 1, transform: "none", offset: o(T.out) },
          { opacity: 0, transform: "none", offset: 1 },
        ],
        { duration: d, fill: "both" },
      );
      v.notes.forEach((n, i) =>
        at(T.note + i * T.noteStep, () => {
          const card = makeNote(n);
          stack.prepend(card);
          while (stack.children.length > SHOWN) stack.lastElementChild?.remove();
          card.animate([{ opacity: 0, transform: "translateY(-14px) scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: EASE });
        }),
      );
      at(T.figures + 200, count);
      at(d, run);
    };
    run();
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      frames.forEach((f) => cancelAnimationFrame(f));
      el.getAnimations({ subtree: true }).forEach((a) => a.cancel());
    };
  }, [v]);

  return (
    <div ref={root} className="vis vis--full bloom" style={{ viewTransitionName, "--logo": `url(${v.logo})` } as CSSProperties} aria-hidden="true">
      <span className="bloom__flower" />
      <div className="bloom__phone">
        <span className="bloom__island" />
        <div className="bloom__lock">
          <b>{v.time}</b>
          <span>{v.date}</span>
        </div>
        <div className="bloom__stack" />
      </div>
      <div className="bloom__figures">
        {v.figures.map((f, i) => (
          <div key={f.cap} className={i === 0 ? "bloom__figure bloom__figure--lead" : "bloom__figure"}>
            <b>0</b>
            <span>{f.cap}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
