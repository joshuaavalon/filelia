// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: false
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  compress: true
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;
