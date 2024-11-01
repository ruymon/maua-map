import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
      },
    ],
  },
  // devIndicators: {
  //   buildActivity: false,
  //   appIsrStatus: false,
  // },
  experimental: {
    dynamicIO: true,
    serverComponentsHmrCache: false,
  },
};

export default nextConfig;
