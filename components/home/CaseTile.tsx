import Link from "next/link";
import type { CaseEntry } from "@/content/site";
import { caseHref } from "@/lib/cases";
import { Icon, NewTab } from "@/components/shell/Icons";
import { ProofMark } from "./ProofMark";
import { BrandMarks } from "@/components/shell/BrandMarks";

/** A case on the home page. The title link stretches over the whole tile. */
export function CaseTile({ entry, hero = false }: { entry: CaseEntry; hero?: boolean }) {
  const target = caseHref(entry);
  const title = target ? (
    target.external ? (
      <a className="case-tile__link" href={target.href} target="_blank" rel="noopener">
        {entry.title}
        <NewTab />
      </a>
    ) : (
      <Link className="case-tile__link" href={target.href}>{entry.title}</Link>
    )
  ) : (
    entry.title
  );

  return (
    <article className={hero ? "tile case-tile case-tile--hero" : "tile case-tile"}>
      <div className="case-tile__copy">
        <h3 className="case-tile__title">
          <BrandMarks marks={entry.marks} />
          {title}
        </h3>
        <p className="case-tile__desc">{entry.desc}</p>
        <span className="label">{entry.meta}</span>
        {(target || entry.appStoreUrl) && (
          <div className="case-tile__actions">
            {target && (
              <span className="link--accent" aria-hidden="true">
                View case <Icon name="arrow" />
              </span>
            )}
            {entry.appStoreUrl && (
              <a className="link link--muted" href={entry.appStoreUrl} target="_blank" rel="noopener">
                App Store
                <NewTab />
                <Icon name="out" />
              </a>
            )}
          </div>
        )}
      </div>
      {entry.proof && <ProofMark proof={entry.proof} />}
    </article>
  );
}
