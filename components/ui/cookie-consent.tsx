"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Cookie, Settings } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: true, // Default to enabled
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(prev => ({ ...prev, ...saved }));
      } catch (e) {
        console.error('Error parsing cookie consent:', e);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = { necessary: true, analytics: true };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const newPreferences = { necessary: true, analytics: false };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
    setIsVisible(false);
    setShowSettings(false);
  };

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    
    // Enable/disable Google Analytics based on consent
    if (prefs.analytics) {
      // Enable Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      // Disable Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="max-w-6xl mx-auto">
        {!showSettings ? (
          // Main consent banner
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <Cookie className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  Бисквитки и поверителност
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Използваме бисквитки за подобряване на вашето изживяване и анализ на трафика. 
                  Всички видове бисквитки са активирани по подразбиране, но можете да промените 
                  настройките си по всяко време.{' '}
                  <Link 
                    href="/legal" 
                    className="text-primary hover:underline"
                  >
                    Научете повече
                  </Link>
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Настройки
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
              >
                Отказ
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Приемам всички
              </Button>
            </div>
          </div>
        ) : (
          // Settings panel
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки за бисквитки
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              {/* Necessary cookies */}
              <div className="flex items-start justify-between gap-4 p-4 bg-card rounded-lg border border-border">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    Задължителни бисквитки
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Необходими за основното функциониране на сайта (тема, сигурност).
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Винаги активни</span>
                </div>
              </div>
              
              {/* Analytics cookies */}
              <div className="flex items-start justify-between gap-4 p-4 bg-card rounded-lg border border-border">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    Аналитични бисквитки
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Google Analytics за анализ на трафика и подобряване на услугите. Активирани по подразбиране.
                  </p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ 
                      ...prev, 
                      analytics: e.target.checked 
                    }))}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${
                    preferences.analytics ? 'bg-primary' : 'bg-muted'
                  }`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      preferences.analytics ? 'right-1' : 'left-1'
                    }`}></div>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(false)}
                className="flex-1 sm:flex-initial"
              >
                Отказ
              </Button>
              <Button
                size="sm"
                onClick={handleSaveSettings}
                className="flex-1 sm:flex-initial bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Запази настройките
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
