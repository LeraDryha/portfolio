import Image from "next/image";
import type { ReactNode } from "react";

/** Prevently case blocks: phone frames, the research, the voice table and small card rows. */

type Shot = { src: string; width: number; height: number; alt: string; caption?: string; island?: boolean; /** for a row of both platforms */ os?: "ios" | "android" };

/** A screen in a phone frame. iPhone: rounder corners; screenshots taken on a phone get a Dynamic Island drawn
 *  (the simulator draws its own). Android: a camera dot. */
export function Phone({ os, shot, size = "md" }: { os: "ios" | "android"; shot: Shot; size?: "md" | "lg" }) {
  return (
    <figure className={`phone phone--${size}`}>
      <span className={`device device--${os}${shot.island ? " device--island" : ""}`}>
        <span className="device__screen" style={{ width: `calc(var(--h) * (1 - 2 * var(--ratio-device-pad)) * ${shot.width} / ${shot.height})` }}>
          <Image src={shot.src} alt={shot.alt} fill sizes={size === "lg" ? "300px" : "200px"} quality={90} />
        </span>
      </span>
      {shot.caption && <figcaption>{shot.caption}</figcaption>}
    </figure>
  );
}

/** Phones in a row (a flow, or the same screen on two platforms), with a label over them. */
export function Phones({ label, os, shots, size }: { label?: string; os: "ios" | "android" | "both"; shots: Shot[]; size?: "md" | "lg" }) {
  return (
    <div className="handsets case-wide">
      {label && <p className="handsets__label">{label}</p>}
      {/* On a narrow screen the row scrolls sideways: a named region the keyboard can reach and scroll */}
      <div className={size === "lg" ? "handsets__row handsets__row--lg" : "handsets__row"} role="region" aria-label={label ?? "Screens"} tabIndex={0}>
        {shots.map((s, i) => (
          <Phone key={s.src} os={s.os ?? (os === "both" ? (i === 0 ? "ios" : "android") : os)} shot={s} size={size} />
        ))}
      </div>
    </div>
  );
}

/** The persona across the top, the journey map from the interviews under it. */
export function Research({ persona, stages }: { persona: { name: string; line: string; rows: { label: string; text: string }[] }; stages: { title: string; pain: string; quote: string; answer: string }[] }) {
  return (
    <div className="research case-wide">
      <div className="research__persona">
        <div className="research__who">
          <p className="research__eyebrow">Persona</p>
          <b className="research__name">{persona.name}</b>
          <p>{persona.line}</p>
        </div>
        <dl>
          {persona.rows.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="research__journey">
        <p className="research__eyebrow">Journey map · from the interviews</p>
        <ol className="journey">
          {stages.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b>
              <span>{s.pain}</span>
              <q>{s.quote}</q>
              <em>
                In the app: <strong>{s.answer}</strong>
              </em>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Lines from the first version, what was wrong, and the rewrite. */
export function VoiceTable({ rows }: { rows: { before: string; why: string; after: string }[] }) {
  return (
    <div className="voice case-wide">
      <table>
        <thead>
          <tr>
            <th scope="col">Before</th>
            <th scope="col">What was wrong</th>
            <th scope="col">After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.after}>
              <td>
                <s>{r.before}</s>
              </td>
              <td>{r.why}</td>
              <td>{r.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Each stage of the work and the document written before it. */
export function StageTable({ rows }: { rows: { stage: string; doc: string }[] }) {
  return (
    <div className="voice voice--stages case-wide">
      <table>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">What I wrote before the code</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.stage}>
              <th scope="row">{r.stage}</th>
              <td>{r.doc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** More of the same evidence, folded: a quiet button opens it (native details/summary, keyboard and screen reader ready). */
export function More({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="more case-wide">
      <summary>{label}</summary>
      <div className="more__body">{children}</div>
    </details>
  );
}

/** Small grey cards with a title and a line, three in a row. */
export function Cards({ items, cols = 3 }: { items: { title: string; text: ReactNode }[]; cols?: 2 | 3 }) {
  return (
    <ul className={cols === 2 ? "cards cards--2" : "cards"}>
      {items.map((it) => (
        <li key={it.title}>
          <b>{it.title}</b>
          <span>{it.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Components built twice, as pills. */
export function Parts({ items }: { items: { name: string; note: string }[] }) {
  return (
    <ul className="parts-list" aria-label="Built for both platforms">
      {items.map((p) => (
        <li key={p.name}>
          {p.name}
          <small>{p.note}</small>
        </li>
      ))}
    </ul>
  );
}

/** App Store reviews (quoted without names) next to what the release shipped. */
export function Reviews({ reviews, shipped }: { reviews: { text: string; meta: string }[]; shipped: { title: string; text: string }[] }) {
  return (
    <div className="reviews">
      <div className="reviews__list">
        {reviews.map((r) => (
          <figure key={r.text}>
            <span className="reviews__stars" aria-label="5 stars">
              ★★★★★
            </span>
            <blockquote>“{r.text}”</blockquote>
            <figcaption>{r.meta}</figcaption>
          </figure>
        ))}
      </div>
      <div className="reviews__shipped">
        <p className="research__eyebrow">Shipped in 2.0</p>
        <ul>
          {shipped.map((s) => (
            <li key={s.title}>
              <b>{s.title}</b>
              <span>{s.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
