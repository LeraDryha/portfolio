import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { IconSprite } from "@/components/shell/Icons";
import { themeScript } from "@/components/shell/theme";
import "../ui/kit.css";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
});

const description =
  "Portfolio of Lera Starychenko, a product designer. Case studies in e-commerce, fintech and adtech, a design system, and Prevently, a product taken from idea to the App Store.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lerastarychenko.vercel.app"),
  title: { default: "Lera Starychenko · Product Designer", template: "%s · Lera Starychenko" },
  description,
  openGraph: { type: "website", siteName: "Lera Starychenko", title: "Lera Starychenko · Product Designer", description, url: "/" },
  twitter: { card: "summary_large_image", title: "Lera Starychenko · Product Designer", description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <script id="theme-gate" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="page">
        <IconSprite />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
