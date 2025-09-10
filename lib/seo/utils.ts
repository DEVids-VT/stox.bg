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

// Ensure absolute URL for images and links
const toAbsoluteUrl = (pathOrUrl: string, baseUrl: string): string => {
  try {
    if (!pathOrUrl) return `${baseUrl}/images/og-default.jpg`;
    if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
    return `${baseUrl}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
  } catch {
    return `${baseUrl}/images/og-default.jpg`;
  }
};

// Basic Bulgarian keyword extraction for GEO
export const extractKeywordsBG = (
  text: string,
  extra: string[] = [],
  max: number = 12
): string[] => {
  if (!text) return extra.slice(0, max);
  const stopwords = new Set([
    'и','в','на','с','за','по','от','до','че','как','кои','кой','кога','къде','защо','тъй','като','не','да','ще','са','е','съм','сме','сте',
    'или','но','ако','защото','така','само','още','при','между','като','без','над','под','след','преди','тук','там','този','тази','тези','това',
    'ни','ви','си','му','ѝ','им','ми','ти','го','я','ги','наш','ваш','техен','техни','много','повече','най','вече','поради','относно',
    'също','може','трябва','беше','били','бъдe','има','имат','имаме','имате','имаха'
  ]);
  const tokens = text
    .toLowerCase()
    .replace(/[^a-zа-я0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .filter(w => !stopwords.has(w) && w.length > 2);
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  const ranked = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).map(([w]) => w);
  const combined = Array.from(new Set([...
    extra.map(e => e.toLowerCase()),
    ...ranked
  ]));
  return combined.slice(0, max);
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
  const fullTitle = title.toLowerCase().includes('stox.bg') ? title : `${title} | stox.bg`;
  const url = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const imageUrl = toAbsoluteUrl(ogImage || '/images/og-default.jpg', baseUrl);

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    metadataBase: new URL(baseUrl),
    authors: [{ name: author }],
    creator: author,
    publisher: 'stox.bg – проект на Devids',
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
      siteName: 'stox.bg – проект на Devids',
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
        modifiedTime: modifiedTime || publishedTime,
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
    other: {
      ...(type === 'article' && publishedTime && {
        'article:published_time': publishedTime,
        'article:modified_time': modifiedTime || publishedTime,
        'og:updated_time': modifiedTime || publishedTime,
      }),
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
  return `Summary: ${keySentences.join('. ')}.`;
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