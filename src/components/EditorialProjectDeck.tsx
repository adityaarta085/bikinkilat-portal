'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  GitFork, 
  TrendingUp, 
  Camera, 
  LayoutGrid, 
  ArrowUpRight, 
  ArrowLeft, 
  ArrowRight,
  Coins, 
  Layers,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { ECOSYSTEM_APPS, EcosystemApp } from '@/lib/ecosystem';
import { SpotlightCard } from '@/components/SpotlightCard';
import { MagneticButton } from '@/components/MagneticButton';
import { EcosystemCard } from '@/components/EcosystemCard';

export function EditorialProjectDeck() {
  const [activeIdx, setActiveIdx] = useState<number>(1); // Default to Slide BikinKilat (index 1)
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal'];

  const currentApp = ECOSYSTEM_APPS[activeIdx] || ECOSYSTEM_APPS[1];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? ECOSYSTEM_APPS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === ECOSYSTEM_APPS.length - 1 ? 0 : prev + 1));
  };

  const filteredApps = ECOSYSTEM_APPS.filter((app) => {
    if (activeCategory === 'Semua') return true;
    return app.category === activeCategory;
  });

  const getVisualArtifact = (appId: string) => {
    switch (appId) {
      case '02-slide':
        return (
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl border border-indigo-500/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
                16:9 Slide Widescreen
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Speaker Notes Ready
              </span>
            </div>
            <div className="my-6 space-y-2">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-tight text-white">
                Strategi Transformasi Digital UMKM &amp; Pertumbuhan 300%
              </div>
              <p className="text-xs text-slate-300 line-clamp-3">
                Memetakan rantai pasok modern, adopsi QRIS nasional, dan otomasi pembukuan digital tanpa beban operasional berlebih.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>12 Slide Terstruktur</span>
              <span>Format .pptx Asli</span>
            </div>
          </div>
        );
      case '03-modul':
        return (
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-blue-500/30 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Kemendikbud Kurikulum Merdeka
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Fase A-F Terakreditasi
              </span>
            </div>
            <div className="my-6 space-y-2">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                Modul Ajar: Algoritma &amp; Berpikir Komputasional
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-sans">
                Tujuan Pembelajaran: Peserta didik mampu menganalisis dekomposisi masalah dan merumuskan solusi logis terstruktur.
              </div>
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Lengkap LKPD &amp; Rubrik</span>
              <span>Format .docx Resmi</span>
            </div>
          </div>
        );
      case '04-cv':
        return (
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-cyan-500/30 shadow-2xl relative overflow-hidden font-sans">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                Standard Global ATS Friendly
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                Skor ATS: 94/100
              </span>
            </div>
            <div className="my-4 space-y-2 text-left">
              <div className="font-bold text-base text-slate-900 dark:text-white">FAJAR PRATAMA, S.Kom.</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Senior Software Engineer • Jakarta, Indonesia</div>
              <div className="mt-3 text-xs text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                • Mengembangkan arsitektur microservices Go &amp; Kafka yang memproses Rp 12M transaksi harian.<br />
                • Memangkas latency API dari 320ms menjadi 48ms untuk 100.000 pengguna aktif.
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Format Single Column</span>
              <span>Export PDF / DOCX</span>
            </div>
          </div>
        );
      case '05-rab':
        return (
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-2xl border border-amber-500/30 shadow-2xl relative overflow-hidden font-mono">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
                Permen PU-PR No. 8/2023 SNI
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                Formula Aktif =SUM
              </span>
            </div>
            <div className="my-4 space-y-2 text-xs">
              <div className="grid grid-cols-4 gap-2 font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1">
                <span>Uraian</span>
                <span className="text-right">Vol</span>
                <span className="text-right">Harga</span>
                <span className="text-right">Jumlah</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-slate-600 dark:text-slate-400">
                <span>Pek. Beton K-225</span>
                <span className="text-right">12.5 m³</span>
                <span className="text-right">1.250.000</span>
                <span className="text-right font-bold text-slate-900 dark:text-white">15.625.000</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-slate-600 dark:text-slate-400">
                <span>Pembesian D13</span>
                <span className="text-right">480 kg</span>
                <span className="text-right">16.500</span>
                <span className="text-right font-bold text-slate-900 dark:text-white">7.920.000</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <span>Template Excel .xlsx Asli</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Audit SNI Sah</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400">
                Standar Nasional Terverifikasi
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Siap Cetak
              </span>
            </div>
            <div className="my-6 space-y-2">
              <div className="text-2xl font-black tracking-tight leading-tight text-white">
                {currentApp.name}
              </div>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {currentApp.tagline}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>{currentApp.outputFormats.join(' • ')}</span>
              <span>100% Format Asli</span>
            </div>
          </div>
        );
    }
  };

  return (
    <section id="layanan" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric Editorial Header (Emotion Agency Style) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs uppercase tracking-widest mb-2 font-bold">
              <span>[ 0{activeIdx + 1} / 09 SPESIALISASI DOKUMEN ]</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Pilih Layanan Sesuai Kebutuhan Anda
            </h2>
          </div>

          {/* View Mode Toggle & Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('deck')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  viewMode === 'deck'
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Panggung Deck
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-slate-900 dark:bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Grid Katalog (9)
              </button>
            </div>

            {/* Navigation Arrows for Deck Mode */}
            {viewMode === 'deck' && (
              <div className="flex items-center gap-1.5">
                <MagneticButton strength={10}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Layanan Sebelumnya"
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center transition active:scale-90"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </MagneticButton>
                <MagneticButton strength={10}>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Layanan Selanjutnya"
                    className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center transition active:scale-90"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>
            )}
          </div>
        </div>

        {/* MODE 1: Interactive Editorial Deck Stage (Emotion Agency Signature) */}
        {viewMode === 'deck' && (
          <div className="space-y-8">
            <SpotlightCard
              spotlightColor="rgba(99, 102, 241, 0.12)"
              enableTilt={true}
              className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.06)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left Side: Editorial Typography & Product Specifications (7 Cols) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-indigo-600 text-white shadow-2xs">
                      [ 0{activeIdx + 1} / 09 ]
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                      {currentApp.subdomain}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${currentApp.badgeColor}`}>
                      {currentApp.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {currentApp.name}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mt-3 font-normal leading-relaxed">
                      {currentApp.tagline}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                    {currentApp.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action row with token fee and Launch CTA */}
                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs">
                      <Coins className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{currentApp.tokenCost === 0 ? 'Gratis' : `${currentApp.tokenCost} Token / Dokumen`}</span>
                    </div>

                    <MagneticButton strength={15}>
                      <a
                        href={currentApp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="BUKA ↗"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <span>Luncurkan Studio {currentApp.name.split(' ')[0]}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </MagneticButton>
                  </div>
                </div>

                {/* Right Side: Tangible Interactive Artifact Card (5 Cols) */}
                <div className="lg:col-span-5 aspect-[4/3] sm:aspect-[16/11]">
                  {getVisualArtifact(currentApp.id)}
                </div>

              </div>
            </SpotlightCard>

            {/* Quick 9-Product Thumbnail Scrub Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
              {ECOSYSTEM_APPS.map((app, idx) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all duration-200 active:scale-95 ${
                    activeIdx === idx
                      ? 'bg-slate-900 dark:bg-indigo-600 text-white border-slate-900 dark:border-indigo-600 shadow-md scale-105'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold opacity-75">
                    0{idx + 1}
                  </div>
                  <div className="text-xs font-bold truncate mt-0.5">
                    {app.name.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: Comprehensive 9-Grid (Alternative view) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredApps.map((app) => (
              <EcosystemCard key={app.id} app={app} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default EditorialProjectDeck;
