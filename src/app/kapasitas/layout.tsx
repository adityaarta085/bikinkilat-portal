import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panduan Kapasitas & Kuota Layanan Publik',
  description:
    'Pusat panduan kapasitas dokumen dan pemanfaatan wajar (fair-use) 20 kuota harian gratis tanpa biaya layanan di seluruh 9 layanan publik BikinKilat.web.id.',
  keywords: [
    'panduan kapasitas bikinkilat',
    'kuota harian gratis bikinkilat',
    'fair use kuota dokumen',
    'inisiatif dokumen terbuka',
    'otomasi dokumen publik',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/kapasitas',
  },
  openGraph: {
    title: 'Panduan Kapasitas & Kuota Layanan Publik | BikinKilat.web.id',
    description:
      'Pusat panduan kapasitas dokumen dan pemanfaatan wajar (fair-use) 20 kuota harian gratis tanpa biaya di seluruh 9 layanan publik BikinKilat.web.id.',
    url: 'https://bikinkilat.web.id/kapasitas',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://bikinkilat.web.id/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Panduan Kapasitas & Kuota Layanan Publik BikinKilat.web.id',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Panduan Kapasitas & Kuota Layanan Publik | BikinKilat.web.id',
    description:
      'Pusat panduan kapasitas dokumen dan pemanfaatan wajar (fair-use) 20 kuota harian gratis tanpa biaya di seluruh 9 layanan publik BikinKilat.web.id.',
    images: ['https://bikinkilat.web.id/og-image.png'],
  },
};

export default function KapasitasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
