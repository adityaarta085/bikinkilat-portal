import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const QRISPY_API_KEY = process.env.QRISPY_API_KEY || 'cki_7QZM25O5O0KeI4S4tpSGjymeBodBNnQNpqF3iBWWXaynCscQ';

// Helper to cancel upstream QRIS on Qrispy if ID is known
async function tryCancelQrispy(qrisId: string) {
  try {
    if (!qrisId) return;
    await fetch(`https://api.qrispy.id/api/payment/qris/${qrisId}/cancel`, {
      method: 'POST',
      headers: {
        'X-API-TOKEN': QRISPY_API_KEY,
        Accept: 'application/json',
      },
    });
  } catch (e) {
    console.warn('Gagal membatalkan QRIS di gateway upstream:', e);
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    if (!userId) {
      return NextResponse.json({ success: true, transactions: [] });
    }

    let query = supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    query = query.limit(30);

    const { data: txs, error } = await query;

    if (error) {
      console.error('Error fetching transactions:', error);
      return NextResponse.json({ success: true, transactions: [] });
    }

    // Enrich transactions with parsed QRIS data and clean package names
    const enriched = (txs || []).map((tx) => {
      const qrisMatch = tx.package_name?.match(/\[QRIS:([^\]]+)\]/);
      const qrisId = qrisMatch ? qrisMatch[1] : null;
      const cleanPackageName = tx.package_name
        ? tx.package_name.replace(/\s*\[QRIS:[^\]]+\]/, '').trim()
        : 'Top-Up Kuota';

      return {
        ...tx,
        package_name: cleanPackageName,
        raw_package_name: tx.package_name,
        qris_id: qrisId,
        qris_image_url: qrisId ? `https://api.qrispy.id/api/public/qris/${qrisId}/image` : null,
        checkout_url: qrisId ? `https://qrispy.id/payment/${qrisId}` : null,
      };
    });

    return NextResponse.json({ success: true, transactions: enriched });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, transactions: [] });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { transactionId, userId, action } = body;

    if (!transactionId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Transaction ID dan User ID wajib disertakan.' },
        { status: 400 }
      );
    }

    // Verify transaction exists and belongs to user
    const { data: existing, error: findErr } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('user_id', userId)
      .single();

    if (findErr || !existing) {
      return NextResponse.json(
        { success: false, error: 'Transaksi tidak ditemukan atau otorisasi tidak valid.' },
        { status: 404 }
      );
    }

    // Extract QRIS ID if present
    const qrisMatch = existing.package_name?.match(/\[QRIS:([^\]]+)\]/);
    const qrisId = qrisMatch ? qrisMatch[1] : null;

    if (action === 'delete') {
      // Permanently remove transaction
      const { error: delErr } = await supabaseAdmin
        .from('transactions')
        .delete()
        .eq('id', transactionId)
        .eq('user_id', userId);

      if (delErr) {
        return NextResponse.json({ success: false, error: delErr.message }, { status: 500 });
      }

      if (qrisId && existing.status === 'pending') {
        await tryCancelQrispy(qrisId);
      }

      return NextResponse.json({
        success: true,
        message: 'Transaksi berhasil dihapus dari riwayat.',
      });
    }

    // Default action: Cancel transaction (update status to 'cancelled')
    const { error: updErr } = await supabaseAdmin
      .from('transactions')
      .update({ status: 'cancelled' })
      .eq('id', transactionId)
      .eq('user_id', userId);

    if (updErr) {
      return NextResponse.json({ success: false, error: updErr.message }, { status: 500 });
    }

    if (qrisId) {
      await tryCancelQrispy(qrisId);
    }

    return NextResponse.json({
      success: true,
      message: 'Transaksi QRIS berhasil dibatalkan.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Gagal memproses perubahan transaksi.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('id');
    const userId = searchParams.get('userId');

    if (!transactionId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Parameter id dan userId wajib disertakan.' },
        { status: 400 }
      );
    }

    // Verify transaction exists and belongs to user
    const { data: existing, error: findErr } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('user_id', userId)
      .single();

    if (findErr || !existing) {
      return NextResponse.json(
        { success: false, error: 'Transaksi tidak ditemukan atau otorisasi tidak valid.' },
        { status: 404 }
      );
    }

    // Extract QRIS ID if present
    const qrisMatch = existing.package_name?.match(/\[QRIS:([^\]]+)\]/);
    const qrisId = qrisMatch ? qrisMatch[1] : null;

    const { error: delErr } = await supabaseAdmin
      .from('transactions')
      .delete()
      .eq('id', transactionId)
      .eq('user_id', userId);

    if (delErr) {
      return NextResponse.json({ success: false, error: delErr.message }, { status: 500 });
    }

    if (qrisId && existing.status === 'pending') {
      await tryCancelQrispy(qrisId);
    }

    return NextResponse.json({
      success: true,
      message: 'Transaksi berhasil dihapus dari riwayat.',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Gagal menghapus transaksi.' }, { status: 500 });
  }
}
