"use client";

import { useState, type ReactNode } from "react";

type Quote = { name: string; nameUa: string; en: string; ua: string };

/** The part of a quote between ** marks is its key phrase, set in the accent. */
function Marked({ text }: { text: string }): ReactNode {
  return text.split("**").map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/** Interview quotes as separate cards, three in a row: the quote in the voice face with its key phrase in the
 *  accent, the first name under it. EN / UA reads them in English or in the original Ukrainian. */
export function InterviewQuotes({ title, quotes }: { title: string; quotes: Quote[] }) {
  const [lang, setLang] = useState<"en" | "ua">("en");
  return (
    <figure className="voices case-wide">
      <div className="voices__bar">
        <figcaption className="voices__title">{title}</figcaption>
        <div className="filter" role="group" aria-label="Language of the quotes">
          <button className="filter__btn" type="button" aria-pressed={lang === "en"} aria-label="English" onClick={() => setLang("en")}>
            EN
          </button>
          <button className="filter__btn" type="button" aria-pressed={lang === "ua"} aria-label="Original, in Ukrainian" onClick={() => setLang("ua")}>
            UA
          </button>
        </div>
      </div>
      <ul className="voices__list" lang={lang === "ua" ? "uk" : "en"}>
        {quotes.map((q) => (
          <li key={q.name} className="voices__card">
            <blockquote>
              <p>
                <Marked text={q[lang]} />
              </p>
            </blockquote>
            <span className="voices__name">{lang === "ua" ? q.nameUa : q.name}</span>
          </li>
        ))}
      </ul>
      <p className="voices__note">{lang === "en" ? "Translated from Ukrainian; first names only." : "Оригінальні цитати з інтерв’ю."}</p>
    </figure>
  );
}
