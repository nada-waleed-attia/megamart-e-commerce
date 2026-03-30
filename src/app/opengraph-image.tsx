import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'متجر إلكتروني الأفضل - تسوق أونلاين بأسعار ممتازة';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px',
          fontFamily: 'Cairo, sans-serif',
          position: 'relative',
        }}
      >
        <div style={{ 
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '16px',
          opacity: 0.8,
          fontWeight: 'normal'
        }}>
          ⭐ أفضل متجر إلكتروني
        </div>
        
        <div style={{ marginBottom: '20px', fontSize: 56 }}>
          متجر إلكتروني الأفضل
        </div>
        
        <div style={{ 
          fontSize: 32, 
          fontWeight: 'normal', 
          opacity: 0.95,
          marginBottom: '30px',
          lineHeight: 1.4
        }}>
          تسوق أونلاين بأسعار ممتازة
        </div>
        
        <div style={{ 
          fontSize: 20, 
          fontWeight: 'normal', 
          opacity: 0.8,
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <span>📱 هواتف ذكية</span>
          <span>💻 لابتوبات</span>
          <span>⌚ ساعات ذكية</span>
          <span>👕 ملابس رياضية</span>
        </div>
        
        <div style={{ 
          position: 'absolute',
          bottom: '20px',
          fontSize: '18px',
          opacity: 0.7,
          fontWeight: 'normal'
        }}>
          www.best-ecommerce.sa
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
