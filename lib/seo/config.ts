import { DefaultSeoProps } from 'next-seo';

export const SEO_CONFIG: DefaultSeoProps = {
  titleTemplate: '%s | Stox.bg - Вашият Надежден Партньор в Инвестициите',
  defaultTitle: 'Stox.bg - Инвестиции в Акции, Фондове и Стокова Борса',
  description: 'Научете всичко за инвестиции в акции, ETF фондове и търговия на стокова борса. Професионални анализи, обучения и инвестиционни възможности.',
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    url: 'https://stox.bg/',
    siteName: 'Stox.bg',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stox.bg - Инвестиции в България',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'стокова борса, фондове, акции, инвестиции в акции, сайт за инвестиции, как да инвестираме, ETF фондове, борсова търговия, инвестиционен портфейл, българска фондова борса, инвестиционни стратегии, дивиденти, търговия с акции онлайн, пасивни инвестиции, диверсификация, борсови индекси, SOFIX, финансови пазари, спестяване, дългосрочни инвестиции',
    },
    {
      name: 'author',
      content: 'Stox.bg',
    },
  ],
  twitter: {
    handle: '@stoxbg',
    site: '@stoxbg',
    cardType: 'summary_large_image',
  },
  languageAlternates: [
    {
      hrefLang: 'bg-BG',
      href: 'https://stox.bg',
    },
  ],
}; 