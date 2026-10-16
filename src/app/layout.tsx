import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BikinKilat.com - Ekosistem Micro-SaaS Otomasi Dokumen & Aset Digital Indonesia',
  description: 'Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.',
  keywords: ['BikinKilat', 'slide presentasi', 'makalah otomatis', 'modul ajar kurikulum merdeka', 'cv ats', 'rab excel', 'surat perjanjian'],
  openGraph: {
    title: 'BikinKilat.com - Ekosistem Micro-SaaS Dokumen Indonesia',
    description: 'Satu akun, satu dompet token terpusat untuk 9 layanan otomasi cerdas.',
    url: 'https://bikinkilat.com',
    siteName: 'BikinKilat.com',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
