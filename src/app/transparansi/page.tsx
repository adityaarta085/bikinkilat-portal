'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Coins, 
  Cpu, 
  FileText, 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles, 
  ExternalLink,
  ChevronDown,
  Layers,
  Database,
  EyeOff
} from 'lucide-react';
import { DOCUMENT_COST_BREAKDOWN } from '@/lib/ecosystem';

const LIMITATION_MATRIX = [
  {
    service: 'Slide Presentasi & Makalah (slide.bikinkilat.web.id)',
    canDo: [
      'Menyusun kerangka slide 16:9 lengkap dengan naskah narasi presenter (speaker notes).',
      'Menyusun naskah makalah ilmiah berstandar margin 4-3-3-3, bab, sub-bab, dan daftar pustaka.',
      'Menyediakan contekan tanya jawab sidang berdasarkan metodologi riset.',
      'Editor interaktif penuh sebelum file .pptx dan .docx diunduh.',
    ],
    cannotDo: [
      'TIDAK menjamin kelulusan sidang jika pemakalah tidak menguasai isi materi penelitiannya.',
      'TIDAK menggantikan penelusuran pustaka primer di perpustakaan atau laboratorium.',
      'TIDAK membenarkan plagiarisme atau fabrikasi data eksperimen.',
    ],
  },
  {
    service: 'Modul Ajar Kurikulum Merdeka (modul.bikinkilat.web.id)',
    canDo: [
      'Merakit draf RPP, modul ajar tematik, dan rubrik asesmen diagnostik.',
      'Membuat kisi-kisi dan bank soal HOTS terstruktur dalam format Word/PDF.',
    ],
    cannotDo: [
      'TIDAK menggantikan observasi langsung guru terhadap kebutuhan diferensiasi murid di kelas.',
      'TIDAK menggantikan validasi kurikulum operasional satuan pendidikan (KOSP) sekolah setempat.',
    ],
  },
  {
    service: 'Resume & CV ATS Friendly (cv.bikinkilat.web.id)',
    canDo: [
      'Menata format single-column baku tanpa tabel rumit yang sering menggagalkan parser ATS.',
      'Menyusun draf surat lamaran pengantar bilingual (Indonesia & Inggris).',
    ],
    cannotDo: [
      'TIDAK menjamin skor ATS mutlak 90+ di semua software HRD karena tiap perusahaan memakai algoritma dan bobot filter kata kunci yang berbeda.',
      'TIDAK membenarkan pemalsuan portofolio, sertifikat, atau pengalaman kerja palsu.',
    ],
  },
  {
    service: 'Kalkulator RAB Proyek (rab.bikinkilat.web.id)',
    canDo: [
      'Menghasilkan lembar kerja Excel dengan formula volume x analisis satuan harga aktif.',
      'Menyusun struktur rincian anggaran material, upah kerja, dan ringkasan persentase biaya.',
    ],
    cannotDo: [
      'TIDAK menggantikan survei harga fisik di toko bangunan lokal atau penawaran subkontraktor aktual.',
      'TIDAK menggantikan perhitungan analisis beban struktur dari konsultan teknik sipil bersertifikasi.',
    ],
  },
  {
    service: 'Draf Perjanjian & Surat Bisnis (surat.bikinkilat.web.id)',
    canDo: [
      'Menyediakan draf kerangka perjanjian kerja sama, MoU, dan somasi mengacu format KUHPerdata umum.',
      'Menyediakan slot penempatan e-Meterai sesuai kaidah dokumen resmi.',
    ],
    cannotDo: [
      'TIDAK bertindak sebagai penasihat hukum resmi (advokat) atau pejabat pembuat akta (notaris).',
      'TIDAK disarankan digunakan secara mentah tanpa peninjauan ahli untuk transaksi properti atau merger korporasi berskala besar.',
    ],
  },
  {
    service: 'Simulasi Faraidh Waris Islam (waris.bikinkilat.web.id)',
    canDo: [
      'Menghitung simulasi porsi bagian ahli waris Dzawil Furudh sesuai Kompilasi Hukum Islam (KHI).',
      'Menampilkan diagram pohon silsilah keluarga dan tabel pembagian harta bersih.',
    ],
    cannotDo: [
      'TIDAK bertindak sebagai penetapan fatwa resmi Pengadilan Agama.',
      'TIDAK dapat menggantikan penetapan penetapan ahli waris sah (PAW) untuk pencairan aset perbankan atau peralihan sertifikat BPN.',
    ],
  },
];

const TRANSPARENCY_FAQS = [
  {
    q: '1. Mengapa BikinKilat memposisikan seluruh layanannya sebagai draf awal?',
    a: 'Karena kecerdasan buatan (AI) adalah rekan akselerator, bukan penentu kebenaran mutlak. AI sangat unggul dalam mengatasi sindrom kertas kosong (blank page syndrome), merapikan tata naskah, dan menata layout presentasi secara instan. Namun, substansi naskah hukum, keuangan, dan penelitian akademik tetap memerlukan verifikasi dan penalaran kritis dari manusia yang bertanggung jawab atas dokumen tersebut.',
  },
  {
    q: '2. Siapa yang memproses teks dokumen saya dan di mana?',
    a: 'Data naskah dokumen Anda diproses di peladen jaringan edge terenkripsi. Pemrosesan logika teks menggunakan antarmuka korporat (Enterprise API) dari penyedia model bahasa kelas dunia dengan klausul ketat Zero Data Training. Artinya, data teks Anda tidak pernah disimpan untuk melatih atau melatih ulang model AI publik.',
  },
  {
    q: '3. Berapa lama data saya disimpan di sistem BikinKilat?',
    a: 'Data akun profil dan saldo token disimpan selama akun Anda aktif. Catatan transaksi pembayaran QRIS disimpan maksimal 5 tahun sesuai regulasi akuntansi keuangan perbankan. Sementara itu, teks isi dokumen diproses secara ephemeral di memori RAM dan dibersihkan dalam waktu 1 jam. Berkas foto wajah di studio pasfoto langsung dihapus segera setelah berkas luaran diunduh (maksimal 24 jam).',
  },
  {
    q: '4. Bagaimana cara saya menghapus data atau menutup akun saya?',
    a: 'Anda memiliki hak penuh sesuai Bab IV UU PDP No. 27/2022. Anda dapat mengajukan penghapusan akun beserta seluruh catatan terkait dengan mengirim email ke privasi@bikinkilat.web.id atau menghubungi Petugas Pelindungan Data (DPO) melalui WhatsApp di +62 851-3643-6577. Permohonan diproses maksimal dalam 7 hari kerja.',
  },
  {
    q: '5. Apa yang terjadi jika AI menghasilkan informasi yang keliru (halusinasi)?',
    a: 'Model AI prediktif terkadang dapat memunculkan rujukan pustaka yang kurang tepat atau angka estimasi yang tidak sesuai wilayah Anda. Inilah mengapa BikinKilat menyediakan kanvas edit interaktif di browser: Anda dapat membaca, memeriksa, dan memperbaiki seluruh butir poin, naskah makalah, dan tabel sebelum mengunduh berkas finalnya.',
  },
  {
    q: '6. Kapan token saya dipotong dan bagaimana garansi penggantiannya?',
    a: 'Saldo token Anda HANYA dipotong saat Anda memutuskan untuk membuka kunci dan mengunduh berkas utuh (.pptx, .docx, .xlsx, .pdf). Pratinjau di layar selalu gratis. Jika terjadi eror server (misal error 500) atau file yang diunduh rusak, kami memberikan Garansi Saldo Token Bebas Risiko (Zero-Loss Guarantee) di mana saldo token Anda akan dikembalikan 100%.',
  },
  {
    q: '7. Bagaimana saya bisa berbicara dengan manusia jika mengalami kendala transaksi?',
    a: 'Kami tidak menyembunyikan kontak di balik chatbot AI. Anda dapat langsung terhubung dengan pendiri dan tim operasional kami melalui nomor WhatsApp resmi di +62 851-3643-6577 (Senin - Sabtu, 08.00 - 20.00 WIB) atau email di support@bikinkilat.web.id. Seluruh pengaduan transaksi diverifikasi dalam waktu maksimal 1x24 jam kerja.',
  },
];

export default function TransparencyPage() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Pusat Keterbukaan &amp; Kepatuhan UU PDP</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Prinsip Kejujuran Produk BikinKilat</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Pusat Transparansi, Privasi Data &amp; Keterbatasan Layanan
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            Banyak platform AI ingin terlihat sempurna tanpa cela. Di <strong>BikinKilat.web.id</strong>, kami memilih jalan yang berbeda: <em>membangun kepercayaan melalui bukti nyata dan keterbukaan tentang apa yang bisa maupun apa yang tidak bisa dilakukan oleh sistem kami</em>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Prinsip 1</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Draf, Bukan Opini Mutlak</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Semua luaran adalah bahan awal terstruktur yang wajib diverifikasi oleh manusia.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Prinsip 2</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Zero Data Training</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Dokumen Anda tidak pernah digunakan untuk melatih model kecerdasan buatan publik.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Prinsip 3</span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">Jaminan Token Utuh</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Jika proses rendering gagal atau berkas rusak, token Anda diganti 100% tanpa potongan.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: MATRIKS KEMAMPUAN VS KETERBATASAN */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Batasan Yang Jelas &amp; Terukur
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Matriks Kemampuan vs Keterbatasan Setiap Layanan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Ketahui secara persis apa saja batas fungsional dari masing-masing generator dokumen sebelum Anda menggunakannya.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {LIMITATION_MATRIX.map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm space-y-4"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{item.service}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                  {/* BISA DILAKUKAN */}
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Yang Bisa Dilakukan (Kelebihan):</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                      {item.canDo.map((cd, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold shrink-0">•</span>
                          <span>{cd}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TIDAK BISA DILAKUKAN */}
                  <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
                    <span className="font-extrabold text-rose-800 dark:text-rose-300 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Yang Tidak Bisa Dilakukan (Keterbatasan):</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                      {item.cannotDo.map((cnd, cnIdx) => (
                        <li key={cnIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold shrink-0">•</span>
                          <span>{cnd}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: ALUR DATA & SIKLUS RETENSI PRIVASI */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Keamanan Data &amp; Kedaulatan Privasi
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Bagan Siklus Hidup &amp; Retensi Data Pengguna
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Sesuai amanat UU Perlindungan Data Pribadi No. 27 Tahun 2022, berikut kepastian masa simpan setiap data di ekosistem BikinKilat:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 font-bold text-xs">
                1
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Data Profil &amp; Akun</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Nama, email, dan saldo token disimpan aman selama akun aktif. Dihapus permanen saat Anda mengajukan penutupan akun.
              </p>
              <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded inline-block">
                Selama Akun Aktif
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-bold text-xs">
                2
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Riwayat Transaksi QRIS</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Nominal pembayaran dan stempel waktu disimpan untuk kebutuhan audit pembukuan keuangan perbankan berizin Bank Indonesia.
              </p>
              <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded inline-block">
                Maksimal 5 Tahun
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 font-bold text-xs">
                3
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Naskah Dokumen &amp; Prompt</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Diproses secara ephemeral di memori RAM peladen untuk merakit file unduhan (.pptx, .docx, .xlsx) dan otomatis dimusnahkan.
              </p>
              <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded inline-block">
                Dibersihkan &lt; 1 Jam
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 font-bold text-xs">
                4
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Foto Wajah Studio</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Foto wajah yang diunggah diproses dalam ruang memori terisolasi dan dihapus segera setelah berkas pasfoto berhasil diunduh.
              </p>
              <span className="text-[10px] font-black uppercase text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded inline-block">
                Dihapus Instan / &lt; 24 Jam
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: TABEL TRANSPARANSI BIAYA TOKEN PER DOKUMEN */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Struktur Tarif Jujur
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Tabel Biaya Riil Rupiah Per Dokumen
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Berikut rincian konversi biaya rupiah untuk setiap layanan berdasarkan paket token yang Anda beli di halaman kasir:
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3 font-extrabold">Nama Layanan</th>
                  <th className="py-3 px-3 font-extrabold text-center">Token</th>
                  <th className="py-3 px-3 font-extrabold text-right">Paket Pelajar (Rp1.050)</th>
                  <th className="py-3 px-3 font-extrabold text-right text-indigo-600 dark:text-indigo-400">Paket Mhs (Rp680)</th>
                  <th className="py-3 px-3 font-extrabold text-right text-emerald-600 dark:text-emerald-400">Paket Pro (Rp408)</th>
                  <th className="py-3 px-3 font-extrabold">Catatan Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {DOCUMENT_COST_BREAKDOWN.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900 dark:text-white block">{doc.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{doc.subdomain}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono text-[11px]">
                        {doc.tokenCost}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                      Rp {doc.pelajarCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-indigo-700 dark:text-indigo-300">
                      Rp {doc.mahasiswaCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      Rp {doc.profesionalCost.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                      {doc.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 4: 7 FAQ KRITIS & JAWABAN TERBUKA */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Tanya Jawab Terbuka
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              7 Pertanyaan Kritis Mengenai Cara Kerja BikinKilat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Jawaban lugas dan langsung mengenai arsitektur, kepatuhan hukum, dan penanganan kesalahan.
            </p>
          </div>

          <div className="space-y-3">
            {TRANSPARENCY_FAQS.map((faq, fIdx) => {
              const isOpen = openFaqIdx === fIdx;
              return (
                <div
                  key={fIdx}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: IDENTITAS PENGELOLA & HUBUNGI MANUSIA */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Dukungan Langsung Manusia
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Butuh Bantuan? Hubungi Tim Pengembang Kami Langsung
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Platform BikinKilat.web.id dikembangkan dan dipelihara secara mandiri oleh <strong>Aditya Arta Putra</strong> (Magelang, Jawa Tengah) dengan arsitektur jaringan edge modern. Jika Anda menemukan kendala transaksi, galat dokumen, atau memiliki saran perbaikan, silakan hubungi kami:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <a
              href="https://wa.me/6285136436577?text=Halo%20Aditya%20BikinKilat,%20saya%20ingin%20bertanya%20tentang%20layanan%20BikinKilat"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-300 block uppercase font-bold tracking-wider">WhatsApp Customer Care</span>
                <span className="text-sm font-bold text-white block">+62 851-3643-6577</span>
                <span className="text-[10px] text-emerald-400">Senin - Sabtu, 08.00 - 20.00 WIB</span>
              </div>
            </a>

            <a
              href="mailto:support@bikinkilat.web.id"
              className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-300 block uppercase font-bold tracking-wider">Email Layanan Resmi</span>
                <span className="text-sm font-bold text-white block">support@bikinkilat.web.id</span>
                <span className="text-[10px] text-indigo-300">SLA Tanggapan &lt; 24 Jam Kerja</span>
              </div>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
