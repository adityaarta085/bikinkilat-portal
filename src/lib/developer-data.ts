export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'Aktivitas' | 'Proyek' | 'Sertifikat' | 'Sekolah';
  imageUrl: string;
  date?: string;
  isPinned?: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role?: string;
  message: string;
  avatar: string;
  createdAt: string;
  isPinned?: boolean;
}

export const SUPABASE_ASSETS = {
  avatarUrl: 'https://oonozobspxhvztoikakt.supabase.co/storage/v1/object/public/developer-assets/aditya-arta.jpg',
  secImageUrl: 'https://oonozobspxhvztoikakt.supabase.co/storage/v1/object/public/developer-assets/about-sec-image.jpeg',
  almamaterUrl: 'https://oonozobspxhvztoikakt.supabase.co/storage/v1/object/public/developer-assets/aditya-smk-almamater.jpg',
};

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Aditya Arta Putra - Founder & Solo Developer',
    description: 'Aditya Arta Putra, siswa 11 TJKT A SMK Muhammadiyah Bandongan saat memimpin arsitektur dan pengembangan ekosistem BikinKilat.web.id.',
    category: 'Aktivitas',
    imageUrl: SUPABASE_ASSETS.avatarUrl,
    date: '2026',
    isPinned: true,
  },
  {
    id: 'gal-2',
    title: 'Aditya Arta Putra - Almamater Resmi SMK Muhammadiyah Bandongan',
    description: 'Dokumentasi resmi siswa 11 TJKT A berseragam almamater kebanggaan SMK Muhammadiyah Bandongan.',
    category: 'Sekolah',
    imageUrl: SUPABASE_ASSETS.secImageUrl,
    date: '2026',
    isPinned: true,
  },
  {
    id: 'gal-3',
    title: 'Portal Resmi Desa Ngawonggo (ngawonggo.web.id)',
    description: 'Kepemimpinan arsitektur sistem informasi publik kemitraan Pemdes Ngawonggo & SMK Muhammadiyah Bandongan.',
    category: 'Proyek',
    imageUrl: SUPABASE_ASSETS.avatarUrl,
    date: '2026',
  },
  {
    id: 'gal-4',
    title: 'Kredensial & Penghargaan Arsitektur Sistem',
    description: 'Piagam kredensial resmi terverifikasi dan apresiasi inovasi teknologi web publik.',
    category: 'Sertifikat',
    imageUrl: SUPABASE_ASSETS.secImageUrl,
    date: '2025',
  },
  {
    id: 'gal-5',
    title: 'Pengembangan 9 Subdomain BikinKilat',
    description: 'Perancangan antarmuka cerdas dan integrasi pembayaran QRIS instan sub-2 detik.',
    category: 'Proyek',
    imageUrl: SUPABASE_ASSETS.avatarUrl,
    date: '2026',
  },
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Kepala Program TJKT',
    role: 'Guru Pembimbing SMK Muhammadiyah Bandongan',
    message: 'Karya nyata yang membanggakan sekolah. Terus kembangkan inovasi digital untuk kemaslahatan masyarakat!',
    avatar: '🎓',
    createdAt: '2026-10-20T10:00:00Z',
    isPinned: true,
  },
  {
    id: 'gb-2',
    name: 'Pemerintah Desa Ngawonggo',
    role: 'Mitra Kerjasama Pemdes Ngawonggo',
    message: 'Terima kasih atas dedikasi dan kepemimpinan sistem portal desa yang sangat andal dan memudahkan warga.',
    avatar: '🏛️',
    createdAt: '2026-10-18T14:30:00Z',
    isPinned: true,
  },
  {
    id: 'gb-3',
    name: 'Pengguna Setia BikinKilat',
    role: 'Mahasiswa Magelang',
    message: 'Bikin slide dan modul kilat banget cuma butuh beberapa detik. Semangat terus Mas Aditya!',
    avatar: '🚀',
    createdAt: '2026-10-22T08:15:00Z',
  },
];
