import { createSupabaseClient } from '@/lib/supabase';
import RSS from 'rss';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stox.bg';
    
    // Create RSS feed instance
    const feed = new RSS({
      title: 'stox.bg - проект на Devids',
      description: 'Най-новите новини от Devids',
      feed_url: `${baseUrl}/feed.xml`,
      site_url: baseUrl,
      language: 'bg',
      copyright: `© ${new Date().getFullYear()} stox.bg - проект на Devids`,
      managingEditor: 'contact@stox.bg (stox.bg Team)',
      webMaster: 'contact@stox.bg (stox.bg Team)',
      ttl: 60, // Time to live in minutes
      // Add WebSub (PubSubHubbub) links
      custom_elements: [
        {
          'atom:link': {
            _attr: {
              rel: 'hub',
              href: 'https://pubsubhubbub.appspot.com/'
            }
          }
        },
        {
          'atom:link': {
            _attr: {
              rel: 'self',
              href: `${baseUrl}/feed.xml`,
              type: 'application/rss+xml'
            }
          }
        }
      ],
      custom_namespaces: {
        'atom': 'http://www.w3.org/2005/Atom'
      }
    });

    // Fetch posts from Supabase
    const supabase = createSupabaseClient();
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        description,
        image,
        slug,
        published_at,
        author,
        categories(id, name)
      `)
      .eq('isdeleted', false)
      .not('slug', 'is', null)
      .neq('slug', '')
      .order('published_at', { ascending: false })
      .limit(50); // Limit to 50 most recent posts

    if (error) {
      console.error('RSS feed error:', error);
      return new NextResponse('Error generating RSS feed', { status: 500 });
    }

    // Add posts to feed
    if (posts && posts.length > 0) {
      for (const post of posts) {
        const postUrl = `${baseUrl}/c/${encodeURIComponent(post.slug)}`;
        const publishDate = post.published_at 
          ? new Date(post.published_at) 
          : new Date();

        // Extract category name
        const categoryName = Array.isArray(post.categories) && post.categories.length > 0 
          ? post.categories[0].name 
          : 'Общи';

        // Clean and prepare description
        let description = post.description || '';
        if (!description && post.content) {
          // Extract first paragraph from content as description
          const contentStr = typeof post.content === 'string' ? post.content : JSON.stringify(post.content);
          description = contentStr.substring(0, 200).replace(/[#*_`]/g, '') + '...';
        }

        // Add image to description if available
        if (post.image) {
          const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;
          description = `<img src="${imageUrl}" alt="${post.title}" style="max-width: 100%; height: auto;" /><br/><br/>${description}`;
        }

        feed.item({
          title: post.title,
          description: description,
          url: postUrl,
          guid: `post-${post.id}`, // Unique identifier
          categories: [categoryName],
          author: post.author || 'stox.bg Team',
          date: publishDate,
          enclosure: post.image ? {
            url: post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`,
            type: 'image/jpeg'
          } : undefined
        });
      }
    }

    // Generate XML
    const xml = feed.xml({ indent: true });

    // Return RSS feed with proper headers
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        'X-Content-Type-Options': 'nosniff'
      }
    });

  } catch (error) {
    console.error('RSS feed generation error:', error);
    return new NextResponse('Error generating RSS feed', { status: 500 });
  }
}
