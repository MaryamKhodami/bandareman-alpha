import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "./serwist-sw.ts",  
  swDest: "public/sw.js",   
  register: true,
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn1.renn.ir",
      },
    ],
  },
};

export default withSerwist(nextConfig);
