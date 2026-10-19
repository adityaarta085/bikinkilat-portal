'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, Coins, Sparkles, Loader2, Copy, Check, RefreshCw, AlertCircle, User as UserIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOKEN_PACKAGES } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';
import { getOrCreateGuestId } from '@/lib/user-session';

interface CashierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (addedTokens: number) => void;
}

const GATEWAY_URL = 'https://bikinkilat-gateway.adityaarta085.workers.dev';

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
  const { user, openAuthModal, tokens } = useAuth();
  const currentUserId = user?.id || (typeof window !== 'undefined' ? getOrCreateGuestId() : '');
  const [selectedPkg, setSelectedPkg] = useState(TOKEN_PACKAGES[1]); // Default 25 tokens
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrisData, setQrisData] = useState<QrisResponse | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');
  const [countdown, setCountdown] = useState(900);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasCopiedAmount, setHasCopiedAmount] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const pollIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  // Countdown timer
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
    if (!qrisData || isSuccess) return;

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
        // Silent on polling blip
      }
    }, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [qrisData, isSuccess, selectedPkg, currentUserId]);

  const triggerSuccess = (transactionId: string, tokens: number) => {
    setTxId(transactionId);
    setIsSuccess(true);
    onPaymentSuccess(tokens);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const handleGenerateQris = async () => {
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
          userId: currentUserId,
          returnUrl: 'https://bikinkilat.com',
        }),
      });

      const data = await res.json();
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

  const handleSimulatePayment = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch(`${GATEWAY_URL}/api/payment/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokens: selectedPkg.tokens,
          amount: selectedPkg.price,
          packageName: selectedPkg.label,
          userId: currentUserId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        triggerSuccess(data.transactionId, selectedPkg.tokens);
      } else {
        setErrorMessage('Gagal memproses pembayaran.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi kasir.');
    } finally {
      setIsSimulating(false);
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
    setIsSimulating(false);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cashier-modal-title"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
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
          {!isSuccess ? (
            <div className="space-y-6">
              {/* Account Status Ribbon */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800">
                      {user ? user.email : 'Sesi Pengguna Aktif'}
                    </span>
                    <span className="text-slate-500 block">
                      Saldo aktif: <strong className="text-indigo-600">{tokens} Token</strong>
                    </span>
                  </div>
                </div>
                {!user && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openAuthModal();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] border border-indigo-200 transition-colors"
                  >
                    Masuk Akun
                  </button>
                )}
              </div>

              {/* Package selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
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
                            ? 'border-indigo-600 bg-indigo-50/60 shadow-sm ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded-md bg-indigo-600 text-white text-[10px] font-bold">
                            Populer
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-slate-900 font-extrabold text-base mb-1">
                          <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>{pkg.tokens}</span>
                        </div>
                        <div className="text-xs font-semibold text-indigo-600 mb-0.5">
                          Rp {pkg.price.toLocaleString('id-ID')}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          {pkg.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* QRIS Dynamic Display */}
              {qrisData ? (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Standar Bank Indonesia (ASPI)</span>
                    </div>
                    <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Kedaluwarsa: {formatTimer(countdown)}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm space-y-2">
                    {qrisData.qris_image_base64 || qrisData.qris_image_url ? (
                      <img
                        src={qrisData.qris_image_base64 || qrisData.qris_image_url}
                        alt="QRIS Dinamis"
                        className="w-52 h-52 object-contain"
                      />
                    ) : (
                      <div className="w-52 h-52 flex items-center justify-center bg-slate-100 rounded">
                        <QrCode className="w-24 h-24 text-slate-400" />
                      </div>
                    )}

                    <div className="text-center w-full pt-1">
                      <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Transfer:</span>
                      <div className="flex items-center justify-center gap-2 mt-0.5">
                        <span className="text-xl font-black font-mono text-slate-900">
                          Rp {Math.round(Number(qrisData.amount)).toLocaleString('id-ID')}
                        </span>
                        <button
                          onClick={copyAmount}
                          className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs transition"
                          title="Salin nominal"
                        >
                          {hasCopiedAmount ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-[11px] text-amber-700 bg-amber-50 rounded-lg p-2 mt-2 leading-relaxed border border-amber-200">
                        Pastikan mentransfer nominal persis termasuk kode unik #{qrisData.unique_id} agar langsung aktif seketika.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                    <span>Mendeteksi Pembayaran Otomatis...</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                  <div className="w-16 h-16 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-indigo-600">
                    <QrCode className="w-10 h-10" />
                  </div>
                  <div className="text-xs text-slate-600">
                    <p className="font-bold text-slate-900 mb-0.5">Mendukung Seluruh Saluran Pembayaran</p>
                    <p className="text-[11px] text-slate-500 mb-1.5">
                      BCA, Mandiri Livin, BRImo, BNI, GoPay, OVO, DANA, ShopeePay & LinkAja.
                    </p>
                    <div className="flex items-center gap-1.5 text-indigo-700 font-semibold text-[11px]">
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
                ) : null}

                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isSimulating}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isSimulating ? 'Memproses Simulasi...' : 'Simulasi Bayar Kilat (Mode Uji Coba Tanpa Biaya)'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Pembayaran Berhasil!</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Saldo Anda bertambah <span className="font-bold text-emerald-600">+{selectedPkg.tokens} Token</span>.
                </p>
                {txId && (
                  <p className="text-xs font-mono text-slate-400 mt-2 bg-slate-100 py-1 px-3 rounded-lg inline-block">
                    Ref ID: {txId.slice(0, 8)}...
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={resetModal}
                className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all duration-200"
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
