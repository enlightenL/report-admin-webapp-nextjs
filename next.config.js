const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * 아직 베타 기능이라 이거 있으면 `next export` 안됨
   */
  // experimental: {
  //   appDir: true,
  // },
  pageExtensions: ['page.js', 'page.jsx', 'page.ts', 'page.tsx', 'api.js', 'api.ts'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    loader: 'imgix',
    path: '/',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.(gql|graphql)$/i,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
};

module.exports = nextConfig;
