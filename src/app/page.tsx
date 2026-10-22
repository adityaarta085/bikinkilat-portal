'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { EcosystemCard } from '@/components/EcosystemCard';
import { CashierModal } from '@/components/CashierModal';
import { TransactionHistory } from '@/components/TransactionHistory';
import { InteractiveShowcase } from '@/components/InteractiveShowcase';
import { EnterpriseBento } from '@/components/EnterpriseBento';
import { QuickWorkflow } from '@/components/QuickWorkflow';
import { InteractiveComparison } from '@/components/InteractiveComparison';
import { EfficiencyCalculator } from '@/components/EfficiencyCalculator';
import { MobileQuickDock } from '@/components/MobileQuickDock';
import { Footer } from '@/components/Footer';
import { AnimatedPricingCard } from '@/components/AnimatedPricingCard';
import { ECOSYSTEM_APPS, TOKEN_PACKAGES } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';
import { 
  Coins, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  QrCode,
  Search,
  X,
  LayoutDashboard,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export default function PortalHomePage() {
  const { tokens, setTokens, user, refreshTokens, openAuthModal } = useAuth();
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [lastTxUpdated, setLastTxUpdated] = useState<number>(Date.now());
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handlePaymentSuccess = (addedTokens: number) => {
    setTokens((prev) => prev + addedTokens);
    setLastTxUpdated(Date.now());
    refreshTokens();
  };

  const handleOpenCashier = () => {
    if (!user) {
      window.location.href = '/auth?returnUrl=/kasir';
    } else {
      window.location.href = '/kasir';
    }
  };

  const categories = ['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal', 'Kreatif'];

  const filteredApps = ECOSYSTEM_APPS.filter((app) => {
    const matchesCategory = activeCategory === 'Semua' || app.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.subdomain.toLowerCase().includes(q) ||
      app.outputFormats.some(f => f.toLowerCase().includes(q)) ||
      app.features.some(f => f.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar tokens={tokens} onOpenCashier={handleOpenCashier} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-20 pb-24 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        {/* Apple Refractive Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-indigo-100/35 via-sky-50/20 to-transparent dark:from-indigo-950/25 dark:via-sky-950/15 dark:to-transparent pointer-events-none -z-10 blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge Announcement */}
            <Link
              href="/catatan-rilis"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/90 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs transition group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
              <span>Rilis v2.4: PPT Widescreen &amp; Pratinjau Mobile Aktif</span>
              <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center">
                Log Rilis →
              </span>
            </Link>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Selesaikan Tugas & Dokumen{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800 dark:from-indigo-400 dark:via-indigo-300 dark:to-sky-400">
                10x Lebih Kilat
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
              Akses 9 platform otomasi cerdas berstandar profesional di Indonesia. 
              Gunakan 1 akun dan 1 saldo token terpadu untuk generate slide PowerPoint, makalah akademik, modul ajar, hingga dokumen hukum sah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center gap-2 group ring-1 ring-indigo-500/20"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Buka Dashboard Saya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : null}

              <a
                href="#live-preview"
                className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center gap-2 group ring-1 ring-slate-900/10 dark:ring-white/20"
              >
                <span>Coba Live Studio Preview</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={handleOpenCashier}
                className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 text-slate-800 border border-slate-200/90 dark:border-slate-800 font-bold text-sm shadow-2xs transition-all duration-200 flex items-center gap-2 ring-1 ring-slate-900/[0.02]"
              >
                <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Top-Up Token (QRIS Instan)</span>
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-200/70 dark:border-slate-800">
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">9</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Layanan Spesialis</div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1 Dompet</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Terintegrasi Antar-Layanan</div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">QRIS</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Otomatisasi Tanpa Admin</div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Standar Format Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Interactive Document Studio Showcase */}
      <div id="live-preview">
        <InteractiveShowcase />
      </div>

      {/* Ecosystem Apps Grid */}
      <section id="layanan" className="py-20 bg-slate-50/50 dark:bg-slate-950/50 border-b border-slate-200/80 dark:border-slate-800 relative transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Layers className="w-4 h-4" />
                <span>Katalog Lengkap Layanan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Pilih Layanan Sesuai Kebutuhan Anda
              </h2>
            </div>

            {/* Search Input & Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px] sm:min-w-[280px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari layanan (slide, cv, modul)..."
                  className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills (Apple Segmented Group) */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      activeCategory === cat
                        ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Result Count or Feedback */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span>
                Menampilkan hasil untuk &ldquo;<strong className="text-slate-800 dark:text-white">{searchQuery}</strong>&rdquo; ({filteredApps.length} layanan ditemukan)
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Reset pencarian
              </button>
            </div>
          )}

          {/* Cards Grid */}
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <EcosystemCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Layanan Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Tidak ada layanan yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo; dalam kategori {activeCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-bold transition shadow-xs"
              >
                Tampilkan Semua 9 Layanan
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Architecture & Standards Bento Grid */}
      <EnterpriseBento />

      {/* 3-Step Simple Workflow */}
      <QuickWorkflow />

      {/* Interactive Comparison: Cara Lama vs BikinKilat */}
      <InteractiveComparison />

      {/* Interactive Efficiency & Cost Savings Calculator */}
      <EfficiencyCalculator onOpenCashier={handleOpenCashier} />

      {/* Unified Cashier & Token Packages Section */}
      <section id="kasir" className="py-24 bg-white dark:bg-slate-950 border-y border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors">
        {/* Subtle Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-indigo-50/40 via-sky-50/30 to-transparent dark:from-indigo-950/20 dark:via-sky-950/15 dark:to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 px-3.5 py-1 rounded-full shadow-2xs">
              Tarif Transparan & Terjangkau
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
              1 Dompet Token untuk Semua Subdomain
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Token yang Anda beli di portal utama ini otomatis terbaca di seluruh layanan: 
              slide.bikinkilat.web.id, modul.bikinkilat.web.id, cv.bikinkilat.web.id, dan lainnya.
            </p>
          </div>

          {/* Pricing Cards (Apple Liquid Glass Cards with Strike-Through Animation) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {TOKEN_PACKAGES.map((pkg, idx) => (
              <AnimatedPricingCard
                key={pkg.id}
                pkg={pkg}
                index={idx}
                onSelect={handleOpenCashier}
              />
            ))}
          </div>

          {/* Custom Nominal Flexible Top-Up Banner */}
          <div className="max-w-5xl mx-auto -mt-6 mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-800/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Fitur Baru: Top-Up Bebas Fleksibel</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Ingin Nominal Berapapun? Minimal Hanya Rp 10.000!
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl leading-relaxed">
                Tentukan anggaran Anda sendiri tanpa terpaku paket. Dapatkan bonus ekstra token bertingkat hingga +50% dengan kalkulator transparan di Kasir Resmi kami.
              </p>
            </div>

            <Link
              href="/kasir"
              className="px-7 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 shrink-0 min-h-[48px]"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-950" />
              <span>Atur Nominal di Kasir →</span>
            </Link>
          </div>

          {/* Transaction History Section */}
          <div id="riwayat" className="max-w-4xl mx-auto">
            <TransactionHistory lastUpdated={lastTxUpdated} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pertanyaan Seputar Ekosistem BikinKilat
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Apakah token yang saya beli di bikinkilat.web.id bisa dipakai di slide.bikinkilat.web.id?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Ya, sistem BikinKilat menggunakan satu dompet token terpadu. Token yang Anda beli di kasir otomatis tersinkronisasi langsung ke seluruh layanan tanpa perlu login ulang.
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Format file apa saja yang bisa diunduh?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Setiap layanan menghasilkan file dokumen asli yang dapat diedit bebas: PowerPoint (.pptx), Microsoft Word (.docx), Excel (.xlsx), PDF, dan Markdown (.md), bukan sekadar screenshot atau teks web.
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Bagaimana jika proses pembayaran QRIS mengalami kendala?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Pembayaran diproses secara instan dan aman. Begitu transfer berhasil diverifikasi oleh bank atau e-wallet Anda, saldo token langsung bertambah otomatis dalam hitungan detik.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Floating Quick Dock for 1-Thumb Fast Access */}
      <MobileQuickDock tokens={tokens} onOpenCashier={handleOpenCashier} />

      {/* Cashier Modal */}
      <CashierModal
        isOpen={isCashierOpen}
        onClose={() => setIsCashierOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
