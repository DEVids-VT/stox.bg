import { NextRequest, NextResponse } from 'next/server';
import { notifyDefaultHubs } from '@/lib/websub';

/**
 * API endpoint to trigger WebSub notifications
 * Can be called when new posts are published
 */
export async function POST(request: NextRequest) {
  try {
    // Optional: Add authentication/authorization here
    const authHeader = request.headers.get('Authorization');
    const expectedAuth = process.env.WEBSUB_NOTIFY_SECRET;
    
    if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get feed URL from request body or use default
    const body = await request.json().catch(() => ({}));
    const feedUrl = body.feedUrl;

    // Notify WebSub hubs
    const result = await notifyDefaultHubs(feedUrl);

    return NextResponse.json({
      success: true,
      message: 'WebSub notifications sent',
      results: result
    });

  } catch (error) {
    console.error('WebSub notification API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send WebSub notifications',
        message: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    service: 'WebSub Notification API',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}
