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
  alternativePrompts: string[];
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
    subdomain: 'slide.bikinkilat.web.id',
    url: 'https://slide.bikinkilat.web.id',
    icon: Presentation,
    format: 'PPTX & DOCX',
    standard: 'Format Eksekutif 16:9 + Makalah Terstruktur',
    previewPrompt: 'Pitch Deck Solusi Agrotech Berkelanjutan untuk Petani Kopi Gayo',
    alternativePrompts: [
      'Pitch Deck Solusi Agrotech Kopi Gayo',
      'Strategi Penetrasi B2B SaaS Logistik',
      'Sidang Skripsi NLP Machine Learning'
    ],
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
    subdomain: 'modul.bikinkilat.web.id',
    url: 'https://modul.bikinkilat.web.id',
    icon: BookOpen,
    format: 'DOCX & PDF',
    standard: 'Kurikulum Merdeka Kemendikbudristek (Fase A-F)',
    previewPrompt: 'Informatika Fase E - Berpikir Komputasional & Algoritma Percabangan',
    alternativePrompts: [
      'Informatika Fase E - Berpikir Komputasional',
      'Matematika Fase D - Geometri & Bangun Datar',
      'Bahasa Indonesia Fase C - Teks Eksplanasi'
    ],
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
    subdomain: 'cv.bikinkilat.web.id',
    url: 'https://cv.bikinkilat.web.id',
    icon: FileText,
    format: 'PDF & DOCX',
    standard: 'ATS-Friendly Score 94/100 (Workday, Taleo, Deel)',
    previewPrompt: 'Senior Full Stack Engineer (Next.js, Go, PostgreSQL, AWS)',
    alternativePrompts: [
      'Senior Full Stack Engineer (Next.js & Cloud)',
      'Product Manager Perbankan Digital QRIS',
      'Data Analyst & Business Intelligence'
    ],
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
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    icon: Calculator,
    format: 'XLSX & PDF',
    standard: 'AHSP Permen PU-PR No. 8/2023 & SNI',
    previewPrompt: 'Pembangunan Rumah Tinggal 2 Lantai Tipe 120/150 di Wilayah Jabodetabek',
    alternativePrompts: [
      'Rumah 2 Lantai Tipe 120/150 Jabodetabek',
      'Renovasi Ruko Komersial 3 Lantai SNI',
      'Pekerjaan Interior & Fit-Out Kantor'
    ],
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
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    icon: Scale,
    format: 'DOCX & PDF',
    standard: 'KUHPerdata Pasal 1320 & Standar e-Meterai Peruri',
    previewPrompt: 'Surat Perjanjian Kerja Waktu Tertentu (PKWT) Pengembang Web & Hak Cipta',
    alternativePrompts: [
      'Perjanjian Kerja PKWT Pengembang Web',
      'Perjanjian Kerahasiaan (NDA) Investasi',
      'Somasi & Peringatan Wanprestasi Kontrak'
    ],
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
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    icon: GitFork,
    format: 'PDF & Cetak',
    standard: 'Kompilasi Hukum Islam (KHI) Inpres No. 1/1991',
    previewPrompt: 'Harta Bersih Rp 1.200.000.000: Ahli Waris Istri, 2 Anak Laki-laki, 1 Anak Perempuan, Ibu',
    alternativePrompts: [
      'Harta 1,2 M: Istri, 2 Anak Lk, 1 Pr, Ibu',
      'Harta 450 Jt: Suami, 1 Anak Pr, Ayah, Ibu',
      'Harta 800 Jt: 3 Anak Perempuan, Saudara Lk'
    ],
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
    subdomain: 'proposal.bikinkilat.web.id',
    url: 'https://proposal.bikinkilat.web.id',
    icon: TrendingUp,
    format: 'DOCX & PDF',
    standard: 'Format Panduan Hibah Dikti & Skripsi Universitas',
    previewPrompt: 'Penerapan Machine Learning untuk Deteksi Dini Penyakit Tanaman Padi',
    alternativePrompts: [
      'Deep Learning Klasifikasi Daun Padi',
      'Monitoring IoT Kualitas Air Tambak',
      'Analisis Sentimen Kebijakan Publik NLP'
    ],
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
    subdomain: 'pasfoto.bikinkilat.web.id',
    url: 'https://pasfoto.bikinkilat.web.id',
    icon: Camera,
    format: 'JPG & Lembar Cetak 4R',
    standard: 'Regulasi BKN SSCASN CPNS / PPPK 2024',
    previewPrompt: 'Pasfoto Formal Latar Belakang Merah Resmi (Hex #D32F2F) Berjas Hitam & Dasi',
    alternativePrompts: [
      'Latar Merah Resmi SSCASN Jas & Dasi',
      'Latar Biru KTP / Ijazah Kemeja Putih',
      'Hijab Formal Latar Putih Standar Visa'
    ],
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
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStage, setSimulationStage] = useState<number>(3);
  const [activePrompt, setActivePrompt] = useState<string>(SHOWCASE_ITEMS[0].previewPrompt);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  
  const activeItem = SHOWCASE_ITEMS.find((item) => item.id === selectedId) || SHOWCASE_ITEMS[0];
  const IconComponent = activeItem.icon;

  const triggerSimulation = (newPrompt?: string) => {
    if (newPrompt) {
      setActivePrompt(newPrompt);
    }
    setIsSimulating(true);
    setSimulationStage(1);

    setTimeout(() => {
      setSimulationStage(2);
    }, 250);

    setTimeout(() => {
      setSimulationStage(3);
      setIsSimulating(false);
    }, 600);
  };

  const handleCopySnippet = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(activeItem.previewResult.sampleSnippet);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <section className="py-20 sm:py-24 scroll-mt-16 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 text-slate-900 dark:text-slate-100 relative overflow-hidden border-y border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Apple Refraction Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-indigo-100/40 via-sky-100/30 to-violet-100/30 dark:from-indigo-950/20 dark:via-sky-950/15 dark:to-violet-950/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold shadow-2xs mb-4">
            <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Live Studio Preview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Lihat Standar Mutu Dokumen Resmi
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
            Bukan sekadar teks generik tanpa format. Sistem BikinKilat langsung menyusun dokumen berstruktur lengkap yang siap pakai, taat regulasi hukum, kurikulum nasional, dan tata naskah dinas Indonesia.
          </p>
        </div>

        {/* Apple Segmented Control Tab Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 backdrop-blur-md border border-slate-300/60 dark:border-slate-700 shadow-inner">
            {SHOWCASE_ITEMS.map((item) => {
              const ItemIcon = item.icon;
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedId(item.id);
                    setActivePrompt(item.previewPrompt);
                    triggerSimulation(item.previewPrompt);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700 ring-1 ring-slate-900/5'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <ItemIcon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Liquid Glass Studio Workspace Container */}
        <div className="bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.06)] overflow-hidden ring-1 ring-slate-900/[0.03] dark:ring-white/[0.03]">
          
          {/* Top Window Bar - macOS / VisionOS Frosted Style */}
          <div className="px-5 sm:px-6 py-3.5 bg-slate-50/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>https://{activeItem.subdomain}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono">
                {activeItem.format}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <span>Siap Produksi</span>
              </span>
            </div>
          </div>

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            
            {/* Left Column: Input Prompt Simulation & Metadata (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <IconComponent className="w-4 h-4" />
                  <span>{activeItem.appName}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                  {activeItem.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{activeItem.standard}</span>
                </p>

                {/* Simulated Input Query Box */}
                <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Simulasi Topik Masukan
                    </label>
                    <button
                      type="button"
                      onClick={() => triggerSimulation(activePrompt)}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Uji Respons</span>
                    </button>
                  </div>
                  
                  <div className="text-xs sm:text-sm font-sans font-medium text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-2xs leading-relaxed mb-3">
                    &ldquo;{activePrompt}&rdquo;
                  </div>

                  {/* Quick Alternate Prompt Chips */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
                      Pilihan Topik Cepat:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeItem.alternativePrompts.map((altPrompt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => triggerSimulation(altPrompt)}
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition text-left ${
                            activePrompt === altPrompt
                              ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {altPrompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compilation Progress Stages */}
                <div className="p-3 bg-white/90 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 mb-6">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    <span>Status Otomasi Dokumen:</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">
                      {simulationStage === 1 && 'Tahap 1: Validasi Regulasi'}
                      {simulationStage === 2 && 'Tahap 2: Kompilasi Naskah'}
                      {simulationStage === 3 && '100% Selesai (Siap Unduh)'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 rounded-full"
                      style={{ width: simulationStage === 1 ? '35%' : simulationStage === 2 ? '70%' : '100%' }}
                    />
                  </div>
                </div>

                {/* Key Checklist Features */}
                <div className="space-y-2.5">
                  {activeItem.previewResult.metaList.map((meta, index) => (
                    <div key={index} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{meta}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Launch CTA */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
                <a
                  href={activeItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group ring-1 ring-slate-900/10 dark:ring-indigo-400/20"
                >
                  <span>Buka {activeItem.appName}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Output Document Paper (7 Cols) */}
            <div className={`lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 ${
              isSimulating ? 'opacity-50 scale-[0.99]' : 'opacity-100 scale-100'
            }`}>
              
              <div>
                {/* Header of the simulated document */}
                <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800 px-2 py-0.5 rounded-md uppercase tracking-wider font-bold">
                      Keluaran Dokumen Sah
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex items-center gap-1"
                    >
                      {hasCopied ? (
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Tersalin!
                        </span>
                      ) : (
                        <span>Salin Petikan</span>
                      )}
                    </button>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {activeItem.previewResult.heading}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                    {activeItem.previewResult.subheading}
                  </p>
                </div>

                {/* Simulated Content Snippet Paper Card */}
                <div className="bg-slate-50/70 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/70 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-sans leading-relaxed mb-6">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>Petikan Struktur Naskah Resmi:</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">Status: Validasi OK</span>
                  </div>
                  <p className="italic text-slate-800 dark:text-slate-200 bg-white/80 dark:bg-slate-900 p-3.5 rounded-lg border border-slate-200/50 dark:border-slate-700 leading-relaxed shadow-2xs">
                    &ldquo;{activeItem.previewResult.sampleSnippet}&rdquo;
                  </p>
                </div>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                {activeItem.previewResult.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 text-center">
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{stat.value}</div>
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
