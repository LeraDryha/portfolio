import type { Metadata } from "next";
import { Icon } from "@/components/shell/Icons";
import { CaseBehavior } from "@/components/case/CaseBehavior";

export const metadata: Metadata = {
  title: "Learning",
  description: "Courses and certificates of Lera Dryha, product designer.",
};

/** Courses and certificates. The list is coming; the page already has its place. */
export default function LearningPage() {
  const home = "/#tile-learning";
  return (
    <>
      <a className="float-btn float-btn--close" href={home} data-close aria-label="Close, back to all work">
        <Icon name="close" />
      </a>
      <main className="case">
        <article className="prose" aria-labelledby="learning-title">
          <h1 id="learning-title" style={{ viewTransitionName: "learning-title" }}>Learning</h1>
          <p className="lead">Courses and certificates.</p>
          <p className="note">The list is coming soon.</p>
          <nav className="case-end" aria-label="More work">
            <a href={home}>All work</a>
          </nav>
        </article>
      </main>
      <CaseBehavior />
    </>
  );
}
