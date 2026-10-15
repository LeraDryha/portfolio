/** One sprite per page: the mark, the Figma cursor, and the small UI icons. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-mark" viewBox="0 0 32 32">
        <path d="M16 5 L25 16 L16 27 L7 16 Z M7 16 H25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-cursor" viewBox="0 0 18 18">
        <path d="M2 1.5 16 8.2l-6.3 1.5L6.6 16Z" fill="currentColor" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-copy" viewBox="0 0 20 20">
        <rect x="7" y="7" width="10" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M13 7V5.5A2.5 2.5 0 0 0 10.5 3h-5A2.5 2.5 0 0 0 3 5.5v5A2.5 2.5 0 0 0 5.5 13H7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </symbol>
      <symbol id="i-out" viewBox="0 0 20 20">
        <path d="M11 3h6v6M17 3l-8 8M15 12v3.5A1.5 1.5 0 0 1 13.5 17h-9A1.5 1.5 0 0 1 3 15.5v-9A1.5 1.5 0 0 1 4.5 5H8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-close" viewBox="0 0 20 20">
        <path d="M8 3v5H3M12 17v-5h5M8 8 3 3M12 12l5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-up" viewBox="0 0 20 20">
        <path d="M5 12l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-auto" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 3a7 7 0 0 1 0 14Z" fill="currentColor" />
      </symbol>
      <symbol id="i-light" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </symbol>
      <symbol id="i-dark" viewBox="0 0 20 20">
        <path d="M16.5 12.5A7 7 0 0 1 7.5 3.5a7 7 0 1 0 9 9Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </symbol>
    </svg>
  );
}

export type IconName = "mark" | "cursor" | "copy" | "out" | "close" | "up" | "auto" | "light" | "dark";

export function Icon({ name }: { name: IconName }) {
  return (
    <svg aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

/** Figma selection: square frame, four handles, live size (filled in by the page behaviour). */
export function Selection() {
  return (
    <span className="sel" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <b />
    </span>
  );
}
