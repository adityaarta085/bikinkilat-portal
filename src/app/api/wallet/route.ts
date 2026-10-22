import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let userId = searchParams.get('userId');
    
    if (!userId || userId === 'null' || userId === 'undefined') {
      userId = crypto.randomUUID();
    }
    
    const email = searchParams.get('email') || `user-${userId.slice(0, 8)}@bikinkilat.web.id`;
    const name = searchParams.get('name') || 'Pengguna BikinKilat';

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
        user: { id: userId, email, name, tokens: 5 }
      });
    }

    if (!user) {
      // Create user with 5 free initial tokens
      const { data: newUser, error: insertErr } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email,
          name,
          tokens: 5,
        })
        .select()
        .single();

      if (insertErr) {
        console.warn('Could not insert new user to database, returning default:', insertErr);
        return NextResponse.json({
          success: true,
          tokens: 5,
          user: { id: userId, email, name, tokens: 5 }
        });
      }

      return NextResponse.json({
        success: true,
        tokens: newUser ? newUser.tokens : 5,
        user: newUser || { id: userId, email, name, tokens: 5 }
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { userId, email, name, tokens } = body;

    if (!userId) {
      userId = crypto.randomUUID();
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, tokens')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!user) {
      const { data: created, error: createErr } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          email: email || `user-${userId.slice(0, 8)}@bikinkilat.web.id`,
          name: name || 'Pengguna BikinKilat',
          tokens: typeof tokens === 'number' ? tokens : 5,
        })
        .select()
        .single();

      if (createErr) {
        return NextResponse.json({ success: false, error: createErr.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, user: created, tokens: created.tokens });
    }

    // If already exists, optionally update name/email
    if (name || email) {
      const updatePayload: Record<string, any> = { updated_at: new Date().toISOString() };
      if (name) updatePayload.name = name;
      if (email) updatePayload.email = email;

      await supabaseAdmin.from('users').update(updatePayload).eq('id', userId);
    }

    return NextResponse.json({ success: true, user, tokens: user.tokens });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
