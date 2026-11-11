import type { Assemble } from "@/content/site";

/*
 * GRG on its tile: primitives → semantic tokens → atoms → molecules → organism → product.
 * Every part from the atoms on is the real component, captured from the Invoices page in the Storybook
 * (scripts/grg-assemble.mjs), and lands exactly where it sits on that page. A camera moves over the page
 * (page coordinates, 1440 × 1386) the way Figma zooms; the tile itself is a 540 × 520 canvas, scaled to fit.
 * Classes and colours come from ui/kit.css (.asm-*); the GRG token values below are content.
 */

type Rect = { x: number; y: number; w: number; h: number };
type State = Rect & { o: number; bg?: string; r?: number };

const TILE = { w: 540, h: 520 };
const CAPTION = 70; // a tile's caption covers the bottom of the canvas; a case hero has none
const STEPS = [
  { label: "Primitives · gold, neutral, green", ms: 2300 },
  { label: "Semantic tokens", ms: 2300 },
  { label: "Atoms · Input, Select, Button, Badge, Action Button", ms: 2400 },
  { label: "", ms: 2600 },
  { label: "Organism · Invoices table", ms: 2800 },
  { label: "", ms: 6000 },
];
const PRODUCT = 5;

const DY = 20;
const chipAt = (i: number): Rect => ({ x: 140, y: 80 + DY + i * 44, w: 260, h: 30 });

// The parts of the finished product that get named, and where each name sits
const NAMED: [string, Rect, "inside-mid" | "inside" | "below"][] = [
  ["Topbar Navigation", { x: 0, y: 0, w: 1440, h: 64 }, "inside-mid"],
  ["Sidebar Navigation", { x: 0, y: 64, w: 272, h: 1322 }, "inside"],
  ["Page Header", { x: 296, y: 84, w: 1120, h: 32 }, "below"],
  ["Button", { x: 1276, y: 84, w: 140, h: 32 }, "below"],
  ["Table", { x: 320, y: 224, w: 1072, h: 709 }, "below"],
];

type Cam = { s: number; tx: number; ty: number };
const fit = (viewH: number, x: number, y: number, w: number, h: number): Cam => {
  const s = Math.min(TILE.w / w, viewH / h);
  return { s, tx: (TILE.w - w * s) / 2 - x * s, ty: (viewH - h * s) / 2 - y * s };
};
// What the camera looks at on each step (none for the first two: they are drawn on the tile)
// (the product fills the width from the top, whatever the height)
const camsFor = (viewH: number): (Cam | null)[] => [null, null, fit(viewH, 296, 150, 480, 150), fit(viewH, 300, 150, 720, 190), fit(viewH, 246, 66, 1220, 990), { s: TILE.w / 1440, tx: 0, ty: 0 }];
// Selections in page coordinates (steps 2–4) and on the tile (steps 0–1)
const SELS: Rect[][] = [
  [{ x: 100, y: 108 + DY, w: 340, h: 156 }],
  [{ x: 128, y: 68 + DY, w: 284, h: 230 }],
  [{ x: 320, y: 171, w: 441, h: 108 }],
  [{ x: 320, y: 168, w: 635, h: 32 }, { x: 320, y: 261, w: 1072, h: 56 }],
  [{ x: 296, y: 136, w: 1120, h: 820 }],
  [],
];
const SEL_LABELS = [[STEPS[0].label], [STEPS[1].label], [STEPS[2].label], ["Molecule · Toolbar", "Molecule · Table row"], [STEPS[4].label], []];

export type Theme = "light" | "dark";

export function startAssemble(root: HTMLElement, v: Assemble, theme: Theme) {
  // The theme's own colours, tokens and primitives (read from the system by scripts/grg-assemble.mjs)
  const T = v.parts.themes[theme];
  root.style.setProperty("--grg-page", T.page);
  root.style.setProperty("--grg-surface", T.surface);
  root.style.setProperty("--grg-divider", T.divider);
  root.style.setProperty("--grg-ink", T.tokens[0].hex);
  const R = v.parts.parts;
  const H = (x: number, y: number, w: number, h: number, extra?: Partial<State>): State => ({ x, y, w, h, o: 1, ...extra });
  const hid = (s: State): State => ({ ...s, o: 0 });
  const at = (n: string): State => H(R[n].x, R[n].y, R[n].w, R[n].h);
  const moved = (n: string, d: Partial<Rect>) => hid({ ...at(n), ...d });
  const per = (fn: (i: number) => State) => STEPS.map((_, i) => fn(i));

  const canvas = document.createElement("div");
  canvas.className = "asm__canvas";
  const world = document.createElement("div");
  world.className = "asm__world";
  const overlay = document.createElement("div");
  overlay.className = "asm__overlay";
  // Selections sit on their own layer, in canvas coordinates (the overlay may be scaled)
  const marks = document.createElement("div");
  marks.className = "asm__overlay asm__marks";
  canvas.append(world, overlay, marks);
  root.appendChild(canvas);

  const els: { e: HTMLElement; states: State[]; delays: number[] }[] = [];
  const add = (parent: HTMLElement, cls: string, inner: string | { img: string }, states: State[], delays: number[] = []) => {
    let e: HTMLElement;
    if (typeof inner === "object") {
      const img = document.createElement("img");
      img.src = `${v.dir}/${theme}/${inner.img}.webp`;
      img.alt = "";
      img.draggable = false;
      e = img;
    } else {
      e = document.createElement("div");
      e.innerHTML = inner;
    }
    e.className = `asm-el ${cls}`;
    parent.appendChild(e);
    els.push({ e, states, delays });
    return e;
  };
  const D = (step: number, sec: number) => { const d: number[] = []; d[step] = sec; return d; };
  const P = PRODUCT;

  // ── The page ──
  add(world, "asm-page", "", per((i) => (i === P ? H(0, 0, v.parts.width, v.parts.height * 1.5) : H(0, 0, v.parts.width, v.parts.height * 1.5, { o: 0 }))));
  // The white surface appears with the organism, as in the product
  add(world, "asm-surface", "", per((i) => (i === P ? H(296, 136, 1120, 1226) : i === 4 ? H(296, 136, 1120, 820) : H(296, 160, 1120, 760, { o: 0 }))));
  add(world, "asm-sprite", { img: "topbar" }, per((i) => (i === P ? at("topbar") : moved("topbar", { y: -64 }))), D(P, 0.15));
  for (let k = 0; k < 7; k++) add(world, "asm-sprite", { img: `side-${k}` }, per((i) => (i === P ? at(`side-${k}`) : moved(`side-${k}`, { x: -240 }))), D(P, 0.35 + k * 0.07));
  add(world, "asm-divider", "", per((i) => (i === P ? at("divider") : moved("divider", { x: -240 }))), D(P, 0.6));
  add(world, "asm-sprite", { img: "feature" }, per((i) => (i === P ? at("feature") : moved("feature", { y: 1420 }))), D(P, 0.9));
  add(world, "asm-sprite", { img: "title" }, per((i) => (i === P ? at("title") : moved("title", { y: 50 }))), D(P, 0.8));
  add(world, "asm-sprite", { img: "download" }, per((i) => (i === P ? at("download") : moved("download", { y: 40 }))), D(P, 1));

  // Toolbar: the search and the status select start as atoms; the other filters join them
  const searchAtom = H(329, 181, R.search.w, R.search.h); // row 1: search, select; row 2: button, badge, copy
  add(world, "asm-sprite", { img: "search" }, per((i) => (i === 2 ? searchAtom : i >= 3 ? at("search") : hid(searchAtom))));
  add(world, "asm-sprite", { img: "filter-0" }, per((i) => (i >= 3 ? at("filter-0") : moved("filter-0", { y: 210 }))), D(3, 0.25));
  const selectAtom = H(630, 181, R["filter-1"].w, R["filter-1"].h);
  add(world, "asm-sprite", { img: "filter-1" }, per((i) => (i === 2 ? selectAtom : i >= 3 ? at("filter-1") : hid(selectAtom))));
  add(world, "asm-sprite", { img: "filter-2" }, per((i) => (i >= 3 ? at("filter-2") : moved("filter-2", { y: 210 }))), D(3, 0.35));

  // Table: row 0 is the molecule; the header and the other rows make the organism
  add(world, "asm-sprite", { img: "thead" }, per((i) => (i >= 4 ? at("thead") : moved("thead", { y: 244 }))), D(4, 0.15));
  add(world, "asm-sprite", { img: "row-0" }, per((i) => (i >= 3 ? at("row-0") : hid(at("row-0")))), D(3, 0.45));
  for (let k = 1; k < 12; k++) add(world, "asm-sprite", { img: `row-${k}` }, per((i) => (i >= 4 ? at(`row-${k}`) : moved(`row-${k}`, { y: R[`row-${k}`].y + 30 }))), D(4, 0.2 + k * 0.06));
  // Atoms that land in row 0, on their exact places
  const badgeAtom = H(491, 238, R.badge.w, R.badge.h);
  const copyAtom = H(569, 238, R.copy.w, R.copy.h);
  add(world, "asm-sprite asm-front", { img: "badge" }, per((i) => (i === 2 ? badgeAtom : i === 3 ? at("badge") : i < 2 ? hid(badgeAtom) : hid(at("badge")))));
  add(world, "asm-sprite asm-front", { img: "copy" }, per((i) => (i === 2 ? copyAtom : i === 3 ? at("copy") : i < 2 ? hid(copyAtom) : hid(at("copy")))));
  // The button atom waits off screen, then lands in the page title row
  const createAtom = H(329, 233, R.create.w, R.create.h);
  add(world, "asm-sprite", { img: "create" }, per((i) => (i === 2 ? createAtom : i === P ? at("create") : i < 2 ? hid(createAtom) : moved("create", { y: 40 }))), D(P, 1.05));

  // ── Primitives and semantic tokens, on the tile ──
  // Each token takes its dot from the primitive it is made of in this theme
  const chipOf = (name: string) => T.tokens.findIndex((t) => t.primitive === name);
  T.primitives.forEach(({ hex: c, name }, k) => {
    const col = k % 5, row = Math.floor(k / 5);
    const base = H(120 + col * 62, 120 + DY + row * 66, 44, 44, { bg: c, r: 8 });
    const chip = chipOf(name);
    const dot = chip >= 0 ? H(chipAt(chip).x + 9, chipAt(chip).y + 9, 12, 12, { bg: c, r: 3 }) : null;
    add(overlay, "asm-swatch", "", per((i) => (i === 0 ? base : i === 1 ? (dot ?? { ...hid(base), x: base.x + 16, y: base.y + 16, w: 12, h: 12 }) : hid(dot ?? base))));
    add(overlay, "asm-swatch-name", name, per((i) => H(base.x + 22, base.y + 50, 0, 0, { o: i === 0 ? 1 : 0 })));
  });
  T.tokens.forEach(({ name: t }, k) => {
    const c = chipAt(k);
    add(overlay, "asm-chip", t, per((i) => (i === 1 ? H(c.x, c.y, c.w, c.h) : i === 0 ? H(c.x + 20, c.y, c.w - 40, c.h, { o: 0 }) : H(c.x, c.y, c.w, c.h, { o: 0 }))));
  });

  // Selections: two for the steps, one per named part of the product
  const makeSel = () => {
    const e = document.createElement("div");
    e.className = "asm-el asm-sel";
    e.innerHTML = "<b></b>";
    e.style.opacity = "0";
    marks.appendChild(e);
    return e;
  };
  const sels = [makeSel(), makeSel()];
  const named = NAMED.map(() => {
    const e = makeSel();
    e.classList.add("asm-sel--still");
    return e;
  });

  const paint = (e: HTMLElement, s: State, delay: number) => {
    e.style.transitionDelay = `${delay}s`;
    e.style.left = `${s.x}px`;
    e.style.top = `${s.y}px`;
    e.style.width = s.w ? `${s.w}px` : "";
    e.style.height = s.h ? `${s.h}px` : "";
    e.style.opacity = String(s.o);
    if (s.bg) e.style.backgroundColor = s.bg;
    if (s.r !== undefined) e.style.borderRadius = `${s.r}px`;
  };
  const toTile = (r: Rect, cam: Cam) => ({ x: r.x * cam.s + cam.tx, y: r.y * cam.s + cam.ty, w: r.w * cam.s, h: r.h * cam.s });
  const label = (sel: HTMLElement, text: string, spot: "below" | "above" | "inside" | "inside-mid" | "below-right") => {
    const b = sel.querySelector("b")!;
    b.textContent = text;
    b.dataset.spot = spot;
  };

  const captioned = !!root.closest(".tile");
  let canvasH = 0; // set by fitCanvas
  let viewH = TILE.h - (captioned ? CAPTION : 0);
  let cams = camsFor(viewH);
  let so = 1, ox = 0, oy = 0; // how the primitives' layer is scaled and moved
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let step = reduce ? PRODUCT : 0;

  const show = (i: number) => {
    els.forEach(({ e, states, delays }) => paint(e, states[i], delays[i] ?? 0));
    const cam = cams[i] ?? cams[2]!;
    world.style.transform = `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})`;
    world.style.opacity = i < 2 ? "0" : "1";
    sels.forEach((sel, n) => {
      const r = SELS[i][n];
      if (!r) { sel.style.opacity = "0"; return; }
      const t = i < 2 ? { x: r.x * so + ox, y: r.y * so + oy, w: r.w * so, h: r.h * so } : toTile(r, cam);
      paint(sel, { ...t, o: 1 }, 0);
      label(sel, SEL_LABELS[i][n], t.y + t.h + 24 < viewH ? "below" : "above");
    });
    // The assembled product names its parts, all together, until the loop starts again
    named.forEach((sel, n) => {
      if (i !== P) { sel.style.transitionDelay = "0s"; sel.style.opacity = "0"; return; }
      const [text, r, spot] = NAMED[n];
      const t = toTile(r, cam);
      t.x = Math.max(1, t.x); t.y = Math.max(1, t.y);
      t.w = Math.min(t.w, TILE.w - 1 - t.x); t.h = Math.min(t.h, canvasH - 1 - t.y);
      paint(sel, { ...t, o: 1 }, 2.2 + n * 0.12);
      label(sel, text, spot === "below" && t.x + 150 > TILE.w ? "below-right" : spot);
    });
  };

  // The canvas is 540 wide; in a box wider than the tile's proportions (a case hero, a tablet tile) it gets shorter,
  // so the product still fills the width; otherwise it is 540 × 520, fitted and centred
  const fitCanvas = () => {
    const b = root.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const wide = b.width / b.height > TILE.w / TILE.h;
    const h = wide ? (TILE.w * b.height) / b.width : TILE.h;
    const k = wide ? b.width / TILE.w : Math.min(b.width / TILE.w, b.height / TILE.h);
    canvas.style.height = `${h}px`;
    canvas.style.transform = `translateX(${(b.width - TILE.w * k) / 2}px) scale(${k})`;
    if (Math.abs(h - canvasH) < 1) return;
    canvasH = h;
    viewH = h - (captioned ? CAPTION : 0);
    cams = camsFor(viewH);
    // Primitives and tokens are drawn for a 450-high view: centred, and smaller when the view is lower
    so = Math.min(1, (viewH - 24) / 260);
    ox = (TILE.w / 2) * (1 - so);
    oy = viewH / 2 - 215 * so; // 215: the middle of the swatches or the chips with their name under them
    overlay.style.transform = `translate(${ox}px, ${oy}px) scale(${so})`;
    show(step);
  };
  const ro = new ResizeObserver(fitCanvas);
  ro.observe(root);
  fitCanvas();

  // Runs only while the tile is on screen and not under the pointer (the tile's own is-running class)
  const tile = root.closest<HTMLElement>(".tile");
  let timer = 0;
  let hovered = false;
  const running = () => !reduce && (!tile || tile.classList.contains("is-running")) && !hovered;
  const tick = () => { step = (step + 1) % STEPS.length; show(step); schedule(); };
  const schedule = () => { window.clearTimeout(timer); if (running()) timer = window.setTimeout(tick, STEPS[step].ms); };
  show(step);
  schedule();
  const mo = new MutationObserver(schedule);
  if (tile) mo.observe(tile, { attributes: true, attributeFilter: ["class"] });
  const enter = () => { hovered = true; schedule(); };
  const leave = () => { hovered = false; schedule(); };
  tile?.addEventListener("pointerenter", enter);
  tile?.addEventListener("pointerleave", leave);

  return () => {
    window.clearTimeout(timer);
    ro.disconnect();
    mo.disconnect();
    tile?.removeEventListener("pointerenter", enter);
    tile?.removeEventListener("pointerleave", leave);
    canvas.remove();
  };
}
