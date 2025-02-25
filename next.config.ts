import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "digitalcontent.api.tesco.com",
      "example.com",
      "another-domain.com",
    ],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64],
  },
};

export default nextConfig;
