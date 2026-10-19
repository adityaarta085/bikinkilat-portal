import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

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
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('bikinkilat_theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
