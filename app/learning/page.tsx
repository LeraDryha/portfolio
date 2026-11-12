import type { Metadata } from "next";
import Image from "next/image";
import { Icon, Selection } from "@/components/shell/Icons";
import { CaseBehavior } from "@/components/case/CaseBehavior";
import { courses, foundations, now, recognition, type LearningItem } from "@/content/learning";

export const metadata: Metadata = {
  title: "Learning & recognition",
  description: "An award, courses and certificates of Lera Dryha, product designer.",
};

function Card({ it }: { it: LearningItem }) {
  const body = (
    <>
      {it.shot && (
        <span className="doc-link__shot doc-link__shot--cert">
          <Image src={it.shot.src} alt="" fill sizes="(max-width: 640px) 100vw, 520px" quality={90} />
        </span>
      )}
      <b>{it.title}</b>
      <span>{it.meta}</span>
      {it.result && <span className="doc-link__result">{it.result}</span>}
    </>
  );
  return (
    <li>
      {it.href ? (
        <a className="doc-link" href={it.href} target="_blank" rel="noopener">
          {body}
          <span className="sr-only"> (opens the certificate in a new tab)</span>
          <Selection />
        </a>
      ) : (
        <div className="doc-link">{body}</div>
      )}
    </li>
  );
}

export default function LearningPage() {
  const home = "/#tile-learning";
  return (
    <>
      <a className="float-btn float-btn--close" href={home} data-close aria-label="Close, back to all work">
        <Icon name="close" />
      </a>
      <main className="case">
        <article className="prose" aria-labelledby="learning-title">
          <h1 id="learning-title" style={{ viewTransitionName: "learning-title" }}>
            Learning &amp; recognition
          </h1>
          <p className="lead">A design award, the courses behind my work, and what I&apos;m learning now.</p>
          <p>
            <b>Now:</b> {now}
          </p>

          <section id="recognition">
            <h2>Recognition</h2>
            <ul className="doc-links">
              {recognition.map((it) => (
                <Card key={it.title} it={it} />
              ))}
            </ul>
          </section>

          <section id="courses">
            <h2>Courses</h2>
            <ul className="doc-links">
              {courses.map((it) => (
                <Card key={it.title} it={it} />
              ))}
            </ul>
            <p className="note">
              Foundations, CASES, 2022:{" "}
              {foundations.map((f, i) => (
                <span key={f.href}>
                  <a href={f.href} target="_blank" rel="noopener">
                    {f.title}
                  </a>
                  {i < foundations.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
            <p className="note">Some certificates carry my previous surname, Starychenko.</p>
          </section>

          <nav className="case-end" aria-label="More work">
            <a href={home}>All work</a>
          </nav>
        </article>
      </main>
      <CaseBehavior />
    </>
  );
}
