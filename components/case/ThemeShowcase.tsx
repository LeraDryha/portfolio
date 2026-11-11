"use client";

import Image from "next/image";
import { useState } from "react";

type Screen = { name: string; light: string; dark: string; width: number; height: number; alt: string };

/**
 * Product screens built on the system, big, with a switch between them and between the light and the dark theme.
 * Both themes of a screen are drawn on top of each other; the switch fades one into the other.
 */
export function ThemeShowcase({ screens }: { screens: Screen[] }) {
  const [current, setCurrent] = useState(0);
  const [dark, setDark] = useState(false);
  const s = screens[current];
  return (
    <figure className="showcase case-wide">
      <div className="showcase__bar">
        <div className="filter" role="group" aria-label="Screen">
          {screens.map((sc, i) => (
            <button key={sc.name} className="filter__btn" type="button" aria-pressed={i === current} onClick={() => setCurrent(i)}>
              {sc.name}
            </button>
          ))}
        </div>
        <div className="filter" role="group" aria-label="Theme">
          <button className="filter__btn" type="button" aria-pressed={!dark} onClick={() => setDark(false)}>
            Light
          </button>
          <button className="filter__btn" type="button" aria-pressed={dark} onClick={() => setDark(true)}>
            Dark
          </button>
        </div>
      </div>
      <div className="showcase__screen" style={{ aspectRatio: `${s.width} / ${s.height}` }}>
        <Image className={dark ? "showcase__img" : "showcase__img is-on"} src={s.light} alt={`${s.alt}, light theme`} fill sizes="(max-width: 860px) 100vw, 1100px" quality={90} />
        <Image className={dark ? "showcase__img is-on" : "showcase__img"} src={s.dark} alt={`${s.alt}, dark theme`} fill sizes="(max-width: 860px) 100vw, 1100px" quality={90} />
      </div>
      <figcaption className="showcase__cap">
        {s.alt}. One switch of the theme changes every token at once.
      </figcaption>
    </figure>
  );
}
