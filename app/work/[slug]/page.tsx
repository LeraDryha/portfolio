import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseSlugs, loadCase, nextCase } from "@/lib/cases";
import { CaseIndex } from "@/components/shell/CaseIndex";
import { CaseEnd } from "@/components/case/CaseEnd";
import { Icon } from "@/components/shell/Icons";
import { BrandMarks } from "@/components/shell/BrandMarks";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = await loadCase(slug);
  if (!c) return {};
  return { title: c.entry.title, description: c.meta.lead };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await loadCase(slug);
  if (!c) notFound();
  const { entry, meta, Body } = c;
  const next = nextCase(slug);

  return (
    <div className="page--reading">
      <div className="frame frame--case">
        <CaseIndex phases={meta.phases} />

        <main className="page-main page-main--case">
          <header className="sheet" id="summary" aria-labelledby="case-title">
            <h1 className="headline" id="case-title">
              <BrandMarks marks={entry.marks} />
              {entry.title}
            </h1>
            <p className="lead">{meta.lead}</p>
            <dl className="facts">
              {meta.facts.map((f) => (
                <div className="facts__item" key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd className="facts__value">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="answer">
              <section className="tile tile--block" aria-labelledby="a-problem">
                <h2 className="voice-title" id="a-problem">Problem</h2>
                <p className="answer__text">{meta.answer.problem}</p>
              </section>
              <section className="tile tile--block" aria-labelledby="a-did">
                <h2 className="voice-title" id="a-did">What we did</h2>
                <p className="answer__text">{meta.answer.did}</p>
              </section>
              <section className="tile tile--block" aria-labelledby="a-result">
                <h2 className="voice-title" id="a-result">Result</h2>
                <p className="answer__text">{meta.answer.result}</p>
              </section>
              <div className="tile proof proof--strip">
                <div className="proof__mark" aria-hidden="true">{meta.proof.mark}</div>
                <div className="proof__cap" aria-hidden="true">{meta.proof.cap}</div>
                <p className="sr-only">{meta.proof.sr}</p>
              </div>
            </div>
            <figure className="tile figure">
              <a className="figure__zoom" href={meta.hero.src} target="_blank" rel="noopener">
                <Image className="figure__img" src={meta.hero.src} width={meta.hero.width} height={meta.hero.height} alt={meta.hero.alt} sizes="(max-width: 860px) 100vw, 1016px" priority />
                <span className="sr-only">Open full size in a new tab</span>
              </a>
              <figcaption className="figure__cap">
                <span>
                  {meta.hero.label && <b>{meta.hero.label}.</b>} {meta.hero.caption}
                </span>
                <span className="figure__open" aria-hidden="true">
                  Full size <Icon name="out" />
                </span>
              </figcaption>
            </figure>
          </header>

          <Body components={{ CaseEnd: () => <CaseEnd next={next} /> }} />
        </main>
      </div>
    </div>
  );
}
