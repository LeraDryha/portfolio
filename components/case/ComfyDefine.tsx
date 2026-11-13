import type { ReactNode } from "react";

/* Define-stage research artefacts rebuilt as live blocks (Comfy): a persona, a customer journey map and a value
   proposition canvas. Each sits like the other research blocks: a title on the page, a grey panel, white cards. */

function Panel({ title, children, wide = true }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <figure className={wide ? "voices case-wide" : "voices"}>
      <div className="voices__bar">
        <figcaption className="voices__title">{title}</figcaption>
      </div>
      <div className="voices__panel">{children}</div>
    </figure>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="define__list">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

/** One persona: who they are and their own words on the left; jobs, goal, needs and fears in cards; their story under it. */
export function Persona({ title, name, line, quote, jobs, goal, needs, fears, story }: { title: string; name: string; line: string; quote: string; jobs: string[]; goal: string; needs: string[]; fears: string[]; story: string }) {
  return (
    <Panel title={title}>
      <div className="persona">
        <div className="define__card persona__who">
          <b className="persona__name">{name}</b>
          <span className="persona__line">{line}</span>
          <blockquote className="persona__quote">
            <p>{quote}</p>
          </blockquote>
        </div>
        <div className="define__card">
          <p className="define__label">Jobs</p>
          <List items={jobs} />
        </div>
        <div className="define__card">
          <p className="define__label">Goal</p>
          <p className="persona__goal">{goal}</p>
        </div>
        <div className="define__card persona__needs">
          <p className="define__label">Needs</p>
          <List items={needs} />
        </div>
        <div className="define__card persona__fears">
          <p className="define__label">Fears</p>
          <List items={fears} />
        </div>
        <div className="define__card persona__story">
          <p className="define__label">His story</p>
          <p>{story}</p>
        </div>
      </div>
    </Panel>
  );
}

type JourneyRow = { label: string; cells: (string[] | string | null)[] };

/** A customer journey map as a table: the steps across the top, a row per layer (doing, thinking, quotes, feelings,
 *  ideas); the layer names stay in view while the table scrolls sideways. A quote cell is set in the voice face. */
export function JourneyMap({ title, steps, rows, caption }: { title: string; steps: string[]; rows: JourneyRow[]; caption: string }) {
  return (
    <Panel title={title}>
      <div className="define__card journey-map" role="region" aria-label={title} tabIndex={0}>
        <table>
          <thead>
            <tr>
              <td />
              {steps.map((s, i) => (
                <th key={s} scope="col">
                  <span className="journey-map__n">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className={r.label === "Saying" ? "journey-map__quotes" : undefined}>
                <th scope="row">{r.label}</th>
                {r.cells.map((c, i) => (
                  <td key={i}>{c === null ? null : typeof c === "string" ? <p>{c}</p> : r.label === "Saying" ? c.map((q) => <p key={q}>{q}</p>) : <List items={c} />}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="voices__note">{caption}</p>
    </Panel>
  );
}

type CanvasSide = { label: string; items: string[]; tone?: "gain" | "pain" }[];

/** A value proposition canvas as two columns: what Comfy offers (value map) beside what the customer wants and fears
 *  (customer profile), each part a card; gains in green and pains in orange, as on the verdict lists. */
export function ValueCanvas({ title, offer, customer, caption }: { title: string; offer: CanvasSide; customer: CanvasSide; caption: string }) {
  const side = (heading: string, parts: CanvasSide) => (
    <div className="value-canvas__side">
      <p className="define__label">{heading}</p>
      {parts.map((p) => (
        <div key={p.label} className={p.tone ? `define__card value-canvas__part value-canvas__part--${p.tone}` : "define__card value-canvas__part"}>
          <b>{p.label}</b>
          <List items={p.items} />
        </div>
      ))}
    </div>
  );
  return (
    <Panel title={title}>
      <div className="value-canvas">
        {side("What Comfy offers", offer)}
        {side("What the customer wants", customer)}
      </div>
      <p className="voices__note">{caption}</p>
    </Panel>
  );
}
