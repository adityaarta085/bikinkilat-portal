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
    version: 'v2.5.0',
    date: '22 Oktober 2026',
    title: 'Top-Up Token Nominal Bebas (Custom Min. Rp 10.000) & Kalkulator Bonus Fleksibel',
    badge: 'Rilis Terbaru',
    badgeColor: 'emerald',
    summary:
      'Penambahan fitur isi ulang nominal bebas fleksibel mulai Rp 10.000 dengan kalkulator bonus transparan bertingkat hingga +50% ekstra token, terintegrasi ke kasir terpusat dan seluruh subdomain.',
    impactedServices: [
      { name: 'Portal Ekosistem & Kasir', subdomain: 'portal', url: 'https://bikinkilat.web.id/kasir' },
      { name: 'Seluruh 9 Subdomain', subdomain: 'portal', url: 'https://bikinkilat.web.id/#layanan' },
    ],
    categories: ['Kasir & Top-Up', 'Mobile UX', 'Ekosistem'],
    changes: [
      {
        type: 'added',
        text: 'Menghadirkan fitur Top-Up Nominal Bebas di halaman kasir resmi (/kasir), memungkinkan pengguna memasukkan nominal berapapun dengan batas minimal terjangkau Rp 10.000.',
      },
      {
        type: 'added',
        text: 'Kalkulator bonus token dinamis: bonus +5% untuk nominal >= Rp 25.000, +16% untuk >= Rp 50.000, +33% untuk >= Rp 100.000, dan +50% untuk >= Rp 250.000.',
      },
      {
        type: 'added',
        text: 'Pintasan chip pilihan cepat (Rp 10.000, Rp 20.000, Rp 25.000, Rp 50.000, Rp 100.000, Rp 250.000) serta tombol tambah cepat (+Rp 10.000, +Rp 25.000, +Rp 50.000) untuk kecepatan transaksi di ponsel.',
      },
      {
        type: 'added',
        text: 'Tautan langsung ke Kasir Nominal Bebas di jendela TopUpModal pada seluruh 8 subdomain generator dokumen.',
      },
      {
        type: 'fixed',
        text: 'Pembersihan tuntas istilah teknis vendor internal di seluruh antarmuka publik dan modal pembayaran untuk pengalaman pengguna yang ramah dan profesional.',
      },
      {
        type: 'fixed',
        text: 'Penguatan proteksi kasir: tamu tanpa autentikasi wajib masuk akun terlebih dahulu sebelum menghasilkan kode QRIS, mencegah token bocor atau tidak tersimpan.',
      },
    ],
  },
  {
    version: 'v2.4.0',
    date: '22 Oktober 2026',
    title: 'Pembaruan PPTX Widescreen 16:9, Gestur Usap Mobile & Portal Catatan Rilis',
    badge: 'Stabil',
    badgeColor: 'indigo',
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
    title: 'Arsitektur Kecerdasan Buatan Multi-Model Berkecepatan Tinggi (Sub-2 Detik)',
    badge: 'Performa Sistem',
    badgeColor: 'sky',
    summary:
      'Integrasi mesin kecerdasan dokumen multi-model dengan sistem perutean otomatis berkecepatan tinggi dan sistem cadangan mandiri tanpa jeda waktu.',
    impactedServices: [
      { name: 'Slide & Makalah', subdomain: 'slide', url: 'https://slide.bikinkilat.web.id' },
      { name: 'Modul Merdeka', subdomain: 'modul', url: 'https://modul.bikinkilat.web.id' },
      { name: 'CV ATS', subdomain: 'cv', url: 'https://cv.bikinkilat.web.id' },
      { name: 'RAB Konstruksi', subdomain: 'rab', url: 'https://rab.bikinkilat.web.id' },
      { name: 'Surat & Kontrak', subdomain: 'surat', url: 'https://surat.bikinkilat.web.id' },
      { name: 'Proposal Skripsi', subdomain: 'proposal', url: 'https://proposal.bikinkilat.web.id' },
    ],
    categories: ['Mesin Dokumen', 'Performa'],
    changes: [
      {
        type: 'added',
        text: 'Implementasi rotasi model cerdas otomatis pada pembuatan dokumen di 6 studio dokumen BikinKilat.',
      },
      {
        type: 'added',
        text: 'Sistem cadangan berlapis otomatis untuk menjamin proses pembuatan dokumen tetap lancar saat trafik tinggi.',
      },
      {
        type: 'improved',
        text: 'Optimalisasi respons cepat dengan batasan respon ketat untuk memangkas waktu tunggu pembuatan dokumen hingga di bawah 2 detik.',
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
      'Peluncuran dompet token lintas-subdomain berbasis komputasi awan terpusat dan kasir pembayaran QRIS instan resmi.',
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
        text: 'Kasir QRIS dinamis dan riwayat mutasi transaksi real-time pada dashboard pengguna.',
      },
      {
        type: 'improved',
        text: 'Sistem penyimpanan metadata dokumen tersimpan aman di basis data akun terenkripsi BikinKilat dengan proteksi SSL/TLS.',
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
