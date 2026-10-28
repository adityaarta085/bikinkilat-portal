import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const includeAll = searchParams.get('all') === 'true';

    let query = supabaseAdmin
      .from('external_services')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (!includeAll) {
      query = query.in('status', ['active', 'maintenance']);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching external services:', error);
      return NextResponse.json({ success: false, items: [] }, { status: 500 });
    }

    return NextResponse.json({ success: true, items: data || [] });
  } catch (err: any) {
    console.error('Exception fetching external services:', err);
    return NextResponse.json({ success: false, items: [] }, { status: 500 });
  }
}
