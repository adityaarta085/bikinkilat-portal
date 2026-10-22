'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircle, 
  ShieldCheck, 
  QrCode, 
  Coins, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  AlertCircle, 
  User as UserIcon, 
  Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOKEN_PACKAGES } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';

interface CashierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (addedTokens: number) => void;
}

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
  payment_reference?: string;
}

export function CashierModal({ isOpen, onClose, onPaymentSuccess }: CashierModalProps) {
  const { user, openAuthModal, tokens, signInWithGoogle } = useAuth();
  const currentUserId = user?.id || '';
  const [selectedPkg, setSelectedPkg] = useState(TOKEN_PACKAGES[1]); // Default 25 tokens
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const [qrisData, setQrisData] = useState<QrisResponse | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');
  const [countdown, setCountdown] = useState(900);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopiedAmount, setHasCopiedAmount] = useState(false);

  const pollIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  // Countdown timer for active QRIS
  useEffect(() => {
    if (!qrisData || isSuccess) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setErrorMessage('QRIS telah kedaluwarsa. Silakan buat ulang.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qrisData, isSuccess]);

  // Status Polling from Gateway
  useEffect(() => {
    if (!qrisData || isSuccess || !currentUserId) return;

    pollIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `${GATEWAY_URL}/api/payment/qris/${qrisData.qris_id}/status?userId=${encodeURIComponent(currentUserId)}&txId=${qrisData.transaction_id}`
        );
        if (!res.ok) return;

        const result = await res.json();
        if (result.status === 'success' && result.data?.payment_status === 'paid') {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;

          triggerSuccess(qrisData.transaction_id, selectedPkg.tokens);
        }
      } catch (e) {
        // Silent on polling network blip
      }
    }, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [qrisData, isSuccess, selectedPkg, currentUserId]);

  const triggerSuccess = (transactionId: string, tokensToAdd: number) => {
    setTxId(transactionId);
    setIsSuccess(true);
    onPaymentSuccess(tokensToAdd);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleGenerateQris = async () => {
    if (!user) {
      setErrorMessage('Anda wajib masuk akun terlebih dahulu sebelum membeli token.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${GATEWAY_URL}/api/payment/qris/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPkg.price,
          packageName: selectedPkg.label,
          tokensToAdd: selectedPkg.tokens,
          userId: user.id,
          userEmail: user.email,
          returnUrl: 'https://bikinkilat.web.id',
        }),
      });

      const data = await res.json();
      if (res.status === 409 || data.code === 'ACTIVE_PENDING_EXISTS') {
        setErrorMessage(data.message || 'Anda memiliki transaksi QRIS aktif yang belum diselesaikan. Harap selesaikan atau batalkan di kasir / riwayat transaksi.');
        return;
      }
      if (res.ok && data.status === 'success') {
        setQrisData(data.data);
        setCountdown(900);
      } else {
        setErrorMessage(data.message || 'Gagal membuat QRIS.');
      }
    } catch (err: any) {
      setErrorMessage('Tidak dapat terhubung ke server pembayaran.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCancelCurrentQris = async () => {
    if (!qrisData || !user?.id) return;
    if (!window.confirm('Batalkan transaksi pembayaran QRIS ini?')) return;
    try {
      await fetch('/api/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transactionId: qrisData.transaction_id,
          userId: user.id,
          action: 'cancel',
        }),
      });
      setQrisData(null);
      setErrorMessage('Transaksi berhasil dibatalkan.');
    } catch (e) {
      setErrorMessage('Gagal membatalkan transaksi.');
    }
  };

  const handleDirectGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setErrorMessage(e?.message || 'Gagal masuk dengan Google.');
      setIsLoggingInGoogle(false);
    }
  };

  const copyAmount = () => {
    if (!qrisData) return;
    navigator.clipboard.writeText(Math.round(Number(qrisData.amount)).toString());
    setHasCopiedAmount(true);
    setTimeout(() => setHasCopiedAmount(false), 2000);
  };

  const resetModal = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    setIsSuccess(false);
    setTxId('');
    setQrisData(null);
    setErrorMessage(null);
    setIsGenerating(false);
    setIsLoggingInGoogle(false);
    setCountdown(900);
    onClose();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cashier-modal-title"
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden max-h-[90vh] flex flex-col transition-colors duration-200"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <QrCode className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 id="cashier-modal-title" className="text-lg font-bold">
                Kasir QRIS Terpadu
              </h2>
              <p className="text-xs text-indigo-200">Pembayaran Instan Otomatis (Semua Bank & E-Wallet)</p>
            </div>
          </div>
          <button
            onClick={resetModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            aria-label="Tutup kasir"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!user ? (
            /* Mandatory Login Gate View */
            <div className="text-center py-6 px-2 space-y-6 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full">
                  Wajib Masuk Terlebih Dahulu
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-3 mb-2 tracking-tight">
                  Login untuk Mengisi Saldo Token
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Sesuai standar keamanan sistem BikinKilat, pengisian token harus terikat langsung ke akun Anda agar saldo permanen dan otomatis sinkron di 9 subdomain.
                </p>
              </div>

              {/* Verified Benefits */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Saldo token aman & tersimpan permanen di cloud</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Otomatis aktif di Slide, Modul, CV, RAB, dsb.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Faktur transaksi QRIS terekam resmi di Dashboard</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-sm mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleDirectGoogleLogin}
                  disabled={isLoggingInGoogle}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-3 transition active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoggingInGoogle ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                  ) : (
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>Masuk dengan Google (1-Klik Instan)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openAuthModal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Pilihan Masuk Lainnya (Email OTP)
                </button>
              </div>
            </div>
          ) : !isSuccess ? (
            <div className="space-y-6">
              {/* Account Status Ribbon */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block truncate max-w-[200px]">
                      {user.email}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Saldo saat ini: <strong className="text-indigo-600 dark:text-indigo-400">{tokens} Token</strong>
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                  <Check className="w-3 h-3" />
                  <span>Terverifikasi</span>
                </div>
              </div>

              {/* Package selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  Pilih Paket Kuota Token
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {TOKEN_PACKAGES.map((pkg) => {
                    const isSel = selectedPkg.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setSelectedPkg(pkg);
                          if (qrisData) setQrisData(null);
                        }}
                        className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                          isSel
                            ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/50 shadow-sm ring-2 ring-indigo-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40'
                        }`}
                      >
                        {pkg.popular ? (
                          <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold">
                            Populer
                          </span>
                        ) : (pkg as any).discountPercent ? (
                          <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-bold">
                            -{(pkg as any).discountPercent}%
                          </span>
                        ) : null}
                        <div className="flex items-center gap-1 text-slate-900 dark:text-white font-extrabold text-base mb-1">
                          <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{pkg.tokens}</span>
                        </div>
                        <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </div>
                        {(pkg as any).originalPrice && (
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 line-through">
                            Rp {(pkg as any).originalPrice.toLocaleString('id-ID')}
                          </div>
                        )}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                          {pkg.label}
                        </div>
                        {(pkg as any).discountPercent && (
                          <span className="text-[9px] font-extrabold text-rose-600 dark:text-rose-400 mt-1 block">
                            Diskon {(pkg as any).discountPercent}%
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-xl p-3 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* QRIS Dynamic Display */}
              {qrisData ? (
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Standar Bank Indonesia (ASPI)</span>
                    </div>
                    <span className="font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                      Kedaluwarsa: {formatTimer(countdown)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
                    {qrisData.qris_image_base64 || qrisData.qris_image_url ? (
                      <img
                        src={qrisData.qris_image_base64 || qrisData.qris_image_url}
                        alt="QRIS Dinamis"
                        className="w-52 h-52 object-contain"
                      />
                    ) : (
                      <div className="w-52 h-52 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded">
                        <QrCode className="w-24 h-24 text-slate-400" />
                      </div>
                    )}

                    <div className="text-center w-full pt-1">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Transfer:</span>
                      <div className="flex items-center justify-center gap-2 mt-0.5">
                        <span className="text-xl font-black font-mono text-slate-900 dark:text-white">
                          Rp {Math.round(Number(qrisData.amount)).toLocaleString('id-ID')}
                        </span>
                        <button
                          type="button"
                          onClick={copyAmount}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs transition"
                          title="Salin nominal"
                        >
                          {hasCopiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 rounded-lg p-2 mt-2 leading-relaxed border border-amber-200 dark:border-amber-900">
                        Pastikan mentransfer nominal persis termasuk kode unik #{qrisData.unique_id} agar langsung aktif seketika.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    <span>Mendeteksi Pembayaran Otomatis...</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-sm text-indigo-600 dark:text-indigo-400">
                    <QrCode className="w-10 h-10" />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <p className="font-bold text-slate-900 dark:text-white mb-0.5">Mendukung Seluruh Saluran Pembayaran</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5">
                      BCA, Mandiri Livin, BRImo, BNI, GoPay, OVO, DANA, ShopeePay & LinkAja.
                    </p>
                    <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-semibold text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verifikasi otomatis dalam hitungan detik</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                {!qrisData ? (
                  <button
                    type="button"
                    onClick={handleGenerateQris}
                    disabled={isGenerating}
                    className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Menyiapkan QRIS...</span>
                      </>
                    ) : (
                      <>
                        <QrCode className="w-4 h-4" />
                        <span>Tampilkan QRIS (Rp {selectedPkg.price.toLocaleString('id-ID')})</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCancelCurrentQris}
                    className="w-full py-2.5 px-4 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition flex items-center justify-center gap-1.5 min-h-[40px]"
                  >
                    <span>Batalkan Transaksi Ini</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/40">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Pembayaran Berhasil!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  Saldo Anda bertambah <span className="font-bold text-emerald-600 dark:text-emerald-400">+{selectedPkg.tokens} Token</span>.
                </p>
                {txId && (
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-2 bg-slate-100 dark:bg-slate-800 py-1 px-3 rounded-lg inline-block">
                    Ref ID: {txId.slice(0, 8)}...
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={resetModal}
                className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200"
              >
                Selesai & Gunakan Layanan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CashierModal;
