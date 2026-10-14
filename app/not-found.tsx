import Link from "next/link";
import { Icon } from "@/components/shell/Icons";

export default function NotFound() {
  return (
    <div className="frame">
      <nav className="index" aria-label="Main">
        <Link className="index__link" href="/#about">about</Link>
        <Link className="index__link" href="/#work">work</Link>
        <Link className="index__link" href="/#writing">writing</Link>
        <Link className="index__link" href="/#contact">contact</Link>
      </nav>
      <main className="page-main">
        <section className="intro" aria-labelledby="nf-title">
          <h1 className="intro__title" id="nf-title">
            This page <em className="voice-accent">doesn’t exist.</em>
          </h1>
          <p className="intro__text">The link may be old, or the case hasn’t been published yet.</p>
          <p className="intro__text">
            <Link className="link link--nudge" href="/#work">
              See all work <Icon name="arrow" />
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
