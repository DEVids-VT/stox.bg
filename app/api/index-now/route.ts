import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// IndexNow submission function
async function submitToBingIndexNow(url: string) {
  const apiKey = process.env.BING_INDEXNOW_KEY; // Your IndexNow key
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'https://stox.bg'; // Your site URL
  
  if (!apiKey) {
    throw new Error('BING_INDEXNOW_KEY environment variable is not set');
  }

  const indexNowData = {
    host: host.replace('https://', '').replace('http://', ''),
    key: apiKey,
    keyLocation: `${host}/${apiKey}.txt`,
    urlList: [url]
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(indexNowData)
    });

    if (response.ok) {
      console.log('Successfully submitted to IndexNow');
      return { success: true };
    } else {
      console.error('IndexNow submission failed:', response.status);
      return { success: false, error: response.statusText };
    }
  } catch (error) {
    console.error('IndexNow error:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Google Indexing API submission function
async function submitToGoogleIndexing(url: string) {
  const credentials = process.env.GOOGLE_CREDENTIALS;
  
  if (!credentials) {
    throw new Error('GOOGLE_CREDENTIALS environment variable is not set');
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(credentials),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexer = google.indexing({ version: 'v3', auth });
    
    await indexer.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' }
    });
    
    return { success: true };
  } catch (error) {
    console.error('Google Indexing API error:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Main API handler
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const results: {
      google?: { success: boolean; error?: string };
      bing?: { success: boolean; error?: string };
    } = {};

    // Submit to Google Indexing API
    try {
      const googleResult = await submitToGoogleIndexing(url);
      results.google = googleResult;
    } catch (error) {
      results.google = { success: false, error: (error as Error).message };
    }

    // Submit to Bing IndexNow
    try {
      const bingResult = await submitToBingIndexNow(url);
      results.bing = bingResult;
    } catch (error) {
      results.bing = { success: false, error: (error as Error).message };
    }

    return NextResponse.json({
      success: true,
      message: 'URL submission completed',
      url,
      results
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
