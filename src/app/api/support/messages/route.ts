import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// POST: Add a new message to an existing ticket from user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ticket_id, message, sender_name = 'Pengguna' } = body;

    if (!ticket_id || !message?.trim()) {
      return NextResponse.json(
        { error: 'Ticket ID dan pesan wajib diisi.' },
        { status: 400 }
      );
    }

    // 1. Verify ticket exists
    const { data: ticket, error: ticketErr } = await supabaseAdmin
      .from('support_tickets')
      .select('id, status')
      .eq('id', ticket_id)
      .single();

    if (ticketErr || !ticket) {
      return NextResponse.json({ error: 'Tiket tidak ditemukan.' }, { status: 404 });
    }

    // 2. Insert message
    const { data: newMsg, error: msgErr } = await supabaseAdmin
      .from('support_ticket_messages')
      .insert({
        id: crypto.randomUUID(),
        ticket_id,
        sender_type: 'user',
        sender_name: sender_name.trim(),
        message: message.trim(),
      })
      .select()
      .single();

    if (msgErr) throw msgErr;

    // 3. Update ticket status to open (if it was resolved) & updated_at
    await supabaseAdmin
      .from('support_tickets')
      .update({
        status: ticket.status === 'resolved' || ticket.status === 'closed' ? 'open' : ticket.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', ticket_id);

    return NextResponse.json({
      success: true,
      message: newMsg,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengirim pesan.' },
      { status: 500 }
    );
  }
}
