# Catatan Rilis & Log Pembaruan (Changelog) - BikinKilat.web.id

Semua pembaruan fitur, perbaikan bug, dan optimasi performa di seluruh ekosistem mikro-SaaS BikinKilat.web.id didokumentasikan di sini mengikuti standar [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan [Semantic Versioning](https://semver.org/).

Halaman publik interaktif dapat diakses langsung di: **[bikinkilat.web.id/catatan-rilis](https://bikinkilat.web.id/catatan-rilis)**

---

## [v2.4.0] - 2026-10-22
### Ditambahkan (Added)
- **Mode Kartu Baca Mobile di Slide Generator**: Menghadirkan layout kartu vertikal adaptif (`min-h-[440px] md:aspect-[16/9]`) pada pratinjau slide agar judul, butir materi, dan kartu *Poin Kunci* terbaca 100% utuh tanpa terpotong di layar ponsel.
- **Gestur Usap Layar Ponsel (Touch Swipe)**: Pengguna ponsel dapat langsung mengusap layar ke kiri (*swipe left*) untuk beralih ke slide berikutnya atau usap ke kanan (*swipe right*) untuk slide sebelumnya.
- **Halaman Log Pembaruan Publik**: Peluncuran halaman `/catatan-rilis` dan endpoint API `/api/changelog` untuk memantau pembaruan sistem dan riwayat komit GitHub secara transparan.
- **Saklar Pratinjau Mobile**: Tombol beralih instan `[📱 Kartu]` dan `[🖥️ 16:9]` pada toolbar pratinjau slide di ponsel.

### Diperbaiki (Fixed)
- **Eliminasi Kanvas PPTX Overflow**: Memperbaiki kanvas ekspor PPTX di `02-slide-bikinkilat` dari standar kaku lama `LAYOUT_16x9` ($10 \times 5.625\text{ inci}$) ke standar modern `LAYOUT_WIDE` ($13.333 \times 7.5\text{ inci}$). Menyelesaikan masalah judul dan garis aksen oranye yang meluber keluar batas slide di Microsoft PowerPoint.
- **Auto-Shrink Typography**: Menambahkan properti `shrinkText: true`, `wrap: true`, dan margin simetris ($0.8\text{ inci}$ kiri dan kanan) pada cover slide dan slide materi sehingga nama pemateri serta institusi tidak terpotong di bagian bawah.
- **Visual Sinkron Slide 2 (Agenda)**: Memperbaiki slide agenda agar menampilkan 4 kartu alur materi bertahap (`01` s/d `04`) yang identik antara pratinjau web dan file PPTX hasil unduhan.

---

## [v2.3.1] - 2026-10-22
### Diperbaiki (Fixed)
- **Standarisasi Kontras Tema Gelap**: Mengeliminasi benturan kartu putih silau di `05-rab`, `06-surat`, `07-waris`, `08-proposal`, dan `09-pasfoto`. Seluruh form input, modal, dan kartu pratinjau dokumen kini adaptif ke slate gelap dengan kontras WCAG AA.
- **Otentikasi Terpadu**: Mengganti modal login terisolasi di 9 subdomain menjadi navigasi Next.js langsung ke `/auth` dengan cookie sesi lintas-subdomain di domain induk `.bikinkilat.web.id`.

### Ditambahkan (Added)
- **Tabel Responsif Menjadi Kartu**: Tabel RAB anggaran biaya dan tabel rincian waris faraidh otomatis berganti format kartu vertikal di layar smartphone ($< 640\text{px}$).
- **Laci Ekosistem Terpadu**: Menu hamburger drawer terpasang di seluruh subdomain untuk mempermudah navigasi antar-layanan.

---

## [v2.3.0] - 2026-10-21
### Ditambahkan (Added)
- **Arsitektur Pembuatan Dokumen Cepat**: Integrasi mesin kecerdasan buatan multi-model dengan rotasi otomatis pada sistem generasi dokumen.
- **Sistem Cadangan Berlapis**: Perlindungan stabilitas bertingkat saat sistem mengalami lonjakan trafik permintaan.

### Ditingkatkan (Improved)
- **Pemangkasan Latensi**: Optimalisasi tanpa jeda waktu dan batasan respon ketat untuk mencapai waktu pembuatan dokumen di bawah 2 detik yang mulus dan stabil.

---

## [v2.2.0] - 2026-10-19
### Ditambahkan (Added)
- **Dompet Token Terpadu**: Sinkronisasi saldo akun pengguna di seluruh 9 subdomain melalui basis data cloud terpusat BikinKilat.
- **Kasir QRIS Otomatis**: Integrasi top-up token instan dan pencatatan riwayat transaksi real-time.

---

## [v2.1.0] - 2026-10-16
### Ditambahkan (Added)
- **Peluncuran 9 Layanan Dokumen Spesialis**: Slide PPTX & Makalah DOCX, Modul Merdeka, CV ATS, RAB SNI, Surat Perjanjian, Waris Faraidh, Proposal Skripsi, Pas Foto SSCASN, dan Portal Terpadu.
