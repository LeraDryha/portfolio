type Card = { n: number; ifText: string; then: string; because: string; leadsTo: string; variants: string[]; metrics: string };

/** Hypotheses as Lera wrote them on her board: one paper sticky each, If / Then / Because / This will lead to,
 *  the A/B variants and the metrics. Two in a row on the grey panel, one on phones. */
export function HypothesisBoard({ items, caption }: { items: Card[]; caption: string }) {
  return (
    <figure className="hyp-board">
      <div className="hyp-board__grid">
        {items.map((h) => (
          <section key={h.n} className="hyp-board__card">
            <h4>Hypothesis #{h.n}</h4>
            <p>
              <b>If</b> {h.ifText}
              <br />
              <b>Then</b> {h.then}
              <br />
              <b>Because</b> {h.because}
              <br />
              <b>This will lead to</b> {h.leadsTo}
            </p>
            <p>
              {h.variants.map((v, i) => (
                <span key={v} className="hyp-board__line">
                  {v}
                  {i < h.variants.length - 1 && <br />}
                </span>
              ))}
            </p>
            <p>
              <b>Metrics</b> - {h.metrics}
            </p>
          </section>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}

type Row = { name: string; impact: number; confidence: number; ease: number; note: string };

/** ICE prioritisation as a live table: Impact × Confidence × Ease, the score column on paper yellow, the reason in grey. */
export function IceTable({ rows, caption }: { rows: Row[]; caption: string }) {
  return (
    <figure className="ice">
      <div className="ice__scroll" role="region" aria-label={caption} tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">ICE</th>
              <th scope="col">Impact</th>
              <th scope="col">Confidence</th>
              <th scope="col">Ease</th>
              <th scope="col" className="ice__score">ICE Score</th>
              <th scope="col" className="ice__note">
                <span className="sr-only">Why</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope="row">{r.name}</th>
                <td>{r.impact}</td>
                <td>{r.confidence}</td>
                <td>{r.ease}</td>
                <td className="ice__score">{r.impact * r.confidence * r.ease}</td>
                <td className="ice__note">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
