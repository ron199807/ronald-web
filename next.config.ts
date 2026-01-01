/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'vercel.app',
      pathname: '**',
    },
  ],
},
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // For development
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,POST' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;