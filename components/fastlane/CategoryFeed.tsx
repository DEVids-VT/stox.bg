import { createSupabaseClient } from '@/lib/supabase';
import { InfiniteScrollLoader, type Post } from './InfiniteScrollLoader';

type CategoryFeedProps = {
  categoryId: number;
};

export async function CategoryFeed({ categoryId }: CategoryFeedProps) {
  const supabase = createSupabaseClient();
  
  // Fetch the first 10 posts for this category
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select(`id, title, short_content, description, image, slug, externallink, category, is_deep_research`)
    .eq('isdeleted', false)
    .eq('category', categoryId)
    .order('id', { ascending: false })
    .limit(10);

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

  // Fetch the specific category
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id, name, color')
    .eq('id', categoryId)
    .single();

  const category = categoryData || { id: categoryId, name: 'Категория', color: '#e5e5e5' };

  // Transform the data to match the Post type
  const posts: Post[] = postsData?.map(post => {
    return {
      id: post.id,
      title: post.title,
      short_content: post.short_content,
      description: post.description,
      image: post.image,
      slug: post.slug,
      externallink: post.externallink,
      is_deep_research: post.is_deep_research || false,
      category: category
    };
  }) || [];

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 text-center shadow-lg">
          <p className="text-xl font-medium">Няма налични публикации в тази категория.</p>
          <p className="text-muted-foreground mt-2">Моля, проверете другите категории или се върнете по-късно.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      <InfiniteScrollLoader initialPosts={posts} categoryId={categoryId} />
    </div>
  );
} 