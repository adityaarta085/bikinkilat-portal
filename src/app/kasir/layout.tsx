import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kasir Resmi & Top Up Token QRIS Instan',
  description:
    'Halaman kasir resmi BikinKilat. Top up token instan dengan QRIS Nasional resmi, mulai Rp 10.000 dengan bonus token bertingkat hingga +50%. Saldo aktif otomatis di seluruh 9 layanan.',
  keywords: [
    'kasir bikinkilat',
    'top up token bikinkilat',
    'beli token ppt bikinkilat',
    'qris instan bikinkilat',
    'token dokumen otomatis',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/kasir',
  },
  openGraph: {
    title: 'Kasir Resmi & Top Up Token QRIS Instan | BikinKilat.web.id',
    description:
      'Top up token instan dengan QRIS Nasional resmi. Saldo aktif otomatis untuk 9 layanan otomasi cerdas BikinKilat.',
    url: 'https://bikinkilat.web.id/kasir',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://bikinkilat.web.id/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kasir BikinKilat - Top Up Token QRIS Instan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kasir Resmi & Top Up Token QRIS Instan | BikinKilat.web.id',
    description:
      'Top up token instan dengan QRIS Nasional resmi. Saldo aktif otomatis untuk 9 layanan otomasi cerdas BikinKilat.',
    images: ['https://bikinkilat.web.id/og-image.png'],
  },
};

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
