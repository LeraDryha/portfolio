"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { Live } from "@/content/site";

type Item = { name: string; count: number; custom: boolean; docs: string | null };

/** The product's desktop width; narrower than DESKTOP_FROM, the product shows its own tablet or phone layout. */
const DESKTOP_FROM = 860;

const fromBoxes = (v: Live): Item[] => {
  const seen = new Map<string, Item>();
  v.boxes.forEach((b) => seen.set(b.name, { name: b.name, count: 1, custom: !!b.custom, docs: null }));
  return [...seen.values()];
};

/** The page's own theme: a choice in the top bar, or the system's. */
const pageTheme = (): "light" | "dark" => {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

/** The colours of the site's Figma layer, read from the kit, so the frame draws its boxes in them. */
const layerColours = () => {
  const css = getComputedStyle(document.documentElement);
  return { component: css.getPropertyValue("--color-figma-component").trim(), custom: css.getPropertyValue("--color-redline").trim(), label: css.getPropertyValue("--color-on-dark").trim() };
};

/**
 * The case's product, live: the Storybook story in a frame, with a Figma layer that shows what the screen is built from.
 * On wide screens the product keeps its desktop layout, scaled to fit; on narrow ones it uses its own phone layout.
 * Until the frame answers, the screenshot from the tile stands in (and stays if the Storybook can't be reached).
 */
export function LiveProduct({ v }: { v: Live }) {
  const screen = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [inspect, setInspect] = useState(false);
  const [items, setItems] = useState<Item[]>(() => fromBoxes(v));
  const [active, setActive] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [fit, setFit] = useState<{ desktop: boolean; scale: number; width: number; height: number }>({ desktop: true, scale: 1, width: v.width, height: v.height });

  // Messages wait until the Storybook in the frame has said it is ready
  const answered = useRef(false);
  const send = useCallback((m: Record<string, unknown>) => {
    if (!answered.current) return;
    frame.current?.contentWindow?.postMessage({ source: "grg-portfolio", ...m }, new URL(v.live.storybook).origin);
  }, [v.live.storybook]);

  // Fit the product to the column
  useEffect(() => {
    const el = screen.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      if (w >= DESKTOP_FROM) setFit({ desktop: true, scale: w / v.width, width: v.width, height: v.height });
      else setFit({ desktop: false, scale: 1, width: w, height: Math.min(720, Math.round(w * 1.7)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [v.width, v.height]);

  // Talk to the frame: what it is built from, what is under the pointer; send the theme and colours
  useEffect(() => {
    const origin = new URL(v.live.storybook).origin;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== origin || e.source !== frame.current?.contentWindow) return;
      const m = e.data;
      if (!m || m.source !== "grg-embed") return;
      // The first word from the frame (it may come before this page is listening for "ready"): send it the settings
      if (!answered.current) {
        answered.current = true;
        setReady(true);
        send({ type: "colors", ...layerColours() });
        send({ type: "theme", theme: pageTheme() });
      }
      if (m.type === "components" && Array.isArray(m.items) && m.items.length) setItems(m.items);
      if (m.type === "hover") setActive(typeof m.name === "string" ? m.name : null);
    };
    window.addEventListener("message", onMessage);

    // The page's theme changes: from the top bar or the system
    const followTheme = () => send({ type: "theme", theme: pageTheme() });
    const mo = new MutationObserver(followTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", followTheme);
    return () => {
      window.removeEventListener("message", onMessage);
      mo.disconnect();
      mq.removeEventListener("change", followTheme);
    };
  }, [send, v.live.storybook]);

  useEffect(() => send({ type: "inspect", on: inspect }), [inspect, send, ready]);

  // Ask the frame to introduce itself: it may have loaded before this page was listening
  // (any origin: it carries nothing, and the frame may still be blank)
  const hello = useCallback(() => frame.current?.contentWindow?.postMessage({ source: "grg-portfolio", type: "hello" }, "*"), []);
  useEffect(hello, [hello]);

  const highlight = (name: string | null) => {
    setActive(name);
    send({ type: "highlight", name });
  };

  const src = `${v.live.storybook}/iframe.html?id=${v.live.story}&viewMode=story&embed=portfolio`;
  const vars = { "--live-w": `${fit.width}px`, "--live-h": `${fit.height}px`, "--live-scale": String(fit.scale) } as CSSProperties;

  return (
    <section className="live case-wide" aria-labelledby="live-title">
      <div className="live__bar">
        <div>
          <p className="live__title" id="live-title">{v.live.title}</p>
          {v.live.try && <p className="live__try">{v.live.try}</p>}
        </div>
        <div className="filter" role="group" aria-label="What to show">
          <button className="filter__btn" type="button" aria-pressed={!inspect} onClick={() => setInspect(false)}>
            Product
          </button>
          <button className="filter__btn" type="button" aria-pressed={inspect} onClick={() => setInspect(true)}>
            Show components
          </button>
        </div>
      </div>

      {/* The embedded product holds many tab stops: a keyboard user can jump past it (shown only on focus) */}
      <a className="skip-live" href="#live-parts">
        Skip the live product
      </a>
      <div
        ref={screen}
        className={`live__screen${fit.desktop ? "" : " live__screen--native"}${ready ? " is-ready" : ""}`}
        style={vars}
      >
        {fit.desktop && (
          <>
            <Image className="live__shot shot--light" src={v.shots.light} alt="" fill sizes="1100px" quality={90} priority />
            <Image className="live__shot shot--dark" src={v.shots.dark} alt="" fill sizes="1100px" quality={90} />
          </>
        )}
        <iframe ref={frame} className="live__frame" src={src} onLoad={hello} title={`${v.live.title}: the live product, from the GRG Storybook`} />
      </div>

      <ul className="live__parts" id="live-parts" tabIndex={-1} aria-label="Built from">
        {items.map((it) => {
          const label = (
            <>
              {it.name}
              {it.count > 1 && <small aria-label={`, ${it.count} on this screen`}>×{it.count}</small>}
            </>
          );
          const cls = `live__part${it.custom ? " live__part--custom" : ""}${active === it.name ? " is-on" : ""}`;
          const events = { onMouseEnter: () => highlight(it.name), onMouseLeave: () => highlight(null), onFocus: () => highlight(it.name), onBlur: () => highlight(null) };
          return (
            <li key={it.name}>
              {it.docs ? (
                <a className={cls} href={`${v.live.storybook}/?path=/docs/${it.docs}`} target="_blank" rel="noopener" {...events}>
                  {label}
                  <span className="sr-only"> (opens its Storybook page)</span>
                </a>
              ) : (
                <span className={cls} tabIndex={0} {...events}>
                  {label}
                  <span className="sr-only"> (made for this page)</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="live__legend">
        <span className="live__key">A system component: opens its Storybook page</span>
        <span className="live__key live__key--custom">Made for this page only</span>
      </p>
      <p className="live__note">
        Rebuilt for this portfolio; the company’s own Storybook is private.{" "}
        <a href={v.live.storybook} target="_blank" rel="noopener">
          Open the GRG Storybook
        </a>
      </p>
    </section>
  );
}
