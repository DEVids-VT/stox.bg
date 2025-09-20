import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart3, TrendingUp, BrainCircuit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/metadata";
import { createSupabaseClient } from '@/lib/supabase';

type HomePost = {
  id: number;
  title: string;
  content?: string;
  description?: string;
  image?: string;
  slug?: string;
  categories?: { name?: string };
};

export const metadata = createMetadata({
  title: "stox.bg – проект на Devids",
  description: "Хъб за Devids: бизнес и технологични инсайти, уроци и истории от екипа – воден от двама основатели под 20.",
  keywords: [
    "Devids", "Devids software company Bulgaria", "Devids Bulgaria software development company", 
    "Devids software company Bulgaria projects", "Devids Давид Петков Давид Христов",
    "Devids България IT награди", "Devids software company стартъп история",
    "David", "Бърза разработка на сайт", "Качествен софтуер",
    "бизнес", "технологии", "продукт", "екип", "стартап", "stox.bg",
    "България софтуер", "IT компания България", "младежки предприемачи",
    "технологични решения", "уеб разработка", "софтуерна компания"
  ],
  image: "/images/devidsbanner.png",
});

export default async function Home() {
  const supabase = createSupabaseClient();
  
  // Fetch latest post
  const { data: latestPostArr } = await supabase
    .from('posts')
    .select(`
      *,
      categories(name)
    `)
    .eq('id', 4)
    .eq('isdeleted', false);

  const latestPost: HomePost | null = latestPostArr && latestPostArr.length > 0 ? (latestPostArr[0] as HomePost) : null;

  // Load categories and resolve Business/Technology IDs
  const { data: allCategories } = await supabase
    .from('categories')
    .select('id, name')
    .eq('isdeleted', false);

  const findCategoryIdByName = (names: string[]): number | undefined => {
    if (!allCategories) return undefined;
    const lowerNames = names.map(n => n.toLowerCase());
    const match = allCategories.find(c => lowerNames.some(n => c.name?.toLowerCase().startsWith(n)));
    return match?.id as number | undefined;
  };

  const businessCategoryId = findCategoryIdByName(["business", "бизнес"]);
  const technologyCategoryId = findCategoryIdByName(["technology", "технолог"]);

  // Fetch Business preview posts
  let businessPosts: HomePost[] = [];
  if (businessCategoryId) {
    const { data } = await supabase
      .from('posts')
      .select(`id, title, content, description, image, slug, categories(name)`)
      .eq('isdeleted', false)
      .eq('category', businessCategoryId)
      .order('id', { ascending: false })
      .limit(3);
    businessPosts = (data as HomePost[]) || [];
  }

  // Fetch Technology preview posts
  let technologyPosts: HomePost[] = [];
  if (technologyCategoryId) {
    const { data } = await supabase
      .from('posts')
      .select(`id, title, content, description, image, slug, categories(name)`)
      .eq('isdeleted', false)
      .eq('category', technologyCategoryId)
      .order('id', { ascending: false })
      .limit(3);
    technologyPosts = (data as HomePost[]) || [];
  }

  // Fetch featured posts (just get latest posts since is_deep_research doesn't exist)
  const { data: featuredPosts } = await supabase
    .from('posts')
    .select(`
      id, title, content, description, image, slug,
      categories(name)
    `)
    .eq('isdeleted', false)
    .order('id', { ascending: false })
    .limit(2);
  void featuredPosts; // avoid unused var lint for now

  return (
    <div className="relative bg-background text-foreground">
      {/* Announcement banner */
      }
      <div className="relative bg-secondary text-center py-2 px-4 text-sm text-muted-foreground border-b border-border">
        <p>
          stox.bg – проект на Devids. Прочетете повече <Link href="/about" className="underline text-primary">тук →</Link>
        </p>
      </div>

      {/* Intro section (keeps original design) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20 py-20 px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
                  <BrainCircuit className="h-4 w-4" />
                  Ексклузивно
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                Истории за <span className="text-primary">бизнес</span> и <span className="text-primary">технологии</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
                stox.bg е дом за постиженията и уроците на Devids – как двама основатели под 20 водим екип и изграждаме продукти. Споделяме практични инсайти от реална работа.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Link href="/about">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Научете повече
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-8 mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">20-</div>
                  <div className="text-xs text-muted-foreground">Основатели</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Продукти</div>
                  <div className="text-xs text-muted-foreground">Създаване</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">∞</div>
                  <div className="text-xs text-muted-foreground">Прозрения</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative flex justify-center">
              <div className="relative">
                <div className="block h-full md:h-[500px] w-full rounded-2xl shadow-2xl overflow-hidden border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/images/devidsbanner.png"
                    alt="Devids – building products"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest blog post */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Избрана публикация</h2>
              <p className="text-muted-foreground">Избрана от stox.bg</p>
            </div>
          </div>
          
          {latestPost ? (
            <Link 
              href={`/c/ot-sustezaniya-do-biznes-nashata-istoriq`}
              className="group block"
            >
              <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-64 relative">
                  {latestPost.image ? (
                    <Image 
                      src={latestPost.image} 
                      alt={latestPost.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {latestPost.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">
                        {latestPost.categories?.name || 'Публикация'}
                      </span>
                      <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="h-32 bg-muted rounded-lg mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">Скоро ще добавим първа публикация</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Бизнес – преглед */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Бизнес</h2>
              <p className="text-muted-foreground">Практични уроци от изграждането на компания</p>
            </div>
            <Link href="/business" className="text-primary hover:underline flex items-center gap-2 font-medium">
              Всички публикации <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessPosts && businessPosts.length > 0 ? businessPosts.map((post: HomePost) => (
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
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {post.categories?.name || 'Публикация'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    {(post.description || post.content) && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {post.description || (post.content && post.content.substring(0, 150) + '...')}
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
                    <p className="text-muted-foreground">Скоро ще добавим публикации</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Технологии – преглед */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Технологии</h2>
              <p className="text-muted-foreground">Инженерни практики, архитектури и продуктова разработка</p>
            </div>
            <Link href="/technology" className="text-primary hover:underline flex items-center gap-2 font-medium">
              Всички публикации <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technologyPosts && technologyPosts.length > 0 ? technologyPosts.map((post: HomePost) => (
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
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                        {post.categories?.name || 'Публикация'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    {(post.description || post.content) && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {post.description || (post.content && post.content.substring(0, 150) + '...')}
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
                    <p className="text-muted-foreground">Скоро ще добавим публикации</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      

      {/* Защо stox.bg (нов стил) */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Защо stox.bg?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Практични уроци и прозрения от Devids
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-primary/20 transition-colors">
                <BrainCircuit className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Истории от екипа</h3>
              <p className="text-muted-foreground leading-relaxed">Как взимаме решения, какво научаваме и как изграждаме продукти.</p>
            </div>

            <div className="text-center group">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Бизнес и технология</h3>
              <p className="text-muted-foreground leading-relaxed">Реални практики – от стратегия и процеси до архитектура и код.</p>
            </div>

            <div className="text-center group">
              <div className="bg-primary/10 p-4 rounded-2xl inline-block mb-6 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Фокус върху качеството</h3>
              <p className="text-muted-foreground leading-relaxed">Елегантни решения, чист код и практична полезност преди всичко.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
