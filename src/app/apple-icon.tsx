import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: 'linear-gradient(135deg, #070A11 0%, #0F172A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F59E0B',
          fontWeight: 900,
          borderRadius: '36px',
          border: '6px solid rgba(245, 158, 11, 0.4)',
          fontFamily: 'sans-serif',
        }}
      >
        A
      </div>
    ),
    {
      ...size,
    }
  );
}
