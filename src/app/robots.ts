import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://afamigos-fundraiser.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/about-developer', '/privacy', '/terms'],
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
