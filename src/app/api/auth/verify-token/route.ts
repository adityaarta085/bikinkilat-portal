import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Token',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(request: Request) {
  return handleVerify(request);
}

export async function POST(request: Request) {
  return handleVerify(request);
}

async function handleVerify(request: Request) {
  try {
    let token: string | null = null;
    const url = new URL(request.url);

    if (request.method === 'GET') {
      token =
        url.searchParams.get('token') ||
        request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
        request.headers.get('x-api-token') ||
        null;
    } else {
      const body = await request.json().catch(() => ({}));
      token =
        body?.token ||
        url.searchParams.get('token') ||
        request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ||
        request.headers.get('x-api-token') ||
        null;
    }

    if (!token || typeof token !== 'string' || !token.trim()) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: 'Token akses tidak disertakan. Masukkan token akses BikinKilat Anda.',
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const cleanToken = token.trim();

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, tokens, created_at, deletion_status')
      .eq('api_access_token', cleanToken)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { success: false, valid: false, error: 'Gagal memverifikasi token ke basis data.' },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    if (!user || user.deletion_status === 'pending') {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error: 'Token tidak valid, telah direset, atau akun tidak aktif. Silakan periksa Dashboard BikinKilat.',
        },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const currentTokens = Number(user.tokens) || 0;
    const shouldDeduct = url.searchParams.get('deduct') !== 'false';

    // Periksa apakah saldo token mencukupi (minimal 1 token)
    if (shouldDeduct && currentTokens < 1) {
      return NextResponse.json(
        {
          success: false,
          valid: false,
          error:
            'Saldo token akun Anda tidak mencukupi (Sisa: 0 Token). Setiap sesi akses memerlukan 1 saldo token. Silakan isi ulang di Kasir Resmi BikinKilat (https://bikinkilat.web.id/kasir).',
          tokens: 0,
          topupUrl: 'https://bikinkilat.web.id/kasir',
        },
        { status: 402, headers: CORS_HEADERS }
      );
    }

    const newBalance = shouldDeduct ? Math.max(0, currentTokens - 1) : currentTokens;

    // Update saldo token dan waktu penggunaan terakhir
    await supabaseAdmin
      .from('users')
      .update({
        tokens: newBalance,
        api_token_last_used_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    return NextResponse.json(
      {
        success: true,
        valid: true,
        tokensDeducted: shouldDeduct ? 1 : 0,
        tokensRemaining: newBalance,
        user: {
          id: user.id,
          name: user.name || 'Pengguna BikinKilat',
          email: user.email,
          tokens: newBalance,
          registeredAt: user.created_at,
        },
        ecosystem: 'BikinKilat Unified Micro-SaaS',
        service: 'Generator Perangkat Ajar (Deep Learning • Docx Ready)',
        notice: shouldDeduct
          ? 'Token terverifikasi. 1 Saldo token telah digunakan untuk sesi ini. Dilarang memperjualbelikan atau membagikan token.'
          : 'Token terverifikasi dan aktif.',
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, valid: false, error: err?.message || 'Server error' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
