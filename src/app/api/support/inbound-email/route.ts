import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function generateTicketNumber(): string {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BK-${rand}`;
}

function parseSender(raw: string): { email: string; name: string } {
  if (!raw) return { email: 'support-guest@bikinkilat.web.id', name: 'Pengguna Email' };
  const match = raw.match(/^(?:"?([^"]*)"?\s)?<?([^>]+)>?$/);
  if (match) {
    const name = match[1]?.trim() || match[2]?.split('@')[0] || 'Pengguna Email';
    const email = match[2]?.trim().toLowerCase() || raw.trim().toLowerCase();
    return { email, name };
  }
  const clean = raw.replace(/[<>]/g, '').trim().toLowerCase();
  const name = clean.split('@')[0] || 'Pengguna Email';
  return { email: clean, name };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawFrom = body.from || body.sender || '';
    const subject = (body.subject || 'Pertanyaan Layanan Support').trim();
    const messageText = (body.text || body.message || body.body || '').trim();

    if (!rawFrom) {
      return NextResponse.json({ error: "Field 'from' wajib diisi." }, { status: 400 });
    }

    const { email: fromEmail, name: fromName } = parseSender(rawFrom);
    const content = messageText || 'Pengguna mengirimkan pesan via email resmi support.';

    // Check if this references an existing ticket
    const ticketMatch = subject.match(/BK-([A-Z0-9]{6})/i);
    let ticketId: string | null = null;
    let ticketNumber: string | null = null;

    if (ticketMatch) {
      const matchNum = `BK-${ticketMatch[1].toUpperCase()}`;
      const { data: existing } = await supabaseAdmin
        .from('support_tickets')
        .select('id, ticket_number')
        .eq('ticket_number', matchNum)
        .maybeSingle();

      if (existing) {
        ticketId = existing.id;
        ticketNumber = existing.ticket_number;

        // Re-open ticket
        await supabaseAdmin
          .from('support_tickets')
          .update({
            status: 'open',
            updated_at: new Date().toISOString(),
          })
          .eq('id', ticketId);
      }
    }

    // New ticket
    if (!ticketId) {
      ticketId = crypto.randomUUID();
      ticketNumber = generateTicketNumber();

      // Check if user exists in database
      let userId: string | null = null;
      try {
        const { data: u } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', fromEmail)
          .maybeSingle();
        if (u) userId = u.id;
      } catch (_) {}

      const { error: tErr } = await supabaseAdmin.from('support_tickets').insert({
        id: ticketId,
        ticket_number: ticketNumber,
        user_id: userId,
        user_name: fromName,
        user_email: fromEmail,
        category: 'Email Masuk',
        subject: subject,
        status: 'open',
        priority: 'normal',
      });

      if (tErr) throw tErr;
    }

    // Insert message
    const { error: mErr } = await supabaseAdmin.from('support_ticket_messages').insert({
      id: crypto.randomUUID(),
      ticket_id: ticketId,
      sender_type: 'user',
      sender_name: fromName,
      message: content,
    });

    if (mErr) throw mErr;

    return NextResponse.json({
      success: true,
      ticket_number: ticketNumber,
      ticket_id: ticketId,
    });
  } catch (err: any) {
    console.error('Inbound email error:', err);
    return NextResponse.json({ error: err?.message || 'Gagal memproses email.' }, { status: 500 });
  }
}
