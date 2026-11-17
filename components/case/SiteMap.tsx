type Page = { page: string; /** what the page is: a text page, a list of links, a link to another site */ types?: string[]; children?: Page[] };

function Tree({ pages }: { pages: Page[] }) {
  return (
    <ul className="sitemap__tree">
      {pages.map((p) => (
        <li key={p.page}>
          <span className="sitemap__page">{p.page}</span>
          {p.types && <span className="sitemap__type">{p.types.join(" · ")}</span>}
          {p.children && <Tree pages={p.children} />}
        </li>
      ))}
    </ul>
  );
}

/** Information architecture as a live site map: the main page, its sections, and under each the pages with what
 *  kind of page each one is. Rebuilt from Lera's mind map so it reads at any width. */
export function SiteMap({ root, sections, caption }: { root: string; sections: { title: string; pages: Page[] }[]; caption: string }) {
  return (
    <figure className="sitemap case-wide">
      <div className="sitemap__panel">
        <p className="sitemap__root">{root}</p>
        <div className="sitemap__sections">
          {sections.map((s) => (
            <section key={s.title} className="sitemap__section">
              <h4>{s.title}</h4>
              <Tree pages={s.pages} />
            </section>
          ))}
        </div>
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
