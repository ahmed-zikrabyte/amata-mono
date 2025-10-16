/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [new URL("https://amata2-dev.s3.amazonaws.com/**")],
  },
};

export default nextConfig;
