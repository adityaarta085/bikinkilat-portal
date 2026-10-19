'use client';

import React, { useState } from 'react';
import { 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  GitFork, 
  TrendingUp, 
  Camera, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ShieldCheck, 
  Zap,
  Eye,
  FileSpreadsheet,
  FileCheck
} from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  shortTitle: string;
  appName: string;
  subdomain: string;
  url: string;
  icon: any;
  format: string;
  standard: string;
  previewPrompt: string;
  previewResult: {
    heading: string;
    subheading: string;
    metaList: string[];
    sampleSnippet: string;
    stats: { label: string; value: string }[];
  };
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'slide',
    title: 'Slide Presentasi (.pptx)',
    shortTitle: 'Slide Presentasi',
    appName: 'Slide BikinKilat',
    subdomain: 'slide.bikinkilat.com',
    url: 'https://slide.bikinkilat.com',
    icon: Presentation,
    format: 'PPTX & DOCX',
    standard: 'Format Eksekutif 16:9 + Makalah Terstruktur',
    previewPrompt: 'Pitch Deck Solusi Agrotech Berkelanjutan untuk Petani Kopi Gayo',
    previewResult: {
      heading: 'Revolusi Rantai Pasok Kopi Gayo Berbasis AI & IOT',
      subheading: 'Deck Eksekutif Pendanaan Seri A - 12 Slide Terstruktur & Siap Papar',
      metaList: [
        '12 Slide Lengkap + Speaker Notes',
        'Analisis SWOT & Proyeksi Finansial 3 Tahun',
        'Citations & Data Statistik Kementan 2024'
      ],
      sampleSnippet: 'Slide 4: Validasi Pasar - Dari 15.000 hektar kebun kopi, 68% petani mengalami kendala volatilitas harga tengkulak. Solusi BikinKilat memangkas rantai distribusi hingga 3 layer langsung ke roastery nasional.',
      stats: [
        { label: 'Waktu Buat', value: '45 Detik' },
        { label: 'Format Asli', value: '.pptx 16:9' },
        { label: 'Speaker Notes', value: '100% Ada' }
      ]
    }
  },
  {
    id: 'modul',
    title: 'Modul Ajar (.docx)',
    shortTitle: 'Modul Ajar',
    appName: 'Modul BikinKilat',
    subdomain: 'modul.bikinkilat.com',
    url: 'https://modul.bikinkilat.com',
    icon: BookOpen,
    format: 'DOCX & PDF',
    standard: 'Kurikulum Merdeka Kemendikbudristek (Fase A-F)',
    previewPrompt: 'Informatika Fase E - Berpikir Komputasional & Algoritma Percabangan',
    previewResult: {
      heading: 'Modul Ajar Informatika: Berpikir Komputasional Fase E',
      subheading: 'Alokasi Waktu: 4 JP (2 x 45 Menit) - Dilengkapi LKPD & Rubrik Asesmen',
      metaList: [
        'Profil Pelajar Pancasila: Bernalar Kritis & Mandiri',
        'Asesmen Diagnostik, Formatif, dan Sumatif',
        'Lembar Kerja Peserta Didik (LKPD) Interaktif'
      ],
      sampleSnippet: 'Capaian Pembelajaran: Peserta didik mampu menganalisis abstraksi masalah sehari-hari dan merancang alur logika percabangan menggunakan diagram alir standar ISO.',
      stats: [
        { label: 'Kesesuaian', value: '100% Merdeka' },
        { label: 'Komponen', value: 'Lengkap Bab 1-3' },
        { label: 'Rubrik', value: 'Skor Otomatis' }
      ]
    }
  },
  {
    id: 'cv',
    title: 'CV ATS Indonesia (.pdf)',
    shortTitle: 'CV ATS',
    appName: 'CV BikinKilat',
    subdomain: 'cv.bikinkilat.com',
    url: 'https://cv.bikinkilat.com',
    icon: FileText,
    format: 'PDF & DOCX',
    standard: 'ATS-Friendly Score 94/100 (Workday, Taleo, Deel)',
    previewPrompt: 'Senior Full Stack Engineer (Next.js, Go, PostgreSQL, AWS)',
    previewResult: {
      heading: 'Aditya Pratama, S.Kom - Principal Systems Engineer',
      subheading: 'Skor ATS Terverifikasi: 94/100 - Terstruktur Format STAR',
      metaList: [
        'Kata Kunci Teknis Terpetakan Sempurna ke Algoritma HR',
        'Bebas Simbol Grafis Liar yang Menggagalkan Parsing Mesin',
        'Metrik Kuantitatif Nyata di Setiap Riwayat Karier'
      ],
      sampleSnippet: 'Memimpin arsitektur sistem edge gateway multi-regional, memangkas latensi API sebesar 42% dan menaikkan throughput transaksi hingga 15.000 QPS tanpa downtime.',
      stats: [
        { label: 'Skor ATS', value: '94/100' },
        { label: 'Format Ekspor', value: 'PDF Vector' },
        { label: 'Metode', value: 'STAR Framework' }
      ]
    }
  },
  {
    id: 'rab',
    title: 'RAB Konstruksi (.xlsx)',
    shortTitle: 'RAB Konstruksi',
    appName: 'RAB BikinKilat',
    subdomain: 'rab.bikinkilat.com',
    url: 'https://rab.bikinkilat.com',
    icon: Calculator,
    format: 'XLSX & PDF',
    standard: 'AHSP Permen PU-PR No. 8/2023 & SNI',
    previewPrompt: 'Pembangunan Rumah Tinggal 2 Lantai Tipe 120/150 di Wilayah Jabodetabek',
    previewResult: {
      heading: 'Rencana Anggaran Biaya (RAB) Rumah Tinggal 2 Lantai',
      subheading: 'Analisa Harga Satuan Pekerjaan (AHSP) Terkini + Rekapitulasi Pajak PPN 11%',
      metaList: [
        'Formula Excel Asli: =SUM, =SUMPRODUCT (Bukan Teks Diam)',
        'Harga Upah Tenaga Kerja & Material Standar Pemda 2024',
        'Kurva S Terjadwal untuk Time-Schedule Proyek'
      ],
      sampleSnippet: 'Pekerjaan Pondasi Plat Beton Bertulang K-250 (Volume 18.5 m3) - Upah Pekerja: Rp 2.450.000, Bahan Material: Rp 16.780.000, Total AHSP: Rp 19.230.000.',
      stats: [
        { label: 'Formula', value: '100% Dinamis' },
        { label: 'Standar', value: 'PU-PR 2023' },
        { label: 'Ekspor', value: 'MS Excel .xlsx' }
      ]
    }
  },
  {
    id: 'surat',
    title: 'Surat & Kontrak Legal (.docx)',
    shortTitle: 'Surat & Kontrak',
    appName: 'Surat BikinKilat',
    subdomain: 'surat.bikinkilat.com',
    url: 'https://surat.bikinkilat.com',
    icon: Scale,
    format: 'DOCX & PDF',
    standard: 'KUHPerdata Pasal 1320 & Standar e-Meterai Peruri',
    previewPrompt: 'Surat Perjanjian Kerja Waktu Tertentu (PKWT) Pengembang Web & Hak Cipta',
    previewResult: {
      heading: 'Perjanjian Kerja Sama Jasa Konsultansi & Pengembangan Web',
      subheading: 'Pasal-Pasal Sah KUHPerdata, Kerahasiaan (NDA), dan Klausul Arbitrase BANI',
      metaList: [
        'Identitas Komprehensif Para Pihak Sesuai KTP & NIB',
        'Klausul Penyelesaian Sengketa di BANI / Pengadilan Negeri',
        'Area Penempelan e-Meterai Resmi 10.000 Terkalibrasi'
      ],
      sampleSnippet: 'Pasal 7 (Hak Kekayaan Intelektual): Seluruh kode sumber, dokumentasi teknis, dan hak cipta karya cipta beralih penuh kepada PIHAK PERTAMA setelah pelunasan termin ketiga.',
      stats: [
        { label: 'Keabsahan', value: 'KUHPerdata' },
        { label: 'Klausul', value: 'Anti-Wanprestasi' },
        { label: 'Format', value: 'Word & PDF' }
      ]
    }
  },
  {
    id: 'waris',
    title: 'Kalkulator Waris Faraidh',
    shortTitle: 'Kalkulator Waris',
    appName: 'Waris BikinKilat',
    subdomain: 'waris.bikinkilat.com',
    url: 'https://waris.bikinkilat.com',
    icon: GitFork,
    format: 'PDF & Cetak',
    standard: 'Kompilasi Hukum Islam (KHI) Inpres No. 1/1991',
    previewPrompt: 'Harta Bersih Rp 1.200.000.000: Ahli Waris Istri, 2 Anak Laki-laki, 1 Anak Perempuan, Ibu',
    previewResult: {
      heading: 'Rincian Pembagian Waris Faraidh Islam Terverifikasi',
      subheading: 'Berdasarkan Surat An-Nisa & Kompilasi Hukum Islam (KHI) Bab II Pasal 176-185',
      metaList: [
        'Kalkulasi Otomatis Furudhul Muqaddarah (1/2, 1/4, 1/8, 2/3, 1/3, 1/6)',
        'Perhitungan Asal Masalah (KPK Penyebut) & Tashih Sempurna',
        'Sistem Perlindungan Masalah Aul & Radd Tanpa Sisa'
      ],
      sampleSnippet: 'Istri mendapat 1/8 (Rp 150.000.000), Ibu mendapat 1/6 (Rp 200.000.000). Sisa ashabah Rp 850.000.000 dibagi anak dengan proporsi 2:1 (Anak Laki-laki @Rp 340.000.000, Anak Perempuan Rp 170.000.000).',
      stats: [
        { label: 'Akurasi', value: '100% Syar\'i' },
        { label: 'Selisih', value: 'Rp 0 (Presisi)' },
        { label: 'KHI Standar', value: 'Pasal 176-185' }
      ]
    }
  },
  {
    id: 'proposal',
    title: 'Proposal Hibah & Skripsi (.docx)',
    shortTitle: 'Proposal Hibah',
    appName: 'Proposal BikinKilat',
    subdomain: 'proposal.bikinkilat.com',
    url: 'https://proposal.bikinkilat.com',
    icon: TrendingUp,
    format: 'DOCX & PDF',
    standard: 'Format Panduan Hibah Dikti & Skripsi Universitas',
    previewPrompt: 'Penerapan Machine Learning untuk Deteksi Dini Penyakit Tanaman Padi',
    previewResult: {
      heading: 'Proposal Penelitian: Deep Learning Klasifikasi Penyakit Daun Padi',
      subheading: 'Struktur BAB 1 Latar Belakang, BAB 2 Tinjauan Pustaka, BAB 3 Metodologi Penelitian',
      metaList: [
        'Rumusan Masalah, Tujuan & Manfaat Terstruktur Tajam',
        'Matriks State-of-the-Art Kajian Literatur 5 Tahun Terakhir',
        'Jadwal Riset Diagram Gantt & Anggaran Biaya Standar PMK'
      ],
      sampleSnippet: 'BAB 1.2 Rumusan Masalah: Bagaimana mereduksi tingkat False Positive pada klasifikasi citra daun padi dalam kondisi pencahayaan dinamis di lahan sawah terbuka menggunakan model Convolutional Neural Network?',
      stats: [
        { label: 'Format Bab', value: 'BAB 1 s/d 3' },
        { label: 'Kutipan', value: 'APA / IEEE' },
        { label: 'Ekspor', value: '.docx Rapi' }
      ]
    }
  },
  {
    id: 'pasfoto',
    title: 'Pasfoto Resmi SSCASN (.jpg)',
    shortTitle: 'Pasfoto Resmi',
    appName: 'Pasfoto BikinKilat',
    subdomain: 'pasfoto.bikinkilat.com',
    url: 'https://pasfoto.bikinkilat.com',
    icon: Camera,
    format: 'JPG & Lembar Cetak 4R',
    standard: 'Regulasi BKN SSCASN CPNS / PPPK 2024',
    previewPrompt: 'Pasfoto Formal Latar Belakang Merah Resmi (Hex #D32F2F) Berjas Hitam & Dasi',
    previewResult: {
      heading: 'Pasfoto Formal Standar Instansi & Pendaftaran BKN',
      subheading: 'Ukuran 4x6 & 3x4 Kalibrasi 300 DPI - Ukuran Berkas Otomatis 120 KB - 180 KB',
      metaList: [
        'Segmentasi Potret AI Presisi hingga Helai Rambut',
        'Pilihan Busana: Jas Hitam Dasi, Kemeja Putih Polos, Hijab Formal',
        'Format Lembar Cetak Grid 4R Siap Cetak ke Percetakan'
      ],
      sampleSnippet: 'Verifikasi Sistem SSCASN: Resolusi 472 x 709 piksel, Latar Belakang Merah Standar Kemendagri, Tidak Buram, Wajah Menghadap Lurus Kedepan, Proporsi Wajah 75% dari Bidang Foto.',
      stats: [
        { label: 'DPI Cetak', value: '300 DPI' },
        { label: 'Ukuran File', value: '< 200 KB' },
        { label: 'Kepatuhan', value: '100% SSCASN' }
      ]
    }
  }
];

export function InteractiveShowcase() {
  const [selectedId, setSelectedId] = useState<string>('slide');
  const activeItem = SHOWCASE_ITEMS.find((item) => item.id === selectedId) || SHOWCASE_ITEMS[0];
  const IconComponent = activeItem.icon;

  return (
    <section className="py-24 scroll-mt-16 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Live Studio Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Lihat Standar Kualitas Dokumen yang Dihasilkan
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Bukan sekadar teks generik. Sistem BikinKilat menghasilkan file dokumen asli yang telah disesuaikan dengan regulasi hukum, kurikulum, dan tata naskah resmi Indonesia.
          </p>
        </div>

        {/* Tab Selector Pills */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {SHOWCASE_ITEMS.map((item) => {
            const ItemIcon = item.icon;
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                }`}
              >
                <ItemIcon className="w-4 h-4 shrink-0" />
                <span>{item.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Box */}
        <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Top Bar Window Mockup */}
          <div className="px-6 py-4 bg-slate-900/80 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 pl-2 border-l border-slate-700">
                {activeItem.subdomain}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300">
                {activeItem.format}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Produksi Aktif
              </span>
            </div>
          </div>

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            
            {/* Left Column: Input Prompt Simulation & Metadata (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{activeItem.appName}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {activeItem.title}
                </h3>

                <p className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{activeItem.standard}</span>
                </p>

                {/* Simulated Input Query Box */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-700/80 mb-6">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Contoh Topik / Permintaan Input
                  </label>
                  <p className="text-xs sm:text-sm font-mono text-indigo-200 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                    "{activeItem.previewPrompt}"
                  </p>
                </div>

                {/* Key Checklist Features */}
                <div className="space-y-2.5">
                  {activeItem.previewResult.metaList.map((meta, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{meta}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Launch CTA */}
              <div className="pt-4 border-t border-slate-700/60">
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Buka {activeItem.appName}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Output Renderer Mockup (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900/95 rounded-2xl border border-slate-700/80 p-6 flex flex-col justify-between shadow-inner">
              
              <div>
                {/* Header of the simulated document */}
                <div className="border-b border-slate-800 pb-4 mb-4">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">
                    [Keluaran Terkompilasi Otomatis]
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {activeItem.previewResult.heading}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {activeItem.previewResult.subheading}
                  </p>
                </div>

                {/* Simulated Content Snippet */}
                <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                  <div className="text-[11px] text-slate-500 font-mono mb-2 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Kutipan Isi Dokumen Resmi:</span>
                  </div>
                  <p className="italic text-slate-300">
                    "{activeItem.previewResult.sampleSnippet}"
                  </p>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                {activeItem.previewResult.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 text-center">
                    <div className="text-[10px] text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-sm font-extrabold text-indigo-300 mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default InteractiveShowcase;
