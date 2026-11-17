import Image from "next/image";

type Shot = { src: string; width: number; height: number; alt: string; caption: string };

/** Phone screenshots that already come in a device frame (Lera's mockups): shown whole, side by side, each opens larger. */
export function FramedPhones({ shots }: { shots: Shot[] }) {
  return (
    <div className="phone-shots">
      {shots.map((s) => (
        <figure key={s.src} className="phone-shots__item">
          <button type="button" className="phone-shots__zoom" data-zoom={s.src} data-zoom-w={s.width} data-zoom-h={s.height} data-zoom-alt={s.alt} data-zoom-cap={s.caption} aria-label={`Open larger: ${s.caption}`}>
            <Image src={s.src} width={s.width} height={s.height} alt={s.alt} sizes="(max-width: 640px) 33vw, 200px" quality={90} />
          </button>
          <figcaption className="fig__cap">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
