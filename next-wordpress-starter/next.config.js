/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ["images.unsplash.com", "tailwindui.com"],
  },
};

module.exports = nextConfig;
