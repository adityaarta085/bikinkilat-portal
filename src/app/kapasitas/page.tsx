'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Coins, 
  CheckCircle2, 
  Sparkles, 
  ArrowLeft, 
  Clock, 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  FileCheck, 
  Camera, 
  TrendingUp,
  ShieldCheck,
  Lock,
  FileSpreadsheet,
  Award,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';

const TOOLS_LIST = [
  { 
    name: 'Slide & Makalah', 
    cost: '2 Kuota', 
    icon: Presentation, 
    url: 'https://slide.bikinkilat.web.id',
    desc: 'Draf presentasi 16:9 widescreen & naskah makalah ilmiah',
    formats: '.pptx, .docx'
  },
  { 
    name: 'Modul Ajar Guru', 
    cost: '2 Kuota', 
    icon: BookOpen, 
    url: 'https://modul.bikinkilat.web.id',
    desc: 'RPP Kurikulum Merdeka, LKPD, rubrik asesmen, bank soal HOTS',
    formats: '.docx, .pdf'
  },
  { 
    name: 'Resume Standar ATS', 
    cost: '1 Kuota', 
    icon: FileText, 
    url: 'https://cv.bikinkilat.web.id',
    desc: 'Resume ramah parser sistem ATS dan surat lamaran kerja',
    formats: '.docx, .pdf'
  },
  { 
    name: 'Kalkulator RAB Anggaran', 
    cost: '2 Kuota', 
    icon: Calculator, 
    url: 'https://rab.bikinkilat.web.id',
    desc: 'Perhitungan estimasi biaya konstruksi, renovasi, & event',
    formats: '.xlsx, .pdf'
  },
  { 
    name: 'Surat Kontrak & Somasi', 
    cost: '2 Kuota', 
    icon: Scale, 
    url: 'https://surat.bikinkilat.web.id',
    desc: 'Draf perjanjian kerja, sewa menyewa, SPK, dan somasi resmi',
    formats: '.docx, .pdf'
  },
  { 
    name: 'Kalkulator Faraidh Waris', 
    cost: '1 Kuota', 
    icon: FileCheck, 
    url: 'https://waris.bikinkilat.web.id',
    desc: 'Simulasi pembagian hak waris sesuai Kompilasi Hukum Islam (KHI)',
    formats: '.pdf'
  },
  { 
    name: 'Proposal Usaha & KUR', 
    cost: '2 Kuota', 
    icon: TrendingUp, 
    url: 'https://proposal.bikinkilat.web.id',
    desc: 'Business plan perbankan, permohonan KUR UMKM, proposal sponsor',
    formats: '.docx, .pdf'
  },
  { 
    name: 'Studio Pasfoto CPNS', 
    cost: '3 Kuota', 
    icon: Camera, 
    url: 'https://pasfoto.bikinkilat.web.id',
    desc: 'Jas formal, kemeja putih, latar merah/biru, lembar cetak 4R',
    formats: '.png, .jpg'
  },
];

export default function KapasitasPage() {
  const { user, tokens, openAuthModal, signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error('Login error:', e);
      openAuthModal();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
        {/* Navigation & Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Inisiatif Publik 100% Bebas Biaya (Rp 0)</span>
          </div>
        </div>

        {/* Minimal Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Pusat Panduan Kapasitas &amp; Kuota Layanan Publik
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Seluruh layanan pada ekosistem BikinKilat.web.id disediakan secara terbuka tanpa biaya bagi seluruh masyarakat Indonesia. Kami menerapkan kebijakan pemanfaatan wajar (fair-use policy) 20 kuota dokumen gratis per hari untuk menjamin keandalan dan keadilan akses bagi semua orang.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Kuota & Fair-Use Policy (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Quota Balance Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 flex items-center justify-center text-amber-500">
                    <Coins className="w-6 h-6 fill-amber-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Status Akun Anda
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white truncate max-w-[240px]">
                      {user ? user.email : 'Pengunjung Tamu'}
                    </h2>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white">
                    {user ? tokens : 0}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                    {user ? 'Kuota Tersedia Hari Ini' : '0 Kuota Aktif'}
                  </span>
                </div>
              </div>

              {/* Status Reset Info */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800/60 flex items-start gap-3 text-xs">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-indigo-950 dark:text-indigo-200">
                    Pembaruan Otomatis Setiap Malam (00:00 WIB)
                  </p>
                  <p className="text-indigo-900/80 dark:text-indigo-300/80 leading-relaxed">
                    Setiap hari tepat pukul 00:00 WIB (Tengah Malam), sistem otomatis mengisi ulang alokasi akun Anda kembali menjadi <strong>20 kuota penuh</strong> tanpa dipungut biaya sepeser pun.
                  </p>
                </div>
              </div>

              {!user && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <span className="text-amber-900 dark:text-amber-200 font-bold block">
                      Aktifkan 20 Kuota Gratis Anda
                    </span>
                    <span className="text-amber-800/80 dark:text-amber-300/80 text-[11px] block">
                      Masuk dengan akun Google untuk mengaktifkan alokasi kuota harian.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shrink-0 transition"
                  >
                    Masuk Akun
                  </button>
                </div>
              )}
            </div>

            {/* Fair-Use Explanation FAQ */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-extrabold text-sm border-b border-slate-100 dark:border-slate-800 pb-3">
                <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Panduan Pemanfaatan Wajar (Fair-Use Policy)</span>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Mengapa diberlakukan batas 20 kuota per hari?
                  </h3>
                  <p>
                    Sebagai inisiatif publik terbuka yang memproses perakitan berkas dokumen secara gratis, pembatasan 20 generasi per hari bertujuan mencegah eksploitasi oleh bot scraping otomatis serta menjamin stabilitas kecepatan pemrosesan dokumen bagi ribuan pendidik, pelajar, dan masyarakat umum lainnya.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Apakah ada biaya tersembunyi atau pembelian kuota?
                  </h3>
                  <p>
                    <strong>Tidak ada.</strong> Layanan ini 100% bebas biaya layanan (Rp 0). Kami tidak menjual paket token, tidak memungut biaya langganan bulanan, dan tidak meminta pembayaran kartu kredit atau perbankan apa pun.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                    Bagaimana jika kuota harian saya habis hari ini?
                  </h3>
                  <p>
                    Anda cukup menunggu hingga pergantian hari pukul 00:00 WIB. Kuota akun Anda akan otomatis terisi penuh kembali menjadi 20 kuota siap pakai.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Matriks Kebutuhan Kuota 9 Layanan (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Matriks Penggunaan 9 Layanan
              </span>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                100% Dokumen Siap Edit
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOOLS_LIST.map((tool) => {
                const IconComp = tool.icon;
                return (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 transition flex flex-col justify-between group shadow-2xs hover:shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/70 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200/70 dark:border-amber-800">
                          {tool.cost}
                        </span>
                      </div>
                      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>Format: {tool.formats}</span>
                      <ExternalLink className="w-3 h-3 group-hover:text-indigo-500 transition-colors" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4 Pilar Layanan Publik */}
        <section className="pt-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-3 py-0.5 rounded-full">
              Prinsip Layanan Publik
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
              Komitmen Keterbukaan &amp; Bebas Biaya
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">100% Bebas Biaya Layanan</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Seluruh 9 sarana otomasi dokumen dapat digunakan cuma-cuma tanpa pungutan biaya, biaya berlangganan, atau tagihan.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Format Asli Siap Edit</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Unduhan langsung berupa berkas standar perkantoran (.docx, .pptx, .xlsx) tanpa pembatasan tanda air berbayar.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Privasi Berstandar UU PDP</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Naskah diproses sementara di memori peladen terisolasi dan tidak pernah dimanfaatkan untuk melatih kecerdasan buatan umum.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Standar Tata Naskah RI</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Struktur dokumen diprogram taat acuan Kurikulum Merdeka, Permen PU-PR, regulasi Faraidh KHI, dan standar SSCASN.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
