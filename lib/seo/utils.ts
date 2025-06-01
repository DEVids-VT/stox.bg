import type { Metadata } from 'next';
import type { 
  WithContext, 
  Organization, 
  WebSite, 
  Article, 
  FinancialProduct,
  FAQPage,
  BreadcrumbList
} from 'schema-dts';

// Bulgarian slug generation with proper Cyrillic handling
export const slugifyBG = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[а-я]/g, (char) => {
      const cyrillicToLatin: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
        'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y',
        'ю': 'yu', 'я': 'ya'
      };
      return cyrillicToLatin[char] || char;
    })
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

// Generate enhanced metadata for Bulgarian stock platform
export const generateSEOMetadata = ({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  publishedTime,
  modifiedTime,
  author = 'Давид Петков',
  locale = 'bg_BG',
  type = 'website'
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  locale?: string;
  type?: 'website' | 'article';
}): Metadata => {
  const baseUrl = 'https://stox.bg';
  const defaultKeywords = [
    'акции българия', 'инвестиции', 'финанси', 'пазари', 'анализи',
    'stox.bg', 'stox бг', 'акции бг', 'сайт за акции', 'давид петков'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');
  const fullTitle = title.includes('Stox.bg') ? title : `${title} | Stox.bg`;
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const imageUrl = ogImage || `${baseUrl}/images/og-default.jpg`;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: author,
    publisher: 'Stox.bg',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type,
      locale,
      url,
      title: fullTitle,
      description,
      siteName: 'Stox.bg',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@stoxbg',
    },
    alternates: {
      canonical: url,
      languages: {
        'bg-BG': url,
        'en-US': url.replace('/bg/', '/en/'),
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION_ID,
    },
  };
};

// Organization Schema for Stox.bg
export const generateOrganizationSchema = (): WithContext<Organization> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stox.bg',
  description: 'Българска платформа за инвеститори с актуални анализи за акции, компании, икономика и геополитика',
  url: 'https://stox.bg',
  logo: 'https://stox.bg/images/logos/stox-logo.png',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Давид Петков',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'contact@stox.bg',
    availableLanguage: ['Bulgarian', 'English'],
  },
  sameAs: [
    'https://linkedin.com/company/stox-bg',
    'https://twitter.com/stoxbg',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Bulgaria',
  },
  knowsAbout: [
    'Акции', 'Инвестиции', 'Финанси', 'Пазари', 'Анализи',
    'Stocks', 'Investments', 'Finance', 'Markets', 'Analysis'
  ],
});

// Website Schema
export const generateWebsiteSchema = (): WithContext<WebSite> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stox.bg',
  description: 'Инвеститорският интернет. На едно място.',
  url: 'https://stox.bg',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://stox.bg/search?q={search_term_string}',
    },
  },
  inLanguage: 'bg-BG',
  about: {
    '@type': 'Thing',
    name: 'Инвестиции и акции в България',
  },
});

// Article Schema for stock analysis
export const generateArticleSchema = ({
  title,
  description,
  author = 'Давид Петков',
  publishedTime,
  modifiedTime,
  url,
  imageUrl,
  ticker,
}: {
  title: string;
  description: string;
  author?: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
  imageUrl?: string;
  ticker?: string;
}): WithContext<Article> => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Stox.bg',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stox.bg/images/logos/stox-logo.png',
    },
  },
  datePublished: publishedTime,
  dateModified: modifiedTime || publishedTime,
  url,
  image: imageUrl,
  inLanguage: 'bg-BG',
  about: ticker ? {
    '@type': 'Thing',
    name: `${ticker} акции анализ`,
  } : undefined,
  keywords: [
    'акции', 'инвестиции', 'анализ', 'пазари', 'финанси',
    ticker && `${ticker} акции`,
    ticker && `${ticker} анализ`,
  ].filter(Boolean).join(', '),
});

// Financial Product Schema for individual stocks
export const generateFinancialProductSchema = ({
  ticker,
  companyName,
  description,
  price,
  currency = 'USD',
}: {
  ticker: string;
  companyName: string;
  description: string;
  price?: number;
  currency?: string;
}): WithContext<FinancialProduct> => ({
  '@context': 'https://schema.org',
  '@type': 'FinancialProduct',
  name: `${companyName} (${ticker})`,
  description,
  ...(price && {
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency,
    },
  }),
  url: `https://stox.bg/stocks/${ticker.toLowerCase()}`,
});

// FAQ Schema for better AI visibility
export const generateFAQSchema = (faqs: { question: string; answer: string }[]): WithContext<FAQPage> => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Breadcrumb Schema
export const generateBreadcrumbSchema = (items: { name: string; url: string }[]): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

// AI Summary generator for LLM optimization
export const generateAISummary = (content: string): string => {
  // This would ideally use an AI service, but for now we'll create a simple version
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const keySentences = sentences.slice(0, 3);
  return `🤖 AI Резюме: ${keySentences.join('. ')}.`;
};

// Generate hreflang links for international SEO
export const generateHreflangLinks = (pathname: string) => {
  const baseUrl = 'https://stox.bg';
  return [
    { rel: 'alternate', hrefLang: 'bg', href: `${baseUrl}${pathname}` },
    { rel: 'alternate', hrefLang: 'bg-BG', href: `${baseUrl}${pathname}` },
    { rel: 'alternate', hrefLang: 'x-default', href: `${baseUrl}${pathname}` },
  ];
}; 