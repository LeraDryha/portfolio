type Practice = { text: string; source: string };
type Step = { flow: string; optional?: boolean; ab?: string[]; practices?: Practice[]; description?: string[]; list?: string[] };

const LEGEND: [string, string][] = [
  ["flow", "flow item"],
  ["desc", "description"],
  ["practice", "best practices"],
  ["ab", "a/b test"],
];

/** Lera's onboarding user flow, live: each step a flow-item sticky, with the A/B test and the best practices behind
 *  it above and what the screen does below, in her board's colours. Five steps in a row, two on phones. */
export function FlowBoard({ steps, caption }: { steps: Step[]; caption: string }) {
  return (
    <figure className="flow case-wide">
      <div className="flow__panel">
        <ul className="flow__legend" aria-hidden="true">
          {LEGEND.map(([k, label]) => (
            <li key={k}>
              <i className={`flow__chip flow__chip--${k}`} />
              {label}
            </li>
          ))}
        </ul>
        <ol className="flow__steps">
          {steps.map((s, i) => (
            <li key={s.flow} className="flow__step">
              <div className="flow__top">
                {s.ab && (
                  <p className="flow__note flow__note--ab">
                    {s.ab.map((a, j) => (
                      <span key={a}>
                        {a}
                        {j < s.ab!.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
                {s.practices && (
                  <p className="flow__note flow__note--practice">
                    {s.practices.map((p, j) => (
                      <span key={p.text} className="flow__practice">
                        {p.text}
                        <em>{p.source}</em>
                        {j < s.practices!.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                )}
              </div>
              <p className={s.optional ? "flow__item flow__item--optional" : "flow__item"}>
                <span className="flow__n">{i + 1}</span>
                {s.flow}
              </p>
              <div className="flow__bottom">
                {(s.description || s.list) && (
                  <div className="flow__note flow__note--desc">
                    {s.description?.map((d) => (
                      <span key={d} className="flow__line">
                        {d}
                      </span>
                    ))}
                    {s.list && (
                      <ul>
                        {s.list.map((l) => (
                          <li key={l}>{l}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
