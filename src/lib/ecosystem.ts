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
}

export const ECOSYSTEM_APPS: EcosystemApp[] = [
  {
    id: '01-portal',
    name: 'Portal Bikinkilat',
    subdomain: 'bikinkilat.web.id',
    url: 'https://bikinkilat.web.id',
    title: 'Pusat Ekosistem & Kasir Token Terpadu',
    tagline: 'Satu akun, satu dompet token terpusat untuk 9 layanan otomasi cerdas.',
    category: 'Bisnis',
    tokenCost: 0,
    outputFormats: ['Dashboard', 'QRIS'],
    status: 'live',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconName: 'LayoutGrid',
    features: ['Single Sign-On Terpusat', 'Top-up QRIS Instan', 'Audit Trail Transaksi']
  },
  {
    id: '02-slide',
    name: 'Slide BikinKilat',
    subdomain: 'slide.bikinkilat.web.id',
    url: 'https://slide.bikinkilat.web.id',
    title: 'Generator Presentasi PPTX & Makalah DOCX',
    tagline: 'Bantu susun draf slide presentasi 16:9 dan naskah makalah akademik terstruktur siap telaah.',
    category: 'Akademik',
    tokenCost: 2,
    outputFormats: ['.pptx', '.docx', '.md'],
    status: 'live',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconName: 'Presentation',
    features: ['Slide 16:9 Tema Modern', 'Kerangka Makalah Format Kampus', 'Contekan Tanya Jawab Sidang']
  },
  {
    id: '03-modul',
    name: 'Modul BikinKilat',
    subdomain: 'modul.bikinkilat.web.id',
    url: 'https://modul.bikinkilat.web.id',
    title: 'Modul Ajar Kurikulum Merdeka & Bank Soal',
    tagline: 'Otomasi RPP, modul ajar interaktif, rubrik asesmen, dan bank soal HOTS untuk guru hebat.',
    category: 'Akademik',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    iconName: 'BookOpen',
    features: ['Format Kurikulum Merdeka', 'Rubrik Asesmen Diagnostik', 'Kisi-kisi Soal HOTS']
  },
  {
    id: '04-cv',
    name: 'CV BikinKilat',
    subdomain: 'cv.bikinkilat.web.id',
    url: 'https://cv.bikinkilat.web.id',
    title: 'Generator Resume ATS & Surat Lamaran',
    tagline: 'Draf resume profesional berstruktur single-column ramah sistem ATS untuk persiapan melamar kerja.',
    category: 'Karier',
    tokenCost: 1,
    outputFormats: ['.pdf', '.docx'],
    status: 'live',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    iconName: 'FileText',
    features: ['Format Tata Letak Standar ATS', 'Surat Lamaran Bilingual', 'Ekspor PDF & DOCX']
  },
  {
    id: '05-rab',
    name: 'RAB BikinKilat',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    title: 'Kalkulator RAB Proyek, Renovasi & Event',
    tagline: 'Estimasi anggaran biaya material dan upah berdasarkan simulasi Analisis Harga Satuan Pekerjaan (AHSP).',
    category: 'Bisnis',
    tokenCost: 3,
    outputFormats: ['.xlsx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    iconName: 'Calculator',
    features: ['Simulasi Harga Satuan AHSP', 'Format Tabel Excel Otomatis', 'Ringkasan Alokasi Anggaran']
  },
  {
    id: '06-surat',
    name: 'Surat BikinKilat',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    title: 'Generator Perjanjian Kontrak & Somasi Hukum',
    tagline: 'Draf kerangka perjanjian kerja sama dan somasi bisnis mengacu tata format hukum lazim di Indonesia.',
    category: 'Legal',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    iconName: 'Scale',
    features: ['Draf Klausul Standar KUHPerdata', 'Format Penempatan E-Meterai', 'Draf Perjanjian & Somasi']
  },
  {
    id: '07-waris',
    name: 'Waris BikinKilat',
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    title: 'Kalkulator Faraidh Islam & Bagan Silsilah',
    tagline: 'Simulasi perhitungan waris Islam Faraidh mengacu ketentuan Kompilasi Hukum Islam (KHI).',
    category: 'Legal',
    tokenCost: 2,
    outputFormats: ['.pdf', '.png'],
    status: 'live',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    iconName: 'GitFork',
    features: ['Hitungan Porsi Dzawil Furudh', 'Diagram Silsilah Keluarga', 'Tabel Pembagian Harta Bersih']
  },
  {
    id: '08-proposal',
    name: 'Proposal BikinKilat',
    subdomain: 'proposal.bikinkilat.web.id',
    url: 'https://proposal.bikinkilat.web.id',
    title: 'Generator Proposal Sponsorship & KUR UMKM',
    tagline: 'Draf proposal bisnis dan sponsorship terstruktur dengan proyeksi finansial awal untuk akselerasi pengajuan.',
    category: 'Bisnis',
    tokenCost: 3,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    iconName: 'TrendingUp',
    features: ['Kerangka Proposal Usaha & KUR', 'Struktur Paket Sponsorship', 'Simulasi Proyeksi Laba Rugi']
  },
  {
    id: '09-pasfoto',
    name: 'PasFoto BikinKilat',
    subdomain: 'pasfoto.bikinkilat.web.id',
    url: 'https://pasfoto.bikinkilat.web.id',
    title: 'Studio Pas Foto CPNS, BUMN & Kedutaan',
    tagline: 'Ubah pakaian ke kemeja putih jas formal dan ganti latar merah/biru ukuran 2x3, 3x4, 4x6.',
    category: 'Kreatif',
    tokenCost: 1,
    outputFormats: ['.png', '.jpg', '.pdf'],
    status: 'live',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    iconName: 'Camera',
    features: ['Ganti Jas dan Dasi Otomatis', 'Latar Merah dan Biru Standar', 'Lembar Cetak Multi Ukuran']
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
