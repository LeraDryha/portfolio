/** One sprite per page: arrows, external link, and the clip paths for the phase halves. */
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-arrow" viewBox="0 0 16 16">
        <path d="M2.5 8h10M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <symbol id="i-out" viewBox="0 0 16 16">
        <path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </symbol>
      <clipPath id="cl-div"><polygon points="22,1 43,33 1,33" /></clipPath>
      <clipPath id="cl-con"><polygon points="1,1 43,1 22,33" /></clipPath>
      <clipPath id="cl-hdiv"><polygon points="1,15 25,1 25,29" /></clipPath>
      <clipPath id="cl-hcon"><polygon points="1,1 25,15 1,29" /></clipPath>
    </svg>
  );
}

export function Icon({ name, back = false }: { name: "arrow" | "out"; back?: boolean }) {
  return (
    <svg className={back ? "icon icon--back" : "icon"} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}
