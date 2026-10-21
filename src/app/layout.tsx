import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

export const metadata: Metadata = {
  metadataBase: new URL('https://bikinkilat.web.id'),
  title: 'BikinKilat.web.id - Ekosistem Micro-SaaS Otomasi Dokumen & Aset Digital Indonesia',
  description: 'Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.',
  keywords: ['BikinKilat', 'slide presentasi', 'makalah otomatis', 'modul ajar kurikulum merdeka', 'cv ats', 'rab excel', 'surat perjanjian'],
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
    title: 'BikinKilat.web.id - Ekosistem Micro-SaaS Otomasi Dokumen & Aset Digital Indonesia',
    description: 'Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.',
    url: 'https://bikinkilat.web.id',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikinKilat.web.id - Ekosistem Micro-SaaS Otomasi Dokumen & Aset Digital Indonesia',
    description: 'Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.',
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
