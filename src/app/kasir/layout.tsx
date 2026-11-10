import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dialihkan ke Panduan Kapasitas & Kuota Layanan Publik',
  robots: {
    index: false,
    follow: false,
  },
};

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
