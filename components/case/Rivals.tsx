"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** One competitor app as the screens Lera collected: its name and store line over a switch between the parts
 *  she studied (Dashboard, Widgets…), and that part's phones in one row that scrolls sideways.
 *  Each phone opens larger in the lightbox; the phones of the part on view are the set. */
export function Rival({ name, line, app, groups }: { name: string; line: string; app: string; groups: [label: string, file: string, count: number][] }) {
  const [at, setAt] = useState(0);
  const row = useRef<HTMLDivElement>(null);
  const [label, file, count] = groups[at];
  const pick = (i: number) => {
    setAt(i);
    row.current?.scrollTo({ left: 0 });
  };
  return (
    <figure className="rivals">
      <div className="rivals__bar">
        <figcaption className="rivals__name">
          <b>{name}</b> — {line}
        </figcaption>
        <div className="filter" role="group" aria-label={`${name}: part of the app`}>
          {groups.map(([g], i) => (
            <button key={g} className="filter__btn" type="button" aria-pressed={i === at} onClick={() => pick(i)}>
              {g}
            </button>
          ))}
        </div>
      </div>
      <div className="rivals__row" ref={row} tabIndex={0} aria-label={`${name}, ${label}: ${count} screens`}>
        {Array.from({ length: count }, (_, i) => {
          const src = `/work/smart-financial-assistant/rivals/${file}-${app}-${i + 1}.webp`;
          const alt = `${name}, ${label}: screen ${i + 1} of ${count}`;
          return (
            <button
              key={src}
              type="button"
              className="rivals__phone"
              data-zoom={src}
              data-zoom-w={600}
              data-zoom-h={1295}
              data-zoom-alt={alt}
              data-zoom-cap={`${name} · ${label}`}
              aria-label={`Open larger: ${alt}`}
            >
              <Image src={src} width={600} height={1295} alt={alt} sizes="150px" />
            </button>
          );
        })}
      </div>
    </figure>
  );
}
