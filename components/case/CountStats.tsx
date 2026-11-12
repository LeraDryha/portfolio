"use client";

import { useEffect, useRef, useState } from "react";

type Item = { value: string; cap: string };

/** "2,650" → 2650 with 0 decimals and no suffix; "39.5%" → 39.5, 1 decimal, "%". */
const parse = (v: string) => {
  const m = v.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const num = m[2].replace(/,/g, "");
  return { prefix: m[1], to: parseFloat(num), decimals: num.includes(".") ? num.split(".")[1].length : 0, suffix: m[3], grouped: m[2].includes(",") };
};
const show = (p: NonNullable<ReturnType<typeof parse>>, n: number) =>
  p.prefix + (p.grouped ? n.toLocaleString("en-US", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals }) : n.toFixed(p.decimals)) + p.suffix;

/** The figures under a case's result, counted up one after another when they come into view (as on the Prevently tile). */
export function CountStats({ items }: { items: Item[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(items.map((s) => s.value));

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const parsed = items.map((s) => parse(s.value));
    setShown(items.map((s, i) => (parsed[i] ? show(parsed[i]!, 0) : s.value)));
    const frames: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          let done = true;
          setShown(
            items.map((s, i) => {
              const p = parsed[i];
              if (!p) return s.value;
              const k = Math.max(0, Math.min(1, (t - t0 - i * 250) / 1200));
              if (k < 1) done = false;
              return show(p, p.to * (1 - Math.pow(1 - k, 3)));
            }),
          );
          if (!done) frames.push(requestAnimationFrame(tick));
          else setShown(items.map((s) => s.value));
        };
        frames.push(requestAnimationFrame(tick));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      frames.forEach((f) => cancelAnimationFrame(f));
    };
  }, [items]);

  return (
    <div ref={box} className={items.length === 4 ? "stats stats--4" : "stats"}>
      {items.map((s, i) => (
        <div className="stat" key={s.cap}>
          <b aria-hidden="true">{shown[i]}</b>
          <span>
            <span className="sr-only">{s.value} </span>
            {s.cap}
          </span>
        </div>
      ))}
    </div>
  );
}
