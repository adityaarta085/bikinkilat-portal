import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function generateTicketNumber(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let randomPart = '';
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BK-${randomPart}`;
}

// POST: Create a new support ticket
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      user_id = null,
      user_name,
      user_email = null,
      user_phone = null,
      category = 'Bantuan Umum',
      subject,
      message,
    } = body;

    if (!user_name?.trim()) {
      return NextResponse.json({ error: 'Nama lengkap wajib diisi.' }, { status: 400 });
    }
    if (!message?.trim()) {
      return NextResponse.json({ error: 'Pesan bantuan wajib diisi.' }, { status: 400 });
    }

    const ticketNumber = generateTicketNumber();
    const ticketId = crypto.randomUUID();

    // 1. Insert ticket
    const { data: ticket, error: ticketErr } = await supabaseAdmin
      .from('support_tickets')
      .insert({
        id: ticketId,
        ticket_number: ticketNumber,
        user_id: user_id || null,
        user_name: user_name.trim(),
        user_email: user_email?.trim() || null,
        user_phone: user_phone?.trim() || null,
        category: category || 'Bantuan Umum',
        subject: subject?.trim() || 'Pertanyaan Layanan',
        status: 'open',
        priority: 'normal',
      })
      .select()
      .single();

    if (ticketErr) throw ticketErr;

    // 2. Insert initial message
    const { data: msg, error: msgErr } = await supabaseAdmin
      .from('support_ticket_messages')
      .insert({
        id: crypto.randomUUID(),
        ticket_id: ticketId,
        sender_type: 'user',
        sender_name: user_name.trim(),
        message: message.trim(),
      })
      .select()
      .single();

    if (msgErr) throw msgErr;

    return NextResponse.json({
      success: true,
      ticket,
      message: msg,
    });
  } catch (err: any) {
    console.error('Error creating support ticket:', err);
    return NextResponse.json(
      { error: err?.message || 'Gagal membuat tiket bantuan.' },
      { status: 500 }
    );
  }
}

// GET: Lookup tickets by ticketNumber or userId
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ticketNumber = searchParams.get('ticketNumber');
    const userId = searchParams.get('userId');

    if (!ticketNumber && !userId) {
      return NextResponse.json(
        { error: 'Parameter ticketNumber atau userId wajib disertakan.' },
        { status: 400 }
      );
    }

    if (ticketNumber) {
      const { data: ticket, error: ticketErr } = await supabaseAdmin
        .from('support_tickets')
        .select('*')
        .eq('ticket_number', ticketNumber.trim().toUpperCase())
        .maybeSingle();

      if (ticketErr) throw ticketErr;

      if (!ticket) {
        return NextResponse.json({ success: true, ticket: null });
      }

      const { data: messages, error: msgErr } = await supabaseAdmin
        .from('support_ticket_messages')
        .select('*')
        .eq('ticket_id', ticket.id)
        .order('created_at', { ascending: true });

      if (msgErr) throw msgErr;

      return NextResponse.json({
        success: true,
        ticket: {
          ...ticket,
          messages: messages || [],
        },
      });
    }

    if (userId) {
      const { data: tickets, error: ticketErr } = await supabaseAdmin
        .from('support_tickets')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (ticketErr) throw ticketErr;

      return NextResponse.json({
        success: true,
        tickets: tickets || [],
      });
    }

    return NextResponse.json({ success: true, tickets: [] });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Gagal mengambil data tiket.' },
      { status: 500 }
    );
  }
}
