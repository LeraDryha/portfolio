"use client";

import { useEffect, useRef, type CSSProperties } from "react";

type Note = { text: string; /** a second sticky over the first: a detail (blue) or a warning (red) */ note?: string; tone?: "blue" | "red" };

/** A board of paper stickies, live rather than a picture: they drop onto the grey panel one by one when the board
 *  comes into view (still with reduced motion, and visible without script). The caption sits under it like a figure's. */
export function StickyBoard({ notes, caption, cols = 4 }: { notes: Note[]; caption: string; cols?: 3 | 4 | 5 }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.ready = "true";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="sticky-board">
      <div ref={ref} className={`sticky-board__grid sticky-board__grid--${cols}`}>
        {notes.map((n, i) => (
          <div key={n.text} className={n.tone === "red" ? "sticky-board__item sticky-board__item--wide" : "sticky-board__item"} style={{ "--i": i } as CSSProperties}>
            <p className="sticky sticky-board__note">{n.text}</p>
            {n.note && <p className={`sticky sticky-board__over sticky-board__over--${n.tone ?? "blue"}`}>{n.note}</p>}
          </div>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
