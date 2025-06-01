import { Check } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Функции",
  description: "Открийте функциите на Stox.bg - платформата за инвеститори",
  keywords: ["функции", "инвестиции", "акции", "анализи", "AI", "stox.bg"],
});

const features = [
  {
    name: "30+ Актуални Анализа Седмично",
    description: "Получавайте редовни анализи на пазарите, компаниите и икономическите тенденции."
  },
  {
    name: "1 Минута Четене на Статия",
    description: "Кратки и ясни статии, фокусирани върху същественото без излишни думи."
  },
  {
    name: "AI Интеграция",
    description: "Готови prompt-ове под всеки текст за задълбочаване на анализа чрез AI."
  },
  {
    name: "Разнообразни Теми",
    description: "Анализи на акции, компании, икономика и геополитика - всичко на едно място."
  },
  {
    name: "Професионални Анализи",
    description: "Информация от професионалисти, представена по разбираем за всеки начин."
  },
  {
    name: "Без Излишен Шум",
    description: "Никакви досадни мнения или самопровъзгласили се \"гурута\" - само факти."
  },
  {
    name: "Оптимизирано за Бързина",
    description: "Бърз достъп до важната информация без необходимост от дълго търсене."
  },
  {
    name: "Адаптивен Дизайн",
    description: "Платформата работи еднакво добре на всички устройства - телефон, таблет или компютър."
  },
  {
    name: "Предпочитани Акции",
    description: "Възможност за персонализация и следене на избрани от вас компании и индекси."
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Всичко необходимо</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Инвеститорският интернет на едно място
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Stox.bg e платформата, която обединява всичко необходимо за съвременния инвеститор -
            актуални анализи, сбита информация и възможност за задълбочаване чрез AI.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <Check className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 