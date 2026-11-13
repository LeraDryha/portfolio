"use client";

import { useState } from "react";

type Line = { before: string; why: string; after: string };

/** Real lines from the first version, rewritten: before (struck through) with what was wrong under it, then after.
 *  EN / UA reads them in English or in the app's original Ukrainian (from its Voice and Microcopy System). */
export function VoiceTable({ rows }: { rows: { en: Line; ua: Line }[] }) {
  const [lang, setLang] = useState<"en" | "ua">("en");
  return (
    <div className="voice-block">
      <div className="voice-block__bar">
        <div className="filter" role="group" aria-label="Language of the lines">
          <button className="filter__btn" type="button" aria-pressed={lang === "en"} aria-label="English" onClick={() => setLang("en")}>
            EN
          </button>
          <button className="filter__btn" type="button" aria-pressed={lang === "ua"} aria-label="Original, in Ukrainian" onClick={() => setLang("ua")}>
            UA
          </button>
        </div>
      </div>
      <div className="voice voice--lines">
        <table>
          <thead>
            <tr>
              <th scope="col">Before, and what was wrong</th>
              <th scope="col">After</th>
            </tr>
          </thead>
          <tbody lang={lang === "ua" ? "uk" : "en"}>
            {rows.map((r, i) => {
              const l = r[lang];
              return (
                <tr key={i}>
                  <td>
                    <s>{l.before}</s>
                    <span className="voice__why">{l.why}</span>
                  </td>
                  <td>{l.after}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
