'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Code,
  Sparkles,
  ExternalLink,
  Github,
  Mail,
  Phone,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Layers,
  Heart,
  MessageSquare,
  Send,
  X,
  ChevronRight,
  ZoomIn,
  Building2,
  Globe,
  Award,
  Terminal,
  ShieldCheck,
  Calendar,
  Share2,
  Pin,
  ArrowUpRight,
  Check,
  Copy,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  User,
  MapPin,
  School,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import confetti from 'canvas-confetti';
import { GalleryItem, GuestbookEntry, INITIAL_GALLERY, INITIAL_GUESTBOOK, SUPABASE_ASSETS } from '@/lib/developer-data';

const CATEGORIES = ['Semua', 'Aktivitas', 'Proyek', 'Sertifikat', 'Sekolah'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const AVATAR_OPTIONS = ['🚀', '💻', '🎓', '🏛️', '⭐', '🔥', '✨', '💡'];

const DEVELOPER_FAQS = [
  {
    question: 'Siapa sosok Aditya Arta Putra?',
    answer:
      'Aditya Arta Putra adalah Web Developer muda asal Magelang yang merupakan Founder & Solo Engineer ekosistem BikinKilat.web.id, serta Project Leader Website Resmi Portal Desa Ngawonggo (ngawonggo.web.id). Saat ini Aditya menempuh pendidikan kejuruan di SMK Muhammadiyah Bandongan sebagai siswa kelas 11 jurusan Teknik Jaringan Komputer & Telekomunikasi (11 TJKT A).',
  },
  {
    question: 'Apa saja portofolio dan karya teknologi buatan Aditya Arta Putra?',
    answer:
      'Karya unggulan Aditya Arta Putra meliputi: (1) BikinKilat.web.id — platform micro-SaaS terpadu 9 otomasi cerdas dokumen dengan satu dompet token dan integrasi QRIS instan, (2) Portal Resmi Desa Ngawonggo (ngawonggo.web.id) hasil kemitraan resmi Pemdes Ngawonggo & SMK Muhammadiyah Bandongan, (3) Sistem Web Perizinan Online (E-Izin open source di GitHub @adityaarta085), (4) Linksku Software Suite (SSWEB, IQC Generator, Media Digital, AI Assistant), dan (5) Buku Tamu Digital SMK Muhammadiyah Bandongan.',
  },
  {
    question: 'Di mana riwayat pendidikan formal Aditya Arta Putra?',
    answer:
      'Riwayat pendidikan formal Aditya Arta Putra berakar di Kabupaten Magelang, Jawa Tengah: (1) MI Al Huda Maduretno (Lulus), (2) MTsN 2 Magelang (Lulus), dan (3) SMK Muhammadiyah Bandongan (Kelas 11 TJKT A - Aktif).',
  },
  {
    question: 'Apa filosofi dan motto hidup resmi Aditya Arta Putra?',
    answer:
      'Motto resmi Aditya Arta Putra adalah “Biarkan dunia melihat karyaku.” (Let the world see me). Prinsip ini menjadi pendorong utama semangatnya untuk membuktikan bahwa usia sekolah mampu merekayasa arsitektur sistem perangkat lunak modern berskala nasional.',
  },
  {
    question: 'Bagaimana cara menghubungi atau berkolaborasi dengan Aditya Arta Putra?',
    answer:
      'Aditya Arta Putra dapat dihubungi langsung melalui nomor WhatsApp resmi di +62 851-3643-6577, melalui email di adityaarta085@gmail.com, atau melalui akun GitHub resmi di https://github.com/adityaarta085.',
  },
];

export default function DeveloperPage() {
  // Theme & Mounted
  const [mounted, setMounted] = useState(false);

  // Gallery state
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Semua');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  // Guestbook state
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK);
  const [gbName, setGbName] = useState('');
  const [gbRole, setGbRole] = useState('');
  const [gbMessage, setGbMessage] = useState('');
  const [gbAvatar, setGbAvatar] = useState('🚀');
  const [gbSubmitting, setGbSubmitting] = useState(false);
  const [gbSuccess, setGbSuccess] = useState(false);
  const [gbError, setGbError] = useState('');

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    setMounted(true);
    fetchGallery();
    fetchGuestbook();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && Array.isArray(data.items) && data.items.length > 0) {
        setGalleryItems(data.items);
      }
    } catch (e) {
      // Fallback already in INITIAL_GALLERY
    }
  };

  const fetchGuestbook = async () => {
    try {
      const res = await fetch('/api/guestbook');
      const data = await res.json();
      if (data.success && Array.isArray(data.entries) && data.entries.length > 0) {
        setGuestbookEntries(data.entries);
      }
    } catch (e) {
      // Fallback already in INITIAL_GUESTBOOK
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adityaarta085@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmitGuestbook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbName.trim() || !gbMessage.trim()) return;

    setGbSubmitting(true);
    setGbError('');
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: gbName.trim(),
          role: gbRole.trim() || 'Pengunjung',
          message: gbMessage.trim(),
          avatar: gbAvatar,
        }),
      });
      const data = await res.json();
      if (data.success && data.entry) {
        setGuestbookEntries((prev) => [data.entry, ...prev]);
        setGbName('');
        setGbRole('');
        setGbMessage('');
        setGbSuccess(true);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
        });
        setTimeout(() => setGbSuccess(false), 4000);
      } else {
        setGbError(data.error || 'Gagal mengirim pesan.');
      }
    } catch (err: any) {
      setGbError('Terjadi kesalahan jaringan.');
    } finally {
      setGbSubmitting(false);
    }
  };

  const filteredGallery =
    selectedCategory === 'Semua'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group hover:opacity-95 transition-opacity"
            title="BikinKilat.web.id - Portal Utama"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform shrink-0 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-1">
              <img
                src={SUPABASE_ASSETS.brandLogoIcon}
                alt="Logo Resmi BikinKilat"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                  BikinKilat.web.id
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Aditya Arta Putra
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Profil & Portofolio Resmi
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <a href="#tentang" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Tentang Aditya
            </a>
            <a href="#pendidikan" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Pendidikan
            </a>
            <a href="#proyek" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Proyek
            </a>
            <a href="#galeri" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Galeri Foto
            </a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              FAQ
            </a>
            <a href="#buku-tamu" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Buku Tamu
            </a>
            <a href="#kontak" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Kontak
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://wa.me/6285136436577?text=Halo%20Aditya%20Arta%20Putra%2C%20saya%20tertarik%20dengan%20portofolio%20dan%20ekosistem%20BikinKilat.web.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION - FOTO UTAMA & IDENTITAS RESMI ADITYA ARTA PUTRA */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-teal-500/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Foto Menjadi Utama (Left on Desktop, Top on Mobile) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[340px] sm:max-w-[380px]">
                {/* Aura border gradient */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-600 via-violet-500 to-teal-400 rounded-3xl blur-md opacity-60 group-hover:opacity-90 transition duration-500 group-hover:scale-102" />
                
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/20 shadow-2xl aspect-[3/4]">
                  <img
                    src={SUPABASE_ASSETS.avatarUrl}
                    alt="Aditya Arta Putra - Pengembang Resmi BikinKilat.web.id"
                    title="Aditya Arta Putra - Founder & Solo Engineer BikinKilat.web.id"
                    className="w-full h-full object-cover object-top transition duration-700 group-hover:scale-105"
                  />
                  {/* Bottom Vignette with Badge */}
                  <div className="absolute inset-x-0 bottom-0 pt-16 pb-4 px-4 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-end text-white">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Tersedia untuk Kolaborasi & Proyek</span>
                    </div>
                    <p className="text-sm font-black tracking-tight text-white mt-1">
                      Aditya Arta Putra
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Siswa 11 TJKT A • SMK Muhammadiyah Bandongan
                    </p>
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute -top-3 -right-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                  <span>Pengembang Terverifikasi</span>
                </div>
              </div>
            </div>

            {/* Identity & Bio Details (Right on Desktop) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
                <span>Founder & Solo Engineer • BikinKilat.web.id</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  Aditya Arta Putra
                </h1>
                <p className="text-base sm:text-lg font-semibold text-indigo-600 dark:text-indigo-400">
                  Siswa Kelas 11 TJKT A di SMK Muhammadiyah Bandongan | Web Developer Muda Indonesia
                </p>
              </div>

              {/* Authentic Motto Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-violet-50/80 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border border-indigo-200/70 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider mb-1 flex items-center gap-1.5 justify-center lg:justify-start">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Prinsip & Motto Hidup Resmi</span>
                </div>
                <blockquote className="text-lg sm:text-xl font-bold italic text-slate-800 dark:text-slate-200">
                  “Biarkan dunia melihat karyaku.”
                </blockquote>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                <strong>Aditya Arta Putra</strong> adalah siswa SMK berbakat asal Magelang yang berdedikasi tinggi dalam Web Development, rekayasa perangkat lunak modern, dan arsitektur sistem cloud. Berpengalaman memimpin arsitektur sistem nyata dari hulu ke hilir, mulai dari portal pemerintahan desa hingga membangun ekosistem 9 otomasi dokumen digital BikinKilat.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <a
                  href="https://wa.me/6285136436577?text=Halo%20Aditya%20Arta%20Putra%2C%20saya%20ingin%20berdiskusi%20tentang%20proyek%20web%20atau%20kolaborasi."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hubungi Aditya via WhatsApp</span>
                </a>
                <a
                  href="#proyek"
                  className="px-5 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  <span>Lihat Karya & Portofolio</span>
                </a>
                <a
                  href="#faq"
                  className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ Profil</span>
                </a>
              </div>

              {/* Impact Stat Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">9</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Micro-SaaS Subdomain</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Solo Engineering</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-xl font-black text-violet-600 dark:text-violet-400">Leader</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Portal Desa Ngawonggo</div>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">11 TJKT A</div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">SMK Muhammadiyah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TENTANG ADITYA ARTA PUTRA & ENTITAS RESMI */}
      <section id="tentang" className="py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Biografi & Dedikasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Tentang Aditya Arta Putra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Profil resmi siswa kejuruan jaringan komputer, arsitek perangkat lunak mandiri, dan pengembang teknologi web modern.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Foto Aktivitas Sekolah Resmi (Foto Almamater SMK Muhammadiyah Bandongan) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 group aspect-[3/4] bg-slate-900">
                <img
                  src={SUPABASE_ASSETS.secImageUrl}
                  alt="Aditya Arta Putra berseragam jas almamater resmi SMK Muhammadiyah Bandongan"
                  title="Aditya Arta Putra - Siswa 11 TJKT A SMK Muhammadiyah Bandongan"
                  className="w-full h-full object-cover object-[center_60%] group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-5 text-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-600 text-white">
                      Aktivitas Akademik & Vokasi
                    </span>
                    <p className="text-xs font-semibold text-slate-200 mt-1">
                      SMK Muhammadiyah Bandongan — Teknik Jaringan Komputer & Telekomunikasi (TJKT)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Story & Executive Entity Details */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              {/* Ringkasan Entitas Resmi Google */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Ringkasan Identitas Resmi (Entity Profile)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Nama Lengkap:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">Aditya Arta Putra</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Nama Panggilan / Alias:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">Aditya / adityaarta085</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Domisili Asal:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">Magelang, Jawa Tengah, ID</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Status Pendidikan:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">SMK Muhammadiyah Bandongan (11 TJKT A)</strong>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                <p>
                  Halo! Saya <strong>Aditya Arta Putra</strong>, siswa kelas 11 TJKT A di SMK Muhammadiyah Bandongan, Kabupaten Magelang, Jawa Tengah. Saya memiliki ketertarikan mendalam dan tekad kuat untuk terus menguasai rekayasa sistem modern, arsitektur web berskala, dan otomasi digital.
                </p>
                <p>
                  Salah satu pencapaian membanggakan saya adalah dipercaya sebagai <strong>Project Leader & Lead Developer</strong> dalam perancangan dan rekayasa Website Resmi Portal Desa Ngawonggo (<a href="https://ngawonggo.web.id" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline font-semibold">ngawonggo.web.id</a>) yang merupakan kolaborasi resmi antara Pemerintah Desa Ngawonggo dan SMK Muhammadiyah Bandongan.
                </p>
                <p>
                  Melalui ekosistem <strong>BikinKilat.web.id</strong>, saya mengimplementasikan seluruh pengetahuan tentang edge network, basis data cloud terpadu, antarmuka responsif ramah pengguna, dan sistem pembayaran QRIS instan agar dapat memberikan manfaat nyata bagi ribuan pengguna di seluruh Indonesia.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
                    <Code className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Arsitektur Web Modern
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Next.js App Router, React, TypeScript, Tailwind CSS, dan desain UI berstandar aksesibilitas tinggi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Jaringan Komputer (TJKT)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Pemahaman protokol jaringan, routing sistem, server environment, konfigurasi cloud edge, dan keamanan.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-2.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Basis Data Terpadu & Edge
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Integrasi basis data cloud real-time, sinkronisasi token lintas subdomain, dan kecepatan respon sub-2 detik.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                    Kepemimpinan Proyek Nyata
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Terbukti memimpin rekayasa proyek instansi resmi, open source, dan membangun produk SaaS mandiri.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. RIWAYAT PENDIDIKAN RESMI ADITYA ARTA PUTRA */}
      <section id="pendidikan" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Rekam Jejak Akademik
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Riwayat Pendidikan Aditya Arta Putra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Jejak langkah pendidikan formal Aditya Arta Putra dari dasar hingga sekolah kejuruan saat ini.
            </p>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-0.5 before:bg-indigo-200 dark:before:bg-slate-800">
            {/* 1. SMK Muhammadiyah Bandongan (Aktif) */}
            <div className="relative flex items-start gap-4 sm:gap-6 group">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-md shrink-0 z-10 group-hover:scale-105 transition-transform p-1.5 sm:p-2 flex items-center justify-center">
                <img
                  src={SUPABASE_ASSETS.schoolSmk}
                  alt="Logo Resmi SMK Muhammadiyah Bandongan"
                  title="SMK Muhammadiyah Bandongan Kabupaten Magelang"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-indigo-900/60 shadow-sm space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    Sekolah Menengah Kejuruan (SMK)
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Kelas 11 TJKT A (Saat Ini)
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  SMK MUHAMMADIYAH BANDONGAN
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Jurusan <strong>Teknik Jaringan Komputer & Telekomunikasi (TJKT)</strong>. Aktif memimpin proyek web nyata, mendalami arsitektur web modern, full-stack development, dan rekayasa sistem otomasi publik.
                </p>
              </div>
            </div>

            {/* 2. MTsN 2 Magelang (Lulus) */}
            <div className="relative flex items-start gap-4 sm:gap-6 group">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-md shrink-0 z-10 group-hover:scale-105 transition-transform p-1.5 sm:p-2 flex items-center justify-center">
                <img
                  src={SUPABASE_ASSETS.schoolMts}
                  alt="Logo Resmi MTs Negeri 2 Magelang"
                  title="MTs Negeri 2 Magelang"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    Madrasah Tsanawiyah / SMP
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Lulus
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  MTSN 2 MAGELANG
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Mengembangkan kepemimpinan, kemampuan logika matematika, dan eksplorasi awal dalam bidang komputasi, perangkat lunak, serta teknologi informasi.
                </p>
              </div>
            </div>

            {/* 3. MI Al Huda Maduretno (Lulus) */}
            <div className="relative flex items-start gap-4 sm:gap-6 group">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-md shrink-0 z-10 group-hover:scale-105 transition-transform p-1.5 sm:p-2 flex items-center justify-center">
                <img
                  src={SUPABASE_ASSETS.schoolMi}
                  alt="Logo Resmi MI Al Huda Maduretno"
                  title="MI Al Huda Maduretno"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <div className="flex-1 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    Madrasah Ibtidaiyah / SD
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Lulus
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  MI AL HUDA MADURETNO
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  Fondasi awal pembentukan karakter, kedisiplinan belajar, dan ketertarikan tinggi pada sains dan ilmu pengetahuan teknologi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. KARYA & PROYEK UNGGULAN ADITYA ARTA PUTRA */}
      <section id="proyek" className="py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Karya Nyata & Portofolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Proyek Teknologi Buatan Aditya Arta Putra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Karya rekayasa sistem nyata, kemitraan pemerintah daerah, dan ekosistem SaaS mandiri.
            </p>
          </div>

          <div className="space-y-8">
            {/* FLAGSHIP 1: BIKINKILAT.WEB.ID */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-900/80 shadow-lg relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>⭐ PROYEK UTAMA SAAS</span>
                </div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Solo Founder & Lead Engineer: Aditya Arta Putra
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    BikinKilat.web.id — Ekosistem Otomasi Dokumen & Presentasi
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Platform ekosistem micro-SaaS terpadu Indonesia yang menyediakan 9 layanan otomasi cerdas: slide presentasi kilat, modul ajar Kurikulum Merdeka, CV ATS-Friendly, kalkulator RAB Excel standar SNI, surat bisnis, surat waris, proposal kegiatan, pasfoto AI, dan kasir pembayaran resmi QRIS.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {[
                      '9 Subdomain Terintegrasi',
                      '1 Dompet Token Universal',
                      'Pembayaran QRIS Nasional Instan',
                      'Arsitektur Edge Cepat',
                      'UI/UX Standar Industri',
                    ].map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <a
                    href="https://bikinkilat.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm text-center shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <span>Kunjungi Portal BikinKilat</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/adityaarta085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Profil GitHub Aditya</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FLAGSHIP 2: PORTAL DESA NGAWONGGO */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-md relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>KEMITRAAN RESMI PEMERINTAH DESA</span>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Project Leader & Lead Developer: Aditya Arta Putra (40% Kontribusi Tim)
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Website Portal Resmi Desa Ngawonggo (ngawonggo.web.id)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    Portal resmi sistem informasi publik, layanan mandiri warga, transparansi pemerintah, dan profil Desa Ngawonggo, Kecamatan Kaliangkrik, Kabupaten Magelang. Dirancang dan dibangun dari hulu ke hilir dengan kepemimpinan arsitektur penuh oleh Aditya Arta Putra melalui kemitraan Pemdes Ngawonggo & SMK Muhammadiyah Bandongan (11 TJKT A).
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {[
                      'Layanan Mandiri Administrasi Warga',
                      'Warta Resmi & Pengumuman Desa',
                      'Dokumentasi Media & Piagam Resmi',
                      'Kredensial Terverifikasi di /credits',
                    ].map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-3">
                  <a
                    href="https://ngawonggo.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm text-center shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <span>Kunjungi Portal Desa</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://ngawonggo.web.id/credits"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>Lihat Kredensial Resmi</span>
                  </a>
                </div>
              </div>
            </div>

            {/* OTHER PROJECTS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Project 3: E-Izin */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    Open Source
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Sistem Web Perizinan Online (E-Izin)
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Sistem perizinan online berbasis web karya Aditya Arta Putra yang mempermudah proses pengajuan administrasi perizinan secara digital, terstruktur, dan efisien.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <a
                    href="https://github.com/adityaarta085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub Repo</span>
                  </a>
                  <a
                    href="https://demo-e-izin.createhub.web.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <span>Demo Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Project 4: Linksku Software Suite */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                    Utility Platform
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Linksku Software Suite
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Koleksi perkakas digital buatan Aditya: SSWEB screenshot otomatis kecepatan tinggi, generator barcode IQC logistik, media digital, dan AI assistant.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <a
                    href="https://linkskusoftware2.rf.gd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <span>SSWEB</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://linkskusoftware.rf.gd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <span>IQC Generator</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Project 5: Buku Tamu Digital */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    Sistem Sekolah
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Buku Tamu Digital SMK
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Aplikasi buku tamu digital karya Aditya Arta Putra khusus SMK Muhammadiyah Bandongan guna mencatat kunjungan dan kehadiran tamu secara modern, rapi, dan aman.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <a
                    href="https://wa.me/6285136436577?text=Halo%20Aditya%2C%20saya%20ingin%20demo%20Buku%20Tamu%20Digital%20SMK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>WhatsApp Demo</span>
                  </a>
                  <a
                    href="https://github.com/adityaarta085"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>adityaarta085</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GALERI FOTO INTERAKTIF (DENGAN FILTER & LIGHTBOX) */}
      <section id="galeri" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Dokumentasi & Visual
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Galeri Foto Resmi Aditya Arta Putra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Dokumentasi foto resmi kegiatan, rekayasa perangkat lunak, piagam sertifikat, dan aktivitas SMK Muhammadiyah Bandongan.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 scale-105'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} - Aditya Arta Putra`}
                    title={`${item.title} - Aditya Arta Putra`}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/80 text-white backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  {item.isPinned && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-sm flex items-center gap-1">
                        <Pin className="w-3 h-3" />
                        <span>Utama</span>
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-950">
              <img
                src={activeLightbox.imageUrl}
                alt={`${activeLightbox.title} - Aditya Arta Putra`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {activeLightbox.category}
                </span>
                {activeLightbox.date && (
                  <span className="text-xs text-slate-400 font-medium">
                    Tahun {activeLightbox.date}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                {activeLightbox.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {activeLightbox.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7. FAQ SEPUTAR ADITYA ARTA PUTRA (PENCARIAN GOOGLE & BING TERATAS #1) */}
      <section id="faq" className="py-20 bg-white dark:bg-slate-900/50 border-y border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Tanya Jawab & Penelusuran
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Pertanyaan Umum Seputar Aditya Arta Putra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Jawaban resmi mengenai identitas, karya, latar belakang, dan kontak Aditya Arta Putra.
            </p>
          </div>

          <div className="space-y-3.5">
            {DEVELOPER_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <div className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/80 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. BUKU TAMU INTERAKTIF (GUESTBOOK) */}
      <section id="buku-tamu" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
              Apresiasi & Jejak Kunjungan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Buku Tamu untuk Aditya Arta Putra
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Tinggalkan pesan sapaan, apresiasi, atau masukan yang tersimpan langsung di sistem basis data cloud kami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Input Buku Tamu */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Tulis Pesan untuk Aditya</span>
              </h3>

              {gbSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Terima kasih! Pesan Anda telah ditambahkan ke Buku Tamu.</span>
                </div>
              )}

              {gbError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300">
                  {gbError}
                </div>
              )}

              <form onSubmit={handleSubmitGuestbook} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Nama / Panggilan *
                  </label>
                  <input
                    type="text"
                    required
                    value={gbName}
                    onChange={(e) => setGbName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    maxLength={60}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Peran / Instansi (Opsional)
                  </label>
                  <input
                    type="text"
                    value={gbRole}
                    onChange={(e) => setGbRole(e.target.value)}
                    placeholder="Contoh: Guru / Mahasiswa / Rekan Developer"
                    maxLength={50}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Avatar Emoji
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {AVATAR_OPTIONS.map((av) => (
                      <button
                        key={av}
                        type="button"
                        onClick={() => setGbAvatar(av)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                          gbAvatar === av
                            ? 'bg-indigo-600 scale-110 shadow-sm shadow-indigo-500/20'
                            : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:scale-105'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pesan Masukan / Sapaan *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={gbMessage}
                    onChange={(e) => setGbMessage(e.target.value)}
                    placeholder="Tulis pesan atau masukan positif Anda untuk Aditya di sini..."
                    maxLength={500}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <div className="text-[10px] text-slate-400 text-right mt-0.5">
                    {gbMessage.length}/500
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={gbSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{gbSubmitting ? 'Mengirim...' : 'Kirim Pesan ke Buku Tamu'}</span>
                </button>
              </form>
            </div>

            {/* Feed Buku Tamu */}
            <div className="lg:col-span-7 space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 pb-1">
                <span>Daftar Pesan Masuk ({guestbookEntries.length})</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold">
                  Basis Data Terpadu
                </span>
              </div>

              {guestbookEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-2xl border transition-colors ${
                    entry.isPinned
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/80 dark:border-indigo-900/60'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-base shrink-0 shadow-2xs">
                        {entry.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {entry.name}
                          </h4>
                          {entry.isPinned && (
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-amber-500 text-white">
                              Disematkan
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          {entry.role || 'Pengunjung'}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 shrink-0">
                      {new Date(entry.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal pl-10.5">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. MARI BEKERJA SAMA & KONTAK LANGSUNG ADITYA ARTA PUTRA */}
      <section id="kontak" className="py-20 bg-white dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800 text-white shadow-2xl space-y-8 relative overflow-hidden text-center sm:text-left">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10 max-w-xl">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                Terbuka untuk Kolaborasi & Proyek
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Mari Wujudkan Ide Digital Anda Bersama Aditya Arta Putra
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed font-normal">
                Punya kebutuhan website instansi, sistem automasi bisnis, integrasi perizinan, atau ingin berdiskusi seputar rekayasa sistem modern? Jangan ragu untuk menghubungi Aditya secara langsung.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 relative z-10">
              <a
                href="https://wa.me/6285136436577?text=Halo%20Aditya%20Arta%20Putra%2C%20saya%20tertarik%20bekerja%20sama%20atau%20berdiskusi%20tentang%20proyek."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: 0851-3643-6577</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-xl bg-indigo-900/60 hover:bg-indigo-900/80 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Email Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Email</span>
                  </>
                )}
              </button>

              <a
                href="https://github.com/adityaarta085"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-indigo-900/60 hover:bg-indigo-900/80 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub @adityaarta085</span>
              </a>
            </div>

            <div className="pt-4 border-t border-white/15 text-xs text-indigo-200 flex flex-wrap items-center justify-between gap-2 relative z-10">
              <span>Lokasi Domisili: Magelang, Jawa Tengah, Indonesia</span>
              <span>SMK Muhammadiyah Bandongan (11 TJKT A)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FOOTER RESMI */}
      <footer className="py-10 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">
              Aditya Arta Putra
            </span>
            <span>•</span>
            <span>Founder & Solo Engineer BikinKilat.web.id</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Portal Utama
            </Link>
            <a href="https://slide.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Slide Kilat
            </a>
            <a href="https://cv.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              CV ATS
            </a>
            <a href="https://rab.bikinkilat.web.id" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              RAB SNI
            </a>
            <a
              href="#tentang"
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              Kembali ke Atas ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
