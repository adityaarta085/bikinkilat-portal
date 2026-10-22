'use client';

import React from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  FileText, 
  Presentation, 
  Calculator, 
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

export function DocumentAuthenticityComparison() {
  return (
    <section className="py-20 lg:py-24 bg-white dark:bg-slate-950 border-b border-slate-200/90 dark:border-slate-800/90 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Kualitas Format Biner Asli</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Mengapa Pengguna Beralih Dari Chatbot AI Biasa ke BikinKilat?
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            AI percakapan umum hanya memberikan teks polos tanpa tata letak. Anda tetap harus menghabiskan berjam-jam menyalin, mengatur margin, dan merapikan tabel. BikinKilat menyelesaikan berkasnya sampai siap cetak.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Card 1: Chatbot AI Konvensional */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                    <XCircle className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      Chatbot AI Umum
                    </h3>
                    <span className="text-[11px] text-slate-500 block">
                      ChatGPT, Claude, atau Gemini tanpa format khusus
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  Butuh 2-3 Jam Rapikan
                </span>
              </div>

              {/* Negative points list */}
              <ul className="space-y-3.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Hanya Teks Polos (Markdown):</strong> Anda harus salin-tempel manual ke Microsoft Word dan mengatur margin 4-4-3-3, font size, serta spasi satu per satu.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Slide Bukan Berkas PPT:</strong> Hanya memberi saran materi teks. Anda harus mencari template PowerPoint, menyalin poin per poin, dan menyusun tata letak sendiri.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tabel Angka Mati:</strong> Kalkulasi anggaran tidak memiliki rumus Excel. Jika ada satu harga material berubah, seluruh total harus dihitung ulang manual.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tidak Paham Standar Indonesia:</strong> Rentan salah format naskah dinas pemerintah, salah istilah Kurikulum Merdeka, atau tidak sesuai format SNI pekerjaan umum.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 italic">
              Hasil: Waktu Anda tetap tersita habis untuk tugas tata letak teknis yang melelahkan.
            </div>
          </div>

          {/* Card 2: BikinKilat Automation Engine */}
          <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-md flex flex-col justify-between relative ring-4 ring-indigo-500/10">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-indigo-100 dark:border-indigo-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                      BikinKilat Document Engine
                    </h3>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold block">
                      Kompilasi Berkas Asli Siap Cetak
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Siap Pakai Sub-2 Menit
                </span>
              </div>

              {/* Positive points list */}
              <ul className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Langsung Unduh .DOCX Rapi:</strong> Sudah terformat otomatis dengan tata naskah dinas resmi, hierarki judul, daftar isi, dan penomoran halaman standar kampus/instansi.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Berkas Asli .PPTX 16:9:</strong> Bukan sekadar teks, melainkan slide utuh lengkap dengan palet warna harmonis, tipografi kinetik, dan speaker notes di setiap halaman.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Spreadsheet .XLSX Rumus Aktif:</strong> Menggunakan formula penjumlahan dinamis, tabel analisa upah dan bahan, serta kalkulasi pajak PPN otomatis yang bisa diedit.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Kepatuhan Standar Indonesia:</strong> Mengikuti acuan tata naskah PermenPAN-RB, kurikulum Kemendikbudristek 2024, dan aturan hukum perdata sah.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">
                Hemat waktu hingga 90%
              </span>
              <a
                href="#layanan"
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Pilih Layanan Dokumen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default DocumentAuthenticityComparison;
