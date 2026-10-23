import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Masuk & Daftar Akun Terpadu',
  description:
    'Masuk atau daftar akun BikinKilat. Nikmati bonus 5 token gratis untuk pengguna baru, sinkronisasi cloud terpadu, dan akses ke seluruh 9 layanan otomasi cerdas.',
  keywords: [
    'login bikinkilat',
    'daftar bikinkilat',
    'akun terpadu bikinkilat',
    'bonus token gratis bikinkilat',
  ],
  alternates: {
    canonical: 'https://bikinkilat.web.id/auth',
  },
  openGraph: {
    title: 'Masuk & Daftar Akun Terpadu | BikinKilat.web.id',
    description:
      'Masuk ke akun BikinKilat. Bonus 5 token gratis untuk pengguna baru dan akses instan ke 9 layanan otomasi dokumen.',
    url: 'https://bikinkilat.web.id/auth',
    siteName: 'BikinKilat.web.id',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
