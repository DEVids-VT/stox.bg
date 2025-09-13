import { generateSEOMetadata } from '@/lib/seo/utils';
import { CalendlyInline } from '@/components/ui/calendly-embed';

export const metadata = generateSEOMetadata({
  title: 'Контакти',
  description: 'Свържете се с нас за въпроси относно Stox.bg - платформата за инвеститори',
  keywords: ['контакти', 'инвестиции', 'stox.bg', 'поддръжка', 'въпроси'],
  canonical: '/contact',
  ogImage: '/images/devidsbanner.png',
});

export default function ContactPage() {
  return (
    <div className="isolate bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Свържете се с нас</h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Имате нужда от консултация или проект? Свържете се с нас.
          </p>
        </div>
        </div>
                {/* Fallback message for loading issues */}
                <div className="text-center mt-6 max-w-md mx-auto">
          <p className="text-sm text-gray-400 mb-2">
            Не виждате планирането на часове?
          </p>
          <p className="text-xs text-gray-500">
            Опитайте да обновите страницата или посетете{' '}
            <a 
              href="https://calendly.com/davidpetkov/30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/90 underline"
            >
              calendly.com/davidpetkov/30min
            </a>
            {' '}directly
          </p>
        </div>
        <div className="mx-auto mt-12">
          <CalendlyInline url="https://calendly.com/davidpetkov/30min" />
        </div>
    </div>
  );
} 