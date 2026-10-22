'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { 
  Coins, 
  CheckCircle, 
  ShieldCheck, 
  QrCode, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  ArrowLeft,
  ArrowRight,
  Lock,
  Clock,
  Plus,
  RotateCcw,
  SlidersHorizontal,
  Layers,
  Zap,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { 
  TOKEN_PACKAGES, 
  CUSTOM_PRESETS, 
  MIN_CUSTOM_TOPUP, 
  calculateCustomTokens 
} from '@/lib/ecosystem';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || 'https://api.bikinkilat.web.id';

interface QrisResponse {
  transaction_id: string;
  qris_id: string;
  qris_image_url?: string;
  qris_image_base64?: string;
  amount: string | number;
  requested_amount: number;
  unique_id: number;
  expired_at?: string;
  checkout_url?: string;
}

interface PayingItem {
  name: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  isCustom?: boolean;
}

export default function KasirPage() {
  const { user, profile, tokens, isLoading, refreshTokens } = useAuth();
  
  // Selection mode: 'package' (paket preset) or 'custom' (nominal bebas)
  const [mode, setMode] = useState<'package' | 'custom'>('package');
  const [selectedPkg, setSelectedPkg] = useState(TOKEN_PACKAGES[1]); // Default Paket Mahasiswa (25 token)
  const [customAmount, setCustomAmount] = useState<number>(50000);
  const [customInputStr, setCustomInputStr] = useState<string>('50.000');

  const [payingItem, setPayingItem] = useState<PayingItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrisData, setQrisData] = useState<QrisResponse | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');
  const [countdown, setCountdown] = useState(900);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopiedAmount, setHasCopiedAmount] = useState(false);

  const pollIntervalRef = useRef<any>(null);

  // Dynamic custom calculation
  const customCalc = useMemo(() => calculateCustomTokens(customAmount), [customAmount]);

  // Active item determined by current tab
  const activeItem: PayingItem = useMemo(() => {
    if (mode === 'package') {
      return {
        name: selectedPkg.name,
        tokens: selectedPkg.tokens,
        price: selectedPkg.price,
        pricePerToken: selectedPkg.pricePerToken,
        isCustom: false,
      };
    } else {
      return {
        name: `Top-Up Bebas (${customCalc.totalTokens} Token)`,
        tokens: customCalc.totalTokens,
        price: customCalc.amount,
        pricePerToken: customCalc.effectivePricePerToken,
        isCustom: true,
      };
    }
  }, [mode, selectedPkg, customCalc]);

  // Handle custom input
  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    if (!rawDigits) {
      setCustomInputStr('');
      setCustomAmount(0);
      return;
    }
    const val = parseInt(rawDigits, 10);
    setCustomInputStr(val.toLocaleString('id-ID'));
    setCustomAmount(val);
  };

  const handleSelectPreset = (amount: number) => {
    setCustomAmount(amount);
    setCustomInputStr(amount.toLocaleString('id-ID'));
  };

  const handleAddAmount = (delta: number) => {
    const current = customAmount || 0;
    const next = current + delta;
    setCustomAmount(next);
    setCustomInputStr(next.toLocaleString('id-ID'));
  };

  const handleResetAmount = () => {
    setCustomAmount(MIN_CUSTOM_TOPUP);
    setCustomInputStr(MIN_CUSTOM_TOPUP.toLocaleString('id-ID'));
  };

  // Timer countdown
  useEffect(() => {
    if (!qrisData || isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setErrorMessage('Masa berlaku QRIS telah habis. Silakan buat kode QRIS baru.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qrisData, isSuccess]);

  // Status Polling from Gateway
  useEffect(() => {
    if (!qrisData || isSuccess || !user?.id) return;

    pollIntervalRef.current = setInterval(async () => {
      try {
        let res: Response;
        const endpoint = `/api/payment/qris/${qrisData.qris_id}/status?userId=${encodeURIComponent(user.id)}&txId=${qrisData.transaction_id}`;

        try {
          res = await fetch(`${GATEWAY_URL}${endpoint}`);
        } catch (e) {
          res = await fetch(endpoint);
        }

        if (!res.ok) return;

        const result = await res.json();
        if (result.status === 'success' && result.data?.payment_status === 'paid') {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
          triggerSuccess(qrisData.transaction_id, payingItem?.tokens || activeItem.tokens);
        }
      } catch (e) {
        // Abaikan gangguan koneksi polling sementara
      }
    }, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [qrisData, isSuccess, payingItem, activeItem, user]);

  const triggerSuccess = (transactionId: string, tokensToAdd: number) => {
    setTxId(transactionId);
    setIsSuccess(true);
    refreshTokens();

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleGenerateQris = async (overrideItem?: PayingItem) => {
    if (!user) {
      window.location.href = '/auth?returnUrl=/kasir';
      return;
    }

    const itemToPay = overrideItem || activeItem;

    if (itemToPay.isCustom && itemToPay.price < MIN_CUSTOM_TOPUP) {
      setErrorMessage(`Nominal minimal isi ulang bebas adalah Rp ${MIN_CUSTOM_TOPUP.toLocaleString('id-ID')}.`);
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);
    setPayingItem(itemToPay);

    try {
      let res: Response;
      const payload = {
        userId: user.id,
        email: user.email || profile?.email || `user-${user.id.slice(0, 8)}@bikinkilat.web.id`,
        name: profile?.name || user.user_metadata?.full_name || 'Pelanggan BikinKilat',
        amount: itemToPay.price,
        packageName: itemToPay.name,
        tokens: itemToPay.tokens,
        tokensToAdd: itemToPay.tokens,
      };

      try {
        res = await fetch(`${GATEWAY_URL}/api/payment/qris/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (directErr) {
        // Fallback ke proxy internal jika edge domain terhalang browser
        res = await fetch('/api/payment/qris/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      const isSuccess = res.ok && (data.status === 'success' || data.success === true) && Boolean(data.data);

      if (!isSuccess) {
        throw new Error(data.error || data.message || 'Gagal membuat kode QRIS pembayaran');
      }

      setQrisData(data.data);
      const expiresIn = data.data.expires_in_seconds ? Math.floor(data.data.expires_in_seconds) : 900;
      setCountdown(expiresIn > 0 ? expiresIn : 900);
      setIsSuccess(false);
    } catch (err: any) {
      console.error('Error generate QRIS:', err);
      setErrorMessage(err.message || 'Terjadi gangguan jaringan saat memproses pesanan.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyAmount = () => {
    if (!qrisData) return;
    navigator.clipboard.writeText(qrisData.amount.toString());
    setHasCopiedAmount(true);
    setTimeout(() => setHasCopiedAmount(false), 2000);
  };

  const formatRupiah = (val: number | string) => {
    const num = typeof val === 'string' ? parseInt(val, 10) : val;
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeDisplayItem = payingItem || activeItem;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Pembayaran Aman Resmi QRIS</span>
          </div>
        </div>

        {/* CONDITION 1: USER NOT LOGGED IN */}
        {!user && !isLoading ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-14 text-center max-w-2xl mx-auto shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto shadow-sm">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2.5">
              <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 inline-block">
                Wajib Masuk Terlebih Dahulu
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Masuk Akun untuk Membuka Kasir
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
                Setiap pengguna baru yang masuk otomatis mendapatkan{' '}
                <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">5 Token Gratis</strong>. Masuk terlebih dahulu agar saldo token dan bukti transaksi Anda tersimpan aman dan dapat digunakan di seluruh 9 layanan.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/auth?returnUrl=/kasir"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition active:scale-95 min-h-[48px]"
              >
                <span>Masuk Sekarang (Dapatkan 5 Token Gratis)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="text-xs text-slate-400 pt-2">
              Proses pendaftaran cepat menggunakan akun Google atau verifikasi email instan tanpa biaya.
            </p>
          </div>
        ) : (
          /* CONDITION 2: LOGGED IN USER */
          <div className="space-y-8">
            {/* Page Title & User Info Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                  <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Kasir Pembayaran Terpadu</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Isi Ulang Saldo Token BikinKilat
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  Pilih paket rekomendasi atau tentukan sendiri nominal isi ulang mulai dari Rp 10.000. Saldo berlaku selamanya tanpa kedaluwarsa di 9 studio dokumen.
                </p>
              </div>

              {/* User Account Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center shrink-0">
                  {user?.email?.charAt(0).toUpperCase() || 'P'}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block truncate max-w-[180px]">
                    {profile?.name || user?.user_metadata?.full_name || 'Pengguna BikinKilat'}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate max-w-[180px]">
                    {user?.email}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                      Saldo: {tokens} Token
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="underline text-xs"
                >
                  Tutup
                </button>
              </div>
            )}

            {/* SUCCESS STATE */}
            {isSuccess ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-200 dark:border-emerald-800 p-8 sm:p-12 text-center shadow-sm space-y-6 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Pembayaran Terverifikasi
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    Token Berhasil Ditambahkan!
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Saldo akun Anda telah bertambah sebesar{' '}
                    <strong className="text-emerald-600 font-bold">{activeDisplayItem.tokens} Token</strong>. Anda sekarang dapat langsung menggunakannya di semua layanan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nomor Transaksi:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                      {txId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Jenis Top-Up:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeDisplayItem.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nominal Pembayaran:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{formatRupiah(activeDisplayItem.price)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1.5">
                    <span className="text-slate-500 font-semibold">Saldo Baru Akun:</span>
                    <span className="font-black text-emerald-600 text-sm">{tokens} Token</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/dashboard"
                    className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-xs hover:bg-slate-800 transition"
                  >
                    Buka Dashboard Saya
                  </Link>
                  <Link
                    href="/#layanan"
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition"
                  >
                    Mulai Buat Dokumen di Layanan →
                  </Link>
                </div>
              </div>
            ) : qrisData ? (
              /* QRIS DISPLAY STATE */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left 7 Cols: QR Code & Payment Instructions */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Pindai untuk Membayar
                      </span>
                      <h2 className="text-lg font-black text-slate-900 dark:text-white">
                        QRIS Nasional Standar Bank Indonesia
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{formatTimer(countdown)}</span>
                    </div>
                  </div>

                  {/* QRIS Image Frame */}
                  <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                    {qrisData.qris_image_url || qrisData.qris_image_base64 ? (
                      <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-200 max-w-[280px]">
                        <img
                          src={qrisData.qris_image_url || qrisData.qris_image_base64}
                          alt="QRIS Pembayaran BikinKilat"
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="w-56 h-56 rounded-2xl bg-white flex items-center justify-center border border-slate-200">
                        <QrCode className="w-32 h-32 text-slate-800" />
                      </div>
                    )}

                    <div className="text-center space-y-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                        Dapat dipindai dengan aplikasi m-Banking &amp; e-Wallet apapun:
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        BCA, Mandiri, BRI, BNI, BSI, GoPay, OVO, Dana, ShopeePay
                      </span>
                    </div>
                  </div>

                  {/* Amount to pay */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                        Nominal Pembayaran Persis:
                      </span>
                      <span className="text-xl font-black text-indigo-700 dark:text-indigo-300">
                        {formatRupiah(qrisData.amount)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={copyAmount}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 transition hover:bg-indigo-50"
                    >
                      {hasCopiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{hasCopiedAmount ? 'Tersalin' : 'Salin Nominal'}</span>
                    </button>
                  </div>

                  {/* Polling live feedback */}
                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 py-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                    <span>Mengecek pembayaran otomatis setiap 3 detik...</span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setQrisData(null)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      ← Ganti Nominal / Paket
                    </button>
                  </div>
                </div>

                {/* Right 5 Cols: Selected Package Summary */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
                  <h3 className="text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
                    Ringkasan Pesanan Anda
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pilihan:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{activeDisplayItem.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Jumlah Token:</span>
                      <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                        +{activeDisplayItem.tokens} Token
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rata-rata Biaya:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Rp {activeDisplayItem.pricePerToken.toLocaleString('id-ID')} / token
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Masa Aktif Saldo:</span>
                      <span className="font-bold text-slate-900 dark:text-white">Selamanya (Tidak Hangus)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Biaya Administrasi:</span>
                      <span className="font-bold text-emerald-600">Gratis (Rp 0)</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-baseline">
                      <span className="font-bold text-slate-700 dark:text-slate-300">Total Tagihan:</span>
                      <span className="text-xl font-black text-slate-900 dark:text-white">
                        {formatRupiah(activeDisplayItem.price)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white block">Cara Pembayaran:</span>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>Buka aplikasi m-Banking atau e-Wallet di ponsel Anda.</li>
                      <li>Pilih menu <strong>Pindai QR / Bayar QRIS</strong>.</li>
                      <li>Arahkan kamera ke kode QRIS di layar.</li>
                      <li>Pastikan nominal yang tertera sesuai dengan tagihan.</li>
                      <li>Selesaikan pembayaran dan token otomatis masuk seketika.</li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              /* SELECTION WORKFLOW: TABS (PAKET VS CUSTOM) */
              <div className="space-y-6">
                {/* Mode Selector Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      Langkah 1: Pilih Metode Isi Ulang
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      Tersedia paket hemat terstruktur atau nominal bebas fleksibel minimal Rp 10.000.
                    </p>
                  </div>

                  {/* Segmented Control Buttons */}
                  <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setMode('package')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition min-h-[40px] ${
                        mode === 'package'
                          ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Layers className="w-4 h-4" />
                      <span>Paket Rekomendasi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMode('custom')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition relative min-h-[40px] ${
                        mode === 'custom'
                          ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Nominal Bebas (Custom)</span>
                      <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                        Fleksibel
                      </span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: PAKET REKOMENDASI */}
                {mode === 'package' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {TOKEN_PACKAGES.map((pkg) => {
                        const isSelected = selectedPkg.id === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPkg(pkg)}
                            className={`cursor-pointer rounded-3xl p-6 border-2 transition-all relative flex flex-col justify-between ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-md ring-4 ring-indigo-500/10'
                                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                            }`}
                          >
                            {pkg.badge && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] uppercase shadow-sm">
                                {pkg.badge}
                              </div>
                            )}

                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">
                                  {pkg.name}
                                </span>
                                {isSelected && <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0" />}
                              </div>

                              <div>
                                <span className="text-3xl font-black text-slate-900 dark:text-white">
                                  {pkg.tokens}
                                </span>
                                <span className="text-xs text-slate-500 font-semibold ml-1">Token</span>
                              </div>

                              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[32px]">
                                {pkg.desc}
                              </p>

                              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-xl font-black text-slate-900 dark:text-white block">
                                  {formatRupiah(pkg.price)}
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  Rp {pkg.pricePerToken.toLocaleString('id-ID')} / token
                                </span>
                              </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedPkg(pkg);
                                  handleGenerateQris({
                                    name: pkg.name,
                                    tokens: pkg.tokens,
                                    price: pkg.price,
                                    pricePerToken: pkg.pricePerToken,
                                    isCustom: false,
                                  });
                                }}
                                className={`w-full py-2.5 rounded-xl font-bold text-xs transition min-h-[40px] ${
                                  isSelected
                                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                                }`}
                              >
                                {isSelected ? 'Lanjut Pembayaran' : 'Pilih Paket'}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: NOMINAL BEBAS (CUSTOM) */}
                {mode === 'custom' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left 7 Cols: Input & Preset Chips */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase">
                          <SlidersHorizontal className="w-4 h-4" />
                          <span>Atur Nominal Sesuai Keinginan</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">
                          Berapa Rupiah yang Ingin Anda Isi?
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Bebas masukkan nominal berapapun mulai dari <strong>Rp 10.000</strong>. Makin besar nominal, makin banyak bonus token yang Anda peroleh!
                        </p>
                      </div>

                      {/* Main Interactive Input */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                          Masukkan Nominal (Rupiah):
                        </label>
                        <div className="relative rounded-2xl border-2 border-indigo-500/40 focus-within:border-indigo-600 dark:focus-within:border-indigo-400 bg-slate-50/50 dark:bg-slate-950 transition overflow-hidden p-2 flex items-center shadow-inner">
                          <span className="pl-3 pr-2 text-lg sm:text-2xl font-black text-slate-400 select-none">
                            Rp
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={customInputStr}
                            onChange={handleCustomInputChange}
                            placeholder="Contoh: 50.000"
                            className="w-full bg-transparent text-xl sm:text-3xl font-black text-slate-900 dark:text-white outline-none tracking-tight py-2"
                          />
                          {customAmount > 0 && (
                            <button
                              type="button"
                              onClick={handleResetAmount}
                              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
                              title="Reset ke Rp 10.000"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {!customCalc.isValid && (
                          <p className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 pt-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Minimal isi ulang nominal bebas adalah Rp {MIN_CUSTOM_TOPUP.toLocaleString('id-ID')}.</span>
                          </p>
                        )}
                      </div>

                      {/* Quick Preset Chips */}
                      <div className="space-y-2.5">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
                          Pilihan Cepat Sekali Sentuh:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {CUSTOM_PRESETS.map((preset) => {
                            const isCurrent = customAmount === preset.amount;
                            return (
                              <button
                                key={preset.amount}
                                type="button"
                                onClick={() => handleSelectPreset(preset.amount)}
                                className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between min-h-[64px] ${
                                  isCurrent
                                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:border-slate-300'
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-xs font-black text-slate-900 dark:text-white">
                                    {preset.label}
                                  </span>
                                  {preset.badge && (
                                    <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
                                      {preset.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                                  {preset.tokens} Token
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quick Increment Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-[11px] font-semibold text-slate-400 mr-1">Tambah Cepat:</span>
                        <button
                          type="button"
                          onClick={() => handleAddAmount(10000)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Rp 10.000</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddAmount(25000)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Rp 25.000</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleAddAmount(50000)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Rp 50.000</span>
                        </button>
                      </div>
                    </div>

                    {/* Right 5 Cols: Live Token Calculation Dashboard */}
                    <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-5">
                      <div className="flex items-center justify-between border-b border-indigo-800/60 pb-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                            Perhitungan Token Langsung
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-indigo-200 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-700/60">
                          {customCalc.tierLabel}
                        </span>
                      </div>

                      {/* Big Token Result */}
                      <div className="text-center py-4 bg-indigo-950/60 rounded-2xl border border-indigo-800/40 space-y-1">
                        <span className="text-xs text-indigo-300 font-semibold block uppercase tracking-wider">
                          Total Saldo yang Anda Dapatkan:
                        </span>
                        <div className="flex items-center justify-center gap-2">
                          <Coins className="w-7 h-7 text-amber-400 fill-amber-400" />
                          <span className="text-4xl sm:text-5xl font-black text-amber-300 tracking-tight">
                            {customCalc.totalTokens}
                          </span>
                          <span className="text-base font-bold text-white self-end mb-1">Token</span>
                        </div>

                        <div className="pt-2 flex items-center justify-center gap-2 text-xs text-indigo-200">
                          <span>Dasar: <strong>{customCalc.baseTokens} Token</strong></span>
                          {customCalc.bonusTokens > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-emerald-400 font-bold flex items-center gap-1">
                                <Gift className="w-3.5 h-3.5" />
                                <span>Bonus: +{customCalc.bonusTokens} Token ({customCalc.bonusPercent}%)</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Calculation Breakdown Details */}
                      <div className="space-y-2.5 text-xs text-indigo-200 border-t border-indigo-800/60 pt-3">
                        <div className="flex justify-between">
                          <span>Nominal Pembayaran:</span>
                          <span className="font-bold text-white">{formatRupiah(customCalc.amount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rata-rata Harga per Token:</span>
                          <span className="font-bold text-amber-300">
                            Rp {customCalc.effectivePricePerToken.toLocaleString('id-ID')} / token
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Masa Berlaku Token:</span>
                          <span className="font-bold text-emerald-400">Selamanya (Tanpa Batas Waktu)</span>
                        </div>
                      </div>

                      {/* Next Tier Incentive Banner */}
                      {customCalc.nextTierAmount && customCalc.diffToNextTier > 0 && (
                        <div className="p-3 rounded-2xl bg-indigo-950/90 border border-amber-500/30 text-xs space-y-1">
                          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Peluang Bonus Lebih Banyak!</span>
                          </div>
                          <p className="text-[11px] text-indigo-200 leading-relaxed">
                            Tambah <strong>{formatRupiah(customCalc.diffToNextTier)}</strong> lagi untuk membuka <strong>Tier Bonus +{customCalc.nextTierBonusPercent}% Token</strong>!
                          </p>
                        </div>
                      )}

                      {/* Proceed Button Inside Custom Panel */}
                      <button
                        type="button"
                        onClick={() => handleGenerateQris()}
                        disabled={isGenerating || !customCalc.isValid}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:from-amber-500 active:to-amber-600 text-slate-950 font-black text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 min-h-[48px]"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Menyiapkan Kode QRIS...</span>
                          </>
                        ) : (
                          <>
                            <QrCode className="w-4 h-4" />
                            <span>Bayar {formatRupiah(customCalc.amount)} via QRIS →</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Proceed CTA for Package Mode */}
                {mode === 'package' && (
                  <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-slate-500 block">Paket Terpilih:</span>
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        {selectedPkg.name} ({selectedPkg.tokens} Token) : {formatRupiah(selectedPkg.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleGenerateQris()}
                      disabled={isGenerating}
                      className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 shrink-0 min-h-[48px]"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Menyiapkan Kode QRIS...</span>
                        </>
                      ) : (
                        <>
                          <QrCode className="w-4 h-4" />
                          <span>Lanjutkan ke Pembayaran QRIS →</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
