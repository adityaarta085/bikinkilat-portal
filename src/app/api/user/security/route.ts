import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID diperlukan' }, { status: 400 });
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, two_factor_enabled')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error reading user 2fa status:', error);
      return NextResponse.json({ success: false, message: 'Gagal membaca status 2FA' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      twoFactorEnabled: !!user?.two_factor_enabled,
      email: user?.email || '',
    });
  } catch (err: any) {
    console.error('2FA GET Exception:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, userId, userEmail, secret, token, reason } = body;

    if (!userId) {
      return NextResponse.json({ success: false, message: 'User ID diperlukan' }, { status: 400 });
    }

    // 1. Setup / Inisialisasi Kunci Rahasia 2FA & QR Code
    if (action === 'setup_2fa') {
      const email = userEmail || 'pengguna@bikinkilat.web.id';
      // Generate Secret RFC 6238
      const totpSecret = new OTPAuth.Secret({ size: 20 });
      const base32Secret = totpSecret.base32;

      const totp = new OTPAuth.TOTP({
        issuer: 'BikinKilat',
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: totpSecret,
      });

      const uri = totp.toString();
      const qrDataUrl = await QRCode.toDataURL(uri, {
        errorCorrectionLevel: 'M',
        margin: 2,
        width: 256,
        color: {
          dark: '#0F172A',
          light: '#FFFFFF',
        },
      });

      return NextResponse.json({
        success: true,
        secret: base32Secret,
        qrDataUrl,
      });
    }

    // 2. Verifikasi 6-Digit & Aktifkan 2FA
    if (action === 'verify_and_enable_2fa') {
      if (!secret || !token) {
        return NextResponse.json({ success: false, message: 'Secret dan token 6 digit wajib diisi' }, { status: 400 });
      }

      const totp = new OTPAuth.TOTP({
        issuer: 'BikinKilat',
        label: userEmail || 'pengguna@bikinkilat.web.id',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret.trim().replace(/\s+/g, '')),
      });

      const delta = totp.validate({
        token: token.trim(),
        window: 1, // Toleransi drift waktu 30 detik
      });

      if (delta === null) {
        return NextResponse.json({
          success: false,
          message: 'Kode 6 digit salah atau telah kedaluwarsa. Pastikan jam ponsel Anda akurat.',
        }, { status: 400 });
      }

      // Simpan status aktif & secret di database
      const { error: updateErr } = await supabaseAdmin
        .from('users')
        .update({
          two_factor_secret: secret.trim().replace(/\s+/g, ''),
          two_factor_enabled: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (updateErr) {
        console.error('Error saving 2fa to database:', updateErr);
        return NextResponse.json({ success: false, message: 'Gagal mengaktifkan 2FA di database' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Verifikasi Dua Langkah (2FA) berhasil diaktifkan!',
      });
    }

    // 3. Nonaktifkan 2FA (Memerlukan konfirmasi 6-digit)
    if (action === 'disable_2fa') {
      const { data: user, error: fetchErr } = await supabaseAdmin
        .from('users')
        .select('two_factor_secret')
        .eq('id', userId)
        .maybeSingle();

      if (fetchErr || !user?.two_factor_secret) {
        return NextResponse.json({ success: false, message: 'Kunci 2FA tidak ditemukan' }, { status: 400 });
      }

      if (!token) {
        return NextResponse.json({ success: false, message: 'Masukkan kode 6 digit untuk konfirmasi penonaktifan' }, { status: 400 });
      }

      const totp = new OTPAuth.TOTP({
        issuer: 'BikinKilat',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(user.two_factor_secret),
      });

      const delta = totp.validate({
        token: token.trim(),
        window: 1,
      });

      if (delta === null) {
        return NextResponse.json({
          success: false,
          message: 'Kode 6 digit salah. Gagal menonaktifkan 2FA.',
        }, { status: 400 });
      }

      const { error: disableErr } = await supabaseAdmin
        .from('users')
        .update({
          two_factor_enabled: false,
          two_factor_secret: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (disableErr) {
        return NextResponse.json({ success: false, message: 'Gagal memperbarui status 2FA' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        message: 'Verifikasi Dua Langkah (2FA) telah dinonaktifkan.',
      });
    }

    // 4. Permintaan Hapus Akun (Masuk ke antrean admin <24 jam)
    if (action === 'request_deletion') {
      const { data: userRecord } = await supabaseAdmin
        .from('users')
        .select('name, email, tokens')
        .eq('id', userId)
        .maybeSingle();

      const userEmailFinal = userEmail || userRecord?.email || '';
      const userNameFinal = userRecord?.name || 'Pengguna';
      const userTokens = userRecord?.tokens || 0;

      // Masukkan ke tabel antrean penghapusan admin
      const { error: reqErr } = await supabaseAdmin
        .from('account_deletion_requests')
        .insert({
          user_id: userId,
          user_email: userEmailFinal,
          user_name: userNameFinal,
          tokens_remaining: userTokens,
          reason: reason || 'Permintaan penghapusan mandiri oleh pengguna melalui Dashboard',
          status: 'pending',
          requested_at: new Date().toISOString(),
        });

      if (reqErr) {
        console.warn('Gagal mencatat deletion request:', reqErr);
      }

      // Tandai profil pengguna
      await supabaseAdmin
        .from('users')
        .update({
          deletion_status: 'pending_deletion',
          deletion_requested_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      // Kembalikan pesan seolah-olah akun telah langsung terhapus
      return NextResponse.json({
        success: true,
        message: 'Akun Anda dan seluruh sesi berhasil dihapus.',
      });
    }

    return NextResponse.json({ success: false, message: 'Action tidak dikenal' }, { status: 400 });
  } catch (err: any) {
    console.error('2FA POST Exception:', err);
    return NextResponse.json({ success: false, message: err?.message || 'Server error' }, { status: 500 });
  }
}
