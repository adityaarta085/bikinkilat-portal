'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
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
import { InfiniteMarquee } from '@/components/InfiniteMarquee';
import { MagneticButton } from '@/components/MagneticButton';
import { EditorialProjectDeck } from '@/components/EditorialProjectDeck';
import { TOKEN_PACKAGES } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  ArrowRight, 
  HelpCircle,
  QrCode,
  LayoutDashboard,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

export default function PortalHomePage() {
  const { tokens, setTokens, user, refreshTokens, openAuthModal } = useAuth();
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [lastTxUpdated, setLastTxUpdated] = useState<number>(Date.now());

  // Scroll reveals for sections
  const { ref: heroMetricsRef, isVisible: isMetricsVisible } = useScrollReveal({ threshold: 0.1 });

  // Animated Count-Up Metrics
  const animatedAppsCount = useCountUp({ end: 9, duration: 1000, enabled: isMetricsVisible });
  const animatedPercentFormat = useCountUp({ end: 100, duration: 1200, enabled: isMetricsVisible });

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

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar tokens={tokens} onOpenCashier={handleOpenCashier} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-20 pb-24 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        {/* Subtle Ambient Light with Gentle Aurora Drift */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[560px] bg-gradient-to-b from-indigo-100/40 via-sky-50/25 to-transparent dark:from-indigo-950/30 dark:via-sky-950/20 dark:to-transparent pointer-events-none -z-10 blur-3xl animate-aurora" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Minimalist Editorial Metadata (Emotion Agency Style) */}
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              <span>[ EKOSISTEM DOKUMEN DIGITAL INDONESIA ]</span>
              <span>•</span>
              <span className="text-indigo-600 dark:text-indigo-400">9 SPESIALISASI TERPADU</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
              Selesaikan Tugas &amp; Dokumen{' '}
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
                <MagneticButton strength={14}>
                  <Link
                    href="/dashboard"
                    data-cursor="DASHBOARD"
                    className="px-7 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 active:bg-indigo-800 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center gap-2 group ring-1 ring-indigo-500/20"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Buka Dashboard Saya</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
              ) : null}

              <MagneticButton strength={16}>
                <a
                  href="#live-preview"
                  data-cursor="STUDIO"
                  className="relative overflow-hidden px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 active:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-sm shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-2 group ring-1 ring-slate-900/10 dark:ring-white/20"
                >
                  <div className="absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <span>Coba Live Studio Preview</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </MagneticButton>

              <MagneticButton strength={12}>
                <button
                  type="button"
                  data-cursor="TOP-UP"
                  onClick={handleOpenCashier}
                  className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:scale-95 active:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 text-slate-800 border border-slate-200/90 dark:border-slate-800 font-bold text-sm shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 flex items-center gap-2 ring-1 ring-slate-900/[0.02]"
                >
                  <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:rotate-6 transition-transform" />
                  <span>Top-Up Token (QRIS Instan)</span>
                </button>
              </MagneticButton>
            </div>

            {/* Metrics Ribbon with Dynamic Rolling Numbers */}
            <div 
              ref={heroMetricsRef}
              className={`pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-200/70 dark:border-slate-800 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMetricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03] hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {animatedAppsCount}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Layanan Spesialis</div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03] hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1 Dompet</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Terintegrasi Antar-Layanan</div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03] hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">QRIS</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Otomatisasi Tanpa Admin</div>
              </div>
              <div className="p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03] hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {animatedPercentFormat}%
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Standar Format Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Kinetic Marquee (Emotion Agency Style) */}
      <InfiniteMarquee />

      {/* Flagship Interactive Document Studio Showcase */}
      <div id="live-preview">
        <InteractiveShowcase />
      </div>

      {/* Interactive Editorial Project Deck & Catalog (Emotion Agency Style) */}
      <EditorialProjectDeck />

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
        {/* Subtle Ambient Light with Aurora */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-indigo-50/40 via-sky-50/30 to-transparent dark:from-indigo-950/20 dark:via-sky-950/15 dark:to-transparent blur-3xl pointer-events-none -z-10 animate-aurora" />

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-6 mb-16 overflow-visible">
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
          <div className="max-w-5xl mx-auto -mt-6 mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-800/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 hover:border-indigo-700/80 transition-all duration-300">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
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
              className="px-7 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 active:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 shrink-0 min-h-[48px] group"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
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
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Apakah token yang saya beli di bikinkilat.web.id bisa dipakai di slide.bikinkilat.web.id?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Ya, sistem BikinKilat menggunakan satu dompet token terpadu. Token yang Anda beli di kasir otomatis tersinkronisasi langsung ke seluruh layanan tanpa perlu login ulang.
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200">
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Format file apa saja yang bisa diunduh?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Setiap layanan menghasilkan file dokumen asli yang dapat diedit bebas: PowerPoint (.pptx), Microsoft Word (.docx), Excel (.xlsx), PDF, dan Markdown (.md), bukan sekadar screenshot atau teks web.
            </p>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200">
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
