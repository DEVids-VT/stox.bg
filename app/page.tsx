import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, TrendingUp, Zap, BrainCircuit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/metadata";
import { createSupabaseClient } from '@/lib/supabase';

export const metadata = createMetadata({
  title: "Начало",
  description: "AI-анализирани инвестиционни анализи и пазарни прозрения. Платформа за инвеститори с актуални анализи за акции, компании, икономика и геополитика.",
  keywords: ["инвестиции", "акции", "анализи", "AI", "изкуствен интелект", "пазари", "stox.bg"],
});

export default async function Home() {
  const supabase = createSupabaseClient();
  
  // Fetch recent posts
  const { data: recentPosts } = await supabase
    .from('posts')
    .select(`
      *,
      categories(name)
    `)
    .eq('isdeleted', false)
    .order('id', { ascending: false })
    .limit(3);

  // Fetch featured posts (deep research)
  const { data: featuredPosts } = await supabase
    .from('posts')
    .select(`
      *,
      categories(name)
    `)
    .eq('isdeleted', false)
    .eq('is_deep_research', true)
    .order('id', { ascending: false })
    .limit(2);

  return (
    <div className="relative bg-background text-foreground">
      {/* Announcement banner */}
      <div className="relative bg-secondary text-center py-2 px-4 text-sm text-muted-foreground border-b border-border">
        <p>
          Открийте силата на AI-анализираните инвестиционни прозрения в <span className="text-primary font-semibold">Stox.bg</span>. <Link href="/categories" className="underline text-primary">Вижте всички категории →</Link>
        </p>
      </div>

      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 py-20 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
                  <BrainCircuit className="h-4 w-4" />
                  AI-Powered Analytics
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Интелигентни <span className="text-primary">Инвестиционни</span> Решения
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                Stox.bg е AI-анализираща платформа, която предоставя задълбочени инвестиционни анализи, пазарни прозрения и данни за акции. Използваме изкуствен интелект за анализ на хиляди данни и създаване на ценни препоръки.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/categories">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Разгледай анализите
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">AI</div>
                  <div className="text-xs text-muted-foreground">Анализи</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Данни</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-xs text-muted-foreground">Прозрения</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="relative">
                <div className="hidden md:block h-[700px] w-full  rounded-2xl shadow-2xl overflow-hidden border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/man-analyzing-financial-data.jpeg"
                    alt="AI финансови анализи и данни"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Articles section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Последни AI Анализи</h2>
              <p className="text-muted-foreground">Актуални пазарни прозрения и инвестиционни възможности</p>
            </div>
            <Link href="/categories" className="text-primary hover:underline flex items-center gap-2 font-medium">
              Всички анализи <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts && recentPosts.length > 0 ? recentPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/c/${post.slug}`}
                className="group block h-full"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-48 relative flex-shrink-0">
                    {post.image ? (
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-muted flex items-center justify-center">
                        <BarChart3 className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
                        <Zap className="h-3 w-3" />
                        AI
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {post.categories?.name || 'Анализ'}
                      </span>
                      {post.is_deep_research && (
                        <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                          Deep Research
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    {post.short_content && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {post.short_content}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-primary text-sm font-medium flex items-center gap-2">
                        Прочети повече
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 h-full min-h-[400px] flex flex-col">
                  <div className="h-32 bg-muted rounded-lg mb-4 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-center flex-1 flex items-center justify-center">
                    <p className="text-muted-foreground">Скоро ще добавим нови анализи</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Deep Research section */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 text-orange-700 rounded-full px-4 py-2 text-sm font-medium mb-4">
                <BrainCircuit className="h-4 w-4" />
                Deep Research
              </div>
              <h2 className="text-3xl font-bold mb-2">Задълбочени Анализи</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Нашите най-детайлни AI-анализи с дълбоки пазарни прозрения и препоръки
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/c/${post.slug}`}
                  className="group block"
                >
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="h-64 relative">
                      {post.image ? (
                        <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted flex items-center justify-center">
                          <BarChart3 className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          <BrainCircuit className="h-3 w-3" />
                          Deep Research
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">
                            {post.categories?.name || 'Анализ'}
                          </span>
                          <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Защо да изберете Stox.bg?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Открийте предимствата на AI-анализираните инвестиционни решения
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Анализирани Данни",
                description: "Използваме най-съвременни алгоритми за анализ на пазарни данни и генериране на точни прогнози",
                icon: <BrainCircuit className="h-8 w-8 text-primary" />
              },
              {
                title: "Актуални Прозрения",
                description: "Получавайте най-новите пазарни анализи и инвестиционни възможности в реално време",
                icon: <TrendingUp className="h-8 w-8 text-primary" />
              },
              {
                title: "Експертни Анализи",
                description: "Задълбочени изследвания на компании, сектори и пазарни тенденции от AI и експерти",
                icon: <BarChart3 className="h-8 w-8 text-primary" />
              }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-primary/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
