import Link from "next/link";
import { Icon } from "./Icons";

export type Phase = { id: string; label: string; kind: "diverge" | "converge" };

const V = {
  diverge: { clip: "url(#cl-div)", points: "22,1 43,33 1,33" },
  converge: { clip: "url(#cl-con)", points: "1,1 43,1 22,33" },
};
const H = {
  diverge: { clip: "url(#cl-hdiv)", points: "1,15 25,1 25,29" },
  converge: { clip: "url(#cl-hcon)", points: "1,1 25,15 1,29" },
};

/** Case shell navigation: the desktop index with the phase halves and the phone bar. */
export function CaseIndex({ phases }: { phases: Phase[] }) {
  return (
    <>
      <nav className="index index--case" aria-label="Case navigation">
        <Link className="index__link index__back" href="/#work">
          <Icon name="arrow" back />
          work
        </Link>
        <a className="index__link" href="#summary" data-spy="summary">summary</a>
        <ol className="phases">
          {phases.map((p) => (
            <li key={p.id} className={`phases__step--${p.kind}`}>
              <a className="index__link phase" href={`#${p.id}`} data-phase={p.id}>
                {p.label}
                <svg className="phase__shape" viewBox="0 0 44 34" aria-hidden="true">
                  <g clipPath={V[p.kind].clip}><rect className="phase__fill" x="0" y="0" width="44" height="0" /></g>
                  <polygon className="phase__edge" points={V[p.kind].points} />
                </svg>
              </a>
            </li>
          ))}
        </ol>
        <a className="index__link" href="#outcome" data-spy="outcome">outcome</a>
      </nav>

      <div className="bar" aria-label="Case navigation">
        <Link className="bar__back" href="/#work">
          <Icon name="arrow" back />
          work
        </Link>
        <ol className="bar-phases">
          {phases.map((p) => (
            <li key={p.id}>
              <a className="bar-phase" href={`#${p.id}`} data-hphase={p.id} aria-label={p.label}>
                <svg className="phase__shape" viewBox="0 0 26 30" aria-hidden="true">
                  <g clipPath={H[p.kind].clip}><rect className="phase__fill" x="0" y="0" width="0" height="30" /></g>
                  <polygon className="phase__edge" points={H[p.kind].points} />
                </svg>
              </a>
            </li>
          ))}
        </ol>
        <span className="bar__now" aria-live="polite">summary</span>
      </div>
    </>
  );
}
