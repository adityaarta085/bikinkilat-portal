'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Coins, Zap, PlusCircle, User, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface NavbarProps {
  tokens?: number;
  onOpenCashier?: () => void;
}

export function Navbar({ tokens: propTokens, onOpenCashier }: NavbarProps) {
  const { user, profile, tokens: authTokens, openAuthModal, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTokens = typeof propTokens === 'number' ? propTokens : authTokens;

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenCashier = () => {
    if (onOpenCashier) {
      onOpenCashier();
    } else {
      window.location.href = '/#kasir';
    }
  };

  const displayName = profile?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna';
  const displayEmail = profile?.email || user?.email || '';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                BikinKilat<span className="text-indigo-600">.com</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Portal Ekosistem
              </span>
            </div>
          </Link>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#layanan" className="hover:text-indigo-600 transition-colors">
            9 Layanan
          </Link>
          <Link href="/#kasir" className="hover:text-indigo-600 transition-colors">
            Tarif & Paket Token
          </Link>
          <Link href="/#riwayat" className="hover:text-indigo-600 transition-colors">
            Riwayat Transaksi
          </Link>
        </nav>

        {/* Right Section: Tokens & Auth */}
        <div className="flex items-center gap-3">
          {/* User Wallet Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-indigo-900 text-xs sm:text-sm font-bold shadow-sm">
            <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{activeTokens} Token</span>
          </div>

          {/* Top-up Button */}
          <button
            onClick={handleOpenCashier}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Top-Up QRIS</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition"
                aria-expanded={isDropdownOpen}
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="w-8 h-8 rounded-full object-cover border border-indigo-200"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-none truncate max-w-[120px]">
                    {displayName}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-none mt-0.5 truncate max-w-[120px]">
                    {displayEmail}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800 truncate">{displayName}</p>
                    <p className="text-[11px] text-slate-400 truncate">{displayEmail}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                      <Coins className="w-3 h-3 text-amber-600 fill-amber-600" />
                      <span>{activeTokens} Token Aktif</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleOpenCashier();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg flex items-center gap-2 transition"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Beli Token Tambahan</span>
                    </button>
                    <Link
                      href="/#riwayat"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg flex items-center gap-2 transition"
                    >
                      <Zap className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Riwayat Pemakaian & Transaksi</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>Keluar dari Akun</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition active:scale-95"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Masuk</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
