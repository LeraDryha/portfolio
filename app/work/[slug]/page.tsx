import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseHref, caseSlugs, loadCase, nextCase } from "@/lib/cases";
import { Vis } from "@/components/shell/Vis";
import { Icon } from "@/components/shell/Icons";
import { CaseBehavior } from "@/components/case/CaseBehavior";
import { CaseToc } from "@/components/case/CaseToc";
import { Lightbox } from "@/components/case/Lightbox";
import { LiveProduct } from "@/components/case/LiveProduct";
import { OpenCard, Stats } from "@/components/case/CaseBlocks";

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
  const home = `/#tile-${slug}`;

  return (
    <>
      <a className="float-btn float-btn--close" href={home} data-close aria-label="Close case, back to all work">
        <Icon name="close" />
      </a>
      <main className="case">
        <div className={entry.shape === "brand-tall" ? "case-hero case-hero--brand" : "case-hero"}>
          <Vis entry={entry} priority />
        </div>

        <article className="prose" aria-labelledby="case-title">
          {meta.kicker && <p className="case-kicker">{meta.kicker}</p>}
          <h1 id="case-title">{meta.heading}</h1>
          <p className="lead">{meta.lead}</p>
          <dl className="facts">
            {meta.facts.map((f) => (
              <Fragment key={f.label}>
                <dt>{f.label}</dt>
                <dd>
                  {f.href ? (
                    <a href={f.href} target="_blank" rel="noopener">
                      {f.value}
                    </a>
                  ) : (
                    f.value
                  )}
                </dd>
              </Fragment>
            ))}
          </dl>
          {meta.cta && <OpenCard {...meta.cta} />}
          {meta.answer && (
            <>
              <h2>Problem</h2>
              <p>{meta.answer.problem}</p>
              <h2>{meta.answer.didTitle ?? "What we did"}</h2>
              <p>{meta.answer.did}</p>
              <h2>Result</h2>
              <p>{meta.answer.result}</p>
            </>
          )}
          {meta.stats && <Stats items={meta.stats} />}
          {meta.proof && (
            <div className="proof-block">
              <b>{meta.proof.mark}</b>
              <span>{meta.proof.cap}</span>
            </div>
          )}
          {/* A product that can be used live (GRG): after the summary, before the story */}
          {entry.vis.kind === "assemble" && <LiveProduct v={entry.vis} />}

          <Body />

          <nav className="case-end" aria-label="More work">
            <a href={home}>All work</a>
            <a className="case-end__next" href={caseHref(next)}>
              Next case: {next.title} →
            </a>
          </nav>
        </article>
      </main>
      <button className="float-btn float-btn--top" type="button" data-to-top aria-label="Back to top">
        <Icon name="up" />
      </button>
      <CaseToc />
      <Lightbox />
      <CaseBehavior />
    </>
  );
}
