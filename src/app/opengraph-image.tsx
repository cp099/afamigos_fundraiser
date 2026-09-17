import { ImageResponse } from 'next/og';

export const alt = 'Child Sponsorship Campaign — AFA MIGOS & CSA, CHRIST (Deemed to be University)';
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
          background: '#070A11',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Glow ambient background */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '350px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(7, 10, 17, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 24px',
            borderRadius: '999px',
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1.5px solid rgba(251, 191, 36, 0.3)',
            color: '#FBBF24',
            fontSize: '18px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '24px',
          }}
        >
          <span>AFA MIGOS • Class Contribution Drive</span>
        </div>

        {/* Main Headline */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
            fontWeight: 900,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '16px',
            letterSpacing: '-2px',
          }}
        >
          <span>One Class. One Goal. </span>
          <span style={{ color: '#F59E0B', marginLeft: '12px' }}>One Impact.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.4,
            marginBottom: '36px',
          }}
        >
          <span>Child Sponsorship Programme (CSP) • Centre for Social Action (CSA)</span>
          <span style={{ color: '#CBD5E1', marginTop: '4px' }}>CHRIST (Deemed to be University), Bengaluru</span>
        </div>

        {/* Impact Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 32px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#E2E8F0',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          <span style={{ color: '#FBBF24', fontWeight: 800 }}>₹6,000</span>
          <span>= 1 Full Year of Education, Books &amp; Nutrition for 1 Child</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
