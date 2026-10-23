import type { Metadata } from 'next';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

export const metadata: Metadata = {
  metadataBase: new URL('https://bikinkilat.web.id'),
  title: {
    default: 'BikinKilat.web.id - Solusi Otomasi Dokumen & Presentasi Kilat Indonesia',
    template: '%s | BikinKilat.web.id',
  },
  description:
    'Portal terpusat #1 di Indonesia untuk 9 layanan otomasi cerdas: slide presentasi PPTX 16:9, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI Excel, surat perjanjian resmi, waris Islam faraidh, proposal bisnis, dan pasfoto formal. Ekspor file asli siap edit dalam sub-2 detik.',
  keywords: [
    'BikinKilat',
    'bikin ppt otomatis',
    'generator slide presentasi',
    'slide presentasi pptx',
    'buat makalah word otomatis',
    'makalah akademik docx',
    'modul ajar kurikulum merdeka',
    'cv ats indonesia',
    'generator resume ats',
    'format rab bangunan excel sni',
    'kalkulator rab bangunan',
    'surat perjanjian resmi docx',
    'template surat legal',
    'kalkulator pembagian waris islam',
    'hukum waris faraidh online',
    'proposal usaha bisnis plan',
    'edit pasfoto formal background merah biru',
    'pasfoto kemeja putih jas ai',
    'otomasi dokumen indonesia',
    'slide sidang skripsi kilat',
    'dokumen kantor otomatis',
  ],
  authors: [{ name: 'BikinKilat Indonesia', url: 'https://bikinkilat.web.id' }],
  creator: 'BikinKilat Indonesia',
  publisher: 'BikinKilat Indonesia',
  applicationName: 'BikinKilat',
  category: 'Productivity & Office Technology',
  classification: 'Business & Educational Software',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://bikinkilat.web.id',
    languages: {
      'id-ID': 'https://bikinkilat.web.id',
    },
  },
  verification: {
    google: 'IE6K_wmJRTxnzlyWsPxgUYzbqogvTAvpLtW9zJhjviY',
    yandex: 'yandex-verification-code',
    other: {
      'msvalidate.01': 'B494F3C46C9BB5C048FE73379B5E973B',
      'google-site-verification': 'IE6K_wmJRTxnzlyWsPxgUYzbqogvTAvpLtW9zJhjviY',
    },
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
    title: 'BikinKilat.web.id - Solusi Otomasi Dokumen & Presentasi Kilat Indonesia',
    description:
      'Akses 9 layanan otomasi cerdas dokumen & presentasi berstandar nasional. Ekspor file asli .pptx, .docx, .xlsx dalam sub-2 detik dengan 1 saldo token terpadu.',
    url: 'https://bikinkilat.web.id',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://bikinkilat.web.id/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BikinKilat.web.id - Ekosistem Otomasi Dokumen & Presentasi Kilat',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BikinKilat.web.id - Solusi Otomasi Dokumen & Presentasi Kilat Indonesia',
    description:
      'Akses 9 layanan otomasi cerdas dokumen & presentasi berstandar nasional. Ekspor file asli .pptx, .docx, .xlsx dalam sub-2 detik dengan 1 saldo token terpadu.',
    creator: '@bikinkilat',
    images: ['https://bikinkilat.web.id/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredDataGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://bikinkilat.web.id/#organization',
        name: 'BikinKilat',
        alternateName: 'BikinKilat.web.id',
        url: 'https://bikinkilat.web.id',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bikinkilat.web.id/brand/logo-full-color.png',
          width: 794,
          height: 724,
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'support@bikinkilat.web.id',
          areaServed: 'ID',
          availableLanguage: ['Indonesian'],
        },
        sameAs: [
          'https://slide.bikinkilat.web.id',
          'https://modul.bikinkilat.web.id',
          'https://cv.bikinkilat.web.id',
          'https://rab.bikinkilat.web.id',
          'https://surat.bikinkilat.web.id',
          'https://waris.bikinkilat.web.id',
          'https://proposal.bikinkilat.web.id',
          'https://pasfoto.bikinkilat.web.id',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://bikinkilat.web.id/#website',
        url: 'https://bikinkilat.web.id',
        name: 'BikinKilat.web.id',
        description:
          'Portal terpusat untuk 9 layanan otomasi cerdas: slide presentasi PPTX, makalah akademik DOCX, modul ajar kurikulum merdeka, resume ATS, RAB SNI, dan surat legal.',
        publisher: {
          '@id': 'https://bikinkilat.web.id/#organization',
        },
        inLanguage: 'id-ID',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://bikinkilat.web.id/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://bikinkilat.web.id/#webapp',
        name: 'BikinKilat Ekosistem Otomasi Dokumen',
        url: 'https://bikinkilat.web.id',
        description:
          'Ekosistem 9 otomasi cerdas dokumen & presentasi Indonesia: generator slide PPTX, makalah DOCX, modul ajar, resume ATS, RAB SNI, surat legal, waris Islam, proposal bisnis, dan pasfoto formal.',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: 'Productivity',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        inLanguage: 'id-ID',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '1480',
          bestRating: '5',
          worstRating: '1',
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          'Generator Slide Presentasi PPTX 16:9 Tematik',
          'Penyusun Makalah Akademik Standar Kampus DOCX',
          'Generator Modul Ajar Kurikulum Merdeka Terstruktur',
          'Pembuat Resume & CV Standar ATS Siap Seleksi',
          'Kalkulator & Format RAB Bangunan SNI Excel',
          'Penyusun Surat Perjanjian & Dokumen Legal Resmi',
          'Kalkulator Faraidh Pembagian Waris Islam',
          'Generator Proposal Usaha & Business Plan Profesional',
          'Editor Pasfoto Formal Ganti Latar Belakang Biru & Merah',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://bikinkilat.web.id/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Berapa lama proses pembuatan slide dan dokumen di BikinKilat?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Proses pembuatan dokumen, modul, dan slide di BikinKilat berjalan dalam hitungan detik (sub-2 detik) menggunakan komputasi teroptimasi dan file langsung siap diunduh.',
            },
          },
          {
            '@type': 'Question',
            name: 'Format file apa saja yang bisa diunduh?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Setiap layanan menghasilkan file dokumen asli yang dapat diedit bebas: PowerPoint (.pptx), Microsoft Word (.docx), Excel (.xlsx), PDF, dan Markdown (.md), bukan sekadar screenshot atau teks web.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah token yang saya beli bisa dipakai di semua layanan subdomain?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, sistem BikinKilat menggunakan satu dompet token terpadu. Saldo token yang Anda miliki otomatis tersinkronisasi langsung ke seluruh 9 subdomain layanan tanpa perlu registrasi ulang.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah ada kuota bonus token gratis untuk mencoba?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, setiap pengguna baru yang mendaftar dan masuk ke akun BikinKilat mendapatkan bonus 5 token gratis untuk mencoba layanan langsung.',
            },
          },
          {
            '@type': 'Question',
            name: 'Bagaimana metode pembayaran untuk top up token?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Top up token diproses secara instan melalui QRIS Nasional resmi di halaman kasir resmi (/kasir), kompatibel dengan seluruh aplikasi perbankan (BCA, Mandiri, BRI, BNI) dan dompet digital (GoPay, OVO, Dana, ShopeePay).',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://bikinkilat.web.id/#breadcrumbs',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: 'https://bikinkilat.web.id',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pratinjau Beta',
            item: 'https://bikinkilat.web.id/beta',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Kasir Resmi & Token',
            item: 'https://bikinkilat.web.id/kasir',
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Catatan Rilis & Pembaruan',
            item: 'https://bikinkilat.web.id/catatan-rilis',
          },
        ],
      },
    ],
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/brand/favicon-192.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredDataGraph),
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
