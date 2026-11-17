import type { ReactNode } from "react";
import { Phone } from "@/components/case/PreventlyBlocks";

/** Smart Financial Assistant: the app's own screens in phone frames (Figma frames, 375 × 812). */

type Shot = { src: string; width: number; height: number; alt: string; caption?: string };

/** The product before and after, side by side: two phones with an arrow between, a line under them on what changed. */
export function BeforeAfter({ before, after, children }: { before: Shot; after: Shot; children: ReactNode }) {
  return (
    <figure className="before-after">
      <div className="before-after__panel handsets__row">
        <div className="before-after__side">
          <span className="solved__badge">Before</span>
          <Phone os="ios" shot={before} />
        </div>
        <span className="before-after__arrow" aria-hidden="true">→</span>
        <div className="before-after__side">
          <span className="solved__badge solved__badge--after">After</span>
          <Phone os="ios" shot={after} />
        </div>
      </div>
      <figcaption className="before-after__note">{children}</figcaption>
    </figure>
  );
}

/** What the product was: the Before badge, a list, and its screens in a row. */
export function BeforeScreens({ items, shots }: { items: string[]; shots: Shot[] }) {
  return (
    <section className="before-screens case-wide" aria-label="Before">
      <div className="before-screens__text">
        <span className="solved__badge">Before</span>
        <ul>
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div className="handsets__row before-screens__row" role="region" aria-label="Screens before" tabIndex={0}>
        {shots.map((s) => (
          <Phone key={s.src} os="ios" shot={s} />
        ))}
      </div>
    </section>
  );
}

/** The screens that answer a hypothesis, in phone frames on a grey panel; an optional wide strip (widgets) under them. */
export function ScreenRow({ shots, strip }: { shots: Shot[]; strip?: Shot }) {
  return (
    <div className="screen-row case-wide">
      <div className="handsets__row screen-row__phones" role="region" aria-label="Screens" tabIndex={0}>
        {shots.map((s) => (
          <Phone key={s.src} os="ios" shot={s} />
        ))}
      </div>
      {strip && (
        <button
          type="button"
          className="screen-row__strip"
          data-zoom={strip.src}
          data-zoom-w={strip.width}
          data-zoom-h={strip.height}
          data-zoom-alt={strip.alt}
          data-zoom-cap={strip.caption ?? ""}
          aria-label={`Open larger: ${strip.caption ?? strip.alt}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={strip.src} width={strip.width} height={strip.height} alt={strip.alt} />
          {strip.caption && <span>{strip.caption}</span>}
        </button>
      )}
    </div>
  );
}
