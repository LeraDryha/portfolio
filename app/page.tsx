import { contact, featured, intro, moreWork, person, writing } from "@/content/site";
import { caseHref } from "@/lib/cases";
import { CaseTile } from "@/components/home/CaseTile";
import { MoreWork } from "@/components/home/MoreWork";
import { Greeting } from "@/components/home/Greeting";
import { Icon, NewTab } from "@/components/shell/Icons";

export default function Home() {
  const [hero, ...rest] = featured;
  return (
    <>
      <Greeting />
      <div className="frame">
        <nav className="index" aria-label="Main">
          <a className="index__link" href="#about">about</a>
          <a className="index__link" href="#work">work</a>
          <a className="index__link" href="#writing">writing</a>
          <a className="index__link" href="#contact">contact</a>
        </nav>

        <main className="page-main">
          <section className="intro" id="about" aria-labelledby="hello">
            <h1 className="intro__title" id="hello">
              {intro.lead} <em className="voice-accent">{intro.accent}</em>
            </h1>
            <p className="intro__text">{intro.text}</p>
          </section>

          <section className="page-section" id="work" aria-labelledby="work-h">
            <h2 className="voice-title section-label" id="work-h">Selected work</h2>
            <div className="tiles">
              <CaseTile entry={hero} hero />
              {rest.map((c) => (
                <CaseTile key={c.slug} entry={c} />
              ))}
            </div>
            <MoreWork>
              {moreWork.map((c) => {
                const t = caseHref(c);
                return (
                  <article className="tile case-tile mini-tile" key={c.slug}>
                    <h3 className="mini-tile__title">
                      {t ? (
                        <a className="case-tile__link" href={t.href} {...(t.external ? { target: "_blank", rel: "noopener" } : {})}>
                          {c.title}
                          {t.external && <NewTab />}
                        </a>
                      ) : (
                        c.title
                      )}
                    </h3>
                    <p className="mini-tile__desc">{c.desc}</p>
                  </article>
                );
              })}
            </MoreWork>
          </section>

          <section className="page-section" id="writing" aria-labelledby="writing-h">
            <h2 className="voice-title section-label" id="writing-h">Writing</h2>
            <ul className="list">
              {writing.map((w) => (
                <li className="list__item" key={w.url}>
                  <a className="link link--plain" href={w.url} target="_blank" rel="noopener" lang="uk">
                    {w.title}
                    <span className="sr-only" lang="en"> (opens in a new tab)</span>
                  </a>
                  <span className="list__gloss">{w.gloss}</span>
                  <span className="list__src">
                    Medium <span className="tag" title="Article in Ukrainian">UA</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section id="contact" className="contact page-section" aria-labelledby="contact-h">
            <h2 className="voice-title section-label" id="contact-h">Contact</h2>
            <p className="contact__closing">
              {contact.closing} <em className="voice-accent">{contact.accent}</em> {contact.after}
            </p>
            <div className="contact__links">
              <a className="link" href={`mailto:${person.email}`}>{person.email}</a>
              <a className="link" href={person.linkedin} target="_blank" rel="noopener">
                LinkedIn
                <NewTab />
                <Icon name="out" />
              </a>
              <span className="status">{contact.cv}</span>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
