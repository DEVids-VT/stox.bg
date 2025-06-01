import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  generateSEOMetadata,
  generateArticleSchema,
  generateFinancialProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateAISummary,
} from '@/lib/seo/utils';

// Types for stock data
interface StockData {
  ticker: string;
  companyName: string;
  price: number;
  currency: string;
  exchange: string;
  description: string;
  analysis: string;
  publishedTime: string;
  modifiedTime?: string;
  imageUrl?: string;
}

// Mock function - replace with your actual data fetching
async function getStockData(ticker: string): Promise<StockData | null> {
  // This would typically fetch from your database or API
  const mockData: Record<string, StockData> = {
    nvda: {
      ticker: 'NVDA',
      companyName: 'NVIDIA Corporation',
      price: 890.50,
      currency: 'USD',
      exchange: 'NASDAQ',
      description: 'NVIDIA Corporation е американска мултинационална технологична компания, специализирана в графични процесори и изкуствен интелект.',
      analysis: `NVIDIA продължава да доминира в секторите на изкуствения интелект и центровете за данни. 
      
      Компанията демонстрира изключителен растеж благодарение на високото търсене на GPU чипове за AI приложения. 
      
      Финансовите резултати за последното тримесечие показват 94% ръст на приходите год./год., като приходите от центровете за данни се увеличиха с 410%.
      
      Рисковете включват геополитическите напрежения с Китай и потенциалната конкуренция от AMD и Intel в AI сектора.`,
      publishedTime: '2024-01-15T10:00:00Z',
      modifiedTime: '2024-01-15T15:30:00Z',
      imageUrl: '/images/stocks/nvda-analysis.jpg',
    },
    // Add more stocks as needed
  };

  return mockData[ticker.toLowerCase()] || null;
}

// Generate metadata for the stock page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ ticker: string }>;
}): Promise<Metadata> {
  const { ticker } = await params;
  const stockData = await getStockData(ticker);

  if (!stockData) {
    return {
      title: 'Акция не е намерена | Stox.bg',
      description: 'Търсената акция не е намерена в нашата база данни.',
    };
  }

  const { companyName, description } = stockData;
  
  return generateSEOMetadata({
    title: `${ticker} акции - ${companyName} анализ и прогноза`,
    description: `Актуален анализ на ${companyName} (${ticker}) акции. ${description.substring(0, 120)}...`,
    keywords: [
      `${ticker} акции`,
      `${ticker} анализ`,
      `${companyName}`,
      `инвестиране в ${ticker}`,
      `${ticker} прогноза`,
      `${ticker} цена`,
      `купуване ${ticker} акции`,
    ],
    canonical: `/stocks/${ticker.toLowerCase()}`,
    type: 'article',
    publishedTime: stockData.publishedTime,
    modifiedTime: stockData.modifiedTime,
    ogImage: stockData.imageUrl,
  });
}

// FAQ data for better AI visibility
const generateStockFAQs = (stockData: StockData) => [
  {
    question: `Струва ли си да инвестирам в ${stockData.ticker} акции?`,
    answer: `${stockData.companyName} (${stockData.ticker}) показва силни резултати в последните тримесечия. Според нашия анализ, компанията има добри перспективи, но винаги консултирайте с финансов консултант преди инвестиране.`,
  },
  {
    question: `Каква е текущата цена на ${stockData.ticker}?`,
    answer: `Текущата цена на ${stockData.ticker} е $${stockData.price} ${stockData.currency}. Цените се променят в реално време по време на търговските часове.`,
  },
  {
    question: `На коя борса се търгува ${stockData.ticker}?`,
    answer: `${stockData.ticker} се търгува на ${stockData.exchange} борсата.`,
  },
  {
    question: `Кой е анализирал тази акция?`,
    answer: `Анализът е направен от Давид Петков, основател на Stox.bg, с опит в инвестиционния анализ и финансовите пазари.`,
  },
];

export default async function StockPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = await params;
  const stockData = await getStockData(ticker);

  if (!stockData) {
    notFound();
  }

  const {
    ticker: stockTicker,
    companyName,
    price,
    currency,
    exchange,
    description,
    analysis,
    publishedTime,
    modifiedTime,
    imageUrl,
  } = stockData;

  // Generate structured data
  const articleSchema = generateArticleSchema({
    title: `${stockTicker} акции - ${companyName} анализ и прогноза`,
    description: `Актуален анализ на ${companyName} (${stockTicker}) акции`,
    publishedTime,
    modifiedTime,
    url: `https://stox.bg/stocks/${stockTicker.toLowerCase()}`,
    imageUrl,
    ticker: stockTicker,
  });

  const financialProductSchema = generateFinancialProductSchema({
    ticker: stockTicker,
    companyName,
    description,
    price,
    currency,
  });

  const faqSchema = generateFAQSchema(generateStockFAQs(stockData));

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Начало', url: 'https://stox.bg' },
    { name: 'Акции', url: 'https://stox.bg/stocks' },
    { name: `${stockTicker} акции`, url: `https://stox.bg/stocks/${stockTicker.toLowerCase()}` },
  ]);

  // Generate AI summary
  const aiSummary = generateAISummary(analysis);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(financialProductSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* AI-Optimized Header */}
        <header className="mb-8">
          <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600">Начало</Link>
            {' > '}
            <Link href="/stocks" className="hover:text-blue-600">Акции</Link>
            {' > '}
            <span className="text-gray-900">{stockTicker} акции</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {stockTicker} акции - {companyName} анализ и прогноза
          </h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span>Автор: <strong>Давид Петков</strong></span>
            <span>Публикувано: {new Date(publishedTime).toLocaleDateString('bg-BG')}</span>
            {modifiedTime && (
              <span>Обновено: {new Date(modifiedTime).toLocaleDateString('bg-BG')}</span>
            )}
          </div>
        </header>

        {/* AI Summary Section */}
        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            🤖 AI Резюме
          </h2>
          <p className="text-gray-700 dark:text-gray-300">{aiSummary}</p>
        </section>

        {/* Stock Price Box */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Текуща цена</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <dt className="text-sm text-gray-600">Цена</dt>
              <dd className="text-2xl font-bold text-green-600">${price} {currency}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Борса</dt>
              <dd className="text-lg font-semibold">{exchange}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Тикер</dt>
              <dd className="text-lg font-semibold">{stockTicker}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Валута</dt>
              <dd className="text-lg font-semibold">{currency}</dd>
            </div>
          </div>
        </section>

        {/* Company Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">За компанията</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </section>

        {/* Main Analysis */}
        <article className="prose prose-lg max-w-none dark:prose-invert mb-8">
          <h2 className="text-2xl font-semibold mb-4">Инвестиционен анализ</h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {analysis}
          </div>
        </article>

        {/* FAQ Section for AI Optimization */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">Често задавани въпроси</h2>
          <div className="space-y-4">
            {generateStockFAQs(stockData).map((faq, index) => (
              <details key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <summary className="font-semibold cursor-pointer hover:text-blue-600">
                  {faq.question}
                </summary>
                <p className="mt-3 text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* AI Prompt Section */}
        <section className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3">🚀 AI Prompt за по-задълбочен анализ</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm font-mono">
            Анализирай {companyName} ({stockTicker}) като инвестиционна възможност за българските инвеститори. 
            Включи текущите финансови показатели, пазарната позиция, конкурентните предимства и рисковете. 
            Дай препоръка за инвестиционен хоризонт от 1-3 години.
          </div>
        </section>

        {/* Author Bio for Personal Branding */}
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">За автора</h3>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Давид Петков</strong> е основател на Stox.bg - българската платформа за инвеститори. 
            Специализира в анализ на американските и европейските пазари, с фокус върху технологичните и финансовите сектори.
          </p>
        </section>
      </div>
    </>
  );
} 