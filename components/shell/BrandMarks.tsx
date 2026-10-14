import { Fragment, type CSSProperties } from "react";
import type { Mark } from "@/content/site";

/** Logos beside a case title. Decorative: the title already names the case. */
export function BrandMarks({ marks }: { marks?: Mark[] }) {
  if (!marks?.length) return null;
  return (
    <span className="brand-marks" aria-hidden="true">
      {marks.map((m, i) => (
        <Fragment key={m.src}>
          {i > 0 && <span className="brand-plus">+</span>}
          {m.kind === "img" ? (
            // Small SVG logos: plain <img> keeps them crisp and lets the grey-to-colour filter apply.
            // eslint-disable-next-line @next/next/no-img-element
            <img className="brand-mark" src={m.src} width={m.width} height={m.height} alt="" />
          ) : (
            <span
              className="brand-mark brand-mark--mono"
              style={{ "--mark-src": `url(${m.src})`, "--mark-ratio": m.ratio, "--mark-color": m.color } as CSSProperties}
            />
          )}
        </Fragment>
      ))}
    </span>
  );
}
