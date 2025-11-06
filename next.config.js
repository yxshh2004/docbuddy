/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  swcMinify: true,
  // output: 'export', 
  experimental: {
    fallbackNodePolyfills: false
  }
};

module.exports = nextConfig;
