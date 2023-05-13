/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  typescript: {
    tsconfigPath: "tsconfig.next.json"
  }
};

export default nextConfig;
