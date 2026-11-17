import Image from "next/image";

type Part = { src: string; width: number; height: number; alt: string; title: string };

/** A client design system's components on one sheet: crops of Lera's Figma laid out together on a grey panel,
 *  like the components page of the file. Each opens larger; one caption for the sheet. */
export function KitSheet({ parts, caption }: { parts: Part[]; caption: string }) {
  return (
    <figure className="kit-sheet case-wide">
      <div className="kit-sheet__panel">
        {parts.map((p) => (
          <button
            key={p.src}
            type="button"
            className="kit-sheet__part"
            data-zoom={p.src}
            data-zoom-w={p.width}
            data-zoom-h={p.height}
            data-zoom-alt={p.alt}
            data-zoom-cap={p.title}
            aria-label={`Open larger: ${p.title}`}
          >
            <Image src={p.src} width={p.width} height={p.height} alt={p.alt} sizes="(max-width: 640px) 100vw, 360px" quality={90} />
          </button>
        ))}
      </div>
      <figcaption className="fig__cap">{caption}</figcaption>
    </figure>
  );
}
