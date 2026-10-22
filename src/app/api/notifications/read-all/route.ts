import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId diperlukan' }, { status: 400 });
    }

    // 1. Fetch all applicable notifications for this user
    const { data: notifications, error } = await supabaseAdmin
      .from('notifications')
      .select('id')
      .or(`user_id.eq.${userId},user_id.is.null`);

    if (error) throw error;

    if (notifications && notifications.length > 0) {
      const nowIso = new Date().toISOString();
      const upsertRows = notifications.map((n) => ({
        user_id: userId,
        notification_id: n.id,
        read_at: nowIso,
        dismissed_popup: true,
      }));

      await supabaseAdmin
        .from('user_notifications_read')
        .upsert(upsertRows, { onConflict: 'user_id,notification_id' });
    }

    return NextResponse.json({
      success: true,
      message: 'Semua notifikasi berhasil ditandai dibaca',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menandai semua notifikasi' },
      { status: 500 }
    );
  }
}
