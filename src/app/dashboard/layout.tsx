import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Pengguna & Riwayat Dokumen',
  description: 'Kelola saldo token, riwayat generasi slide dan dokumen, serta transaksi akun BikinKilat Anda.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
