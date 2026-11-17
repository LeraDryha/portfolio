import Image from "next/image";

type Page = { src: string; width: number; height: number; alt: string; label: string; after?: boolean };

/** Whole pages, before and after, side by side: each sits in a window of the same height and scrolls inside, so a
 *  long page reads at a real size without stretching the case. The badge says which is which. */
export function PageScroll({ pages, caption }: { pages: Page[]; caption: string }) {
  return (
    <figure className="page-scroll case-wide">
      <div className="page-scroll__row" style={{ gridTemplateColumns: pages.map((p) => `${p.width / p.height > 0.5 ? 1.2 : 1}fr`).join(" ") }}>
        {pages.map((p) => (
          <div key={p.src} className="page-scroll__item">
            <span className={p.after ? "solved__badge solved__badge--after" : "solved__badge"}>{p.label}</span>
            <div className="page-scroll__window" role="region" aria-label={`${p.label}: ${p.alt} Scrolls.`} tabIndex={0}>
              <Image src={p.src} width={p.width} height={p.height} alt={p.alt} sizes="(max-width: 640px) 100vw, 380px" quality={90} />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
