import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Sesi login tidak valid. Silakan masuk terlebih dahulu.' }, { status: 401 });
    }

    const jwtToken = authHeader.replace('Bearer ', '').trim();
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(jwtToken);
    if (userError || !userData?.user) {
      return NextResponse.json({ error: 'Otentikasi kedaluwarsa. Silakan masuk kembali.' }, { status: 401 });
    }

    const userId = userData.user.id;
    const body = await req.json();
    const { serviceId, slug } = body;

    if (!serviceId && !slug) {
      return NextResponse.json({ error: 'ID atau slug layanan wajib disertakan.' }, { status: 400 });
    }

    // Fetch the service from DB
    let serviceQuery = supabaseAdmin.from('external_services').select('*');
    if (serviceId) {
      serviceQuery = serviceQuery.eq('id', serviceId);
    } else {
      serviceQuery = serviceQuery.eq('slug', slug);
    }

    const { data: service, error: serviceError } = await serviceQuery.single();
    if (serviceError || !service) {
      return NextResponse.json({ error: 'Layanan tidak ditemukan di sistem.' }, { status: 404 });
    }

    // Check if service is under maintenance
    if (service.status === 'maintenance') {
      return NextResponse.json({
        error: 'Layanan ini sedang dalam pemeliharaan sistem. Kami mohon maaf dan silakan coba beberapa saat lagi.',
        isMaintenance: true,
      }, { status: 503 });
    }

    if (service.status !== 'active') {
      return NextResponse.json({ error: 'Layanan saat ini belum dipublikasikan.' }, { status: 403 });
    }

    const tokenCost = Number(service.token_cost) || 0;

    // Fetch user's current token balance
    const { data: userProfile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('tokens')
      .eq('id', userId)
      .single();

    if (profileError || !userProfile) {
      return NextResponse.json({ error: 'Gagal membaca saldo akun pengguna.' }, { status: 500 });
    }

    const currentTokens = Number(userProfile.tokens) || 0;

    if (tokenCost > 0 && currentTokens < tokenCost) {
      return NextResponse.json({
        error: `Saldo token tidak mencukupi. Layanan ini membutuhkan ${tokenCost} Token, saldo Anda saat ini ${currentTokens} Token.`,
        requiredTokens: tokenCost,
        currentTokens,
      }, { status: 402 });
    }

    // Deduct tokens if tokenCost > 0
    let newTokens = currentTokens;
    if (tokenCost > 0) {
      newTokens = currentTokens - tokenCost;
      const { error: deductError } = await supabaseAdmin
        .from('users')
        .update({ tokens: newTokens, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (deductError) {
        console.error('Failed to deduct tokens:', deductError);
        return NextResponse.json({ error: 'Gagal memproses pemotongan token.' }, { status: 500 });
      }

      // Record transaction history
      await supabaseAdmin.from('transactions').insert({
        user_id: userId,
        amount: -tokenCost,
        type: 'usage',
        description: `Akses Alat Digital: ${service.title}`,
        created_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      targetUrl: service.target_url,
      tokenCost,
      newTokens,
      title: service.title,
    });
  } catch (err: any) {
    console.error('Error in /api/external-services/launch:', err);
    return NextResponse.json({ error: err?.message || 'Terjadi kesalahan sistem internal.' }, { status: 500 });
  }
}
