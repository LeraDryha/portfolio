import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/Icons";

/* Building blocks for case pages, used from MDX (see mdx-components.tsx).
   Class names come straight from ui/kit.css. */

export function Chapter({ id, title, sub, children }: { id: string; title: string; sub: string; children: ReactNode }) {
  return (
    <section className="chapter" id={id} data-chapter={id} aria-labelledby={`h-${id}`}>
      <div className="opener is-wide">
        <h2 className="opener__title" id={`h-${id}`}>{title}</h2>
        <p className="opener__sub">{sub}</p>
      </div>
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
  /** "Before" or "After", shown in bold before the caption */
  label?: string;
  /** Stacked caption: a bold title and a line under it (idea grid) */
  title?: string;
  sizes?: string;
  priority?: boolean;
};

export function Figure({ src, width, height, alt, caption, label, title, sizes = "(max-width: 860px) 100vw, 1016px", priority }: FigureProps) {
  return (
    <figure className="tile figure is-wide">
      <a className="figure__zoom" href={src} target="_blank" rel="noopener">
        <Image className="figure__img" src={src} width={width} height={height} alt={alt} sizes={sizes} priority={priority} />
        <span className="sr-only">Open full size in a new tab</span>
      </a>
      {title ? (
        <figcaption className="figure__cap figure__cap--stack">
          <b>{title}</b>
          <span>{caption}</span>
        </figcaption>
      ) : (
        <figcaption className="figure__cap">
          <span>
            {label && <b>{label}.</b>} {caption}
          </span>
          <span className="figure__open" aria-hidden="true">
            Full size <Icon name="out" />
          </span>
        </figcaption>
      )}
    </figure>
  );
}

const HALF = "(max-width: 860px) 100vw, 500px";

export function FigurePair({ children }: { children: ReactNode }) {
  return <div className="figure-pair is-wide">{children}</div>;
}

export function FigureGrid({ children }: { children: ReactNode }) {
  return <div className="figure-grid is-wide">{children}</div>;
}

/** Half-width figure for pairs and grids (smaller image download). */
export function HalfFigure(props: FigureProps) {
  return <Figure {...props} sizes={HALF} />;
}

export function Side({ children }: { children: ReactNode }) {
  return <div className="side is-wide">{children}</div>;
}

export function SideCopy({ children }: { children: ReactNode }) {
  return <div className="side__copy">{children}</div>;
}

export function Stats({ items }: { items: { value: string; cap: string }[] }) {
  return (
    <div className="stats">
      {items.map((s) => (
        <div className="stat" key={s.value + s.cap}>
          <b className="stat__value">{s.value}</b>
          <span className="stat__cap">{s.cap}</span>
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
      <p className="quote__text">{children}</p>
      <footer className="quote__by">{by}</footer>
    </blockquote>
  );
}

export function TileLists({ lists }: { lists: { title: string; items: string[] }[] }) {
  return (
    <div className="tile-lists is-wide">
      {lists.map((l) => (
        <section className="tile tile--list" key={l.title}>
          <h4 className="voice-title">{l.title}</h4>
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

/** Comparison table. Only improved values are marked (The Improved Only Rule). */
export function ResultsTable({ caption, columns, rows, foot }: { caption: string; columns: string[]; rows: { metric: string; cells: Cell[] }[]; foot?: string }) {
  const cols = columns.length === 2 ? "table--cols-2" : "table--cols-3";
  return (
    <div className="tile table-tile is-wide">
      <table className={`table ${cols}`}>
        <caption className="voice-title">{caption}</caption>
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
                <td key={i} className={c.improved ? "table__improved" : undefined} data-label={columns[i].split(" · ")[0]}>
                  {c.v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {foot && <p className="table__foot">{foot}</p>}
    </div>
  );
}

export function ProofStrip({ mark, cap, sr }: { mark: string; cap: string; sr: string }) {
  return (
    <div className="tile proof proof--strip is-wide">
      <div className="proof__mark" aria-hidden="true">{mark}</div>
      <div className="proof__cap" aria-hidden="true">{cap}</div>
      <p className="sr-only">{sr}</p>
    </div>
  );
}
