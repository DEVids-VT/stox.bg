import { NextResponse } from 'next/server';
import { createSupabaseClient } from '@/lib/supabase';

// Deprecated legacy sources removed (stocks, generic categories)

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://stox.bg');

  // Static sections with current timestamps
  const currentDate = new Date().toISOString();
  const staticPages = [
    { path: '/', changeFrequency: 'daily', priority: 1.0, lastmod: currentDate },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8, lastmod: '2024-01-01T00:00:00Z' },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7, lastmod: '2024-01-01T00:00:00Z' },
    { path: '/business', changeFrequency: 'weekly', priority: 0.8, lastmod: currentDate },
    { path: '/technology', changeFrequency: 'weekly', priority: 0.8, lastmod: currentDate },
  ];

  // Dynamic posts
  type PostLite = { id: number; slug: string | null; published_at: string | null };
  let postEntries: { path: string; lastmod: string; changeFrequency: string; priority: number }[] = [];
  try {
    const supabase = createSupabaseClient();
    const { data: posts } = await supabase
      .from('posts')
      .select('id, slug, published_at, isdeleted')
      .eq('isdeleted', false)
      .order('id', { ascending: false })
      .limit(2000);

    if (posts && Array.isArray(posts)) {
      postEntries = (posts as PostLite[]).map((p) => {
        const slugOrId = p.slug ?? String(p.id);
        return {
          path: `/c/${slugOrId}`,
          lastmod: (p.published_at ? new Date(p.published_at) : new Date()).toISOString(),
          changeFrequency: 'weekly',
          priority: 0.9,
        };
      });
    }
  } catch {
    // Fallback: no dynamic posts
    postEntries = [];
  }

  const allEntries = [
    ...staticPages.map(s => ({ ...s, url: `${baseUrl}${s.path}` })),
    ...postEntries.map(p => ({ ...p, url: `${baseUrl}${p.path}` })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allEntries
  .map(
    page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
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