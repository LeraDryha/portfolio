type Node = { label: string; children?: Node[] };

function Chip({ label, tone }: { label: string; tone: "entry" | "detail" | "main" | "branch" | "leaf" }) {
  return <span className={`appflow__chip appflow__chip--${tone}`}>{label}</span>;
}

function Tree({ nodes, depth }: { nodes: Node[]; depth: number }) {
  return (
    <ul className="appflow__tree">
      {nodes.map((n) => (
        <li key={n.label}>
          <Chip label={n.label} tone={depth === 0 ? "branch" : "leaf"} />
          {n.children && <Tree nodes={n.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

/** Lera's user flow, live: from the Google query to the main screen, then each part of the app as a tree, in her
 *  lavender shades (lighter before the app, deepest at the main screen). */
export function AppFlow({ entry, auth, merge, main, branches, caption }: { entry: string[]; auth: { title: string; steps: string[] }[]; merge: string; main: string; branches: Node[]; caption: string }) {
  return (
    <figure className="appflow case-wide">
      <div className="appflow__panel">
        <ol className="appflow__line" aria-label="Before the app">
          {entry.map((e) => (
            <li key={e}>
              <Chip label={e} tone="entry" />
            </li>
          ))}
        </ol>
        <div className="appflow__auth">
          {auth.map((a) => (
            <ol key={a.title} className="appflow__chain">
              <li>
                <Chip label={a.title} tone="entry" />
              </li>
              {a.steps.map((s) => (
                <li key={s}>
                  <Chip label={s} tone="detail" />
                </li>
              ))}
            </ol>
          ))}
          <span className="appflow__or">or</span>
        </div>
        <ol className="appflow__chain appflow__chain--centre">
          <li>
            <Chip label={merge} tone="entry" />
          </li>
          <li>
            <Chip label={main} tone="main" />
          </li>
        </ol>
        <div className="appflow__branches">
          {branches.map((b) => (
            <section key={b.label} className="appflow__branch">
              <Tree nodes={[b]} depth={0} />
            </section>
          ))}
        </div>
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
