import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 192,
  height: 192,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20%',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '80px',
          fontWeight: 'bold',
          fontFamily: 'Cairo, sans-serif',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <div style={{ fontSize: '60px' }}>م</div>
        <div style={{ 
          position: 'absolute',
          bottom: '10px',
          fontSize: '16px',
          fontWeight: 'normal'
        }}>
          متجر
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
