import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const DEMO_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEMO_USER_ID;

    const { data: txs, error } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching transactions:', error);
      return NextResponse.json({ success: true, transactions: [] });
    }

    return NextResponse.json({ success: true, transactions: txs || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, transactions: [] });
  }
}
