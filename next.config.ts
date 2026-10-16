import type { NextConfig } from "next";

const config: NextConfig = {
  distDir: process.env.SI_BUILD_DIR || ".next",
  reactStrictMode: true,
  devIndicators: false,
  experimental: {
    mdxRs: true,
  },
};

export default config;
