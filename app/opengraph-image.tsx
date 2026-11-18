import { ogCard, ogSize } from "@/lib/og";

export const alt = "Lera Starychenko, product designer: case studies and Prevently, a product taken from idea to the App Store.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogCard({
    kicker: "Product designer · Portfolio",
    title: "Hi, I’m Lera Starychenko. I design intuitive interfaces for mobile and web, B2B and B2C.",
    mark: "Prevently",
    cap: "a product I took from idea to the App Store, and case studies in fintech, e-commerce, adtech",
  });
}
