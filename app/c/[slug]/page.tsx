import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, ExternalLink, Clock } from 'lucide-react';
import { createSupabaseClient } from '@/lib/supabase';
import { createMetadata } from '@/lib/seo/metadata';
import { ShareButton } from '@/components/fastlane/ShareButton';
import { Button } from '@/components/ui/button';

// Generate dynamic metadata for the post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = createSupabaseClient();
  const isNumericId = !isNaN(Number(resolvedParams.slug));
  
  // Query by slug or ID
  const query = supabase
    .from('posts')
    .select(`title, description, image, category:category(name)`)
    .eq('isdeleted', false);
    
  const { data: post } = isNumericId 
    ? await query.eq('id', Number(resolvedParams.slug)).single()
    : await query.eq('slug', resolvedParams.slug).single();

  if (!post) {
    return createMetadata({
      title: 'Публикацията не е намерена',
      description: 'Търсената публикация не съществува или е премахната.',
      noIndex: true,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description || `${post.title} - ${post.category?.[0]?.name || 'Stox.bg'}`,
    image: post.image,
    keywords: [post.category?.[0]?.name || '', 'анализ', 'инвестиции', 'stox.bg'],
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
      
      // Special handling for AI footer
      if (p.includes('AI-analyzed by')) {
        return `<div class="mt-8 pt-4 text-sm text-muted-foreground italic border-t border-border">${p}</div>`;
      }
      
      // Regular paragraphs
      return `<p class="my-4 text-base leading-relaxed">${p}</p>`;
    }).join('');
    
    return html;
  };
  
  // Create the HTML content
  const htmlContent = createHTML();
  
  // Render the HTML directly
  return (
    <div 
      className="formatted-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = createSupabaseClient();
  const isNumericId = !isNaN(Number(resolvedParams.slug));
  
  // Query by slug or ID
  const query = supabase
    .from('posts')
    .select(`
      id, 
      title, 
      short_content, 
      content, 
      image, 
      slug, 
      externallink,
      description,
      category:category(id, name, color)
    `)
    .eq('isdeleted', false);
    
  const { data: post, error } = isNumericId 
    ? await query.eq('id', Number(resolvedParams.slug)).single()
    : await query.eq('slug', resolvedParams.slug).single();

  if (error || !post) {
    notFound();
  }

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
    } else if (post.short_content) {
      // Fallback to short_content if no content
      if (typeof post.short_content === 'string') {
        markdownContent = post.short_content;
      } else if (typeof post.short_content === 'object') {
        markdownContent = JSON.stringify(post.short_content);
      }
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

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-10">
          {post.category?.[0] ? (
            <Link 
              href={`/categories/${post.category[0].id}`} 
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад към категория {post.category[0].name}
            </Link>
          ) : (
            <Link 
              href="/fastlane" 
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад към Бърза лента
            </Link>
          )}
        </div>
        
        {/* Article header */}
        <header className="mb-10">
          {post.category?.[0] && (
            <span 
              className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-6" 
              style={{ backgroundColor: post.category[0].color || '#e5e5e5', color: '#fff' }}
            >
              {post.category[0].name || 'Без категория'}
            </span>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
          
          {/* Description / Short description */}
          {post.description && (
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.description}</p>
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
        <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary max-w-none bg-gradient-to-br from-background to-card p-8 rounded-xl shadow-md">
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
        
        {/* External link if available */}
        {post.externallink && (
          <div className="mt-10 pt-6 border-t border-border">
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href={post.externallink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Прочети още в оригиналния източник
              </Link>
            </Button>
          </div>
        )}
        
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