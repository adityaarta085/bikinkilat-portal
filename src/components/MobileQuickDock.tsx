'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, Presentation, PlusCircle, History, Coins } from 'lucide-react';

interface MobileQuickDockProps {
  tokens?: number;
  onOpenCashier: () => void;
}

export function MobileQuickDock({ tokens = 0, onOpenCashier }: MobileQuickDockProps) {
  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden pointer-events-none">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_8px_32px_rgba(15,23,42,0.12)] rounded-2xl p-1.5 flex items-center justify-around pointer-events-auto ring-1 ring-slate-900/[0.04]">
        
        {/* Nav item 1: Layanan */}
        <Link
          href="#layanan"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 hover:text-slate-900 active:bg-slate-100 transition"
        >
          <Layers className="w-4 h-4 text-slate-700 mb-0.5" />
          <span className="text-[10px] font-bold">Layanan</span>
        </Link>

        {/* Nav item 2: Live Studio */}
        <Link
          href="#live-preview"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-slate-600 hover:text-slate-900 active:bg-slate-100 transition"
        >
          <Presentation className="w-4 h-4 text-indigo-600 mb-0.5" />
          <span className="text-[10px] font-bold">Studio</span>
        </Link>

        {/* Action item: Top-Up QRIS */}
        <button
          type="button"
          onClick={onOpenCashier}
          className="flex items-center gap-1.5 py-1.5 px-3 bg-indigo-600 active:bg-indigo-700 text-white rounded-xl shadow-xs transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-[11px] font-bold whitespace-nowrap">Top-Up</span>
        </button>

        {/* Nav item 3: Token Wallet / History */}
        <Link
          href="#riwayat"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-700 hover:text-slate-900 active:bg-slate-100 transition"
        >
          <div className="flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-[11px] font-extrabold text-slate-900">{tokens}</span>
          </div>
          <span className="text-[9px] font-semibold text-slate-500">Saldo</span>
        </Link>

      </div>
    </div>
  );
}

export default MobileQuickDock;
