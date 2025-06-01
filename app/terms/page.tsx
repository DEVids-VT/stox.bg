import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'Общи условия',
  description: 'Общи условия за използване на Stox.bg',
  keywords: ['общи условия', 'правила', 'stox.bg'],
});

export default function TermsPage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">Общи условия</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p>Това е примерна страница за Общи условия. Моля, попълнете съдържанието според вашите изисквания.</p>
          
          <h2>1. Общи разпоредби</h2>
          <p>Примерен текст за общи разпоредби...</p>
          
          <h2>2. Права и задължения</h2>
          <p>Примерен текст за права и задължения...</p>
          
          <h2>3. Ограничение на отговорността</h2>
          <p>Примерен текст за ограничение на отговорността...</p>
        </div>
      </div>
    </div>
  );
} 