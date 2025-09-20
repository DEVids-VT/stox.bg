/**
 * Utility functions for search engine indexing
 */

export interface IndexingResult {
  success: boolean;
  error?: string;
}

export interface IndexingResponse {
  success: boolean;
  message: string;
  url: string;
  results: {
    google?: IndexingResult;
    bing?: IndexingResult;
  };
}

/**
 * Submit a URL to search engines for indexing
 */
export async function submitUrlForIndexing(url: string): Promise<IndexingResponse> {
  try {
    const response = await fetch('/api/index-now', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to submit URL for indexing: ${(error as Error).message}`);
  }
}

/**
 * Submit multiple URLs for indexing with delay between requests
 */
export async function submitMultipleUrls(
  urls: string[], 
  delayMs: number = 1000
): Promise<IndexingResponse[]> {
  const results: IndexingResponse[] = [];
  
  for (const url of urls) {
    try {
      const result = await submitUrlForIndexing(url);
      results.push(result);
      
      // Add delay between requests to avoid rate limiting
      if (delayMs > 0 && urls.indexOf(url) < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      results.push({
        success: false,
        message: (error as Error).message,
        url,
        results: {}
      });
    }
  }
  
  return results;
}

/**
 * Get all URLs directly from database (same logic as sitemap.ts)
 */
export async function getAllSiteUrls(): Promise<string[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stox.bg';
  
  // Static pages (same as your sitemap.ts)
  const staticUrls = [
    baseUrl,
    `${baseUrl}/about`,
    `${baseUrl}/business`,
    `${baseUrl}/technology`,
    `${baseUrl}/contact`,
    `${baseUrl}/legal`,
    `${baseUrl}/terms`,
  ];

  try {
    // Import Supabase client (dynamic import to avoid issues)
    const { createSupabaseClient } = await import('@/lib/supabase');
    const supabase = createSupabaseClient();
    
    // Get all published posts (same query as your sitemap.ts)
    const { data: posts, error } = await supabase
      .from('posts')
      .select('slug')
      .eq('isdeleted', false)
      .not('slug', 'is', null)
      .neq('slug', '')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching posts for indexing:', error);
      return staticUrls;
    }

    // Generate article URLs
    const articleUrls = (posts || []).map(post => 
      `${baseUrl}/c/${encodeURIComponent(post.slug)}`
    );

    return [...staticUrls, ...articleUrls];
    
  } catch (error) {
    console.error('Error generating site URLs:', error);
    return staticUrls;
  }
}
