/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
    qualities: [25, 50, 75, 100],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig);
