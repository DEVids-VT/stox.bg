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
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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

// Function to process and clean content before markdown parsing
function processContent(content: string): string {
  if (!content) return '';
  
  let processed = content
    // Replace literal \n\n with actual newlines
    .replace(/\\n\\n/g, '\n\n')
    // Replace literal \n with actual newlines
    .replace(/\\n/g, '\n')
    // Clean up any > or other markdown symbols that might be included literally
    .replace(/^>\s?/gm, '');
  
  // Only filter out standalone raw image URLs (not in markdown format)
  processed = processed.replace(/^https?:\/\/scontent\.[^\s]+$/gm, '');
  processed = processed.replace(/^https?:\/\/[^\s]*fbcdn\.net[^\s]*$/gm, '');
  processed = processed.replace(/^https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)(\?[^\s]*)?$/gm, '');
  
  return processed;
}

// Custom markdown component with proper styling
function FormattedContent({ content }: { content: string }) {
  const processedContent = processContent(content);
  
  // Custom components for ReactMarkdown
  const components = {
    // Custom image component with proper styling
    img: ({ src, alt, ...props }: any) => {
      if (!src) {
        return null;
      }
      
      return (
        <img 
          {...props}
          src={src} 
          alt={alt || ''} 
          className="my-6 max-w-full h-auto rounded-lg shadow-md"
          loading="lazy"
        />
      );
    },
    
    // Custom link component
    a: ({ href, children, ...props }: any) => (
      <a 
        {...props}
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary hover:text-primary/80 underline"
      >
        {children}
      </a>
    ),
    
    // Custom heading components
    h1: ({ children, ...props }: any) => (
      <h1 {...props} className="text-3xl font-bold my-8">{children}</h1>
    ),
    h2: ({ children, ...props }: any) => (
      <h2 {...props} className="text-2xl font-bold my-6">{children}</h2>
    ),
    h3: ({ children, ...props }: any) => (
      <h3 {...props} className="text-xl font-bold my-4">{children}</h3>
    ),
    
    // Custom paragraph component
    p: ({ children, ...props }: any) => (
      <p {...props} className="my-4 text-base leading-relaxed">{children}</p>
    ),
    
    // Custom list components
    ul: ({ children, ...props }: any) => (
      <ul {...props} className="my-4 space-y-2">{children}</ul>
    ),
    li: ({ children, ...props }: any) => (
      <li {...props} className="flex items-start">
        <span className="mr-3 text-primary">•</span>
        <div>{children}</div>
      </li>
    ),
    
    // Custom horizontal rule
    hr: ({ ...props }: any) => (
      <hr {...props} className="my-8 border-t border-border" />
    ),
    
    // Custom blockquote
    blockquote: ({ children, ...props }: any) => (
      <blockquote {...props} className="border-l-4 border-primary pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    
    // Custom code blocks
    code: ({ inline, children, ...props }: any) => {
      return inline ? (
        <code {...props} className="bg-muted px-1 py-0.5 rounded text-sm">
          {children}
        </code>
      ) : (
        <code {...props} className="block bg-muted p-4 rounded-lg overflow-x-auto">
          {children}
        </code>
      );
    },
  };

  return (
    <div className="formatted-content prose prose-lg dark:prose-invert max-w-none">
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
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
        
        {/* Article content - render with ReactMarkdown */}
        <article className="p-8">
          <FormattedContent content={markdownContent} />
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