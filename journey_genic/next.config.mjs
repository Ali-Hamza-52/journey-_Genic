/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "picsum.photos",
        },{
          protocol: "https",
          hostname: "firebasestorage.googleapis.com",
        }
      ],
    },
};

export default nextConfig;
