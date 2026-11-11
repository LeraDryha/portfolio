"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

type Screen = { name: string; light: string; dark: string; width: number; height: number; alt: string };

/**
 * Product screens in both themes at once: the light screen with the dark one over it, cut by a line that can be
 * dragged (or moved with the arrow keys). When the screen first comes into view, the line sweeps across once.
 */
export function ThemeShowcase({ screens }: { screens: Screen[] }) {
  const [current, setCurrent] = useState(0);
  const [cut, setCut] = useState(100);
  const [sweeping, setSweeping] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const s = screens[current];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCut(50);
      return;
    }
    let t1 = 0, t2 = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setSweeping(true);
        t1 = window.setTimeout(() => setCut(8), 50);
        t2 = window.setTimeout(() => setCut(50), 1800);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <figure className="showcase case-wide">
      <div className="showcase__bar">
        <div className="filter" role="group" aria-label="Product">
          {screens.map((sc, i) => (
            <button key={sc.name} className="filter__btn" type="button" aria-pressed={i === current} onClick={() => setCurrent(i)}>
              {sc.name}
            </button>
          ))}
        </div>
        <span className="showcase__hint">Drag the line: light on the left, dark on the right</span>
      </div>
      <div
        ref={box}
        className={sweeping ? "wipe is-sweeping" : "wipe"}
        style={{ aspectRatio: `${s.width} / ${s.height}`, "--cut": `${cut}%` } as CSSProperties}
      >
        <Image className="wipe__img" src={s.light} alt={`${s.alt}, light theme`} fill sizes="(max-width: 860px) 100vw, 1100px" quality={90} />
        <div className="wipe__dark">
          <Image className="wipe__img" src={s.dark} alt={`${s.alt}, dark theme`} fill sizes="(max-width: 860px) 100vw, 1100px" quality={90} />
        </div>
        <span className="wipe__line" aria-hidden="true">
          <span>Light · Dark</span>
        </span>
        <input
          className="wipe__range"
          type="range"
          min={0}
          max={100}
          value={Math.round(cut)}
          aria-label="Move the line between the light and the dark theme"
          onChange={(e) => {
            setSweeping(false);
            setCut(Number(e.target.value));
          }}
        />
      </div>
      <figcaption className="showcase__cap">{s.alt}. The same tokens on both sides of the line.</figcaption>
    </figure>
  );
}
