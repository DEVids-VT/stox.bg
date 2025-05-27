import { Metadata } from 'next';
import { SEO_CONFIG } from '@/lib/seo/config';

interface PageSEOProps {
  title: string;
  description: string;
  keywords?: string[];
  imageUrl?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  imageUrl,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
}: PageSEOProps): Metadata {
  const defaultKeywords = SEO_CONFIG.additionalMetaTags?.find(
    (tag) => tag.name === 'keywords'
  )?.content?.split(', ') || [];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    openGraph: {
      title,
      description,
      type,
      images: [
        {
          url: imageUrl || SEO_CONFIG.openGraph?.images?.[0]?.url || '',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        article: {
          publishedTime,
          modifiedTime,
          authors: [author || 'Stox.bg'],
        },
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl || SEO_CONFIG.openGraph?.images?.[0]?.url || ''],
    },
  };
} 