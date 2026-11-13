import Image from "next/image";
import type { ReactNode } from "react";
import { Icon, Selection } from "@/components/shell/Icons";

/* Building blocks for case pages, used from MDX (see mdx-components.tsx).
   Class names come straight from ui/kit.css. */

/** A part of the story: a heading and an optional line under it.
    With `n`, `of` and `label` it is a chapter break: a gap, a hairline and "04 / 07 · Process" over a larger heading. */
export function Chapter({ id, title, sub, n, of, label, children }: { id: string; title: string; sub?: string; n?: number; of?: number; label?: string; children: ReactNode }) {
  const pad = (x: number) => String(x).padStart(2, "0");
  const isBreak = n !== undefined && of !== undefined && label !== undefined;
  return (
    <section id={id} aria-labelledby={`h-${id}`} className={isBreak ? "chapter--break" : undefined}>
      {isBreak && (
        <p className="part__eyebrow" aria-hidden="true">
          <span className="chapter__num">{pad(n)}</span> / {pad(of)} · {label}
        </p>
      )}
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

/** A case image as it is. The image opens larger in the on-page lightbox; a Figma selection shows on hover. */
export function Figure({ src, width, height, alt, caption, label, title, sizes = "(max-width: 640px) 100vw, 640px", priority }: FigureProps) {
  return (
    <figure className="fig">
      <div className="fig__frame">
        {/* Opens the image larger in a modal on the page (see Lightbox); figures in a row are one set */}
        <button
          type="button"
          className="fig__zoom"
          data-zoom={src}
          data-zoom-w={width}
          data-zoom-h={height}
          data-zoom-alt={alt}
          data-zoom-cap={title ?? (typeof caption === "string" ? caption : "")}
          aria-label={`Open larger: ${title ?? alt}`}
        >
          <Image className="fig__img" src={src} width={width} height={height} alt={alt} sizes={sizes} quality={90} priority={priority} />
        </button>
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
    <div className={items.length === 5 ? "stats stats--5" : items.length === 4 ? "stats stats--4" : "stats"}>
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

/** Paired lists. A tone colours the card and its title: light green for what works, light orange for what doesn't. */
export function TileLists({ lists }: { lists: { title: string; tone?: "positive" | "negative"; items: string[] }[] }) {
  return (
    <div className="lists">
      {lists.map((l) => (
        <section key={l.title} className={l.tone ? `lists__card--${l.tone}` : undefined}>
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

/** Figma properties next to the props that carry them in code. */
export function PropsMap({ caption, rows }: { caption: string; rows: { figma: string; prop: string; values: string }[] }) {
  return (
    <div className="table-wrap">
      <table className="table props-map">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Figma property</th>
            <th scope="col">Prop</th>
            <th scope="col">Values</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.figma}>
              <th scope="row">{r.figma}</th>
              <td>
                <code>{r.prop}</code>
              </td>
              <td>{r.values}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One fix followed through: the finding, the change in the system, what changed in the product. */
export function Chain({ steps }: { steps: { label: string; title: string; text: ReactNode; pr?: number }[] }) {
  return (
    <ol className="chain">
      {steps.map((s) => (
        <li className="chain__step" key={s.label}>
          <span className="chain__label">{s.label}</span>
          <b>{s.title}</b>
          <span>{s.text}</span>
          {s.pr && <PrLink n={s.pr} />}
        </li>
      ))}
    </ol>
  );
}

const PR_BASE = "https://github.com/LeraDryha/grg-design-system/pull/";

function PrLink({ n }: { n: number }) {
  return (
    <a className="pr" href={`${PR_BASE}${n}`} target="_blank" rel="noopener">
      PR #{n}
    </a>
  );
}

/** Every audit decision as a row: what was found, what changed in the system, where the product changed. */
export function ChainTable({ caption, rows }: { caption: string; rows: { finding: string; system: string; product: string; prs: number[] }[] }) {
  return (
    <div className="table-wrap">
      <table className="table chain-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Finding</th>
            <th scope="col">In the system</th>
            <th scope="col">In the product</th>
            <th scope="col">Pull request</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.finding}>
              <th scope="row">{r.finding}</th>
              <td>{r.system}</td>
              <td>{r.product}</td>
              <td className="chain-table__prs">
                {r.prs.map((n) => (
                  <PrLink key={n} n={n} />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** A decision made while rebuilding a screen: what Figma had, what the product does now, and why. */
export function Decision({ title, figma, product, children, images }: { title: string; figma: string; product: string; children: ReactNode; images?: { figma: string; product: string; width: number; height: number; alt: [string, string] } }) {
  return (
    <div className="decision">
      <h3>{title}</h3>
      <div className="decision__pair">
        <div>
          <span className="decision__label">In Figma</span>
          {images && <Image className="decision__img" src={images.figma} width={images.width} height={images.height} alt={images.alt[0]} sizes="(max-width: 640px) 100vw, 640px" quality={90} />}
          <p>{figma}</p>
        </div>
        <div>
          <span className="decision__label">In the product</span>
          {images && <Image className="decision__img" src={images.product} width={images.width} height={images.height} alt={images.alt[1]} sizes="(max-width: 640px) 100vw, 640px" quality={90} />}
          <p>{product}</p>
        </div>
      </div>
      <div className="decision__why">{children}</div>
    </div>
  );
}

/** An audit finding: its id and severity, what is wrong, and what the audit recommended. */
export function Finding({ id, severity, title, fix, children }: { id: string; severity: "High" | "Medium" | "Low"; title: string; fix: ReactNode; children: ReactNode }) {
  return (
    <div className="finding">
      <p className="finding__top">
        <span className="finding__id">{id}</span>
        <span className="finding__sev">{severity}</span>
      </p>
      <h3>{title}</h3>
      <div className="finding__body">{children}</div>
      <p className="finding__fix">
        <b>Recommended. </b>
        {fix}
      </p>
    </div>
  );
}

/** The ways one value was written, crossed out, and the one rule that replaced them. */
export function Formats({ before, after, cap }: { before: string[]; after: string; cap: string }) {
  return (
    <div className="formats">
      <ul className="formats__before" aria-label="Before: the formats in use">
        {before.map((f) => (
          <li key={f}>
            <s>{f}</s>
          </li>
        ))}
      </ul>
      <p className="formats__after">
        <b>{after}</b>
        <span>{cap}</span>
      </p>
    </div>
  );
}

/** A usability test task: what the person is asked to do, what it checks, what counts as success, what is measured. */
export function Scenario({ n, task, checks, success, measure }: { n: number; task: string; checks: string; success: string; measure: string }) {
  return (
    <div className="scenario">
      <h3>
        <span className="scenario__n">{n}</span> {task}
      </h3>
      <dl>
        <dt>Checks</dt>
        <dd>{checks}</dd>
        <dt>Success</dt>
        <dd>{success}</dd>
        <dt>Measure</dt>
        <dd>{measure}</dd>
      </dl>
    </div>
  );
}

/** Ideas, one per row, each set apart: a number, a title and why it works on the left, its concept large on the right.
 *  The image opens larger in the lightbox; the ideas are one set there. */
export function Ideas({ children }: { children: ReactNode }) {
  return <div className="ideas case-wide">{children}</div>;
}

export function Idea({ n, of, title, src, width, height, alt, children }: { n: number; of: number; title: string; src: string; width: number; height: number; alt: string; children: ReactNode }) {
  return (
    <article className="idea">
      <div className="idea__text">
        <p className="part__eyebrow">
          Idea {n} / {of}
        </p>
        <h3>{title}</h3>
        {children}
      </div>
      <div className="idea__img">
        <button type="button" className="fig__zoom" data-zoom={src} data-zoom-w={width} data-zoom-h={height} data-zoom-alt={alt} data-zoom-cap={title} aria-label={`Open larger: ${title}`}>
          <Image src={src} width={width} height={height} alt={alt} sizes="(max-width: 860px) 100vw, 660px" quality={90} />
        </button>
      </div>
    </article>
  );
}

export { TokenAnatomy } from "@/components/case/TokenAnatomy";

/** The start of a larger part of the story, set apart from the chapters before it. */
export function Part({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <header className="part">
      <p className="part__eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children}
    </header>
  );
}

/** A live artefact to open (the GRG Storybook): one big link that can't be missed, a Figma selection on hover. */
export function OpenCard({ eyebrow, title, line, href, action }: { eyebrow?: string; title: string; line: string; href: string; action: string }) {
  return (
    <a className="open-card" href={href} target="_blank" rel="noopener">
      <span className="open-card__text">
        {eyebrow && <span className="open-card__eyebrow">{eyebrow}</span>}
        <b>{title}</b>
        <span>{line}</span>
      </span>
      <span className="open-card__action">
        {action}
        <Icon name="out" />
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
      <Selection />
    </a>
  );
}

const STORYBOOK = "https://grg-design-system.vercel.app";

/** The word "Storybook" as a link to the GRG Storybook (or to one of its pages). */
export function Storybook({ path, children = "Storybook" }: { path?: string; children?: ReactNode }) {
  return (
    <a href={path ? `${STORYBOOK}/?path=${path}` : STORYBOOK} target="_blank" rel="noopener">
      {children}
    </a>
  );
}

/** Pages of the Storybook to open: cards with a preview, a title and a line, two in a row. */
export function DocLinks({ items }: { items: { title: string; line: string; src: string; path: string }[] }) {
  return (
    <ul className="doc-links">
      {items.map((d) => (
        <li key={d.path}>
          <a className="doc-link" href={`${STORYBOOK}/?path=${d.path}`} target="_blank" rel="noopener">
            <span className="doc-link__shot">
              <Image src={d.src} alt="" fill sizes="(max-width: 640px) 100vw, 520px" quality={90} />
            </span>
            <b>{d.title}</b>
            <span>{d.line}</span>
            <span className="sr-only"> (opens the Storybook page in a new tab)</span>
            <Selection />
          </a>
        </li>
      ))}
    </ul>
  );
}

export { ThemeShowcase } from "@/components/case/ThemeShowcase";
export { Phone, Phones, Research, StageTable, Cards, Parts, Reviews } from "@/components/case/PreventlyBlocks";
export { VoiceTable } from "@/components/case/VoiceTable";
export { LivePlan, NativeCode, PhoneWipe } from "@/components/case/PreventlyLive";
export { SpecToScreen } from "@/components/case/SpecToScreen";
