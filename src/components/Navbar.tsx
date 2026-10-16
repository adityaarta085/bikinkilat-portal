'use client';

import React from 'react';
import { Coins, Zap, ShieldCheck, PlusCircle } from 'lucide-react';

interface NavbarProps {
  tokens: number;
  onOpenCashier: () => void;
}

export function Navbar({ tokens, onOpenCashier }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                BikinKilat<span className="text-indigo-600">.id</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Portal Ekosistem
              </span>
            </div>
          </a>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#layanan" className="hover:text-indigo-600 transition-colors">
            9 Layanan
          </a>
          <a href="#kasir" className="hover:text-indigo-600 transition-colors">
            Tarif & Paket Token
          </a>
          <a href="#riwayat" className="hover:text-indigo-600 transition-colors">
            Riwayat Transaksi
          </a>
        </nav>

        {/* User Wallet & Top-up */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-900 text-sm font-bold shadow-sm">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{tokens} Token</span>
          </div>

          <button
            onClick={onOpenCashier}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Top-Up QRIS</span>
            <span className="sm:hidden">Top-Up</span>
          </button>
        </div>
      </div>
    </header>
  );
}
