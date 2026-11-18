import Image from "next/image";

type Screen = { src: string; name: string; /** the screen the test moves (sign up): outlined */ moved?: boolean };

/** An A/B test's variants as rows of Lera's wireframes, screen by screen in order, so you can see where the tested
 *  screen sits in each. Each screen opens larger; the moved screen is outlined in the a/b-test orange. */
type Note = { title: string; screens: Screen[]; /** paragraphs; an array is a bullet list */ body: (string | string[])[] };

export function VariantFlow({ variants, caption, side = false, wide = false, note }: { variants: { label: string; screens: Screen[]; /** Lera's note on the variant */ rationale?: string }[]; caption: string; /** variants side by side instead of one under another */ side?: boolean; /** side by side across the case width (several screens per variant) */ wide?: boolean; /** Lera's further annotation with the screens it's about, under the variants */ note?: Note }) {
  return (
    <figure className={side ? `vflow vflow--side${wide ? " vflow--wide case-wide" : ""}` : "vflow case-wide"}>
      <div className="vflow__panel">
        {variants.map((v) => (
          <div key={v.label} className="vflow__variant">
            <p className="vflow__label">{v.label}</p>
            <ol className="vflow__row" style={{ gridTemplateColumns: `repeat(${v.screens.length}, minmax(0, 1fr))` }}>
              {v.screens.map((s, i) => (
                <li key={i} className={s.moved ? "vflow__screen vflow__screen--moved" : "vflow__screen"}>
                  <button type="button" className="vflow__zoom" data-zoom={s.src} data-zoom-w={402} data-zoom-h={874} data-zoom-alt={s.name} data-zoom-cap={`${v.label}: ${i + 1}. ${s.name}`} aria-label={`Open larger: ${i + 1}. ${s.name}`}>
                    <Image src={s.src} width={402} height={874} alt={s.name} sizes={side ? (wide ? "170px" : "240px") : "90px"} quality={90} />
                  </button>
                  {s.moved && <span className="vflow__tag">{s.name}</span>}
                </li>
              ))}
            </ol>
            {v.rationale && (
              <div className="flow__why vflow__why">
                <b>Rationale</b>
                <p>{v.rationale}</p>
              </div>
            )}
          </div>
        ))}
        {note && (
          <div className="vflow__note">
            <ol className="vflow__row" style={{ gridTemplateColumns: `repeat(${note.screens.length}, minmax(0, 1fr))` }}>
              {note.screens.map((s, i) => (
                <li key={i} className="vflow__screen">
                  <button type="button" className="vflow__zoom" data-zoom={s.src} data-zoom-w={402} data-zoom-h={874} data-zoom-alt={s.name} data-zoom-cap={s.name} aria-label={`Open larger: ${s.name}`}>
                    <Image src={s.src} width={402} height={874} alt={s.name} sizes="200px" quality={90} />
                  </button>
                </li>
              ))}
            </ol>
            <div className="flow__why vflow__why">
              <b>{note.title}</b>
              {note.body.map((b, i) =>
                Array.isArray(b) ? (
                  <ul key={i}>
                    {b.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{b}</p>
                ),
              )}
            </div>
          </div>
        )}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
