import { generateSEOMetadata } from '@/lib/seo/utils';

export const metadata = generateSEOMetadata({
  title: 'Политика за поверителност',
  description: 'Политика за поверителност и защита на личните данни на stox.bg – проект на Devids',
  keywords: ['поверителност', 'лични данни', 'GDPR', 'stox.bg', 'Devids'],
  canonical: '/legal',
  ogImage: '/images/devidsbanner.png',
});

export default function LegalPage() {
  return (
    <div className="bg-background min-h-screen py-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">Политика за поверителност</h1>
          <p className="text-muted-foreground text-lg">Последна актуализация: {new Date().toLocaleDateString('bg-BG')}</p>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-base leading-relaxed mb-0">
              В stox.bg ценим вашата поверителност и се ангажираме да защитаваме личните ви данни. 
              Тази политика обяснява как събираме, използваме и защитаваме информацията ви.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Данните</h2>
            <div className="bg-card border border-border rounded-lg p-4">
              <p><strong>Devids</strong></p>
              <p>Отговорник за обработката на лични данни в stox.bg</p>
              <p>За контакт: чрез формата за контакт на уебсайта</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Какви данни събираме</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Доброволно предоставени данни</h3>
            <p>Събираме данни само когато вие доброволно ги споделите с нас:</p>
            <ul className="space-y-2 mt-4">
              <li>Имейл адрес (при абониране за бюлетин)</li>
              <li>Име (при контакт с нас)</li>
              <li>Съобщения, изпратени чрез формата за контакт</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Автоматично събирани данни чрез Google Analytics</h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <p className="mb-2">
                <strong>Важно:</strong> Използваме Google Analytics за анализ на трафика и подобряване на потребителското изживяване. 
                Аналитичните бисквитки са активирани по подразбиране, но можете да ги откажете по всяко време.
              </p>
            </div>
            
            <p>Чрез Google Analytics събираме следните данни:</p>
            <ul className="space-y-2 mt-4">
              <li><strong>Географски данни:</strong> Страна, регион, град (приблизително местоположение)</li>
              <li><strong>Поведенчески данни:</strong> Посетени страници, време на престой, източник на трафика</li>
              <li><strong>Технически данни:</strong> Тип устройство, браузър, операционна система</li>
              <li><strong>Интерактивни данни:</strong> Кликвания върху елементи, скролиране, навигация</li>
              <li><strong>Сесийни данни:</strong> Продължителност на сесията, брой посещения</li>
              <li><strong>Демографски данни:</strong> Възраст и пол (когато са достъпни)</li>
            </ul>
            
            <p className="text-sm text-muted-foreground mt-4">
              Тези данни се използват за разбиране на предпочитанията на потребителите, 
              подобряване на съдържанието и оптимизиране на функционалността на сайта.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Технически данни</h3>
            <p>Нашият хостинг доставчик (Vercel) може да съхранява основни сървърни логове за сигурност, включващи:</p>
            <ul className="space-y-2 mt-2">
              <li>IP адрес (само за защита срещу злоупотреби)</li>
              <li>Време на заявката</li>
              <li>Заявена страница</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Тези данни се използват единствено за сигурност и не се анализират за маркетингови цели.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Как използваме данните</h2>
            <p>Използваме събраните данни за:</p>
            <ul className="space-y-2">
              <li><strong>Комуникация:</strong> Отговори на запитвания и поддръжка</li>
              <li><strong>Бюлетин:</strong> Изпращане на съдържание (само при изрично съгласие)</li>
              <li><strong>Анализ на трафика:</strong> Разбиране на поведението на потребителите чрез Google Analytics</li>
              <li><strong>Подобряване на услугите:</strong> Оптимизиране на съдържанието и функционалността</li>
              <li><strong>Сигурност:</strong> Защита срещу злоупотреби и спам</li>
              <li><strong>Правни изисквания:</strong> Спазване на законовите задължения</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Не използваме данните за персонализирана реклама или продажба на трети страни.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Правни основания за обработка</h2>
            <div className="grid gap-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Съгласие (чл. 6, ал. 1, буква a от GDPR)</h4>
                <p className="text-sm">За абониране за бюлетин, маркетингови комуникации и използване на Google Analytics</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Законен интерес (чл. 6, ал. 1, буква f от GDPR)</h4>
                <p className="text-sm">За отговаряне на запитвания, осигуряване на сигурност и подобряване на услугите</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Споделяне на данни с трети страни</h2>
            <p>Споделяме данни само в следните ограничени случаи:</p>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Доставчици на услуги</h3>
            <ul className="space-y-2">
              <li><strong>Google Analytics:</strong> Анализ на трафика и поведението на потребителите</li>
              <li><strong>Vercel:</strong> Хостинг на уебсайта (основни сървърни логове)</li>
              <li><strong>Supabase:</strong> База данни за съхранение на контактна информация</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Google Analytics може да използва данните в съответствие със собствената си политика за поверителност.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Правни изисквания</h3>
            <p>Можем да споделим данни единствено при:</p>
            <ul className="space-y-2">
              <li>Задължително искане от компетентни органи</li>
              <li>Защита на нашите законни права</li>
              <li>Предотвратяване на злоупотреби със сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Международни трансфери</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p>
                Някои от нашите доставчици на услуги могат да обработват данни извън ЕС. 
                В такива случаи гарантираме подходящо ниво на защита чрез:
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Решения за адекватност на Европейската комисия</li>
                <li>• Стандартни договорни клаузи</li>
                <li>• Сертификации за защита на данните</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Период на съхранение</h2>
            <ul className="space-y-2">
              <li><strong>Контактна информация:</strong> До 3 години след последния контакт</li>
              <li><strong>Абонати за бюлетин:</strong> До оттегляне на съгласието</li>
              <li><strong>Сървърни логове:</strong> Съгласно политиката на Vercel (обикновено 30 дни)</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Не съхраняваме данни за трафика или поведението на потребителите.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Вашите права</h2>
            <p>Съгласно GDPR имате следните права:</p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Право на достъп (чл. 15)</h4>
                <p className="text-sm">Информация за обработваните данни</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Право на поправка (чл. 16)</h4>
                <p className="text-sm">Коригиране на неточни данни</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Право на заличаване (чл. 17)</h4>
                <p className="text-sm">Изтриване на данните при определени условия</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Право на ограничение (чл. 18)</h4>
                <p className="text-sm">Ограничаване на обработката</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Право на преносимост (чл. 20)</h4>
                <p className="text-sm">Получаване на данните в структуриран формат</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Право на възражение (чл. 21)</h4>
                <p className="text-sm">Възражение срещу обработката</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Бисквитки (Cookies)</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="mb-2">
                <strong>Важно:</strong> stox.bg използва бисквитки за подобряване на потребителското изживяване и анализ на трафика.
              </p>
            </div>

            <h3 className="text-xl font-semibold mb-3">9.1 Видове бисквитки</h3>
            
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Задължителни бисквитки</h4>
                <p className="text-sm mb-2">Необходими за основното функциониране на сайта:</p>
                <ul className="text-sm space-y-1">
                  <li>• Съхранение на темата (светла/тъмна)</li>
                  <li>• Съхранение на езиковите предпочитания</li>
                  <li>• Сесийни бисквитки за сигурност</li>
                </ul>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Аналитични бисквитки (Google Analytics)</h4>
                <p className="text-sm mb-2">Използват се за анализ на трафика и поведението:</p>
                <ul className="text-sm space-y-1">
                  <li>• _ga - идентифициране на уникални потребители</li>
                  <li>• _ga_* - съхранение на състоянието на сесията</li>
                  <li>• _gid - разграничаване на потребители и сесии</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Тези бисквитки са активирани по подразбиране, но могат да бъдат отказани по всяко време.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6">9.2 Управление на бисквитките</h3>
            <p className="mb-4">Можете да управлявате бисквитките по следните начини:</p>
            <ul className="space-y-2">
              <li>• Чрез банера за съгласие при първо посещение</li>
              <li>• Чрез настройките на вашия браузър</li>
              <li>• Чрез изтриване на съществуващите бисквитки</li>
            </ul>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
              <p className="text-sm">
                <strong>Забележка:</strong> Отказването на аналитичните бисквитки няма да повлияе на функционалността на сайта, 
                но може да ограничи нашата способност да подобряваме услугите.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Сигурност на данните</h2>
            <p>Въпреки минималното събиране на данни, прилагаме подходящи мерки за защита:</p>
            <ul className="space-y-2">
              <li>SSL криптиране на данните при предаване</li>
              <li>Сигурно съхранение в Supabase (за контактни данни)</li>
              <li>Ограничен достъп до данните</li>
              <li>Редовни актуализации на системите</li>
              <li>Минимизиране на събираните данни</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Промени в политиката</h2>
            <p>
              Можем да актуализираме тази политика при промени в законодателството или нашите практики. 
              Значителни промени ще бъдат обявени на уебсайта.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Контакт и жалби</h2>
            <p>
              За въпроси относно обработката на данни или упражняване на правата си, 
              свържете се с нас чрез формата за контакт.
            </p>
            <p className="mt-4">
              <strong>Право на жалба:</strong> Имате право да подадете жалба до Комисията за защита на личните данни (КЗЛД).
            </p>
            <div className="bg-card border border-border rounded-lg p-4 mt-4">
              <p className="text-sm">
                <strong>КЗЛД:</strong> София 1592, бул. &quot;Христо Ботев&quot; № 124<br/>
                Телефон: 02 915 3523<br/>
                Email: kzld@cpdp.bg
              </p>
            </div>
          </section>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-0">
              Благодарим ви за доверието! stox.bg събира данни отговорно и прозрачно - 
              използваме ги единствено за подобряване на вашето изживяване и услугите ни.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 