/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en-US', 'ru-RU', 'uz-UZ'],
    defaultLocale: 'en-US',
  },
}

module.exports = nextConfig
