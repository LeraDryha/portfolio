import type { CSSProperties } from "react";
import Image from "next/image";
import type { CaseEntry, Cursor as CursorData, Focus, Pin, Point } from "@/content/site";
import { Icon } from "@/components/shell/Icons";

const style = (vars: Record<string, string>) => vars as CSSProperties;
const pct = (n: number) => `${+(n * 100).toFixed(2)}%`;
// The camera zooms up to 1.75×, so a screenshot is drawn wider than its tile
const SHOT_SIZES = "(max-width: 640px) 160vw, 1100px";
const SHOT_QUALITY = 90;

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

  if (v.kind === "story") {
    // The camera is drawn at the deepest zoom (k × the stage) and scaled down, never up:
    // browsers rasterise an animated layer at its own size, so scaling up would blur the screenshots.
    const k = Math.max(v.focus.before.s, v.focus.after.s);
    const cam = (f: Focus) => `translate(${pct((0.5 - f.s * f.x) / k)}, ${pct((0.5 - f.s * f.y) / k)}) scale(${+(f.s / k).toFixed(4)})`;
    // Pins sit outside the camera so notes keep their size: place each where the camera puts its point (the drawer is seen whole).
    const at = (p: Point, f: Focus) => ({ "--x": pct(0.5 + f.s * (p.x - f.x)), "--y": pct(0.5 + f.s * (p.y - f.y)) });
    return (
      <div
        className="vis vis--inset story"
        style={{ ...vt, ...style({ "--ratio": String(v.ratio), "--cam-k": String(k), "--cam-full": cam({ s: 1, x: 0.5, y: 0.5 }), "--cam-before": cam(v.focus.before), "--cam-after": cam(v.focus.after) }) }}
      >
        <div className="story__stage">
          <div className="story__cam">
            <Image src={v.before.src} alt={v.before.alt} fill sizes={SHOT_SIZES} quality={SHOT_QUALITY} priority={priority} />
            <Image className="story__after" src={v.after.src} alt={v.after.alt} fill sizes={SHOT_SIZES} quality={SHOT_QUALITY} priority={priority} />
            <span className="story__bar" aria-hidden="true">
              <span className="story__grip" />
            </span>
            <div className="story__drawer" style={style({ "--left": pct(v.drawer.left) })}>
              <Image src={v.drawer.src} alt={v.drawer.alt} fill sizes={SHOT_SIZES} quality={SHOT_QUALITY} />
            </div>
          </div>
          <Comment pin={v.pins.before} step={1} pos={at(v.pins.before, v.focus.before)} />
          <Comment pin={v.pins.after} step={2} pos={at(v.pins.after, v.focus.after)} />
          <Comment pin={v.pins.drawer} step={3} pos={at(v.pins.drawer, { s: 1, x: 0.5, y: 0.5 })} />
          <span className="badge badge--start" aria-hidden="true">Before</span>
          <span className="badge badge--end" aria-hidden="true">After</span>
        </div>
      </div>
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

/** A Figma comment: the pin drops in closed, then the note opens from it. */
function Comment({ pin, step, pos }: { pin: Pin; step: number; pos: Record<string, string> }) {
  const high = parseFloat(pos["--y"]) < 50;
  return (
    <div className={`pin pin--${pin.side} pin--step-${step}${high ? " pin--high" : ""}`} style={style(pos)}>
      <span className="pin__dot" aria-hidden="true">L</span>
      <p className="pin__note">
        <b>{pin.who}</b>
        {pin.text}
      </p>
    </div>
  );
}

