import Image from "next/image";
import type { ReactNode } from "react";
import { Selection } from "@/components/shell/Icons";

/* Building blocks for case pages, used from MDX (see mdx-components.tsx).
   Class names come straight from ui/kit.css. */

/** A part of the story: a heading and an optional line under it. */
export function Chapter({ id, title, sub, children }: { id: string; title: string; sub?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`h-${id}`}>
      <h2 id={`h-${id}`}>{title}</h2>
      {sub && <p className="chapter__sub">{sub}</p>}
      {children}
    </section>
  );
}

type FigureProps = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: ReactNode;
  /** "Before", "After" or "Before & after", shown in bold before the caption */
  label?: string;
  /** Stacked caption: a bold title and a line under it (cards in a row) */
  title?: string;
  sizes?: string;
  priority?: boolean;
};

/** A case image as it is. The image opens full size in a new tab; a Figma selection shows on hover. */
export function Figure({ src, width, height, alt, caption, label, title, sizes = "(max-width: 640px) 100vw, 640px", priority }: FigureProps) {
  return (
    <figure className="fig">
      <div className="fig__frame">
        <a className="fig__zoom" href={src} target="_blank" rel="noopener">
          <Image className="fig__img" src={src} width={width} height={height} alt={alt} sizes={sizes} quality={90} priority={priority} />
          <span className="sr-only">Open full size in a new tab</span>
        </a>
        <Selection />
      </div>
      {(caption || title) &&
        (title ? (
          <figcaption className="fig__cap fig__cap--stack">
            <b>{title}</b>
            <span>{caption}</span>
          </figcaption>
        ) : (
          <figcaption className="fig__cap">
            {label && <b>{label}. </b>}
            {caption}
          </figcaption>
        ))}
    </figure>
  );
}

const HALF = "(max-width: 640px) 100vw, 330px";
const THIRD = "(max-width: 640px) 100vw, 220px";

/** Figures in a row share one image area, so captions line up. */
export function FigurePair({ children }: { children: ReactNode }) {
  return <div className="fig-row">{children}</div>;
}

export function FigureGrid({ children }: { children: ReactNode }) {
  return <div className="fig-row">{children}</div>;
}

export function FigureRow3({ children }: { children: ReactNode }) {
  return <div className="fig-row fig-row--3">{children}</div>;
}

export function HalfFigure(props: FigureProps) {
  return <Figure {...props} sizes={HALF} />;
}

export function ThirdFigure(props: FigureProps) {
  return <Figure {...props} sizes={THIRD} />;
}

/** In the single reading column a side-by-side block simply stacks. */
export function Side({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SideCopy({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Stats({ items }: { items: { value: string; cap: string }[] }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.value + s.cap}>
          <b>{s.value}</b>
          <span>{s.cap}</span>
        </div>
      ))}
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="note">{children}</p>;
}

export function Statement({ children }: { children: ReactNode }) {
  return <p className="statement">{children}</p>;
}

export function Quote({ by, children }: { by: string; children: ReactNode }) {
  return (
    <blockquote className="quote">
      <p>{children}</p>
      <footer>{by}</footer>
    </blockquote>
  );
}

/** A research insight: a short heading, what a user said, what it means. */
export function Insight({ n, title, quote, children }: { n: number; title: string; quote: string; children: ReactNode }) {
  return (
    <div className="insight">
      <h3>
        {n}. {title}
      </h3>
      <blockquote className="quote">
        <p>“{quote}”</p>
      </blockquote>
      <p>{children}</p>
    </div>
  );
}

/** A hypothesis in the If / Then / Because / This will lead to form, with the events that measure it. */
export function Hypothesis({ title, ifText, then, because, leadsTo, metrics }: { title: string; ifText: string; then: string; because: string; leadsTo: string; metrics?: string }) {
  return (
    <div className="hyp">
      <h3>{title}</h3>
      <p>
        <b>If</b> {ifText}
      </p>
      <p>
        <b>Then</b> {then}
      </p>
      <p>
        <b>Because</b> {because}
      </p>
      <p>
        <b>This will lead to</b> {leadsTo}
      </p>
      {metrics && <small>Mixpanel: {metrics}</small>}
    </div>
  );
}

/** Paired lists. A tone colours the title: green for what works, red for what doesn't. */
export function TileLists({ lists }: { lists: { title: string; tone?: "positive" | "negative"; items: string[] }[] }) {
  return (
    <div className="lists">
      {lists.map((l) => (
        <section key={l.title}>
          <h3 className={l.tone ? `lists__title--${l.tone}` : undefined}>{l.title}</h3>
          <ul>
            {l.items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

type Cell = { v: string; improved?: boolean };

/** Comparison table. Only improved values are marked. */
export function ResultsTable({ caption, columns, rows, foot }: { caption: string; columns: string[]; rows: { metric: string; cells: Cell[] }[]; foot?: string }) {
  return (
    <>
      <div className="table-wrap">
        <table className="table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              {columns.map((c) => (
                <th scope="col" key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.metric}>
                <th scope="row">{r.metric}</th>
                {r.cells.map((c, i) => (
                  <td key={i} className={c.improved ? "table__improved" : undefined}>{c.v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {foot && <p className="table-foot">{foot}</p>}
    </>
  );
}

export function ProofStrip({ mark, cap, sr }: { mark: string; cap: string; sr?: string }) {
  return (
    <div className="proof-block">
      <b aria-hidden={sr ? true : undefined}>{mark}</b>
      <span aria-hidden={sr ? true : undefined}>{cap}</span>
      {sr && <p className="sr-only">{sr}</p>}
    </div>
  );
}
