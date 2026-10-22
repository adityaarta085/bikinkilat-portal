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
  FileCheck,
  Lock
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
      sampleSnippet: 'Kegiatan Inti (60 Menit): Peserta didik mengidentifikasi dekomposisi masalah sehari-hari melalui studi kasus antrian kasir supermarket, memetakan variabel logika percabangan IF-THEN-ELSE.',
      stats: [
        { label: 'Kurikulum', value: 'Merdeka Kemendikbud' },
        { label: 'LKPD', value: 'Terintegrasi' },
        { label: 'Rubrik', value: 'Skor 1-4 Sah' }
      ]
    }
  },
  {
    id: 'cv',
    title: 'Resume & CV ATS (.pdf)',
    shortTitle: 'CV ATS Ramah HR',
    appName: 'CV BikinKilat',
    subdomain: 'cv.bikinkilat.web.id',
    url: 'https://cv.bikinkilat.web.id',
    icon: FileText,
    format: 'PDF ATS & DOCX',
    standard: 'Parsing Algoritma ATS Workday, Taleo & Greenhouse',
    previewPrompt: 'Senior Fullstack Engineer dengan Pengalaman 4 Tahun di Startup Fintech',
    alternativePrompts: [
      'Senior Fullstack Engineer Fintech 4 Thn',
      'Digital Marketing Specialist FMCG',
      'Fresh Graduate Manajemen Bisnis'
    ],
    previewResult: {
      heading: 'Curriculum Vitae - Fajar Pratama, S.Kom.',
      subheading: 'Skor ATS Teruji 94/100 - Tata Letak Single Column Standar Global',
      metaList: [
        'Formula X-Y-Z Action Verbs (Google Recruiter Standard)',
        'Bebas Tabel & Grafik Tersembunyi Penyebab Gagal Parsing',
        'Penyelarasan Kata Kunci Lowongan Relevan'
      ],
      sampleSnippet: 'Pengalaman Profesional: Merekayasa ulang sistem settlement payment gateway menggunakan arsitektur event-driven Go & Kafka, menurunkan latency transaksi sebesar 42% dan memproses Rp 12M volume harian.',
      stats: [
        { label: 'Skor ATS', value: '94 / 100' },
        { label: 'Standar', value: 'Global ATS' },
        { label: 'Waktu Parsing', value: '< 2 Detik' }
      ]
    }
  },
  {
    id: 'rab',
    title: 'RAB Konstruksi SNI (.xlsx)',
    shortTitle: 'RAB Konstruksi SNI',
    appName: 'RAB BikinKilat',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    icon: Calculator,
    format: 'Excel (.xlsx) Formula Aktif',
    standard: 'Permen PU-PR No. 8/2023 & SNI Analisa Harga Satuan Pekerjaan (AHSP)',
    previewPrompt: 'Pembangunan Rumah Tinggal 2 Lantai Tipe 120/150 di Wilayah Jabodetabek',
    alternativePrompts: [
      'Rumah Tinggal 2 Lantai Tipe 120 Jabodetabek',
      'Renovasi Ruko Komersial 3 Lantai',
      'Pengaspalan Jalan Lingkungan 500 Meter'
    ],
    previewResult: {
      heading: 'Rencana Anggaran Biaya (RAB) Rumah Tinggal 2 Lantai',
      subheading: 'Rekapitulasi Induk, AHSP Upah & Material, Volume Pekerjaan Terinci',
      metaList: [
        'Formula Excel Matematika Dinamis (=SUM, =PRODUCT) 100% Aktif',
        'Database Koefisien SNI Tenaga Kerja, Mandor & Material Terkini',
        'Format Siap Verifikasi Bank Syariah / BTN KPR'
      ],
      sampleSnippet: 'Item 3.2 Pekerjaan Beton Bertulang Kolom Praktis 15x15 (K-225): Volume 4.8 m³, Analisa AHSP PU-PR 2023, Harga Satuan Rp 4.250.000, Total Rp 20.400.000 (Formula Aktif =D14*E14).',
      stats: [
        { label: 'Regulasi', value: 'PU-PR 8/2023' },
        { label: 'Formula Excel', value: '100% Terbuka' },
        { label: 'Database AHSP', value: 'Update 2024' }
      ]
    }
  },
  {
    id: 'surat',
    title: 'Kontrak Hukum & Perjanjian (.docx)',
    shortTitle: 'Surat & Perjanjian',
    appName: 'Surat BikinKilat',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    icon: Scale,
    format: 'DOCX & PDF Meterai Siap',
    standard: 'Kitab Undang-Undang Hukum Perdata (KUHPerdata) Pasal 1320 & 1338',
    previewPrompt: 'Perjanjian Kerjasama Bagi Hasil Usaha Kafe antara Pemodal dan Pengelola',
    alternativePrompts: [
      'Perjanjian Kerjasama Bagi Hasil Kafe',
      'Surat Perjanjian Sewa Rumah Kontrak 2 Thn',
      'Non-Disclosure Agreement (NDA) Vendor'
    ],
    previewResult: {
      heading: 'Surat Perjanjian Kerjasama Penanaman Modal & Operasional Usaha',
      subheading: '14 Pasal Komprehensif: Hak, Kewajiban, Force Majeure, & Domisili Hukum BANI',
      metaList: [
        'Klausul Klausul Wanprestasi & Mekanisme Ganti Rugi Jelas',
        'Kolom Tanda Tangan Kompatibel Meterai Elektronik (e-Meterai Peruri)',
        'Legal Drafting Bahasa Hukum Indonesia Baku & Mengikat'
      ],
      sampleSnippet: 'Pasal 6 Pembagian Keuntungan: PIHAK PERTAMA dan PIHAK KEDUA sepakat bahwa laba bersih operasional (Net Profit) setelah dipotong biaya operasional disetorkan setiap tanggal 5 per bulan dengan proporsi 60:40.',
      stats: [
        { label: 'Yuridiksi', value: 'KUHPerdata RI' },
        { label: 'Meterai', value: 'Format Siap' },
        { label: 'Klausul', value: 'Bebas Ambigu' }
      ]
    }
  },
  {
    id: 'waris',
    title: 'Hitung Waris Faraidh (.pdf)',
    shortTitle: 'Waris Faraidh',
    appName: 'Waris BikinKilat',
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    icon: GitFork,
    format: 'PDF Laporan Fatwa Waris',
    standard: 'Kompilasi Hukum Islam (KHI) Inpres No. 1/1991 & 4 Madzhab',
    previewPrompt: 'Ahli Waris: Istri, 2 Anak Laki-Laki, 1 Anak Perempuan, Ibu Kandung. Harta Bersih Rp 1.200.000.000',
    alternativePrompts: [
      'Istri, 2 Anak LK, 1 Anak PR, Ibu (Rp 1.2M)',
      'Suami, 1 Anak Perempuan, 1 Saudara LK',
      '3 Anak Perempuan, Paman Kandung (Ashabah)'
    ],
    previewResult: {
      heading: 'Kalkulasi Ketetapan Bagian Waris Islam (Faraidh)',
      subheading: 'Penetapan Furudhul Muqaddarah, Ashabah, dan Dalil Al-Qur\'an An-Nisa',
      metaList: [
        'Perhitungan Asal Masalah, Hijab Hirman & Nuqsan Akurat',
        'Pengurangan Hak Jenazah: Hutang, Wasiat (Maks 1/3) & Biaya Tajhiz',
        'Rincian Nominal Rupiah Persis per Ahli Waris'
      ],
      sampleSnippet: 'Ibu Kandung memperoleh 1/6 bagian (Rp 200.000.000) karena pewaris meninggalkan anak (QS. An-Nisa: 11). Istri memperoleh 1/8 bagian (Rp 150.000.000). Sisa Rp 850.000.000 dibagi Ashabah Bil Ghair 2:1.',
      stats: [
        { label: 'Landasan', value: 'KHI & An-Nisa' },
        { label: 'Rincian Hak', value: '100% Klir' },
        { label: 'Penyelesaian', value: 'Tashih Mas\'alah' }
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
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  
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
    }, 300);

    setTimeout(() => {
      setSimulationStage(3);
      setIsSimulating(false);
    }, 650);
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-indigo-100/40 via-sky-100/30 to-violet-100/30 dark:from-indigo-950/20 dark:via-sky-950/15 dark:to-violet-950/20 blur-3xl rounded-full pointer-events-none -z-10 animate-aurora" />

      <div 
        ref={ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold mb-4">
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

        {/* Segmented Control Tab Bar */}
        <div className="flex items-center justify-start lg:justify-center gap-1.5 overflow-x-auto pb-2 mb-8 scrollbar-none">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-2xs">
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
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <ItemIcon className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Studio Workspace Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Top Window Bar */}
          <div className="px-5 sm:px-6 py-3 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-xs font-mono text-slate-700 dark:text-slate-300 shadow-2xs">
                <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>https://{activeItem.subdomain}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-mono">
                {activeItem.format}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
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
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex items-center gap-1 active:scale-95"
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
                          className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all text-left active:scale-95 ${
                            activePrompt === altPrompt
                              ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold scale-[1.02]'
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
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-95 active:bg-black dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center gap-2 group ring-1 ring-slate-900/10 dark:ring-indigo-400/20"
                >
                  <span>Buka {activeItem.appName}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Output Document Paper (7 Cols) */}
            <div className={`lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 ${
              isSimulating ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'
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
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex items-center gap-1 active:scale-95"
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
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700 text-center hover:scale-105 transition-transform">
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
