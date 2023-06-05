// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: false
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  compress: true
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
