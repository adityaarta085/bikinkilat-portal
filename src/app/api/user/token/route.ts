import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

function generateSecureToken(): string {
  return 'bk_live_' + crypto.randomBytes(16).toString('hex');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const email = searchParams.get('email');

    if (!userId && !email) {
      return NextResponse.json({ success: false, error: 'User ID atau Email diperlukan' }, { status: 400 });
    }

    let query = supabaseAdmin
      .from('users')
      .select('id, email, name, tokens, api_access_token, api_token_created_at, api_token_last_used_at');

    if (userId) {
      query = query.eq('id', userId);
    } else if (email) {
      query = query.eq('email', email.trim().toLowerCase());
    }

    const { data: user, error } = await query.maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, error: 'Gagal mengambil data token' }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: 'Pengguna tidak ditemukan' }, { status: 404 });
    }

    // Jika user belum memiliki token, buatkan token awal secara otomatis
    let activeToken = user.api_access_token;
    let createdAt = user.api_token_created_at;

    if (!activeToken) {
      activeToken = generateSecureToken();
      createdAt = new Date().toISOString();

      await supabaseAdmin
        .from('users')
        .update({
          api_access_token: activeToken,
          api_token_created_at: createdAt,
        })
        .eq('id', user.id);
    }

    return NextResponse.json({
      success: true,
      token: activeToken,
      createdAt,
      lastUsedAt: user.api_token_last_used_at || null,
      tokens: user.tokens || 0,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, userId, email } = body;

    if (!userId && !email) {
      return NextResponse.json({ success: false, error: 'User ID atau Email diperlukan' }, { status: 400 });
    }

    if (action !== 'reset') {
      return NextResponse.json({ success: false, error: 'Action tidak dikenal' }, { status: 400 });
    }

    const newToken = generateSecureToken();
    const nowIso = new Date().toISOString();

    let updateQuery = supabaseAdmin
      .from('users')
      .update({
        api_access_token: newToken,
        api_token_created_at: nowIso,
        api_token_last_used_at: null,
      });

    if (userId) {
      updateQuery = updateQuery.eq('id', userId);
    } else if (email) {
      updateQuery = updateQuery.eq('email', email.trim().toLowerCase());
    }

    const { error: updateErr } = await updateQuery;

    if (updateErr) {
      return NextResponse.json({ success: false, error: 'Gagal meriset token akses' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      token: newToken,
      createdAt: nowIso,
      message: 'Token akses berhasil direset. Token lama tidak dapat digunakan lagi.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 });
  }
}
