import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // 1. Fetch notifications:
    // If valid userId provided, get user-specific OR broadcast (user_id IS NULL)
    // If guest/unauthenticated, get broadcast notifications (user_id IS NULL)
    let query = supabaseAdmin
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);

    const hasValidUser = Boolean(userId && userId !== 'null' && userId !== 'undefined' && userId !== 'guest');

    if (hasValidUser) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`);
    } else {
      query = query.is('user_id', null);
    }

    const { data: notifications, error } = await query;
    if (error) throw error;

    // 2. Fetch read records for this user if authenticated
    const readMap = new Map<string, boolean>();
    const dismissedPopupMap = new Map<string, boolean>();

    if (hasValidUser) {
      const { data: readRecords, error: readErr } = await supabaseAdmin
        .from('user_notifications_read')
        .select('notification_id, dismissed_popup')
        .eq('user_id', userId);

      if (readErr) console.warn('Warning reading user_notifications_read:', readErr);

      if (readRecords) {
        for (const r of readRecords) {
          readMap.set(r.notification_id, true);
          if (r.dismissed_popup) {
            dismissedPopupMap.set(r.notification_id, true);
          }
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

    // 4. Find the first pending popup notification that has NOT been dismissed
    const pendingPopup = resultList.find(
      (n) => n.is_popup === true && !dismissedPopupMap.has(n.id)
    ) || null;

    return NextResponse.json(
      {
        success: true,
        notifications: resultList,
        unreadCount,
        pendingPopup,
        _timestamp: Date.now(),
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal memuat notifikasi' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    );
  }
}
