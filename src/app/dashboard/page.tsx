'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Coins, 
  PlusCircle, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Copy, 
  Check, 
  ArrowLeft, 
  LogOut, 
  Layers,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { CashierModal } from '@/components/CashierModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Footer } from '@/components/Footer';
import { BrandLogo } from '@/components/BrandLogo';
import { ECOSYSTEM_APPS } from '@/lib/ecosystem';

interface TransactionItem {
  id: string;
  package_name?: string;
  amount_idr?: number;
  amount?: number;
  tokens_added?: number;
  status: string;
  created_at: string;
}

export default function UserDashboardPage() {
  const { user, profile, tokens, setTokens, refreshTokens, signOut, openAuthModal, isLoading } = useAuth();
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [isLoadingTx, setIsLoadingTx] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchTransactions(user.id);
    }
  }, [user?.id]);

  const fetchTransactions = async (userId: string) => {
    setIsLoadingTx(true);
    try {
      const res = await fetch(`/api/transactions?userId=${encodeURIComponent(userId)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.transactions)) {
        setTransactions(data.transactions);
      }
    } catch (e) {
      console.warn('Failed to load user transactions:', e);
    } finally {
      setIsLoadingTx(false);
    }
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshTokens();
    if (user?.id) {
      await fetchTransactions(user.id);
    }
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleCopyUserId = () => {
    if (!user?.id) return;
    navigator.clipboard.writeText(user.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePaymentSuccess = (addedTokens: number) => {
    setTokens((prev) => prev + addedTokens);
    if (user?.id) {
      fetchTransactions(user.id);
    }
    refreshTokens();
  };

  const displayName = profile?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna BikinKilat';
  const displayEmail = profile?.email || user?.email || '';
  const avatarUrl = profile?.avatar_url || user?.user_metadata?.avatar_url;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Memuat Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col justify-between">
        {/* Minimal Nav */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between">
          <BrandLogo variant="horizontal" size="sm" href="/" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </header>

        {/* Login Gate Screen */}
        <div className="max-w-md mx-auto my-auto px-4 py-16 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Akses Dashboard Pengguna
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Silakan masuk dengan akun Google atau Email Anda untuk mengelola saldo token, membuka studio 9 subdomain, dan melihat riwayat faktur transaksi resmi Anda.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/auth?returnUrl=/dashboard"
              className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Masuk Akun Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-block text-xs font-semibold text-slate-500 dark:text-slate-400 hover:underline"
            >
              Kembali ke Beranda Utama
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.02)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BrandLogo variant="horizontal" badge="Dashboard" size="md" href="/" />
          </div>

          <div className="flex items-center gap-3">
            {/* Live Token Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-800 dark:text-white text-xs sm:text-sm font-bold shadow-xs">
              <Coins className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{tokens} Token</span>
            </div>

            {/* Quick Top-Up */}
            <button
              onClick={() => setIsCashierOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Top-Up QRIS</span>
            </button>

            {/* Global Theme Toggle */}
            <ThemeToggle />

            {/* Return to Home link */}
            <Link
              href="/"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>

            {/* Sign Out */}
            <button
              onClick={signOut}
              title="Keluar dari akun"
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-800 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-10">
        
        {/* Welcome Banner & Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* User Profile Card */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_24px_rgba(15,23,42,0.02)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-colors">
            <div className="flex items-center gap-4">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-200 dark:border-indigo-800 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {displayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Terverifikasi</span>
                  </span>
                  {user.email?.toLowerCase() === 'adityaarta085@gmail.com' && (
                    <a
                      href="https://admin.bikinkilat.web.id"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black shadow-xs transition"
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>Admin Command Center →</span>
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  {displayEmail}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 truncate max-w-[180px] sm:max-w-xs">
                    ID: {user.id}
                  </span>
                  <button
                    onClick={handleCopyUserId}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs"
                    title="Salin ID Pengguna"
                  >
                    {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Konektivitas Cloud:
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full">
                Sinkronisasi Akun Aktif
              </span>
            </div>
          </div>

          {/* Unified Wallet & Token Card */}
          <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/20 blur-2xl rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Dompet Token Terpadu
                </span>
                <button
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs transition"
                  title="Perbarui Saldo"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <div className="flex items-baseline gap-2 mb-2">
                <Coins className="w-8 h-8 text-amber-400 fill-amber-400 shrink-0" />
                <span className="text-4xl sm:text-5xl font-black tracking-tight">
                  {tokens}
                </span>
                <span className="text-sm font-semibold text-indigo-200">Token</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                Bisa digunakan di seluruh 9 layanan BikinKilat tanpa batas kedaluwarsa.
              </p>
            </div>

            <div className="pt-6">
              <Link
                href="/kasir"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Top-Up Token (Buka Kasir QRIS)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 9 Subdomain Micro-SaaS Launcher */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Layers className="w-4 h-4" />
                <span>Pusat 9 Layanan Dokumen</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                9 Studio Dokumen Siap Pakai
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Saldo {tokens} token Anda otomatis terbaca di setiap studio di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ECOSYSTEM_APPS.map((app) => (
              <div
                key={app.id}
                className="bg-white dark:bg-slate-900/90 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800 px-2 py-0.5 rounded-md">
                      {app.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Siap Produksi
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {app.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {app.outputFormats.map((fmt) => (
                      <span
                        key={fmt}
                        className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://${app.subdomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs transition flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-indigo-600"
                >
                  <span>Buka Studio {app.name.split(' ')[0]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Transaction History Section */}
        <section className="bg-white dark:bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] transition-colors">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Clock className="w-4 h-4" />
                <span>Catatan Mutasi</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Riwayat Transaksi QRIS Resmi
              </h3>
            </div>
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Muat Ulang</span>
            </button>
          </div>

          {isLoadingTx ? (
            <div className="py-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Memuat riwayat transaksi Anda...</span>
            </div>
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="pb-3 px-3">Tanggal</th>
                    <th className="pb-3 px-3">Paket Kuota</th>
                    <th className="pb-3 px-3">Nominal Bayar</th>
                    <th className="pb-3 px-3">Token</th>
                    <th className="pb-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-medium">
                        {new Date(tx.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">
                        {tx.package_name || 'Top-Up Token'}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                        Rp {(tx.amount_idr || tx.amount || 0).toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 font-extrabold text-amber-600 dark:text-amber-400">
                          <Coins className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          +{tx.tokens_added || 0}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          tx.status === 'paid' || tx.status === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                        }`}>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{tx.status === 'paid' || tx.status === 'success' ? 'Sukses' : tx.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
              <FileText className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm">Belum Ada Riwayat Transaksi</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto mb-4">
                Setiap pembayaran paket kuota token via QRIS akan otomatis tercatat dan tersimpan rapi di sini.
              </p>
              <Link
                href="/kasir"
                className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-xs hover:bg-indigo-700 transition"
              >
                Beli Paket Token Pertama
              </Link>
            </div>
          )}
        </section>

        {/* Security & Data Privacy Notice */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">
                Keamanan & Perlindungan Data Pribadi
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Sistem BikinKilat mematuhi UU PDP No. 27/2022 dengan enkripsi TLS 1.3 dan zero data retention.
              </span>
            </div>
          </div>
          <Link
            href="/kebijakan-privasi"
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline shrink-0"
          >
            Pelajari Kebijakan Privasi
          </Link>
        </div>

      </main>

      <Footer />

      {/* Cashier Modal */}
      <CashierModal
        isOpen={isCashierOpen}
        onClose={() => setIsCashierOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
