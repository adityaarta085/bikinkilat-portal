import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    // Pengguna belum login: saldo selalu 0 token
    if (!userId || userId === 'null' || userId === 'undefined' || userId === 'guest') {
      return NextResponse.json({
        success: true,
        tokens: 0,
        isLoggedIn: false,
        message: 'Pengguna belum masuk. Masuk akun untuk mendapatkan 5 token gratis.',
      });
    }

    const email = searchParams.get('email') || `user-${userId.slice(0, 8)}@bikinkilat.web.id`;
    const name = searchParams.get('name') || 'Pengguna BikinKilat';

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, tokens, created_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user wallet:', error);
      return NextResponse.json({
        success: false,
        tokens: 0,
        isLoggedIn: true,
        user: { id: userId, email, name, tokens: 0 },
      });
    }

    // Jika pengguna baru login pertama kali: berikan 5 token selamat datang
    if (!user) {
      const { data: newUser, error: insertErr } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email,
          name,
          tokens: 5, // 5 token gratis khusus pengguna baru yang telah login
        })
        .select()
        .single();

      if (insertErr) {
        console.warn('Gagal menyimpan pengguna baru:', insertErr);
        return NextResponse.json({
          success: true,
          tokens: 5,
          isLoggedIn: true,
          user: { id: userId, email, name, tokens: 5 },
        });
      }

      return NextResponse.json({
        success: true,
        tokens: newUser ? newUser.tokens : 5,
        isLoggedIn: true,
        user: newUser,
      });
    }

    return NextResponse.json({
      success: true,
      tokens: user.tokens,
      isLoggedIn: true,
      user,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      tokens: 0,
      error: err.message,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, email, name, tokens } = body;

    // Pembelian atau perubahan saldo WAJIB memiliki userId yang valid (sudah login)
    if (!userId || userId === 'null' || userId === 'undefined' || userId === 'guest') {
      return NextResponse.json(
        { success: false, error: 'Akses ditolak: Anda wajib masuk akun terlebih dahulu.' },
        { status: 401 }
      );
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, tokens')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!user) {
      const { data: created, error: createErr } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email: email || `user-${userId.slice(0, 8)}@bikinkilat.web.id`,
          name: name || 'Pengguna BikinKilat',
          tokens: typeof tokens === 'number' ? tokens : 5,
        })
        .select()
        .single();

      if (createErr) {
        return NextResponse.json({ success: false, error: createErr.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, tokens: created.tokens, user: created });
    }

    const updatePayload: Record<string, any> = {};
    if (typeof tokens === 'number') updatePayload.tokens = tokens;
    if (email) updatePayload.email = email;
    if (name) updatePayload.name = name;

    await supabaseAdmin.from('users').update(updatePayload).eq('id', userId);

    return NextResponse.json({
      success: true,
      tokens: typeof tokens === 'number' ? tokens : user.tokens,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
