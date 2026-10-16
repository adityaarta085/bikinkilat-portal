'use client';

import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, QrCode, Coins, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOKEN_PACKAGES } from '@/lib/ecosystem';

interface CashierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (addedTokens: number) => void;
}

export function CashierModal({ isOpen, onClose, onPaymentSuccess }: CashierModalProps) {
  const [selectedPkg, setSelectedPkg] = useState(TOKEN_PACKAGES[1]); // Default 25 tokens
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const handleSimulatePayment = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPkg.id,
          tokens: selectedPkg.tokens,
          amount: selectedPkg.price,
          packageName: selectedPkg.label,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setTxId(data.transactionId);
        setIsSuccess(true);
        onPaymentSuccess(selectedPkg.tokens);

        // Confetti effect
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore if canvas-confetti fails
        }
      } else {
        alert('Gagal memproses pembayaran: ' + data.error);
      }
    } catch (err: any) {
      alert('Terjadi kesalahan koneksi kasir.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetModal = () => {
    setIsSuccess(false);
    setTxId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="cashier-modal-title"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <QrCode className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 id="cashier-modal-title" className="text-lg font-bold">Kasir QRIS Terpadu</h2>
              <p className="text-xs text-indigo-200">BikinKilat.id Centralized Wallet</p>
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
        <div className="p-6">
          {!isSuccess ? (
            <div className="space-y-6">
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
                        onClick={() => setSelectedPkg(pkg)}
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

              {/* QRIS Graphic / Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-2 rounded-xl border border-slate-200 flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <div className="w-full h-full bg-slate-900 rounded grid grid-cols-4 gap-0.5 p-1">
                    <div className="bg-white rounded-sm col-span-2 row-span-2"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm"></div>
                    <div className="bg-white rounded-sm col-span-2 row-span-2"></div>
                  </div>
                </div>
                <div className="text-xs text-slate-600">
                  <p className="font-bold text-slate-900 mb-1">Mendukung Seluruh Saluran QRIS</p>
                  <p className="text-[11px] text-slate-500 mb-2">
                    BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay & LinkAja.
                  </p>
                  <div className="flex items-center gap-1.5 text-indigo-700 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verifikasi pembayaran otomatis seketika</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleSimulatePayment}
                  disabled={isLoading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>
                        Simulasi Bayar Rp {selectedPkg.price.toLocaleString('id-ID')} (QRIS Lunas)
                      </span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-400">
                  Sistem otomatis mengkreditkan {selectedPkg.tokens} token ke dompet terpusat Anda.
                </p>
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
