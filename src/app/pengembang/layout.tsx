import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aditya Arta Putra - Profil Resmi, Biografi & Portofolio | Founder BikinKilat.web.id',
  description:
    'Profil resmi, biografi, riwayat pendidikan, dan portofolio Aditya Arta Putra, Founder & Solo Engineer ekosistem BikinKilat.web.id, Project Leader Portal Desa Ngawonggo, dan siswa kelas 11 TJKT A di SMK Muhammadiyah Bandongan. "Biarkan dunia melihat karyaku."',
  keywords: [
    'Aditya Arta Putra',
    'Aditya Arta Putra Magelang',
    'Aditya Arta Putra SMK Muhammadiyah Bandongan',
    'Aditya Arta Putra BikinKilat',
    'Aditya Arta Putra Developer',
    'Aditya Arta Putra Portofolio',
    'Aditya Arta Putra 11 TJKT A',
    'adityaarta085',
    'Pengembang BikinKilat',
    'Developer BikinKilat',
    'Web Developer Muda Magelang',
    'Project Leader Portal Desa Ngawonggo',
  ],
  authors: [{ name: 'Aditya Arta Putra', url: 'https://bikinkilat.web.id/pengembang' }],
  creator: 'Aditya Arta Putra',
  publisher: 'BikinKilat.web.id',
  metadataBase: new URL('https://bikinkilat.web.id'),
  alternates: {
    canonical: 'https://bikinkilat.web.id/pengembang',
    languages: {
      'id-ID': 'https://bikinkilat.web.id/pengembang',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Aditya Arta Putra - Profil Resmi, Biografi & Portofolio Lengkap',
    description:
      'Founder & Solo Engineer BikinKilat.web.id | Siswa 11 TJKT A SMK Muhammadiyah Bandongan | Project Leader Portal Desa Ngawonggo. "Biarkan dunia melihat karyaku."',
    url: 'https://bikinkilat.web.id/pengembang',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'profile',
    images: [
      {
        url: '/developer/aditya-arta.jpg',
        width: 768,
        height: 1024,
        alt: 'Aditya Arta Putra - Founder & Solo Engineer BikinKilat.web.id',
      },
      {
        url: '/developer/about-sec-image.jpeg',
        width: 682,
        height: 1024,
        alt: 'Aditya Arta Putra berseragam almamater resmi SMK Muhammadiyah Bandongan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Arta Putra - Profil Resmi & Portofolio',
    description:
      'Founder & Solo Engineer BikinKilat.web.id | Siswa 11 TJKT A SMK Muhammadiyah Bandongan. "Biarkan dunia melihat karyaku."',
    images: ['/developer/aditya-arta.jpg'],
    creator: '@bikinkilat',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  other: {
    'profile:first_name': 'Aditya',
    'profile:last_name': 'Arta Putra',
    'profile:username': 'adityaarta085',
    'profile:gender': 'male',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://bikinkilat.web.id/pengembang#person',
      name: 'Aditya Arta Putra',
      givenName: 'Aditya',
      additionalName: 'Arta',
      familyName: 'Putra',
      alternateName: [
        'Aditya',
        'Adit',
        'adityaarta085',
        'Aditya Arta Putra Magelang',
        'Developer BikinKilat',
      ],
      gender: 'Male',
      nationality: {
        '@type': 'Country',
        name: 'Indonesia',
      },
      homeLocation: {
        '@type': 'Place',
        name: 'Magelang, Jawa Tengah, Indonesia',
      },
      jobTitle: 'Founder & Solo Engineer / Lead Web Developer',
      description:
        'Aditya Arta Putra adalah pendiri dan insinyur mandiri (Solo Engineer) ekosistem BikinKilat.web.id, Project Leader pembangunan Website Portal Resmi Desa Ngawonggo (ngawonggo.web.id), dan siswa berprestasi kelas 11 TJKT A di SMK Muhammadiyah Bandongan.',
      image: [
        'https://bikinkilat.web.id/developer/aditya-arta.jpg',
        'https://bikinkilat.web.id/developer/about-sec-image.jpeg',
        'https://bikinkilat.web.id/developer/aditya-smk-almamater.jpg',
      ],
      url: 'https://bikinkilat.web.id/pengembang',
      mainEntityOfPage: 'https://bikinkilat.web.id/pengembang',
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://bikinkilat.web.id/#organization',
        name: 'BikinKilat.web.id',
        url: 'https://bikinkilat.web.id',
      },
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'SMK Muhammadiyah Bandongan',
          description: 'Jurusan Teknik Jaringan Komputer & Telekomunikasi (11 TJKT A)',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bandongan',
            addressRegion: 'Magelang',
            addressCountry: 'ID',
          },
        },
        {
          '@type': 'EducationalOrganization',
          name: 'MTsN 2 Magelang',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Magelang',
            addressRegion: 'Jawa Tengah',
            addressCountry: 'ID',
          },
        },
        {
          '@type': 'EducationalOrganization',
          name: 'MI AL HUDA MADURETNO',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Maduretno',
            addressRegion: 'Magelang',
            addressCountry: 'ID',
          },
        },
      ],
      knowsAbout: [
        'Aditya Arta Putra',
        'Web Development',
        'Software Engineering',
        'Full-Stack Development',
        'Next.js & React',
        'TypeScript',
        'Tailwind CSS',
        'Teknik Jaringan Komputer & Telekomunikasi (TJKT)',
        'Arsitektur Sistem Cloud Terpadu',
        'Otomasi Dokumen Digital',
      ],
      sameAs: [
        'https://github.com/adityaarta085',
        'https://adityaputra-portofolio.vercel.app',
        'https://ngawonggo.web.id/credits',
        'https://pengembang.bikinkilat.web.id',
        'https://developer.bikinkilat.web.id',
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://bikinkilat.web.id/pengembang#webpage',
      url: 'https://bikinkilat.web.id/pengembang',
      name: 'Aditya Arta Putra - Profil Resmi, Biografi & Portofolio',
      description:
        'Halaman profil dan biografi resmi Aditya Arta Putra, Founder & Solo Engineer BikinKilat.web.id dan siswa 11 TJKT A SMK Muhammadiyah Bandongan.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda BikinKilat',
            item: 'https://bikinkilat.web.id',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pengembang',
            item: 'https://bikinkilat.web.id/pengembang',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Aditya Arta Putra',
            item: 'https://bikinkilat.web.id/pengembang',
          },
        ],
      },
      about: {
        '@id': 'https://bikinkilat.web.id/pengembang#person',
      },
      mainEntity: {
        '@id': 'https://bikinkilat.web.id/pengembang#person',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://bikinkilat.web.id/developer/aditya-arta.jpg',
      },
      inLanguage: 'id-ID',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://bikinkilat.web.id/pengembang#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Siapa Aditya Arta Putra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aditya Arta Putra adalah Founder dan Solo Engineer dari ekosistem BikinKilat.web.id, serta Project Leader Website Resmi Portal Desa Ngawonggo. Ia merupakan siswa berprestasi kelas 11 TJKT A (Teknik Jaringan Komputer & Telekomunikasi) di SMK Muhammadiyah Bandongan, Kabupaten Magelang, Jawa Tengah.',
          },
        },
        {
          '@type': 'Question',
          name: 'Apa saja proyek dan karya teknologi yang dikembangkan oleh Aditya Arta Putra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Karya utama Aditya Arta Putra meliputi: 1) Ekosistem BikinKilat.web.id dengan 9 layanan otomasi dokumen kilat, 2) Website Portal Resmi Desa Ngawonggo (ngawonggo.web.id) hasil kemitraan Pemdes Ngawonggo dan SMK Muhammadiyah Bandongan, 3) Sistem Web Perizinan Online (E-Izin open source), 4) Linksku Software Suite (SSWEB, IQC Generator, Media Digital, AI Assistant), dan 5) Buku Tamu Digital SMK Muhammadiyah Bandongan.',
          },
        },
        {
          '@type': 'Question',
          name: 'Di mana riwayat pendidikan Aditya Arta Putra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Riwayat pendidikan formal Aditya Arta Putra adalah: MI Al Huda Maduretno (Lulus), MTsN 2 Magelang (Lulus), dan saat ini aktif menempuh pendidikan di SMK Muhammadiyah Bandongan kelas 11 jurusan Teknik Jaringan Komputer & Telekomunikasi (TJKT A).',
          },
        },
        {
          '@type': 'Question',
          name: 'Apa motto hidup Aditya Arta Putra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Motto hidup resmi Aditya Arta Putra adalah "Biarkan dunia melihat karyaku.", yang mencerminkan semangat pembuktian bahwa usia muda dan siswa kejuruan mampu menciptakan rekayasa sistem digital yang berdampak nyata.',
          },
        },
        {
          '@type': 'Question',
          name: 'Bagaimana cara menghubungi resmi Aditya Arta Putra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aditya Arta Putra dapat dihubungi melalui WhatsApp resmi di nomor +62 851-3643-6577, melalui email di adityaarta085@gmail.com, atau melalui akun GitHub resminya di https://github.com/adityaarta085.',
          },
        },
      ],
    },
  ],
};

export default function PengembangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
