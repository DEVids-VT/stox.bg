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
  const siteName = 'Your Company Name';
  const fallbackTitle = 'Next.js SSR Template | Your Company';
  const fallbackDescription = 'A high-performance SEO-optimized Next.js template with SSR capabilities';
  const fallbackImage = '/images/og-image.png';
  
  const fullTitle = title ? `${title} | ${siteName}` : fallbackTitle;
  
  const metaKeywords = [
    'Next.js',
    'SSR',
    'React',
    'Template',
    'SEO',
    'TypeScript',
    'Performance',
    ...keywords,
  ];

  return {
    title: fullTitle,
    description: description || fallbackDescription,
    keywords: metaKeywords,
    metadataBase: new URL('https://yourwebsite.com'),
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
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || fallbackDescription,
      site: '@yourtwitterhandle',
      creator: '@yourtwitterhandle',
      images: [image || fallbackImage],
    },
  };
} 