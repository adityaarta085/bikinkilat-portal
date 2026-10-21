# PRD: 01-PORTAL-BIKINKILAT (`bikinkilat.web.id`)

## 1. Ikhtisar Produk
- **Nama Subdomain:** `bikinkilat.web.id`
- **Fungsi Utama:** Portal Utama Ekosistem, Showcase 9 Layanan, Single Sign-On (SSO), Dashboard Pengguna, dan Kasir Top-Up Token QRIS Terpusat.
- **Target Pengguna:** Seluruh pengguna aktif ekosistem BikinKilat (Pelajar, Mahasiswa, Guru, Freelancer, Kontraktor, UMKM).

## 2. Fitur Utama
1. **Pusat Navigasi Ekosistem (Ecosystem Hub):**
   - Kartu akses cepat menuju 8 subdomain lainnya dengan informasi token dan status layanan aktif.
2. **Kasir QRIS Terpadu (Unified Cashier):**
   - Integrasi Payment Gateway QRIS Dinamis (Midtrans/Tripay/Xendit) dengan verifikasi otomatis.
   - Pilihan paket: 10 Token (Rp 15.000), 25 Token (Rp 29.000), 60 Token (Rp 49.000).
   - Riwayat transaksi real-time dengan status (Pending, Success, Expired).
3. **Manajemen Akun & Dompet Token:**
   - Cek saldo token saat ini, riwayat pemakaian token di tiap subdomain (Audit Trail).
   - Pengaturan profil pengguna dan integrasi otentikasi Google OAuth / Magic Link.

## 3. Skema Data (Supabase)
- **Tabel Terkait:**
  - `users`: ID pengguna, email, nama, saldo token, tanggal registrasi.
  - `transactions`: ID transaksi, user_id, package_name, amount_idr, tokens_added, status, payment_method.
  - `token_usage_logs`: ID log, user_id, subdomain_source, tokens_deducted, project_id, timestamp.

## 4. Alur Bisnis (User Journey)
1. Pengguna mengunjungi `bikinkilat.web.id` -> Melihat seluruh katalog produk dan sisa token.
2. Pengguna klik "Top-Up Token" -> Memilih paket -> Muncul QRIS dinamis.
3. Pengguna memindai QRIS via GoPay/OVO/Dana/BCA/ShopeePay -> Webhook masuk -> Saldo token di database `users` bertambah seketika.
4. Pengguna langsung dapat meluncur ke subdomain pilihan (misal: `slide.bikinkilat.web.id`) dan saldo sudah sinkron.
