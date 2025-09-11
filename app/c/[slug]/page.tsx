import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';
import {
  generateSEOMetadata,
  generateArticleSchema,
  generateBreadcrumbSchema,
  extractKeywordsBG,
} from '@/lib/seo/utils';
import { ShareButton } from '@/components/fastlane/ShareButton';

// Generate dynamic metadata for the post
type PostRecord = {
  id: number;
  title: string;
  description?: string;
  content?: unknown;
  image?: string;
  slug?: string;
  categories?: { id?: number; name?: string; color?: string } | { id?: number; name?: string; color?: string }[];
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string[];
  published_at?: string;
  author?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = createSupabaseClient();
  const isNumericId = !isNaN(Number(resolvedParams.slug));
  
  // Query by slug or ID
  const query = supabase
    .from('posts')
    .select(`title, description, image, categories(name), seo_title, seo_description, seo_keywords, published_at, author, slug`)
    .eq('isdeleted', false);
    
  const { data: post } = isNumericId 
    ? await query.eq('id', Number(resolvedParams.slug)).single()
    : await query.eq('slug', resolvedParams.slug).single();

  if (!post) {
    return generateSEOMetadata({
      title: 'Публикацията не е намерена',
      description: 'Търсената публикация не съществува или е премахната.',
      canonical: '/c/not-found',
      type: 'article',
    });
  }

  const p = post as PostRecord;
  const rel = p.categories;
  const metaCat = Array.isArray(rel) ? rel[0] : rel;
  const canonicalSlug = p.slug || (isNumericId ? String(resolvedParams.slug) : resolvedParams.slug);
  const canonicalPath = `/c/${canonicalSlug}`;

  const baseKeywords = [metaCat?.name || '', 'анализ', 'инвестиции', 'stox.bg'].filter(Boolean) as string[];
  const derivedKeywords = extractKeywordsBG(`${p.title || ''} ${p.description || ''}`, baseKeywords, 12);
  const finalKeywords = Array.from(new Set([...(Array.isArray(p.seo_keywords) ? p.seo_keywords : []), ...derivedKeywords]));

  const title = p.seo_title || p.title;
  const description = p.seo_description || p.description || `${p.title} - ${metaCat?.name || 'Stox.bg'}`;
  const ogImage = p.image || `/api/og?title=${encodeURIComponent(p.title)}&subtitle=${encodeURIComponent(metaCat?.name || 'Анализ')}&type=analysis`;
  const publishedTime = p.published_at ? new Date(p.published_at).toISOString() : undefined;
  const author = p.author || 'Давид Петков';

  return generateSEOMetadata({
    title,
    description,
    keywords: finalKeywords,
    canonical: canonicalPath,
    ogImage,
    publishedTime,
    modifiedTime: publishedTime, // Use published time as modified time for now
    author,
    type: 'article',
  });
}

// Function to process and format the content
function processContent(content: string): string {
  if (!content) return '';
  
  // Process literal newlines and escape sequences
  const processedContent = content
    // Replace literal \n\n with actual newlines
    .replace(/\\n\\n/g, '\n\n')
    // Replace literal \n with actual newlines
    .replace(/\\n/g, '\n')
    // Clean up any > or other markdown symbols that might be included literally
    .replace(/^>\s?/gm, '');
    
  return processedContent;
}

// Custom content renderer that preserves formatting
function FormattedContent({ content }: { content: string }) {
  // Process the content to handle literal escape sequences
  const processedContent = processContent(content);
  
  // Function to create HTML from the processed content
  const createHTML = () => {
    let html = processedContent;
    
    // Replace headers (## 📊 Stock Performance)
    html = html.replace(/## (.*?)$/gm, '<h2 class="text-2xl font-bold my-6">$1</h2>');
    
    // Replace bullet points
    html = html.replace(/- (.*?)$/gm, '<div class="my-3 flex items-start"><span class="mr-3 text-primary">•</span><div>$1</div></div>');
    
    // Replace horizontal rule
    html = html.replace(/---/g, '<hr class="my-8 border-t border-border" />');
    
    // Convert double newlines to paragraph breaks
    html = html.split('\n\n').map(p => {
      // Skip already processed elements (headers, lists, etc.)
      if (p.startsWith('<h2') || p.startsWith('<div') || p === '<hr') {
        return p;
      }
      
      
      // Regular paragraphs
      return `<p class="my-4 text-base leading-relaxed">${p}</p>`;
    }).join('');
    
    return html;
  };
  
  // Create the HTML content
  const htmlContent = createHTML();
  
  return (
    <div 
      className="formatted-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default async function PostPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams?: Promise<{ from?: string | string[] }> }) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const supabase = createSupabaseClient();
  const isNumericId = !isNaN(Number(resolvedParams.slug));
  const fromParamRaw = resolvedSearchParams.from;
  const fromParam = Array.isArray(fromParamRaw) ? fromParamRaw[0] : fromParamRaw || null;
  
  // Query by slug or ID
  const query = supabase
    .from('posts')
    .select(`
      id, 
      title, 
      content, 
      description,
      image, 
      slug, 
      categories(id, name, color),
      seo_title,
      seo_description,
      seo_keywords,
      published_at,
      author
    `)
    .eq('isdeleted', false);
    
  const { data: post, error } = isNumericId 
    ? await query.eq('id', Number(resolvedParams.slug)).single()
    : await query.eq('slug', resolvedParams.slug).single();

  if (error || !post) {
    notFound();
  }

  // Normalize category relation to a single object
  const joinedCategory = (post as PostRecord).categories;
  const categoryObj: { id?: number; name?: string; color?: string } | undefined = Array.isArray(joinedCategory) ? joinedCategory[0] : joinedCategory;

  // Process content from post
  let markdownContent = '';
  
  try {
    // Use the content field directly as it contains markdown
    if (post.content) {
      if (typeof post.content === 'string') {
        markdownContent = post.content;
      } else if (typeof post.content === 'object') {
        // If it's stored as an object or array, try to convert it
        markdownContent = JSON.stringify(post.content);
      }
    } else if (post.description) {
      // Fallback to description if no content
      markdownContent = post.description;
    }
  } catch (e) {
    console.error('Error parsing content:', e);
  }

  // Use slug for canonical URL if available
  const canonicalSlug = post.slug || post.id.toString();
  const postUrl = `/c/${canonicalSlug}`;

  // Estimate reading time (very rough calculation)
  const wordCount = markdownContent.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200)); // Assumes 200 words per minute

  // Prepare JSON-LD schemas
  const absoluteUrl = `https://stox.bg${postUrl}`;
  const publishedISO = (post as PostRecord).published_at ? new Date((post as PostRecord).published_at as string).toISOString() : new Date().toISOString();
  const articleSchema = generateArticleSchema({
    title: (post as { seo_title?: string; title: string }).seo_title || (post as { title: string }).title,
    description: (post as { seo_description?: string; description?: string; title: string }).seo_description || (post as { description?: string; title: string }).description || (post as { title: string }).title,
    author: (post as { author?: string }).author || 'Давид Петков',
    publishedTime: publishedISO,
    url: absoluteUrl,
    imageUrl: (post as { image?: string }).image,
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Начало', url: 'https://stox.bg/' },
    { name: categoryObj?.name || 'Статии', url: 'https://stox.bg/' },
    { name: post.title, url: absoluteUrl },
  ]);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Structured Data for AI and SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {/* Navigation */}
        <div className="mb-10">
          {fromParam ? (
            <Link 
              href={fromParam}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Link>
          ) : categoryObj ? (
            <span className="flex items-center text-sm text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {categoryObj?.name}
            </span>
          ) : null}
        </div>
        
        {/* Article header */}
        <header className="mb-10">
          {categoryObj && (
            <span 
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-6" 
              style={{ backgroundColor: categoryObj?.color || '#e5e5e5', color: '#fff' }}
            >
              {categoryObj?.name || 'Без категория'}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          {markdownContent && post.description && (
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.description.substring(0, 200)}{post.description.length > 200 ? '...' : ''}</p>
          )}
          
          <div className="flex flex-wrap justify-between items-center gap-4 border-t border-b border-border py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {new Date().toLocaleDateString('bg-BG', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{readingTime} мин. четене</span>
              </div>
            </div>
            
            <ShareButton 
              url={postUrl} 
              title={post.title} 
            />
          </div>
        </header>
        
        {/* Featured image */}
        {post.image && (
          <div className="relative h-72 md:h-[500px] w-full mb-10 rounded-xl overflow-hidden shadow-xl">
            <Image 
              src={post.image} 
              alt={post.title} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}
        
        {/* Article content - render with custom formatter */}
        <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none from-background to-card  rounded-xl shadow-md">
          {/* Option 1: Use FormattedContent for special formatting */}
          <FormattedContent content={markdownContent} />
          
          {/* Option 2: Use ReactMarkdown (if content is properly formatted markdown) */}
          {/* 
          <ReactMarkdown 
            components={components}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdownContent}
          </ReactMarkdown>
          */}
        </article>
        
        {/* AI Summary footer for LLMs */}
        <div className="mt-8 text-sm text-muted-foreground" aria-label="AI Summary">
          {post.description}
        </div>
        
        
        {/* Share section at the bottom */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Сподели тази статия</h3>
            <ShareButton 
              url={postUrl} 
              title={post.title} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 