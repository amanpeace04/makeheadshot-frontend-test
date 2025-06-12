import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.module.rules.push({
        test: /face-api\.js/,
        use: "null-loader",
      });
    }

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        encoding: false,
      };
    }

    return config;
  },
};

export default nextConfig;
