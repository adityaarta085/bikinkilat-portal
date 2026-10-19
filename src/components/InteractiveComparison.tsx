'use client';

import React, { useState } from 'react';
import { Check, X, Clock, Coins, ShieldCheck, FileCheck, ArrowRight, Sparkles } from 'lucide-react';

export function InteractiveComparison() {
  const [activeTab, setActiveTab] = useState<'ringkas' | 'detail'>('ringkas');

  const comparisonPoints = [
    {
      metric: 'Waktu Penyelesaian',
      manual: '2 s/d 5 Jam per berkas (lelah & menyita fokus)',
      bikinkilat: '30 s/d 60 Detik (langsung terkompilasi rapi)',
      highlight: true
    },
    {
      metric: 'Biaya Pengeluaran',
      manual: 'Rp 50.000 s/d Rp 250.000 per pesanan jasa ketik/desain',
      bikinkilat: 'Cukup 1-2 Token (~Rp 2.500) per dokumen lengkap',
      highlight: true
    },
    {
      metric: 'Format Keluaran',
      manual: 'Seringkali hanya gambar/PDF terkunci yang sulit diedit',
      bikinkilat: 'Berkas asli (.pptx, .docx, .xlsx, .pdf) 100% bebas diedit',
      highlight: false
    },
    {
      metric: 'Standar & Regulasi',
      manual: 'Rawan salah format, typo, dan melanggar tata naskah resmi',
      bikinkilat: 'Diprogram taat Permen PU-PR, Kurikulum Merdeka, dan KHI',
      highlight: false
    },
    {
      metric: 'Kedaulatan & Privasi Data',
      manual: 'Data pribadi berisiko disimpan atau dibagikan pihak ketiga',
      bikinkilat: 'Enkripsi TLS 1.3 & Zero Retention (berkas langsung terhapus)',
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-slate-50/60 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-200/80 px-3.5 py-1 rounded-full shadow-2xs">
            Perbandingan Nyata
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
            Cara Lama vs Ekosistem BikinKilat
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Lihat perbedaan nyata antara mengerjakan dokumen secara konvensional dengan memanfaatkan otomasi cerdas BikinKilat.
          </p>

          {/* Toggle Tab */}
          <div className="inline-flex p-1 rounded-xl bg-slate-200/70 border border-slate-300/60 mt-6 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('ringkas')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ringkas'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tampilan Ringkas
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('detail')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'detail'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Metrik
            </button>
          </div>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card Cara Lama */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    Metode Konvensional
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    Ketik Manual / Jasa Ketik Luar
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                  <X className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                {(activeTab === 'ringkas' ? comparisonPoints.slice(0, 3) : comparisonPoints).map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 text-xs sm:text-sm text-slate-600">
                    <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block text-xs mb-0.5">{pt.metric}</span>
                      <span>{pt.manual}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 text-center font-medium">
              Menghabiskan waktu berharga dan biaya berulang tanpa jaminan kepatuhan.
            </div>
          </div>

          {/* Card BikinKilat */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border-2 border-indigo-600/90 shadow-[0_20px_50px_rgba(79,70,229,0.1)] flex flex-col justify-between ring-4 ring-indigo-500/10 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-slate-900 text-white text-xs font-extrabold shadow-sm tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Solusi Cerdas BikinKilat</span>
            </span>

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-indigo-100 mb-6">
                <div>
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Otomasi Terverifikasi
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    BikinKilat.com Ekosistem
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shadow-2xs">
                  <Check className="w-5 h-5 text-indigo-600 stroke-[2.5]" />
                </div>
              </div>

              <div className="space-y-4">
                {(activeTab === 'ringkas' ? comparisonPoints.slice(0, 3) : comparisonPoints).map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80 text-xs sm:text-sm text-slate-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <div>
                      <span className="font-bold text-indigo-950 block text-xs mb-0.5">{pt.metric}</span>
                      <span className="font-semibold text-slate-900">{pt.bikinkilat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-indigo-100">
              <a
                href="#live-preview"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 group ring-1 ring-slate-900/10"
              >
                <span>Buktikan di Live Studio Preview</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default InteractiveComparison;
