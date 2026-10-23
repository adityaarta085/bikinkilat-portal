import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { INITIAL_GALLERY, GalleryItem } from '@/lib/developer-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: dbItems, error } = await supabaseAdmin
      .from('notifications')
      .select('*')
      .eq('type', 'developer_gallery')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, fallback to initial gallery:', error);
      return NextResponse.json({ success: true, items: INITIAL_GALLERY });
    }

    const mappedDbItems: GalleryItem[] = (dbItems || []).map((row) => ({
      id: row.id,
      title: row.title || 'Dokumentasi Kegiatan',
      description: row.message || '',
      category: (row.created_by as any) || 'Aktivitas',
      imageUrl: row.action_url || '/developer/aditya-arta.jpg',
      date: new Date(row.created_at).getFullYear().toString(),
      isPinned: Boolean(row.is_popup),
    }));

    // Merge custom db items with initial curated gallery (avoid duplicate ids)
    const existingIds = new Set(mappedDbItems.map((i) => i.id));
    const merged = [
      ...mappedDbItems,
      ...INITIAL_GALLERY.filter((i) => !existingIds.has(i.id)),
    ];

    return NextResponse.json(
      { success: true, items: merged },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: true, items: INITIAL_GALLERY });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, category, imageUrl, isPinned } = body;

    if (!title?.trim() || !imageUrl?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Judul dan URL foto wajib diisi.' },
        { status: 400 }
      );
    }

    const newId = crypto.randomUUID();
    const { data, error } = await supabaseAdmin
      .from('notifications')
      .insert({
        id: newId,
        title: title.trim(),
        message: description?.trim() || '',
        action_url: imageUrl.trim(),
        created_by: category || 'Aktivitas',
        type: 'developer_gallery',
        is_popup: Boolean(isPinned),
        tokens_granted: 0,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: data.id,
        title: data.title,
        description: data.message,
        category: data.created_by,
        imageUrl: data.action_url,
        date: new Date(data.created_at).getFullYear().toString(),
        isPinned: data.is_popup,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menambahkan foto ke galeri' },
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
        { success: false, error: 'ID foto wajib disertakan.' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('notifications')
      .delete()
      .eq('id', id)
      .eq('type', 'developer_gallery');

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Foto berhasil dihapus.' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menghapus foto' },
      { status: 500 }
    );
  }
}
