import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async rewrites() {
    return {
      fallback: [
        {
          // This will match any path that didn't match an existing file or
          // defined route.
          source: "/:path*",
          // The destination is the home page route.
          destination: "/",
        },
      ],
    };
  },
};

export default nextConfig;
