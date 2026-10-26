import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pusat Transparansi, Privasi Data & Keterbatasan Layanan • BikinKilat.web.id',
  description:
    'Pusat keterbukaan resmi BikinKilat.web.id: matriks kemampuan vs keterbatasan generator, siklus retensi data UU PDP, kebijakan zero-training AI, transparansi tarif token, dan garansi saldo.',
  keywords: [
    'transparansi bikinkilat',
    'privasi data bikinkilat',
    'keterbatasan bikinkilat',
    'garansi token bikinkilat',
    'uu pdp bikinkilat',
    'kebijakan ai bikinkilat',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/transparansi',
  },
  openGraph: {
    title: 'Pusat Transparansi, Privasi Data & Keterbatasan Layanan | BikinKilat.web.id',
    description:
      'Pusat keterbukaan resmi BikinKilat.web.id: matriks kemampuan vs keterbatasan, retensi data UU PDP, dan garansi token bebas risiko.',
    url: 'https://bikinkilat.web.id/transparansi',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function TransparencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
