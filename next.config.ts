import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mapbox.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/a/zzluz68xhg/**",
      },
    ],
  },
  experimental: {
    // reactCompiler: false,
  },
};

export default withPayload(nextConfig);
