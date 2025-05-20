import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "digitalcontent.api.tesco.com" }],
  },
};

export default nextConfig;
