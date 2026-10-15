/** Where the visitor's theme choice is kept (auto / light / dark). */
export const THEME_KEY = "theme";

/** Runs in <head> before first paint, so a chosen theme never flashes the other one. */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
