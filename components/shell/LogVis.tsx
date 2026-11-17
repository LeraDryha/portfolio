"use client";

import { useEffect, useState, type CSSProperties } from "react";
import type { Log } from "@/content/site";

const DIR = "/work/smart-financial-assistant/live";
const style = (vars: Record<string, string>) => vars as CSSProperties;

// Positions in the app's own points (a 375-point-wide screen): the log, then the recurring screen under the forecast
const LIST_TOP = 112;
const LIST_STEP = 66;
const GROUPS_TOP = 364;
const LABEL_H = 28;
const ROW_STEP = 62;
const GROUP_GAP = 20;

type State = { badges: number; gone: boolean; rec: boolean; forecast: 0 | 1 | 2 | 3; today: boolean; reminder: boolean; out: boolean };
const START: State = { badges: 0, gone: false, rec: false, forecast: 0, today: false, reminder: false, out: false };
const FINAL: State = { badges: 99, gone: true, rec: true, forecast: 3, today: true, reminder: true, out: false };

/**
 * Smart Financial Assistant on its tile and its case hero: the case in one loop. A log of transactions; the recurring
 * ones get a badge one by one and the rest drop out; the screen becomes Recurring (a fourth tab joins the tab bar),
 * the payments settle into their groups, the forecast fills, and a reminder for today's bill arrives.
 * Decorative (aria-hidden); with reduced motion the last frame rests.
 */
export function LogVis({ v, viewTransitionName }: { v: Log; viewTransitionName: string }) {
  const [s, setS] = useState<State>(START);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setS(FINAL);
      return;
    }
    const recurring = v.rows.filter((r) => r.group !== undefined).length;
    const timers: number[] = [];
    const run = () => {
      let t = 0;
      const at = (ms: number, patch: Partial<State> | ((p: State) => Partial<State>)) => {
        t += ms;
        timers.push(window.setTimeout(() => setS((p) => ({ ...p, ...(typeof patch === "function" ? patch(p) : patch) })), t));
      };
      setS(START);
      at(1400, { badges: 1 });
      for (let i = 1; i < recurring; i++) at(500, (p) => ({ badges: p.badges + 1 }));
      at(1100, { gone: true });
      at(700, { rec: true });
      at(1500, { forecast: 1 });
      at(500, { forecast: 2 });
      at(1900, { forecast: 3 });
      at(700, { today: true });
      at(500, { reminder: true });
      at(3800, { reminder: false });
      at(700, { out: true });
      t += 700;
      timers.push(window.setTimeout(run, t));
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [v]);

  // Where each recurring payment settles on the recurring screen, and where each group's label sits
  const groupY: number[] = [];
  const labelY: number[] = [];
  let y = GROUPS_TOP;
  v.groups.forEach((_, g) => {
    labelY[g] = y;
    y += LABEL_H;
    v.rows.forEach((r, i) => {
      if (r.group === g) {
        groupY[i] = y;
        y += ROW_STEP;
      }
    });
    y += GROUP_GAP;
  });

  let badge = 0;
  return (
    <div className="vis vis--inset log" style={style({ viewTransitionName })} aria-hidden="true">
      <div className="log__phone">
        <div className="log__screen">
          <div className="log__ui" data-rec={s.rec} data-out={s.out}>
            <div className="log__note" data-on={s.reminder}>
              <span className="log__logo" style={style({ "--logo": `url(${DIR}/${v.reminder.logo}.webp)` })} />
              <p>
                <b>
                  {v.reminder.title}
                  <em>now</em>
                </b>
                {v.reminder.body}
              </p>
            </div>
            <div className="log__nav">
              <p className="log__status">9:41</p>
              <p className="log__title">{s.rec ? "Recurring" : "Transaction"}</p>
            </div>
            <div className="log__forecast" data-step={s.forecast}>
              <p>{v.forecast.title}</p>
              <b>{v.forecast.total}</b>
              <div className="log__bar">
                <span className="log__mark-value">{v.forecast.mark}</span>
                <span className="log__track">
                  <span />
                </span>
                <span className="log__mark" />
              </div>
              <div className="log__axis">
                {v.forecast.axis.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>
            {v.groups.map((g, i) => (
              <p key={g.label} className="log__label" style={style({ "--y": String(labelY[i]) })}>
                {g.label}
                <span>{g.total}</span>
              </p>
            ))}
            {v.rows.map((r, i) => {
              const rec = r.group !== undefined;
              const marked = rec && badge++ < s.badges;
              const y = s.rec && rec ? groupY[i] : LIST_TOP + i * LIST_STEP;
              const isToday = s.today && i === v.rows.findIndex((x) => x.group !== undefined);
              return (
                <div
                  key={r.name}
                  className="log__row"
                  data-badge={marked && !s.rec}
                  data-gone={s.gone && !rec}
                  data-today={isToday}
                  style={style({ "--y": String(y) })}
                >
                  <span className="log__logo" style={style({ "--logo": `url(${DIR}/${r.logo}.webp)` })} />
                  <span className="log__badge">↻</span>
                  <span className="log__name">
                    {r.name}
                    <small>{isToday ? "Today" : r.date}</small>
                  </span>
                  <span className="log__amount">{r.amount}</span>
                </div>
              );
            })}
            <div className="log__tabs">
              {[
                ["home", "Home"],
                ["card", "Transaction"],
                ["bill", "Recurring"],
                ["wallet", "Wallet"],
              ].map(([icon, label]) => (
                <span
                  key={icon}
                  className="log__tab"
                  data-new={icon === "bill"}
                  data-active={s.rec ? icon === "bill" : icon === "card"}
                  style={style({ "--icon": `url(${DIR}/tab-${icon}.svg)` })}
                >
                  <i />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
