import type { CSSProperties } from "react";
import Image from "next/image";
import type { CaseEntry, Cursor as CursorData } from "@/content/site";
import { Icon } from "@/components/shell/Icons";

const style = (vars: Record<string, string>) => vars as CSSProperties;

/**
 * The product of a case, alive: the same element sits in the home tile and at the top of the case page.
 * Both carry the same view-transition name, so opening a case moves the animation into the page.
 */
export function Vis({ entry, priority = false }: { entry: CaseEntry; priority?: boolean }) {
  const v = entry.vis;
  const vt = style({ viewTransitionName: `case-${entry.slug}` });

  if (v.kind === "reveal") {
    return (
      <div className="vis vis--stage" style={vt} aria-hidden="true">
        <span className="reveal__logo" style={style({ "--logo": `url(${v.logo})` })} />
        <div className="reveal__product">
          <div className="strip">
            {[...v.screens, ...v.screens].map((src, i) => (
              <Image key={i} src={src} width={600} height={1298} alt="" sizes="220px" priority={priority && i < 3} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (v.kind === "wipe") {
    return (
      <>
        <div className="vis vis--inset wipe" style={vt}>
          <Image src={v.before.src} alt={v.before.alt} fill sizes="(max-width: 860px) 100vw, 600px" priority={priority} />
          <Image className="wipe__after" src={v.after.src} alt={v.after.alt} fill sizes="(max-width: 860px) 100vw, 600px" priority={priority} />
          <span className="wipe__bar" aria-hidden="true" />
          <span className="badge badge--start" aria-hidden="true">Before</span>
          <span className="badge badge--end" aria-hidden="true">After</span>
        </div>
        {v.pin && (
          <div className="pin" style={style({ "--x": v.pin.x, "--y": v.pin.y })}>
            <span className="pin__dot" aria-hidden="true">L</span>
            <p className="pin__note">
              <b>{v.pin.who}</b>
              {v.pin.text}
            </p>
          </div>
        )}
      </>
    );
  }

  if (v.kind === "pan") {
    return (
      <div className="vis vis--inset" style={vt} aria-hidden="true">
        <div className="pan" style={style({ "--img": `url(${v.src})` })} />
      </div>
    );
  }

  if (v.kind === "phones") {
    return (
      <div className="vis vis--inset" style={vt} aria-hidden="true">
        <div className="phones" style={style({ "--img": `url(${v.src})` })} />
      </div>
    );
  }

  return (
    <div className="vis vis--bare" style={vt} aria-hidden="true">
      <div className="spec">
        <span className="spec__aa">Aa</span>
        <span className="spec__row">
          <i />
          <i />
          <i />
          <i />
          <span className="redline">
            <em>14</em>
          </span>
        </span>
      </div>
    </div>
  );
}

/** A person in the file: a Figma cursor with a role label. Decorative. */
export function Cursor({ c }: { c: CursorData }) {
  return (
    <span className={`cursor cursor--${c.role}`} data-cursor aria-hidden="true" style={style({ "--x": c.x, "--y": c.y })}>
      <Icon name="cursor" />
      <span>{c.label}</span>
    </span>
  );
}
