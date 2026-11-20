import { useSyncExternalStore } from "react";
import { MOTION_KEY } from "@/components/shell/theme";

/**
 * Motion on or off for the whole site. Off when the visitor pauses it (the button beside the theme switch, kept in the
 * browser) or, until they choose, when the system asks for reduced motion. The page carries it as
 * <html data-motion="off">: CSS stops its animations by it, and the live products rest on their still frame.
 */
const EVENT = "motionchange";

/** Is motion off right now? (Read it when an animation starts.) */
export const motionOff = () => typeof document !== "undefined" && document.documentElement.getAttribute("data-motion") === "off";

/** Turns motion off or on, remembers the choice and tells every live product. */
export function setMotion(off: boolean) {
  if (off) document.documentElement.setAttribute("data-motion", "off");
  else document.documentElement.removeAttribute("data-motion");
  try {
    localStorage.setItem(MOTION_KEY, off ? "off" : "on");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

const subscribe = (fn: () => void) => {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
};

/** For an effect's dependencies: it changes when motion is paused or played, so the animation restarts or rests. */
export const useMotionOff = () => useSyncExternalStore(subscribe, motionOff, () => false);
