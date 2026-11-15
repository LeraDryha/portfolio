"use client";

import { useState } from "react";

/* The Overview chart from Lera's Figma (Adverts – Publishers, Overview), rebuilt live: the three volume metrics as
   lines over a week; a click on a metric in the legend leaves only its line, a second click brings all three back.
   Points are traced from the Figma frame, in its own 552 × 283 coordinates, so the chart keeps the mock's shape. */

type Key = "req" | "opp" | "imp";
const SERIES: { key: Key; name: string; total: string; delta: string; points: [number, number][] }[] = [
  { key: "req", name: "Ad Requests", total: "8,285", delta: "2,28%", points: [[65, 221.5], [104, 219], [172, 121], [219, 113], [296, 116.5], [383, 143], [448, 152], [525, 120]] },
  { key: "opp", name: "Ad Opportunities", total: "8,285", delta: "2,28%", points: [[67, 219], [107, 221.5], [177, 125], [224, 107], [299, 109.5], [382, 157.5], [452, 111.5], [529, 115]] },
  { key: "imp", name: "Impressions Ads", total: "8,546", delta: "3,01%", points: [[70, 199.5], [110, 199.5], [170, 169], [228, 110], [296, 113.5], [383, 152], [448, 149], [525, 124.5]] },
];
const GRID: [number, string][] = [[98, "10,000"], [131, "7,500"], [164, "5,000"], [197, "2,500"], [230, "0"]];
const DATES: [number, string][] = [[105, "12/09"], [175, "12/10"], [245, "12/11"], [315, "12/12"], [377, "12/13"], [447, "12/14"], [517, "12/15"]];

export function AdtChart() {
  const [solo, setSolo] = useState<Key | null>(null);
  const shown = (k: Key) => solo === null || solo === k;

  return (
    <div className="adt-chart">
      <div className="adt-chart__legend" role="group" aria-label="Show one metric">
        {SERIES.map((s) => (
          <button key={s.key} type="button" className={`adt-chart__metric adt-chart__metric--${s.key}`} aria-pressed={solo === s.key} onClick={() => setSolo(solo === s.key ? null : s.key)}>
            <span className="adt-chart__name">{s.name}</span>
            <span className="adt-chart__total">
              {s.total} <small>▾ {s.delta}</small>
            </span>
          </button>
        ))}
      </div>
      <svg className="adt-chart__plot" viewBox="0 88 552 185" role="img" aria-label={solo ? `${SERIES.find((s) => s.key === solo)!.name} over the week` : "Ad Requests, Ad Opportunities and Impressions Ads over the week"}>
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

const COLUMNS = ["Date", "Ad Requests", "Ad Opportunities", "Impressions"];

function SortIcon() {
  return (
    <svg className="adt-pills__sort" viewBox="0 0 8 12" aria-hidden="true">
      <path d="M4 1 7 4.5H1zM4 11 1 7.5h6z" />
    </svg>
  );
}

/** The table's column pills, before and after: the sorting icon only on hover, then always there. */
export function AdtSortPills() {
  return (
    <div className="adt-pills">
      {[
        ["before", "Before: the icon only on hover (point at a column)"],
        ["after", "After: always visible"],
      ].map(([kind, label]) => (
        <div key={kind} className={`adt-pills__row adt-pills__row--${kind}`}>
          <p className="adt-pills__label">{label}</p>
          <div className="adt-pills__head">
            {COLUMNS.map((c) => (
              <span key={c} className="adt-pills__pill">
                {c}
                <SortIcon />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
