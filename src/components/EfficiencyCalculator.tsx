'use client';

import React, { useState } from 'react';
import { PiggyBank, ShieldCheck } from 'lucide-react';

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
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Apple Ambient Iridescent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-100/30 via-emerald-50/20 to-sky-100/30 dark:from-indigo-950/25 dark:via-emerald-950/15 dark:to-sky-950/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 px-3.5 py-1 rounded-full shadow-2xs">
            Kalkulator Efisiensi & Hemat Biaya
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
            Berapa Banyak Waktu & Anggaran yang Dihemat?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Tanpa perlu langganan bulanan mahal. Anda hanya membayar token saat dokumen dibutuhkan, dengan hasil berstandar hukum dan tata naskah resmi.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Sliders Controller (7 Cols) */}
          <div className="lg:col-span-7 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.03)] space-y-6 ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03] transition-colors">
            
            {/* Quick Persona Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Pilih Profil Penggunaan (1-Klik):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHoursPerWeek(4);
                    setCostPerDoc(50000);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    hoursPerWeek === 4 && costPerDoc === 50000
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">Mahasiswa</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">4 Jam / Mgg</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHoursPerWeek(10);
                    setCostPerDoc(100000);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    hoursPerWeek === 10 && costPerDoc === 100000
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">Guru / Dosen</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">10 Jam / Mgg</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHoursPerWeek(16);
                    setCostPerDoc(150000);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    hoursPerWeek === 16 && costPerDoc === 150000
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">Profesional</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">16 Jam / Mgg</div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setHoursPerWeek(22);
                    setCostPerDoc(200000);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    hoursPerWeek === 22 && costPerDoc === 200000
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">Bisnis / UKM</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">22 Jam / Mgg</div>
                </button>
              </div>
            </div>

            {/* Slider 1: Hours */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Waktu Manual Membuat Dokumen per Minggu
                </label>
                <span className="text-xs sm:text-sm font-extrabold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl border border-indigo-200/80 dark:border-indigo-800 shadow-2xs">
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
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                <span>2 Jam (Santai)</span>
                <span>12 Jam (Dosen / Profesional)</span>
                <span>25 Jam (Intensif)</span>
              </div>
            </div>

            {/* Slider 2: Freelance Cost Replacement */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Perkiraan Biaya Jasa Ketik / Desain Manual
                </label>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
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
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                <span>Rp 30.000</span>
                <span>Rp 150.000</span>
                <span>Rp 300.000</span>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Format Asli (.docx, .pptx, .xlsx)</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Token Berlaku Permanen</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Computed ROI Display (Apple Liquid Glass Card) */}
          <div className="lg:col-span-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between ring-1 ring-slate-900/[0.03] dark:ring-white/[0.03] transition-colors">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800 px-2.5 py-0.5 rounded-md">
                Estimasi Penghematan Anda
              </span>

              {/* Total Hours Saved */}
              <div className="mt-4 mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white flex items-baseline gap-2">
                  <span>{hoursSavedPerMonth} Jam</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ Bulan</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                  Setara dengan <strong>{(hoursSavedPerMonth / 8).toFixed(1)} hari kerja penuh</strong> yang dapat Anda alihkan untuk pekerjaan strategis lainnya.
                </p>
              </div>

              {/* Financial Savings Box */}
              <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 mb-6 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1 font-semibold">
                  <span>Nilai Penghematan:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">{savingsPercent}% Hemat</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  Rp {netSavings.toLocaleString('id-ID')}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium">
                  Biaya di BikinKilat hanya ~Rp {bikinkilatCost.toLocaleString('id-ID')} berbasis saldo token.
                </div>
              </div>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={onOpenCashier}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 ring-1 ring-slate-900/10 dark:ring-indigo-400/20"
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
