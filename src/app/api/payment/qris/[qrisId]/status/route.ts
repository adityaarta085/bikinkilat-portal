import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://api.bikinkilat.web.id';

export async function GET(
  req: NextRequest,
  { params }: { params: { qrisId: string } }
) {
  try {
    const qrisId = params.qrisId;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || '';
    const txId = searchParams.get('txId') || '';

    const upstreamUrl = `${GATEWAY_URL}/api/payment/qris/${qrisId}/status?userId=${encodeURIComponent(userId)}&txId=${encodeURIComponent(txId)}`;

    const response = await fetch(upstreamUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'Gagal mengecek status pembayaran',
      },
      { status: 500 }
    );
  }
}
