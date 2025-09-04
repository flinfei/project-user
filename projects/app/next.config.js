/** @type {import('next').NextConfig} */
const i18nConfig = require('./next-i18next.config.js');

const nextConfig = {
  i18n: i18nConfig.i18n,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
