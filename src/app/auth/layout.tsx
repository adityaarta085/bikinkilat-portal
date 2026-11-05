import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk & Daftar Akun Terpadu',
  description:
    'Masuk atau daftar akun BikinKilat. Nikmati 20 kuota harian untuk pengguna, sinkronisasi cloud terpadu, dan akses ke seluruh 9 layanan otomasi cerdas.',
  keywords: [
    'login bikinkilat',
    'daftar bikinkilat',
    'akun terpadu bikinkilat',
    'kuota harian bikinkilat',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/auth',
  },
  openGraph: {
    title: 'Masuk & Daftar Akun Terpadu | BikinKilat.web.id',
    description:
      'Masuk ke akun BikinKilat. Nikmati 20 alokasi kuota harian dan akses instan ke 9 layanan otomasi dokumen.',
    url: 'https://bikinkilat.web.id/auth',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
