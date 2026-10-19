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
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden pointer-events-none">
      <div className="max-w-md mx-auto bg-white/90 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_8px_32px_rgba(15,23,42,0.12)] rounded-2xl p-1.5 flex items-center justify-around pointer-events-auto ring-1 ring-slate-900/[0.04] dark:ring-white/[0.05] transition-colors">
        
        {/* Nav item 1: Layanan */}
        <Link
          href="/#layanan"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white active:bg-slate-100 dark:active:bg-slate-800 transition"
        >
          <Layers className="w-4 h-4 mb-0.5 text-slate-700 dark:text-slate-300" />
          <span className="text-[10px] font-bold">Layanan</span>
        </Link>

        {/* Nav item 2: Dashboard or Studio */}
        {user ? (
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 active:bg-slate-100 dark:active:bg-slate-800 transition"
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] font-bold">Dashboard</span>
          </Link>
        ) : (
          <Link
            href="/#live-preview"
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white active:bg-slate-100 dark:active:bg-slate-800 transition"
          >
            <Presentation className="w-4 h-4 mb-0.5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-[10px] font-bold">Studio</span>
          </Link>
        )}

        {/* Action item: Top-Up QRIS */}
        <button
          type="button"
          onClick={onOpenCashier}
          className="flex items-center gap-1.5 py-1.5 px-3 bg-indigo-600 active:bg-indigo-700 text-white rounded-xl shadow-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-[11px] font-bold whitespace-nowrap">Top-Up</span>
        </button>

        {/* Theme Toggle on mobile dock */}
        <ThemeToggle className="w-8 h-8 rounded-lg" />

        {/* Nav item 3: Token Wallet / History */}
        <Link
          href={user ? "/dashboard" : "/#riwayat"}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white active:bg-slate-100 dark:active:bg-slate-800 transition"
        >
          <div className="flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">{tokens}</span>
          </div>
          <span className="text-[9px] font-semibold text-slate-500 dark:text-slate-400">Saldo</span>
        </Link>

      </div>
    </div>
  );
}

export default MobileQuickDock;
