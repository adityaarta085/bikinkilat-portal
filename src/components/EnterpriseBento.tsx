'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  FileCheck2, 
  Zap, 
  Lock, 
  Globe2, 
  Coins, 
  Layers,
  Sparkles
} from 'lucide-react';

export function EnterpriseBento() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 border border-slate-300 text-slate-800 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Arsitektur & Kepatuhan Standar Indonesia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Mengapa Otomasi BikinKilat Berbeda Dari AI Generik?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            AI generik hanya menghasilkan teks mentah yang harus Anda salin dan format ulang selama berjam-jam. BikinKilat langsung menghasilkan dokumen kerja asli yang siap pakai dan taat hukum.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
          {/* Bento 1 (Large - Spans 2 cols on md/lg) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6">
                <FileCheck2 className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Output Binary Asli
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 mb-3">
                Langsung Menghasilkan Berkas Asli (.pptx, .docx, .xlsx, .pdf)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Bukan sekadar salin-tempel teks dari chat. Anda langsung mengunduh berkas PowerPoint 16:9 dengan speaker notes, dokumen Word berformat rapi dengan daftar isi otomatis, atau lembar kerja Excel dengan formula aktif.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                <div className="font-mono text-xs font-bold text-slate-800">.PPTX</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Editable Slides</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                <div className="font-mono text-xs font-bold text-slate-800">.DOCX</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Tata Naskah Resmi</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                <div className="font-mono text-xs font-bold text-slate-800">.XLSX</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Formula Dinamis</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-center">
                <div className="font-mono text-xs font-bold text-slate-800">.PDF</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Vektor Resolusi Tinggi</div>
              </div>
            </div>
          </div>

          {/* Bento 2 (1 col) */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Kepatuhan Regulasi
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                100% Sesuai Regulasi Indonesia
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tiap generator diprogram mengikuti acuan resmi: Permen PU-PR No. 8/2023, Kurikulum Merdeka Kemendikbudristek, KHI Inpres No. 1/1991, dan standar foto BKN SSCASN.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-medium text-emerald-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Bebas Klaim Hoaks / Tidak Sah</span>
            </div>
          </div>

          {/* Bento 3 (1 col) */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-amber-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6">
                <Coins className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Satu Dompet Terpadu
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1 mb-3">
                Satu Saldo untuk 9 Subdomain
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tidak ada biaya langganan yang menumpuk. Beli saldo token sekali via QRIS, dan gunakan bebas di slide, modul ajar, CV, RAB, hingga pasfoto tanpa registrasi ulang.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Token tidak memiliki tanggal kedaluwarsa.
            </div>
          </div>

          {/* Bento 4 (Large - Spans 2 cols on md/lg) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-slate-700" />
              </div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Privasi & Kedaulatan Data
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 mb-3">
                Kepatuhan Penuh UU PDP No. 27/2022
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Kami menerapkan prinsip zero-retention untuk isi dokumen dan foto Anda. Data pemrosesan langsung dimusnahkan segera setelah berkas berhasil diunduh, tanpa dijadikan bahan pelatihan model publik.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Enkripsi TLS 1.3 End-to-End</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Document Mining</span>
              </div>
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
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
