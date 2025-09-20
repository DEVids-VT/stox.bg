"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useIndexing } from '@/hooks/useIndexing';
import { getAllSiteUrls } from '@/lib/indexing';
import { Loader2, CheckCircle, XCircle, Globe, Search } from 'lucide-react';

export function IndexingPanel() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState<{ multiple?: Array<{ url: string; results: { google?: { success: boolean; error?: string }; bing?: { success: boolean; error?: string } } }>; results?: { google?: { success: boolean; error?: string }; bing?: { success: boolean; error?: string } } } | null>(null);
  const { submitUrl, submitMultiple, loading, error } = useIndexing();

  const handleSubmitSingle = async () => {
    if (!url.trim()) return;
    
    const result = await submitUrl(url.trim());
    setResults(result);
  };

  const handleSubmitSitemap = async () => {
    const sitemapUrls = await getAllSiteUrls();
    const results = await submitMultiple(sitemapUrls, 2000);
    setResults({ multiple: results });
  };

  const renderResult = (service: string, result: { success: boolean; error?: string } | undefined) => {
    if (!result) return null;
    
    return (
      <div className={`flex items-center gap-2 p-3 rounded-lg ${
        result.success ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
      }`}>
        {result.success ? (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600" />
        )}
        <div>
          <div className="font-medium capitalize">{service}</div>
          {result.error && (
            <div className="text-sm text-muted-foreground">{result.error}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
      <div>
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Search className="h-6 w-6" />
          Search Engine Indexing
        </h2>
        <p className="text-muted-foreground">
          Submit URLs to Google and Bing for faster indexing
        </p>
      </div>

      {/* Single URL Submission */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Submit Single URL</h3>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://stox.bg/your-url"
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
            disabled={loading}
          />
          <Button 
            onClick={handleSubmitSingle}
            disabled={loading || !url.trim()}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </div>

      {/* Bulk Submission */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Submit Sitemap URLs</h3>
        <Button 
          onClick={handleSubmitSitemap}
          disabled={loading}
          variant="outline"
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 mr-2" />
              Submit All Main Pages
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          This will submit all URLs from your dynamic sitemap (static pages + all published articles)
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="font-medium text-red-800 dark:text-red-200">Error</span>
          </div>
          <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
        </div>
      )}

      {/* Results Display */}
      {results && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Results</h3>
          
          {results.multiple ? (
            // Multiple URL results
            <div className="space-y-2">
              {results.multiple.map((result: { url: string; results: { google?: { success: boolean; error?: string }; bing?: { success: boolean; error?: string } } }, index: number) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="font-medium text-sm mb-2">{result.url}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.results.google && renderResult('Google', result.results.google)}
                    {result.results.bing && renderResult('Bing', result.results.bing)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Single URL results
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.results?.google && renderResult('Google', results.results.google)}
              {results.results?.bing && renderResult('Bing', results.results.bing)}
            </div>
          )}
        </div>
      )}

      {/* Usage Info */}
      <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
        <strong>Usage Tips:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Only submit URLs when content actually changes</li>
          <li>Google Indexing API has a daily quota of 200 requests</li>
          <li>Bing IndexNow allows up to 10,000 URLs per day</li>
          <li>Results may take a few hours to appear in search engines</li>
        </ul>
      </div>
    </div>
  );
}
