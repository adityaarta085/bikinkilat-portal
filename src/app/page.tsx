'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { EcosystemCard } from '@/components/EcosystemCard';
import { MobileQuickDock } from '@/components/MobileQuickDock';
import { Footer } from '@/components/Footer';
import { ECOSYSTEM_APPS } from '@/lib/ecosystem';
import { useAuth } from '@/lib/auth-context';
import { 
  Coins, 
  ArrowRight, 
  Layers, 
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
  Clock, 
  FileText, 
  ChevronDown,
  Scale,
  Award,
  Zap,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

// Pre-seeded fallback data for instant zero-CLS rendering
const INITIAL_EXTERNAL_SERVICES = [
  {
    id: '67c4b48e-a1e9-4112-a604-27dc4677582e',
    slug: 'generator-perangkat-ajar',
    title: 'Generator Perangkat Ajar',
    subtitle: 'Kurikulum Merdeka • Pendekatan Pembelajaran Mendalam (Deep Learning)',
    description: 'Bantu guru dan pendidik menyusun Modul Ajar lengkap, RPP ringkas, Alur Tujuan Pembelajaran (ATP), dan LKPD interaktif berbasis pembelajaran bermakna (Meaningful, Mindful, Joyful). Dokumen langsung siap diunduh ke Word (.docx).',
    target_url: 'https://share.gemini.google/QbOMGSuxvreF',
    category: 'Pendidikan',
    icon: 'BookOpen',
    badge: 'Format Word (.DOCX) Ready',
    token_cost: 1,
    status: 'active',
  }
];

export default function PortalHomePage() {
  const { tokens, setTokens, user, openAuthModal } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic External Services State with initial fallback
  const [externalServices, setExternalServices] = useState<any[]>(INITIAL_EXTERNAL_SERVICES);
  const [launchingServiceId, setLaunchingServiceId] = useState<string | null>(null);

  // FAQ interactive accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/external-services')
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
          setExternalServices(data.items);
        }
      })
      .catch((err) => {
        // Silent catch: Keep initial fallback items without breaking layout
        console.warn('Using cached external services catalog:', err);
      });
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
      alert(`Alokasi kuota harian akun Anda (${tokens} Kuota) tidak mencukupi untuk membuka layanan ini (${cost} Kuota). Kuota akan otomatis diperbarui kembali menjadi 20 Kuota setiap malam pukul 00:00 WIB, atau Anda dapat mendukung operasional server di menu Kasir.`);
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

  const categories = ['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal', 'Kreatif'];

  const filteredApps = ECOSYSTEM_APPS.filter((app) => {
    const matchesCategory = activeCategory === 'Semua' || app.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      app.name.toLowerCase().includes(q) ||
      app.tagline.toLowerCase().includes(q) ||
      app.subdomain.toLowerCase().includes(q) ||
      (app.targetAudience && app.targetAudience.toLowerCase().includes(q)) ||
      (app.complianceStandard && app.complianceStandard.toLowerCase().includes(q)) ||
      (app.exampleUseCase && app.exampleUseCase.toLowerCase().includes(q)) ||
      app.outputFormats.some(f => f.toLowerCase().includes(q)) ||
      app.features.some(f => f.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      q: 'Apakah benar seluruh 9 layanan dapat digunakan dengan 20 kuota gratis setiap hari?',
      a: 'Ya, benar 100%. Setiap pengguna yang masuk menggunakan akun resmi Google terdaftar otomatis menerima 20 alokasi kuota harian. Kuota ini berlaku di seluruh 9 subdomain (Slide, Modul, CV, RAB, Surat, Waris, Proposal, PasFoto, dan Portal) tanpa ada kewajiban biaya langganan bulanan maupun komitmen berbayar apapun.',
    },
    {
      q: 'Apakah file dokumen hasil unduhan benar-benar bisa diedit di Microsoft Office, Google Docs, atau HP?',
      a: 'Ya. Seluruh berkas yang dihasilkan adalah format dokumen standar industri terbuka (.pptx widescreen 16:9, .docx Word berstruktur naskah, .xlsx Excel lengkap dengan formula kalkulasi aktif, serta .pdf resolusi tinggi). Dokumen bukan berupa tangkapan layar atau gambar statis, sehingga Anda bebas mengedit jenis huruf, menambahkan logo institusi, atau mengubah angka pada komputer (Windows/Mac) maupun aplikasi ponsel cerdas (Android/iOS).',
    },
    {
      q: 'Bagaimana keamanan data dan kerahasiaan naskah dokumen yang saya buat di BikinKilat?',
      a: 'Keamanan dan privasi naskah Anda adalah prioritas utama. Seluruh transmisi jaringan dienkripsi menggunakan protokol TLS 1.3 standar perbankan nasional. Pemrosesan data berlangsung pada memori kerja real-time dan langsung dikirimkan ke peramban Anda. Kami tidak menyimpan draf naskah sensitif Anda secara permanen dan tidak pernah menjual atau membagikan konten dokumen Anda kepada pihak ketiga.',
    },
    {
      q: 'Mengapa format Resume BikinKilat terbukti lebih efektif menembus ATS dibanding template grafis umum?',
      a: 'Template resume grafis umum (seperti format kanvas grafis dua kolom) sering menggunakan tabel bersarang, ikon raster, dan kotak teks mengambang yang membingungkan algoritma Applicant Tracking System (ATS) perusahaan besar. Format CV BikinKilat dirancang secara ketat mengikuti standar single-column internasional dengan hierarki judul semantik, urutan kronologis teruji, dan penataan kata kunci relevan sehingga dapat diekstrak 100% mulus oleh parser HRD.',
    },
    {
      q: 'Apakah modul ajar dan RPP yang dihasilkan sudah selaras dengan regulasi Kurikulum Merdeka Kemendikbud?',
      a: 'Ya. Modul ajar yang dirakit melalui modul.bikinkilat.web.id disusun mengacu pada Kepmendikbudristek Standar Proses Kurikulum Merdeka. Struktur modul memuat Komponen Inti lengkap: Alur Tujuan Pembelajaran (ATP), dimensi Profil Pelajar Pancasila, asesmen diagnostik & formatif berbasis rubrik, lembar kerja peserta didik (LKPD), serta rangkuman kisi-kisi soal evaluasi HOTS (Higher Order Thinking Skills).',
    },
    {
      q: 'Bagaimana akurasi matematis kalkulator RAB SNI dan perhitungan Faraidh Waris Islam?',
      a: 'Kalkulator RAB mengintegrasikan simulasi koefisien Analisis Harga Satuan Pekerjaan (AHSP) standar SNI yang memisahkan komponen bahan, upah tukang, dan peralatan dengan formula hitung volume otomatis di file Excel (.xlsx). Sementara kalkulator Waris Islam berpedoman pada fiqih mawaris dan Kompilasi Hukum Islam (KHI) Buku II, dengan verifikasi otomatis porsi dzawil furudh, sisa ashabah, serta mekanisme penyesuaian aul dan rad bila ada.',
    },
    {
      q: 'Bagaimana cara kerja 1 akun terpadu untuk mengakses seluruh 9 layanan ekosistem?',
      a: 'Ekosistem BikinKilat menggunakan arsitektur Single Sign-On (SSO) terpadu. Ketika Anda masuk di portal utama bikinkilat.web.id, sesi terenkripsi dan saldo kuota harian Anda langsung tersinkronisasi otomatis ke seluruh subdomain (seperti slide.bikinkilat.web.id, cv.bikinkilat.web.id, dsb.) secara seamless tanpa perlu membuat banyak akun atau mengingat kata sandi terpisah.',
    },
    {
      q: 'Apa yang terjadi jika 20 kuota harian saya habis sebelum hari berakhir?',
      a: 'Alokasi kuota Anda akan diperbarui kembali menjadi 20 kuota secara otomatis setiap tengah malam tepat pukul 00:00 WIB tanpa pungutan biaya apapun. Bagi pengguna profesional dengan kebutuhan volume dokumen intensif yang mendesak, Anda dapat mendukung kelangsungan infrastruktur server melalui kontribusi sukarela di halaman Kasir untuk memperoleh kuota cadangan instan.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar tokens={tokens} />

      {/* Hero Section: Fast, High-Substance, Zero CLS */}
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

            {/* Subheadline: Deep Contextual Explanation */}
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
                <Link
                  href="/auth"
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 active:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-slate-200 text-slate-800 border border-slate-200/90 dark:border-slate-800 font-bold text-sm shadow-2xs transition-all duration-150 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Masuk &amp; Aktifkan 20 Kuota</span>
                </Link>
              )}
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Format Asli .pptx, .docx, .xlsx</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Kepatuhan Standar Regulasi RI</span>
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

      {/* Katalog 9 Layanan Utama (Interactive, High Depth, Blazing Fast) */}
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
                Setiap layanan menghasilkan file dokumen asli (.pptx, .docx, .xlsx, .pdf) berstandar nasional yang 100% bebas Anda unduh dan modifikasi.
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

      {/* Panduan Alur Kerja 3 Langkah Presisi (Deep Workflow) */}
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
                    Pilih Spesialis Dokumen
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Tentukan modul yang sesuai: presentasi slide PPTX 16:9, modul ajar Kurikulum Merdeka, resume ATS, kalkulator RAB proyek SNI, atau surat perjanjian resmi KUHPerdata. Tata letak langsung mengikuti standar resmi Indonesia.
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
                    Masukkan Pokok Pikiran / Parameter
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ketik judul paparan, capaian pembelajaran, pengalaman karier, atau spesifikasi fisik bangunan. Sistem otomasi cerdas menyusun tata naskah berstandar resmi dalam sub-2 detik dengan akurasi tinggi.
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
                    Unduh File Dokumen Asli Bebas Edit
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Unduh berkas asli (.pptx widescreen 16:9, .docx Word berstruktur, atau .xlsx Excel lengkap rumus) yang 100% bebas Anda buka, modifikasi font, atau cetak langsung di komputer dan aplikasi HP Anda.
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

      {/* Tabel Perbandingan Efisiensi & Standar Dokumen (Deep Substance) */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 px-3.5 py-1 rounded-full shadow-2xs">
              Keunggulan Substantif
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4 tracking-tight">
              Mengapa BikinKilat Lebih Efisien?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Perbandingan objektif antara cara manual / agensi jasa pengetikan konvensional dengan otomasi cerdas terpadu BikinKilat.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-4 px-6 font-bold w-1/4">Parameter Evaluasi</th>
                  <th className="py-4 px-6 font-bold w-3/8 text-slate-500 dark:text-slate-400">Jasa Ketik / Manual Konvensional</th>
                  <th className="py-4 px-6 font-bold w-3/8 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30">
                    Ekosistem BikinKilat
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/70">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Waktu Pengerjaan</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    2 sampai 3 hari kerja, bergantung pada beban antrean pengetik.
                  </td>
                  <td className="py-4 px-6 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                    Sub-2 Detik (Instan di peramban)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Coins className="w-4 h-4 text-slate-400" />
                    <span>Biaya Finansial</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    Rp 50.000 - Rp 350.000 per naskah atau biaya langganan bulanan mahal.
                  </td>
                  <td className="py-4 px-6 font-bold text-emerald-600 dark:text-emerald-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                    Rp 0 (20 Alokasi Kuota Harian Otomatis)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                    <span>Format &amp; Fleksibilitas File</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    Sering dikirim dalam bentuk PDF terkunci atau gambar; biaya tambahan untuk berkas mentah.
                  </td>
                  <td className="py-4 px-6 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                    Berkas Asli Terbuka (.docx, .pptx 16:9, .xlsx, .pdf) 100% bebas modifikasi
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>Kepatuhan Standar Indonesia</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    Format acak, sering tidak mematuhi kaidah KHI, SNI AHSP, atau Kurikulum Merdeka.
                  </td>
                  <td className="py-4 px-6 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                    Sesuai Regulasi Resmi (SNI PUPR, KHI Buku II, KUHPerdata, SSCASN BKN, ATS)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-400" />
                    <span>Keamanan &amp; Kerahasiaan Data</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    Dokumen Anda tersimpan di komputer agensi/jasa perorangan tanpa proteksi enkripsi resmi.
                  </td>
                  <td className="py-4 px-6 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20">
                    Transmisi TLS 1.3 Terenkripsi, Pemrosesan Volatile, Tanpa Penjualan Data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Layanan Tambahan & Alat Bantu Modular */}
      <section id="layanan-tambahan" className="py-16 bg-white dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
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

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-amber-200 dark:border-amber-800/80 shadow-xs max-w-md space-y-1">
              <div className="flex items-center gap-2 text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                <Coins className="w-4 h-4 fill-amber-400" />
                <span>Tarif: 1 Kuota per Akses Masuk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Setiap kali membuka layanan modular tambahan, kuota harian akun Anda terpotong <strong>1 Kuota</strong>. Kuota otomatis terisi kembali 20 Kuota setiap malam pukul 00:00 WIB.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {externalServices.map((service) => {
              const isMaintenance = service.status === 'maintenance';
              return (
                <div
                  key={service.id}
                  className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5" />
                        <span>{service.token_cost || 1} Kuota / Masuk</span>
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
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer shadow-xs"
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
            
            {/* Card 2: Koleksi Alat Bantu Baru */}
            <div className="rounded-2xl p-6 bg-slate-50/70 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 w-fit block">
                  Segera Hadir
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Modul Otomasi Baru
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Koleksi alat bantu digital terus dikembangkan secara berkala untuk mendukung produktivitas kerja dan riset akademis di seluruh Indonesia.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center">
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
            <div className="rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 w-fit block">
                  Panduan Akses
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Kunci Akses Universal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Cukup 1 kunci akses pribadi untuk seluruh alat bantu modular eksternal.
                  </p>
                </div>

                <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-decimal pl-4">
                  <li>Buka <strong>Dashboard Akun</strong> Anda dan salin Kunci Akses Pribadi.</li>
                  <li>Masukkan Kunci Akses pada halaman masuk layanan tambahan.</li>
                  <li>Sistem mendeteksi validitas kuota dan Anda langsung dapat menggunakannya sepuasnya.</li>
                </ol>
              </div>

              <div className="pt-2">
                <Link
                  href="/dashboard"
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
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
      <section id="kuota" className="py-20 bg-slate-50/60 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-2xs">
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
                    <span>Modul Ajar Kurikulum Merdeka Lengkap</span>
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
            <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border-2 border-indigo-500/40 dark:border-indigo-500/30 flex flex-col justify-between relative shadow-xs">
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
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between shadow-2xs">
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
                Nikmati akses seluruh 9 layanan harian tanpa biaya. Dukung keberlangsungan server melalui opsi traktir kopi sukarela di halaman Kasir.
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

      {/* FAQ Section: 8 Comprehensive, Deep Expert Answers */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Tanya Jawab Lengkap &amp; Transparan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Pertanyaan Umum Seputar Ekosistem BikinKilat
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto">
            Semua yang perlu Anda ketahui tentang alokasi kuota harian, format dokumen, kepatuhan hukum, dan keamanan data.
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
      <MobileQuickDock tokens={tokens} />
    </div>
  );
}
