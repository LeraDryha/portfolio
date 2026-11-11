"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Nunito_Sans } from "next/font/google";

// The GRG product typeface, for the specimen only (not preloaded: it is needed on this one block)
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600"], preload: false, variable: "--font-grg" });

/** A line of code: plain text, with **token names** in ink and //comments quiet. */
type Line = string;

type Tab = { id: string; label: string; lines: Line[]; hl: number[] };

const TABS: Tab[] = [
  {
    id: "figma",
    label: "Figma variables",
    hl: [1, 2, 3, 4, 5, 6],
    lines: [
      "// Figma variables",
      "**Surface/surface-floating**",
      "  Light (gold)  →  **neutral/0**      #FFFFFF",
      "  Dark          →  **neutral/850**    #1D1D1D",
      "**Primary/primary-base-1000**",
      "  Light (gold)  →  **neutral/1000**   #0A0A0A",
      "  Dark          →  **neutral/0**      #FFFFFF",
      "",
      "**Corner/xl-16**     16",
      "**Spacing/800**      32",
      "**Spacing/1000**     40",
      "**Elevation/md**     2 shadows, 4 in the dark",
    ],
  },
  {
    id: "tokens",
    label: "tokens.css",
    hl: [2, 3, 9, 10],
    lines: [
      "/* generated from the Figma variables */",
      ":root {",
      "  **--surface-floating**: var(--color-neutral-0);",
      "  **--primary-base-1000**: var(--color-neutral-1000);",
      "  **--radius-xl-16**: 16px;",
      "  **--space-800**: 32px;",
      "  **--space-1000**: 40px;",
      "}",
      '[data-theme="dark"] {',
      "  **--surface-floating**: var(--color-neutral-850);",
      "  **--primary-base-1000**: var(--color-neutral-0);",
      "}",
    ],
  },
  {
    id: "modal",
    label: "Modal.css",
    hl: [4],
    lines: [
      ".grg-modal {",
      "  --modal-side: var(**--space-800**);",
      "  border-radius: var(**--radius-xl-16**);",
      "  box-shadow: var(**--shadow-md**);",
      "  background: var(**--surface-floating**);",
      "}",
      "/* fields: 40px apart */",
      ".grg-modal__content > form { gap: var(**--space-1000**); }",
      "/* no hex values, pixel sizes or font names */",
    ],
  },
  {
    id: "page",
    label: "SignUp.tsx",
    hl: [1],
    lines: [
      "// the sign-up modal, from system parts only",
      '<Modal size="sm" title="Sign up"',
      '  description="Accept crypto payments worldwide within seconds">',
      "  <form>",
      '    <Input label="Email" inputType="email" leftIcon="mail" />',
      '    <Input label="Password" type="button" action="password" />',
      '    <Button variant="primary" size="lg" type="submit">Sign up</Button>',
      "  </form>",
      '  <SocialButton social="google" />',
      '  <SocialButton social="apple" />',
      "</Modal>",
    ],
  },
];

function Code({ line }: { line: Line }): ReactNode {
  const comment = line.trimStart().startsWith("//") || line.trimStart().startsWith("/*");
  if (comment) return <i>{line}</i>;
  return line.split(/(\*\*[^*]+\*\*)/).map((part, i) => (part.startsWith("**") ? <b key={i}>{part.slice(2, -2)}</b> : part));
}

/**
 * Tokens followed from the Figma variables to the product, as on primereact.dev: the Sign up modal from Lera's Figma
 * with its tokens marked and its spacing measured, and the code where each value lives. The specimen has its own
 * Light / Dark switch, so the tokens' two values show.
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
          <div className="spec-modal" role="img" aria-label="The Sign up modal with its tokens marked: radius-xl-16, surface-floating, primary-base-1000 on the button, shadow-md; Sign in with Google and with Apple under it; the Email field filled and active; the footer text in Body-md/Regular, 14/20; 32px sides and top, 40px between the fields">
            {/* The modal, zoomed out as on a Figma canvas; sizes measured as in Figma's dev mode */}
            <div className="spec-modal__box" aria-hidden="true">
              <div className="spec-modal__head">
                <p className="spec-modal__title">Sign up</p>
                <p className="spec-modal__desc">Accept crypto payments worldwide within seconds</p>
              </div>
              {/* Active: filled and focused, its label floated above */}
              <span className="spec-modal__field spec-modal__field--active">
                <span className="spec-modal__label">Email</span>
                <svg viewBox="0 0 20 20">
                  <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
                  <path d="m3 5.5 7 5 7-5" />
                </svg>
                <span className="spec-modal__value">olivia@mail.com</span>
              </span>
              <span className="spec-modal__field">
                Password
                <svg className="spec-modal__end" viewBox="0 0 20 20">
                  <path d="M2 10s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5S2 10 2 10Z" />
                  <circle cx="10" cy="10" r="2.5" />
                </svg>
              </span>
              <div className="spec-modal__actions">
                <span className="spec-modal__button">Sign up</span>
                <span className="spec-modal__or">or</span>
                <div className="spec-modal__socials">
                  {/* The system's Social Button with its Brand social icons, the same files as in the Storybook */}
                  <span className="spec-modal__social">
                    <img src="/work/grg-design-system/social/google-brand.svg" alt="" width={24} height={24} />
                    Sign in with Google
                  </span>
                  <span className="spec-modal__social">
                    <img src={`/work/grg-design-system/social/${dark ? "apple-brand-dark" : "apple-brand"}.svg`} alt="" width={24} height={24} />
                    Sign in with Apple
                  </span>
                </div>
              </div>
              <p className="spec-modal__foot">
                <span className="spec-modal__typed">I already have an account?</span> <b>Log in</b>
              </p>
              <span className="measure measure--x spec-measure--side" title="space-800">
                <em>32</em>
              </span>
              <span className="measure measure--y spec-measure--top" title="space-800">
                <em>32</em>
              </span>
              <span className="measure measure--y spec-measure--gap" title="space-1000">
                <em>40</em>
              </span>
            </div>
            <span className="redline-tag spec-tag--radius">radius-xl-16</span>
            <span className="redline-tag spec-tag--surface">surface-floating</span>
            <span className="redline-tag spec-tag--fill">primary-base-1000</span>
            <span className="redline-tag spec-tag--shadow">shadow-md</span>
            <span className="redline-tag type-tag spec-tag--type">Body-md/Regular · 14/20</span>
          </div>
        </div>
        <div className="specimen__tools">
          <span className="specimen__cap">Modal · Sign up · sm-440</span>
          <div className="filter" role="group" aria-label="Theme of the modal">
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
