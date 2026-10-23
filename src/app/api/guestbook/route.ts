import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { INITIAL_GUESTBOOK, GuestbookEntry } from '@/lib/developer-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: dbEntries, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('type', 'developer_guestbook')
      .order('is_popup', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase guestbook fetch error, fallback to initial:', error);
      return NextResponse.json({ success: true, entries: INITIAL_GUESTBOOK });
    }

    const mappedDb: GuestbookEntry[] = (dbEntries || []).map((row) => ({
      id: row.id,
      name: row.title || 'Pengunjung',
      role: row.created_by || 'Sahabat BikinKilat',
      message: row.message || '',
      avatar: row.action_url || '✨',
      createdAt: row.created_at,
      isPinned: Boolean(row.is_popup),
    }));

    const existingIds = new Set(mappedDb.map((e) => e.id));
    const merged = [
      ...mappedDb,
      ...INITIAL_GUESTBOOK.filter((e) => !existingIds.has(e.id)),
    ];

    return NextResponse.json(
      { success: true, entries: merged },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: true, entries: INITIAL_GUESTBOOK });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, message, avatar = '🚀' } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nama dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Pesan maksimal 500 karakter.' },
        { status: 400 }
      );
    }

    const newId = crypto.randomUUID();
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        id: newId,
        title: name.trim().slice(0, 60),
        message: message.trim(),
        action_url: avatar || '🚀',
        created_by: (role?.trim() || 'Pengunjung').slice(0, 50),
        type: 'developer_guestbook',
        is_popup: false,
        tokens_granted: 0,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      entry: {
        id: data.id,
        name: data.title,
        role: data.created_by,
        message: data.message,
        avatar: data.action_url,
        createdAt: data.created_at,
        isPinned: false,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal mengirim pesan buku tamu' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID pesan wajib disertakan.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('type', 'developer_guestbook');

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Pesan berhasil dihapus.' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menghapus pesan' },
      { status: 500 }
    );
  }
}
