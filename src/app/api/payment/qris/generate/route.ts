import { NextRequest, NextResponse } from 'next/server';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://api.bikinkilat.web.id';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${GATEWAY_URL}/api/payment/qris/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        message: error?.message || 'Gagal menghubungi gateway pembayaran',
      },
      { status: 500 }
    );
  }
}
