/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Recommended for GitHub Pages
};

module.exports = nextConfig;