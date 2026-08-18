import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
