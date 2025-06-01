import Image from 'next/image';
import Link from 'next/link';
import { createSupabaseClient } from '@/lib/supabase';
import { createMetadata } from '@/lib/seo/metadata';
import { Zap, TrendingUp, BarChart3 } from 'lucide-react';

export const metadata = createMetadata({
  title: 'Категории',
  description: 'Разгледайте всички категории анализи и статии в Stox.bg.',
  keywords: ['категории', 'анализи', 'инвестиции', 'акции', 'stox.bg'],
});

export default async function CategoriesPage() {
  const supabase = createSupabaseClient();
  
  // Fetch all categories that are not deleted
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .eq('isdeleted', false)
    .order('name');
    
  if (error) {
    console.error('Error fetching categories:', error);
  }
  
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              Категории
            </h1>
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Изследвайте AI-анализирани инвестиционни възможности
          </p>
          
          {/* Stats indicators */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">АНАЛИЗИ</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BarChart3 className="h-5 w-5" />
              <span className="text-sm font-medium">ДАННИ</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-medium">AI-POWERED</span>
            </div>
          </div>
        </div>
        
        {error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg">
              <p className="text-red-500 font-medium">Грешка при зареждане на категории.</p>
              <p className="text-muted-foreground mt-2">Моля, опитайте отново по-късно.</p>
            </div>
          </div>
        ) : categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/categories/${category.id}`}
                className="group block relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {/* Background image */}
                  <div className="relative h-80">
                    {category.image ? (
                      <>
                        <Image 
                          src={category.image} 
                          alt={category.name} 
                          fill 
                          className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <div className="text-6xl opacity-20">📊</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {/* Category badge */}
                    <div className="mb-4">
                      <div 
                        className="inline-block text-xs font-bold px-4 py-2 rounded-full bg-background/90 border border-border shadow-sm"
                      >
                        <Zap className="inline h-3 w-3 mr-1" />
                        КАТЕГОРИЯ
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 transition-colors duration-300">
                      {category.name}
                    </h2>
                    
                    {/* Description */}
                    {category.description && (
                      <p className="text-white/80 mb-4 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    )}
                    
                    {/* Action area */}
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Изследвай анализите
                      </span>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-white/10 border border-white/20 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 text-white">
                        →
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle hover glow */}
                  <div className="absolute -inset-0.5 bg-primary/0 group-hover:bg-primary/10 rounded-2xl blur transition-all duration-300 -z-10"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-lg">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-xl font-medium text-foreground mb-2">Няма налични категории.</p>
              <p className="text-muted-foreground">Скоро ще добавим нови инвестиционни категории.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 