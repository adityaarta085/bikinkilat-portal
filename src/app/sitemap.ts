import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: 'https://bikinkilat.web.id',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: 'https://bikinkilat.web.id/transparansi',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: 'https://bikinkilat.web.id/beta',
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://bikinkilat.web.id/kasir',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://bikinkilat.web.id/catatan-rilis',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://bikinkilat.web.id/pembaruan',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bikinkilat.web.id/changelog',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://bikinkilat.web.id/auth',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://bikinkilat.web.id/topup',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: 'https://bikinkilat.web.id/bayar',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: 'https://bikinkilat.web.id/dashboard',
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://bikinkilat.web.id/syarat-ketentuan',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://bikinkilat.web.id/kebijakan-privasi',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://bikinkilat.web.id/kebijakan-pengembalian-dana',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://bikinkilat.web.id/etika-akademik',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://bikinkilat.web.id/pengembang',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];
}
