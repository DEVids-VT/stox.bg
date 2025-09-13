import { generateSEOMetadata } from '@/lib/seo/utils';

export const metadata = generateSEOMetadata({
  title: 'Общи условия',
  description: 'Общи условия за използване на stox.bg – проект на Devids',
  keywords: ['общи условия', 'правила', 'stox.bg', 'Devids'],
  canonical: '/terms',
  ogImage: '/images/devidsbanner.png',
});

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Общи условия за използване</h1>
          <p className="text-muted-foreground text-lg">Последна актуализация: {new Date().toLocaleDateString('bg-BG')}</p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-base leading-relaxed mb-0">
              Добре дошли в stox.bg – проект на Devids. Използвайки нашия уебсайт, вие се съгласявате с настоящите общи условия за използване. 
              Моля, прочетете внимателно преди да продължите.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Дефиниции</h2>
            <ul className="space-y-2">
              <li><strong>&bdquo;Ние&ldquo;, &bdquo;Нас&ldquo;, &bdquo;Наш&ldquo;</strong> – отнася се до Devids и екипа зад stox.bg</li>
              <li><strong>&bdquo;Вие&ldquo;, &bdquo;Потребител&ldquo;</strong> – всяко лице, което използва нашия уебсайт</li>
              <li><strong>&bdquo;Платформа&ldquo;, &bdquo;Уебсайт&ldquo;</strong> – stox.bg и всички свързани услуги</li>
              <li><strong>&bdquo;Съдържание&ldquo;</strong> – всички текстове, изображения, анализи и материали на платформата</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Приемане на условията</h2>
            <p>
              Достъпвайки и използвайки stox.bg, вие потвърждавате, че сте прочели, разбрали и се съгласявате да спазвате 
              настоящите общи условия. Ако не се съгласявате с някое от условията, моля не използвайте нашата платформа.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Описание на услугите</h2>
            <p>
              stox.bg е платформа за споделяне на бизнес и технологични инсайти, създадена от екипа на Devids. 
              Предоставяме:
            </p>
            <ul className="space-y-2">
              <li>Анализи и статии за бизнес и технологии</li>
              <li>Практични уроци от изграждането на продукти и компании</li>
              <li>Инсайти от реалната работа на млад стартъп екип</li>
              <li>Образователно съдържание за предприемачество</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Права на интелектуална собственост</h2>
            <p>
              Цялото съдържание на stox.bg, включително текстове, изображения, дизайн и код, е собственост на Devids 
              или е използвано с разрешение. Запазваме си всички права върху нашето съдържание.
            </p>
            <p>
              Можете да споделяте и цитирате нашите материали за лични и образователни цели, при условие че посочите източника.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Поведение на потребителите</h2>
            <p>При използване на нашата платформа се задължавате:</p>
            <ul className="space-y-2">
              <li>Да не нарушавате приложимото законодателство</li>
              <li>Да не разпространявате вредоносно съдържание</li>
              <li>Да не се опитвате да компрометирате сигурността на платформата</li>
              <li>Да уважавате правата на интелектуална собственост</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Ограничение на отговорността</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="mb-3">
                <strong>Важно:</strong> Съдържанието на stox.bg е предоставено само с информационна цел.
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Не предоставяме финансови или инвестиционни съвети</li>
                <li>• Всички мнения са субективни и базирани на нашия опит</li>
                <li>• Не носим отговорност за решения, взети въз основа на нашето съдържание</li>
                <li>• Препоръчваме винаги да търсите професионален съвет</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Промени в условията</h2>
            <p>
              Запазваме си правото да актуализираме настоящите условия по всяко време. Промените влизат в сила 
              веднага след публикуването им на уебсайта. Редовно проверявайте за актуализации.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Прекратяване</h2>
            <p>
              Можем да ограничим или прекратим достъпа ви до платформата по всяко време, без предварително уведомление, 
              ако нарушавате настоящите условия.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Приложимо право</h2>
            <p>
              Настоящите условия се регулират от българското законодателство. Всички спорове се решават от 
              компетентните български съдилища.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Контакт</h2>
            <p>
              За въпроси относно настоящите условия можете да се свържете с нас чрез страницата за контакт 
              или директно с екипа на Devids.
            </p>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-0">
              Благодарим ви, че сте част от stox.bg – нашето пътешествие в света на бизнеса и технологиите.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 