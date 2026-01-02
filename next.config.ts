/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image configuration
  images: {
    // Add quality 90 to resolve the warning
    qualities: [75, 90],
    
    // Device and image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vercel.app',
        pathname: '**',
      },
      // Add other domains if needed
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
    ],
    
    // Optional: Configure domains for unoptimized images
    // domains: ['example.com', 'another-domain.com'],
    
    // Optional: Disable image optimization in development
    // unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // CORS headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // For development
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,POST,PUT,PATCH,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version' },
        ],
      },
    ];
  },
  
  // Optional: Enable experimental features
  // experimental: {
  //   turbo: {
  //     rules: {
  //     }
  //   }
  // }
};

module.exports = nextConfig;