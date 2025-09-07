import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'https://stox.bg';

  const robotsTxt = `# stox.bg – проект на Devids
# Enhanced for AI/LLM crawlers and traditional search engines

User-agent: *
Allow: /
Allow: /business
Allow: /technology
Allow: /about
Allow: /contact
Disallow: /features
Allow: /legal
Allow: /terms
Allow: /llms.txt

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

User-agent: PerplexityBot
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

# LLM Optimization file
# See: ${baseUrl}/llms.txt

# Additional metadata for AI understanding
# Site-Purpose: Блог за бизнес и технологии от Devids
# Content-Language: bg
# Target-Audience: създатели, екипи, разработчици
# Author: Devids
# Keywords: бизнес, технологии, продукт, екип, Devids, stox.bg`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
} 