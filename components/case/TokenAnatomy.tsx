"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Nunito_Sans } from "next/font/google";

// The GRG product typeface, for the specimen only (not preloaded: it is needed on this one block)
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["600"], preload: false, variable: "--font-grg" });

/** A line of code: plain text, with **token names** in ink and //comments quiet. */
type Line = string;

type Tab = { id: string; label: string; lines: Line[]; hl: number[] };

const TABS: Tab[] = [
  {
    id: "figma",
    label: "Figma variable",
    hl: [1, 2, 3],
    lines: [
      "// Figma variables",
      "**Primary/primary-base-1000**",
      "  Light (gold)  →  **neutral/1000**   #0A0A0A",
      "  Dark          →  **neutral/0**      #FFFFFF",
      "",
      "**Spacing/250**    10",
      "**Spacing/400**    16",
      "**Corner/md-10**   10",
    ],
  },
  {
    id: "tokens",
    label: "tokens.css",
    hl: [2, 8],
    lines: [
      "/* generated from the Figma variables */",
      ":root {",
      "  **--primary-base-1000**: var(--color-neutral-1000);",
      "  **--space-250**: 10px;",
      "  **--space-400**: 16px;",
      "  **--radius-md-10**: 10px;",
      "}",
      '[data-theme="dark"] {',
      "  **--primary-base-1000**: var(--color-neutral-0);",
      "}",
    ],
  },
  {
    id: "button",
    label: "Button.css",
    hl: [4],
    lines: [
      ".grg-button {",
      "  --btn-pad-y: var(**--space-250**);",
      "  --btn-pad-x: var(**--space-400**);",
      "  --btn-radius: var(**--radius-md-10**);",
      "  --tone-solid: var(**--primary-base-1000**);",
      "}",
      "/* no hex values, pixel sizes or font names */",
    ],
  },
  {
    id: "page",
    label: "Dashboard.tsx",
    hl: [4],
    lines: [
      "// the page's main action, next to its title",
      "<PageHeader",
      '  title="Dashboard"',
      "  actions={",
      '    <Button variant="primary" size="sm" leftIcon="plus">',
      "      Create invoice",
      "    </Button>",
      "  }",
      "/>",
    ],
  },
];

function Code({ line }: { line: Line }): ReactNode {
  const comment = line.trimStart().startsWith("//") || line.trimStart().startsWith("/*");
  if (comment) return <i>{line}</i>;
  return line.split(/(\*\*[^*]+\*\*)/).map((part, i) => (part.startsWith("**") ? <b key={i}>{part.slice(2, -2)}</b> : part));
}

/**
 * One value followed from the Figma variable to the product: a Button specimen with its tokens marked, and the code
 * where the value lives at each step. The specimen has its own Light / Dark switch, so the token's two values show.
 */
export function TokenAnatomy() {
  const [tab, setTab] = useState(TABS[0].id);
  const [dark, setDark] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = TABS.find((t) => t.id === tab)!;

  const onKey = (e: KeyboardEvent, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? TABS.length - 1 : (i + step + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className={`anatomy case-wide ${nunito.variable}`}>
      <div className="specimen">
        <div className={dark ? "specimen__canvas specimen__canvas--dark" : "specimen__canvas"}>
          <div className="specimen__measure">
            <span className="specimen__button">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="M10 4v12M4 10h12" />
              </svg>
              Create invoice
              {/* The paddings measured as in Figma: space-400 at the side, space-250 at the top */}
              <span className="measure measure--x" title="space-400">
                <em>16</em>
              </span>
              <span className="measure measure--y" title="space-250">
                <em>10</em>
              </span>
            </span>
            <span className="redline-tag redline-tag--top">radius-md-10</span>
            <span className="redline-tag redline-tag--fill">primary-base-1000</span>
          </div>
        </div>
        <div className="specimen__tools">
          <span className="specimen__cap">Button · Primary · md-40</span>
          <div className="filter" role="group" aria-label="Theme of the button">
            <button className="filter__btn" type="button" aria-pressed={!dark} onClick={() => setDark(false)}>
              Light
            </button>
            <button className="filter__btn" type="button" aria-pressed={dark} onClick={() => setDark(true)}>
              Dark
            </button>
          </div>
        </div>
      </div>

      <div className="code">
        <div className="code__tabs" role="tablist" aria-label="Where the value lives">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`code-tab-${t.id}`}
              className="code__tab"
              type="button"
              role="tab"
              aria-selected={t.id === tab}
              aria-controls="code-panel"
              tabIndex={t.id === tab ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <pre className="code__body" id="code-panel" role="tabpanel" aria-labelledby={`code-tab-${tab}`} tabIndex={0}>
          <code>
            {current.lines.map((l, i) => (
              <span key={`${tab}-${i}`} className={current.hl.includes(i) ? "code__line code__line--hl" : "code__line"}>
                <Code line={l} />
                {"\n"}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
