import { cases, intro, moreWork, person, type CaseEntry } from "@/content/site";
import { caseHref } from "@/lib/cases";
import { Cursor, Vis } from "@/components/shell/Vis";
import { Icon, NewTab, Selection } from "@/components/shell/Icons";

const SHAPE: Record<CaseEntry["shape"], string> = {
  "brand-tall": "tile--w2 tile--h3 case-tile--brand",
  "wide-tall": "tile--w2 tile--h2",
  "wide-side": "tile--w2 case-tile--side",
  wide: "tile--w2 tile--h2",
  tall: "tile--h2 case-tile--small",
};

function CaseTile({ entry }: { entry: CaseEntry }) {
  const href = caseHref(entry);
  return (
    <article className={`tile case-tile ${SHAPE[entry.shape]}`} id={`tile-${entry.slug}`} data-cat="work">
      <div className="case-tile__head">
        <p className={entry.proof.quote ? "case-tile__proof case-tile__proof--quote" : "case-tile__proof"}>
          {entry.proof.text}
          {entry.proof.cap && <small>{entry.proof.cap}</small>}
        </p>
        <h2 className="case-tile__title">
          <a className="case-tile__name stretch" href={href}>
            {entry.name}
          </a>{" "}
          {entry.line}
        </h2>
      </div>
      <Vis entry={entry} />
      <Selection />
      {entry.cursor && <Cursor c={entry.cursor} />}
    </article>
  );
}

/** The home page: one bento of tiles, filtered from the top bar (All / About / Work / Writing). */
export function Bento() {
  return (
    <main className="home" id="main">
      <div className="bento" id="bento">
        <section className="tile tile--w2 intro" data-cat="about" aria-labelledby="hello">
          <h1 className="intro__title" id="hello">
            {intro.lead} <em>{intro.accent}</em>
          </h1>
          <p className="intro__text">{intro.text}</p>
          <Selection />
          <Cursor c={{ role: "lera", label: "Lera", x: "84%", y: "24%" }} />
        </section>

        <button className="tile logo-tile" type="button" data-cat="about" data-copy={person.email} aria-label={`Copy email ${person.email}`}>
          <span className="logo-yahoo" aria-hidden="true">yahoo!</span>
          <span className="act" aria-hidden="true"><Icon name="copy" /></span>
          <span className="toast" role="status" />
          <Selection />
        </button>

        <a className="tile logo-tile" data-cat="about" href={person.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
          <span className="logo-linkedin" aria-hidden="true">in</span>
          <span className="act" aria-hidden="true"><Icon name="out" /></span>
          <NewTab />
          <Selection />
        </a>

        {cases.map((c) => (
          <CaseTile key={c.slug} entry={c} />
        ))}

        <a className="tile logo-tile" data-cat="writing" href={person.medium} target="_blank" rel="noopener" aria-label="Articles on Medium">
          <svg className="logo-medium" viewBox="0 0 48 48" aria-hidden="true">
            <ellipse cx="14" cy="24" rx="10" ry="10" fill="currentColor" />
            <ellipse cx="31" cy="24" rx="5" ry="9.5" fill="currentColor" />
            <ellipse cx="41" cy="24" rx="1.8" ry="8.6" fill="currentColor" />
          </svg>
          <span className="act" aria-hidden="true"><Icon name="out" /></span>
          <NewTab />
          <Selection />
        </a>

        <a className="tile text-tile" id="tile-learning" data-cat="about" href="/learning">
          <span className="text-tile__title" style={{ viewTransitionName: "learning-title" }}>Learning</span>
          <span className="text-tile__line">Courses and certificates</span>
          <Selection />
        </a>
      </div>

      <div className="more-row" data-more-row>
        <button className="pill" type="button" data-more aria-expanded="false" aria-controls="more-list">
          More work
        </button>
      </div>
      <div className="minis" id="more-list" hidden>
        {moreWork.map((m) => (
          <a className="mini" key={m.url} href={m.url} target="_blank" rel="noopener">
            <b>{m.title}</b>
            <span>{m.meta}</span>
            <NewTab />
          </a>
        ))}
      </div>
    </main>
  );
}
