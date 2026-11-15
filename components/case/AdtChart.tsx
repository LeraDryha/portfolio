"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* The Overview chart from Lera's Figma (Adverts – Publishers, Overview), rebuilt live: the three volume metrics as
   lines over a week; picking a metric in the legend leaves only its line. Points are traced from the Figma frame,
   in its own 552 × 283 coordinates, so the chart keeps the mock's shape. */

type Key = "req" | "opp" | "imp";
const SERIES: { key: Key; name: string; total: string; delta: string; points: [number, number][] }[] = [
  { key: "req", name: "Ad Requests", total: "8,285", delta: "2,28%", points: [[65, 221.5], [104, 219], [172, 121], [219, 113], [296, 116.5], [383, 143], [448, 152], [525, 120]] },
  { key: "opp", name: "Ad Opportunities", total: "8,285", delta: "2,28%", points: [[67, 219], [107, 221.5], [177, 125], [224, 107], [299, 109.5], [382, 157.5], [452, 111.5], [529, 115]] },
  { key: "imp", name: "Impressions Ads", total: "8,546", delta: "3,01%", points: [[70, 199.5], [110, 199.5], [170, 169], [228, 110], [296, 113.5], [383, 152], [448, 149], [525, 124.5]] },
];
const GRID: [number, string][] = [[98, "10,000"], [131, "7,500"], [164, "5,000"], [197, "2,500"], [230, "0"]];
const DATES: [number, string][] = [[105, "12/09"], [175, "12/10"], [245, "12/11"], [315, "12/12"], [377, "12/13"], [447, "12/14"], [517, "12/15"]];
/* The tour the chart plays by itself: all three, then each metric picked in turn */
const TOUR: (Key | null)[] = [null, "req", "opp", "imp"];
const TOUR_MS = 1800;

/**
 * The chart. With `auto` it plays the filtering by itself (a cursor picks each metric in turn) while it is on screen;
 * with reduced motion it simply shows all three lines.
 */
export function AdtChart({ auto = false }: { auto?: boolean }) {
  const [solo, setSolo] = useState<Key | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const shown = (k: Key) => solo === null || solo === k;

  useEffect(() => {
    const el = root.current;
    if (!auto || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (!e.isIntersecting) return;
      timer = window.setInterval(() => {
        step = (step + 1) % TOUR.length;
        setSolo(TOUR[step]);
      }, TOUR_MS);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto]);

  const at = solo ? SERIES.findIndex((s) => s.key === solo) : -1;

  return (
    <div ref={root} className={auto ? "adt-chart adt-chart--auto" : "adt-chart"}>
      <div className="adt-chart__legend" role={auto ? undefined : "group"} aria-label={auto ? undefined : "Show one metric"} aria-hidden={auto || undefined}>
        {SERIES.map((s) =>
          auto ? (
            <span key={s.key} className={`adt-chart__metric adt-chart__metric--${s.key}`} data-on={solo === s.key}>
              <span className="adt-chart__name">{s.name}</span>
              <span className="adt-chart__total">
                {s.total} <small>▾ {s.delta}</small>
              </span>
            </span>
          ) : (
            <button key={s.key} type="button" className={`adt-chart__metric adt-chart__metric--${s.key}`} aria-pressed={solo === s.key} onClick={() => setSolo(solo === s.key ? null : s.key)}>
              <span className="adt-chart__name">{s.name}</span>
              <span className="adt-chart__total">
                {s.total} <small>▾ {s.delta}</small>
              </span>
            </button>
          ),
        )}
        {/* The pointer that does the picking */}
        {auto && (
          <svg className="adt-chart__cursor" data-on={at >= 0} style={{ "--at": Math.max(at, 0) } as CSSProperties} viewBox="0 0 12 16" aria-hidden="true">
            <path d="M1 1v12.5l3.2-3 2.3 5 2-.9-2.2-4.9H10.5z" />
          </svg>
        )}
      </div>
      <svg className="adt-chart__plot" viewBox="0 88 552 185" role="img" aria-label={auto ? "Ad Requests, Ad Opportunities and Impressions Ads over the week; picking a metric in the legend leaves only its line" : solo ? `${SERIES.find((s) => s.key === solo)!.name} over the week` : "Ad Requests, Ad Opportunities and Impressions Ads over the week"}>
        {GRID.map(([y, label]) => (
          <g key={label}>
            <line className="adt-chart__grid" x1="62" x2="540" y1={y} y2={y} />
            <text className="adt-chart__tick" x="52" y={y + 4} textAnchor="end">
              {label}
            </text>
          </g>
        ))}
        {DATES.map(([x, d]) => (
          <text key={d} className="adt-chart__tick" x={x} y="262" textAnchor="middle">
            {d}
          </text>
        ))}
        {SERIES.map((s) => (
          <polyline key={s.key} className={`adt-chart__line adt-chart__line--${s.key}`} data-hidden={!shown(s.key)} points={s.points.map((p) => p.join(",")).join(" ")} />
        ))}
      </svg>
    </div>
  );
}

/**
 * The whole Overview screen with its volumes chart lifted off it, live: the rest of the screen stays in view under a
 * veil, so the chart is never cut out of its page; the chart plays its filtering by itself.
 */
export function AdtOverviewFocus({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  return (
    <div className="adt-focus">
      {/* eslint-disable-next-line @next/next/no-img-element -- the screen under the veil, sized by CSS */}
      <img className="adt-focus__screen" src={src} width={width} height={height} alt={alt} loading="lazy" />
      <div className="adt-focus__lift">
        <AdtChart auto />
      </div>
    </div>
  );
}
