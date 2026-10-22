import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

export const metadata: Metadata = {
  metadataBase: new URL('https://bikinkilat.web.id'),
  title: 'BikinKilat — Platform Dokumen & Presentasi Standar Indonesia',
  description: 'Kompilasi berkas asli siap cetak berstandar Indonesia: slide presentasi 16:9 (.pptx), modul ajar Kurikulum Merdeka (.docx), kalkulasi anggaran SNI (.xlsx), dan surat resmi berkekuatan hukum.',
  keywords: ['BikinKilat', 'slide presentasi pptx', 'makalah otomatis', 'modul ajar kurikulum merdeka', 'cv ats indonesia', 'rab excel sni', 'surat perjanjian dinas'],
  alternates: {
    canonical: 'https://bikinkilat.web.id',
  },
  verification: {
    google: 'IE6K_wmJRTxnzlyWsPxgUYzbqogvTAvpLtW9zJhjviY',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'BikinKilat — Platform Dokumen & Presentasi Standar Indonesia',
    description: 'Kompilasi berkas asli siap cetak berstandar Indonesia: slide presentasi 16:9 (.pptx), modul ajar Kurikulum Merdeka (.docx), kalkulasi anggaran SNI (.xlsx), dan surat resmi berkekuatan hukum.',
    url: 'https://bikinkilat.web.id',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikinKilat — Platform Dokumen & Presentasi Standar Indonesia',
    description: 'Kompilasi berkas asli siap cetak berstandar Indonesia: slide presentasi 16:9 (.pptx), modul ajar Kurikulum Merdeka (.docx), kalkulasi anggaran SNI (.xlsx), dan surat resmi berkekuatan hukum.',
    creator: '@bikinkilat',
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": "https://bikinkilat.web.id/#webapp",
                  "name": "BikinKilat.web.id",
                  "url": "https://bikinkilat.web.id",
                  "description": "Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "All",
                  "browserRequirements": "Requires JavaScript. Requires HTML5.",
                  "inLanguage": "id-ID",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "IDR",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://bikinkilat.web.id/#website",
                  "url": "https://bikinkilat.web.id",
                  "name": "BikinKilat.web.id",
                  "description": "Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.",
                  "inLanguage": "id-ID"
                }
              ]
            })
          }}
        />
                <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var match = document.cookie.match(/(?:^|;\s*)bikinkilat_theme=([^;]+)/);
                  var theme = match ? match[1] : null;
                  if (!theme) {
                    theme = localStorage.getItem('bikinkilat_theme');
                  }
                  if (theme === 'dark') {
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
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 overflow-x-hidden antialiased">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
