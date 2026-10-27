import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { INITIAL_GUESTBOOK, GuestbookEntry } from '@/lib/developer-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: dbEntries, error } = await supabaseAdmin
      .from('developer_guestbook')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Database guestbook fetch notice:', error);
      return NextResponse.json({ success: true, entries: [] });
    }

    const mappedDb: GuestbookEntry[] = (dbEntries || []).map((row) => ({
      id: row.id,
      name: row.name || 'Pengunjung',
      role: row.role || 'Sahabat BikinKilat',
      message: row.message || '',
      avatar: row.avatar || '✨',
      createdAt: row.created_at,
      isPinned: Boolean(row.is_pinned),
    }));

    return NextResponse.json(
      { success: true, entries: mappedDb },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: true, entries: [] });
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

    const { data, error } = await supabaseAdmin
      .from('developer_guestbook')
      .insert({
        name: name.trim().slice(0, 60),
        role: (role?.trim() || 'Pengunjung').slice(0, 60),
        message: message.trim(),
        avatar: avatar || '🚀',
        is_pinned: false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      entry: {
        id: data.id,
        name: data.name,
        role: data.role,
        message: data.message,
        avatar: data.avatar,
        createdAt: data.created_at,
        isPinned: data.is_pinned,
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
      .from('developer_guestbook')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Pesan buku tamu berhasil dihapus secara permanen.' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menghapus pesan' },
      { status: 500 }
    );
  }
}
