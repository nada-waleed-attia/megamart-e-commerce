import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'متجر إلكتروني - أفضل المنتجات بأسعار ممتازة';

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
          background: 'linear-gradient(to right, #1e40af, #3b82f6)',
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
        }}
      >
        <div style={{ marginBottom: '20px' }}>متجر إلكتروني</div>
        <div style={{ fontSize: 32, fontWeight: 'normal', opacity: 0.9 }}>
          أفضل المنتجات بأسعار ممتازة
        </div>
        <div style={{ fontSize: 24, fontWeight: 'normal', opacity: 0.8, marginTop: '20px' }}>
          هواتف ذكية • لابتوبات • ساعات ذكية • ملابس رياضية
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
