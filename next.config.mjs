/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "administrador.risunperutravel.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
