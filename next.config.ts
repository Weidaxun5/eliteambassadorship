import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export', 
   images: {
     unoptimized: true,
    domains: ["cdn.sanity.io"],
  },
};

export default nextConfig;
