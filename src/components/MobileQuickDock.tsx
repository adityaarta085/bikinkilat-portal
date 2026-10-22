'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Presentation, PlusCircle, Coins, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { ThemeToggle } from '@/components/ThemeToggle';

interface MobileQuickDockProps {
  tokens?: number;
  onOpenCashier: () => void;
}

export function MobileQuickDock({ tokens = 0, onOpenCashier }: MobileQuickDockProps) {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden pointer-events-none pb-[env(safe-area-inset-bottom)]">
      <nav
        aria-label="Navigasi Cepat Ponsel"
        className="max-w-md mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_36px_rgba(15,23,42,0.18)] rounded-2xl p-1.5 flex items-center justify-around pointer-events-auto ring-1 ring-slate-900/[0.04] dark:ring-white/[0.06] transition-colors"
      >
        {/* Nav item 1: Layanan */}
        <Link
          href="/#layanan"
          className="flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-90 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-150"
        >
          <Layers className="w-4 h-4 mb-0.5 text-slate-700 dark:text-slate-300" />
          <span className="text-[10px] font-bold">Layanan</span>
        </Link>

        {/* Nav item 2: Dashboard or Studio */}
        {user ? (
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 active:scale-90 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-150"
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">Akun</span>
          </Link>
        ) : (
          <Link
            href="/#live-preview"
            className="flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white active:scale-90 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-150"
          >
            <Presentation className="w-4 h-4 mb-0.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-[10px] font-bold">Studio</span>
          </Link>
        )}

        {/* Action item: Top-Up QRIS */}
        <button
          type="button"
          onClick={onOpenCashier}
          className="relative overflow-hidden flex items-center gap-1.5 min-h-[44px] px-3.5 bg-indigo-600 hover:bg-indigo-700 active:scale-90 active:bg-indigo-800 text-white rounded-xl shadow-xs transition-all duration-150"
          aria-label="Isi ulang saldo token QRIS"
        >
          <div className="absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
          <PlusCircle className="w-4 h-4" />
          <span className="text-[11px] font-bold whitespace-nowrap">Top-Up</span>
        </button>

        {/* Theme Toggle on mobile dock */}
        <div className="flex items-center justify-center min-h-[44px] min-w-[44px]">
          <ThemeToggle className="w-9 h-9 rounded-xl active:scale-90 transition-transform" />
        </div>

        {/* Nav item 3: Token Wallet / History */}
        <Link
          href={user ? "/dashboard" : "/#riwayat"}
          className="flex flex-col items-center justify-center min-h-[44px] min-w-[48px] py-1 px-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white active:scale-90 active:bg-slate-100 dark:active:bg-slate-800 transition-all duration-150"
        >
          <div className="flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-extrabold text-slate-900 dark:text-white font-mono">{tokens}</span>
          </div>
          <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">Saldo</span>
        </Link>
      </nav>
    </div>
  );
}

export default MobileQuickDock;
