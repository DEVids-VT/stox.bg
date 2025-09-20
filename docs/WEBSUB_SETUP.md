# WebSub (PubSubHubbub) Implementation Guide

This document explains the WebSub implementation for stox.bg RSS feeds.

## Overview

WebSub is a protocol that enables real-time feed notifications. When new content is published, subscribers are immediately notified instead of having to poll the feed.

## Implementation Details

### RSS Feed with WebSub Support

**Endpoint**: `/feed.xml`

The RSS feed automatically includes WebSub hub links:
- Hub: `https://pubsubhubbub.appspot.com/`
- Self-reference: `https://stox.bg/feed.xml`

### WebSub Notification System

#### Automatic Hub Notification
When new posts are published, the system can automatically notify WebSub hubs using the `/api/websub/notify` endpoint.

#### Manual Hub Notification
You can manually trigger WebSub notifications:

```bash
# Using curl
curl -X POST http://localhost:3000/api/websub/notify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -d '{}'

# Or with custom feed URL
curl -X POST http://localhost:3000/api/websub/notify \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET" \
  -d '{"feedUrl": "https://stox.bg/feed.xml"}'
```

#### Programmatic Usage
```typescript
import { notifyDefaultHubs, notifyNewPost } from '@/lib/websub';

// Notify hubs about feed update
await notifyDefaultHubs();

// Notify about specific new post
await notifyNewPost(123);
```

## Configuration

### Environment Variables

Add to your `.env.local`:
```bash
# Optional: Secret for WebSub notification API
WEBSUB_NOTIFY_SECRET=your-secret-here

# Required: Site URL for proper feed URLs
NEXT_PUBLIC_SITE_URL=https://stox.bg
```

### Supported Hubs

Default hubs included:
- Google's PubSubHubbub: `https://pubsubhubbub.appspot.com/`
- Superfeedr: `https://pubsubhubbub.superfeedr.com/`

## Integration with Content Management

### When Publishing New Posts

Add WebSub notification to your post publishing workflow:

```typescript
// After successfully creating/publishing a post
import { notifyNewPost } from '@/lib/websub';

async function publishPost(postData: PostData) {
  // 1. Save post to database
  const post = await createPost(postData);
  
  // 2. Notify WebSub hubs
  await notifyNewPost(post.id);
  
  return post;
}
```

### Webhook Integration

You can also trigger notifications via webhooks or external systems by calling the API endpoint.

## Testing

### Test RSS Feed
Visit: `http://localhost:3000/feed.xml`

The feed should include:
- All published posts from Supabase
- WebSub hub links in the XML
- Proper metadata and descriptions

### Test WebSub Notification
```bash
# Health check
curl http://localhost:3000/api/websub/notify

# Send notification
curl -X POST http://localhost:3000/api/websub/notify \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Validate with WebSub Hub

You can test with Google's hub:
1. Visit: `https://pubsubhubbub.appspot.com/`
2. Check if your feed URL is properly formatted
3. Monitor hub logs for successful notifications

## Feed Discovery

The RSS feed is automatically discoverable:
- **HTML Meta**: Added to `<head>` in layout.tsx
- **Content-Type**: Proper `application/rss+xml` headers
- **WebSub Links**: Embedded in RSS XML

Browsers and feed readers will automatically detect the feed link.

## Troubleshooting

### Common Issues

1. **Hub Notification Fails**
   - Check network connectivity
   - Verify hub URLs are accessible
   - Check server logs for detailed error messages

2. **Feed Not Updating**
   - Verify Supabase connection
   - Check if posts have proper `isdeleted=false` flag
   - Ensure `published_at` dates are set

3. **WebSub Not Working**
   - Confirm feed URL is publicly accessible
   - Verify hub links in RSS XML
   - Check if notifications are being sent

### Debug Logs

Enable debug logging in development:
```typescript
// In lib/websub.ts, all functions log their operations
console.log('WebSub notifications completed: success/failed counts');
```

## Benefits

- **Real-time Updates**: Subscribers get immediate notifications
- **Reduced Server Load**: Less frequent feed polling
- **Better SEO**: Search engines discover content faster
- **Improved User Experience**: Feed readers update content instantly

## Additional Resources

- [WebSub Specification](https://www.w3.org/TR/websub/)
- [Google's PubSubHubbub Hub](https://pubsubhubbub.appspot.com/)
- [RSS 2.0 Specification](http://www.rssboard.org/rss-specification)
