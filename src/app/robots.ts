import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/callback'],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'YandexBot', 'DuckDuckBot', 'Baiduspider', 'Slurp'],
        allow: '/',
        disallow: ['/api/', '/auth/callback'],
      },
    ],
    sitemap: 'https://bikinkilat.web.id/sitemap.xml',
  };
}
