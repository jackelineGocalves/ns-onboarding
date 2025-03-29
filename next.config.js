const path = require('path');
/** @type {import('next').NextConfig} */

/**
 * @type {import('next').NextConfig}
 */


const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  webpack: (config) => {
      config.resolve.alias.canvas = false
      return config
  },
  output: 'standalone',
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'net-accounts-cms.dev-irl.neartest.link',
      },
    ],
  },
};

module.exports = nextConfig;