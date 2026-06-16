/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export to a /out folder, served by nginx on the Compute Engine
  // VM. No Node server runs in production, so this is the simplest host setup.
  output: "export",
  // the static export has no Image Optimization server, so serve images as-is
  images: { unoptimized: true },
};

export default nextConfig;
