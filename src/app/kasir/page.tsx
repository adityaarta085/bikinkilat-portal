'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Heart, 
  Coffee, 
  RefreshCw, 
  Check, 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  FileCheck, 
  Camera, 
  TrendingUp,
  User as UserIcon,
  AlertCircle
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';

const DONATION_PRESETS = [
  { amount: 5000, label: 'Kopi Hangat', icon: '☕' },
  { amount: 10000, label: 'Kopi Susu', icon: '🧋' },
  { amount: 25000, label: 'Camilan Server', icon: '🥐' },
  { amount: 50000, label: 'Pendukung Setia', icon: '🍕' },
  { amount: 100000, label: 'Sponsor Komunitas', icon: '🚀' },
];

const TOOLS_LIST = [
  { name: 'Slide & Makalah', cost: '2 Kuota', icon: Presentation, url: 'https://slide.bikinkilat.web.id' },
  { name: 'Modul Ajar Guru', cost: '2 Kuota', icon: BookOpen, url: 'https://modul.bikinkilat.web.id' },
  { name: 'Resume Standar ATS', cost: '1 Kuota', icon: FileText, url: 'https://cv.bikinkilat.web.id' },
  { name: 'Kalkulator RAB Anggaran', cost: '2 Kuota', icon: Calculator, url: 'https://rab.bikinkilat.web.id' },
  { name: 'Surat Kontrak & Somasi', cost: '2 Kuota', icon: Scale, url: 'https://surat.bikinkilat.web.id' },
  { name: 'Kalkulator Faraidh Waris', cost: '1 Kuota', icon: FileCheck, url: 'https://waris.bikinkilat.web.id' },
  { name: 'Proposal Usaha & KUR', cost: '2 Kuota', icon: TrendingUp, url: 'https://proposal.bikinkilat.web.id' },
  { name: 'Studio Pasfoto CPNS', cost: '3 Kuota', icon: Camera, url: 'https://pasfoto.bikinkilat.web.id' },
];

export default function KasirPage() {
  const { user, tokens, openAuthModal, signInWithGoogle, refreshTokens } = useAuth();

  // Donation state
  const [selectedPreset, setSelectedPreset] = useState<number>(10000);
  const [isCustom, setIsCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState('15000');
  const [donorName, setDonorName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // QRIS active session
  const [qrisData, setQrisData] = useState<{
    transaction_id: string;
    qris_id: string;
    qris_image_url: string;
    amount: number;
    expired_at?: string;
  } | null>(null);

  const [timeLeft, setTimeLeft] = useState(900); // 15 mins default
  const [isChecking, setIsChecking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error('Login error:', e);
      openAuthModal();
    }
  };

  const getTargetAmount = () => {
    if (isCustom) {
      const parsed = parseInt(customAmount.replace(/[^0-9]/g, ''), 10);
      return Math.max(1000, isNaN(parsed) ? 1000 : parsed);
    }
    return selectedPreset;
  };

  const handleCreateDonationQRIS = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    const amount = getTargetAmount();
    const pkgName = `Traktir Kopi BikinKilat (${donorName.trim() || 'Sahabat Kilat'})`;

    try {
      const res = await fetch('https://api.bikinkilat.web.id/api/payment/qris/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          packageName: pkgName,
          userId: user?.id || 'anonymous',
          tokensToAdd: Math.max(5, Math.floor(amount / 1000)),
        }),
      });

      const text = await res.text();
      let resData: any;
      try {
        resData = JSON.parse(text);
      } catch {
        throw new Error('Terjadi kendala pada gateway pembayaran. Silakan coba lagi.');
      }

      if (!res.ok || resData.status !== 'success') {
        throw new Error(resData?.message || 'Gagal membuat QRIS. Coba lagi.');
      }

      setQrisData(resData.data);
      setTimeLeft(900);
      setIsSuccess(false);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Terjadi gangguan saat membuat QRIS.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheckStatus = async () => {
    if (!qrisData) return;
    setIsChecking(true);

    try {
      const res = await fetch(
        `https://api.bikinkilat.web.id/api/payment/qris/${qrisData.qris_id}/status?userId=${encodeURIComponent(
          user?.id || 'anonymous'
        )}&txId=${encodeURIComponent(qrisData.transaction_id)}`
      );
      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        return;
      }

      if (data?.status === 'success' && data?.data?.payment_status === 'paid') {
        setIsSuccess(true);
        if (refreshTokens) refreshTokens();
      }
    } catch (err) {
      console.warn('Status check warning:', err);
    } finally {
      setIsChecking(false);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!qrisData || isSuccess) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [qrisData, isSuccess]);

  // Polling check every 5s while active
  useEffect(() => {
    if (!qrisData || isSuccess || timeLeft <= 0) return;

    const pollInterval = setInterval(() => {
      handleCheckStatus();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [qrisData, isSuccess, timeLeft]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Navigation & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Bebas Biaya Layanan</span>
          </div>
        </div>

        {/* Minimal Header */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Pusat Kuota &amp; Dukungan Server
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Gunakan kuota harian gratis atau traktir kopi sukarela untuk mendukung operasional server bersama.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Kuota Harian (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Quota Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-500">
                    <Coins className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Saldo Kuota Anda
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate max-w-[220px]">
                      {user ? user.email : 'Pengunjung Tamu'}
                    </h2>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">
                    {user ? tokens : 0}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                    20 Kuota / Hari
                  </span>
                </div>
              </div>

              {/* Status Reset Info */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex items-center gap-3 text-xs">
                <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                <p className="text-slate-600 dark:text-slate-300">
                  Reset otomatis ke <strong>20 kuota</strong> setiap pukul <strong>00:00 WIB</strong> (Tengah Malam).
                </p>
              </div>

              {!user && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-amber-800 dark:text-amber-300 font-semibold text-center sm:text-left">
                    Masuk akun untuk mengaktifkan kuota harian Anda.
                  </span>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 transition"
                  >
                    Masuk Google
                  </button>
                </div>
              )}
            </div>

            {/* Quick Tools Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block px-1">
                Layanan Siap Pakai
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {TOOLS_LIST.map((tool) => {
                  const IconComp = tool.icon;
                  return (
                    <a
                      key={tool.name}
                      href={tool.url}
                      className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between group shadow-2xs"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <IconComp className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {tool.cost}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {tool.name}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Traktir Kopi / Donasi QRIS (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
              {/* Header Box */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 flex items-center justify-center text-rose-500">
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      Traktir Kopi / Dukung Server
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sukarela untuk kelancaran operasional
                    </p>
                  </div>
                </div>
              </div>

              {/* State 1: Sukses Bayar */}
              {isSuccess ? (
                <div className="text-center py-6 px-3 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 dark:text-white">
                      Terima Kasih Banyak!
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                      Dukungan Anda sangat berarti untuk menjaga server tetap gratis dan cepat bagi ribuan pengguna.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setQrisData(null);
                      setIsSuccess(false);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                  >
                    Dukung Lagi
                  </button>
                </div>
              ) : qrisData ? (
                /* State 2: Tampilan QRIS Aktif */
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 text-center space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                      <span>Scan QRIS</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">
                        {formatSeconds(timeLeft)}
                      </span>
                    </div>

                    {/* QR Code */}
                    <div className="bg-white p-3 rounded-2xl shadow-sm inline-block border border-slate-200">
                      <Image
                        src={qrisData.qris_image_url}
                        alt="QRIS Donasi"
                        width={220}
                        height={220}
                        className="rounded-lg object-contain mx-auto"
                        unoptimized
                      />
                    </div>

                    <div>
                      <div className="text-xs text-slate-500 font-medium">Nominal Dukungan:</div>
                      <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                        Rp {Number(qrisData.amount).toLocaleString('id-ID')}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight">
                      BCA, Mandiri, BRI, BNI, GoPay, OVO, Dana, ShopeePay
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCheckStatus}
                      disabled={isChecking}
                      className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
                      <span>{isChecking ? 'Mengecek...' : 'Cek Status'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setQrisData(null)}
                      className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      Batal / Ubah
                    </button>
                  </div>
                </div>
              ) : (
                /* State 3: Pemilihan Nominal Donasi */
                <div className="space-y-4">
                  {/* Preset Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {DONATION_PRESETS.map((preset) => {
                      const isSelected = !isCustom && selectedPreset === preset.amount;
                      return (
                        <button
                          key={preset.amount}
                          type="button"
                          onClick={() => {
                            setSelectedPreset(preset.amount);
                            setIsCustom(false);
                          }}
                          className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-black block">
                              Rp {preset.amount.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              {preset.label}
                            </span>
                          </div>
                          <span className="text-base">{preset.icon}</span>
                        </button>
                      );
                    })}

                    {/* Custom Button */}
                    <button
                      type="button"
                      onClick={() => setIsCustom(true)}
                      className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${
                        isCustom
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-black block">Nominal Bebas</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">Tentukan sendiri</span>
                      </div>
                      <span className="text-base">✨</span>
                    </button>
                  </div>

                  {/* Custom Input */}
                  {isCustom && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500">Nominal Dukungan (Rp)</label>
                      <input
                        type="number"
                        min="1000"
                        step="1000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder="Contoh: 15000"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  )}

                  {/* Donor Name (Optional) */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Nama / Catatan (Opsional)</label>
                    <input
                      type="text"
                      maxLength={30}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Sahabat Kilat"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-indigo-500"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCreateDonationQRIS}
                    disabled={isGenerating}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition disabled:opacity-50"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>
                      {isGenerating
                        ? 'Menyiapkan QRIS...'
                        : `Traktir Kopi Rp ${getTargetAmount().toLocaleString('id-ID')}`}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
