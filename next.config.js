/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  images: {
    domains: ['images.pexels.com']
  },
  async redirects() {
    return [
      {
        source: '/learn',
        destination: '/courses',
        permanent: true,
      },
      {
        source: '/learn/:slug',
        destination: '/courses/:slug',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;