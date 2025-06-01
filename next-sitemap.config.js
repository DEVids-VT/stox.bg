/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://stox.bg',
  generateRobotsTxt: false, // We have a custom robots.txt API route
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  
  // Transform function to add Bulgarian-specific optimizations
  transform: async (config, path) => {
    // Default configuration
    let priority = 0.7;
    let changefreq = 'weekly';

    // Set priority and frequency based on path
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/stocks/')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path.startsWith('/categories/')) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path.includes('/about') || path.includes('/contact')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'bg',
        },
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'bg-BG',
        },
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'x-default',
        },
      ],
    };
  },

  // Additional paths for dynamic content
  additionalPaths: async (config) => {
    const additionalPaths = [];

    // Add stock pages
    const stocks = ['nvda', 'aapl', 'tsla', 'googl', 'msft', 'meta', 'amzn'];
    for (const stock of stocks) {
      additionalPaths.push(
        await config.transform(config, `/stocks/${stock}`)
      );
    }

    // Add category pages
    const categories = ['technology', 'healthcare', 'finance', 'energy'];
    for (const category of categories) {
      additionalPaths.push(
        await config.transform(config, `/categories/${category}`)
      );
    }

    return additionalPaths;
  },

  // Exclude certain paths
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
  ],

  // Generate individual sitemap files for better organization
  generateIndexSitemap: true,
}; 