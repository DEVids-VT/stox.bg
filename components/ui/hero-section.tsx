"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  const [, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-card py-20 px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Отключeте Ефективността: <span className="text-primary">Силата На Модерната</span> Инвестиция
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              В света на динамичните пазари, ефективността е ключът към успеха. Нашата анализаторска платформа обединява данни от всички глобални пазари, за да даде на инвеститорите цялостна картина.
              <span className="inline-block ml-2 text-xs bg-secondary px-2 py-1 rounded-full border border-primary text-primary mt-2">
                <span className="w-3 h-3 mr-1 inline-block bg-primary"></span>
                Анализирано от AI
              </span>
            </p>
            <div className="mt-8">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Научете повече <span className="h-4 w-4 inline-block bg-secondary ml-1"></span>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative flex justify-center">
            <div className="h-[650px] w-full max-w-[550px] rounded-lg shadow-2xl overflow-hidden">
              <Image 
                src="/images/man-analyzing-financial-data.jpeg"
                alt="Финансови анализи и инвестиционна стратегия"
                fill
                className="object-cover border-4 rounded-lg"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 