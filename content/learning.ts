/** The Learning & recognition page: an award, the courses behind the work, and the foundations. */

export type LearningItem = {
  title: string;
  /** Who issued it and when */
  meta: string;
  /** The result, if the certificate shows one */
  result?: string;
  /** Link to the certificate itself */
  href?: string;
  shot?: { src: string; width: number; height: number };
};

export const recognition: LearningItem[] = [
  {
    title: "3rd place, Product Design",
    meta: "DEV Challenge · 2024",
    result: "Finalist, then third place in the Product Design nomination",
  },
];

/** What I am learning now; becomes a course card when the certificate comes */
export const now = "Design Engineering: the certificate comes in a few weeks.";

export const courses: LearningItem[] = [
  {
    title: "UX Design",
    meta: "Projector Institute · 2024",
    href: "https://prjctr.com/certificate/01J1PRF2SVQDNZBAMZF38ZRX18",
    shot: { src: "/learning/ux-design-projector.webp", width: 1200, height: 824 },
  },
  {
    title: "Design Systems in Figma",
    meta: "Creative Practice · 2024",
    result: "100 of 100 · Top 5",
    href: "https://cases.media/en/cert/BF6U6H",
    shot: { src: "/learning/design-systems-figma.webp", width: 1200, height: 676 },
  },
  {
    title: "Basics of UX Research",
    meta: "Creative Practice · 2023",
    result: "97 of 100 · Top 5",
    href: "https://cases.media/en/cert/L9ADXY",
    shot: { src: "/learning/ux-research-basics.webp", width: 1200, height: 676 },
  },
];

/** Where it started: short courses, listed in one line */
export const foundations: { title: string; href: string }[] = [
  { title: "UX/UI. Interface design", href: "https://cases.media/en/cert/YHQ008" },
  { title: "Figma basics", href: "https://cases.media/en/cert/TZ7AWK" },
  { title: "Design basics", href: "https://cases.media/en/cert/LP9S87" },
  { title: "Web design basics", href: "https://cases.media/en/cert/TDY2U5" },
  { title: "Composition in graphic design", href: "https://cases.media/en/cert/BPK944" },
];
