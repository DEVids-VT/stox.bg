import { createSupabaseClient } from '@/lib/supabase';
import { InfiniteScrollLoader, type Post } from './InfiniteScrollLoader';

type CategoryFeedProps = {
  categoryId: number;
};

export async function CategoryFeed({ categoryId }: CategoryFeedProps) {
  let supabase: ReturnType<typeof createSupabaseClient>;
  try {
    supabase = createSupabaseClient();
  } catch (e) {
    console.error('Supabase init error (CategoryFeed):', (e as Error)?.message || e);
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 text-center shadow-lg">
          <p className="text-red-500 font-medium">Грешка при свързване към базата.</p>
          <p className="text-muted-foreground mt-2">Проверете конфигурацията и опитайте отново.</p>
        </div>
      </div>
    );
  }
  
  // Fetch the first 10 posts for this category
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select(`id, title, content, description, image, slug, category`)
    .eq('isdeleted', false)
    .eq('category', categoryId)
    .order('id', { ascending: false })
    .limit(10);

  if (postsError) {
    console.error('Supabase posts error (CategoryFeed):', postsError);
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
      content: post.content,
      description: post.description,
      image: post.image,
      slug: post.slug,
      category: category
    };
  }) || [];

  const lowerName = (category.name || '').toLowerCase();
  const fromPath = lowerName.startsWith('бизнес') || lowerName.startsWith('business')
    ? '/business'
    : '/technology';

  return (
    <div className="w-full mx-auto">
      <InfiniteScrollLoader initialPosts={posts} categoryId={categoryId} fromPath={fromPath} />
    </div>
  );
} 