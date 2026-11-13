"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/shell/Icons";

type Shot = { src: string; w: number; h: number; alt: string; cap: string };

const read = (b: HTMLElement): Shot => ({
  src: b.dataset.zoom!,
  w: Number(b.dataset.zoomW),
  h: Number(b.dataset.zoomH),
  alt: b.dataset.zoomAlt ?? "",
  cap: (b.dataset.zoomCap ?? "").replace(/\.$/, ""),
});

/** Screens open larger in a modal, without leaving the page. One per case page: any [data-zoom] button opens it;
 *  the phones in the same row are the set (arrows and ← → move through it). Esc, the × or a click outside closes it,
 *  and focus goes back to the phone that opened it. */
export function Lightbox() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [set, setSet] = useState<Shot[]>([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-zoom]");
      if (!b) return;
      opener.current = b;
      if (b.dataset.zoomList) {
        // The trigger names its own set (the theme wipe: every product in both themes)
        setSet(JSON.parse(b.dataset.zoomList) as Shot[]);
        setI(Number(b.dataset.zoomIndex ?? 0));
      } else {
        const row = b.closest(".handsets__row, .spec__pair, .fig-row, .ideas") ?? b.parentElement!;
        const all = [...row.querySelectorAll<HTMLElement>("[data-zoom]")];
        setSet(all.map(read));
        setI(all.indexOf(b));
      }
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => dialog.current?.close();
  const step = (d: number) => setI((x) => (x + d + set.length) % set.length);
  const shot = set[i];

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={shot ? shot.cap || shot.alt : "Screen"}
      onClose={() => opener.current?.focus()}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      onKeyDown={(e) => {
        if (set.length < 2) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {shot && (
        <div className="lightbox__body">
          {/* eslint-disable-next-line @next/next/no-img-element -- the original file at full size */}
          <img className="lightbox__img" src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} />
          <p className="lightbox__cap">
            {shot.cap && <span>{shot.cap}</span>}
            {set.length > 1 && (
              <span className="lightbox__count">
                {i + 1} / {set.length}
              </span>
            )}
          </p>
        </div>
      )}
      <button className="lightbox__btn lightbox__btn--close" type="button" aria-label="Close" onClick={close}>
        <Icon name="x" />
      </button>
      {set.length > 1 && (
        <>
          <button className="lightbox__btn lightbox__btn--prev" type="button" aria-label="Previous screen" onClick={() => step(-1)}>
            <Icon name="prev" />
          </button>
          <button className="lightbox__btn lightbox__btn--next" type="button" aria-label="Next screen" onClick={() => step(1)}>
            <Icon name="next" />
          </button>
        </>
      )}
    </dialog>
  );
}
