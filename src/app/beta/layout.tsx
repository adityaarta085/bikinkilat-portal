import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BikinKilat Beta - Tema Baru Pratinjau Ekosistem Otomasi Dokumen Kilat',
  description:
    'Coba antarmuka tema Beta BikinKilat. Ekosistem 9 otomasi cerdas: slide presentasi 16:9, makalah akademik, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat perjanjian resmi.',
  keywords: [
    'BikinKilat Beta',
    'tema baru bikinkilat',
    'generator presentasi pptx',
    'makalah docx otomatis',
    'modul ajar guru kurikulum merdeka',
    'cv ats indonesia',
    'rab excel sni',
    'surat perjanjian docx',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/beta',
  },
  openGraph: {
    title: 'BikinKilat Beta - Tema Baru Pratinjau Ekosistem Otomasi Dokumen Kilat',
    description:
      'Coba antarmuka tema Beta BikinKilat. Ekosistem 9 otomasi cerdas: slide presentasi 16:9, modul ajar, resume ATS, RAB SNI, dan surat legal.',
    url: 'https://bikinkilat.web.id/beta',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://bikinkilat.web.id/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BikinKilat Beta - Ekosistem Otomasi Dokumen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikinKilat Beta - Tema Baru Pratinjau Ekosistem Otomasi Dokumen Kilat',
    description:
      'Coba antarmuka tema Beta BikinKilat. Ekosistem 9 otomasi cerdas: slide presentasi 16:9, modul ajar, resume ATS, RAB SNI, dan surat legal.',
    images: ['https://bikinkilat.web.id/og-image.png'],
  },
};

export default function BetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
