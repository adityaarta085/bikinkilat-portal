import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catatan Rilis & Pembaruan Sistem Ekosistem',
  description:
    'Riwayat pembaruan sistem BikinKilat: rilis v2.7 slide widescreen 16:9, verifikasi OTP instan, kalkulator token fleksibel, dan optimasi pemrosesan dokumen sub-2 detik.',
  keywords: [
    'catatan rilis bikinkilat',
    'pembaruan bikinkilat',
    'fitur baru bikinkilat',
    'changelog bikinkilat',
    'update sistem bikinkilat',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/catatan-rilis',
  },
  openGraph: {
    title: 'Catatan Rilis & Pembaruan Sistem | BikinKilat.web.id',
    description:
      'Riwayat pembaruan sistem BikinKilat: rilis v2.7 slide widescreen 16:9, verifikasi OTP instan, dan optimasi pemrosesan dokumen sub-2 detik.',
    url: 'https://bikinkilat.web.id/catatan-rilis',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function CatatanRilisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
