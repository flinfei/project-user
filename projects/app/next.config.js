/** @type {import('next').NextConfig} */
const i18nConfig = require('./next-i18next.config.js');

const nextConfig = {
  i18n: i18nConfig.i18n,
  // 修复HMR相关问题
  experimental: {
    // 禁用包导入优化
    optimizePackageImports: false,
    // 禁用ISR相关功能在开发环境
    isrFlushToDisk: false,
  },
  // webpack配置
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // 开发环境下的优化设置
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
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
