import { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SEO_CONFIG } from '@/lib/seo/config';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stox.bg'),
  title: {
    default: SEO_CONFIG.defaultTitle!,
    template: SEO_CONFIG.titleTemplate!,
  },
  description: SEO_CONFIG.description,
  keywords: SEO_CONFIG.additionalMetaTags?.find(tag => tag.name === 'keywords')?.content,
  openGraph: {
    ...SEO_CONFIG.openGraph,
    images: SEO_CONFIG.openGraph?.images,
  },
  twitter: {
    ...SEO_CONFIG.twitter,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.description,
  },
  alternates: {
    canonical: 'https://stox.bg',
    languages: {
      'bg-BG': 'https://stox.bg',
    },
  },
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
};

// Inline script as a string to prevent the theme flash
const themeScript = `
  (function() {
    function getStoredTheme() {
      try {
        // Check for stored theme in cookie
        const cookieValue = document.cookie
          .split('; ')
          .find(row => row.startsWith('stox-theme='));
        
        if (cookieValue) {
          return cookieValue.split('=')[1];
        }
        
        // Fallback to localStorage if cookie is not available
        const localTheme = localStorage.getItem('stox-theme');
        if (localTheme) {
          return localTheme;
        }
        
        // If no stored preferences, check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {
        // Default to light if anything goes wrong
        console.error('Error getting theme:', e);
        return 'light';
      }
    }
    
    // Apply the theme immediately
    const theme = getStoredTheme();
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    // Also store the theme for access during hydration
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider defaultTheme="system" storageKey="stox-theme">
          <SmoothScrollProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" /> {/* Replace with your Google Analytics ID */}
      </body>
    </html>
  );
}
