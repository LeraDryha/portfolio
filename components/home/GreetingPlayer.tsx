"use client";

import { useEffect } from "react";
import { greetingWords } from "@/content/site";

/** Plays the greeting once the curtain is down: words change, then the curtain slides up. Click or Esc skips. */
export function GreetingPlayer({ storageKey }: { storageKey: string }) {
  useEffect(() => {
    const el = document.getElementById("curtain");
    const w = document.getElementById("curtain-word");
    if (!el || !w || !el.classList.contains("curtain--on")) return;
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seq = reduce ? ["Hello"] : greetingWords;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;

    const finish = () => {
      clearTimeout(timer);
      if (el.classList.contains("curtain--on")) el.className = "curtain curtain--on curtain--leave";
    };
    const next = () => {
      i += 1;
      if (i < seq.length) {
        w.textContent = seq[i];
        w.lang = seq[i] === "Привіт" ? "uk" : "";
        timer = setTimeout(next, 170);
      } else finish();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };

    w.textContent = seq[0];
    timer = setTimeout(next, reduce ? 700 : 380);
    el.addEventListener("click", finish);
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      el.removeEventListener("click", finish);
      document.removeEventListener("keydown", onKey);
    };
  }, [storageKey]);

  return null;
}
