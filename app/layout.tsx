import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnalyticsWrapper } from "@/components/analytics";
import { 
  generateSEOMetadata, 
  generateOrganizationSchema, 
  generateWebsiteSchema 
} from "@/lib/seo/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "stox.bg – проект на Devids",
  description: "stox.bg – проект на Devids. Хъб за постиженията, историите и продуктите ни – бизнес и технологични инсайти от вътрешността на компанията, споделени от двама основатели под 20.",
  keywords: [
    "Devids", "стартъп", "бизнес", "технологии", "продукт",
    "основатели", "екип", "разработка", "истории от компанията", "stox.bg"
  ],
  canonical: "/",
  ogImage: "/images/devidsbanner.png",
});

// Generate structured data for the organization and website
const organizationSchema = generateOrganizationSchema();
const websiteSchema = generateWebsiteSchema();

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
        
        // Default to dark theme if no stored preferences
        return 'dark';
      } catch (e) {
        // Default to dark if anything goes wrong
        console.error('Error getting theme:', e);
        return 'dark';
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
        {/* Core SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0a0a0a" />
        
        {/* Enhanced Bulgarian SEO */}
        <meta name="language" content="bg" />
        <meta name="geo.region" content="BG" />
        <meta name="geo.country" content="Bulgaria" />
        <meta name="geo.placename" content="Bulgaria" />
        <meta name="ICBM" content="42.6977, 23.3219" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Devids" />
        <meta name="publisher" content="Devids" />
        <meta name="copyright" content="Devids" />
        <meta name="revisit-after" content="1 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="target" content="all" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        
        {/* AI/LLM Optimization */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider defaultTheme="dark" storageKey="stox-theme">
          <SmoothScrollProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
