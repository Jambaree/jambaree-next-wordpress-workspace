/** @type {import('next').NextConfig} */

const wpBaseUrl = process.env.NEXT_PUBLIC_WP_URL?.replace("https://", "");

const nextConfig = {
  // experimental: {
  //   ppr: true,
  // },

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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
