"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { Mulish } from "next/font/google";
import { buildPlan, categories, exams, type Answer, type Category } from "@/content/prevently-plan";

// The Prevently app's typeface, for the plan inside the "Try it" phone only (not preloaded)
const mulish = Mulish({ subsets: ["latin"], weight: ["500", "600", "700"], preload: false, variable: "--font-prevently" });

const ICONS: Record<Category, ReactNode> = {
  lab: <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3M7.5 14h9" />,
  ins: <path d="M7 4h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 4V3h6v1M8 13h2l1.5-3 2 6 1.5-3h1" />,
  con: <path d="M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM5 20c1.2-3.5 4-5 7-5s5.8 1.5 7 5" />,
  vac: <path d="m17 3 4 4M19 5l-9 9M14 6l4 4M8 12l4 4M10 14l-5 5M4 20l1-1" />,
  q: <path d="M7 4h10a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM9 9h6M9 13h6M9 17h4" />,
};

const QUESTIONS: { group: string; items: { key: Answer; label: string }[] }[] = [
  { group: "Lifestyle", items: [{ key: "smoke", label: "I smoke" }, { key: "bmi", label: "BMI 25+ and little exercise" }] },
  {
    group: "In my family",
    items: [
      { key: "breast", label: "Breast cancer" },
      { key: "colon", label: "Bowel cancer" },
      { key: "htn", label: "High blood pressure" },
    ],
  },
];

/** "Try it": the app's real rules for five answers and an age; the plan answers in the app's own look. */
export function LivePlan() {
  const [age, setAge] = useState(29);
  const [answers, setAnswers] = useState<Set<Answer>>(new Set());
  const prev = useRef<Set<string>>(new Set());
  const items = buildPlan(age, answers);
  const fresh = new Set(items.filter((i) => prev.current.size && !prev.current.has(i.id)).map((i) => i.id));

  const change = (fn: () => void) => {
    prev.current = new Set(items.map((i) => i.id));
    fn();
  };
  const toggle = (k: Answer) =>
    change(() =>
      setAnswers((s) => {
        const n = new Set(s);
        if (n.has(k)) n.delete(k);
        else n.add(k);
        return n;
      }),
    );

  return (
    <div className="try">
      <div className="try__ask">
        <label className="try__label" htmlFor="try-age">
          Age <output htmlFor="try-age">{age}</output>
        </label>
        <input id="try-age" className="try__range" type="range" min={18} max={80} value={age} onChange={(e) => change(() => setAge(Number(e.target.value)))} />
        {QUESTIONS.map((q) => (
          <div key={q.group} className="try__group" role="group" aria-label={q.group}>
            <span className="try__label">{q.group}</span>
            <div className="try__toggles">
              {q.items.map((it) => (
                <button key={it.key} type="button" className="try__toggle" aria-pressed={answers.has(it.key)} onClick={() => toggle(it.key)}>
                  {it.label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <p className="try__fine">The app asks 15–25 questions and covers 114 check-ups; this demo uses five of them. Names are translated from the Ukrainian app.</p>
      </div>
      <div className={`try__phone ${mulish.variable}`} aria-live="polite">
        <div className="try__head">
          <b>Check-ups</b>
          <span>{items.length} in your plan</span>
        </div>
        {(Object.keys(categories) as Category[]).map((cat) => {
          const rows = items.filter((i) => exams[i.id][1] === cat);
          if (!rows.length) return null;
          return (
            <div key={cat} className="try__cat">
              <p className="try__cat-name">{categories[cat]}</p>
              {rows.map((i) => (
                <div key={i.id} className={fresh.has(i.id) ? "try__card is-new" : "try__card"}>
                  <span className={`try__icon try__icon--${cat}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {ICONS[cat]}
                    </svg>
                  </span>
                  <div>
                    <p className="try__name">{exams[i.id][0]}</p>
                    <p className="try__freq">↻ {i.freq}</p>
                    <p className="try__chips">
                      {i.why.map((w) => (
                        <span key={w}>{w}</span>
                      ))}
                    </p>
                    <p className="try__src">{i.sources.join(" · ")}</p>
                  </div>
                  {fresh.has(i.id) && <span className="try__new">New</span>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Code = { id: string; label: string; lines: string[] };

/** The same component in two languages, in tabs. Token names in ink, comments quiet (as on the GRG case). */
export function NativeCode({ tabs, label }: { tabs: Code[]; label: string }) {
  const [tab, setTab] = useState(tabs[0].id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs.find((t) => t.id === tab)!;
  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + tabs.length) % tabs.length;
    setTab(tabs[next].id);
    refs.current[next]?.focus();
  };
  const render = (line: string): ReactNode => {
    if (line.trimStart().startsWith("//")) return <i>{line}</i>;
    return line.split(/(\*\*[^*]+\*\*)/).map((p, i) => (p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : p));
  };
  return (
    <div className="code case-wide">
      <div className="code__tabs" role="tablist" aria-label={label}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`native-tab-${t.id}`}
            className="code__tab"
            type="button"
            role="tab"
            aria-selected={t.id === tab}
            aria-controls="native-panel"
            tabIndex={t.id === tab ? 0 : -1}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <pre className="code__body" id="native-panel" role="tabpanel" aria-labelledby={`native-tab-${tab}`} tabIndex={0}>
        <code>
          {current.lines.map((l, i) => (
            <span key={`${tab}-${i}`} className="code__line">
              {render(l)}
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

/** One phone screen in both themes: drag the line (or use the arrow keys) to compare. */
export function PhoneWipe({ light, dark, width, height, alt, caption }: { light: string; dark: string; width: number; height: number; alt: string; caption: string }) {
  // As on the GRG theme wipe: when the phone first comes into view, the line sweeps across once, then rests in the middle
  const [cut, setCut] = useState(100);
  const [sweeping, setSweeping] = useState(false);
  const box = useRef<HTMLSpanElement>(null);

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
        t1 = window.setTimeout(() => setCut(18), 50);
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
    <figure className="phone-wipe">
      <span ref={box} className={sweeping ? "device device--ios is-sweeping" : "device device--ios"} style={{ "--cut": `${cut}%` } as CSSProperties}>
        <span className="device__screen" style={{ width: `calc(var(--h) * (1 - 2 * var(--ratio-device-pad)) * ${width} / ${height})` }}>
          <Image src={light} alt={`${alt}, light theme`} fill sizes="320px" quality={90} />
          <span className="phone-wipe__dark">
            <Image src={dark} alt={`${alt}, dark theme`} fill sizes="320px" quality={90} />
          </span>
          <span className="phone-wipe__line" aria-hidden="true">
            <span>Light · Dark</span>
          </span>
          <input
            className="phone-wipe__range"
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
        </span>
      </span>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
