'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, Download, CheckCircle2, ArrowRight } from 'lucide-react';

export function QuickWorkflow() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      title: 'Pilih Format Dokumen',
      desc: 'Tersedia 9 layanan terpisah yang diprogram spesifik: Slide PowerPoint, Modul Kemendikbud, CV ATS, RAB Konstruksi SNI, Surat Kontrak KUHPerdata, Waris Faraidh, Proposal Riset, dan Pasfoto SSCASN.',
      badge: 'Langkah 1: Spesialisasi',
      icon: Layers,
      highlight: 'Satu akun dan saldo token otomatis tersinkronisasi di semua layanan tanpa login ulang.'
    },
    {
      step: 2,
      title: 'Ketikkan Topik / Unggah Data',
      desc: 'Cukup masukkan topik presentasi, capaian pembelajaran, riwayat karier, atau nilai volume proyek. Sistem AI kami memetakan aturan tata naskah resmi Indonesia secara otomatis.',
      badge: 'Langkah 2: Otomasi Cerdas',
      icon: Sparkles,
      highlight: 'Bebas prompt engineering rumit. Form input dirancang intuitif untuk siapa saja.'
    },
    {
      step: 3,
      title: 'Unduh Berkas Binary Asli',
      desc: 'Dalam 30 s/d 60 detik, berkas asli (.pptx 16:9 dengan speaker notes, .docx dengan daftar isi, .xlsx dengan formula aktif) langsung siap diunduh ke komputer atau HP Anda.',
      badge: 'Langkah 3: Siap Pakai',
      icon: Download,
      highlight: 'Bukan sekadar teks di layar web. Berkas langsung berformat resmi dan 100% bebas diedit.'
    }
  ];

  const current = steps.find((s) => s.step === activeStep) || steps[0];
  const StepIcon = current.icon;

  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 relative overflow-hidden transition-colors">
      {/* Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-sky-50/40 via-indigo-50/30 to-purple-50/20 dark:from-indigo-950/20 dark:via-sky-950/15 dark:to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 px-3.5 py-1 rounded-full shadow-2xs">
            Alur Kerja Sederhana
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
            3 Langkah Kilat Menghasilkan Dokumen
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            Dirancang agar mudah dipahami oleh siapa saja - dari pelajar, guru, praktisi, hingga pemilik bisnis tanpa kendala teknis.
          </p>
        </div>

        {/* Step Cards Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-8">
          {steps.map((s) => {
            const Icon = s.icon;
            const isActive = s.step === activeStep;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                className={`p-6 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'bg-white dark:bg-slate-900 border-indigo-600/80 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-md -translate-y-1'
                    : 'bg-white/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-xs' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      0{s.step}
                    </span>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {s.desc}
                  </p>
                </div>

                <div className={`mt-4 pt-3 border-t text-[11px] font-semibold flex items-center gap-1 ${
                  isActive 
                    ? 'border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400' 
                    : 'border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500'
                }`}>
                  <span>{isActive ? 'Sedang Ditampilkan' : 'Klik untuk rincian'}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <div className="max-w-5xl mx-auto bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 bg-white dark:bg-slate-800 border border-indigo-200/70 dark:border-indigo-800 px-2.5 py-0.5 rounded-md shadow-2xs">
              {current.badge}
            </span>
            <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-2 mb-2">
              {current.title}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal mb-4">
              {current.desc}
            </p>
            <div className="inline-flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{current.highlight}</span>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <a
              href="#layanan"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center justify-center gap-2 ring-1 ring-slate-900/10 dark:ring-indigo-400/20"
            >
              <span>Mulai Buat Dokumen</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default QuickWorkflow;
