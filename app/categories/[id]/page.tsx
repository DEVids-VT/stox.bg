import Image from 'next/image';
import { notFound } from 'next/navigation';
import { createSupabaseClient } from '@/lib/supabase';
import { createMetadata } from '@/lib/seo/metadata';
import { CategoryFeed } from '@/components/fastlane/CategoryFeed';

// Generate dynamic metadata for the category
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const categoryId = parseInt(resolvedParams.id);
  if (isNaN(categoryId)) {
    return createMetadata({
      title: 'Категорията не е намерена',
      description: 'Търсената категория не съществува.',
      noIndex: true,
    });
  }

  const supabase = createSupabaseClient();
  const { data: category, error } = await supabase
    .from('categories')
    .select('name, description, image')
    .eq('id', categoryId)
    .eq('isdeleted', false)
    .single();

  if (error || !category) {
    return createMetadata({
      title: 'Категорията не е намерена',
      description: 'Търсената категория не съществува или е премахната.',
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${category.name} - Категория`,
    description: category.description || `Разгледайте всички статии и анализи в категория ${category.name}`,
    image: category.image,
    keywords: [category.name, 'категория', 'анализи', 'инвестиции', 'stox.bg'],
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const categoryId = parseInt(resolvedParams.id);
  
  if (isNaN(categoryId)) {
    notFound();
  }
  
  const supabase = createSupabaseClient();
  const { data: category, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .eq('isdeleted', false)
    .single();
    
  if (error || !category) {
    notFound();
  }
  
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Category header with image */}
        <div className="mb-16">
          {category.image && (
            <div className="relative h-72 md:h-[400px] w-full rounded-xl overflow-hidden mb-10 shadow-xl">
              <Image 
                src={category.image} 
                alt={category.name} 
                fill 
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div 
                  className="inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 shadow-sm" 
                  style={{ backgroundColor: category.color || '#e5e5e5', color: '#fff' }}
                >
                  Категория
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{category.name}</h1>
                {category.description && (
                  <p className="text-white/90 mt-3 max-w-2xl text-lg md:text-xl">{category.description}</p>
                )}
              </div>
            </div>
          )}
          
          {!category.image && (
            <div className="bg-gradient-to-br from-background to-card rounded-xl p-10 shadow-lg mb-10 border border-border">
              <div 
                className="inline-block text-sm font-medium px-4 py-1 rounded-full mb-6" 
                style={{ backgroundColor: category.color || '#e5e5e5', color: '#fff' }}
              >
                Категория
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{category.name}</h1>
              {category.description && (
                <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">{category.description}</p>
              )}
            </div>
          )}
        </div>
        
        {/* Section title */}
        <div className="flex items-center mb-8">
          <div className="h-0.5 w-10 bg-primary rounded-full mr-4"></div>
          <h2 className="text-2xl font-bold">Публикации</h2>
        </div>
        
        {/* Posts feed filtered by category */}
        <CategoryFeed categoryId={categoryId} />
      </div>
    </div>
  );
} 