import { createMetadata } from '@/lib/seo/metadata';
import { FastlaneFeed } from '@/components/fastlane/FastlaneFeed';

export const metadata = createMetadata({
  title: 'Бърза лента',
  description: 'Инвеститорски фийд с кратки анализи, новини и инвестиционни възможности.',
  keywords: ['бърза лента', 'анализи', 'инвестиции', 'акции', 'stox.bg'],
});

export default function FastlanePage() {
  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FastlaneFeed />
      </div>
    </div>
  );
} 