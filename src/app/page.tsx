'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { EcosystemCard } from '@/components/EcosystemCard';
import { CashierModal } from '@/components/CashierModal';
import { MobileQuickDock } from '@/components/MobileQuickDock';
import { Footer } from '@/components/Footer';
import { ECOSYSTEM_APPS } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';
import { 
  Coins, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  Search, 
  X, 
  LayoutDashboard,
  ShieldCheck, 
  Check, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle, 
  Heart,
  Zap,
  Clock,
  FileText,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

export default function PortalHomePage() {
  const { tokens, setTokens, user, refreshTokens, openAuthModal } = useAuth();
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic External Services State
  const [externalServices, setExternalServices] = useState<any[]>([]);
  const [isServicesLoading, setIsServicesLoading] = useState(true);
  const [launchingServiceId, setLaunchingServiceId] = useState<string | null>(null);

  // FAQ interactive accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/external-services')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.items)) {
          setExternalServices(data.items);
        }
      })
      .catch((err) => console.error('Error loading external services:', err))
      .finally(() => setIsServicesLoading(false));
  }, []);

  const handleLaunchService = async (service: any) => {
    if (service.status === 'maintenance') {
      alert('Layanan ini sedang dalam pemeliharaan sistem. Kami mohon maaf atas ketidaknyamanannya, silakan coba beberapa saat lagi.');
      return;
    }

    if (!user) {
      if (openAuthModal) {
        openAuthModal();
      } else {
        window.location.href = '/auth?returnUrl=' + encodeURIComponent(window.location.pathname);
      }
      return;
    }

    const cost = Number(service.token_cost) || 0;
    if (tokens < cost) {
      alert(`Saldo akun Anda (${tokens} Token) tidak mencukupi untuk membuka layanan ini (${cost} Token). Silakan lakukan pengisian saldo di menu Kasir.`);
      window.location.href = '/kasir';
      return;
    }

    setLaunchingServiceId(service.id);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;

      const res = await fetch('/api/external-services/launch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId: service.id }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Gagal memproses akses layanan.');
        return;
      }

      if (typeof data.newTokens === 'number') {
        setTokens(data.newTokens);
      }
      window.open(data.targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      alert('Terjadi kendala saat menghubungkan ke layanan.');
    } finally {
      setLaunchingServiceId(null);
    }
  };

  const handlePaymentSuccess = (addedTokens: number) => {
    setTokens((prev) => prev + addedTokens);
    refreshTokens();
  };

  const handleOpenCashier = () => {
    if (!user) {
      window.location.href = '/auth?returnUrl=/kasir';
    } else {
      window.location.href = '/kasir';
    }
  };

  const categories = ['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal', 'Kreatif'];

  const filteredApps = ECOSYSTEM_APPS.filter((app) => {
    const matchesCategory = activeCategory === 'Semua' || app.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.subdomain.toLowerCase().includes(q) ||
      app.outputFormats.some(f => f.toLowerCase().includes(q)) ||
      app.features.some(f => f.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      q: 'Apakah benar seluruh 9 layanan dapat digunakan dengan 20 kuota gratis setiap hari?',
      a: 'Ya, benar 100%. Setiap pengguna yang masuk menggunakan akun Google terdaftar otomatis menerima 20 alokasi kuota harian. Kuota ini dapat digunakan di seluruh 9 subdomain (Slide, Modul, CV, RAB, Surat, Waris, Proposal, PasFoto, dan Portal) tanpa perlu membayar biaya langganan bulanan.',
    },
    {
      q: 'Apakah file dokumen hasil unduhan benar-benar bisa diedit di Microsoft Office atau Google Docs?',
      a: 'Ya. Dokumen yang dihasilkan oleh ekosistem BikinKilat adalah file dokumen asli (.pptx widescreen 16:9, .docx Word berstruktur naskah, .xlsx Excel berumus otomatis, dan .pdf siap cetak). Dokumen bukan berupa tangkapan layar atau teks statis, sehingga Anda bebas mengedit font, menambahkan logo, atau memodifikasi tabel di komputer dan ponsel.',
    },
    {
      q: 'Bagaimana keamanan data dan kerahasiaan dokumen yang saya buat di BikinKilat?',
      a: 'Keamanan dan privasi Anda adalah prioritas utama. Seluruh transmisi data dienkripsi dengan standar industri TLS 1.3. Kami tidak menyimpan atau menjual isi naskah draf dokumen Anda ke pihak ketiga manapun. Pemrosesan dokumen berlangsung secara real-time dan langsung dikirimkan ke peramban Anda.',
    },
    {
      q: 'Apa bedanya format Resume ATS BikinKilat dengan template desain grafis biasa?',
      a: 'Template resume desain grafis umumnya menggunakan multi-kolom, grafik, dan tabel rumit yang sering gagal dibaca atau dibuang otomatis oleh mesin Applicant Tracking System (ATS) perusahaan besar. Resume BikinKilat dirancang dengan tata letak single-column berstandar internasional, urutan kronologis jelas, dan hierarki heading semantik yang terbukti 100% terbaca mulus oleh parser ATS HRD.',
    },
    {
      q: 'Bagaimana cara kerja 1 akun terpadu untuk mengakses seluruh 9 layanan?',
      a: 'Ekosistem BikinKilat menggunakan arsitektur Single Sign-On (SSO) terpadu. Begitu Anda masuk di portal utama bikinkilat.web.id, sesi login dan saldo kuota Anda langsung tersinkronisasi otomatis ke seluruh subdomain (seperti slide.bikinkilat.web.id, cv.bikinkilat.web.id, dll.) tanpa harus mendaftar atau mengingat banyak kata sandi.',
    },
    {
      q: 'Apa yang terjadi jika 20 kuota harian saya habis sebelum hari berakhir?',
      a: 'Alokasi kuota Anda akan diperbarui kembali menjadi 20 kuota secara otomatis setiap tengah malam tepat pukul 00:00 WIB. Bagi Anda yang memiliki kebutuhan mendesak atau volume dokumen tinggi, Anda dapat mendukung operasional server dengan traktiran kopi sukarela di menu Kasir untuk mendapatkan kuota tambahan.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar tokens={tokens} onOpenCashier={handleOpenCashier} />

      {/* Hero Section: Simple, High Impact, Fast to Load */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-14 pb-18 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Version Announcement Pill */}
            <Link
              href="/catatan-rilis"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium transition group active:scale-95"
            >
              <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white font-mono text-[11px] font-bold">
                v2.8
              </span>
              <span>Ekosistem Terpadu 9 Layanan • 20 Kuota Harian Otomatis</span>
              <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform font-semibold">
                &rarr;
              </span>
            </Link>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
              Susun Dokumen &amp; Presentasi Standar Nasional{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                dalam Hitungan Detik
              </span>
            </h1>

            {/* Subheadline (Deep, Clear Context) */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal max-w-2xl mx-auto">
              Akses 9 platform otomasi cerdas berstandar tata naskah resmi Indonesia: slide presentasi PPTX 16:9, modul ajar Kurikulum Merdeka, resume ATS, kalkulator RAB SNI, hingga instrumen hukum perdata. Dilengkapi 1 akun terpadu dengan 20 alokasi kuota harian otomatis tiap malam.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#layanan"
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 active:bg-indigo-800 text-white font-bold text-sm shadow-xs transition-all duration-150 flex items-center gap-2 group"
              >
                <span>Jelajahi 9 Layanan Utama</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {user ? (
                <Link
                  href="/dashboard"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-95 active:bg-black dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm shadow-xs transition-all duration-150 flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Buka Dashboard Saya</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenCashier}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 active:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 text-slate-800 border border-slate-200/90 dark:border-slate-800 font-bold text-sm shadow-2xs transition-all duration-150 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Akses Termasuk (20 Kuota/Hari)</span>
                </button>
              )}
            </div>

            {/* Grounded Capabilities Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Format Asli .pptx, .docx, .xlsx</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Kepatuhan Regulasi &amp; Standar RI</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>20 Kuota Otomatis Setiap Hari</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Pemrosesan Sub-2 Detik</span>
              </span>
            </div>

            {/* Metrics Ribbon (Instant, Pure CSS) */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-3xl mx-auto border-t border-slate-200/70 dark:border-slate-800">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  9 Layanan
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Spesialis Dokumen</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  20 Kuota
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Alokasi Harian Otomatis</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  Rp 0
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Semua Kasir Dinonaktifkan</div>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  &lt; 2 Detik
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Waktu Komputasi Kilat</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Katalog 9 Layanan Utama */}
      <section 
        id="layanan" 
        className="py-16 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1.5">
                <Layers className="w-4 h-4" />
                <span>Katalog Lengkap Ekosistem</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Pilih Layanan Sesuai Kebutuhan Anda
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                Setiap layanan menghasilkan file dokumen asli (.pptx, .docx, .xlsx) yang siap diunduh dan bebas diedit.
              </p>
            </div>

            {/* Search Input & Category Filter */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search Bar */}
              <div className="relative min-w-[240px] sm:min-w-[280px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari layanan (slide, cv, modul, rab)..."
                  className="w-full pl-9 pr-8 py-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title="Hapus pencarian"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-150 ${
                      activeCategory === cat
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Result Feedback */}
          {searchQuery && (
            <div className="mb-6 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
              <span>
                Menampilkan hasil untuk &ldquo;<strong className="text-slate-800 dark:text-white">{searchQuery}</strong>&rdquo; ({filteredApps.length} layanan ditemukan)
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Reset pencarian
              </button>
            </div>
          )}

          {/* Cards Grid: Fast & Pure CSS */}
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <EcosystemCard key={app.id} app={app} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Layanan Tidak Ditemukan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Tidak ada layanan yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo; dalam kategori {activeCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Semua');
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
              >
                Tampilkan Semua 9 Layanan
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Panduan Alur Cepat 3 Langkah (Deep Workflow) */}
      <section id="alur" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 px-3.5 py-1 rounded-full shadow-2xs">
              Alur Kerja Simpel &amp; Presisi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
              3 Langkah dari Ide ke Dokumen Jadi
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Tanpa perlu prompt berbelit. Cukup tentukan kebutuhan Anda, masukkan data pokok, dan unduh dokumen asli siap pakai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-7 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  01
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                    Pilih Layanan Sesuai Kebutuhan
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tentukan modul spesialis yang sesuai dengan tugas Anda: presentasi slide PPTX widescreen 16:9, modul ajar Kurikulum Merdeka, resume standar ATS, kalkulator RAB proyek, atau surat hukum resmi.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>9 Subdomain Siap Akses</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  02
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                    Ketik Data atau Topik Ringkas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cukup masukkan topik utama, parameter proyek, atau rancangan naskah dasar. Sistem otomasi cerdas menyusun tata naskah berstandar resmi dalam sub-2 detik dengan akurasi tinggi.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>Komputasi Sub-2 Detik</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-2xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
                  03
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                    Unduh Dokumen Asli Bebas Edit
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Unduh file dokumen asli (.pptx widescreen 16:9, .docx Word berstruktur, atau .xlsx Excel lengkap rumus) yang 100% bebas Anda edit kembali di komputer atau ponsel Anda.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>Format Asli .pptx, .docx, .xlsx</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan Tambahan & Alat Bantu Modular */}
      <section id="layanan-tambahan" className="py-16 bg-slate-50/80 dark:bg-slate-900/50 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800 text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Alat Bantu Tambahan (Koleksi Modular)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Layanan Tambahan &amp; Alat Bantu Cerdas
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Koleksi alat bantu digital cerdas pelengkap produktivitas Anda. Masuk dengan mudah menggunakan Kunci Akses Akun BikinKilat Anda.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-amber-200 dark:border-amber-800/80 shadow-xs max-w-md space-y-1">
              <div className="flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                <Coins className="w-4 h-4 fill-amber-400" />
                <span>Tarif: 1 Token per Masuk Layanan</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Setiap kali Anda memasukkan Kunci Akses BikinKilat untuk masuk ke layanan tambahan, saldo akun Anda akan terpotong <strong>1 Token</strong>. Saldo dapat diisi ulang kapan saja melalui menu Kasir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalServices.map((service) => {
              const isMaintenance = service.status === 'maintenance';
              return (
                <div
                  key={service.id}
                  className="rounded-2xl p-6 bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" />
                        <span>{service.token_cost || 1} Token / Masuk</span>
                      </span>
                      {service.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {service.subtitle}
                        </p>
                      )}
                    </div>

                    {service.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {service.description}
                      </p>
                    )}

                    {isMaintenance && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-semibold">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Sedang pemeliharaan sistem.</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => handleLaunchService(service)}
                      disabled={launchingServiceId === service.id || isMaintenance}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                    >
                      {launchingServiceId === service.id ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Menghubungkan Sesi...</span>
                        </>
                      ) : (
                        <>
                          <span>Buka {service.title}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}

            {isServicesLoading && externalServices.length === 0 && (
              <div className="rounded-2xl p-6 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
                <div className="h-12 bg-slate-100 dark:bg-slate-900 rounded-xl" />
              </div>
            )}
            
            {/* Card 2: Koleksi Alat Bantu Baru */}
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 w-fit block">
                  Segera Hadir
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Modul Otomasi Baru
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Koleksi terus bertambah secara berkala untuk mendukung produktivitas kerja dan akademis Anda.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Punya usulan alat bantu yang Anda butuhkan?
                </p>
                <Link
                  href="/pengembang"
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline inline-block mt-1"
                >
                  Kirim Usulan ke Pengembang &rarr;
                </Link>
              </div>
            </div>

            {/* Card 3: Cara Akses Kunci Satu Pintu */}
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 w-fit block">
                  Panduan Akses
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Kunci Akses Universal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Cukup 1 kunci akses pribadi untuk seluruh alat bantu eksternal.
                  </p>
                </div>

                <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-decimal pl-4">
                  <li>Buka <strong>Dashboard Akun</strong> Anda dan salin Kunci Akses Pribadi.</li>
                  <li>Masukkan Kunci Akses pada halaman masuk layanan tambahan.</li>
                  <li>Sistem memotong 1 Token dan Anda langsung dapat menggunakannya sepuasnya.</li>
                </ol>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <span>Lihat Kunci Akses di Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Free Quota & Server Support Section */}
      <section id="kuota" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 px-3.5 py-1 rounded-full shadow-2xs">
              Akses Harian &amp; Dukungan Server
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
              20 Alokasi Kuota Harian Terpadu
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Gunakan seluruh 9 layanan dengan 20 alokasi kuota setiap hari. Tanpa sistem langganan terkunci, tanpa potongan biaya tersembunyi.
            </p>
          </div>

          {/* 3 Free Ecosystem Benefit Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            
            {/* Card 1: Akademik */}
            <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                    Sektor Akademik
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Slide 16:9 &amp; Modul Ajar
                  </h3>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  Rp 0 <span className="text-xs font-normal text-slate-400">/ 20 Kuota Hari</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Slide PowerPoint 16:9 &amp; Speaker Notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Kerangka Makalah DOCX Siap Telaah</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Modul Ajar Kurikulum Merdeka Guru</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://slide.bikinkilat.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold text-center block transition"
              >
                Mulai Susun Presentasi &rarr;
              </a>
            </div>

            {/* Card 2: Karier */}
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border-2 border-indigo-500/40 dark:border-indigo-500/30 flex flex-col justify-between relative">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-1">
                    Sektor Karier &amp; Kerja
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Resume ATS &amp; Cover Letter
                  </h3>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  Rp 0 <span className="text-xs font-normal text-slate-400">/ 20 Kuota Hari</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Format Single-Column Standar ATS HRD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Surat Lamaran Bilingual (ID &amp; EN)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Ekspor PDF &amp; DOCX Bebas Modifikasi</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://cv.bikinkilat.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center block transition shadow-xs"
              >
                Mulai Buat CV ATS &rarr;
              </a>
            </div>

            {/* Card 3: Bisnis & Legal */}
            <div className="p-6 rounded-2xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
                    Sektor Bisnis &amp; Hukum
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    RAB, Kontrak &amp; Proposal
                  </h3>
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  Rp 0 <span className="text-xs font-normal text-slate-400">/ 20 Kuota Hari</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Kalkulator RAB Format Excel Otomatis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Draf Perjanjian &amp; Somasi KUHPerdata</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Proposal Usaha &amp; Pengajuan KUR UMKM</span>
                  </li>
                </ul>
              </div>
              <a
                href="https://rab.bikinkilat.web.id"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold text-center block transition"
              >
                Mulai Hitung RAB &rarr;
              </a>
            </div>

          </div>

          {/* Reset Banner */}
          <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-900/60 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-emerald-400/15 text-emerald-300 text-xs font-semibold border border-emerald-400/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reset Otomatis 00:00 WIB</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                20 Kuota Harian &amp; Dukungan Server
              </h3>
              <p className="text-xs sm:text-sm text-indigo-200 max-w-xl leading-relaxed">
                Nikmati akses dokumen harian tanpa biaya. Dukung keberlangsungan server melalui opsi traktir kopi sukarela di halaman Kasir.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/kasir"
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-md transition flex items-center gap-2 min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Status Kuota &amp; Traktir Server</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section: Comprehensive, Deep Answers */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Jawab Lengkap</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pertanyaan Umum Seputar Ekosistem BikinKilat
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto">
            Semua yang perlu Anda ketahui tentang alokasi kuota harian, format dokumen, dan kebijakan layanan.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm sm:text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />

      {/* Mobile Floating Quick Dock */}
      <MobileQuickDock tokens={tokens} onOpenCashier={handleOpenCashier} />

      {/* Cashier Modal */}
      <CashierModal
        isOpen={isCashierOpen}
        onClose={() => setIsCashierOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
