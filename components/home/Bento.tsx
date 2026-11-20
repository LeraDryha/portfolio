import { articles, cases, intro, moreWork, person, type CaseEntry } from "@/content/site";
import { caseHref } from "@/lib/cases";
import { Cursor, Vis } from "@/components/shell/Vis";
import { Icon, NewTab, Selection } from "@/components/shell/Icons";

const SHAPE: Record<CaseEntry["shape"], string> = {
  brand: "tile--w2 tile--h2 case-tile--brand",
  "wide-tall": "tile--w2 tile--h2",
  "wide-side": "tile--w2 case-tile--side",
  wide: "tile--w2 tile--h2",
  tall: "tile--h2 case-tile--small",
};

function CaseTile({ entry }: { entry: CaseEntry }) {
  const href = caseHref(entry);
  const title = (
    <h2 className="case-tile__title">
      <a className="case-tile__name stretch" href={href}>
        {entry.name}
      </a>{" "}
      {entry.line}
    </h2>
  );
  // The three lead cases: the product fills the tile; the name and one fact sit at the bottom, on a blur of it
  if (entry.full)
    return (
      <article className={`tile case-tile case-tile--full${entry.full.lightProduct ? " case-tile--light-product" : ""} ${SHAPE[entry.shape]} area-${entry.area}`} id={`tile-${entry.slug}`} data-cat="work">
        <Vis entry={entry} />
        <div className="case-tile__foot">
          {title}
          <small>{entry.full.fact}</small>
        </div>
        <Selection />
        {entry.cursor && <Cursor c={entry.cursor} />}
      </article>
    );
  return (
    <article className={`tile case-tile ${SHAPE[entry.shape]} area-${entry.area}`} id={`tile-${entry.slug}`} data-cat="work">
      <div className="case-tile__head">
        {entry.proof && (
          <p className={entry.proof.quote ? "case-tile__proof case-tile__proof--quote" : "case-tile__proof"}>
            {entry.proof.text}
            {entry.proof.cap && <small>{entry.proof.cap}</small>}
          </p>
        )}
        {title}
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
        <section className="tile tile--w2 intro area-intro" data-cat="about" aria-labelledby="hello">
          <h1 className="intro__title" id="hello">
            {intro.lead} <em>{intro.accent}</em>
          </h1>
          <p className="intro__text">{intro.text}</p>
          <Selection />
          <Cursor c={{ role: "lera", label: "Lera", x: "84%", y: "24%" }} />
        </section>

        {cases.map((c) => (
          <CaseTile key={c.slug} entry={c} />
        ))}

        <button className="tile logo-tile area-email" type="button" data-cat="about" data-copy={person.email} aria-label={`Copy email ${person.email}`}>
          <span className="logo-yahoo" aria-hidden="true">yahoo!</span>
          <span className="act" aria-hidden="true"><Icon name="copy" /></span>
          <span className="toast" role="status" />
          <Selection />
        </button>

        <a className="tile logo-tile area-linkedin" data-cat="about" href={person.linkedin} target="_blank" rel="noopener">
          <span className="sr-only">LinkedIn</span>
          <span className="logo-linkedin" aria-hidden="true">in</span>
          <span className="act" aria-hidden="true"><Icon name="out" /></span>
          <NewTab />
          <Selection />
        </a>

        {articles.map((a, i) => (
          <a className={`tile text-tile article-tile area-article-${i + 1}`} key={a.href} data-cat="writing" href={a.href} target="_blank" rel="noopener">
            <svg className="article-tile__mark" viewBox="0 0 48 48" aria-hidden="true">
              <ellipse cx="14" cy="24" rx="10" ry="10" fill="currentColor" />
              <ellipse cx="31" cy="24" rx="5" ry="9.5" fill="currentColor" />
              <ellipse cx="41" cy="24" rx="1.8" ry="8.6" fill="currentColor" />
            </svg>
            <span className="article-tile__title" lang="uk">
              {a.title}
            </span>
            <span className="text-tile__line">Article on Medium · in Ukrainian</span>
            <span className="act" aria-hidden="true"><Icon name="out" /></span>
            <NewTab />
            <Selection />
          </a>
        ))}

        <a className="tile text-tile area-learning" id="tile-learning" data-cat="about" href="/learning">
          <span className="text-tile__title" style={{ viewTransitionName: "learning-title" }}>Learning &amp; recognition</span>
          <span className="text-tile__line">An award, courses and certificates</span>
          <Selection />
        </a>

        <a className="tile logo-tile area-telegram" data-cat="about" href={person.telegram} target="_blank" rel="noopener">
          <span className="sr-only">Telegram</span>
          {/* The official Telegram mark (telegram.org brand assets): a light-to-deep blue circle and the white plane */}
          <svg className="logo-telegram" viewBox="0 0 240 240" aria-hidden="true">
            <defs>
              <linearGradient id="tg-fill" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0" style={{ stopColor: "var(--color-telegram-light)" }} />
                <stop offset="1" style={{ stopColor: "var(--color-telegram)" }} />
              </linearGradient>
            </defs>
            <circle cx="120" cy="120" r="120" fill="url(#tg-fill)" />
            <path d="M54.3 118.8c35-15.2 58.3-25.3 70-30.2 33.3-13.9 40.3-16.3 44.8-16.4 1 0 3.2.2 4.7 1.4 1.2 1 1.5 2.3 1.7 3.3s.4 3.1.2 4.7c-1.8 19-9.6 65.1-13.6 86.3-1.7 9-5 12-8.2 12.3-7 .6-12.3-4.6-19-9-10.6-6.9-16.5-11.2-26.8-18-11.9-7.8-4.2-12.1 2.6-19.1 1.8-1.8 32.5-29.8 33.1-32.3.1-.3.1-1.5-.6-2.1-.7-.6-1.7-.4-2.5-.2-1.1.2-17.9 11.4-50.6 33.5-4.8 3.3-9.1 4.9-13 4.8-4.3-.1-12.5-2.4-18.7-4.4-7.5-2.4-13.5-3.7-13-7.9.3-2.2 3.3-4.4 8.9-6.7z" fill="var(--color-on-dark)" />
          </svg>
          <span className="act" aria-hidden="true"><Icon name="out" /></span>
          <NewTab />
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
          <a className="mini" key={m.slug} href={`/work/${m.slug}`}>
            <b>{m.title}</b>
            <span>{m.meta}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
