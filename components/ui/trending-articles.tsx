"use client";

import Link from "next/link";

type TrendingArticle = {
  category: string;
  title: string;
  image: string;
};

export function TrendingArticles() {
  const articles: TrendingArticle[] = [
    {
      category: "Анализ на продажби",
      title: "Повишаване на продажбите с модерни POS системи",
      image: "/images/retail-pos.jpg"
    },
    {
      category: "Ресторанти",
      title: "Кулинарен контрол: Управление на поръчки и инвентар с POS системи",
      image: "/images/restaurant-pos.jpg"
    },
    {
      category: "Хотелиерство",
      title: "Хармония в хотелиерството: Трансформиране на потребителското изживяване",
      image: "/images/hotel-pos.jpg"
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Актуални Статии За Четене</h2>
            <p className="text-muted-foreground mb-6">
              Нашите AI-базирани инструменти за анализ сканират пазара за ключови прозрения и тенденции, които инвеститорите трябва да знаят.
              <span className="inline-flex items-center ml-2 text-xs bg-secondary px-2 py-1 rounded-full border border-primary text-primary">
                Powered by AI
              </span>
            </p>
            <div className="hidden md:block">
              
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="space-y-8">
              {articles.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-card rounded-lg hover:bg-card/90 transition-colors">
                  <div className="w-20 h-20 flex-shrink-0 bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    Image {index + 1}
                  </div>
                  <div>
                    <span className="text-xs text-primary font-medium">{item.category}</span>
                    <h3 className="font-bold mb-2">{item.title}</h3>
                    <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                      Вижте повече <span className="ml-1 h-3 w-3 bg-primary inline-block"></span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 