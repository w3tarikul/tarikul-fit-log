import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
