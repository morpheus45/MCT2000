/** @type {import('next').NextConfig} */
// GitHub Pages: static export under https://morpheus45.github.io/MCT2000/
// Set NEXT_PUBLIC_BASE_PATH="" if you deploy at the root (Vercel / Netlify / apex domain).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/MCT2000";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  experimental: { optimizePackageImports: ["lucide-react"] },
};
module.exports = nextConfig;
