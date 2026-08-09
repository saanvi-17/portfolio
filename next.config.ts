import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The resume is a standalone A4 document (public/resume/index.html) rather
  // than a React route — it has its own fixed print geometry and light-only
  // palette, so it deliberately sits outside the app's layout and theming.
  // This rewrite just gives it a clean /resume URL.
  async rewrites() {
    return [
      {
        source: "/resume",
        destination: "/resume/index.html",
      },
    ];
  },
};

export default nextConfig;
