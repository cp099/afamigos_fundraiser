import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CookieConsent } from '@/components/public/CookieConsent';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://afamigos-fundraiser.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Child Sponsorship Campaign | AFA MIGOS • CSA, CHRIST (Deemed to be University)',
    template: '%s | AFA MIGOS Fundraiser',
  },
  description:
    'One Class. One Goal. One Impact. AFA MIGOS classroom fundraising campaign for the Child Sponsorship Programme (CSP) by the Centre for Social Action (CSA), CHRIST (Deemed to be University), Bengaluru.',
  keywords: [
    'AFA MIGOS',
    'Centre for Social Action',
    'CSA',
    'CHRIST University',
    'CHRIST (Deemed to be University)',
    'Child Sponsorship Programme',
    'CSP',
    'Educate a Child',
    'Chirag P Patil',
    'cp099',
  ],
  authors: [{ name: 'Chirag P Patil (cp099)', url: 'https://github.com/cp099' }],
  creator: 'Chirag P Patil (cp099)',
  publisher: 'AFA MIGOS & CSA, CHRIST (Deemed to be University)',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Child Sponsorship Campaign | AFA MIGOS • CSA, CHRIST (Deemed to be University)',
    description:
      'One Class. One Goal. One Impact. Follow our live progress and student leaderboard supporting the Centre for Social Action, CHRIST (Deemed to be University)!',
    url: baseUrl,
    siteName: 'AFA MIGOS Child Sponsorship Campaign',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Sponsorship Campaign | AFA MIGOS • CSA, CHRIST (Deemed to be University)',
    description:
      'One Class. One Goal. One Impact. Real-time classroom fundraising drive for the Child Sponsorship Programme (CSP).',
    creator: '@cp099',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#070A11',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#070A11] text-[#F1F5F9] font-sans overflow-x-hidden">
        <AuthProvider>{children}</AuthProvider>
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
