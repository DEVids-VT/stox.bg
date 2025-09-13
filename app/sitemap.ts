import { MetadataRoute } from 'next'
import { createSupabaseClient } from '@/lib/supabase'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://stox.bg'
  const now = new Date().toISOString()

  // Core static pages
  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/business`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/technology`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/legal`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]

  // Blog/article posts from database (slugged, not deleted)
  try {
    const supabase = createSupabaseClient()
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug, published_at, isdeleted')
      .eq('isdeleted', false)
      .not('slug', 'is', null)
      .neq('slug', '')
      .order('id', { ascending: false })

    if (error) {
      console.error('Sitemap posts fetch error:', error)
      return staticEntries
    }

    const postEntries: MetadataRoute.Sitemap = (posts || []).map((p: { slug: string; published_at?: string | null }) => {
      const lastmod = p.published_at ? new Date(p.published_at).toISOString() : now
      return {
        url: `${baseUrl}/c/${encodeURIComponent(p.slug)}`,
        lastModified: lastmod,
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    })

    return [...staticEntries, ...postEntries]
  } catch (e) {
    console.error('Sitemap generation error:', e)
    return staticEntries
  }
}
