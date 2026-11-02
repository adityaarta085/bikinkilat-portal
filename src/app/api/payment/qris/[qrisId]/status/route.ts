import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = 'https://api.bikinkilat.web.id';

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

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Format status pembayaran dari gateway tidak valid',
        },
        { status: 502 }
      );
    }

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
