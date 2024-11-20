import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 호스트명 허용
        pathname: "**", // 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
