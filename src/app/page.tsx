'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { EcosystemCard } from '@/components/EcosystemCard';
import { CashierModal } from '@/components/CashierModal';
import { TransactionHistory } from '@/components/TransactionHistory';
import { InteractiveShowcase } from '@/components/InteractiveShowcase';
import { EnterpriseBento } from '@/components/EnterpriseBento';
import { EfficiencyCalculator } from '@/components/EfficiencyCalculator';
import { Footer } from '@/components/Footer';
import { ECOSYSTEM_APPS, TOKEN_PACKAGES, EcosystemApp } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';
import { 
  Zap, 
  Coins, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  HelpCircle,
  QrCode,
  Flame
} from 'lucide-react';

export default function PortalHomePage() {
  const { tokens, setTokens, user, refreshTokens } = useAuth();
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [lastTxUpdated, setLastTxUpdated] = useState<number>(Date.now());
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const handlePaymentSuccess = (addedTokens: number) => {
    setTokens((prev) => prev + addedTokens);
    setLastTxUpdated(Date.now());
    refreshTokens();
  };

  const categories = ['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal', 'Kreatif'];

  const filteredApps = activeCategory === 'Semua' 
    ? ECOSYSTEM_APPS 
    : ECOSYSTEM_APPS.filter(app => app.category === activeCategory);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar tokens={tokens} onOpenCashier={() => setIsCashierOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-24 border-b border-slate-200/80">
        {/* Apple Refractive Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-indigo-100/35 via-sky-50/20 to-transparent pointer-events-none -z-10 blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-slate-800 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Semua 9 Subdomain Siap Produksi • Real-Time Database Sync</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Selesaikan Tugas & Dokumen{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800">
                10x Lebih Kilat
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Akses 9 platform otomasi cerdas berstandar profesional di Indonesia. 
              Gunakan 1 akun dan 1 saldo token terpadu untuk generate slide PowerPoint, makalah akademik, modul ajar, hingga dokumen hukum sah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-3">
              <a
                href="#live-preview"
                className="px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center gap-2 group ring-1 ring-slate-900/10"
              >
                <span>Coba Live Studio Preview</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setIsCashierOpen(true)}
                className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 border border-slate-200/90 font-bold text-sm shadow-2xs transition-all duration-200 flex items-center gap-2 ring-1 ring-slate-900/[0.02]"
              >
                <QrCode className="w-4 h-4 text-indigo-600" />
                <span>Top-Up Token (QRIS Instan)</span>
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto border-t border-slate-200/70">
              <div className="p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02]">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">9</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Subdomain Micro-SaaS</div>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1 Dompet</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Terintegrasi Antar-Layanan</div>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02]">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">QRIS</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Otomatisasi Tanpa Admin</div>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.02)] ring-1 ring-slate-900/[0.02]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Standar Format Indonesia</div>
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
      <section id="layanan" className="py-20 bg-slate-50/50 border-b border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Layers className="w-4 h-4" />
                <span>Katalog Lengkap Layanan</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Pilih Layanan Sesuai Kebutuhan Anda
              </h2>
            </div>

            {/* Category Filter Pills (Apple Segmented Group) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 p-1 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <EcosystemCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture & Standards Bento Grid */}
      <EnterpriseBento />

      {/* Interactive Efficiency & Cost Savings Calculator */}
      <EfficiencyCalculator onOpenCashier={() => setIsCashierOpen(true)} />

      {/* Unified Cashier & Token Packages Section */}
      <section id="kasir" className="py-24 bg-white border-y border-slate-200/80 relative overflow-hidden">
        {/* Subtle Ambient Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-indigo-50/40 via-sky-50/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-200/80 px-3.5 py-1 rounded-full shadow-2xs">
              Tarif Transparan & Terjangkau
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
              1 Dompet Token untuk Semua Subdomain
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Token yang Anda beli di portal utama ini otomatis terbaca di seluruh layanan: 
              slide.bikinkilat.com, modul.bikinkilat.com, cv.bikinkilat.com, dan lainnya.
            </p>
          </div>

          {/* Pricing Cards (Apple Liquid Glass Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {TOKEN_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 bg-white/95 backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between ${
                  pkg.popular
                    ? 'border-indigo-600/90 ring-4 ring-indigo-500/10 shadow-[0_20px_50px_rgba(79,70,229,0.1)] -translate-y-1'
                    : 'border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.03)] hover:shadow-[0_20px_45px_rgba(15,23,42,0.06)] hover:-translate-y-1'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 text-white text-xs font-extrabold shadow-sm tracking-wide">
                    {pkg.badge}
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.label}</h3>
                  <p className="text-xs text-slate-500 mb-6 font-medium">{pkg.desc}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-100 mb-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                      <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{pkg.tokens} Token Terkredit Instan</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Berlaku permanen tanpa batas kedaluwarsa</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Bisa digunakan di seluruh 9 subdomain</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Download format asli (.pptx, .docx, .xlsx, .pdf)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCashierOpen(true)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-slate-900 hover:bg-slate-800 active:bg-black text-white shadow-xs ring-1 ring-slate-900/10'
                      : 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>Pilih Paket {pkg.tokens} Token</span>
                </button>
              </div>
            ))}
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
          <div className="flex items-center justify-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan Seputar Ekosistem BikinKilat
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 transition-all">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Apakah token yang saya beli di bikinkilat.com bisa dipakai di slide.bikinkilat.com?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Ya, sistem BikinKilat menggunakan satu dompet token terpadu. Token yang Anda beli di kasir otomatis tersinkronisasi langsung ke seluruh layanan tanpa perlu login ulang.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 transition-all">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Format file apa saja yang bisa diunduh?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Setiap layanan menghasilkan file dokumen asli yang dapat diedit bebas: PowerPoint (.pptx), Microsoft Word (.docx), Excel (.xlsx), PDF, dan Markdown (.md), bukan sekadar screenshot atau teks web.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:border-slate-300 transition-all">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Bagaimana jika proses pembayaran QRIS mengalami kendala?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Sistem kasir kami dilengkapi perlindungan idempoten dan webhook otomatis. Jika status pembayaran sudah sukses di aplikasi perbankan atau e-wallet Anda, saldo token akan langsung bertambah dalam hitungan detik.
            </p>
          </div>
        </div>
      </section>

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
