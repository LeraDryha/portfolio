import Image from "next/image";

type Screen = { src: string; name: string; /** the screen the test moves (sign up): outlined */ moved?: boolean };

/** An A/B test's variants as rows of Lera's wireframes, screen by screen in order, so you can see where the tested
 *  screen sits in each. Each screen opens larger; the moved screen is outlined in the a/b-test orange. */
export function VariantFlow({ variants, caption }: { variants: { label: string; screens: Screen[] }[]; caption: string }) {
  return (
    <figure className="vflow case-wide">
      <div className="vflow__panel">
        {variants.map((v) => (
          <div key={v.label} className="vflow__variant">
            <p className="vflow__label">{v.label}</p>
            <ol className="vflow__row" style={{ gridTemplateColumns: `repeat(${v.screens.length}, minmax(0, 1fr))` }}>
              {v.screens.map((s, i) => (
                <li key={i} className={s.moved ? "vflow__screen vflow__screen--moved" : "vflow__screen"}>
                  <button type="button" className="vflow__zoom" data-zoom={s.src} data-zoom-w={402} data-zoom-h={874} data-zoom-alt={s.name} data-zoom-cap={`${v.label}: ${i + 1}. ${s.name}`} aria-label={`Open larger: ${i + 1}. ${s.name}`}>
                    <Image src={s.src} width={402} height={874} alt={s.name} sizes="90px" quality={90} />
                  </button>
                  {s.moved && <span className="vflow__tag">{s.name}</span>}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
