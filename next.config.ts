import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Rein statische Seite (HTML in out/), gehostet auf Cloudflare Pages
  output: "export",
  // Bildoptimierung braucht einen Server – die Vorschaubilder sind bereits klein
  images: { unoptimized: true },
};

export default nextConfig;
