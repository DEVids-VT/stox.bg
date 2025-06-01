import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://stox.bg';

  const robotsTxt = `# Stox.bg - Bulgarian Stock Analysis Platform
# Enhanced for AI/LLM crawlers and traditional search engines

User-agent: *
Allow: /
Allow: /stocks/
Allow: /analysis/
Allow: /companies/
Allow: /categories/
Allow: /about
Allow: /contact
Allow: /features
Allow: /legal
Allow: /terms

# AI/LLM Specific Directives
User-agent: ChatGPT-User
Allow: /
Allow: /stocks/
Allow: /analysis/
Crawl-delay: 1

User-agent: GPTBot
Allow: /
Allow: /stocks/
Allow: /analysis/
Crawl-delay: 1

User-agent: Google-Extended
Allow: /
Allow: /stocks/
Allow: /analysis/

User-agent: CCBot
Allow: /
Allow: /stocks/
Allow: /analysis/

User-agent: anthropic-ai
Allow: /
Allow: /stocks/
Allow: /analysis/

User-agent: Claude-Web
Allow: /
Allow: /stocks/
Allow: /analysis/

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/private/
Disallow: /_next/
Disallow: /private/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Additional metadata for AI understanding
# Site-Purpose: Bulgarian stock market analysis and investment education
# Content-Language: bg, en
# Target-Audience: Bulgarian investors, financial analysts
# Author: Давид Петков (David Petkov)
# Keywords: акции, инвестиции, финанси, пазари, анализи, stocks, investments`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
} 