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
    ],
  },
};

export default withPayload(nextConfig);
