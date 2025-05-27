import { Organization, WebSite, WithContext } from 'schema-dts';

export const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stox.bg',
  url: 'https://stox.bg',
  logo: 'https://stox.bg/images/logo.png',
  description: 'Водеща българска платформа за инвестиции в акции, ETF фондове и търговия на стокова борса.',
  sameAs: [
    'https://facebook.com/stoxbg',
    'https://twitter.com/stoxbg',
    'https://linkedin.com/company/stoxbg',
  ],
};

export const websiteSchema: WithContext<WebSite> = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stox.bg',
  url: 'https://stox.bg',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://stox.bg/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: 'bg-BG',
};

export const generateArticleSchema = (
  title: string,
  description: string,
  imageUrl: string,
  datePublished: string,
  dateModified: string,
  authorName: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  image: imageUrl,
  datePublished: datePublished,
  dateModified: dateModified,
  author: {
    '@type': 'Person',
    name: authorName,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Stox.bg',
    logo: {
      '@type': 'ImageObject',
      url: 'https://stox.bg/images/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://stox.bg',
  },
}); 