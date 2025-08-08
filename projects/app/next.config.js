/** @type {import('next').NextConfig} */
const i18nConfig = require('./next-i18next.config.js');

const nextConfig = {
  i18n: i18nConfig.i18n,
};

module.exports = nextConfig;
