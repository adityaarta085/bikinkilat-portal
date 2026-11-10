'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  Sparkles, 
  Coins, 
  Clock, 
  Presentation,
  BookOpen,
  FileText,
  ArrowRight,
  User as UserIcon,
  ShieldCheck,
  CheckCircle2
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
        aria-labelledby="quota-modal-title"
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center border border-amber-400/30 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="quota-modal-title" className="text-sm font-bold">
                Alokasi Kuota Akses Dokumen
              </h2>
              <p className="text-[10px] text-indigo-200">Layanan Publik 100% Bebas Biaya (Rp 0)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            aria-label="Tutup modal"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {!user ? (
            /* Guest State */
            <div className="text-center py-2 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center mx-auto text-amber-500">
                <Coins className="w-6 h-6 fill-amber-400" />
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  20 Alokasi Kuota Harian Gratis
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Masuk dengan akun Google untuk mengaktifkan alokasi 20 kuota dokumen gratis Anda hari ini.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDirectGoogleLogin}
                disabled={isLoggingInGoogle}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Masuk dengan Google</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Logged-in State */
            <div className="space-y-4">
              {/* Balance card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block max-w-[160px]">
                      {user.email}
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Akun Aktif</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                    {tokens}
                  </div>
                  <span className="text-[10px] text-slate-400 block">Kuota Tersedia</span>
                </div>
              </div>

              {/* Reset notice */}
              <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800 flex items-center gap-2.5 text-xs text-indigo-900 dark:text-indigo-200">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Otomatis terisi ulang ke 20 kuota setiap pukul 00:00 WIB</span>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <a
                  href="https://slide.bikinkilat.web.id"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition"
                >
                  <Presentation className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <span className="font-bold text-[11px] block">Slide</span>
                  <span className="text-[9px] text-slate-400">2 Kuota</span>
                </a>
                <a
                  href="https://modul.bikinkilat.web.id"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition"
                >
                  <BookOpen className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                  <span className="font-bold text-[11px] block">Modul</span>
                  <span className="text-[9px] text-slate-400">2 Kuota</span>
                </a>
                <a
                  href="https://cv.bikinkilat.web.id"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 transition"
                >
                  <FileText className="w-4 h-4 text-cyan-500 mx-auto mb-1" />
                  <span className="font-bold text-[11px] block">CV ATS</span>
                  <span className="text-[9px] text-slate-400">1 Kuota</span>
                </a>
              </div>

              {/* Capacity Guide Link */}
              <Link
                href="/kapasitas"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>Lihat Panduan Kapasitas Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CashierModal;
