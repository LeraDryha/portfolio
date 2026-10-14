import Link from "next/link";
import type { CaseEntry } from "@/content/site";
import { caseHref } from "@/lib/cases";
import { Icon, NewTab } from "@/components/shell/Icons";

/** End of a case: return links on the left, the next case (full title) on the right. */
export function CaseEnd({ next }: { next: CaseEntry }) {
  const target = caseHref(next);
  const label = (
    <>
      Next case: {next.fullTitle} <Icon name="arrow" />
    </>
  );
  return (
    <nav className="case-end is-wide" aria-label="More work">
      <div className="case-end__links">
        <Link className="link link--tap" href="/#work">All work</Link>
        <a className="link link--tap" href="#summary">Back to summary</a>
      </div>
      {target &&
        (target.external ? (
          <a className="link link--nudge case-end__next" href={target.href} target="_blank" rel="noopener">
            {label}
            <NewTab />
          </a>
        ) : (
          <Link className="link link--nudge case-end__next" href={target.href}>{label}</Link>
        ))}
    </nav>
  );
}
