'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Presentation, 
  FileText, 
  Calculator, 
  FileCheck2, 
  Camera, 
  ArrowRight, 
  Check, 
  QrCode,
  Sparkles,
  Download,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DocumentTab {
  id: string;
  name: string;
  shortLabel: string;
  subdomain: string;
  url: string;
  formatBadge: string;
  standardNote: string;
  icon: any;
  headline: string;
  summary: string;
}

const DOCUMENT_TABS: DocumentTab[] = [
  {
    id: 'slide',
    name: 'Slide Presentasi 16:9',
    shortLabel: 'Slide (.pptx)',
    subdomain: 'slide.bikinkilat.web.id',
    url: 'https://slide.bikinkilat.web.id',
    formatBadge: 'Microsoft PowerPoint (.pptx)',
    standardNote: 'Format Widescreen 16:9 + Speaker Notes + Tipografi Kinetik',
    icon: Presentation,
    headline: 'Pitch Deck & Materi Kuliah Siap Sidang',
    summary: 'Dibuat langsung dalam format berkas .pptx asli. Slide terstruktur dengan hirarki visual rapi, tata letak seimbang, dan catatan pembicara lengkap di setiap slide.'
  },
  {
    id: 'modul',
    name: 'Modul Ajar & Makalah',
    shortLabel: 'Modul (.docx)',
    subdomain: 'modul.bikinkilat.web.id',
    url: 'https://modul.bikinkilat.web.id',
    formatBadge: 'Microsoft Word (.docx)',
    standardNote: 'Standar Kurikulum Merdeka Kemendikbudristek 2024',
    icon: FileText,
    headline: 'Perangkat Ajar Guru & Makalah Ilmiah',
    summary: 'Lengkap dengan Capaian Pembelajaran (CP), Alur Tujuan Pembelajaran (ATP), rubrik asesmen, dan tata naskah akademik standar kampus di Indonesia.'
  },
  {
    id: 'rab',
    name: 'Rencana Anggaran Biaya',
    shortLabel: 'RAB (.xlsx)',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    formatBadge: 'Microsoft Excel (.xlsx)',
    standardNote: 'Standar AHSP PUPR & SNI 2835:2008',
    icon: Calculator,
    headline: 'Kalkulasi Otomatis dengan Formula Aktif',
    summary: 'Bukan angka mati. Setiap sel rumus dihitung otomatis dengan formula SUM dan Product Excel, lengkap dengan rincian material, upah kerja, dan pajak PPN 11%.'
  },
  {
    id: 'surat',
    name: 'Surat Resmi & Legalitas',
    shortLabel: 'Surat (.docx/.pdf)',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    formatBadge: 'Tata Naskah Dinas (.docx)',
    standardNote: 'PermenPAN-RB No. 1 Tahun 2023 & KUHPerdata',
    icon: FileCheck2,
    headline: 'Perjanjian Kerja, Sewa, & Surat Dinas Sah',
    summary: 'Kop surat dinas, nomor surat, konsiderans hukum, pasal-pasal hak dan kewajiban, hingga kolom materai Rp 10.000 dengan posisi tanda tangan para pihak.'
  },
  {
    id: 'pasfoto',
    name: 'Studio Pasfoto Formal',
    shortLabel: 'Pasfoto Resmi',
    subdomain: 'pasfoto.bikinkilat.web.id',
    url: 'https://pasfoto.bikinkilat.web.id',
    formatBadge: 'Cetak Vektor Resolusi Tinggi (300 DPI)',
    standardNote: 'Standar BKN, CASN, Kedinasan & Paspor RI',
    icon: Camera,
    headline: 'Ganti Pakaian Formal & Latar Merah/Biru',
    summary: 'Mengubah swafoto kasual menjadi pasfoto resmi berjas hitam rapi dan kemeja putih berdasi. Otomatis dipotong dalam ukuran standar 3x4, 4x6, dan 2x3.'
  }
];

interface ArtisanalHeroProps {
  onOpenCashier: () => void;
  user: any;
}

export function ArtisanalHero({ onOpenCashier, user }: ArtisanalHeroProps) {
  const [activeTabId, setActiveTabId] = useState<string>('slide');
  const activeTab = DOCUMENT_TABS.find(t => t.id === activeTabId) || DOCUMENT_TABS[0];

  return (
    <section className="relative overflow-hidden bg-slate-50/70 dark:bg-slate-950/70 border-b border-slate-200/90 dark:border-slate-800/90 pt-12 pb-20 lg:pt-16 lg:pb-28 transition-colors">
      {/* Subtle Structural Grain & Grid Accent (Restrained, not full-page glow) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a0a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Context Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
            Portal Dokumen Indonesia
          </span>
          <span className="text-slate-400">/</span>
          <span>9 Layanan Terintegrasi</span>
          <span className="text-slate-400">/</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">Format Binary Siap Pakai</span>
        </div>

        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Dokumen Resmi Indonesia, Langsung Format Jadi.
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Bukan sekadar teks chat yang harus Anda rapikan berjam-jam. BikinKilat langsung mengompilasi berkas asli siap cetak dan siap serah: PowerPoint widescreen, Word tata naskah resmi, dan Excel kalkulasi anggaran.
              </p>
            </div>

            {/* Practical Value Badges (Real benefits, no buzzwords) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Format Asli (.pptx, .docx, .xlsx, .pdf)</strong> yang dapat Anda edit kembali secara bebas di Microsoft Office atau Google Docs.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>Standar Regulasi Nasional:</strong> Format naskah dinas PermenPAN-RB, Kurikulum Merdeka Kemendikbud, dan standar harga PUPR.
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>
                  <strong>1 Saldo Token Terpadu:</strong> Beli di portal utama, saldo otomatis terbaca di seluruh 9 subdomain tanpa repot transfer ulang.
                </span>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={activeTab.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center gap-2 group min-h-[46px]"
              >
                <span>Buka {activeTab.name}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenCashier}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-bold text-xs sm:text-sm shadow-2xs transition flex items-center gap-2 min-h-[46px]"
              >
                <QrCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Kasir &amp; Top-Up Token</span>
              </button>
            </div>

            {/* Format Pills */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <span>Format didukung:</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded">.PPTX</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded">.DOCX</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded">.XLSX</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-200/70 dark:bg-slate-800 px-1.5 py-0.5 rounded">.PDF</span>
            </div>
          </div>

          {/* Right Column: Live Interactive Document Command Center */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-[0_12px_40px_rgba(15,23,42,0.06)] overflow-hidden">
              
              {/* Studio Window Chrome Header */}
              <div className="px-4 py-3 bg-slate-100/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500/30" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/30" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/30" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 ml-2 hidden sm:inline">
                    bikinkilat-studio-v2.6
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                    {activeTab.formatBadge}
                  </span>
                </div>
              </div>

              {/* Document Type Switcher Tabs */}
              <div className="px-3 pt-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto scrollbar-none">
                {DOCUMENT_TABS.map((tab) => {
                  const isActive = tab.id === activeTabId;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTabId(tab.id)}
                      className={`px-3.5 py-2 rounded-t-xl text-xs font-bold transition flex items-center gap-2 whitespace-nowrap border-t border-x -mb-[1px] ${
                        isActive
                          ? 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs z-10'
                          : 'bg-transparent border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Document Canvas Preview */}
              <div className="p-5 sm:p-7 min-h-[360px] flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/50">
                
                {/* Specific Document Canvas Rendering */}
                {activeTabId === 'slide' && (
                  <div className="space-y-4">
                    {/* 16:9 Presentation Slide Canvas */}
                    <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-5 sm:p-6 shadow-md border border-indigo-800/80 flex flex-col justify-between relative overflow-hidden">
                      <div className="flex items-center justify-between text-xs text-indigo-300 border-b border-indigo-800/70 pb-2">
                        <span className="font-bold tracking-wider uppercase text-[10px]">
                          Slide 4 dari 12 — Valuasi Pasar Agrotech
                        </span>
                        <span className="font-mono text-[10px]">16:9 Widescreen (.pptx)</span>
                      </div>

                      <div className="space-y-2 my-auto">
                        <h4 className="text-base sm:text-lg font-black text-white leading-tight">
                          Efisiensi Distribusi Kopi Gayo: Memotong 3 Layer Rantai Tengkulak
                        </h4>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-2.5 rounded-lg bg-white/10 backdrop-blur-xs border border-white/10 text-left">
                            <span className="text-[10px] text-indigo-200 block">Sebelum Digitalisasi:</span>
                            <span className="text-sm font-extrabold text-rose-300 block">45 Hari Transaksi</span>
                            <span className="text-[10px] text-slate-300">Margin petani hanya 22%</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-indigo-600/40 backdrop-blur-xs border border-indigo-400/30 text-left">
                            <span className="text-[10px] text-indigo-200 block">Dengan BikinKilat Agrotech:</span>
                            <span className="text-sm font-extrabold text-emerald-300 block">Sub-2 Hari Instan</span>
                            <span className="text-[10px] text-slate-300">Margin petani naik ke 68%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-indigo-300/80 pt-2 border-t border-indigo-800/60">
                        <span>Speaker Notes: Jelaskan validasi data lapangan Kementan 2024.</span>
                        <span className="font-bold">BikinKilat Slide Engine</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabId === 'modul' && (
                  <div className="space-y-3">
                    {/* A4 Document Paper Canvas */}
                    <div className="w-full rounded-xl bg-white dark:bg-slate-950 p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 font-serif">
                      <div className="border-b-2 border-slate-900 dark:border-white pb-3 text-center space-y-1">
                        <span className="text-[10px] font-sans font-bold tracking-widest text-slate-500 uppercase block">
                          KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans uppercase">
                          MODUL AJAR KURIKULUM MERDEKA — TAHUN AJARAN 2024/2025
                        </h4>
                        <span className="text-[10px] font-sans text-slate-500 block">
                          Mata Pelajaran: Informatika Fase E (Kelas X SMA/SMK)
                        </span>
                      </div>

                      <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
                          <div><strong>Alokasi Waktu:</strong> 3 x 45 Menit</div>
                          <div><strong>Profil Pancasila:</strong> Bernalar Kritis &amp; Gotong Royong</div>
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          <strong>A. Capaian Pembelajaran (CP):</strong> Peserta didik mampu menganalisis abstraksi data dan menyusun algoritma terstruktur dengan flowchart logis.
                        </p>
                        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                          <strong>B. Rubrik Penilaian:</strong> Portofolio terstruktur 4 level kriteria penilaian standar asesmen formatif.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabId === 'rab' && (
                  <div className="space-y-3">
                    {/* Spreadsheet Canvas */}
                    <div className="w-full rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-xs">
                      <div className="px-3 py-2 bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between font-mono">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px]">
                          FORMULA: =SUM(F4:F8)*1.11 [PPN 11%]
                        </span>
                        <span className="text-[10px] text-emerald-700 dark:text-emerald-400">SNI 2835:2008</span>
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                        <div className="grid grid-cols-12 bg-slate-100/80 dark:bg-slate-800 font-bold p-2 text-slate-700 dark:text-slate-300">
                          <span className="col-span-1">No</span>
                          <span className="col-span-5">Uraian Pekerjaan</span>
                          <span className="col-span-2 text-center">Vol</span>
                          <span className="col-span-2 text-right">Harga (Rp)</span>
                          <span className="col-span-2 text-right">Total (Rp)</span>
                        </div>
                        <div className="grid grid-cols-12 p-2 text-slate-800 dark:text-slate-200">
                          <span className="col-span-1">1</span>
                          <span className="col-span-5">Pekerjaan Pondasi Batu Kali 1:4</span>
                          <span className="col-span-2 text-center">18.5 m³</span>
                          <span className="col-span-2 text-right">845.000</span>
                          <span className="col-span-2 text-right font-semibold">15.632.500</span>
                        </div>
                        <div className="grid grid-cols-12 p-2 text-slate-800 dark:text-slate-200 bg-slate-50/50 dark:bg-slate-900/50">
                          <span className="col-span-1">2</span>
                          <span className="col-span-5">Struktur Beton Bertulang K-225</span>
                          <span className="col-span-2 text-center">12.0 m³</span>
                          <span className="col-span-2 text-right">1.250.000</span>
                          <span className="col-span-2 text-right font-semibold">15.000.000</span>
                        </div>
                        <div className="grid grid-cols-12 p-2 bg-indigo-50/60 dark:bg-indigo-950/40 font-bold text-slate-900 dark:text-white border-t-2 border-slate-300 dark:border-slate-700">
                          <span className="col-span-6">TOTAL ANGGARAN + PPN 11%</span>
                          <span className="col-span-6 text-right text-indigo-700 dark:text-indigo-300 font-black">
                            Rp 34.002.075
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabId === 'surat' && (
                  <div className="space-y-3">
                    {/* Legal Document Canvas */}
                    <div className="w-full rounded-xl bg-white dark:bg-slate-950 p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                      <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-2">
                        <h4 className="text-xs sm:text-sm font-black uppercase text-slate-900 dark:text-white tracking-wide">
                          SURAT PERJANJIAN SEWA MENYEWA BANGUNAN
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Nomor: 042/SP-SBY/X/2026
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        Pada hari ini, Kamis tanggal dua puluh dua bulan Oktober tahun dua ribu dua puluh enam, telah dibuat kesepakatan hukum antara PIHAK PERTAMA (Pemilik Sah) dan PIHAK KEDUA (Penyewa)...
                      </p>

                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
                        <div className="border p-2 rounded text-center space-y-4">
                          <span>PIHAK PERTAMA</span>
                          <div className="font-bold text-slate-800 dark:text-slate-200 pt-6">( H. Rahmat Hidayat )</div>
                        </div>
                        <div className="border p-2 rounded text-center space-y-4 relative">
                          <span>PIHAK KEDUA</span>
                          <div className="w-10 h-7 mx-auto rounded border border-dashed border-rose-400 bg-rose-50 text-[8px] flex items-center justify-center font-bold text-rose-600 absolute top-5 left-1/2 -translate-x-1/2">
                            MATERAI
                          </div>
                          <div className="font-bold text-slate-800 dark:text-slate-200 pt-6">( Ir. Aditya Arta )</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTabId === 'pasfoto' && (
                  <div className="space-y-3">
                    {/* Pasfoto Canvas */}
                    <div className="w-full rounded-xl bg-white dark:bg-slate-950 p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 border-b pb-2">
                        <span className="font-bold text-slate-900 dark:text-white">Standar Format Pendaftaran CASN / BKN</span>
                        <span className="font-mono text-[10px]">Ukuran Cetak 3x4 &amp; 4x6</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                        <div className="p-2.5 rounded-lg bg-rose-600 text-white flex flex-col items-center justify-center space-y-1 shadow-xs">
                          <div className="w-16 h-20 bg-white/20 rounded border border-white/40 flex flex-col items-center justify-end p-1">
                            <span className="text-[8px] font-bold">KEMEJA PUTIH</span>
                            <span className="text-[7px]">DASI HITAM</span>
                          </div>
                          <span className="text-[10px] font-black uppercase">Latar Merah (Tahun Ganjil)</span>
                        </div>

                        <div className="p-2.5 rounded-lg bg-blue-600 text-white flex flex-col items-center justify-center space-y-1 shadow-xs">
                          <div className="w-16 h-20 bg-white/20 rounded border border-white/40 flex flex-col items-center justify-end p-1">
                            <span className="text-[8px] font-bold">JAS FORMAL</span>
                            <span className="text-[7px]">KEMEJA PUTIH</span>
                          </div>
                          <span className="text-[10px] font-black uppercase">Latar Biru (Tahun Genap)</span>
                        </div>

                        <div className="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border flex flex-col justify-center text-left text-xs space-y-1">
                          <span className="font-bold text-slate-900 dark:text-white text-[11px]">Panduan Teknis:</span>
                          <span className="text-[10px] text-slate-600 dark:text-slate-400">• Resolusi tajam 300 DPI</span>
                          <span className="text-[10px] text-slate-600 dark:text-slate-400">• Kompresi sub-200 KB</span>
                          <span className="text-[10px] text-slate-600 dark:text-slate-400">• Bebas bayangan latar</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Canvas Control Bar */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {activeTab.standardNote}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Gunakan 1 saldo token terpadu untuk mengekspor dokumen ini.
                    </span>
                  </div>

                  <a
                    href={activeTab.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition self-start sm:self-auto shrink-0 shadow-2xs"
                  >
                    <span>Coba di {activeTab.subdomain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ArtisanalHero;
