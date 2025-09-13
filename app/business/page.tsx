import { createSupabaseClient } from '@/lib/supabase';
import { generateSEOMetadata } from '@/lib/seo/utils';
import { CategoryFeed } from '@/components/fastlane/CategoryFeed';

export const metadata = generateSEOMetadata({
  title: 'Бизнес',
  description: 'Публикации за бизнес, стратегия и изграждане на компания от екипа на Devids.',
  keywords: ['бизнес', 'Devids', 'стартъп', 'екип', 'стратегия', 'продукт'],
  canonical: '/business',
  ogImage: '/images/devidsbanner.png',
});

export default async function BusinessPage() {
  const supabase = createSupabaseClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, description, image, color')
    .eq('isdeleted', false);

  const business = categories?.find(c => c.name?.toLowerCase().startsWith('business') || c.name?.toLowerCase().startsWith('бизнес'));
  const categoryId = business?.id as number | undefined;

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold">Бизнес</h1>
          <p className="text-muted-foreground mt-3">Практични уроци от изграждането на компания</p>
        </div>

        {categoryId ? (
          <CategoryFeed categoryId={categoryId} />
        ) : (
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">Категорията не е налична.</p>
          </div>
        )}
      </div>
    </div>
  );
}


