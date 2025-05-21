import { createMetadata } from '@/lib/seo/metadata';
import { ContactForm } from './contact-form';

export const metadata = createMetadata({
  title: 'Contact',
  description: 'Get in touch with us for any questions about our Next.js SSR template',
  keywords: ['Contact', 'Next.js', 'SSR', 'Support', 'Help'],
});

export default function ContactPage() {
  return (
    <div className="isolate bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact us</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Have questions about our Next.js SSR template? We're here to help.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
} 