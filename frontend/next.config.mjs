/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  async rewrites() {
    const catalogBase =
      process.env.CATALOG_SERVICE_INTERNAL_URL ??
      process.env.NEXT_PUBLIC_API_BASE_URL ??
      "http://localhost:8080";
    return [
      {
        source: "/api/:path*",
        destination: `${catalogBase}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
