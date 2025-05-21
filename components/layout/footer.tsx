import Link from 'next/link';

const navigation = {
  main: [
    { name: 'Начало', href: '/' },
    { name: 'Функции', href: '/features' },
    { name: 'За нас', href: '/about' },
    { name: 'Контакти', href: '/contact' },
  ],
  social: [
    {
      name: 'Twitter',
      href: '#',
      icon: () => (
        <div className="h-6 w-6 bg-muted-foreground rounded-sm"></div>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: () => (
        <div className="h-6 w-6 bg-muted-foreground rounded-sm"></div>
      ),
    },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/20">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-16 sm:py-24 lg:px-8">
        <nav className="mb-12 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 text-foreground/80 hover:text-foreground">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <Link key={item.name} href={item.href} className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">{item.name}</span>
              <item.icon />
            </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-muted-foreground">
          &copy; {currentYear} Stox.bg. Всички права запазени.
        </p>
      </div>
    </footer>
  );
} 