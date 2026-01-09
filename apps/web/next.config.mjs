import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.loadinghappiness.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/media/file/**',
      },
      {
        protocol: 'https',
        hostname: 'loadinghappiness.com',
        pathname: '/api/media/file/**',
      },
    ],
  },
};

export default withPayload(nextConfig);
