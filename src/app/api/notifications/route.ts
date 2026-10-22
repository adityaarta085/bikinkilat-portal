import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: true,
        notifications: [],
        unreadCount: 0,
        pendingPopup: null,
      });
    }

    // 1. Fetch all notifications targeted to this user OR broadcast (user_id IS NULL)
    const { data: notifications, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .or(`user_id.eq.${userId},user_id.is.null`)
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;

    // 2. Fetch read records for this user
    const { data: readRecords, error: readErr } = await supabaseAdmin
      .from('user_notifications_read')
      .select('notification_id, dismissed_popup')
      .eq('user_id', userId);

    if (readErr) console.warn('Warning reading user_notifications_read:', readErr);

    const readMap = new Map<string, boolean>();
    const dismissedPopupMap = new Map<string, boolean>();

    if (readRecords) {
      for (const r of readRecords) {
        readMap.set(r.notification_id, true);
        if (r.dismissed_popup) {
          dismissedPopupMap.set(r.notification_id, true);
        }
      }
    }

    // 3. Transform notifications with is_read status
    const resultList = (notifications || []).map((n) => ({
      ...n,
      is_read: readMap.has(n.id),
      dismissed_popup: dismissedPopupMap.has(n.id),
    }));

    const unreadCount = resultList.filter((n) => !n.is_read).length;

    // 4. Find the first pending popup notification that has NOT been dismissed by this user
    const pendingPopup = resultList.find(
      (n) => n.is_popup === true && !dismissedPopupMap.has(n.id)
    ) || null;

    return NextResponse.json({
      success: true,
      notifications: resultList,
      unreadCount,
      pendingPopup,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal memuat notifikasi' },
      { status: 500 }
    );
  }
}
