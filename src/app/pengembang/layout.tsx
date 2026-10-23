import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aditya Arta Putra - Pengembang Resmi BikinKilat.web.id | Siswa 11 TJKT A SMK Muhammadiyah Bandongan',
  description:
    'Profil dan portofolio resmi Aditya Arta Putra, Founder & Solo Engineer ekosistem BikinKilat.web.id, Project Leader Portal Desa Ngawonggo, dan siswa 11 TJKT A SMK Muhammadiyah Bandongan. "Biarkan dunia melihat karyaku."',
  keywords: [
    'Aditya Arta Putra',
    'Pengembang BikinKilat',
    'Developer BikinKilat',
    'SMK Muhammadiyah Bandongan',
    '11 TJKT A',
    'Web Developer Magelang',
    'Desa Ngawonggo',
    'Solo Engineer',
    'Portofolio Aditya Arta Putra',
  ],
  authors: [{ name: 'Aditya Arta Putra', url: 'https://bikinkilat.web.id/pengembang' }],
  creator: 'Aditya Arta Putra',
  publisher: 'BikinKilat.web.id',
  metadataBase: new URL('https://bikinkilat.web.id'),
  openGraph: {
    title: 'Aditya Arta Putra - Pengembang Resmi BikinKilat.web.id',
    description:
      'Founder & Solo Engineer BikinKilat.web.id | Siswa 11 TJKT A SMK Muhammadiyah Bandongan. "Biarkan dunia melihat karyaku."',
    url: 'https://bikinkilat.web.id/pengembang',
    siteName: 'BikinKilat.web.id',
    images: [
      {
        url: '/developer/aditya-arta.jpg',
        width: 768,
        height: 1024,
        alt: 'Aditya Arta Putra - Pengembang BikinKilat.web.id',
      },
    ],
    locale: 'id_ID',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Arta Putra - Pengembang Resmi BikinKilat.web.id',
    description:
      'Founder & Solo Engineer BikinKilat.web.id | Siswa 11 TJKT A SMK Muhammadiyah Bandongan.',
    images: ['/developer/aditya-arta.jpg'],
  },
  alternates: {
    canonical: 'https://bikinkilat.web.id/pengembang',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  dateCreated: '2026-10-23T00:00:00Z',
  mainEntity: {
    '@type': 'Person',
    name: 'Aditya Arta Putra',
    alternateName: ['Aditya', 'adityaarta085'],
    description:
      'Siswa kelas 11 TJKT A di SMK Muhammadiyah Bandongan yang berdedikasi dalam dunia Web Development, rekayasa perangkat lunak modern, dan arsitektur cloud. Founder & Solo Engineer BikinKilat.web.id serta Project Leader Portal Resmi Desa Ngawonggo.',
    image: 'https://bikinkilat.web.id/developer/aditya-arta.jpg',
    jobTitle: 'Founder & Solo Engineer / Junior Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'BikinKilat.web.id',
      url: 'https://bikinkilat.web.id',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'MI AL HUDA MADURETNO',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'MTSN 2 MAGELANG',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'SMK MUHAMMADIYAH BANDONGAN',
      },
    ],
    sameAs: [
      'https://github.com/adityaarta085',
      'https://adityaputra-portofolio.vercel.app',
      'https://ngawonggo.web.id/credits',
    ],
  },
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
