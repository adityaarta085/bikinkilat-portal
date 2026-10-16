import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const DEMO_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEMO_USER_ID;

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, tokens, created_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user wallet:', error);
      return NextResponse.json({
        success: false,
        tokens: 5,
        user: { id: userId, email: 'demo@bikinkilat.id', name: 'Pengguna Demo', tokens: 5 }
      });
    }

    if (!user) {
      // Create demo user if absent
      const { data: newUser } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email: 'demo@bikinkilat.id',
          name: 'Pengguna Demo',
          tokens: 5,
        })
        .select()
        .single();

      return NextResponse.json({
        success: true,
        tokens: newUser ? newUser.tokens : 5,
        user: newUser || { id: userId, email: 'demo@bikinkilat.id', name: 'Pengguna Demo', tokens: 5 }
      });
    }

    return NextResponse.json({
      success: true,
      tokens: user.tokens,
      user
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      tokens: 5,
      error: err.message
    });
  }
}
