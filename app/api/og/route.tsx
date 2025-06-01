import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get parameters from URL
    const title = searchParams.get('title') || 'Stox.bg';
    const subtitle = searchParams.get('subtitle') || 'Инвеститорският интернет. На едно място.';
    const type = searchParams.get('type') || 'website';
    const ticker = searchParams.get('ticker') || '';
    const price = searchParams.get('price') || '';
    const change = searchParams.get('change') || '';

    // Determine background gradient based on type
    const getBackgroundGradient = () => {
      switch (type) {
        case 'stock':
          return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        case 'analysis':
          return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        case 'category':
          return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
        default:
          return 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%, #fecfef 100%)';
      }
    };

    return new ImageResponse(
      (
        <div
          style={{
            background: getBackgroundGradient(),
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
            color: 'white',
            position: 'relative',
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
            }}
          />
          
          {/* Header with Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #fff 0%, #f0f0f0 100%)',
                backgroundClip: 'text',
                color: 'transparent',
                marginRight: '20px',
              }}
            >
              STOX.BG
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              maxWidth: '900px',
              padding: '0 40px',
            }}
          >
            {/* Title */}
            <h1
              style={{
                fontSize: ticker ? '64px' : '72px',
                fontWeight: 'bold',
                margin: '0 0 20px 0',
                lineHeight: '1.1',
                textAlign: 'center',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '32px',
                margin: '0 0 30px 0',
                opacity: 0.9,
                textAlign: 'center',
                fontWeight: '400',
              }}
            >
              {subtitle}
            </p>

            {/* Stock-specific data */}
            {ticker && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '40px',
                  marginTop: '20px',
                  padding: '20px 40px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: '24px', opacity: 0.8 }}>Тикер</div>
                  <div style={{ fontSize: '36px', fontWeight: 'bold' }}>{ticker}</div>
                </div>
                {price && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '24px', opacity: 0.8 }}>Цена</div>
                    <div style={{ fontSize: '36px', fontWeight: 'bold' }}>${price}</div>
                  </div>
                )}
                {change && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ fontSize: '24px', opacity: 0.8 }}>Промяна</div>
                    <div 
                      style={{ 
                        fontSize: '36px', 
                        fontWeight: 'bold',
                        color: change.startsWith('-') ? '#ff6b6b' : '#51cf66'
                      }}
                    >
                      {change}%
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '20px',
              opacity: 0.8,
            }}
          >
            <span>📈</span>
            <span>Българската платформа за инвеститори</span>
            <span>🇧🇬</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('Error generating OG image:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
} 