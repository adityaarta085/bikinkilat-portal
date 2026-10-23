import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { INITIAL_GALLERY, GalleryItem } from '@/lib/developer-data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { data: dbItems, error } = await supabaseAdmin
      .from('developer_gallery')
      .select('*')
      .order('is_pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, fallback to initial gallery:', error);
      return NextResponse.json({ success: true, items: INITIAL_GALLERY });
    }

    const mappedDbItems: GalleryItem[] = (dbItems || []).map((row) => ({
      id: row.id,
      title: row.title || 'Dokumentasi Kegiatan',
      description: row.description || '',
      category: (row.category as any) || 'Aktivitas',
      imageUrl: row.image_url || 'https://oonozobspxhvztoikakt.supabase.co/storage/v1/object/public/developer-assets/aditya-arta.jpg',
      date: row.date || new Date(row.created_at).getFullYear().toString(),
      isPinned: Boolean(row.is_pinned),
    }));

    return NextResponse.json(
      { success: true, items: mappedDbItems.length > 0 ? mappedDbItems : INITIAL_GALLERY },
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
    const { title, description, category, imageUrl, isPinned, date = '2026' } = body;

    if (!title?.trim() || !imageUrl?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Judul dan URL foto wajib diisi.' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('developer_gallery')
      .insert({
        title: title.trim(),
        description: description?.trim() || '',
        category: category || 'Aktivitas',
        image_url: imageUrl.trim(),
        date: date.toString(),
        is_pinned: Boolean(isPinned),
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      item: {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        imageUrl: data.image_url,
        date: data.date,
        isPinned: data.is_pinned,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Gagal menambahkan foto ke galeri' },
      { status: 500 }
    );
  }
}
