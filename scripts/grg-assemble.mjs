// Captures the parts of the GRG Invoices page from the live Storybook for the GRG tile animation
// (primitives → tokens → atoms → molecules → organism → product). Run it again whenever the Storybook's
// Invoices page changes, so the tile keeps matching the product:
//
//   npm run grg:assemble
//   (the first time: npx playwright-core install chromium)
//
// Writes public/work/grg-design-system/assemble/<part>.webp (2×, transparent around each part)
// and content/grg-assemble.json (where each part sits on the 1440 × 1386 page).
import { chromium } from "playwright-core";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const STORYBOOK = "https://grg-design-system.vercel.app";
const STORY = "in-product-invoices--live-flow";
const PAGE = { width: 1440, height: 1386 };
const OUT = "public/work/grg-design-system/assemble";
const DATA = "content/grg-assemble.json";

// Every part by its selector in the product (the nth match where several share one)
const PARTS = [
  ["topbar", ".grg-topbar"],
  ...Array.from({ length: 7 }, (_, i) => [`side-${i}`, ".grg-sidebar-item", i]),
  ["divider", ".grg-sidebar__divider"],
  ["feature", ".grg-feature-card"],
  ["title", ".grg-page-header__title"],
  ["download", ".grg-page-header__actions > *", 0],
  ["create", ".grg-page-header__actions > *", 1],
  ["search", ".grg-search"],
  ...Array.from({ length: 3 }, (_, i) => [`filter-${i}`, ".grg-ip-toolbar__filters > *", i]),
  ["thead", ".grg-table thead tr"],
  ...Array.from({ length: 12 }, (_, i) => [`row-${i}`, ".grg-table tbody tr", i]),
  ["badge", ".grg-table tbody tr .grg-badge", 0],
  ["copy", ".grg-table tbody tr .grg-action-button", 0],
];
// Parts with their own background, captured as they are; the rest lose the page and the surface around them
const OPAQUE = new Set(["topbar", "feature"]);
// Parts that sit edge to edge with their neighbours get no margin; the rest get a pixel, so no border is cut
const FLUSH = (name) => name === "topbar" || name === "thead" || name.startsWith("row-");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: PAGE, deviceScaleFactor: 2 });
await page.goto(`${STORYBOOK}/iframe.html?id=${STORY}&viewMode=story`);
await page.waitForSelector(".grg-table tbody tr");
await page.waitForTimeout(1500);
await page.mouse.move(PAGE.width - 4, PAGE.height - 4);

const rects = await page.evaluate((parts) => {
  const out = {};
  for (const [name, sel, n = 0] of parts) {
    const el = document.querySelectorAll(sel)[n];
    if (!el) throw new Error(`Not found: ${name} (${sel})`);
    const b = el.getBoundingClientRect();
    out[name] = { x: b.x, y: b.y, w: b.width, h: b.height };
  }
  return out;
}, PARTS);

const clipOf = (name) => {
  const r = rects[name];
  const pad = FLUSH(name) ? 0 : 1;
  const x = Math.max(0, Math.floor(r.x) - pad), y = Math.max(0, Math.floor(r.y) - pad);
  return { x, y, width: Math.ceil(r.x + r.w) + pad - x, height: Math.ceil(r.y + r.h) + pad - y };
};

await mkdir(OUT, { recursive: true });
const data = { width: PAGE.width, height: PAGE.height, parts: {} };
const shoot = async (name) => {
  const clip = clipOf(name);
  const png = await page.screenshot({ clip, omitBackground: true });
  await writeFile(`${OUT}/${name}.webp`, await sharp(png).webp({ quality: 88 }).toBuffer());
  data.parts[name] = { x: clip.x, y: clip.y, w: clip.width, h: clip.height };
};

for (const name of OPAQUE) await shoot(name);

// The page, the surface, the menu and the table become transparent; the search and the filters keep the white
// they show on the surface, so their light border still reads on the grey tile
await page.addStyleTag({
  content: `html, body, #storybook-root, .grg-theme, .grg-ip-app, .grg-ip-body, .grg-ip-page, .grg-ip-surface,
    .grg-ip-surface__section, .grg-sidebar, .grg-table, .grg-table thead, .grg-table tbody, .grg-table tr, .grg-table td,
    .grg-table th { background: transparent !important; background-color: transparent !important; box-shadow: none !important; }`,
});
await page.evaluate(() => {
  document.querySelectorAll(".grg-search, .grg-ip-toolbar__filters > *").forEach((root) =>
    [root, ...root.querySelectorAll("*")].forEach((e) => {
      const cs = getComputedStyle(e);
      if (parseFloat(cs.borderTopWidth) > 0 && e.getBoundingClientRect().height >= 30) e.style.setProperty("background-color", "var(--surface-base)", "important");
    }),
  );
});
await page.waitForTimeout(200);

for (const [name] of PARTS) {
  if (OPAQUE.has(name)) continue;
  if (name === "divider") { const r = rects.divider; data.parts.divider = { x: r.x, y: r.y, w: r.w, h: r.h }; continue; }
  await shoot(name);
}

await writeFile(DATA, JSON.stringify(data, null, 2) + "\n");
await browser.close();
console.log(`${Object.keys(data.parts).length} parts → ${OUT}, ${DATA}`);
