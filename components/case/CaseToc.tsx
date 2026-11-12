"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };

/**
 * A quiet list of the case's chapters, fixed at the left on wide screens, with the one in view marked.
 * Built from the page's own sections (section[id] > h2), so every case gets it without extra content.
 */
export function CaseToc() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("article.prose section[id]")].filter((s) => s.querySelector(":scope > h2"));
    setItems(sections.map((s) => ({ id: s.id, title: s.querySelector(":scope > h2")!.textContent ?? "" })));
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  if (items.length < 3) return null;
  return (
    <nav className="case-toc" aria-label="Chapters">
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "location" : undefined}>
              {it.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
