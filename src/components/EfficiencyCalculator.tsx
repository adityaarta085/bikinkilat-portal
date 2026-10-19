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
    <section className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-100/70 border border-indigo-200/60 px-3.5 py-1 rounded-full">
            Kalkulator Efisiensi & Hemat Biaya
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            Berapa Banyak Waktu & Anggaran yang Anda Hemat?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Tanpa perlu berlangganan bulanan mahal. Anda hanya membayar token saat dokumen dibutuhkan, dengan hasil berstandar hukum dan akademik resmi.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Sliders Controller (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            {/* Slider 1: Hours */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Waktu Manual Membuat Dokumen per Minggu
                </label>
                <span className="text-sm sm:text-base font-extrabold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
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
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Perkiraan Biaya Jasa Ketik / Desain Manual
                </label>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
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
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Format Asli (.docx, .pptx, .xlsx)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Token Berlaku Selamanya</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Computed ROI Display (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-800/80 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-300">
                Estimasi Penghematan Anda
              </span>

              {/* Total Hours Saved */}
              <div className="mt-4 mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-white flex items-baseline gap-2">
                  <span>{hoursSavedPerMonth} Jam</span>
                  <span className="text-xs font-normal text-indigo-300">/ Bulan</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Setara dengan <strong>{(hoursSavedPerMonth / 8).toFixed(1)} hari kerja penuh</strong> yang dapat Anda manfaatkan untuk kegiatan bernilai tinggi lainnya.
                </p>
              </div>

              {/* Financial Savings */}
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                  <span>Nilai Penghematan:</span>
                  <span className="text-emerald-400 font-bold">{savingsPercent}% Hemat</span>
                </div>
                <div className="text-2xl font-black text-emerald-400">
                  Rp {netSavings.toLocaleString('id-ID')}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Biaya di BikinKilat hanya ~Rp {bikinkilatCost.toLocaleString('id-ID')} (berbasis token).
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={onOpenCashier}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PiggyBank className="w-4 h-4" />
              <span>Mulai Hemat Sekarang (Isi Token)</span>
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default EfficiencyCalculator;
