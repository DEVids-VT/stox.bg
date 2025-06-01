import { createMetadata } from '@/lib/seo/metadata';
import { createSupabaseClient } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { InfiniteScrollLoader, type Post } from '@/components/fastlane/InfiniteScrollLoader';

export const metadata = createMetadata({
  title: 'Всички публикации - Бърза лента',
  description: 'Разгледайте всички публикации от Бърза лента на Stox.bg.',
  keywords: ['бърза лента', 'всички публикации', 'анализи', 'инвестиции', 'stox.bg'],
});

export default async function FastlaneAllPage() {
  const supabase = createSupabaseClient();
  
  // Fetch the first 20 posts
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select(`id, title, short_content, description, image, slug, externallink, category, is_deep_research`)
    .eq('isdeleted', false)
    .order('id', { ascending: false })
    .limit(20);

  if (postsError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 text-center shadow-lg">
          <p className="text-red-500 font-medium">Грешка при зареждане на публикации.</p>
          <p className="text-muted-foreground mt-2">Моля, опитайте отново по-късно.</p>
        </div>
      </div>
    );
  }

  // Fetch all categories once to use for mapping
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, name, color')
    .eq('isdeleted', false);

  // Create a map of categories by ID for easy lookup
  const categoriesMap = new Map();
  if (categoriesData) {
    categoriesData.forEach(category => {
      categoriesMap.set(category.id, {
        id: category.id,
        name: category.name,
        color: category.color
      });
    });
  }

  // Transform the data to match the Post type
  const posts: Post[] = postsData?.map(post => {
    // Get category data from the map using the category ID
    const categoryData = post.category && categoriesMap.has(post.category)
      ? categoriesMap.get(post.category)
      : { id: 0, name: 'Без категория', color: '#e5e5e5' };
      
    return {
      id: post.id,
      title: post.title,
      short_content: post.short_content,
      description: post.description,
      image: post.image,
      slug: post.slug,
      externallink: post.externallink,
      is_deep_research: post.is_deep_research || false,
      category: categoryData
    };
  }) || [];

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 text-center shadow-lg">
          <p className="text-xl font-medium">Няма налични публикации.</p>
          <p className="text-muted-foreground mt-2">Моля, проверете отново по-късно за нови публикации.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="max-w-2xl mx-auto mb-10">
          <Link 
            href="/fastlane" 
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад към Бърза лента
          </Link>
          
          <div className="bg-gradient-to-r from-background to-card border border-border rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-3">
              <div className="h-0.5 w-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-3"></div>
              <h1 className="text-2xl font-bold">Всички публикации</h1>
            </div>
            <p className="text-muted-foreground">
              Всички AI-анализирани публикации от Бърза лента, подредени по дата 📰
            </p>
          </div>
        </div>
        
        {/* Posts feed with infinite scroll */}
        <InfiniteScrollLoader initialPosts={posts} />
      </div>
    </div>
  );
} 