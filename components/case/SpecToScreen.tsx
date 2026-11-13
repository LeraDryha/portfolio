"use client";

import { useState } from "react";
import { Phone } from "@/components/case/PreventlyBlocks";

/** A line of a spec document: a heading, a paragraph, a "Key: value" line or a list item with a bold lead. */
export type SpecLine = { h: string } | { p: string } | { k: string; v: string } | { li: string; lead?: string } | { code: string };
export type SpecExample = {
  id: string;
  tab: string;
  file: string;
  /** The same lines in the spec's language and in English */
  ua: SpecLine[];
  en: SpecLine[];
  screen: { src: string; width: number; height: number; alt: string };
  caption: string;
};

function Line({ l }: { l: SpecLine }) {
  if ("h" in l) return <p className="spec__h">{l.h}</p>;
  if ("p" in l) return <p className="spec__p">{l.p}</p>;
  if ("code" in l) return <code className="spec__code">{l.code}</code>;
  if ("k" in l)
    return (
      <p className="spec__kv">
        <b>{l.k}:</b> {l.v}
      </p>
    );
  return (
    <p className="spec__li">
      {l.lead && <b>{l.lead}</b>} {l.li}
    </p>
  );
}

/** A real spec, as written before the code, beside the screen built from it. Tabs for the examples; the spec reads in
 *  English or in its original Ukrainian. */
export function SpecToScreen({ examples }: { examples: SpecExample[] }) {
  const [id, setId] = useState(examples[0].id);
  const [lang, setLang] = useState<"en" | "ua">("en");
  const ex = examples.find((e) => e.id === id)!;
  return (
    <div className="spec case-wide">
      <div className="spec__bar">
        <div className="filter" role="group" aria-label="Example">
          {examples.map((e) => (
            <button key={e.id} className="filter__btn" type="button" aria-pressed={e.id === id} onClick={() => setId(e.id)}>
              {e.tab}
            </button>
          ))}
        </div>
        <div className="filter" role="group" aria-label="Language of the spec">
          <button className="filter__btn" type="button" aria-pressed={lang === "en"} aria-label="English" onClick={() => setLang("en")}>
            EN
          </button>
          <button className="filter__btn" type="button" aria-pressed={lang === "ua"} aria-label="Original, in Ukrainian" onClick={() => setLang("ua")}>
            UA
          </button>
        </div>
      </div>
      <div className="spec__pair">
        <div className="spec__doc">
          <p className="spec__file">
            <span className="spec__kind">Excerpt from the spec</span>
            <span>{ex.file}</span>
          </p>
          <div className="spec__body" lang={lang === "ua" ? "uk" : "en"}>
            {(lang === "en" ? ex.en : ex.ua).map((l, i) => (
              <Line key={`${ex.id}-${lang}-${i}`} l={l} />
            ))}
          </div>
        </div>
        <Phone os="ios" size="lg" shot={{ ...ex.screen, caption: ex.caption }} />
      </div>
    </div>
  );
}
