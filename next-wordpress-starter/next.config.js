/** @type {import('next').NextConfig} */

const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL?.replace("https://", "");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: wpBaseUrl,
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
