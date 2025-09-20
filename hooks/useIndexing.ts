"use client";

import { useState } from 'react';
import { submitUrlForIndexing, submitMultipleUrls, type IndexingResponse } from '@/lib/indexing';

export function useIndexing() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitUrl = async (url: string): Promise<IndexingResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await submitUrlForIndexing(url);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitMultiple = async (
    urls: string[], 
    delayMs: number = 1000
  ): Promise<IndexingResponse[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await submitMultipleUrls(urls, delayMs);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    submitUrl,
    submitMultiple,
    loading,
    error,
    clearError: () => setError(null),
  };
}
