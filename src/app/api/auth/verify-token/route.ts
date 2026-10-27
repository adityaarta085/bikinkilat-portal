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

    // Update waktu penggunaan terakhir
    await supabaseAdmin
      .from('users')
      .update({ api_token_last_used_at: new Date().toISOString() })
      .eq('id', user.id);

    return NextResponse.json(
      {
        success: true,
        valid: true,
        user: {
          id: user.id,
          name: user.name || 'Pengguna BikinKilat',
          email: user.email,
          tokens: user.tokens || 0,
          registeredAt: user.created_at,
        },
        ecosystem: 'BikinKilat Unified Micro-SaaS',
        notice: 'Token ini bersifat pribadi dan terikat ke akun Anda. Dilarang keras diperjualbelikan atau dibagikan ke pihak lain.',
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
