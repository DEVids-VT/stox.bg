import { NextResponse } from 'next/server';

// Mock function to get all stocks - replace with your actual data fetching
async function getAllStocks() {
  // This would typically fetch from your database
  return [
    { ticker: 'nvda', lastModified: '2024-01-15T15:30:00Z' },
    { ticker: 'aapl', lastModified: '2024-01-14T10:00:00Z' },
    { ticker: 'tsla', lastModified: '2024-01-13T14:20:00Z' },
    { ticker: 'googl', lastModified: '2024-01-12T11:15:00Z' },
    { ticker: 'msft', lastModified: '2024-01-11T16:45:00Z' },
  ];
}

// Mock function to get all categories
async function getAllCategories() {
  return [
    { id: 'technology', lastModified: '2024-01-10T09:00:00Z' },
    { id: 'healthcare', lastModified: '2024-01-09T12:30:00Z' },
    { id: 'finance', lastModified: '2024-01-08T15:20:00Z' },
  ];
}

export async function GET() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://stox.bg';

  const stocks = await getAllStocks();
  const categories = await getAllCategories();

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: '2024-01-15T00:00:00Z',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2024-01-01T00:00:00Z',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2024-01-01T00:00:00Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: '2024-01-01T00:00:00Z',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/stocks`,
      lastModified: '2024-01-15T00:00:00Z',
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: '2024-01-15T00:00:00Z',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const stockPages = stocks.map(stock => ({
    url: `${baseUrl}/stocks/${stock.ticker.toLowerCase()}`,
    lastModified: stock.lastModified,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/categories/${category.id}`,
    lastModified: category.lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...stockPages, ...categoryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allPages
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="bg" href="${page.url}" />
    <xhtml:link rel="alternate" hreflang="bg-BG" href="${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${page.url}" />
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
} 