"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Region = "products" | "creators" | "relievers" | "job" | "gains" | "pains";
type Part = { region: Region; label: string; short: string[]; full: string[] };

/* Where each region's stickies sit on the 1100 × 600 canvas, in px of that box (turned into % below). */
const BOX: Record<Region, { x: number; y: number; w: number; cols: number }> = {
  products: { x: 30, y: 336, w: 132, cols: 1 },
  creators: { x: 200, y: 58, w: 330, cols: 4 },
  relievers: { x: 362, y: 400, w: 112, cols: 1 },
  job: { x: 948, y: 318, w: 128, cols: 1 },
  gains: { x: 640, y: 72, w: 246, cols: 3 },
  pains: { x: 612, y: 382, w: 392, cols: 4 },
};
const ORDER: Region[] = ["products", "creators", "relievers", "job", "gains", "pains"];
const W = 1100;
const H = 600;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * The value proposition canvas drawn the way the method draws it: the value map as a square (products and services,
 * gain creators, pain relievers) and the customer profile as a circle (gains, pains, customer job), arrows between.
 * When it comes into view the canvas is empty and the team's stickies fly into their regions, region by region.
 * Narrow screens get the same content as lists. With reduced motion the stickies are simply there.
 */
export function ValueProposition({ title, parts, caption }: { title: string; parts: Part[]; caption: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"rest" | "armed" | "in">("rest");

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setState("in");
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const byRegion = (r: Region) => parts.find((p) => p.region === r)!;
  let i = 0;

  return (
    <figure className="voices vpc case-wide">
      <div className="voices__bar">
        <figcaption className="voices__title">{title}</figcaption>
      </div>
      <div className="voices__panel">
        <div ref={stage} className={`vpc__stage vpc__stage--${state}`} aria-hidden="true">
          <svg className="vpc__lines" viewBox={`0 0 ${W} ${H}`}>
            <defs>
              <marker id="vpc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0 L10 5 L0 10 z" />
              </marker>
            </defs>
            <text className="vpc__head" x="280" y="24" textAnchor="middle">What Comfy offers</text>
            <text className="vpc__head" x="840" y="24" textAnchor="middle">What the customer wants</text>
            {/* Value map: a square cut into products & services, gain creators, pain relievers */}
            <rect x="20" y="40" width="520" height="520" />
            <path d="M20 40 L330 300 L20 560" />
            <path d="M362 300 H562" markerEnd="url(#vpc-arrow)" />
            <path d="M598 300 H800" markerStart="url(#vpc-arrow)" />
            <g className="vpc__icon">
              <rect x="312" y="292" width="40" height="30" />
              <path d="M332 292 V322 M308 292 H356" />
              <path d="M332 292 C320 278 312 286 322 292 M332 292 C344 278 352 286 342 292" />
            </g>
            {/* Customer profile: a circle cut into gains, pains, customer job */}
            <circle cx="840" cy="300" r="250" />
            <path d="M840 300 L1031.5 139.3 M840 300 L1031.5 460.7" />
            <g className="vpc__icon">
              <circle cx="840" cy="300" r="34" />
              <circle className="vpc__dot" cx="826" cy="292" r="3.5" />
              <path d="M824 312 Q834 320 846 312" />
            </g>
            <text className="vpc__label" x="96" y="292" textAnchor="middle">Products</text>
            <text className="vpc__label" x="96" y="314" textAnchor="middle">&amp; services</text>
            <text className="vpc__label" x="410" y="262" textAnchor="middle">Gain creators</text>
            <text className="vpc__label" x="410" y="358" textAnchor="middle">Pain relievers</text>
            <text className="vpc__label" x="740" y="262" textAnchor="middle">Gains</text>
            <text className="vpc__label" x="740" y="358" textAnchor="middle">Pains</text>
            <text className="vpc__label" x="1000" y="292" textAnchor="middle">Customer</text>
            <text className="vpc__label" x="1000" y="314" textAnchor="middle">job</text>
          </svg>
          {ORDER.map((r) => {
            const b = BOX[r];
            return (
              <div key={r} className={`vpc__cluster vpc__cluster--${r}`} style={{ left: pct(b.x, W), top: pct(b.y, H), width: pct(b.w, W), "--cols": b.cols } as CSSProperties}>
                {byRegion(r).short.map((t) => (
                  <span key={t} className="vpc__sticky" style={{ "--i": i++ } as CSSProperties}>
                    {t}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
        {/* The same content as lists, for screen readers and narrow screens */}
        <div className="value-canvas vpc__lists">
          {[
            ["What Comfy offers", ["products", "creators", "relievers"]],
            ["What the customer wants", ["job", "gains", "pains"]],
          ].map(([heading, regions]) => (
            <div key={heading as string} className="value-canvas__side">
              <p className="define__label">{heading as string}</p>
              {(regions as Region[]).map((r) => {
                const p = byRegion(r);
                const tone = r === "gains" ? " value-canvas__part--gain" : r === "pains" ? " value-canvas__part--pain" : "";
                return (
                  <div key={r} className={`define__card value-canvas__part${tone}`}>
                    <b>{p.label}</b>
                    <ul className="define__list">
                      {p.full.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p className="voices__note">{caption}</p>
      </div>
    </figure>
  );
}
