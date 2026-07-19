/** @type {import('next').NextConfig} */
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,

  // Keep CopilotKit compiled through Next so we can intercept its CSS import.
  transpilePackages: [
    '@copilotkit/react-core',
    '@copilotkit/runtime',
    '@copilotkit/shared',
    '@copilotkit/core',
  ],

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 'media.licdn.com' },
    ],
  },

  // Compression
  compress: true,

  async redirects() {
    return [
      {
        source: '/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blogs/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-label',
    ],
  },

  // Webpack optimizations (simplified for Vercel compatibility)
  webpack: (config, { dev }) => {
    // @copilotkit/react-core/v2 does `import "./index.css"`. Pages Router rejects
    // global CSS from node_modules, so stub it inside Next's oneOf chain.
    const copilotKitCssStub = {
      test: /[\\/]@copilotkit[\\/]react-core[\\/]dist[\\/]v2[\\/]index\.css$/,
      use: [path.join(__dirname, 'webpack/empty-module-loader.js')],
    };
    const oneOfRule = config.module.rules.find(
      rule => rule && typeof rule === 'object' && Array.isArray(rule.oneOf)
    );
    if (oneOfRule) {
      oneOfRule.oneOf.unshift(copilotKitCssStub);
    } else {
      config.module.rules.unshift(copilotKitCssStub);
    }

    // Only run bundle analyzer in development
    if (dev && process.env.ANALYZE === 'true') {
      config.plugins.push(
        new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: '../bundle-analyzer-report.html',
        })
      );
    }

    return config;
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
