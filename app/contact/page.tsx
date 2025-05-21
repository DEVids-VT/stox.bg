import { createMetadata } from '@/lib/seo/metadata';
import { ContactForm } from './contact-form';

export const metadata = createMetadata({
  title: 'Контакти',
  description: 'Свържете се с нас за въпроси относно Stox.bg - платформата за инвеститори',
  keywords: ['контакти', 'инвестиции', 'stox.bg', 'поддръжка', 'въпроси'],
});

export default function ContactPage() {
  return (
    <div className="isolate bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Свържете се с нас</h2>
          <p className="mt-2 text-lg leading-8 text-muted-foreground">
            Имате въпроси относно Stox.bg? Тук сме, за да помогнем.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 