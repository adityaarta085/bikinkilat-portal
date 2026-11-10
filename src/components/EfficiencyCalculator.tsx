'use client';

import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Clock, Zap, ArrowRight, Layers } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

interface EfficiencyCalculatorProps {
  onOpenCashier?: () => void;
}

export function EfficiencyCalculator({ onOpenCashier }: EfficiencyCalculatorProps) {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [docsPerMonth, setDocsPerMonth] = useState<number>(10);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Efisiensi waktu:
  // Rata-rata 1 dokumen butuh 2-3 jam manual vs < 1 menit di BikinKilat (efisiensi ~85-90%)
  const rawHoursSaved = Math.round(hoursPerWeek * 4 * 0.85);
  const rawPercentEfficiency = 90;

  // Animated Count-Up Numbers
  const animatedHours = useCountUp({
    end: rawHoursSaved,
    duration: 800,
    enabled: isVisible
  });

  const animatedPercent = useCountUp({
    end: rawPercentEfficiency,
    duration: 900,
    enabled: isVisible
  });

  const animatedDocs = useCountUp({
    end: docsPerMonth,
    duration: 700,
    enabled: isVisible
  });

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Iridescent Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-indigo-100/30 via-emerald-50/20 to-sky-100/30 dark:from-indigo-950/25 dark:via-emerald-950/15 dark:to-sky-950/20 blur-3xl rounded-full pointer-events-none -z-10 animate-aurora" />

      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 px-3.5 py-1 rounded-full shadow-2xs">
            Kalkulator Efisiensi Waktu &amp; Produktivitas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
            Berapa Banyak Waktu yang Dapat Dioptimalkan?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Layanan utilitas publik terbuka 100% tanpa biaya. Optimalkan waktu penyusunan administrasi pendidikan, karier, dan dokumen formal Anda secara instan.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Sliders Controller (7 Cols) */}
          <div className="lg:col-span-7 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.03)] space-y-6 ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03] transition-colors">
            
            {/* Quick Persona Presets */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                Pilih Profil Penggunaan:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHoursPerWeek(4);
                    setDocsPerMonth(5);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all duration-200 active:scale-95 ${
                    hoursPerWeek === 4 && docsPerMonth === 5
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs scale-[1.02]'
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
                    setDocsPerMonth(12);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all duration-200 active:scale-95 ${
                    hoursPerWeek === 10 && docsPerMonth === 12
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs scale-[1.02]'
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
                    setDocsPerMonth(20);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all duration-200 active:scale-95 ${
                    hoursPerWeek === 16 && docsPerMonth === 20
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs scale-[1.02]'
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
                    setDocsPerMonth(30);
                  }}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all duration-200 active:scale-95 ${
                    hoursPerWeek === 22 && docsPerMonth === 30
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-2xs scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold">Komunitas / UKM</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">22 Jam / Mgg</div>
                </button>
              </div>
            </div>

            {/* Slider 1: Hours */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Waktu Manual Menyusun Dokumen per Minggu
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

            {/* Slider 2: Documents Per Month */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Kebutuhan Berkas Dokumen per Bulan
                </label>
                <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                  {docsPerMonth} Dokumen / Bulan
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={docsPerMonth}
                onChange={(e) => setDocsPerMonth(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                <span>2 Dokumen</span>
                <span>20 Dokumen</span>
                <span>50 Dokumen</span>
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
                <span>20 Kuota Gratis Harian</span>
              </div>
            </div>

          </div>

          {/* Right Column: Computed Efficiency Display */}
          <div className="lg:col-span-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between ring-1 ring-slate-900/[0.03] dark:ring-white/[0.03] transition-colors">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800 px-2.5 py-0.5 rounded-md shadow-2xs">
                Hasil Efisiensi Waktu
              </span>

              {/* Total Hours Saved */}
              <div className="mt-4 mb-6">
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white flex items-baseline gap-2">
                  <span className="tabular-nums font-mono">{animatedHours} Jam</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/ Bulan</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed font-normal">
                  Setara dengan <strong>{(rawHoursSaved / 8).toFixed(1)} hari kerja penuh</strong> yang dapat Anda alihkan untuk pengajaran, pendalaman materi, dan waktu berkualitas.
                </p>
              </div>

              {/* Efficiency Rate Box */}
              <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-700 mb-6 shadow-2xs">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2 font-semibold">
                  <span>Tingkat Akselerasi:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-extrabold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                    ~{animatedPercent}% Lebih Cepat
                  </span>
                </div>

                {/* Animated Progress Fill Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ width: `${animatedPercent}%` }}
                  />
                </div>

                <div className="text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  {animatedDocs} Dokumen Per Bulan Siap Pakai
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Rata-rata pemrosesan sub-2 detik per dokumen dalam format resmi standar nasional.
                </div>
              </div>
            </div>

            {/* Action */}
            <a
              href="#layanan"
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 ring-1 ring-slate-900/10 dark:ring-indigo-400/20 group text-center"
            >
              <Layers className="w-4 h-4 text-indigo-400 dark:text-indigo-200 group-hover:scale-110 transition-transform" />
              <span>Eksplorasi 9 Layanan Dokumen</span>
              <ArrowRight className="w-4 h-4" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default EfficiencyCalculator;
