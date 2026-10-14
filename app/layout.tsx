import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { IconSprite } from "@/components/shell/Icons";
import { ShellBehavior } from "@/components/shell/ShellBehavior";
import "../ui/kit.css";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-geist",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: { default: "Lera Dryha · Product Designer", template: "%s · Lera Dryha" },
  description:
    "Portfolio of Lera Dryha, a product designer. Case studies in e-commerce, fintech and adtech, a design system, and Prevently, a product taken from idea to the App Store.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${newsreader.variable}`}>
      <body className="page">
        <IconSprite />
        {children}
        <ShellBehavior />
        <Analytics />
      </body>
    </html>
  );
}
