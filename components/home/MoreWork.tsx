"use client";

import { useState, type ReactNode } from "react";

/** "More work / Less work" pill that reveals the secondary cases as small white cards. */
export function MoreWork({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="pill reveal"
        type="button"
        aria-expanded={open}
        aria-controls="moreList"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Less work" : "More work"}
      </button>
      <div className="mini-tiles" id="moreList" hidden={!open}>
        {children}
      </div>
    </>
  );
}
