import Link from 'next/link';
import Image from 'next/image';

const navigation = {
  main: [
    { name: 'Общи условия', href: '/terms' },
    { name: 'Правна информация', href: '/legal' },
  ],
  social: [
    {
      name: 'Devids',
      href: 'https://devids.eu/',
      logo: '/images/logos/devids.png',
    },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/20 border-t border-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:px-8 flex flex-col gap-10">

        {/* Navigation links */}
        <nav className="flex flex-wrap justify-center gap-6 mt-6" aria-label="Footer">
          {navigation.main.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Social logos */}
        <div className="flex justify-center gap-10 mt-8">
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="group">
              <Image
                src={item.logo}
                alt={item.name + ' logo'}
                width={64}
                height={64}
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain rounded-lg shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-10 text-center text-xs text-muted-foreground">
          &copy; {currentYear} Stox.bg. Всички права запазени.
        </p>
      </div>
    </footer>
  );
} 