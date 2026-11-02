'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Coins, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Layers, 
  Zap, 
  Gift, 
  Check, 
  Presentation, 
  BookOpen, 
  FileText, 
  Calculator, 
  Scale, 
  FileCheck, 
  Camera, 
  TrendingUp,
  User as UserIcon
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { ECOSYSTEM_APPS } from '@/lib/ecosystem';

export default function KasirPage() {
  const { user, tokens, openAuthModal, signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (e) {
      console.error('Login error:', e);
      openAuthModal();
    }
  };

  const QUOTA_GUIDE = [
    {
      name: 'Slide Presentasi PPTX & Makalah DOCX',
      subdomain: 'slide.bikinkilat.web.id',
      cost: '2 Kuota',
      capacity: 'Hingga 10 proyek / hari',
      url: 'https://slide.bikinkilat.web.id',
      icon: Presentation,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
    },
    {
      name: 'Modul Ajar Kurikulum Merdeka',
      subdomain: 'modul.bikinkilat.web.id',
      cost: '2 Kuota',
      capacity: 'Hingga 10 modul / hari',
      url: 'https://modul.bikinkilat.web.id',
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800',
    },
    {
      name: 'Resume Standar ATS & Cover Letter',
      subdomain: 'cv.bikinkilat.web.id',
      cost: '1 Kuota',
      capacity: 'Hingga 20 resume / hari',
      url: 'https://cv.bikinkilat.web.id',
      icon: FileText,
      color: 'text-cyan-600 dark:text-cyan-400',
      bgColor: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
    },
    {
      name: 'Kalkulator RAB Anggaran & Event (Excel/PDF)',
      subdomain: 'rab.bikinkilat.web.id',
      cost: '2 Kuota',
      capacity: 'Hingga 10 RAB / hari',
      url: 'https://rab.bikinkilat.web.id',
      icon: Calculator,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    },
    {
      name: 'Surat Kontrak Kerja & Somasi Hukum',
      subdomain: 'surat.bikinkilat.web.id',
      cost: '2 Kuota',
      capacity: 'Hingga 10 surat / hari',
      url: 'https://surat.bikinkilat.web.id',
      icon: Scale,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',
    },
    {
      name: 'Kalkulator Faraidh Waris Islam (KHI)',
      subdomain: 'waris.bikinkilat.web.id',
      cost: '1 Kuota',
      capacity: 'Hingga 20 kalkulasi / hari',
      url: 'https://waris.bikinkilat.web.id',
      icon: FileCheck,
      color: 'text-teal-600 dark:text-teal-400',
      bgColor: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    },
    {
      name: 'Proposal Usaha & Pengajuan KUR UMKM',
      subdomain: 'proposal.bikinkilat.web.id',
      cost: '2 Kuota',
      capacity: 'Hingga 10 proposal / hari',
      url: 'https://proposal.bikinkilat.web.id',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
    },
    {
      name: 'AI Studio Pasfoto CPNS & BUMN',
      subdomain: 'pasfoto.bikinkilat.web.id',
      cost: '3 Kuota',
      capacity: 'Hingga 6 foto / hari',
      url: 'https://pasfoto.bikinkilat.web.id',
      icon: Camera,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/60 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full space-y-10">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Semua Kasir Berbayar Dinonaktifkan (100% Gratis)</span>
          </div>
        </div>

        {/* Hero Announcement Banner */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/80 dark:border-indigo-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Inisiatif Akses Pendidikan & Produktivitas Nasional</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Layanan BikinKilat Kini 100% Gratis
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Semua sistem pembayaran dan kasir resmi telah dinonaktifkan. Setiap pengguna aktif kini mendapatkan <strong>Kuota Harian Gratis (20 Generasi/Hari)</strong> untuk menyusun slide, makalah, modul ajar, resume ATS, dan dokumen legal tanpa dipungut biaya sepeser pun.
          </p>
        </section>

        {/* Live User Quota Status Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white border border-indigo-800/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-indigo-800/60">
            <div>
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                Status Akun & Kuota Anda
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {user ? user.email : 'Pengunjung Tamu'}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-white/10 border border-white/15 flex items-center gap-3">
                <Coins className="w-7 h-7 text-amber-400 fill-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-indigo-200 font-medium">Kuota Harian Aktif</div>
                  <div className="text-2xl font-black font-mono text-white">
                    {user ? `${tokens} / 20` : '0 / 20'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Biaya Pengguna: Rp 0</span>
              </div>
              <p className="text-indigo-200 leading-relaxed text-[11px]">
                Tidak ada biaya berlangganan, transfer bank, atau tagihan tersembunyi apa pun.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Clock className="w-4 h-4" />
                <span>Reset Otomatis 00:00 WIB</span>
              </div>
              <p className="text-indigo-200 leading-relaxed text-[11px]">
                Setiap tengah malam WIB, saldo kuota Anda otomatis diisi ulang kembali menjadi 20 kuota.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-300 font-bold">
                <Layers className="w-4 h-4" />
                <span>1 Saldo untuk 9 Layanan</span>
              </div>
              <p className="text-indigo-200 leading-relaxed text-[11px]">
                Kuota berlaku serentak di Slide, Modul, CV ATS, RAB, Somasi, Proposal, dan Pasfoto.
              </p>
            </div>
          </div>

          {!user && (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30">
              <div className="text-center sm:text-left">
                <p className="font-bold text-amber-200 text-sm">Anda Belum Masuk Akun</p>
                <p className="text-xs text-amber-100/80">Masuk dengan akun Google untuk langsung mengaktifkan 20 kuota gratis harian Anda.</p>
              </div>
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-md transition shrink-0 flex items-center gap-2"
              >
                <span>Masuk dengan Google (Klaim 20 Kuota)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Table of Quota Consumption */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Panduan Penggunaan Kuota Dokumen
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Alokasi kuota yang dibutuhkan untuk menyusun dan mengunduh berkas asli siap pakai.
              </p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hidden sm:inline">
              Total 20 Kuota / Hari
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {QUOTA_GUIDE.map((item) => {
              const IconComp = item.icon;
              return (
                <a
                  key={item.subdomain}
                  href={item.url}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-200 flex items-start gap-4 group"
                >
                  <div className={`p-3 rounded-xl border ${item.bgColor} shrink-0`}>
                    <IconComp className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {item.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-mono font-black text-xs shrink-0">
                        {item.cost}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Kapasitas harian: <span className="font-semibold text-slate-700 dark:text-slate-300">{item.capacity}</span>
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      <span>Buka {item.subdomain}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Transparent FAQ Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
            Pertanyaan yang Sering Diajukan Seputar Akses Gratis
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Apakah saya harus membayar setelah kuota 20 generasi habis?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Tidak. Anda tidak perlu membayar sepeser pun. Semua kasir telah ditutup. Kuota Anda akan otomatis diisi ulang kembali menjadi 20 kuota setiap pukul 00:00 WIB (tengah malam).
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Mengapa saya tetap wajib masuk menggunakan akun Google?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Masuk akun diperlukan agar alokasi kuota harian tersimpan aman di profil Anda dan mencegah server dari eksploitasi bot scraper massal.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Apakah hasil unduhan (.pptx, .docx, .xlsx, .pdf) memiliki watermark?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Semua berkas yang Anda unduh adalah dokumen asli yang rapi, terstruktur, dan siap diedit kembali di Microsoft Office atau Google Docs.
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Apakah sisa kuota yang tidak terpakai akan hangus?
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
                Setiap malam pukul 00:00 WIB, saldo kuota Anda dipastikan selalu berada di angka 20 kuota baru untuk mendukung produktivitas hari berikutnya.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
