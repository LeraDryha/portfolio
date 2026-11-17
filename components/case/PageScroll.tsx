import Image from "next/image";

type Phone = { src: string; width: number; height: number; alt: string };
type Page = { src: string; width: number; height: number; alt: string; label: string; after?: boolean; /** the same page on a phone, laid over the corner */ phone?: Phone };

/** Pages before and after, side by side, each cut to the same window from the top (a short page shows whole).
 *  The whole page opens larger on a click. A phone version can sit over the corner of the desktop page. */
export function PageScroll({ pages, caption, narrow = false }: { pages: Page[]; caption: string; /** reading width, for smaller pages */ narrow?: boolean }) {
  return (
    <figure className={narrow ? "page-scroll" : "page-scroll case-wide"}>
      <div className="page-scroll__row" style={{ gridTemplateColumns: `repeat(${pages.length}, minmax(0, 1fr))` }}>
        {pages.map((p) => (
          <div key={p.src} className={p.phone ? "page-scroll__item page-scroll__item--phone" : "page-scroll__item"}>
            <span className={p.after ? "solved__badge solved__badge--after" : "solved__badge"}>{p.label}</span>
            <button type="button" className="page-scroll__window" data-zoom={p.src} data-zoom-w={p.width} data-zoom-h={p.height} data-zoom-alt={p.alt} data-zoom-cap={p.label} aria-label={`Open the whole page: ${p.label}`}>
              <Image src={p.src} width={p.width} height={p.height} alt={p.alt} sizes="(max-width: 640px) 100vw, 520px" quality={90} />
            </button>
            {p.phone && (
              <button type="button" className="page-scroll__phone" data-zoom={p.phone.src} data-zoom-w={p.phone.width} data-zoom-h={p.phone.height} data-zoom-alt={p.phone.alt} data-zoom-cap={`${p.label}, mobile`} aria-label={`Open larger: ${p.label}, mobile`}>
                <Image src={p.phone.src} width={p.phone.width} height={p.phone.height} alt={p.phone.alt} sizes="120px" quality={90} />
              </button>
            )}
          </div>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
