/**
 * WebSub (PubSubHubbub) notification utilities
 * Handles notifying hubs when new content is published
 */

export interface WebSubNotification {
  hub: string;
  feedUrl: string;
}

/**
 * Notify WebSub hub about updated feed content
 */
export async function notifyWebSubHub(options: WebSubNotification): Promise<boolean> {
  try {
    const { hub, feedUrl } = options;
    
    // Create form data for WebSub hub notification
    const formData = new URLSearchParams();
    formData.append('hub.mode', 'publish');
    formData.append('hub.url', feedUrl);

    const response = await fetch(hub, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'stox.bg WebSub Publisher'
      },
      body: formData.toString()
    });

    if (response.ok) {
      console.log(`WebSub hub notified successfully: ${hub}`);
      return true;
    } else {
      console.error(`WebSub hub notification failed: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error('WebSub hub notification error:', error);
    return false;
  }
}

/**
 * Notify default WebSub hubs about feed updates
 */
export async function notifyDefaultHubs(feedUrl?: string): Promise<{ success: number; failed: number }> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stox.bg';
  const finalFeedUrl = feedUrl || `${baseUrl}/feed.xml`;

  // Default WebSub hubs
  const defaultHubs = [
    'https://pubsubhubbub.appspot.com/',
    'https://pubsubhubbub.superfeedr.com/'
  ];

  let success = 0;
  let failed = 0;

  // Notify all hubs in parallel
  const notifications = defaultHubs.map(hub => 
    notifyWebSubHub({ hub, feedUrl: finalFeedUrl })
  );

  const results = await Promise.allSettled(notifications);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value) {
      success++;
    } else {
      failed++;
      console.error(`Failed to notify hub ${defaultHubs[index]}:`, 
        result.status === 'rejected' ? result.reason : 'Hub returned false'
      );
    }
  });

  console.log(`WebSub notifications completed: ${success} success, ${failed} failed`);
  return { success, failed };
}

/**
 * Utility function to notify hubs when a new post is published
 * Can be called from API routes or webhooks
 */
export async function notifyNewPost(postId?: number): Promise<void> {
  try {
    console.log(`Notifying WebSub hubs about new post: ${postId || 'feed update'}`);
    
    // Notify hubs about the feed update
    await notifyDefaultHubs();
    
    // Optionally, you could add more sophisticated logic here:
    // - Check if the post is actually new
    // - Rate limit notifications
    // - Store notification history
    
  } catch (error) {
    console.error('Error notifying WebSub hubs about new post:', error);
  }
}
