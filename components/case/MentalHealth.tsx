import Image from "next/image";

type Persona = { photo: { src: string; alt: string }; name: string; lines: string[]; interests: string; goals: string[]; motivation: string[]; needs: string[]; problems: string[] };

function List({ items }: { items: string[] }) {
  return (
    <ul className="define__list">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

/** Lera's persona sheets, live: who she is, interests, goals beside motivation, needs, problems. Two side by side. */
export function PersonaSheets({ items, caption }: { items: Persona[]; caption: string }) {
  return (
    <figure className="psheets case-wide">
      <div className="psheets__panel">
        {items.map((p) => (
          <section key={p.name} className="psheets__sheet">
            <div className="define__card psheets__who">
              <Image className="psheets__photo" src={p.photo.src} width={160} height={160} alt={p.photo.alt} sizes="64px" />
              <div>
                <h4>{p.name}</h4>
                {p.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
            </div>
            <div className="define__card">
              <p className="define__label">Interests</p>
              <p>{p.interests}</p>
            </div>
            <div className="psheets__pair">
              <div className="define__card">
                <p className="define__label">Goals</p>
                <List items={p.goals} />
              </div>
              <div className="define__card">
                <p className="define__label">Motivation</p>
                <List items={p.motivation} />
              </div>
            </div>
            <div className="define__card">
              <p className="define__label">Needs and expectations</p>
              <List items={p.needs} />
            </div>
            <div className="define__card">
              <p className="define__label">Problems and challenges</p>
              <List items={p.problems} />
            </div>
          </section>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}

/** The interview script as the paper behind, and what people said as live message bubbles over it. */
export function ScriptQuotes({ script, quotes, caption }: { script: { src: string; width: number; height: number; alt: string }; quotes: { text: string; at: [number, number, number] }[]; caption: string }) {
  return (
    <figure className="script-quotes case-wide">
      <div className="script-quotes__frame">
        <Image className="script-quotes__paper" src={script.src} width={script.width} height={script.height} alt={script.alt} sizes="(max-width: 640px) 100vw, 860px" quality={88} />
        {quotes.map((q, i) => (
          <blockquote key={i} className={`script-quotes__bubble script-quotes__bubble--${i % 2 ? "right" : "left"}`} style={{ left: `${q.at[0]}%`, top: `${q.at[1]}%`, width: `${q.at[2]}%` }}>
            <p>{q.text}</p>
          </blockquote>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
