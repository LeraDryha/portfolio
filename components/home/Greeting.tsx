import { GreetingPlayer } from "./GreetingPlayer";

export const GREETED_KEY = "greeted";

/**
 * First-visit greeting curtain. The inline script drops the curtain before first paint
 * (only when this browser has not seen it), so the page does not flash underneath.
 */
export function Greeting() {
  return (
    <>
      <div className="curtain" id="curtain" aria-hidden="true" suppressHydrationWarning>
        <div className="curtain__word" id="curtain-word">Hello</div>
      </div>
      <script
        id="greeting-gate"
        dangerouslySetInnerHTML={{
          __html: `try{if(!localStorage.getItem("${GREETED_KEY}"))document.getElementById("curtain").classList.add("curtain--on")}catch(e){}`,
        }}
      />
      <GreetingPlayer storageKey={GREETED_KEY} />
    </>
  );
}
