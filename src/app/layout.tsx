import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Child Sponsorship Campaign | AFA MIGOS • CSA, CHRIST (Deemed to be University)',
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
  authors: [{ name: 'Chirag P Patil (cp099)' }],
  creator: 'Chirag P Patil (cp099)',
  openGraph: {
    title: 'Child Sponsorship Campaign | AFA MIGOS • CSA CHRIST (Deemed to be University)',
    description: 'One Class. One Goal. One Impact. Follow our live progress and student leaderboard supporting the Centre for Social Action, CHRIST (Deemed to be University)!',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#070A11',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
      </body>
    </html>
  );
}
