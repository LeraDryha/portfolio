/** Where the visitor's theme choice is kept (auto / light / dark). */
export const THEME_KEY = "theme";

/** Runs in <head> before first paint, so a chosen theme never flashes the other one. */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

/** Where the visitor's motion choice is kept (off / on); see components/shell/motion.ts. */
export const MOTION_KEY = "motion";

/** Runs in <head> before first paint: motion paused by the visitor, or reduced motion asked by the system, never starts for a moment. */
export const motionScript = `(function(){var m=null;try{m=localStorage.getItem("${MOTION_KEY}")}catch(e){}if(m==="off"||(m!=="on"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches))document.documentElement.setAttribute("data-motion","off")})()`;
