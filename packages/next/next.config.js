// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: false
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  compress: true
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
