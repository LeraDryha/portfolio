type Page = { page: string; /** what the page is: a text page, a list of links, a link to another site */ types?: string[]; children?: Page[] };
type Section = { title: string; pages: Page[] };

/* Layout in SVG units. Widths are estimated from the character count (generously, so a line never runs into a label). */
const FS = 11; // page and type labels
const FS_SECTION = 12;
const CH = 5.6; // estimated width of a character at FS
const CH_SECTION = 6.8;
const LH = 13; // line height
const ROW_GAP = 9;
const GAP = 44; // between columns: room for the curve
const WRAP = 28;
const PAD = 24;

type Node = { label: string; lines: string[]; depth: number; kind: "section" | "page" | "type"; kids: Node[]; y: number; h: number; w: number };

function wrap(text: string, limit: number) {
  const out: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > limit) {
      out.push(line);
      line = word;
    } else line = line ? line + " " + word : word;
  }
  out.push(line);
  return out;
}

function make(label: string, depth: number, kind: Node["kind"], kids: Node[]): Node {
  const lines = kind === "section" ? [label] : wrap(label, WRAP);
  const w = Math.max(...lines.map((l) => l.length)) * (kind === "section" ? CH_SECTION : CH);
  return { label, lines, depth, kind, kids, y: 0, h: 0, w };
}

function fromPage(p: Page, depth: number): Node {
  const kids = [...(p.types ?? []).map((t) => make(t, depth + 1, "type", [])), ...(p.children ?? []).map((c) => fromPage(c, depth + 1))];
  return make(p.page, depth, "page", kids);
}

/** Heights bottom-up, then y top-down: a leaf takes its own rows, a parent sits in the middle of its children. */
function measure(n: Node): number {
  const own = n.lines.length * LH + ROW_GAP;
  n.h = n.kids.length ? Math.max(own, n.kids.reduce((s, k) => s + measure(k), 0)) : own;
  return n.h;
}
function place(n: Node, top: number) {
  if (!n.kids.length) {
    n.y = top + n.h / 2;
    return;
  }
  const kidsH = n.kids.reduce((s, k) => s + k.h, 0);
  let t = top + (n.h - kidsH) / 2;
  for (const k of n.kids) {
    place(k, t);
    t += k.h;
  }
  n.y = (n.kids[0].y + n.kids[n.kids.length - 1].y) / 2;
}
function all(n: Node, out: Node[] = []) {
  out.push(n);
  n.kids.forEach((k) => all(k, out));
  return out;
}

type Side = { roots: Node[]; cols: number[]; h: number };
function side(sections: Section[]): Side {
  const roots = sections.map((s) => make(s.title, 1, "section", s.pages.map((p) => fromPage(p, 2))));
  let h = 0;
  for (const r of roots) h += measure(r) + ROW_GAP;
  const cols: number[] = [];
  for (const n of roots.flatMap((r) => all(r))) cols[n.depth] = Math.max(cols[n.depth] ?? 0, n.w);
  return { roots, cols, h };
}

/** Information architecture as Lera's mind map, live: the main page in the middle, sections branching left and right,
 *  each page with what kind of page it is. Scrolls sideways on narrow screens. */
export function SiteMap({ root, left, right, caption }: { root: string; left: Section[]; right: Section[]; caption: string }) {
  const L = side(left);
  const R = side(right);
  const rootW = root.length * 8.4 + 8;
  const H = Math.max(L.h, R.h) + PAD * 2;
  // x of each column: the left side grows leftwards from the root, the right side rightwards
  const lw = L.cols.slice(1).reduce((s, w) => s + w + GAP, 0);
  const cx = PAD + lw + rootW / 2;
  const xL = (d: number) => cx - rootW / 2 - L.cols.slice(1, d).reduce((s, w) => s + w + GAP, 0) - GAP; // right edge (text ends here)
  const xR = (d: number) => cx + rootW / 2 + R.cols.slice(1, d).reduce((s, w) => s + w + GAP, 0) + GAP; // left edge (text starts here)
  const W = xR(R.cols.length - 1) + R.cols[R.cols.length - 1] + PAD;

  const cy = H / 2;
  let top = cy - L.h / 2;
  for (const r of L.roots) {
    place(r, top);
    top += r.h + ROW_GAP;
  }
  top = cy - R.h / 2;
  for (const r of R.roots) {
    place(r, top);
    top += r.h + ROW_GAP;
  }

  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const m = (x1 + x2) / 2;
    return `M${x1},${y1} C${m},${y1} ${m},${y2} ${x2},${y2}`;
  };

  const paths: string[] = [];
  const labels: { n: Node; x: number; anchor: "start" | "end" }[] = [];
  const walk = (n: Node, dir: 1 | -1, px: number, py: number) => {
    const x = dir === 1 ? xR(n.depth) : xL(n.depth);
    paths.push(curve(px, py, x, n.y));
    labels.push({ n, x, anchor: dir === 1 ? "start" : "end" });
    // straight through the label to the end of its column, where the children's curves begin; the label's halo
    // (a stroke in the panel colour) hides the line under the text, so it always meets the text exactly
    const colEnd = x + dir * ((dir === 1 ? R : L).cols[n.depth] + 6);
    if (n.kids.length) {
      paths.push(`M${x},${n.y} L${colEnd},${n.y}`);
      n.kids.forEach((k) => walk(k, dir, colEnd, n.y));
    }
  };
  L.roots.forEach((r) => walk(r, -1, cx, cy));
  R.roots.forEach((r) => walk(r, 1, cx, cy));

  return (
    <figure className="sitemap case-wide">
      <div className="sitemap__scroll" role="region" aria-label={caption} tabIndex={0}>
        <svg className="sitemap__svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${caption} ${root}: ${[...left, ...right].map((s) => s.title).join(", ")}.`}>
          <g className="sitemap__lines">
            {paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </g>
          {labels.map(({ n, x, anchor }, i) => (
            <text key={i} x={x} y={n.y - ((n.lines.length - 1) * LH) / 2} textAnchor={anchor} dominantBaseline="central" className={`sitemap__${n.kind}`} fontSize={n.kind === "section" ? FS_SECTION : FS}>
              {n.lines.map((l, j) => (
                <tspan key={j} x={x} dy={j ? LH : 0}>
                  {l}
                </tspan>
              ))}
            </text>
          ))}
          <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" className="sitemap__root" fontSize={14}>
            {root}
          </text>
        </svg>
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
