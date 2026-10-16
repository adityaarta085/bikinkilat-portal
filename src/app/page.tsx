'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { EcosystemCard } from '@/components/EcosystemCard';
import { CashierModal } from '@/components/CashierModal';
import { TransactionHistory } from '@/components/TransactionHistory';
import { Footer } from '@/components/Footer';
import { ECOSYSTEM_APPS, TOKEN_PACKAGES, EcosystemApp } from '@/lib/ecosystem';
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
  QrCode
} from 'lucide-react';

export default function PortalHomePage() {
  const [tokens, setTokens] = useState<number>(5);
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [lastTxUpdated, setLastTxUpdated] = useState<number>(Date.now());
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  // Load user wallet
  const fetchWallet = async () => {
    try {
      const res = await fetch('/api/wallet');
      const data = await res.json();
      if (data.success && typeof data.tokens === 'number') {
        setTokens(data.tokens);
      }
    } catch (e) {
      console.warn('Fallback to local wallet token state', e);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  const handlePaymentSuccess = (addedTokens: number) => {
    setTokens((prev) => prev + addedTokens);
    setLastTxUpdated(Date.now());
  };

  const categories = ['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal', 'Kreatif'];

  const filteredApps = activeCategory === 'Semua' 
    ? ECOSYSTEM_APPS 
    : ECOSYSTEM_APPS.filter(app => app.category === activeCategory);

  return (
    <div className="flex-1 flex flex-col">
      <Navbar tokens={tokens} onOpenCashier={() => setIsCashierOpen(true)} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200/80 text-indigo-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Ekosistem Micro-SaaS Otomasi Dokumen Indonesia</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Selesaikan Tugas & Dokumen{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800">
                10x Lebih Kilat
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Akses 9 platform otomasi cerdas berstandar profesional di Indonesia. 
              Gunakan 1 akun dan 1 saldo token terpadu untuk generate slide PowerPoint, makalah akademik, modul ajar, hingga dokumen hukum sah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://slide.bikinkilat.id"
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Buka Slide BikinKilat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setIsCashierOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-sm shadow-xs transition-all duration-200 flex items-center gap-2"
              >
                <QrCode className="w-4 h-4 text-indigo-600" />
                <span>Top-Up Token (QRIS Instan)</span>
              </button>
            </div>

            {/* Metrics Ribbon */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-slate-200/60">
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/50">
                <div className="text-2xl font-extrabold text-indigo-600">9</div>
                <div className="text-xs text-slate-500 font-medium">Subdomain Micro-SaaS</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/50">
                <div className="text-2xl font-extrabold text-slate-900">1 Dompet</div>
                <div className="text-xs text-slate-500 font-medium">Terintegrasi Antar-Layanan</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/50">
                <div className="text-2xl font-extrabold text-emerald-600">QRIS</div>
                <div className="text-xs text-slate-500 font-medium">Otomatisasi Tanpa Admin</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/50">
                <div className="text-2xl font-extrabold text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-medium">Standar Format Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Apps Grid */}
      <section id="layanan" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Katalog Lengkap Layanan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Pilih Layanan Sesuai Kebutuhan Anda
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
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
      </section>

      {/* Unified Cashier & Token Packages Section */}
      <section id="kasir" className="py-16 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Tarif Transparan & Terjangkau
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1 mb-3">
              1 Dompet Token untuk Semua Subdomain
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Token yang Anda beli di portal utama ini otomatis terbaca di seluruh layanan: 
              slide.bikinkilat.id, modul.bikinkilat.id, cv.bikinkilat.id, dan lainnya.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {TOKEN_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-8 bg-white border transition-all duration-200 flex flex-col justify-between ${
                  pkg.popular
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-lg'
                    : 'border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-sm">
                    {pkg.badge}
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.label}</h3>
                  <p className="text-xs text-slate-500 mb-6">{pkg.desc}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-100 mb-8">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{pkg.tokens} Token Terkredit Instan</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Berlaku permanen tanpa batas kedaluwarsa</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Bisa digunakan di seluruh 9 subdomain</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Download format asli (.pptx, .docx, .xlsx, .pdf)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCashierOpen(true)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
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
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Pertanyaan Umum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Pertanyaan Seputar Ekosistem BikinKilat
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Apakah token yang saya beli di bikinkilat.id bisa dipakai di slide.bikinkilat.id?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ya, sistem BikinKilat menggunakan satu dompet token terpadu. Token yang Anda beli di kasir otomatis tersinkronisasi langsung ke seluruh layanan tanpa perlu login ulang.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Format file apa saja yang bisa diunduh?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Setiap layanan menghasilkan file dokumen asli yang dapat diedit bebas: PowerPoint (.pptx), Microsoft Word (.docx), Excel (.xlsx), PDF, dan Markdown (.md), bukan sekadar screenshot atau teks web.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">
              Bagaimana jika proses pembayaran QRIS mengalami kendala?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
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
