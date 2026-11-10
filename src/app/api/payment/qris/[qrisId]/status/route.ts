import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'error',
      message: 'Transaksi dan pembayaran dinonaktifkan. Seluruh layanan BikinKilat kini 100% bebas biaya layanan (Rp 0) dengan alokasi 20 kuota dokumen gratis harian.',
    },
    { status: 410 }
  );
}
