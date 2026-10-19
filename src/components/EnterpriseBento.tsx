'use client';

import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Lock, 
  Coins
} from 'lucide-react';

export function EnterpriseBento() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Subtle Refractive Ambient Backlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-sky-100/30 via-indigo-50/20 to-purple-100/20 dark:from-indigo-950/25 dark:via-sky-950/15 dark:to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Arsitektur & Kepatuhan Standar Indonesia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Mengapa Otomasi BikinKilat Berbeda Dari AI Biasa?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
            AI umum hanya mencetak teks mentah tanpa format yang membutuhkan penyusunan manual berjam-jam. BikinKilat langsung mengompilasi dokumen resmi siap guna, taat tata naskah, dan berkekuatan hukum.
          </p>
        </div>

        {/* Apple Liquid Glass Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Bento 1 (Large - Spans 2 cols on md/lg) */}
          <div className="md:col-span-2 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/70 border border-indigo-200/70 dark:border-indigo-800 flex items-center justify-center mb-6 shadow-2xs">
                <FileCheck2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Output Binary Asli
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                Langsung Menghasilkan Berkas Asli (.pptx, .docx, .xlsx, .pdf)
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Bukan sekadar salin-tempel teks dari chat. Anda langsung mengunduh berkas PowerPoint 16:9 dengan speaker notes, dokumen Word berformat rapi dengan daftar isi otomatis, atau lembar kerja Excel dengan formula aktif.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-700 text-center">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">.PPTX</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Editable Slides 16:9</div>
              </div>
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-700 text-center">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">.DOCX</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Tata Naskah Resmi</div>
              </div>
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-700 text-center">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">.XLSX</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Formula Dinamis Aktif</div>
              </div>
              <div className="bg-slate-50/80 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/70 dark:border-slate-700 text-center">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">.PDF</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Vektor Resolusi Tinggi</div>
              </div>
            </div>
          </div>

          {/* Bento 2 (1 col) */}
          <div className="bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/70 border border-emerald-200/70 dark:border-emerald-800 flex items-center justify-center mb-6 shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Kepatuhan Regulasi
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                100% Sesuai Regulasi Indonesia
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Tiap generator diprogram mengikuti acuan resmi: Permen PU-PR No. 8/2023, Kurikulum Merdeka Kemendikbudristek, KHI Inpres No. 1/1991, dan standar foto BKN SSCASN.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span>Bebas Klaim Hoaks & Taat UU</span>
            </div>
          </div>

          {/* Bento 3 (1 col) */}
          <div className="bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50/90 dark:bg-amber-950/70 border border-amber-200/70 dark:border-amber-800 flex items-center justify-center mb-6 shadow-2xs">
                <Coins className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Satu Dompet Terpadu
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                Satu Saldo untuk 9 Subdomain
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Tidak ada biaya langganan yang menumpuk. Beli saldo token sekali via QRIS, dan gunakan bebas di slide, modul ajar, CV, RAB, hingga pasfoto tanpa registrasi ulang.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Token permanen tanpa masa kedaluwarsa.</span>
            </div>
          </div>

          {/* Bento 4 (Large - Spans 2 cols on md/lg) */}
          <div className="md:col-span-2 bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8 sm:p-9 border border-slate-200/90 dark:border-slate-800 shadow-[0_12px_32px_rgba(15,23,42,0.03)] hover:shadow-[0_24px_50px_rgba(15,23,42,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ring-1 ring-slate-900/[0.02] dark:ring-white/[0.03]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 shadow-2xs">
                <Lock className="w-6 h-6 text-slate-700 dark:text-slate-300" />
              </div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Privasi & Kedaulatan Data
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-3">
                Kepatuhan Penuh UU PDP No. 27/2022
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Kami menerapkan prinsip zero-retention untuk isi dokumen dan foto Anda. Data pemrosesan langsung dimusnahkan segera setelah berkas berhasil diunduh, tanpa dijadikan bahan pelatihan model publik.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Enkripsi TLS 1.3 End-to-End</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Document Mining</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Edge Network Global</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default EnterpriseBento;
