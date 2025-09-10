import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'tailwindui.com',
      'stox.bg',
      'storage.googleapis.com',
      'cdn.supabase.io',
      'supabase.co',
      'picsum.photos',
      'loremflickr.com',
      'www.tradingnews.com',
      'images.unsplash.com',
      "web-cdn.markets.com",
      "cdn.markets.com",
      "png.pngtree.com",
      "gmk.center",
      "imgur.com",
      "media.discordapp.net",
      "cdn.discordapp.com",
      "cdn.leonardo.ai"
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      // Bulgarian URL rewrites for better UX
      {
        source: '/акции/:slug',
        destination: '/stocks/:slug'
      },
      {
        source: '/анализи/:slug',
        destination: '/analysis/:slug'
      },
      {
        source: '/компании/:slug',
        destination: '/companies/:slug'
      }
    ];
  },
  // Enable static exports for better performance
  trailingSlash: false,
  // Generate robots.txt and sitemap
  async redirects() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
