import Image from "next/image";

type Card = {
  role: string;
  photo: { src: string; alt: string };
  facts: [string, string][];
  about: string;
  goals: string;
  needs: string;
  challenges: string[];
};

/** Personas side by side, as on Lera's board: a photo and the facts, then who they are, their goal, what they need
 *  and what gets in the way. White cards on a grey panel; one under another on phones. */
export function PersonaCards({ items, caption }: { items: Card[]; caption: string }) {
  return (
    <figure className="personas case-wide">
      <div className="personas__panel">
        {items.map((p) => (
          <section key={p.role} className="define__card personas__card">
            <h4 className="personas__role">{p.role}</h4>
            <div className="personas__who">
              <Image className="personas__photo" src={p.photo.src} width={420} height={458} alt={p.photo.alt} sizes="(max-width: 640px) 40vw, 150px" />
              <dl className="personas__facts">
                {p.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="personas__part">
              <p className="define__label">About the user</p>
              <p>{p.about}</p>
            </div>
            <div className="personas__part">
              <p className="define__label">Goals and motivation</p>
              <p>{p.goals}</p>
            </div>
            <div className="personas__part">
              <p className="define__label">Needs and expectations</p>
              <p>{p.needs}</p>
            </div>
            <div className="personas__part">
              <p className="define__label">Challenges and issues</p>
              <ul className="define__list">
                {p.challenges.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
