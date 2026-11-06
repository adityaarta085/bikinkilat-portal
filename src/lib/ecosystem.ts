export interface EcosystemApp {
  id: string;
  name: string;
  subdomain: string;
  url: string;
  title: string;
  tagline: string;
  category: 'Akademik' | 'Karier' | 'Bisnis' | 'Legal' | 'Kreatif';
  tokenCost: number;
  outputFormats: string[];
  status: 'live' | 'beta' | 'coming-soon';
  badgeColor: string;
  iconName: string;
  features: string[];
  targetAudience?: string;
  deliverableHighlight?: string;
  complianceStandard?: string;
  exampleUseCase?: string;
  turnaroundTime?: string;
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: '01-portal',
    name: 'Portal Bikinkilat',
    subdomain: 'bikinkilat.web.id',
    url: 'https://bikinkilat.web.id',
    title: 'Pusat Ekosistem & Kuota Harian',
    tagline: 'Satu akun terpusat dengan 20 alokasi kuota harian otomatis untuk seluruh 9 layanan otomasi cerdas.',
    category: 'Bisnis',
    tokenCost: 0,
    outputFormats: ['Dashboard', 'Akses Terbuka'],
    status: 'live',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800',
    iconName: 'LayoutGrid',
    features: ['Single Sign-On Google Terpadu', '20 Alokasi Kuota Harian Otomatis', 'Reset Terjadwal Tiap Pukul 00:00 WIB'],
    targetAudience: 'Seluruh Pengguna (Pelajar, Guru, Dosen, Profesional & UMKM)',
    deliverableHighlight: 'Kunci Akses Universal & Status Sinkronisasi Seluruh Layanan',
    complianceStandard: 'Autentikasi Terenkripsi & TLS 1.3',
    exampleUseCase: 'Kelola kuota, sinkronisasi sesi 9 subdomain, dan pantau status server',
    turnaroundTime: 'Instan'
  },
  {
    id: '02-slide',
    name: 'Slide BikinKilat',
    subdomain: 'slide.bikinkilat.web.id',
    url: 'https://slide.bikinkilat.web.id',
    title: 'Generator Presentasi PPTX 16:9 & Makalah DOCX',
    tagline: 'Susun draf slide presentasi widescreen 16:9 siap paparan, speaker notes pemateri, serta draf makalah DOCX berstruktur bab lengkap.',
    category: 'Akademik',
    tokenCost: 2,
    outputFormats: ['.pptx', '.docx', '.md'],
    status: 'live',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    iconName: 'Presentation',
    features: ['Slide Widescreen 16:9 Tema Modern', 'Kerangka Makalah DOCX Format Kampus', 'Speaker Notes & Contekan Tanya Jawab Sidang'],
    targetAudience: 'Mahasiswa, Dosen, Peneliti, Pembicara & Eksekutif Bisnis',
    deliverableHighlight: '10-15 Slide Lengkap + Speaker Notes + Makalah DOCX Pendamping',
    complianceStandard: 'Widescreen 16:9 + Sitasi APA/IEEE Ilmiah',
    exampleUseCase: 'Sidang skripsi, pitch deck bisnis investor, paparan kuliah tamu & webinar',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '03-modul',
    name: 'Modul BikinKilat',
    subdomain: 'modul.bikinkilat.web.id',
    url: 'https://modul.bikinkilat.web.id',
    title: 'Penyusun Modul Ajar Kurikulum Merdeka & Bank Soal',
    tagline: 'Otomasi penyusunan RPP 1 lembar, modul ajar interaktif fase A-F, lembar kerja siswa (LKPD), rubrik penilaian, dan soal evaluasi HOTS.',
    category: 'Akademik',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800',
    iconName: 'BookOpen',
    features: ['Standar Kurikulum Merdeka Kemendikbud', 'Rubrik Asesmen Diagnostik & Formatif', 'Kisi-kisi Soal Evaluasi HOTS Lengkap'],
    targetAudience: 'Guru PAUD, SD, SMP, SMA/SMK, Dosen & Pengajar Kursus',
    deliverableHighlight: 'Modul Ajar DOCX + Lembar Kerja Siswa (LKPD) + Format Penilaian',
    complianceStandard: 'Kepmendikbudristek No. 16/2022 & Taksonomi Bloom',
    exampleUseCase: 'RPP 1 lembar, modul tematik fase D, LKPD kontekstual & bank soal PAS/PAT',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '04-cv',
    name: 'CV BikinKilat',
    subdomain: 'cv.bikinkilat.web.id',
    url: 'https://cv.bikinkilat.web.id',
    title: 'Generator Resume Standar ATS & Surat Lamaran',
    tagline: 'Rancang resume tata letak single-column yang 100% ramah parser ATS HRD serta surat lamaran kerja terstruktur bilingual.',
    category: 'Karier',
    tokenCost: 1,
    outputFormats: ['.pdf', '.docx'],
    status: 'live',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800',
    iconName: 'FileText',
    features: ['Format Tata Letak Single-Column Standar ATS', 'Surat Lamaran Bilingual (Bahasa Indonesia & Inggris)', 'Ekspor File Asli PDF & DOCX Bebas Modifikasi'],
    targetAudience: 'Fresh Graduate, Jobseeker, Profesional Lintas Karier & Freelancer',
    deliverableHighlight: 'Resume Single-Column Standar ATS + Cover Letter Siap Seleksi HRD',
    complianceStandard: 'International ATS Parser 2026 (Single Column)',
    exampleUseCase: 'Seleksi MT BUMN, software engineer unicorn, posisi admin & korporasi multinasional',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '05-rab',
    name: 'RAB BikinKilat',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    title: 'Kalkulator RAB Proyek Konstruksi, Renovasi & Event',
    tagline: 'Estimasi anggaran biaya material dan upah tenaga kerja berdasarkan simulasi Analisis Harga Satuan Pekerjaan (AHSP) standar SNI.',
    category: 'Bisnis',
    tokenCost: 3,
    outputFormats: ['.xlsx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    iconName: 'Calculator',
    features: ['Simulasi Harga Satuan AHSP Standar SNI', 'Format Tabel Excel (.xlsx) Lengkap Rumus', 'Rekapitulasi Kebutuhan Material & Biaya Upah'],
    targetAudience: 'Kontraktor, Pemilik Rumah, Arsitek, Surveyor & Bendahara Panitia',
    deliverableHighlight: 'File Excel (.xlsx) dengan Rumus Otomatis + Rekap Anggaran PDF',
    complianceStandard: 'Standar Nasional Indonesia (SNI) & AHSP PUPR',
    exampleUseCase: 'Renovasi rumah 100m2, pembangunan ruko, tender pengadaan & anggaran event akbar',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '06-surat',
    name: 'Surat BikinKilat',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    title: 'Generator Perjanjian Kontrak & Somasi Hukum',
    tagline: 'Susun draf kerangka perjanjian kerja, surat sewa properti, MoU bisnis, dan somasi resmi mengacu tata regulasi KUHPerdata Indonesia.',
    category: 'Legal',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
    iconName: 'Scale',
    features: ['Klausul Hukum Mengacu KUHPerdata Indonesia', 'Tata Letak Format Penempatan E-Meterai Resmi', 'Draf Perjanjian Kerja, Sewa, Kerjasama & Somasi'],
    targetAudience: 'Pelaku Usaha, Pemilik Bisnis, Freelancer, Pemilik Aset & Klien Jasa',
    deliverableHighlight: 'Surat Perjanjian DOCX Rapi Siap Tanda Tangan & E-Meterai',
    complianceStandard: 'Kitab Undang-Undang Hukum Perdata (KUHPerdata)',
    exampleUseCase: 'Perjanjian kerja waktu tertentu (PKWT), sewa-menyewa ruko, MoU kemitraan & somasi',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '07-waris',
    name: 'Waris BikinKilat',
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    title: 'Kalkulator Faraidh Waris Islam & Bagan Silsilah',
    tagline: 'Hitung porsi waris dzawil furudh dan ashabah secara adil dan transparan berlandaskan Kompilasi Hukum Islam (KHI) dan fiqih mawaris.',
    category: 'Legal',
    tokenCost: 2,
    outputFormats: ['.pdf', '.png'],
    status: 'live',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800',
    iconName: 'GitFork',
    features: ['Perhitungan Porsi Akurat Sesuai Fiqih KHI RI', 'Diagram Visual Bagan Silsilah Ahli Waris Lengkap', 'Tabel Pembagian Harta Bersih Bebas Sengketa'],
    targetAudience: 'Keluarga Ahli Waris, Notaris Syariah, Penyuluh Agama & Praktisi Hukum',
    deliverableHighlight: 'Tabel Porsi Harta Bersih + Diagram Silsilah Keluarga Format PDF/PNG',
    complianceStandard: 'Kompilasi Hukum Islam (KHI) Buku II RI',
    exampleUseCase: 'Simulasi pembagian harta waris keluarga besar, kalkulasi rad, hajib & ashabah',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '08-proposal',
    name: 'Proposal BikinKilat',
    subdomain: 'proposal.bikinkilat.web.id',
    url: 'https://proposal.bikinkilat.web.id',
    title: 'Generator Proposal Usaha, Sponsorship & KUR UMKM',
    tagline: 'Rancang proposal bisnis meyakinkan untuk pengajuan permodalan perbankan (KUR), kemitraan investor, dan permohonan sponsor kegiatan.',
    category: 'Bisnis',
    tokenCost: 3,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    iconName: 'TrendingUp',
    features: ['Kerangka Business Plan & Pengajuan KUR Perbankan', 'Skema Paket Sponsorship & Kontraprestasi Mitra', 'Simulasi Proyeksi Finansial, Biaya & Arus Kas'],
    targetAudience: 'Pengusaha UMKM, Pendiri Usaha Rintisan, Panitia Acara & Komunitas',
    deliverableHighlight: 'Draf Proposal Lengkap DOCX + Ringkasan Eksekutif (One-Pager)',
    complianceStandard: 'Format Standar Perbankan KUR Mandiri/BRI/BNI',
    exampleUseCase: 'Pengajuan kredit usaha KUR Rp 50jt - 500jt, proposal sponsorship festival kampus',
    turnaroundTime: '< 2 Detik'
  },
  {
    id: '09-pasfoto',
    name: 'PasFoto BikinKilat',
    subdomain: 'pasfoto.bikinkilat.web.id',
    url: 'https://pasfoto.bikinkilat.web.id',
    title: 'Studio Pas Foto Formal CPNS, BUMN & Kedutaan',
    tagline: 'Ubah pakaian ke kemeja putih atau jas formal berdasi dan ganti latar belakang foto ke warna merah atau biru ukuran 2x3, 3x4, 4x6.',
    category: 'Kreatif',
    tokenCost: 1,
    outputFormats: ['.png', '.jpg', '.pdf'],
    status: 'live',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
    iconName: 'Camera',
    features: ['Ganti Jas Hitam, Kemeja Putih & Dasi Otomatis', 'Latar Merah & Biru Standar Instansi Pemerintah RI', 'Lembar Cetak Multi Ukuran (2x3, 3x4, 4x6) Siap Cetak'],
    targetAudience: 'Pelamar CPNS/PPPK, Calon Pegawai BUMN, Pendaftar Beasiswa & Paspor',
    deliverableHighlight: 'Pasfoto HD Siap Upload Portal SSCASN + Lembar Cetak Siap Print',
    complianceStandard: 'Standar Resmi SSCASN BKN RI (Format JPEG)',
    exampleUseCase: 'Foto pendaftaran CPNS/PPPK 2026, kartu ujian BUMN, paspor imigrasi & visa',
    turnaroundTime: '< 2 Detik'
  }
];

export const TOKEN_PACKAGES = [
  {
    id: 'pkg-10',
    tokens: 10,
    price: 10500,
    originalPrice: 15000,
    discountPercent: 30,
    discountBadge: 'Diskon 30%',
    pricePerToken: 1050,
    name: 'Paket Pelajar',
    label: 'Paket Pelajar',
    badge: 'Diskon 30%',
    popular: false,
    desc: 'Cukup untuk 5 tugas presentasi dan makalah lengkap (~Rp 1.050/token).'
  },
  {
    id: 'pkg-25',
    tokens: 25,
    price: 17000,
    originalPrice: 29000,
    discountPercent: 41,
    discountBadge: 'Diskon 41%',
    pricePerToken: 680,
    name: 'Paket Mahasiswa',
    label: 'Paket Mahasiswa',
    badge: 'Paling Populer',
    popular: true,
    desc: 'Cukup untuk tugas kelompok, proposal, dan resume kerja (~Rp 680/token).'
  },
  {
    id: 'pkg-60',
    tokens: 60,
    price: 24500,
    originalPrice: 49000,
    discountPercent: 50,
    discountBadge: 'Diskon 50%',
    pricePerToken: 408,
    name: 'Paket Profesional',
    label: 'Paket Profesional',
    badge: 'Diskon 50% 💎',
    popular: false,
    desc: 'Pilihan paling hemat untuk tim kerja, guru pengajar, dan konsultan (~Rp 408/token).'
  }
];

export interface DocumentCostItem {
  id: string;
  name: string;
  subdomain: string;
  tokenCost: number;
  outputFormats: string[];
  pelajarCost: number; // based on Rp1.050/token
  mahasiswaCost: number; // based on Rp680/token
  profesionalCost: number; // based on Rp408/token
  notes: string;
}

export const DOCUMENT_COST_BREAKDOWN: DocumentCostItem[] = [
  {
    id: '02-slide',
    name: 'Slide Presentasi PPTX & Makalah DOCX',
    subdomain: 'slide.bikinkilat.web.id',
    tokenCost: 2,
    outputFormats: ['.pptx', '.docx', '.md'],
    pelajarCost: 2100,
    mahasiswaCost: 1360,
    profesionalCost: 816,
    notes: 'Termasuk file presentasi widescreen 16:9, speaker notes, dan naskah makalah.',
  },
  {
    id: '03-modul',
    name: 'Modul Ajar Kurikulum Merdeka & Soal',
    subdomain: 'modul.bikinkilat.web.id',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    pelajarCost: 2100,
    mahasiswaCost: 1360,
    profesionalCost: 816,
    notes: 'Rancangan RPP, modul ajar, rubrik asesmen diagnostik, dan kisi-kisi soal.',
  },
  {
    id: '04-cv',
    name: 'Resume Standar ATS & Surat Lamaran',
    subdomain: 'cv.bikinkilat.web.id',
    tokenCost: 1,
    outputFormats: ['.pdf', '.docx'],
    pelajarCost: 1050,
    mahasiswaCost: 680,
    profesionalCost: 408,
    notes: 'Resume single-column ramah parser ATS beserta surat lamaran pengantar.',
  },
  {
    id: '05-rab',
    name: 'Kalkulator RAB Proyek Konstruksi/Renovasi',
    subdomain: 'rab.bikinkilat.web.id',
    tokenCost: 3,
    outputFormats: ['.xlsx', '.pdf'],
    pelajarCost: 3150,
    mahasiswaCost: 2040,
    profesionalCost: 1224,
    notes: 'Workbook Excel dengan formula hitung volume x analisa harga satuan aktif.',
  },
  {
    id: '06-surat',
    name: 'Draf Perjanjian Kontrak & Somasi Hukum',
    subdomain: 'surat.bikinkilat.web.id',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    pelajarCost: 2100,
    mahasiswaCost: 1360,
    profesionalCost: 816,
    notes: 'Draf kerangka perjanjian bisnis terstruktur siap telaah oleh penasihat hukum.',
  },
  {
    id: '07-waris',
    name: 'Simulasi Faraidh Waris & Silsilah',
    subdomain: 'waris.bikinkilat.web.id',
    tokenCost: 2,
    outputFormats: ['.pdf', '.png'],
    pelajarCost: 2100,
    mahasiswaCost: 1360,
    profesionalCost: 816,
    notes: 'Tabel simulasi bagian ahli waris berdasarkan Kompilasi Hukum Islam (KHI).',
  },
  {
    id: '08-proposal',
    name: 'Draf Proposal Usaha / KUR & Sponsor',
    subdomain: 'proposal.bikinkilat.web.id',
    tokenCost: 3,
    outputFormats: ['.docx', '.pdf'],
    pelajarCost: 3150,
    mahasiswaCost: 2040,
    profesionalCost: 1224,
    notes: 'Struktur proposal bisnis lengkap dengan simulasi proyeksi finansial.',
  },
  {
    id: '09-pasfoto',
    name: 'Studio Pas Foto Formal CPNS/Kedutaan',
    subdomain: 'pasfoto.bikinkilat.web.id',
    tokenCost: 1,
    outputFormats: ['.png', '.jpg', '.pdf'],
    pelajarCost: 1050,
    mahasiswaCost: 680,
    profesionalCost: 408,
    notes: 'Foto formal pakaian kemeja jas dan opsi latar merah/biru ukuran resmi.',
  },
  {
    id: 'wm-slide',
    name: 'Hapus Watermark PPT (slide.bikinkilat)',
    subdomain: 'slide.bikinkilat.web.id',
    tokenCost: 1,
    outputFormats: ['.pptx'],
    pelajarCost: 1050,
    mahasiswaCost: 680,
    profesionalCost: 408,
    notes: 'Menghapus teks watermark bikinkilat.web.id dari seluruh slide dan file PPTX.',
  },
];

export interface CustomTokenCalculation {
  amount: number;
  baseTokens: number;
  bonusTokens: number;
  totalTokens: number;
  bonusPercent: number;
  tierLabel: string;
  effectivePricePerToken: number;
  nextTierAmount: number | null;
  nextTierBonusPercent: number;
  diffToNextTier: number;
  isValid: boolean;
  minAmount: number;
}

export const MIN_CUSTOM_TOPUP = 10000;

export const CUSTOM_PRESETS = [
  { amount: 10000, label: 'Rp 10.000', tokens: 10 },
  { amount: 20000, label: 'Rp 20.000', tokens: 20 },
  { amount: 25000, label: 'Rp 25.000', tokens: 26, badge: 'Bonus +1' },
  { amount: 50000, label: 'Rp 50.000', tokens: 58, badge: 'Populer +8' },
  { amount: 100000, label: 'Rp 100.000', tokens: 133, badge: 'Hemat +33' },
  { amount: 250000, label: 'Rp 250.000', tokens: 375, badge: 'Sultan +125' },
];

export function calculateCustomTokens(rawAmount: number): CustomTokenCalculation {
  const amount = Math.max(0, Math.floor(rawAmount || 0));
  const isValid = amount >= MIN_CUSTOM_TOPUP;
  const baseTokens = Math.floor(amount / 1000);

  let bonusPercent = 0;
  let tierLabel = 'Standar';
  let nextTierAmount: number | null = null;
  let nextTierBonusPercent = 0;

  if (amount >= 250000) {
    bonusPercent = 50;
    tierLabel = 'Tier Sultan (+50% Bonus Token)';
    nextTierAmount = null;
    nextTierBonusPercent = 0;
  } else if (amount >= 100000) {
    bonusPercent = 33;
    tierLabel = 'Tier Prioritas (+33% Bonus Token)';
    nextTierAmount = 250000;
    nextTierBonusPercent = 50;
  } else if (amount >= 50000) {
    bonusPercent = 16;
    tierLabel = 'Tier Populer (+16% Bonus Token)';
    nextTierAmount = 100000;
    nextTierBonusPercent = 33;
  } else if (amount >= 25000) {
    bonusPercent = 5;
    tierLabel = 'Tier Hemat (+5% Bonus Token)';
    nextTierAmount = 50000;
    nextTierBonusPercent = 16;
  } else {
    bonusPercent = 0;
    tierLabel = 'Tier Standar (Rp 1.000 / Token)';
    nextTierAmount = 25000;
    nextTierBonusPercent = 5;
  }

  const bonusTokens = Math.floor((baseTokens * bonusPercent) / 100);
  const totalTokens = baseTokens + bonusTokens;
  const effectivePricePerToken = totalTokens > 0 ? Math.round(amount / totalTokens) : 1000;
  const diffToNextTier = nextTierAmount ? Math.max(0, nextTierAmount - amount) : 0;

  return {
    amount,
    baseTokens,
    bonusTokens,
    totalTokens,
    bonusPercent,
    tierLabel,
    effectivePricePerToken,
    nextTierAmount,
    nextTierBonusPercent,
    diffToNextTier,
    isValid,
    minAmount: MIN_CUSTOM_TOPUP,
  };
}
