import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["sowkhyaproducts.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sowkhyaproducts.com",
        pathname: "/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
