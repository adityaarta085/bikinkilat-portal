'use client';

import React, { useState } from 'react';
import { Clock, TrendingUp, PiggyBank, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface EfficiencyCalculatorProps {
  onOpenCashier?: () => void;
}

export function EfficiencyCalculator({ onOpenCashier }: EfficiencyCalculatorProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [costPerDoc, setCostPerDoc] = useState<number>(100000);

  // Perhitungan:
  // Rata-rata 1 dokumen butuh 2-3 jam manual vs 1-2 menit BikinKilat (efisiensi 90%)
  const hoursSavedPerMonth = Math.round(hoursPerWeek * 4 * 0.85);
  const estimatedDocsPerMonth = Math.max(2, Math.round(hoursPerWeek * 4 / 2.5));
  const freelanceCostPerMonth = estimatedDocsPerMonth * costPerDoc;
  
  // Biaya token di BikinKilat (rata-rata 1-2 token per dokumen, ~Rp 2.000 per token)
  const bikinkilatCost = estimatedDocsPerMonth * 2500;
  const netSavings = freelanceCostPerMonth - bikinkilatCost;
  const savingsPercent = Math.round((netSavings / freelanceCostPerMonth) * 100);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white border-b border-slate-200/80 relative overflow-hidden">
      {/* Apple Ambient Iridescent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-100/30 via-emerald-50/20 to-sky-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 border border-indigo-200/80 px-3.5 py-1 rounded-full shadow-2xs">
            Kalkulator Efisiensi & Hemat Biaya
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-3 mb-4 tracking-tight">
            Berapa Banyak Waktu & Anggaran yang Dihemat?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tanpa perlu langganan bulanan mahal. Anda hanya membayar token saat dokumen dibutuhkan, dengan hasil berstandar hukum dan tata naskah resmi.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Sliders Controller (7 Cols) */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_12px_32px_rgba(15,23,42,0.03)] space-y-6 ring-1 ring-slate-900/[0.02]">
            
            {/* Slider 1: Hours */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  Waktu Manual Membuat Dokumen per Minggu
                </label>
                <span className="text-xs sm:text-sm font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-200/80 shadow-2xs">
                  {hoursPerWeek} Jam / Minggu
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="25"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>2 Jam (Santai)</span>
                <span>12 Jam (Dosen / Profesional)</span>
                <span>25 Jam (Intensif)</span>
              </div>
            </div>

            {/* Slider 2: Freelance Cost Replacement */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900">
                  Perkiraan Biaya Jasa Ketik / Desain Manual
                </label>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
                  Rp {costPerDoc.toLocaleString('id-ID')} / Dokumen
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="300000"
                step="10000"
                value={costPerDoc}
                onChange={(e) => setCostPerDoc(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                <span>Rp 30.000</span>
                <span>Rp 150.000</span>
                <span>Rp 300.000</span>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Format Asli (.docx, .pptx, .xlsx)</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Token Berlaku Permanen</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Computed ROI Display (Apple Pure White Liquid Glass Card) */}
          <div className="lg:col-span-5 bg-white/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between ring-1 ring-slate-900/[0.03]">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/70 px-2.5 py-0.5 rounded-md">
                Estimasi Penghematan Anda
              </span>

              {/* Total Hours Saved */}
              <div className="mt-4 mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 flex items-baseline gap-2">
                  <span>{hoursSavedPerMonth} Jam</span>
                  <span className="text-xs font-semibold text-slate-500">/ Bulan</span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                  Setara dengan <strong>{(hoursSavedPerMonth / 8).toFixed(1)} hari kerja penuh</strong> yang dapat Anda alihkan untuk pekerjaan strategis lainnya.
                </p>
              </div>

              {/* Financial Savings Box */}
              <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 mb-6 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1 font-semibold">
                  <span>Nilai Penghematan:</span>
                  <span className="text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{savingsPercent}% Hemat</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
                  Rp {netSavings.toLocaleString('id-ID')}
                </div>
                <div className="text-[11px] text-slate-500 mt-1.5 font-medium">
                  Biaya di BikinKilat hanya ~Rp {bikinkilatCost.toLocaleString('id-ID')} berbasis saldo token.
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={onOpenCashier}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 ring-1 ring-slate-900/10"
            >
              <PiggyBank className="w-4 h-4 text-amber-400" />
              <span>Mulai Hemat Sekarang (Isi Token)</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default EfficiencyCalculator;
