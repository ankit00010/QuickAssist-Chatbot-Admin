import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  pageExtensions: ["ts", "tsx"],
  env: {
    SERVER_URL: process.env.SERVER_URL,
  }, 
};

export default nextConfig;
