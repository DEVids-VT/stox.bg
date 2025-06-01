"use client";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div 
              className="rounded-lg shadow-xl bg-muted w-full h-[400px] flex items-center justify-center"
            >
              Image Placeholder: POS System
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Максимизирайте ефективността<br />-Увеличете продажбите</h2>
            <p className="text-muted-foreground mb-6">
              Подобрете вашия бизнес днес: Оптимизирайте продажбите, управлявайте инвентара и зарадвайте клиентите с нашата POS система
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Започнете сега
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 