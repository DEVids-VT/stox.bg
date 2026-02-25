import { createSupabaseClient } from "@/lib/supabase";
import { InfiniteScrollLoader, type Post } from "./InfiniteScrollLoader";
import Image from "next/image";

export async function FastlaneFeed() {
  const supabase = createSupabaseClient();
  // Fetch the first 10 posts for the feed
  const { data: postsData, error: postsError } = await supabase
    .from("posts")
    .select(
      `id, title, content, description, image, slug, externallink, published_at, category`,
    )
    .eq("isdeleted", false)
    .order("id", { ascending: false })
    .limit(10);

  if (postsError) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 text-center shadow-lg">
          <p className="text-red-500 font-medium">
            Грешка при зареждане на публикации.
          </p>
          <p className="text-muted-foreground mt-2">
            Моля, опитайте отново по-късно.
          </p>
        </div>
      </div>
    );
  }

  // Fetch all categories once to use for mapping
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id, name, color")
    .eq("isdeleted", false);

  // Create a map of categories by ID for easy lookup
  const categoriesMap = new Map();
  if (categoriesData) {
    categoriesData.forEach((category) => {
      categoriesMap.set(category.id, {
        id: category.id,
        name: category.name,
        color: category.color,
      });
    });
  }

  // Transform the data to match the Post type
  const posts: Post[] =
    postsData?.map((post) => {
      // Get category data from the map using the category ID
      const categoryData =
        post.category && categoriesMap.has(post.category)
          ? categoriesMap.get(post.category)
          : { id: 0, name: "Без категория", color: "#e5e5e5" };

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        description: post.description,
        image: post.image,
        slug: post.slug,
        published_at: post.published_at,
        category: categoryData,
      };
    }) || [];

  if (posts.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-background to-card border border-border rounded-2xl p-8 text-center shadow-lg">
          <p className="text-xl font-medium">Няма налични публикации.</p>
          <p className="text-muted-foreground mt-2">
            Моля, проверете отново по-късно за нови публикации.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Header with Earth Image */}
      <div className="mb-8">
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 border border-border rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Earth Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/worldfastlane.png"
              alt="Global Financial News"
              fill
              className="object-cover opacity-60"
              priority
              sizes="(max-width: 768px) 100vw, 1152px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/40"></div>
          </div>

          {/* Content */}
          <div className="relative p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-4"></div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Бърза лента
              </h1>
              <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full ml-4"></div>
            </div>

            <p className="text-blue-100 text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Глобални AI-анализирани новини от света на инвестициите в реално
              време
            </p>

            {/* Speed indicators */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-cyan-300">
                <div className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">LIVE</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse animation-delay-200"></div>
                <span className="text-sm font-medium">GLOBAL</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse animation-delay-400"></div>
                <span className="text-sm font-medium">AI-POWERED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed - Takes 3 columns */}
        <div className="lg:col-span-3">
          <InfiniteScrollLoader initialPosts={posts} />
        </div>

        {/* Sidebar - Takes 1 column */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* AI Assistant Section */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-blue-100 flex items-center gap-2">
                <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                AI Асистент
              </h3>
              <p className="text-sm text-blue-200 mb-4">
                Задавайте въпроси за анализите и получавайте AI-генерирани
                отговори
              </p>
              <div className="p-3 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <p className="text-xs text-blue-300">Стартирай</p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <div className="h-2 w-2 bg-purple-400 rounded-full animate-pulse"></div>
                Статистики
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    AI анализи днес
                  </span>
                  <span className="text-lg font-bold text-cyan-400">
                    {posts.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Общо статии
                  </span>
                  <span className="text-lg font-bold text-purple-400">
                    {posts.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
