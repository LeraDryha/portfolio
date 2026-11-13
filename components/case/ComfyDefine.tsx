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

/** The problems worth solving, one white card each, with the research stickies that back them (paper yellow). */
export function ProblemBoard({ title, problems, caption }: { title: string; problems: { title: string; notes: string[] }[]; caption: string }) {
  return (
    <Panel title={title}>
      <div className="problems">
        {problems.map((p, i) => (
          <section key={p.title} className="define__card problems__card">
            <p className="define__label">Problem {i + 1}</p>
            <h4>{p.title}</h4>
            <ul className="stickies">
              {p.notes.map((n) => (
                <li key={n} className="sticky">
                  {n}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="voices__note">{caption}</p>
    </Panel>
  );
}

/** How Might We: each question on a green sticky, the team's ideas for it on grey ones beside it, as on the board. */
export function HmwBoard({ title, questions, caption }: { title: string; questions: { q: string; tag?: string; ideas: string[] }[]; caption: string }) {
  return (
    <Panel title={title}>
      <ol className="hmw">
        {questions.map((h, i) => (
          <li key={h.q} className="define__card hmw__row">
            <div className="sticky sticky--hmw">
              <span className="hmw__n">
                HMW {i + 1}
                {h.tag && <em> · {h.tag}</em>}
              </span>
              {h.q}
            </div>
            <ul className="stickies stickies--ideas">
              {h.ideas.map((idea) => (
                <li key={idea} className="sticky sticky--idea">
                  {idea}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="voices__note">{caption}</p>
    </Panel>
  );
}

type Shot = { src: string; width: number; height: number; alt: string };

function Zoom({ shot, cap, className }: { shot: Shot; cap: string; className: string }) {
  return (
    <button type="button" className={`fig__zoom ${className}`} data-zoom={shot.src} data-zoom-w={shot.width} data-zoom-h={shot.height} data-zoom-alt={shot.alt} data-zoom-cap={cap} aria-label={`Open larger: ${shot.alt}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- transparent device mockups, sized by CSS */}
      <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} loading="lazy" />
    </button>
  );
}

/**
 * One problem from Develop carried through to the design: the problem with its evidence and the HMW it answers,
 * the screen as it was with what was wrong, then each decision as a card — what changed and why on the left,
 * the ideas from How Might We it came from as chips, the desktop screen with the phone over its corner on the right.
 */
export function ProblemSolved({ n, problem, evidence, hmw, before, steps }: { n: number; problem: string; evidence: string; hmw: string; before: { shot: Shot; overlay?: Shot; phones?: Shot[]; more?: Shot[]; issues: string[] }; steps: { title: string; text: string; ideas?: string[]; desktop: Shot; phones?: Shot[] }[] }) {
  return (
    <div className="solved">
      <header className="solved__head">
        <p className="define__label">Problem {n}</p>
        <h3>{problem}</h3>
        <p className="solved__evidence">{evidence}</p>
        <p className="solved__hmw">
          <span className="sticky sticky--hmw solved__hmw-tag">HMW</span>
          {hmw}
        </p>
      </header>
      <section className="solved__before case-wide">
        <div className="solved__before-text">
          <span className="solved__badge">Before</span>
          <ul>
            {before.issues.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className={`solved__shots solved__shots--${before.phones?.length ?? 0}`}>
          <Zoom shot={before.shot} cap="Before" className="solved__shot" />
          {/* The screen's own tooltip, as it opened from a bank icon */}
          {before.overlay && <Zoom shot={before.overlay} cap="Before · the bank tooltip" className="solved__overlay" />}
          {before.phones?.map((p, j) => (
            <Zoom key={p.src} shot={p} cap="Before · mobile" className={`solved__phone solved__phone--${j + 1}`} />
          ))}
        </div>
        {before.more && (
          <div className="solved__more">
            {before.more.map((m) => (
              <Zoom key={m.src} shot={m} cap="Before" className="solved__thumb" />
            ))}
          </div>
        )}
      </section>
      <ol className="solved__steps case-wide">
        {steps.map((s, i) => (
          <li key={s.title} className="solved__step">
            <div className="solved__text">
              <span className="solved__n">{String(i + 1).padStart(2, "0")}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
              {s.ideas && s.ideas.length > 0 && (
              <ul className="solved__ideas" aria-label="From How Might We">
                {s.ideas.map((idea) => {
                  const [tag, ...rest] = idea.split(" · ");
                  return (
                    <li key={idea}>
                      <b>{tag}</b> {rest.join(" · ")}
                    </li>
                  );
                })}
              </ul>
              )}
            </div>
            <div className={`solved__shots solved__shots--${s.phones?.length ?? 0}`}>
              <Zoom shot={s.desktop} cap={s.title} className="solved__shot" />
              {s.phones?.map((p, j) => (
                <Zoom key={p.src} shot={p} cap={`${s.title} · mobile`} className={`solved__phone solved__phone--${j + 1}`} />
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
