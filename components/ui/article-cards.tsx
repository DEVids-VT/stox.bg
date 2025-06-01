"use client";

import Link from "next/link";

type Article = {
  tag: string;
  date: string;
  title: string;
  image: string;
};

export function ArticleCards() {
  const articles: Article[] = [
    {
      tag: "Пазарен обзор",
      date: "26 Апр 2024",
      title: "Beyond Transactions: Unlocking the Full Potential of Your POS System",
      image: "/images/article-1.jpg",
    },
    {
      tag: "AI Анализ",
      date: "20 Апр 2024",
      title: "From Brick-and-Mortar to Online Storefront: Integrating Your POS",
      image: "/images/article-2.jpg",
    },
    {
      tag: "Рискове",
      date: "18 Апр 2024",
      title: "Security First: Protecting Your Business with Advanced POS Systems",
      image: "/images/article-3.jpg",
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">Последни Анализи</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-border rounded-full hover:bg-muted">
              <span className="h-4 w-4 bg-muted-foreground rounded-sm inline-block"></span>
            </button>
            <button className="p-2 border border-border rounded-full hover:bg-muted">
              <span className="h-4 w-4 bg-muted-foreground rounded-sm inline-block"></span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-muted flex items-center justify-center text-sm text-muted-foreground">
                  Image Placeholder {index + 1}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-primary">{article.tag}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-4">{article.title}</h3>
                <Link href={`/articles/${index}`} className="text-sm text-primary hover:underline flex items-center">
                  Прочети повече <span className="ml-1 h-3 w-3 bg-primary inline-block"></span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 