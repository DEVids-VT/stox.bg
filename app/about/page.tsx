import { Metadata } from 'next';
import { generatePageMetadata } from '@/components/ui/page-seo';
import { generateArticleSchema } from '@/lib/seo/schema';

export const metadata: Metadata = generatePageMetadata({
  title: 'За Нас | Вашият Доверен Партньор в Инвестициите',
  description: 'Stox.bg е водеща българска платформа за инвестиции в акции и ETF фондове. Научете повече за нашата мисия да направим инвестирането достъпно за всеки българин.',
  keywords: [
    'за нас',
    'мисия',
    'визия',
    'инвестиционна платформа',
    'български инвеститори',
    'финансова грамотност',
    'инвестиционно обучение',
  ],
  type: 'article',
  publishedTime: '2024-01-01T00:00:00Z',
  modifiedTime: '2024-03-19T00:00:00Z',
  author: 'Екипът на Stox.bg',
});

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema(
              'За Нас | Вашият Доверен Партньор в Инвестициите',
              'Stox.bg е водеща българска платформа за инвестиции в акции и ETF фондове. Научете повече за нашата мисия да направим инвестирането достъпно за всеки българин.',
              'https://stox.bg/images/about-hero.jpg',
              '2024-01-01T00:00:00Z',
              '2024-03-19T00:00:00Z',
              'Екипът на Stox.bg'
            )
          ),
        }}
      />
      <h1 className="text-4xl font-bold mb-6">За Нас</h1>
      <div className="relative isolate overflow-hidden bg-background px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-border"
            aria-hidden="true"
          >
            <div className="bg-muted w-full h-full opacity-50"></div>
          </div>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-primary">Нашата мисия</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Прочети. Разбери. Продължи разговора.</h1>
                <p className="mt-6 text-xl leading-8 text-muted-foreground">
                  Създадохме Stox.bg като мястото, където инвеститорите намират всичко накуп - най-важното от пазара, събрано, синтезирано и разбираемо.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <div
              className="w-[48rem] max-w-none rounded-xl bg-card shadow-xl ring-1 ring-border sm:w-[57rem] h-[600px] flex items-center justify-center"
            >
              Image Placeholder: Stox.bg screenshot
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-muted-foreground lg:max-w-lg">
                <p>
                  Stox.bg е създаден за хора, които не питат &quot;какво е S&P 500&quot;, а &quot;защо пада тази седмица&quot;.
                  Предлагаме професионални анализи, разбити на кратки статии, с готови prompt-ове за по-задълбочени разговори с AI.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-muted-foreground">
                  <li className="flex gap-x-3">
                    <span className="mt-1 h-5 w-5 flex-none text-primary" aria-hidden="true">+</span>
                    <span>
                      <strong className="font-semibold text-foreground">Актуална информация.</strong> Предоставяме 
                      над 30 актуални анализа седмично за пазарите, компаниите и икономическите тенденции.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="mt-1 h-5 w-5 flex-none text-primary" aria-hidden="true">+</span>
                    <span>
                      <strong className="font-semibold text-foreground">Спестяваме време.</strong> Всяка статия 
                      отнема само 1 минута за четене, предоставяйки съществената информация без излишни думи.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <span className="mt-1 h-5 w-5 flex-none text-primary" aria-hidden="true">+</span>
                    <span>
                      <strong className="font-semibold text-foreground">AI интеграция.</strong> Използваме 
                      изкуствен интелект, за да помогнем на потребителите да задълбочат разбирането си по всяка тема.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  С помощта на Stox.bg, инвеститорите могат да се фокусират върху вземането на информирани решения,
                  вместо да губят часове в търсене на качествена информация. Няма досадни мнения. Няма &quot;гурута&quot;. 
                  Само добре подбрана и прецизно обработена информация.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Накратко. Разбрано. На време.</h2>
                <p className="mt-6">
                  Вярваме, че инвестирането трябва да се базира на информация, а не на интуиция. 
                  Stox.bg ви дава необходимите инструменти, за да инвестирате по-умно и с по-голяма увереност.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 