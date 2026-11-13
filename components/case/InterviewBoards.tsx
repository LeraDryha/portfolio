"use client";

import Image from "next/image";
import { useState } from "react";

type Board = { src: string; width: number; height: number; name: string; nameUa: string };

/** The interview guide (the questions we asked, in a numbered list) and every respondent's board as a small picture:
 *  the boards show the scale of the work but stay too small to read, because the respondents' answers are private.
 *  EN / UA reads the questions and names in English or in the original Ukrainian. */
export function InterviewBoards({ title, guide, boards, note }: { title: string; guide: { en: string; ua: string }[]; boards: Board[]; note: { en: string; ua: string } }) {
  const [lang, setLang] = useState<"en" | "ua">("en");
  return (
    <figure className="voices boards case-wide">
      <div className="voices__bar">
        <figcaption className="voices__title">{title}</figcaption>
        <div className="filter" role="group" aria-label="Language of the questions">
          <button className="filter__btn" type="button" aria-pressed={lang === "en"} aria-label="English" onClick={() => setLang("en")}>
            EN
          </button>
          <button className="filter__btn" type="button" aria-pressed={lang === "ua"} aria-label="Original, in Ukrainian" onClick={() => setLang("ua")}>
            UA
          </button>
        </div>
      </div>
      <div className="voices__panel" lang={lang === "ua" ? "uk" : "en"}>
        <div className="boards__guide">
          <p className="boards__label">{lang === "en" ? `Interview guide · ${guide.length} questions` : `Гайд інтерв’ю · ${guide.length} питання`}</p>
          <ol>
            {guide.map((q) => (
              <li key={q.en}>{q[lang]}</li>
            ))}
          </ol>
        </div>
        <ul className="boards__grid">
          {boards.map((b) => (
            <li key={b.src}>
              <button type="button" className="fig__zoom boards__shot" data-zoom={b.src} data-zoom-w={b.width} data-zoom-h={b.height} data-zoom-alt={`Interview board: ${b.name}`} data-zoom-cap={b.name} aria-label={`Open larger: interview board, ${b.name}`}>
                <Image src={b.src} width={b.width} height={b.height} alt={`Interview board: ${b.name}`} sizes="(max-width: 640px) 100vw, 340px" />
              </button>
              <span className="voices__name">{lang === "ua" ? b.nameUa : b.name}</span>
            </li>
          ))}
        </ul>
        <p className="voices__note">{note[lang]}</p>
      </div>
    </figure>
  );
}
