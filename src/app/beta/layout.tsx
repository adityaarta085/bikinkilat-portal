import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BikinKilat Beta - Buat Dokumen Resmi dalam Hitungan Detik',
  description:
    'Tema landing page pratinjau Beta BikinKilat. Ekosistem 9 otomasi cerdas: slide presentasi 16:9, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat perjanjian resmi.',
  alternates: {
    canonical: 'https://bikinkilat.web.id/beta',
  },
  openGraph: {
    title: 'BikinKilat Beta - Buat Dokumen Resmi dalam Hitungan Detik',
    description:
      'Tema landing page pratinjau Beta BikinKilat. Ekosistem 9 otomasi cerdas dokumen resmi Indonesia.',
    url: 'https://bikinkilat.web.id/beta',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function BetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
