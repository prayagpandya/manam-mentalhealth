import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/services",
        destination: "/treatments",
        permanent: true,
      },
      {
        source: "/services/:slug",
        destination: "/treatments/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
