import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Child Sponsorship Campaign | AFA MIGOS',
    short_name: 'AFA MIGOS CSP',
    description: 'Classroom fundraising campaign for the Child Sponsorship Programme (CSP) by CSA, CHRIST (Deemed to be University).',
    start_url: '/',
    display: 'standalone',
    background_color: '#070A11',
    theme_color: '#070A11',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
