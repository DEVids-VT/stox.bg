"use client";

import { useEffect } from 'react';

// Google Analytics configuration
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function AnalyticsWrapper() {
  useEffect(() => {
    // Only initialize if GA_MEASUREMENT_ID is available
    if (!GA_MEASUREMENT_ID) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;

    gtag('js', new Date());
    
    // Initialize with granted consent by default
    gtag('consent', 'default', {
      analytics_storage: 'granted'
    });

    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    // Check if user has made a consent choice
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      try {
        const preferences = JSON.parse(consent);
        gtag('consent', 'update', {
          analytics_storage: preferences.analytics ? 'granted' : 'denied'
        });
      } catch (e) {
        console.error('Error parsing cookie consent for analytics:', e);
      }
    }
    // If no consent choice made, analytics remains granted by default

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}