import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // 90 for screenshots full of small interface text; 75 stays the default for everything else
  images: { qualities: [75, 90] },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
