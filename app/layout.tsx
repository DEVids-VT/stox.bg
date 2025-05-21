import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Stox.bg | Инвеститорският интернет. На едно място.",
  description: "Платформа за инвеститори с актуални анализи за акции, компании, икономика и геополитика. Сбити текстове с готови AI prompt-ове за по-задълбочени разговори.",
  keywords: ["инвестиции", "акции", "пазари", "анализи", "икономика", "геополитика", "финанси", "AI"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
      </body>
    </html>
  );
}
