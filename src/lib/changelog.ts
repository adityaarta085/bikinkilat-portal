export interface ChangeItem {
  type: 'added' | 'fixed' | 'improved';
  text: string;
}

export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  badge: string;
  badgeColor: 'indigo' | 'emerald' | 'amber' | 'sky';
  summary: string;
  impactedServices: { name: string; subdomain: string; url: string }[];
  categories: string[];
  changes: ChangeItem[];
  githubCommitUrl?: string;
}

export const RELEASES: ReleaseNote[] = [
  {
    version: 'v2.4.0',
    date: '22 Oktober 2026',
    title: 'Pembaruan PPTX Widescreen 16:9, Gestur Usap Mobile & Portal Catatan Rilis',
    badge: 'Rilis Terbaru',
    badgeColor: 'emerald',
    summary:
      'Penyempurnaan tuntas layout presentasi PowerPoint agar tidak terpotong di desktop maupun mobile, pratinjau mobile adaptif dengan gestur usap, dan peluncuran log pembaruan publik.',
    impactedServices: [
      { name: 'Slide & Makalah', subdomain: 'slide', url: 'https://slide.bikinkilat.web.id' },
      { name: 'Portal Ekosistem', subdomain: 'portal', url: 'https://bikinkilat.web.id' },
    ],
    categories: ['Slide', 'Mobile UX', 'Portal'],
    changes: [
      {
        type: 'fixed',
        text: 'Mengubah kanvas ekspor PPTX ke standar Widescreen 16:9 (LAYOUT_WIDE, 13.33 x 7.5 inci), menyelesaikan masalah judul dan garis aksen yang sebelumnya meluber keluar slide di Microsoft PowerPoint desktop.',
      },
      {
        type: 'fixed',
        text: 'Menambahkan properti shrinkText dan margin aman simetris (0.8 inci) pada cover dan slide materi, mencegah teks pemateri atau institusi terpotong di bagian bawah.',
      },
      {
        type: 'added',
        text: 'Menghadirkan Mode Kartu Baca Mobile pada pratinjau slide dengan tinggi adaptif, memastikan butir materi dan kartu Poin Kunci terbaca utuh tanpa terpotong.',
      },
      {
        type: 'added',
        text: 'Dukungan gestur sentuh (touch swipe left / right) di smartphone untuk berpindah slide secara alami layaknya aplikasi native.',
      },
      {
        type: 'added',
        text: 'Halaman publik Catatan Rilis (/catatan-rilis) dan API endpoint (/api/changelog) untuk transparansi setiap pembaruan sistem dan log GitHub.',
      },
      {
        type: 'improved',
        text: 'Slide 2 (Agenda) kini menampilkan 4 kartu proses bertahap (01 s/d 04) yang selaras antara tampilan web dan dokumen PPTX hasil unduhan.',
      },
    ],
    githubCommitUrl: 'https://github.com/adityaarta085/bikinkilat-slide/commit/9bc2cd1',
  },
  {
    version: 'v2.3.1',
    date: '22 Oktober 2026',
    title: 'Standarisasi Tema Gelap (Dark Mode), Otentikasi Langsung & Kontras UI',
    badge: 'Peningkatan Visual',
    badgeColor: 'indigo',
    summary:
      'Eliminasi seluruh inkonsistensi kontras tema gelap pada kartu dokumen, integrasi tautan login langsung /auth dengan cookie lintas-domain, dan tombol sentuh ramah jari jempol.',
    impactedServices: [
      { name: 'Portal Kasir', subdomain: 'portal', url: 'https://bikinkilat.web.id' },
      { name: 'RAB Konstruksi', subdomain: 'rab', url: 'https://rab.bikinkilat.web.id' },
      { name: 'Surat & Kontrak', subdomain: 'surat', url: 'https://surat.bikinkilat.web.id' },
      { name: 'Kalkulator Waris', subdomain: 'waris', url: 'https://waris.bikinkilat.web.id' },
      { name: 'Proposal Skripsi', subdomain: 'proposal', url: 'https://proposal.bikinkilat.web.id' },
      { name: 'Pas Foto SSCASN', subdomain: 'pasfoto', url: 'https://pasfoto.bikinkilat.web.id' },
    ],
    categories: ['Tema & Kontras', 'Otentikasi', 'Mobile UX'],
    changes: [
      {
        type: 'fixed',
        text: 'Memperbaiki benturan tema gelap pada 05-rab, 06-surat, 07-waris, dan 08-proposal yang sebelumnya menampilkan kartu putih silau di latar belakang gelap.',
      },
      {
        type: 'fixed',
        text: 'Mengganti tombol login modal di seluruh 9 subdomain menjadi tautan Next.js langsung ke /auth dengan cookie terpusat di domain .bikinkilat.web.id.',
      },
      {
        type: 'added',
        text: 'Tampilan tabel responsif menjadi kartu data vertikal otomatis pada rab.bikinkilat.web.id dan waris.bikinkilat.web.id saat dibuka di layar smartphone (< 640px).',
      },
      {
        type: 'improved',
        text: 'Standarisasi ukuran target sentuh tombol aksi utama minimum 40 hingga 44 pixel sesuai panduan aksesibilitas WCAG AA.',
      },
    ],
    githubCommitUrl: 'https://github.com/adityaarta085/bikinkilat-portal/commit/8625305',
  },
  {
    version: 'v2.3.0',
    date: '21 Oktober 2026',
    title: 'Arsitektur AI Multi-Model Berkecepatan Tinggi (Sub-2 Detik)',
    badge: 'Performa AI',
    badgeColor: 'sky',
    summary:
      'Integrasi mesin perutean AI Alibaba Model Studio dengan rotasi otomatis (Qwen 3.8, DeepSeek v4.1, GLM 5.3) dan cadangan multi-kunci OpenRouter tanpa jeda tunggu pemikiran.',
    impactedServices: [
      { name: 'Slide & Makalah', subdomain: 'slide', url: 'https://slide.bikinkilat.web.id' },
      { name: 'Modul Merdeka', subdomain: 'modul', url: 'https://modul.bikinkilat.web.id' },
      { name: 'CV ATS', subdomain: 'cv', url: 'https://cv.bikinkilat.web.id' },
      { name: 'RAB Konstruksi', subdomain: 'rab', url: 'https://rab.bikinkilat.web.id' },
      { name: 'Surat & Kontrak', subdomain: 'surat', url: 'https://surat.bikinkilat.web.id' },
      { name: 'Proposal Skripsi', subdomain: 'proposal', url: 'https://proposal.bikinkilat.web.id' },
    ],
    categories: ['AI Engine', 'Infrastruktur'],
    changes: [
      {
        type: 'added',
        text: 'Implementasi rotasi model bahasa cerdas pada endpoint /api/generate di 6 subdomain dokumen otomatis.',
      },
      {
        type: 'added',
        text: 'Fallback berantai 3 tingkat menggunakan OpenRouter API keys ketika layanan primer mengalami batas laju (rate limit).',
      },
      {
        type: 'improved',
        text: 'Konfigurasi non-thinking (enable_thinking: false) dan timeout 6.5 detik untuk memangkas latensi respon hingga di bawah 2 detik tanpa melanggar batas serverless Vercel.',
      },
    ],
    githubCommitUrl: 'https://github.com/adityaarta085/bikinkilat-slide/commit/cbc44e0',
  },
  {
    version: 'v2.2.0',
    date: '19 Oktober 2026',
    title: 'Sistem Dompet Token Terpadu & Pembayaran QRIS Otomatis',
    badge: 'Sistem Kasir',
    badgeColor: 'amber',
    summary:
      'Peluncuran dompet token lintas-subdomain berbasis Supabase terpusat dan kasir pembayaran QRIS instan otomatis.',
    impactedServices: [
      { name: 'Portal Ekosistem', subdomain: 'portal', url: 'https://bikinkilat.web.id' },
    ],
    categories: ['Portal', 'Dompet Token', 'Pembayaran'],
    changes: [
      {
        type: 'added',
        text: 'Sinkronisasi saldo token akun di seluruh 9 subdomain: isi token di portal utama, gunakan seketika di slide, modul, cv, maupun rab.',
      },
      {
        type: 'added',
        text: 'Simulasi kasir QRIS dinamis dan riwayat mutasi transaksi real-time pada dashboard pengguna.',
      },
      {
        type: 'improved',
        text: 'Sistem penyimpanan metadata dokumen tersimpan aman di database Supabase terpusat dengan enkripsi SSL/TLS.',
      },
    ],
    githubCommitUrl: 'https://github.com/adityaarta085/bikinkilat-portal',
  },
  {
    version: 'v2.1.0',
    date: '16 Oktober 2026',
    title: 'Peluncuran Ekosistem 9 Mikro-SaaS Otomasi Dokumen Indonesia',
    badge: 'Rilis Perdana',
    badgeColor: 'indigo',
    summary:
      'Perilisan perdana ekosistem BikinKilat.web.id dengan 9 layanan spesialis berstandar kurikulum, hukum, dan administrasi Indonesia.',
    impactedServices: [
      { name: 'Semua 9 Layanan', subdomain: 'portal', url: 'https://bikinkilat.web.id' },
    ],
    categories: ['Ekosistem', 'Peluncuran'],
    changes: [
      {
        type: 'added',
        text: 'Peluncuran 9 subdomain mikro-SaaS: slide, modul ajar, cv ats, rab sni, surat perjanjian, kalkulator waris, proposal skripsi, dan pas foto sscasn.',
      },
      {
        type: 'added',
        text: 'Ekspor dokumen format asli: PowerPoint (.pptx), Microsoft Word (.docx), Excel (.xlsx), dan PDF berstandar ATS.',
      },
    ],
    githubCommitUrl: 'https://github.com/adityaarta085/bikinkilat-portal',
  },
];
