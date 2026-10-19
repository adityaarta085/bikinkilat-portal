import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: true, transactions: [] });
    }

    const { data: txs, error } = await supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) {
      console.error('Error fetching transactions:', error);
      return NextResponse.json({ success: true, transactions: [] });
    }

    return NextResponse.json({ success: true, transactions: txs || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message, transactions: [] });
  }
}
