import { createSupabaseClient } from '@/lib/supabase';
import { createMetadata } from '@/lib/seo/metadata';
import { CategoryFeed } from '@/components/fastlane/CategoryFeed';

export const metadata = createMetadata({
  title: 'Технологии',
  description: 'Публикации за инженерни практики, архитектури и продуктова разработка от екипа на Devids.',
  keywords: ['технологии', 'инженеринг', 'архитектура', 'Devids', 'продукт'],
  canonical: '/technology',
});

export default async function TechnologyPage() {
  const supabase = createSupabaseClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, description, image, color')
    .eq('isdeleted', false);

  const technology = categories?.find(c => c.name?.toLowerCase().startsWith('technology') || c.name?.toLowerCase().startsWith('технолог'));
  const categoryId = technology?.id as number | undefined;

  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold">Технологии</h1>
          <p className="text-muted-foreground mt-3">Инженерни практики, архитектури и продуктова разработка</p>
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


