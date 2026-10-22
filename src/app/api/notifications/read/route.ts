import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, notificationId, dismissPopup = true } = body;

    if (!userId || !notificationId) {
      return NextResponse.json(
        { error: 'userId dan notificationId diperlukan' },
        { status: 400 }
      );
    }

    // Upsert into user_notifications_read
    const { error } = await supabaseAdmin
      .from('user_notifications_read')
      .upsert(
        {
          user_id: userId,
          notification_id: notificationId,
          read_at: new Date().toISOString(),
          dismissed_popup: Boolean(dismissPopup),
        },
        { onConflict: 'user_id,notification_id' }
      );

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: 'Notifikasi berhasil ditandai dibaca',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menandai notifikasi' },
      { status: 500 }
    );
  }
}
