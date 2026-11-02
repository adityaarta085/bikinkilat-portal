'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Coins, 
  ArrowRight, 
  User as UserIcon, 
  Clock, 
  ShieldCheck, 
  Heart,
  Presentation,
  BookOpen,
  FileText
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface CashierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess?: (addedTokens: number) => void;
}

export function CashierModal({ isOpen, onClose }: CashierModalProps) {
  const { user, openAuthModal, tokens, signInWithGoogle } = useAuth();
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);

  const handleDirectGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error('Google Sign-In Error:', e);
      setIsLoggingInGoogle(false);
      openAuthModal();
    }
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
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center border border-amber-400/30 text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 id="cashier-modal-title" className="text-lg font-bold">
                Akses Layanan 100% Gratis
              </h2>
              <p className="text-xs text-indigo-200">Kuota Harian Otomatis untuk Seluruh Indonesia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            aria-label="Tutup jendela informasi kuota"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!user ? (
            /* Mandatory Login Gate View */
            <div className="text-center py-4 px-2 space-y-5 animate-in fade-in duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                  Gratis Tanpa Biaya
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-3 mb-2 tracking-tight">
                  Klaim 20 Kuota Gratis Harian
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Semua kasir dan pembayaran telah dinonaktifkan. Cukup masuk dengan akun Google Anda untuk langsung menikmati 20 generasi dokumen gratis setiap hari.
                </p>
              </div>

              {/* Verified Benefits */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>20 kuota gratis harian otomatis masuk ke akun Anda</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Otomatis diisi ulang kembali setiap pukul 00:00 WIB</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Berlaku langsung di Slide, Modul, CV, RAB, Surat, dll.</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 max-w-sm mx-auto pt-2">
                <button
                  type="button"
                  onClick={handleDirectGoogleLogin}
                  disabled={isLoggingInGoogle}
                  className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Masuk dengan Google (Klaim 20 Kuota)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    openAuthModal();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  Pilihan Masuk Lainnya (Email OTP)
                </button>
              </div>
            </div>
          ) : (
            /* Logged-In Quota Status View */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Account Status Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-emerald-50/40 dark:from-indigo-950/40 dark:to-emerald-950/20 border border-indigo-200/80 dark:border-indigo-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{user.email}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Akun Resmi BikinKilat</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] uppercase border border-emerald-300 dark:border-emerald-800">
                    Akses 100% Gratis
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Kuota Harian Aktif:</span>
                  <div className="flex items-center gap-1.5 font-black text-lg text-indigo-700 dark:text-indigo-400">
                    <Coins className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span>{tokens} Kuota Tersedia</span>
                  </div>
                </div>
              </div>

              {/* Reset Schedule Info */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Jadwal Pengisian Ulang Kuota</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                  Kuota gratis Anda otomatis terisi ulang kembali menjadi <strong>20 kuota</strong> setiap hari pada pukul <strong>00:00 WIB (Tengah Malam)</strong>. Semua kasir dan metode pembayaran berbayar telah dinonaktifkan.
                </p>
              </div>

              {/* Quick Launch Buttons */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Mulai Gunakan Layanan Gratis:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href="https://slide.bikinkilat.web.id"
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-800/80 flex flex-col items-center text-center transition group shadow-2xs"
                  >
                    <Presentation className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Slide PPTX</span>
                    <span className="text-[10px] text-slate-400">2 Kuota / Proyek</span>
                  </a>

                  <a
                    href="https://modul.bikinkilat.web.id"
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-800/80 flex flex-col items-center text-center transition group shadow-2xs"
                  >
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Modul Guru</span>
                    <span className="text-[10px] text-slate-400">2 Kuota / Modul</span>
                  </a>

                  <a
                    href="https://cv.bikinkilat.web.id"
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-800/80 flex flex-col items-center text-center transition group shadow-2xs"
                  >
                    <FileText className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">CV ATS</span>
                    <span className="text-[10px] text-slate-400">1 Kuota / Resume</span>
                  </a>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm transition shadow-sm"
              >
                Tutup & Lanjutkan Kerja
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CashierModal;
