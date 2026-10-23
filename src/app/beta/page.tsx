'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { CashierModal } from '@/components/CashierModal';
import { TransactionHistory } from '@/components/TransactionHistory';
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  QrCode,
  Coins,
  SlidersHorizontal,
  Mail,
  HelpCircle,
  Menu,
  X,
  Zap,
  BookOpen,
  FileText,
  FileSpreadsheet,
  Scale,
  Camera,
  Search,
  Loader2,
  CheckCheck,
  TrendingUp,
  GitFork,
  Presentation,
  ShieldCheck,
  LayoutGrid
} from 'lucide-react';

// Data untuk 8 Tab Demo Interaktif ("Coba contoh hasilnya")
interface DemoTopic {
  title: string;
  excerptTitle: string;
  excerptSubtitle: string;
  excerptQuote: string;
  buildTime: string;
  format: string;
  detailLabel: string;
  detailValue: string;
}

interface DemoService {
  id: string;
  tabLabel: string;
  serviceTitle: string;
  subdomain: string;
  url: string;
  benefits: string[];
  topics: DemoTopic[];
}

const DEMO_SERVICES: DemoService[] = [
  {
    id: 'slide',
    tabLabel: 'Slide',
    serviceTitle: 'Slide Presentasi (.pptx)',
    subdomain: 'slide.bikinkilat.web.id',
    url: 'https://slide.bikinkilat.web.id',
    benefits: [
      '12 slide lengkap dengan catatan pembicara',
      'Analisis SWOT dan proyeksi finansial 3 tahun',
      'Sitasi dan data statistik Kementan 2024',
    ],
    topics: [
      {
        title: 'Pitch Deck Solusi Agrotech Kopi Gayo',
        excerptTitle: 'Revolusi Rantai Pasok Kopi Gayo Berbasis AI & IoT',
        excerptSubtitle: 'Deck pendanaan Seri A, 12 slide terstruktur dan siap dipaparkan',
        excerptQuote:
          'Slide 4: Validasi Pasar. Dari 15.000 hektar kebun kopi, 68% petani mengalami kendala volatilitas harga tengkulak. Solusi BikinKilat memangkas rantai distribusi hingga 3 lapis, langsung ke roastery nasional.',
        buildTime: '45 detik',
        format: 'PPTX 16:9',
        detailLabel: 'Catatan pembicara',
        detailValue: 'Ada',
      },
      {
        title: 'Strategi Penetrasi B2B SaaS Logistik',
        excerptTitle: 'Ekspansi Platform Logistik B2B Multi-Pulau',
        excerptSubtitle: 'Presentasi strategi manajemen kuartal IV untuk dewan direksi',
        excerptQuote:
          'Slide 6: Analisis Efisiensi Armada. Implementasi dynamic routing memangkas konsumsi BBM hingga 18,4% dan meningkatkan kepatuhan SLA pengiriman antarpulau menjadi 99,2%.',
        buildTime: '50 detik',
        format: 'PPTX 16:9',
        detailLabel: 'Catatan pembicara',
        detailValue: 'Ada',
      },
      {
        title: 'Sidang Skripsi NLP Machine Learning',
        excerptTitle: 'Klasifikasi Sentimen Ulasan Konsumen dengan Transformer',
        excerptSubtitle: 'Presentasi sidang tugas akhir sarjana informatika 15 menit',
        excerptQuote:
          'Slide 8: Hasil Evaluasi F1-Score. Model fine-tuned IndoBERT mencapai akurasi 94,2%, melampaui baseline SVM sebesar 11,8% pada korpus percakapan informal media sosial.',
        buildTime: '40 detik',
        format: 'PPTX 16:9',
        detailLabel: 'Catatan pembicara',
        detailValue: 'Ada',
      },
    ],
  },
  {
    id: 'modul',
    tabLabel: 'Modul Ajar',
    serviceTitle: 'Modul Ajar Kurikulum Merdeka (.docx)',
    subdomain: 'modul.bikinkilat.web.id',
    url: 'https://modul.bikinkilat.web.id',
    benefits: [
      'Format resmi Kurikulum Merdeka (BSKAP 033/H/KR/2022)',
      'Rubrik asesmen diagnostik, formatif, dan sumatif',
      'Kisi-kisi dan bank soal HOTS beserta kunci jawaban',
    ],
    topics: [
      {
        title: 'Fisika Energi Terbarukan SMA Kelas 10',
        excerptTitle: 'Modul Ajar: Pemanfaatan Energi Terbarukan Ramah Lingkungan',
        excerptSubtitle: 'Fase E (Kelas X), Alokasi Waktu 3 Pertemuan (6 x 45 menit)',
        excerptQuote:
          'Tujuan Pembelajaran 1.2: Peserta didik mampu menganalisis efisiensi konversi energi pada miniatur panel surya melalui pengujian eksperimental dan mempresentasikan dampaknya terhadap mitigasi krisis iklim global.',
        buildTime: '52 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Rubrik asesmen',
        detailValue: 'Lengkap HOTS',
      },
      {
        title: 'Informatika Berpikir Komputasional SMP Kelas 8',
        excerptTitle: 'Modul Ajar: Algoritma & Struktur Data Pemrograman Visual',
        excerptSubtitle: 'Fase D (Kelas VIII), Capaian Pembelajaran Berpikir Komputasional',
        excerptQuote:
          'Kegiatan Inti: Peserta didik membedah struktur antrean (queue) dan tumpukan (stack) melalui simulasi papan logika sebelum mengimplementasikannya dalam modul blok visual.',
        buildTime: '48 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Rubrik asesmen',
        detailValue: 'Lengkap HOTS',
      },
      {
        title: 'Projek P5 Gaya Hidup Berkelanjutan SD Kelas 5',
        excerptTitle: 'Modul Projek Penguatan Profil Pelajar Pancasila (P5)',
        excerptSubtitle: 'Tema: Jejak Karbon Cilik, Fase C (Kelas V), 40 Jam Pelajaran',
        excerptQuote:
          'Dimensi Profil: Beriman, bertakwa kepada Tuhan YME dan berakhlak mulia (akhlak kepada alam). Siswa memetakan sampah plastik kantin sekolah dan merancang kampanye zero-waste.',
        buildTime: '55 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Rubrik asesmen',
        detailValue: 'Lengkap HOTS',
      },
    ],
  },
  {
    id: 'cv',
    tabLabel: 'CV',
    serviceTitle: 'CV ATS Friendly & Surat Lamaran (.pdf)',
    subdomain: 'cv.bikinkilat.web.id',
    url: 'https://cv.bikinkilat.web.id',
    benefits: [
      'Skor lolos ATS 90+ dengan kata kunci posisi industri',
      'Format 1 halaman ringkas & elegan tanpa kolom berlebih',
      'Dilengkapi draf surat lamaran kerja bilingual (ID & EN)',
    ],
    topics: [
      {
        title: 'Software Engineer Fullstack 4 Tahun Pengalaman',
        excerptTitle: 'Professional Resume: Senior Fullstack Engineer',
        excerptSubtitle: 'Standar format ATS Harvard single-column siap diproses sistem HR',
        excerptQuote:
          'Pengalaman Kerja: Memimpin migrasi microservices e-commerce dengan Redis & Golang, memangkas response time API sebesar 42% dan mendukung lonjakan 120.000 concurrent user saat flash sale nasional.',
        buildTime: '32 detik',
        format: 'PDF & DOCX',
        detailLabel: 'Skor ATS',
        detailValue: '96 / 100',
      },
      {
        title: 'Digital Marketing Specialist FMCG',
        excerptTitle: 'Professional Resume: Growth & Performance Marketing',
        excerptSubtitle: 'Resume teroptimasi dengan metrik ROI & data attribution kampanye',
        excerptQuote:
          'Ringkasan Karier: Mengelola belanja iklan Rp 450 juta/bulan di TikTok Ads & Meta, meningkatkan Return on Ad Spend (ROAS) dari 2.8x menjadi 4.6x serta mendongkrak penjualan D2C hingga 65%.',
        buildTime: '30 detik',
        format: 'PDF & DOCX',
        detailLabel: 'Skor ATS',
        detailValue: '94 / 100',
      },
      {
        title: 'Fresh Graduate Akuntansi Keuangan',
        excerptTitle: 'Graduate Resume: Financial Accounting & Taxation',
        excerptSubtitle: 'CV awal karier dengan sertifikasi Brevet Pajak AB & magang audit',
        excerptQuote:
          'Pendidikan & Sertifikasi: Sarjana Akuntansi (IPK 3.86/4.00) dengan Sertifikasi Brevet Pajak AB IAI. Menyelesaikan rekonsiliasi fiskal 24 klien korporasi selama magang di KAP.',
        buildTime: '28 detik',
        format: 'PDF & DOCX',
        detailLabel: 'Skor ATS',
        detailValue: '95 / 100',
      },
    ],
  },
  {
    id: 'rab',
    tabLabel: 'RAB',
    serviceTitle: 'RAB Bangunan & Konstruksi SNI (.xlsx)',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    benefits: [
      'Database Analisis Harga Satuan Pekerjaan (AHSP) SNI PUPR 2023',
      'Formula rumus Excel hidup (.xlsx), rekapitulasi, dan PPN 11%',
      'Dilengkapi timeline bobot pekerjaan Kurva S mingguan',
    ],
    topics: [
      {
        title: 'RAB Bangun Rumah Tinggal 2 Lantai Tipe 120',
        excerptTitle: 'Rencana Anggaran Biaya Rumah Tinggal 2 Lantai (120 m²)',
        excerptSubtitle: 'Analisis AHSP Permen PU-PR No. 8/2023 Wilayah Jabodetabek',
        excerptQuote:
          'Pekerjaan Struktur Beton Bertulang K-250 (Pondasi Footplate & Kolom): Total volume 28,4 m³ x AHSP Rp 5.850.000 = Rp 166.140.000. Rekapitulasi biaya total fisik: Rp 614.280.000 (PPN 11% terhitung).',
        buildTime: '58 detik',
        format: 'XLSX & PDF',
        detailLabel: 'Rumus Excel',
        detailValue: 'Formula Aktif',
      },
      {
        title: 'RAB Renovasi Interior Kafe Minimalis 60m²',
        excerptTitle: 'RAB Fit-Out Interior Commercial Space 60 m²',
        excerptSubtitle: 'Pekerjaan partisi akustik, MEP elektrikal, bar counter & flooring',
        excerptQuote:
          'Pekerjaan Finishing: Partisi gypsum 2 sisi rangka hollow galvanis 40x40, lantai vinyl motif kayu heavy-duty, instalasi titik lampu spotlight warm white 12W. Total estimasi: Rp 88.400.000.',
        buildTime: '45 detik',
        format: 'XLSX & PDF',
        detailLabel: 'Rumus Excel',
        detailValue: 'Formula Aktif',
      },
      {
        title: 'RAB Pembangunan Saluran Drainase 200m',
        excerptTitle: 'RAB Infrastruktur Saluran U-Ditch Lingkungan 200 Meter',
        excerptSubtitle: 'Pemasangan saluran precast U-Ditch 40x40 dengan tutup heavy duty',
        excerptQuote:
          'Galian Tanah Mekanis & Pasang U-Ditch: Volume 200 unit x Rp 680.000/m1 (termasuk urugan sirtu padat & perapian tepi jalan). Subtotal anggaran konstruksi: Rp 142.300.000.',
        buildTime: '50 detik',
        format: 'XLSX & PDF',
        detailLabel: 'Rumus Excel',
        detailValue: 'Formula Aktif',
      },
    ],
  },
  {
    id: 'surat',
    tabLabel: 'Surat',
    serviceTitle: 'Surat Perjanjian & Kontrak Legal (.docx)',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    benefits: [
      'Rujukan pasal 1320 & 1338 Kitab Undang-Undang Hukum Perdata',
      'Klausul lengkap: wanprestasi, force majeure, dan arbitrase',
      'Disediakan slot penempatan e-Meterai resmi Peruri',
    ],
    topics: [
      {
        title: 'Surat Perjanjian Kerja Sama Distribusi Produk',
        excerptTitle: 'Perjanjian Kerja Sama Keagenan & Distribusi Eksklusif',
        excerptSubtitle: 'Draf kontrak hukum komersial sah dengan klausul perlindungan hak cipta',
        excerptQuote:
          'Pasal 7 (Wanprestasi dan Ganti Rugi): Apabila Pihak Kedua lalai mendistribusikan kuota minimum selama 2 bulan berturut-turut tanpa alasan kahar, Pihak Pertama berhak mengakhiri kerja sama sepihak dengan denda 5%.',
        buildTime: '38 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Legalitas',
        detailValue: 'KUHPerdata Sah',
      },
      {
        title: 'Surat Somasi Teguran Keterlambatan Pembayaran',
        excerptTitle: 'Surat Teguran Hukum (Somasi Pertama) Pelunasan Invoice',
        excerptSubtitle: 'Peringatan hukum resmi atas invoice jatuh tempo 60 hari',
        excerptQuote:
          'Dengan ini kami memberikan peringatan keras kepada Saudara untuk segera melunasi kewajiban pembayaran sebesar Rp 45.000.000 dalam tenggat waktu 7 hari kalender sejak surat ini diterima, guna menghindari gugatan perdata.',
        buildTime: '35 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Legalitas',
        detailValue: 'KUHPerdata Sah',
      },
      {
        title: 'Perjanjian Sewa Ruko dengan Klausul Restorasi',
        excerptTitle: 'Perjanjian Sewa Menyewa Bangunan Komersial 3 Tahun',
        excerptSubtitle: 'Kontrak sewa properti komprehensif dengan deposit jaminan',
        excerptQuote:
          'Pasal 4 (Uang Jaminan & Pemeliharaan): Penyewa wajib menempatkan uang jaminan setara 10% dari total sewa yang akan dikembalikan secara utuh setelah masa sewa berakhir dan unit diserahterimakan kembali dalam kondisi prima.',
        buildTime: '40 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Legalitas',
        detailValue: 'KUHPerdata Sah',
      },
    ],
  },
  {
    id: 'waris',
    tabLabel: 'Waris',
    serviceTitle: 'Kalkulator Waris Faraidh Islam (.pdf)',
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    benefits: [
      'Hitungan bagian pasti (dzawil furudh) & sisa harta (ashabah)',
      'Penyelesaian kasus Aul (kekurangan harta) & Radd (kelebihan harta)',
      'Dilengkapi diagram silsilah keluarga dan tabel pembagian rupiah',
    ],
    topics: [
      {
        title: '1 Istri, 2 Anak Laki-laki, 1 Anak Perempuan',
        excerptTitle: 'Ketetapan Perhitungan Harta Waris Faraidh Islam',
        excerptSubtitle: 'Harta Bersih Rp 800.000.000 (setelah pelunasan hutang & wasiat)',
        excerptQuote:
          'Istri memperoleh 1/8 (karena ada anak) = Rp 100.000.000. Sisa Rp 700.000.000 dibagikan ashabah bil-ghair kepada 2 anak laki-laki dan 1 anak perempuan dengan rasio 2:1. Anak Laki: masing-masing Rp 280.000.000; Anak Perempuan: Rp 140.000.000.',
        buildTime: '35 detik',
        format: 'PDF & PNG',
        detailLabel: 'Fatwa',
        detailValue: 'KHI Inpres 1/1991',
      },
      {
        title: 'Suami Wafat: Istri, Ibu, dan 1 Anak Kandung',
        excerptTitle: 'Perhitungan Faraidh Keluarga Inti dengan Ibu Kandung',
        excerptSubtitle: 'Harta Warisan Bersih Rp 480.000.000',
        excerptQuote:
          'Istri: 1/8 (Rp 60.000.000). Ibu: 1/6 (karena ada keturunan pewaris) = Rp 80.000.000. Anak Laki-laki Tunggal menerima sisa (ashabah binafsihi) = Rp 340.000.000. Pembagian genap 100% tanpa selisih.',
        buildTime: '32 detik',
        format: 'PDF & PNG',
        detailLabel: 'Fatwa',
        detailValue: 'KHI Inpres 1/1991',
      },
      {
        title: 'Pewaris Wafat Tanpa Anak (Kalalah)',
        excerptTitle: 'Perhitungan Waris Kasus Kalalah (Saudara Kandung)',
        excerptSubtitle: 'Pewaris meninggalkan Suami dan 1 Saudari Perempuan Kandung',
        excerptQuote:
          'Suami memperoleh 1/2 bagian (Rp 150.000.000). Saudari perempuan kandung memperoleh 1/2 bagian (Rp 150.000.000) sesuai QS. An-Nisa ayat 176. Pembagian selesai tanpa kasus Aul.',
        buildTime: '30 detik',
        format: 'PDF & PNG',
        detailLabel: 'Fatwa',
        detailValue: 'KHI Inpres 1/1991',
      },
    ],
  },
  {
    id: 'proposal',
    tabLabel: 'Proposal',
    serviceTitle: 'Proposal Bisnis & Sponsorship (.docx)',
    subdomain: 'proposal.bikinkilat.web.id',
    url: 'https://proposal.bikinkilat.web.id',
    benefits: [
      'Format baku pengajuan Kredit Usaha Rakyat (KUR) bank BUMN',
      'Paket sponsorship bertingkat (Platinum, Gold, Silver)',
      'Proyeksi arus kas, Break Even Point (BEP), dan payback period',
    ],
    topics: [
      {
        title: 'Pengajuan Fasilitas KUR Bank BRI / Mandiri Rp 100 Juta',
        excerptTitle: 'Proposal Permohonan Kredit Usaha Rakyat (KUR) Mikro',
        excerptSubtitle: 'Sektor Produksi Makanan Kemasan Berizin P-IRT & Halal BPJPH',
        excerptQuote:
          'Analisis Kelayakan Usaha: Omzet rata-rata Rp 42.000.000/bulan dengan net profit margin 28%. Permohonan plafon modal kerja Rp 100.000.000 dengan proyeksi rasio Debt Service Coverage Ratio (DSCR) 3,4x.',
        buildTime: '55 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Finansial',
        detailValue: 'BEP & 3 Thn Proyeksi',
      },
      {
        title: 'Sponsorship Festival Musik Kampus 2026',
        excerptTitle: "Proposal Kerja Sama Sponsorship 'Harmoni Nusantara 2026'",
        excerptSubtitle: 'Target 8.000 penonton muda dengan 12 penampil musisi nasional',
        excerptQuote:
          'Paket Platinum (Rp 50.000.000): Naming right panggung utama, logo 40% di seluruh media promosi digital & baliho kota, booth eksklusif 6x6 meter, dan spot promosi MC setiap jeda penampilan artis.',
        buildTime: '48 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Finansial',
        detailValue: 'Tiering Sponsor',
      },
      {
        title: 'Ekspansi Cabang Usaha Kuliner Tradisional',
        excerptTitle: 'Proposal Investasi Pembukaan Gerai Cabang Baru',
        excerptSubtitle: 'Kebutuhan belanja modal (CapEx) Rp 180.000.000 sistem bagi hasil',
        excerptQuote:
          'Proyeksi Pengembalian Modal: Berdasarkan data historis gerai 1 & 2, Payback Period diperkirakan tercapai dalam bulan ke-14 dengan perkiraan dividen investor 24% per tahun.',
        buildTime: '52 detik',
        format: 'DOCX & PDF',
        detailLabel: 'Finansial',
        detailValue: 'BEP & 3 Thn Proyeksi',
      },
    ],
  },
  {
    id: 'pasfoto',
    tabLabel: 'Pasfoto',
    serviceTitle: 'Studio Pas Foto Formal Instan (.jpg)',
    subdomain: 'pasfoto.bikinkilat.web.id',
    url: 'https://pasfoto.bikinkilat.web.id',
    benefits: [
      'Ganti pakaian otomatis ke jas hitam, kemeja putih, dan dasi',
      'Latar merah standar BKN/Kemenkumham & latar biru resmi',
      'Layout lembar cetak siap print ukuran 2x3, 3x4, dan 4x6 cm',
    ],
    topics: [
      {
        title: 'Pasfoto Jas Hitam Dasi Latar Merah (CPNS / BKN)',
        excerptTitle: 'Studio Pasfoto Formal SSCASN BKN 2026',
        excerptSubtitle: 'Standar resolusi 300 DPI ukuran 4x6 cm file maksimal 200 KB',
        excerptQuote:
          'Spesifikasi Output: Format JPEG rasio 4:6, resolusi 472 x 709 pixel (300 DPI). Latar belakang merah solid (#D92525) tanpa bayangan, pakaian kemeja putih berkerah dengan jas hitam rapi.',
        buildTime: '25 detik',
        format: 'JPG & PNG',
        detailLabel: 'Regulasi',
        detailValue: 'Standar BKN SSCASN',
      },
      {
        title: 'Pasfoto Kemeja Putih Latar Biru (Kedutaan & Visa)',
        excerptTitle: 'Studio Pasfoto Dokumen Internasional & Visa',
        excerptSubtitle: 'Latar biru resmi kedutaan (#0070BA) proporsi wajah 70-80%',
        excerptQuote:
          'Spesifikasi Output: Proporsi kepala dari dagu hingga ujung rambut memenuhi 75% bidang foto sesuai standar ICAO Doc 9303. Pencahayaan netral simetris, siap cetak lembar 3x4 dan 4x6 cm.',
        buildTime: '28 detik',
        format: 'JPG & PNG',
        detailLabel: 'Regulasi',
        detailValue: 'Standar ICAO Visa',
      },
      {
        title: 'Pasfoto Lamaran Kerja BUMN / Korporasi',
        excerptTitle: 'Pasfoto Eksekutif Profesional Multi-Dimensi',
        excerptSubtitle: 'Pilihan latar abu-abu studio gradasi elegan atau putih bersih',
        excerptQuote:
          'Spesifikasi Output: Dilengkapi lembar cetak gabungan (2 lembar 4x6, 4 lembar 3x4, dan 4 lembar 2x3) dalam 1 lembar kertas foto A6 300 DPI, siap dibawa ke percetakan.',
        buildTime: '26 detik',
        format: 'JPG & PNG',
        detailLabel: 'Regulasi',
        detailValue: 'Standar Korporat HR',
      },
    ],
  },
];

// 9 Layanan Dokumen Spesifik
interface ServiceCardItem {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  category: 'Akademik' | 'Karier' | 'Bisnis' | 'Legal' | 'Kreatif';
  description: string;
  bullets: string[];
  costLabel: string;
  formatLabel: string;
  actionText: string;
}

const SERVICE_CARDS: ServiceCardItem[] = [
  {
    id: '01-portal',
    name: 'Portal BikinKilat',
    subdomain: 'bikinkilat.web.id',
    url: 'https://bikinkilat.web.id',
    category: 'Bisnis',
    description: 'Satu akun, satu saldo token untuk 9 layanan.',
    bullets: [
      'Masuk sekali untuk semua layanan',
      'Isi token lewat QRIS',
      'Catatan transaksi lengkap',
    ],
    costLabel: 'Gratis',
    formatLabel: 'Dashboard, QRIS',
    actionText: 'Buka Portal',
  },
  {
    id: '02-slide',
    name: 'Slide & Makalah',
    subdomain: 'slide.bikinkilat.web.id',
    url: 'https://slide.bikinkilat.web.id',
    category: 'Akademik',
    description: 'Slide presentasi modern dan makalah akademik siap sidang.',
    bullets: [
      'Slide 16:9 tema modern',
      'Makalah format standar kampus',
      'Contekan tanya jawab sidang',
    ],
    costLabel: '2 token per berkas',
    formatLabel: '.pptx .docx .md',
    actionText: 'Buka Slide BikinKilat',
  },
  {
    id: '03-modul',
    name: 'Modul Ajar',
    subdomain: 'modul.bikinkilat.web.id',
    url: 'https://modul.bikinkilat.web.id',
    category: 'Akademik',
    description: 'RPP, modul ajar interaktif, rubrik asesmen, dan bank soal HOTS untuk guru.',
    bullets: [
      'Format Kurikulum Merdeka',
      'Rubrik asesmen diagnostik',
      'Kisi-kisi soal HOTS',
    ],
    costLabel: '2 token per berkas',
    formatLabel: '.docx .pdf',
    actionText: 'Buka Modul BikinKilat',
  },
  {
    id: '04-cv',
    name: 'CV & Lamaran',
    subdomain: 'cv.bikinkilat.web.id',
    url: 'https://cv.bikinkilat.web.id',
    category: 'Karier',
    description: 'CV berstandar ATS internasional yang lolos filter sistem HRD perusahaan.',
    bullets: [
      'Skor lolos ATS 90+',
      'Surat lamaran dua bahasa',
      'Ekspor PDF siap kirim',
    ],
    costLabel: '1 token per berkas',
    formatLabel: '.pdf .docx',
    actionText: 'Buka CV BikinKilat',
  },
  {
    id: '05-rab',
    name: 'RAB Bangunan',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    category: 'Bisnis',
    description: 'Estimasi biaya material, upah tukang, dan jadwal pekerjaan berstandar SNI.',
    bullets: [
      'Database harga satuan SNI',
      'Tabel Excel otomatis',
      'Ringkasan Kurva S',
    ],
    costLabel: '3 token per berkas',
    formatLabel: '.xlsx .pdf',
    actionText: 'Buka RAB BikinKilat',
  },
  {
    id: '06-surat',
    name: 'Surat & Perjanjian',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    category: 'Legal',
    description: 'Dokumen legal sesuai pasal KUHPerdata, siap dibubuhi e-Meterai resmi Peruri.',
    bullets: [
      'Klausul KUHPerdata sah',
      'Slot e-Meterai standar',
      'Draf somasi dan MoU',
    ],
    costLabel: '2 token per berkas',
    formatLabel: '.docx .pdf',
    actionText: 'Buka Surat BikinKilat',
  },
  {
    id: '07-waris',
    name: 'Hitung Waris',
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    category: 'Legal',
    description: 'Pembagian waris Islam sesuai Kompilasi Hukum Islam (KHI) dan fatwa ulama.',
    bullets: [
      'Hitungan dzawil furudh presisi',
      'Diagram silsilah keluarga',
      'Tabel pembagian harta bersih',
    ],
    costLabel: '1 token per berkas',
    formatLabel: '.pdf',
    actionText: 'Buka Waris BikinKilat',
  },
  {
    id: '08-proposal',
    name: 'Proposal Bisnis',
    subdomain: 'proposal.bikinkilat.web.id',
    url: 'https://proposal.bikinkilat.web.id',
    category: 'Bisnis',
    description: 'Proposal bisnis dengan proyeksi keuangan untuk bank dan sponsor.',
    bullets: [
      'Format pengajuan KUR bank',
      'Paket sponsorship bertingkat',
      'Proyeksi laba rugi 3 tahun',
    ],
    costLabel: '2 token per berkas',
    formatLabel: '.docx .pdf',
    actionText: 'Buka Proposal BikinKilat',
  },
  {
    id: '09-pasfoto',
    name: 'Pas Foto',
    subdomain: 'pasfoto.bikinkilat.web.id',
    url: 'https://pasfoto.bikinkilat.web.id',
    category: 'Kreatif',
    description:
      'Ganti pakaian menjadi kemeja putih dan jas formal, serta latar merah atau biru ukuran 2x3, 3x4, 4x6.',
    bullets: [
      'Ganti jas dan dasi otomatis',
      'Latar merah dan biru standar',
      'Lembar cetak multi ukuran',
    ],
    costLabel: '1 token per berkas',
    formatLabel: '.png .jpg .pdf',
    actionText: 'Buka PasFoto BikinKilat',
  },
];

export default function BetaLandingPage() {
  const { tokens, setTokens, user, refreshTokens, openAuthModal } = useAuth();
  const [isCashierOpen, setIsCashierOpen] = useState(false);
  const [lastTxUpdated, setLastTxUpdated] = useState<number>(Date.now());

  // Interactive Demo State
  const [activeTabId, setActiveTabId] = useState<string>('slide');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState<number>(0);
  const [simulationStatus, setSimulationStatus] = useState<string>('Belum dimulai.');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasCopied, setHasCopied] = useState<boolean>(false);

  // 9 Layanan Category & Search State
  const [serviceCategory, setServiceCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Savings Calculator State
  const [calcProfile, setCalcProfile] = useState<string>('umkm');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(8);
  const [costPerDoc, setCostPerDoc] = useState<number>(100000);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Current Active Demo Service
  const currentDemo = useMemo(() => {
    return DEMO_SERVICES.find((s) => s.id === activeTabId) || DEMO_SERVICES[0];
  }, [activeTabId]);

  const currentTopic = currentDemo.topics[selectedTopicIndex] || currentDemo.topics[0];

  // Handle Tab Switch
  const handleTabChange = (serviceId: string) => {
    setActiveTabId(serviceId);
    setSelectedTopicIndex(0);
    setSimulationStatus('Belum dimulai.');
    setIsSimulating(false);
  };

  // Run Simulated Generation
  const handleSimulateGeneration = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationStatus('Menganalisis kebutuhan & acuan regulasi...');

    setTimeout(() => {
      setSimulationStatus('Menyusun struktur naskah resmi & formula berkas...');
    }, 600);

    setTimeout(() => {
      setSimulationStatus(`Selesai dalam ${currentTopic.buildTime}! Berkas asli siap unduh.`);
      setIsSimulating(false);
    }, 1200);
  };

  // Copy Excerpt
  const handleCopyExcerpt = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(
        `${currentTopic.excerptTitle}\n${currentTopic.excerptSubtitle}\n\n${currentTopic.excerptQuote}`
      );
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  // Calculator Preset Changes
  const handleProfileChange = (profile: string) => {
    setCalcProfile(profile);
    if (profile === 'student') {
      setHoursPerWeek(6);
      setCostPerDoc(50000);
    } else if (profile === 'teacher') {
      setHoursPerWeek(10);
      setCostPerDoc(75000);
    } else if (profile === 'umkm') {
      setHoursPerWeek(8);
      setCostPerDoc(100000);
    } else if (profile === 'pro') {
      setHoursPerWeek(15);
      setCostPerDoc(150000);
    }
  };

  // Calculator Math (Matching slice_6.jpg)
  const calcResults = useMemo(() => {
    const monthlyHours = hoursPerWeek * 4;
    const docCount = Math.max(1, Math.round(monthlyHours / 2.5));
    const monthlyManualCost = docCount * costPerDoc;
    const monthlyBkCost = docCount * 2500;
    const monthlyBkHours = Math.round(((docCount * 45) / 3600) * 10) / 10;
    const hoursSaved = Math.max(0, Math.round(monthlyHours - monthlyBkHours));
    const workDaysSaved = (hoursSaved / 8).toFixed(1).replace('.', ',');
    const moneySaved = Math.max(0, monthlyManualCost - monthlyBkCost);
    const percentSaved =
      monthlyManualCost > 0 ? Math.round((moneySaved / monthlyManualCost) * 100) : 0;

    return {
      docCount,
      hoursSaved,
      workDaysSaved,
      monthlyBkCost,
      moneySaved,
      percentSaved,
    };
  }, [hoursPerWeek, costPerDoc]);

  // Filter 9 Layanan Cards
  const filteredServices = useMemo(() => {
    return SERVICE_CARDS.filter((item) => {
      const matchCat = serviceCategory === 'Semua' || item.category === serviceCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.subdomain.toLowerCase().includes(q) ||
        item.bullets.some((b) => b.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [serviceCategory, searchQuery]);

  // Open Cashier handler
  const handleOpenCashier = () => {
    if (!user) {
      openAuthModal();
    } else {
      setIsCashierOpen(true);
    }
  };

  const handlePaymentSuccess = (addedTokens: number) => {
    setTokens((prev) => prev + addedTokens);
    setLastTxUpdated(Date.now());
    refreshTokens();
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. NAVBAR (Sticky & Minimalist, Exact Match to slice_1.jpg) */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo & Beta Pill */}
          <div className="flex items-center gap-3">
            <Link
              href="/beta"
              className="flex items-center gap-1.5 text-xl font-black tracking-tight text-slate-950 dark:text-white group"
            >
              <span>Bikin</span>
              <span className="text-blue-600 dark:text-blue-400">Kilat</span>
              <Zap className="w-4 h-4 fill-blue-600 text-blue-600 inline ml-0.5" />
            </Link>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 uppercase tracking-wider">
              Beta
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#layanan" className="hover:text-blue-600 dark:hover:text-white transition">
              Layanan
            </a>
            <a href="#coba-contoh" className="hover:text-blue-600 dark:hover:text-white transition">
              Coba contoh
            </a>
            <a href="#harga-token" className="hover:text-blue-600 dark:hover:text-white transition">
              Harga token
            </a>
            <a href="#riwayat" className="hover:text-blue-600 dark:hover:text-white transition">
              Riwayat
            </a>
            <a href="#pertanyaan" className="hover:text-blue-600 dark:hover:text-white transition">
              Pertanyaan
            </a>
            <a href="#bantuan" className="hover:text-blue-600 dark:hover:text-white transition">
              Bantuan
            </a>
          </nav>

          {/* User Auth & Balance Capsule */}
          <div className="flex items-center gap-3">
            {/* Token Balance Pill */}
            <button
              onClick={handleOpenCashier}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-1.5 transition active:scale-95"
              title="Isi token kasir"
            >
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>{tokens} token</span>
            </button>

            {/* Login / Claim Buttons */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleOpenCashier}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Isi Token</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95 flex items-center gap-1.5"
                >
                  <span>Klaim 5 token gratis</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-2">
            <a
              href="#layanan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Layanan
            </a>
            <a
              href="#coba-contoh"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Coba contoh
            </a>
            <a
              href="#harga-token"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Harga token
            </a>
            <a
              href="#riwayat"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Riwayat
            </a>
            <a
              href="#pertanyaan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Pertanyaan
            </a>
            <a
              href="#bantuan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              Bantuan
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION & RINGKASAN SPEC CARD (slice_1.jpg) */}
      <section className="py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Changelog Pill Badge */}
              <Link
                href="/catatan-rilis"
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-800 transition"
              >
                <span className="font-bold text-blue-600 dark:text-blue-400">Baru v2.7</span>
                <span>Slide widescreen & verifikasi OTP instan aktif</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </Link>

              {/* Editorial Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12]">
                Buat dokumen resmi dalam hitungan detik
              </h1>

              {/* Subhead Body */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Ketik topik Anda, lalu unduh berkas aslinya. Tersedia untuk slide, makalah, modul
                ajar, CV, RAB, surat perjanjian, waris, proposal, dan pasfoto. Isinya mengikuti
                format dan aturan resmi Indonesia.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#layanan"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-xs transition active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Pilih layanan</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={handleOpenCashier}
                  className="px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 active:bg-slate-100 text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95 inline-flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Isi token dengan QRIS</span>
                </button>
              </div>
            </div>

            {/* Right Spec Box ("Ringkasan") */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Ringkasan
                </h3>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm space-y-3.5">
                  <div className="pt-2 flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Waktu pembuatan</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                      30 sampai 60 detik
                    </span>
                  </div>

                  <div className="pt-3.5 flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Format berkas</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                      .pptx, .docx, .xlsx, .pdf
                    </span>
                  </div>

                  <div className="pt-3.5 flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Akun dan saldo</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                      1 saldo untuk 9 layanan
                    </span>
                  </div>

                  <div className="pt-3.5 flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Pembayaran</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                      QRIS, otomatis tanpa admin
                    </span>
                  </div>

                  <div className="pt-3.5 flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Masa berlaku token</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                      Tidak kedaluwarsa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COBA CONTOH HASILNYA (slice_1.jpg, slice_2.jpg) */}
      <section id="coba-contoh" className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Coba contoh hasilnya
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5">
              Pilih jenis dokumen dan contoh topik, lalu lihat gambaran hasilnya.
            </p>
          </div>

          {/* Interactive Shell Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            {/* Horizontal Scrollable Tabs */}
            <div className="flex items-center overflow-x-auto border-b border-slate-200 dark:border-slate-800 px-4 pt-2 gap-2 scrollbar-none">
              {DEMO_SERVICES.map((s) => {
                const isActive = s.id === activeTabId;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleTabChange(s.id)}
                    className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition -mb-[1px] ${
                      isActive
                        ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {s.tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Split Screen Demo Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
              {/* Left Configuration Panel */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {currentDemo.serviceTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    {currentDemo.subdomain}
                  </p>
                </div>

                {/* Topic Radio Options */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2.5">
                    Pilih contoh topik
                  </label>
                  <div className="space-y-2.5">
                    {currentDemo.topics.map((t, idx) => {
                      const isSelected = idx === selectedTopicIndex;
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            setSelectedTopicIndex(idx);
                            setSimulationStatus('Belum dimulai.');
                          }}
                          className={`p-3.5 rounded-xl border text-sm cursor-pointer transition flex items-center gap-3 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-blue-950 dark:text-blue-200 font-semibold'
                              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 dark:border-slate-700'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{t.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Benefits Bullet Points */}
                <div className="pt-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                    Yang akan Anda dapat
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {currentDemo.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Simulation Status & Execution Buttons */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    {isSimulating && <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />}
                    <span>{simulationStatus}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={isSimulating}
                      onClick={handleSimulateGeneration}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-xs transition active:scale-95 disabled:opacity-50"
                    >
                      {isSimulating ? 'Sedang memproses...' : 'Buat contoh hasil'}
                    </button>

                    <a
                      href={currentDemo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-bold border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95 inline-flex items-center gap-1.5"
                    >
                      <span>Buka {currentDemo.tabLabel} BikinKilat</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Live Preview Excerpt Panel */}
              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-slate-50/50 dark:bg-slate-900/40">
                <div className="space-y-4">
                  {/* Excerpt Header */}
                  <div>
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                      {currentTopic.excerptTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {currentTopic.excerptSubtitle}
                    </p>
                  </div>

                  {/* Excerpt Blockquote */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs border-l-4 border-l-blue-600">
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                      {currentTopic.excerptQuote}
                    </p>
                  </div>

                  {/* Document Specs Grid */}
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Waktu buat</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">
                        {currentTopic.buildTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-500 dark:text-slate-400">Format</span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">
                        {currentTopic.format}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                      <span className="text-slate-500 dark:text-slate-400">
                        {currentTopic.detailLabel}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">
                        {currentTopic.detailValue}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Copy Excerpt Button */}
                <div>
                  <button
                    type="button"
                    onClick={handleCopyExcerpt}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95 inline-flex items-center gap-1.5"
                  >
                    {hasCopied ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Tersalin ke clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Salin petikan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 9 LAYANAN DOKUMEN (slice_2.jpg, slice_3.jpg, slice_4.jpg) */}
      <section id="layanan" className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              9 layanan dokumen
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5">
              Setiap layanan dibuat khusus untuk satu jenis dokumen, jadi hasilnya sudah sesuai
              formatnya.
            </p>
          </div>

          {/* Filter Pills & Live Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {['Semua', 'Akademik', 'Karier', 'Bisnis', 'Legal', 'Kreatif'].map((cat) => {
                const isSelected = serviceCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setServiceCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition active:scale-95 ${
                      isSelected
                        ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[220px] sm:min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari layanan (slide, rab, cv)..."
                className="w-full pl-9 pr-7 py-1.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3x3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((card) => (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {card.category}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {card.name}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5 mb-3">
                    {card.subdomain}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {card.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-6">
                    {card.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {card.costLabel}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono">
                      {card.formatLabel}
                    </span>
                  </div>

                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>{card.actionText}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MENGAPA BIKINKILAT (slice_4.jpg) */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Mengapa BikinKilat
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1.5">
              AI umum hanya memberi teks mentah yang masih harus Anda susun sendiri. BikinKilat
              langsung membuat berkas dokumen yang sudah rapi.
            </p>
          </div>

          {/* 4 Value Pillars (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Berkas asli, bisa diedit
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Anda mengunduh PowerPoint 16:9 dengan catatan pembicara, Word dengan daftar isi
                otomatis, atau Excel dengan rumus aktif. Bukan salin-tempel dari chat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Mengikuti aturan resmi
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Acuan yang dipakai: Permen PU-PR No. 8/2023, Kurikulum Merdeka Kemendikbudristek,
                KHI Inpres No. 1/1991, dan standar foto BKN untuk SSCASN.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Satu saldo, tanpa langganan
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Beli token sekali lewat QRIS, lalu pakai di semua layanan tanpa daftar ulang. Token
                tidak kedaluwarsa.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Data Anda tidak disimpan
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                Sesuai UU PDP No. 27/2022, isi dokumen dan foto dihapus segera setelah berkas
                berhasil diunduh dan tidak dipakai untuk melatih model AI publik. Koneksi dienkripsi
                TLS 1.3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CARA MENGGUNAKAN (slice_4.jpg, slice_5.jpg) */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Cara menggunakan
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Tiga langkah, tanpa keahlian teknis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Langkah 1</span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Pilih jenis dokumen
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Ada 9 layanan, dari slide sampai pasfoto. Satu akun dan satu saldo berlaku di semua
                layanan tanpa masuk ulang.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Langkah 2</span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Ketik topik atau unggah data
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Tulis topik presentasi, tujuan pembelajaran, riwayat kerja, atau nilai volume
                proyek dengan kalimat biasa. Sistem menyusunnya mengikuti tata naskah resmi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Langkah 3</span>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Unduh berkas
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Dalam 30 sampai 60 detik, berkas siap diunduh ke komputer atau HP Anda dan bisa
                diedit lagi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. DIBANDINGKAN CARA LAMA (slice_5.jpg) */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Dibandingkan cara lama
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-xs font-bold text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="py-4 px-6 w-1/4"></th>
                  <th className="py-4 px-6 w-3/8 text-slate-700 dark:text-slate-300">
                    Ketik sendiri atau jasa ketik
                  </th>
                  <th className="py-4 px-6 w-3/8 text-blue-600 dark:text-blue-400 font-extrabold">
                    BikinKilat
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                <tr>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Waktu</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    2 sampai 5 jam per berkas
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                    30 sampai 60 detik
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Biaya</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    Rp 50.000 sampai Rp 250.000 per pesanan
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                    1 sampai 3 token per dokumen, tergantung layanan
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Hasil</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400">
                    Sering berupa gambar atau PDF terkunci yang sulit diedit
                  </td>
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">
                    Berkas asli (.pptx, .docx, .xlsx, .pdf) yang bebas diedit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. HITUNG PENGHEMATAN ANDA (slice_5.jpg, slice_6.jpg) */}
      <section className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Hitung penghematan Anda
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Isi perkiraan kebutuhan Anda. Hasilnya langsung muncul.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Controls */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              {/* Profile Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Profil penggunaan
                </label>
                <select
                  value={calcProfile}
                  onChange={(e) => handleProfileChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition"
                >
                  <option value="umkm">Pekerja Lepas / UMKM</option>
                  <option value="student">Mahasiswa / Pelajar</option>
                  <option value="teacher">Guru / Pendidik</option>
                  <option value="pro">Profesional / Konsultan</option>
                  <option value="custom">Atur sendiri</option>
                </select>
              </div>

              {/* Weekly Hours Input & Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Waktu membuat dokumen per minggu (jam)
                  </label>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {hoursPerWeek} jam
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                  Isi antara 2 sampai 25 jam.
                </p>
                <input
                  type="range"
                  min={2}
                  max={25}
                  value={hoursPerWeek}
                  onChange={(e) => {
                    setHoursPerWeek(Number(e.target.value));
                    setCalcProfile('custom');
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-3"
                />
                <input
                  type="number"
                  min={2}
                  max={25}
                  value={hoursPerWeek}
                  onChange={(e) => {
                    setHoursPerWeek(Number(e.target.value));
                    setCalcProfile('custom');
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Manual Cost Input & Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Biaya jasa ketik atau desain per dokumen (Rp)
                  </label>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    {formatRupiah(costPerDoc)}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                  Isi antara Rp 30.000 sampai Rp 300.000.
                </p>
                <input
                  type="range"
                  min={30000}
                  max={300000}
                  step={5000}
                  value={costPerDoc}
                  onChange={(e) => {
                    setCostPerDoc(Number(e.target.value));
                    setCalcProfile('custom');
                  }}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 mb-3"
                />
                <input
                  type="number"
                  min={30000}
                  max={300000}
                  step={5000}
                  value={costPerDoc}
                  onChange={(e) => {
                    setCostPerDoc(Number(e.target.value));
                    setCalcProfile('custom');
                  }}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                Perkiraan: 1 dokumen sekitar 2,5 jam jika dikerjakan manual, dan sekitar Rp 2.500 di
                BikinKilat.
              </div>
            </div>

            {/* Calculated Results Panel (slice_6.jpg) */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Waktu yang dihemat per bulan
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
                    {calcResults.hoursSaved} jam
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    (sekitar {calcResults.workDaysSaved} hari kerja)
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Uang yang dihemat per bulan
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
                    {formatRupiah(calcResults.moneySaved)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    ({calcResults.percentSaved}%)
                  </span>
                </div>
              </div>

              <div className="space-y-1 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Perkiraan biaya di BikinKilat per bulan
                </span>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {formatRupiah(calcResults.monthlyBkCost)}
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenCashier}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-xs transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Coins className="w-4 h-4" />
                <span>Isi token</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. HARGA TOKEN (slice_6.jpg, slice_7.jpg) */}
      <section id="harga-token" className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Harga token
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Token yang Anda beli di sini otomatis terbaca di semua layanan.
            </p>
          </div>

          {/* 3 Tier Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Paket Pelajar */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xs">
              <div className="space-y-3">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Paket Pelajar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cukup untuk 5 tugas presentasi dan makalah lengkap.
                </p>

                <div className="pt-2">
                  <div className="text-xs text-slate-400 line-through">Rp 15.000</div>
                  <div className="text-3xl font-black text-slate-950 dark:text-white">
                    Rp 10.500
                  </div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">
                    10 token, hemat 30%
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Token masuk seketika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Berlaku permanen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Bisa dipakai di 9 layanan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Unduh berkas asli</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleOpenCashier}
                  className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95"
                >
                  Pilih 10 token
                </button>
              </div>
            </div>

            {/* Card 2: Paket Mahasiswa (Featured / Paling Populer) */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-600 flex flex-col justify-between shadow-md relative">
              <div className="space-y-3">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                  Paling populer
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Paket Mahasiswa
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cukup untuk presentasi kelompok, proposal, dan CV kerja.
                </p>

                <div className="pt-2">
                  <div className="text-xs text-slate-400 line-through">Rp 29.000</div>
                  <div className="text-3xl font-black text-slate-950 dark:text-white">
                    Rp 17.000
                  </div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">
                    25 token, hemat 41%
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Token masuk seketika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Berlaku permanen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Bisa dipakai di 9 layanan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Unduh berkas asli</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleOpenCashier}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-xs transition active:scale-95"
                >
                  Pilih 25 token
                </button>
              </div>
            </div>

            {/* Card 3: Paket Profesional */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xs">
              <div className="space-y-3">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Paket Profesional
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Untuk tim kerja, guru, dan konsultan.
                </p>

                <div className="pt-2">
                  <div className="text-xs text-slate-400 line-through">Rp 49.000</div>
                  <div className="text-3xl font-black text-slate-950 dark:text-white">
                    Rp 24.500
                  </div>
                  <div className="text-xs font-bold text-emerald-600 mt-0.5">
                    60 token, hemat 50%
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Token masuk seketika</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Berlaku permanen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Bisa dipakai di 9 layanan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                    <span>Unduh berkas asli</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleOpenCashier}
                  className="w-full py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95"
                >
                  Pilih 60 token
                </button>
              </div>
            </div>
          </div>

          {/* Custom Nominal Box (slice_7.jpg) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong className="text-slate-950 dark:text-white">Ingin nominal sendiri?</strong>{' '}
              Isi mulai dari Rp 10.000. Makin besar nominalnya, makin besar bonus token, sampai +50%.
            </p>
            <button
              type="button"
              onClick={handleOpenCashier}
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-900 dark:text-white text-xs font-bold border border-slate-200 dark:border-slate-800 shadow-2xs transition active:scale-95 shrink-0"
            >
              Atur nominal di kasir
            </button>
          </div>
        </div>
      </section>

      {/* 10. RIWAYAT TRANSAKSI (slice_7.jpg) */}
      <section id="riwayat" className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Riwayat transaksi
            </h2>
          </div>

          {user ? (
            <div className="max-w-4xl">
              <TransactionHistory lastUpdated={lastTxUpdated} />
            </div>
          ) : (
            <div className="space-y-4 max-w-xl">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Anda belum masuk. Masuk untuk melihat riwayat pembelian token. Pengguna baru mendapat
                5 token gratis.
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Saldo saat ini: {tokens} token.
              </div>
              <div>
                <button
                  type="button"
                  onClick={openAuthModal}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-xs transition active:scale-95"
                >
                  Masuk dan klaim 5 token
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 11. PERTANYAAN UMUM (FAQ) (slice_7.jpg, slice_8.jpg) */}
      <section id="pertanyaan" className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Pertanyaan umum
            </h2>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {/* FAQ 1 */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 0 ? null : 0)}
                className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 dark:text-white"
              >
                <span>Apakah token dari bikinkilat.web.id bisa dipakai di slide.bikinkilat.web.id?</span>
                <span className="text-slate-400 text-lg ml-4">
                  {openFaqIndex === 0 ? '—' : '+'}
                </span>
              </button>
              {openFaqIndex === 0 && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                  Bisa. BikinKilat memakai satu saldo token untuk semua layanan. Token dari kasir
                  otomatis terbaca di setiap layanan tanpa perlu masuk ulang.
                </p>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 1 ? null : 1)}
                className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 dark:text-white"
              >
                <span>Berkas apa saja yang bisa diunduh?</span>
                <span className="text-slate-400 text-lg ml-4">
                  {openFaqIndex === 1 ? '—' : '+'}
                </span>
              </button>
              {openFaqIndex === 1 && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                  PowerPoint (.pptx), Word (.docx), Excel (.xlsx), PDF, dan gambar pasfoto. Bukan
                  sekadar teks mentah dari chat.
                </p>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 2 ? null : 2)}
                className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 dark:text-white"
              >
                <span>Bagaimana jika pembayaran QRIS bermasalah?</span>
                <span className="text-slate-400 text-lg ml-4">
                  {openFaqIndex === 2 ? '—' : '+'}
                </span>
              </button>
              {openFaqIndex === 2 && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                  Pembayaran diproses otomatis 24 jam. Jika dalam 2 menit token belum masuk, cukup
                  hubungi dukungan kami lewat support@bikinkilat.web.id dengan menyertakan bukti
                  bayar.
                </p>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 3 ? null : 3)}
                className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 dark:text-white"
              >
                <span>Apakah dokumen saya aman dan tidak disebarluaskan?</span>
                <span className="text-slate-400 text-lg ml-4">
                  {openFaqIndex === 3 ? '—' : '+'}
                </span>
              </button>
              {openFaqIndex === 3 && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                  Seluruh data pengguna dilindungi sesuai standar UU PDP No. 27/2022. File yang dibuat
                  langsung dihapus secara berkala dari server setelah diunduh dan tidak digunakan
                  untuk melatih model kecerdasan buatan publik.
                </p>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenFaqIndex(openFaqIndex === 4 ? null : 4)}
                className="w-full flex items-center justify-between text-left font-bold text-base text-slate-900 dark:text-white"
              >
                <span>Bagaimana cara mendapatkan bonus 5 token gratis?</span>
                <span className="text-slate-400 text-lg ml-4">
                  {openFaqIndex === 4 ? '—' : '+'}
                </span>
              </button>
              {openFaqIndex === 4 && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                  Cukup buat akun baru atau masuk menggunakan email @gmail.com Anda. Bonus 5 token
                  gratis langsung aktif di saldo akun tanpa syarat kartu kredit.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 12. BUTUH BANTUAN? (slice_8.jpg) */}
      <section id="bantuan" className="py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Butuh bantuan?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Hubungi kami lewat salah satu kanal berikut.
            </p>
          </div>

          <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>
                <a
                  href="mailto:support@bikinkilat.web.id"
                  className="font-bold text-blue-600 dark:text-blue-400 underline underline-offset-4"
                >
                  support@bikinkilat.web.id
                </a>{' '}
                untuk bantuan cepat dan keluhan pembayaran
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>
                <a
                  href="https://discord.gg/bikinkilat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 dark:text-blue-400 underline underline-offset-4"
                >
                  Discord Server
                </a>{' '}
                untuk diskusi dan bantuan komunitas
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>
                <a
                  href="https://whatsapp.com/channel/bikinkilat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 dark:text-blue-400 underline underline-offset-4"
                >
                  Saluran WhatsApp
                </a>{' '}
                untuk pengumuman dan tips pemakaian
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
              <span>
                <Link
                  href="/kebijakan-pengembalian-dana"
                  className="font-bold text-blue-600 dark:text-blue-400 underline underline-offset-4"
                >
                  Kebijakan Pengembalian Dana
                </Link>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* 13. FOOTER (slice_8.jpg) */}
      <footer className="py-14 bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Col 1: Brand Info */}
            <div className="space-y-3">
              <div className="text-base font-extrabold text-slate-900 dark:text-white">
                BikinKilat
              </div>
              <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                Buat dokumen, makalah, presentasi, dan surat resmi Indonesia dengan cepat. Satu akun,
                satu saldo token.
              </p>
            </div>

            {/* Col 2: Layanan Populer */}
            <div className="space-y-2.5">
              <div className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Layanan populer
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://slide.bikinkilat.web.id"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Slide & Makalah
                  </a>
                </li>
                <li>
                  <a
                    href="https://modul.bikinkilat.web.id"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Modul Kurikulum Merdeka
                  </a>
                </li>
                <li>
                  <a
                    href="https://cv.bikinkilat.web.id"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    CV ATS Friendly & Lamaran
                  </a>
                </li>
                <li>
                  <a
                    href="https://rab.bikinkilat.web.id"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Kalkulator RAB Excel SNI
                  </a>
                </li>
                <li>
                  <a
                    href="https://surat.bikinkilat.web.id"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Surat & Kontrak Bisnis
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Legal & Kepatuhan */}
            <div className="space-y-2.5">
              <div className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Legal & kepatuhan
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/syarat-ketentuan"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Syarat & Ketentuan Layanan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kebijakan-privasi"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Kebijakan Privasi (UU PDP)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kebijakan-pengembalian-dana"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Kebijakan Pengembalian Dana
                  </Link>
                </li>
                <li>
                  <Link
                    href="/etika-akademik"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Integritas Akademik & Etika AI
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catatan-rilis"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Catatan Rilis Pembaruan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Media Sosial & Komunitas */}
            <div className="space-y-2.5">
              <div className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                Media sosial & komunitas
              </div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://tiktok.com/@bikinkilat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/bikinkilat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/bikinkilat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@bikinkilat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/bikinkilat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Discord Server
                  </a>
                </li>
                <li>
                  <a
                    href="https://whatsapp.com/channel/bikinkilat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-900 dark:hover:text-white transition"
                  >
                    Saluran WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
            <div>© 2026 BikinKilat.web.id. Seluruh hak cipta dilindungi undang-undang.</div>
            <div>Dibuat untuk pelajar, guru, dan profesional di Indonesia.</div>
          </div>
        </div>
      </footer>

      {/* Cashier Modal */}
      <CashierModal
        isOpen={isCashierOpen}
        onClose={() => setIsCashierOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
