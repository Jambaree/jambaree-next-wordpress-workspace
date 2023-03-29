/** @type {import('next').NextConfig} */

const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL?.replace("https://", "");

const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ["images.unsplash.com", "tailwindui.com", wpBaseUrl],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
