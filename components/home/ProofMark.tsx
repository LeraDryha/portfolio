import type { Proof } from "@/content/site";

/** The one real fact a case tile ends on. Visual version is hidden from screen readers; sr text replaces it. */
export function ProofMark({ proof }: { proof: Proof }) {
  switch (proof.kind) {
    case "num":
      return (
        <>
          <div className="proof proof--num" aria-hidden="true">
            <span className="proof__mark">{proof.mark}</span>
            <span className="proof__cap">{proof.cap}</span>
          </div>
          <p className="sr-only">{proof.sr}</p>
        </>
      );
    case "hero":
      return (
        <>
          <div className="proof proof--hero" aria-hidden="true">
            <span className="proof__mark">{proof.mark}</span>
            <span className="proof__cap">{proof.cap}</span>
          </div>
          <p className="sr-only">{proof.sr}</p>
        </>
      );
    case "words":
      return (
        <>
          <div className="proof proof--words" aria-hidden="true">
            <span className="proof__mark">
              {proof.lines.map((l) => (
                <span key={l} className="proof__line">{l}</span>
              ))}
            </span>
            <span className="proof__cap">{proof.cap}</span>
          </div>
          <p className="sr-only">{proof.sr}</p>
        </>
      );
    case "quote":
      return (
        <blockquote className="proof proof--quote">
          <span className="proof__mark">{proof.mark}</span>
          <span className="proof__cap">{proof.cap}</span>
        </blockquote>
      );
    case "specimen":
      return (
        <div className="proof proof--specimen" aria-hidden="true">
          <span className="proof__mark">
            Aa
            <span className="chips">
              <i className="chips__chip" />
              <i className="chips__chip" />
              <i className="chips__chip" />
              <i className="chips__chip" />
            </span>
          </span>
        </div>
      );
  }
}
