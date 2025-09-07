'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const navigation = [
  { name: 'Бизнес', href: '/business' },
  { name: 'Технологии', href: '/technology' },
  { name: 'Какво е Stox.bg?', href: '/about' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">stox.bg – проект на Devids</span>
            <div className="h-8 w-auto font-bold text-2xl">Stox.bg</div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Отвори меню</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 hover:text-gray-500 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
          <ThemeToggle />
          <Button asChild className="text-sm font-semibold ml-4">
            <Link href="/contact">
              Започни <span aria-hidden="true">&rarr;</span>
            </Link>
          </Button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={`${mobileMenuOpen ? 'fixed' : 'hidden'} inset-0 z-50`}>
        <div className="fixed inset-0 bg-gray-900/50" onClick={() => setMobileMenuOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs rounded-l-xl bg-white dark:bg-gray-800 px-6 py-6 shadow-lg">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">stox.bg – проект на Devids</span>
              <div className="h-8 w-auto font-bold text-2xl">Stox.bg</div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Затвори меню</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-2">
              <Button asChild className="w-full">
                <Link href="/contact">
                  Започни <span aria-hidden="true">&rarr;</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 