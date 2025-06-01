import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PostNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-3xl font-bold mb-4">Публикацията не е намерена</h1>
        <p className="text-muted-foreground mb-8">
          Търсената публикация не съществува или е премахната.
        </p>
        <Button asChild>
          <Link href="/fastlane">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад към Бърза лента
          </Link>
        </Button>
      </div>
    </div>
  );
} 