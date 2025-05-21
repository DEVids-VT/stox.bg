import type { Metadata } from 'next';

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

/**
 * Generate standardized metadata for SEO optimization
 */
export function createMetadata({
  title,
  description,
  keywords = [],
  image,
  noIndex = false,
  canonical,
}: MetadataProps): Metadata {
  const siteName = 'Stox.bg';
  const fallbackTitle = 'Stox.bg | Инвеститорският интернет. На едно място.';
  const fallbackDescription = 'Платформа за инвеститори с актуални анализи за акции, компании, икономика и геополитика. Сбити текстове с готови AI prompt-ове за по-задълбочени разговори.';
  const fallbackImage = '/images/og-image.png';
  
  const fullTitle = title ? `${title} | ${siteName}` : fallbackTitle;
  
  const metaKeywords = [
    'инвестиции',
    'акции',
    'пазари',
    'анализи',
    'икономика',
    'геополитика',
    'финанси',
    'AI',
    ...keywords,
  ];

  return {
    title: fullTitle,
    description: description || fallbackDescription,
    keywords: metaKeywords,
    metadataBase: new URL('https://stox.bg'),
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      title: fullTitle,
      description: description || fallbackDescription,
      url: '/',
      siteName,
      images: [
        {
          url: image || fallbackImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'bg_BG',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || fallbackDescription,
      site: '@stoxbg',
      creator: '@stoxbg',
      images: [image || fallbackImage],
    },
  };
} 