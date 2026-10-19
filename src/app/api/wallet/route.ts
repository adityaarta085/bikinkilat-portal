import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

const DEMO_USER_ID = '11111111-1111-1111-1111-111111111111';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || DEMO_USER_ID;
    const email = searchParams.get('email') || (userId === DEMO_USER_ID ? 'demo@bikinkilat.com' : 'pengguna@bikinkilat.com');
    const name = searchParams.get('name') || (userId === DEMO_USER_ID ? 'Pengguna Demo' : 'Pengguna BikinKilat');

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
      // Create user with 5 free initial tokens if absent
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
    const { userId, email, name, tokens } = body;

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID is required' }, { status: 400 });
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
          email: email || 'pengguna@bikinkilat.com',
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
