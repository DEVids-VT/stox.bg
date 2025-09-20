# IndexNow Implementation Guide

## Overview
This implementation provides automated URL submission to both Google Indexing API and Bing IndexNow API for faster search engine indexing.

## Setup Steps

### 1. IndexNow Key File
✅ **Already completed** - The key file is present at:
```
public/e0d965f680684caab89af8883a139bac.txt
```

### 2. Environment Variables
Add the following environment variables to your `.env.local` file:

```env
# IndexNow API Key (same as filename without .txt)
BING_INDEXNOW_KEY=e0d965f680684caab89af8883a139bac

# Site URL
NEXT_PUBLIC_SITE_URL=https://stox.bg

# Google Indexing API Credentials (JSON string)
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"your-project",...}
```

### 3. Google Indexing API Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the "Web Search Indexing API"
4. Create a Service Account
5. Download the JSON credentials
6. Add the service account email to Google Search Console as an owner

### 4. API Endpoint
✅ **Implemented** - Available at `/api/index-now`

## Usage

### Basic URL Submission
```typescript
import { submitUrlForIndexing } from '@/lib/indexing';

// Submit a single URL
const result = await submitUrlForIndexing('https://stox.bg/new-article');
console.log(result);
```

### Multiple URLs
```typescript
import { submitMultipleUrls } from '@/lib/indexing';

const urls = [
  'https://stox.bg/article-1',
  'https://stox.bg/article-2',
  'https://stox.bg/article-3'
];

const results = await submitMultipleUrls(urls, 1000); // 1 second delay
```

### Direct API Call
```javascript
const response = await fetch('/api/index-now', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://stox.bg/your-url'
  })
});

const data = await response.json();
```

## Response Format
```json
{
  "success": true,
  "message": "URL submission completed",
  "url": "https://stox.bg/example",
  "results": {
    "google": {
      "success": true
    },
    "bing": {
      "success": true
    }
  }
}
```

## Integration Examples

### After Publishing New Content
```typescript
// In your CMS or content publishing workflow
export async function publishArticle(article: Article) {
  // Save article to database
  await saveArticle(article);
  
  // Submit to search engines
  const articleUrl = `https://stox.bg/c/${article.slug}`;
  try {
    await submitUrlForIndexing(articleUrl);
    console.log(`Submitted ${articleUrl} for indexing`);
  } catch (error) {
    console.error('Indexing submission failed:', error);
  }
}
```

### Bulk Sitemap Submission
```typescript
import { getAllSiteUrls, submitMultipleUrls } from '@/lib/indexing';

export async function submitSitemap() {
  // This fetches ALL URLs directly from the database
  // including static pages AND all published articles (same logic as sitemap.ts)
  const urls = await getAllSiteUrls();
  const results = await submitMultipleUrls(urls, 2000);
  
  results.forEach(result => {
    console.log(`${result.url}: ${result.success ? 'Success' : 'Failed'}`);
  });
}
```

## Rate Limits & Best Practices

### Google Indexing API
- **Quota**: 200 requests per day (default)
- **Rate limit**: 600 requests per minute
- **Best practice**: Use for important pages only

### Bing IndexNow
- **Daily limit**: 10,000 URLs per day
- **Rate limit**: No specific limit mentioned
- **Best practice**: Submit in batches with delays

### General Guidelines
1. **Don't spam**: Only submit when content actually changes
2. **Use delays**: Add 1-2 second delays between requests
3. **Handle errors**: Implement proper error handling and retries
4. **Monitor quotas**: Track your API usage
5. **Quality over quantity**: Focus on important pages

## Error Handling
The API handles various error scenarios:
- Missing environment variables
- Invalid URLs
- API rate limits
- Network timeouts
- Authentication failures

## Testing
```bash
# Test the API endpoint
curl -X POST http://localhost:3000/api/index-now \
  -H "Content-Type: application/json" \
  -d '{"url": "https://stox.bg/test"}'
```

## Monitoring
Monitor the effectiveness by:
1. Checking Google Search Console for indexing status
2. Using Bing Webmaster Tools
3. Tracking server logs for API responses
4. Setting up alerts for failed submissions

## Troubleshooting

### Common Issues
1. **BING_INDEXNOW_KEY not set**: Add the key to environment variables
2. **GOOGLE_CREDENTIALS invalid**: Check JSON format and service account
3. **403 Forbidden**: Verify service account has proper permissions
4. **429 Rate Limited**: Implement delays and respect quotas
5. **Invalid URL**: Ensure URLs are properly formatted and accessible

### Debug Mode
Add logging to track submissions:
```typescript
console.log('Submitting URL:', url);
console.log('IndexNow result:', bingResult);
console.log('Google result:', googleResult);
```
