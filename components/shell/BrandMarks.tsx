import { Fragment, type CSSProperties } from "react";
import type { Mark } from "@/content/site";

/** Logos beside a case title: in the title's colour, original colours on hover. Decorative: the title already names the case. */
export function BrandMarks({ marks }: { marks?: Mark[] }) {
  if (!marks?.length) return null;
  return (
    <span className="brand-marks" aria-hidden="true">
      {marks.map((m, i) => (
        <Fragment key={m.src}>
          {i > 0 && <span className="brand-plus">+</span>}
          <span
            className={m.art ? "brand-mark brand-mark--art" : "brand-mark"}
            style={
              {
                "--mark-src": `url(${m.src})`,
                "--mark-ratio": m.ratio,
                ...(m.art && { "--mark-art": `url(${m.art})` }),
                ...(m.color && { "--mark-color": m.color }),
              } as CSSProperties
            }
          />
        </Fragment>
      ))}
    </span>
  );
}
