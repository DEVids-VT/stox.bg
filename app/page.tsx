import Link from "next/link";
import { ArrowRight, BarChart3, Package, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/metadata";
import { HeroSection } from "@/components/ui/hero-section";
import { ArticleCards } from "@/components/ui/article-cards";
import { TrendingArticles } from "@/components/ui/trending-articles";
import { CTASection } from "@/components/ui/cta-section";

export const metadata = createMetadata({
  title: "Начало",
  description: "Инвеститорският интернет на едно място. Платформа за инвеститори с актуални анализи за акции, компании, икономика и геополитика.",
});

export default function Home() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Announcement banner */}
      <div className="relative bg-secondary text-center py-2 px-4 text-sm text-muted-foreground border-b border-border">
        <p>
          Вземете достъп до ексклузивни анализи в <span className="text-primary font-semibold">Stox Premium Plan 2024</span>. <Link href="/premium" className="underline text-primary">Вижте повече →</Link>
        </p>
        <button className="absolute right-2 top-2 text-muted-foreground hover:text-foreground">×</button>
      </div>

      {/* Hero section - client component */}
      <HeroSection />

      {/* Recent Articles section - client component */}
      <ArticleCards />

      {/* Trending Articles section - client component */}
      <TrendingArticles />

      {/* Efficiency Tips section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Съвети и трикове за максимална ефективност</h2>
            <p className="text-muted-foreground">Открийте ценни прозрения за оптимизиране на вашия бизнес и максимизиране на ефективността</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Управление на инвентара",
                description: "Как да използвате проследяване на инвентара в реално време за вземане на решения, базирани на данни",
                icon: <Package className="h-8 w-8 text-primary" />
              },
              {
                title: "Обработка на плащания",
                description: "Най-добри практики за сигурно и ефективно обработване на плащания с модерни POS системи",
                icon: <CreditCard className="h-8 w-8 text-primary" />
              },
              {
                title: "Отчети и анализи",
                description: "Как да използвате данните от вашата POS система за бизнес интелиджънс и възможности за растеж",
                icon: <BarChart3 className="h-8 w-8 text-primary" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border border-border">
                <div className="bg-secondary p-3 rounded-md inline-block mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                  Прочетете повече <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action - client component */}
      <CTASection />

      {/* Final CTA section */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Оптимизирайте вашия бизнес с Tumbas</h2>
              <p className="text-muted-foreground mb-4">
                Ефективно управление на инвентара с данни в реално време
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Бюлетин</h3>
              <p className="text-muted-foreground mb-4">Абонирайте се за нашия бюлетин, за да получавате последните новини</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Вашият имейл"
                  className="flex-grow px-4 py-2 bg-background rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Абонирайте се
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
