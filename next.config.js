/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // Exclude unnecessary files from build
    config.module.rules.push({
      test: /\.(md|test\.[jt]sx?|config\.(js|ts)|schema\.json)$/,
      include: [/docs/, /scripts/, /src\/data\/schemas/, /\.github/],
      use: "ignore-loader",
    });
    return config;
  },
  // Enable static exports
  output: "export",
};

module.exports = nextConfig;
