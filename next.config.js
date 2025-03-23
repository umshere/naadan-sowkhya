/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exclude scripts folder from being processed by webpack
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /scripts/,
    };
    return config;
  },

  // Skip ESLint during builds
  eslint: {
    // Warning: This setting will completely disable ESLint during builds
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
