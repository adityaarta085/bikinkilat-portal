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
    tagline: 'Buat slide presentasi modern dan naskah makalah akademik siap sidang dalam hitungan detik.',
    category: 'Akademik',
    tokenCost: 2,
    outputFormats: ['.pptx', '.docx', '.md'],
    status: 'live',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconName: 'Presentation',
    features: ['Slide 16:9 Tema Modern', 'Makalah Format Standar Kampus', 'Contekan Tanya Jawab Sidang']
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
    tagline: 'Resume berstandar ATS internasional yang lolos filter sistem HRD perusahaan multinasional.',
    category: 'Karier',
    tokenCost: 1,
    outputFormats: ['.pdf', '.docx'],
    status: 'live',
    badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    iconName: 'FileText',
    features: ['Skor Lolos ATS 90+', 'Surat Lamaran Bilingual', 'Ekspor PDF Siap Kirim']
  },
  {
    id: '05-rab',
    name: 'RAB BikinKilat',
    subdomain: 'rab.bikinkilat.web.id',
    url: 'https://rab.bikinkilat.web.id',
    title: 'Kalkulator RAB Proyek, Renovasi & Event',
    tagline: 'Estimasi anggaran biaya material, upah tukang, dan timeline konstruksi berstandar SNI.',
    category: 'Bisnis',
    tokenCost: 3,
    outputFormats: ['.xlsx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    iconName: 'Calculator',
    features: ['Database Harga Satuan SNI', 'Format Tabel Excel Otomatis', 'Ringkasan Kurva S']
  },
  {
    id: '06-surat',
    name: 'Surat BikinKilat',
    subdomain: 'surat.bikinkilat.web.id',
    url: 'https://surat.bikinkilat.web.id',
    title: 'Generator Perjanjian Kontrak & Somasi Hukum',
    tagline: 'Dokumen legal terverifikasi pasal KUHPerdata, siap dibubuhi e-Meterai resmi Peruri.',
    category: 'Legal',
    tokenCost: 2,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    iconName: 'Scale',
    features: ['Klausul KUHPerdata Sah', 'Slot E-Meterai Standar', 'Draf Somasi & MoU']
  },
  {
    id: '07-waris',
    name: 'Waris BikinKilat',
    subdomain: 'waris.bikinkilat.web.id',
    url: 'https://waris.bikinkilat.web.id',
    title: 'Kalkulator Faraidh Islam & Bagan Silsilah',
    tagline: 'Perhitungan waris Islam sesuai Kompilasi Hukum Islam (KHI) dan fatwa ulama tanpa selisih.',
    category: 'Legal',
    tokenCost: 2,
    outputFormats: ['.pdf', '.png'],
    status: 'live',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    iconName: 'GitFork',
    features: ['Hitungan Dzawil Furudh Presisi', 'Diagram Silsilah Keluarga', 'Tabel Pembagian Harta Bersih']
  },
  {
    id: '08-proposal',
    name: 'Proposal BikinKilat',
    subdomain: 'proposal.bikinkilat.web.id',
    url: 'https://proposal.bikinkilat.web.id',
    title: 'Generator Proposal Sponsorship & KUR UMKM',
    tagline: 'Draf proposal bisnis profesional dengan proyeksi finansial untuk perbankan dan sponsor.',
    category: 'Bisnis',
    tokenCost: 3,
    outputFormats: ['.docx', '.pdf'],
    status: 'live',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    iconName: 'TrendingUp',
    features: ['Format Pengajuan KUR Bank', 'Paket Sponsorship Bertingkat', 'Proyeksi Laba Rugi 3 Tahun']
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
    price: 15000,
    pricePerToken: 1500,
    name: 'Paket Pelajar',
    label: 'Paket Pelajar',
    badge: 'Mulai Praktis',
    popular: false,
    desc: 'Cukup untuk 5 tugas presentasi dan makalah lengkap.'
  },
  {
    id: 'pkg-25',
    tokens: 25,
    price: 29000,
    pricePerToken: 1160,
    name: 'Paket Mahasiswa',
    label: 'Paket Mahasiswa',
    badge: 'Paling Populer',
    popular: true,
    desc: 'Cukup untuk presentasi kelompok, proposal, dan resume kerja.'
  },
  {
    id: 'pkg-60',
    tokens: 60,
    price: 49000,
    pricePerToken: 816,
    name: 'Paket Profesional',
    label: 'Paket Profesional',
    badge: 'Paling Hemat',
    popular: false,
    desc: 'Pilihan hemat untuk tim kerja, guru pengajar, dan konsultan.'
  }
];
