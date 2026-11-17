import type { CSSProperties } from "react";

type Ramp = { name: string; swatches: [string, string][] };
type Style = { name: string; weight: string; size: string };

/** A client design system's foundations, live: colour ramps as swatches with step and hex, and the type scale as a
 *  table. The hex values are the client's (data, like a screenshot), not portfolio tokens. */
export function KitFoundations({ ramps, font, styles, caption }: { ramps: Ramp[]; font: string; styles: Style[]; caption: string }) {
  return (
    <figure className="kitf case-wide">
      <div className="kitf__panel">
        <section className="define__card kitf__colors">
          <h4 className="kitf__title">Colors</h4>
          {ramps.map((r) => (
            <div key={r.name} className="kitf__ramp">
              <p className="define__label">{r.name}</p>
              <ul className="kitf__swatches">
                {r.swatches.map(([step, hex]) => (
                  <li key={step}>
                    <span className="kitf__chip" style={{ "--chip": hex } as CSSProperties} />
                    <span className="kitf__step">{step}</span>
                    <span className="kitf__hex">{hex}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section className="define__card kitf__type">
          <h4 className="kitf__title">Typography · {font}</h4>
          <table className="kitf__table">
            <thead>
              <tr>
                <th scope="col">Style</th>
                <th scope="col">Weight</th>
                <th scope="col">Size / line</th>
              </tr>
            </thead>
            <tbody>
              {styles.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.weight}</td>
                  <td>{s.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
