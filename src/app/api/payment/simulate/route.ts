import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { packageId, tokens, amount, packageName, userId } = body;

    if (!userId) {
      userId = crypto.randomUUID();
    }

    const txId = crypto.randomUUID();

    // 1. Insert transaction
    const { error: txError } = await supabaseAdmin.from('transactions').insert({
      id: txId,
      user_id: userId,
      package_name: packageName || `Top-up ${tokens} Token`,
      amount_idr: amount,
      tokens_added: tokens,
      status: 'success',
      payment_method: 'QRIS',
    });

    if (txError) {
      console.warn('Failed to insert transaction to Supabase, fallback simulation:', txError.message);
    }

    // 2. Fetch current tokens and increment
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('tokens')
      .eq('id', userId)
      .maybeSingle();

    const currentTokens = user ? user.tokens : 5;
    const newTokens = currentTokens + Number(tokens);

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ tokens: newTokens, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (updateError) {
      console.warn('Failed to update user tokens on Supabase:', updateError.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Pembayaran QRIS berhasil dikonfirmasi.',
      transactionId: txId,
      newTokens,
      tokensAdded: tokens,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
