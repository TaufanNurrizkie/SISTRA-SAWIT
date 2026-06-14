# SISTRA-SAWIT — Product Requirements Document v1.0

**Sistem Informasi Transparansi Hasil Panen Kelapa Sawit**

---

| Field | Detail |
|---|---|
| **Nama Produk** | SISTRA-SAWIT |
| **Versi Dokumen** | v1.0 |
| **Status** | Draft — Untuk Review Tim Pengembang |
| **Platform** | Web Application (React.js + Tailwind CSS) |
| **Database** | MySQL |
| **Target Pengguna** | Pemilik Kebun, Pekerja Kebun, Petugas RAM |
| **Tanggal** | 2024 |

---

## 1. Ringkasan Eksekutif

SISTRA-SAWIT adalah platform berbasis web yang dirancang untuk menyelesaikan masalah ketidaksesuaian data antara laporan pekerja lapangan dengan hasil penimbangan aktual di RAM (pabrik pengolahan kelapa sawit). Sistem ini menjamin transparansi dan akuntabilitas di seluruh rantai pengiriman hasil panen sawit.

### 1.1 Latar Belakang

Industri perkebunan kelapa sawit skala kecil-menengah menghadapi tantangan serius dalam pengelolaan data produksi:

- **Selisih Data** — Laporan pekerja tidak cocok dengan timbangan RAM, merugikan pemilik kebun.
- **Manipulasi Nota** — Petugas RAM diintervensi pihak lain untuk mengubah data nota fisik.
- **Tidak Ada Bukti** — Tidak ada sistem dokumentasi yang andal untuk verifikasi data panen.

### 1.2 Tujuan Produk

- Menyediakan sistem pencatatan hasil panen yang transparan dan akuntabel.
- Mengeliminasi praktik manipulasi data dengan bukti foto nota otentik.
- Memberikan pemilik kebun akses real-time terhadap data produksi.
- Meminimalisir selisih data antara laporan lapangan dan hasil timbangan RAM.

### 1.3 Pernyataan Visi

> *"Menjadikan setiap kilogram hasil panen kelapa sawit dapat dipertanggungjawabkan secara digital, transparan, dan tidak dapat dimanipulasi."*

---

## 2. Tujuan dan Sasaran Produk

### 2.1 Tujuan Bisnis

| # | Tujuan Bisnis | Indikator Keberhasilan |
|---|---|---|
| B01 | Mengurangi selisih data antara laporan pekerja dan RAM hingga 0% | Selisih data = 0 setelah sistem diterapkan |
| B02 | Meningkatkan kepercayaan pemilik kebun terhadap data produksi | Pemilik tidak perlu verifikasi manual |
| B03 | Mempersingkat waktu rekap laporan harian pemilik kebun | Rekap tersedia < 5 menit setelah pengiriman selesai |
| B04 | Menghilangkan peluang manipulasi nota timbangan | Bukti foto diunggah langsung oleh Petugas RAM |

### 2.2 Sasaran Pengguna (OKR)

**Objective 1: Pemilik kebun mendapatkan data panen yang valid dan real-time.**
- KR1: 100% laporan pengiriman dilengkapi foto nota sebelum dianggap selesai.
- KR2: Dashboard tersedia dalam < 3 detik setelah Petugas RAM upload nota.
- KR3: Tidak ada laporan yang dapat diubah setelah status 'Selesai'.

**Objective 2: Pekerja kebun dapat melapor dengan cepat dan mudah dari lapangan.**
- KR1: Form input keberangkatan dapat diselesaikan dalam < 2 menit.
- KR2: Sistem dapat diakses dengan koneksi 3G (minimal).

**Objective 3: Petugas RAM dapat mengunggah bukti nota tanpa hambatan.**
- KR1: Upload foto nota berhasil dalam < 30 detik pada koneksi 3G.
- KR2: Sistem menampilkan pesan error yang jelas jika upload gagal.

---

## 3. Pengguna dan Persona

### Persona 1 — Pemilik Kebun

- **Nama:** Ibu Irdawati, 50 tahun
- **Pain:** Sering terjadi selisih antara laporan pekerja dan hasil timbang dari RAM. Sulit memastikan kebenaran data tanpa hadir langsung di lokasi.
- **Gain:** Mendapatkan data panen yang transparan, akurat, dan real-time langsung dari sumber tanpa harus berada di lokasi.
- **Fitur Utama:** Dashboard monitoring · Komparasi data visual · Filter riwayat · Kelola mobil & lahan

### Persona 2 — Pekerja Kebun

- **Nama:** Pak Untung, 47 tahun
- **Pain:** Sering dituduh curang jika ada selisih berat, padahal bisa karena kesalahan tulis manual. Proses pelaporan lama dan tidak ada bukti digital.
- **Gain:** Proses pelaporan simpel, cepat, dan bisa membuktikan kejujuran melalui sistem digital tanpa tuduhan.
- **Fitur Utama:** Input keberangkatan · Pilih mobil & lahan · Input berat netto · Lihat status pengiriman

### Persona 3 — Petugas RAM

- **Nama:** Dafi Afriza, 23 tahun
- **Pain:** Sering diintervensi oleh pekerja untuk mengubah data nota fisik demi keuntungan pribadi. Tidak ada mekanisme perlindungan data.
- **Gain:** Sistem yang memungkinkan upload bukti langsung dari kamera agar data tidak bisa dimanipulasi pihak lain.
- **Fitur Utama:** Cari data mobil by plat · Upload foto nota (kamera/galeri) · Konfirmasi selesai

---

## 4. Fitur dan Kebutuhan Produk

### 4.1 Prioritas Fitur (MoSCoW)

| Must Have | Should Have | Could Have | Won't Have (v1.0) |
|---|---|---|---|
| F01: Registrasi Akun | F12: Filter Riwayat | Notifikasi Push | API integrasi RAM otomatis |
| F02: Login | F13: CRUD Data Mobil | Export laporan PDF | Mode offline (PWA) |
| F03: Hak Akses Role | F14: CRUD Blok Lahan | Log aktivitas pengguna | Prediksi panen berbasis AI |
| F04: Input Keberangkatan | F15: Logout Aman | | Enkripsi end-to-end lanjutan |
| F05: Tracking Status | F17: Error Handling | | |
| F06: Timestamp Otomatis | | | |
| F07: Input Berat Netto | | | |
| F08: Upload Foto Nota | | | |
| F09: Validasi Input | | | |
| F10: Dashboard Harian | | | |
| F11: Komparasi Data | | | |
| F16: Tampilan Side-by-Side | | | |

### 4.2 Deskripsi Fitur Detail

#### 4.2.1 Autentikasi & Manajemen Akses (F01–F03, F15)

| Kode | Deskripsi Fitur | Acceptance Criteria |
|---|---|---|
| F01 | Registrasi akun dengan pilihan Email atau Nomor HP. Pengguna memilih role: Pemilik Kebun, Pekerja Kebun, atau Petugas RAM. Verifikasi melalui link email atau OTP SMS. | • Form tervalidasi sebelum submit • Role tersimpan di database • Redirect ke login setelah berhasil |
| F02 | Login menggunakan Email/HP dan password. Sistem mendeteksi role dan mengarahkan ke dashboard yang sesuai. | • Token sesi dibuat setelah login • Redirect otomatis sesuai role • Pesan error jelas jika gagal |
| F03 | Hak akses berbasis role. Pemilik: akses penuh. Pekerja: input & lihat status. Petugas RAM: upload nota & cari mobil. | • Route terlindungi per role • Akses unauthorized ditolak dengan 403 • Menu disesuaikan per role |
| F15 | Tombol logout di semua halaman. Setelah logout, sesi dihapus dan token tidak bisa digunakan kembali. | • Sesi dihapus dari server • Redirect ke halaman login • Token tidak valid setelah logout |

#### 4.2.2 Alur Pengiriman Panen (F04–F09)

| Step | Kode | Deskripsi | Acceptance Criteria |
|---|---|---|---|
| 1 | F04 | Pekerja memilih nomor plat mobil dari daftar terdaftar, memilih blok lahan asal, lalu konfirmasi keberangkatan. | • Mobil dipilih dari dropdown • Lahan dipilih dari list • Form tidak bisa submit jika kosong |
| 2 | F05 | Status pengiriman berubah otomatis: Dalam Perjalanan → Menunggu Nota → Selesai. | • Transisi status sesuai alur • Tidak bisa mundur ke status sebelumnya • Status tampil real-time di dashboard |
| 3 | F06 | Sistem mencatat timestamp keberangkatan (saat F04) dan timestamp penyelesaian (saat F08 upload). | • Waktu disimpan otomatis • Format: YYYY-MM-DD HH:MM:SS • Tidak bisa diedit manual |
| 4 | F07 | Pekerja memasukkan angka berat bersih (Netto) dalam satuan kilogram sesuai hasil timbangan RAM. | • Hanya menerima angka positif • Minimal 1 karakter • Tersimpan di draft laporan |
| 5 | F08 | Petugas RAM mengunggah foto nota timbangan asli dari kamera atau galeri. Upload menutup laporan. | • Format: .jpg / .png • Ukuran maks: 5MB • Upload gagal tampilkan retry |
| 6 | F09 | Sistem memvalidasi semua input sebelum disimpan: format angka, format file gambar, field wajib. | • Pesan error spesifik per field • Validasi sisi server dan client • Input invalid tidak tersimpan |

#### 4.2.3 Monitoring Dashboard (F10–F12, F16)

| Kode | Deskripsi | Acceptance Criteria |
|---|---|---|
| F10 | Dashboard rekapitulasi harian menampilkan: total tonase (kg), jumlah ritase (frekuensi pengiriman), dan daftar pengiriman hari ini dengan statusnya. | • Data ter-refresh otomatis • Menampilkan total & detail • Status badge berwarna sesuai status |
| F11 | Komparasi data: berat yang diinput Pekerja ditampilkan berdampingan dengan foto nota yang diunggah Petugas RAM. | • Side-by-side dalam 1 layar • Foto bisa diperbesar • Tidak bisa edit setelah selesai |
| F12 | Filter riwayat panen berdasarkan: rentang tanggal, nama blok lahan, atau plat nomor mobil. | • Filter bisa dikombinasi • Hasil muncul < 2 detik • Export ke format yang dibutuhkan |
| F16 | Tampilan side-by-side: angka berat (kiri) vs foto nota (kanan) dalam satu layar verifikasi. | • Layout responsif di mobile • Foto bisa di-zoom • Label jelas per kolom |

---

## 5. Use Case & Alur Pengguna

### 5.1 Ringkasan Use Case

| ID | Nama Use Case | Aktor | Prioritas | Deskripsi Singkat |
|---|---|---|---|---|
| UC01 | Registrasi Akun | Semua | HIGH | Daftar akun baru, pilih role, verifikasi email/HP |
| UC02 | Login | Semua | HIGH | Autentikasi, redirect ke dashboard sesuai role |
| UC03 | Kelola Data Mobil | Pemilik | HIGH | CRUD armada kendaraan (plat nomor & kapasitas) |
| UC04 | Kelola Blok Lahan | Pemilik | HIGH | CRUD blok lahan (nama/kode & luas hektar) |
| UC05 | Laporan Keberangkatan | Pekerja | HIGH | Pilih mobil & lahan, konfirmasi berangkat, timestamp otomatis |
| UC06 | Input Berat Timbangan | Pekerja | HIGH | Masukkan berat netto (kg) setelah ditimbang di RAM |
| UC07 | Upload Bukti Nota RAM | Petugas RAM | HIGH | Foto nota asli diunggah, tutup & selesaikan laporan |
| UC08 | Monitoring Laporan | Pemilik | HIGH | Dashboard rekapitulasi, komparasi data, filter riwayat |
| UC09 | Logout | Semua | HIGH | Hapus sesi, kembali ke halaman login |

### 5.2 Alur Utama — Happy Path

| Step | Aktor | Aksi | Response Sistem | Status Pengiriman |
|---|---|---|---|---|
| 1 | Pekerja | Login ke aplikasi | Redirect ke dashboard Pekerja | — |
| 2 | Pekerja | Buka menu Laporan Pengiriman | Tampilkan form keberangkatan | — |
| 3 | Pekerja | Pilih mobil & blok lahan, konfirmasi | Simpan data, catat timestamp | Dalam Perjalanan |
| 4 | Pekerja | Tiba di RAM, input berat netto (kg) | Simpan angka sebagai draft | Menunggu Nota |
| 5 | Petugas RAM | Cari mobil by plat, upload foto nota | Simpan foto, tutup laporan | Selesai |
| 6 | Pemilik | Buka dashboard, cek rekapitulasi | Tampilkan data + foto side-by-side | Selesai ✅ |

### 5.3 Skenario Alternate & Error

| Use Case | Kondisi Error | Pesan Sistem | Tindakan Sistem |
|---|---|---|---|
| UC01 — Register | Email/HP sudah terdaftar | "Akun sudah ada. Silakan login." | Highlight field, tidak simpan data |
| UC02 — Login | Password salah | "Email/HP atau password salah." | Tampilkan pesan, allow retry |
| UC05 — Berangkat | Plat mobil tidak terdaftar | "Plat nomor tidak ditemukan." | Tolak submit, arahkan ke admin |
| UC07 — Upload Nota | Format file bukan jpg/png | "Format file tidak didukung." | Tolak file, minta ulang upload |
| UC07 — Upload Nota | Koneksi terputus saat upload | "Upload gagal. Coba lagi." | Tampilkan tombol retry |
| UC08 — Dashboard | Belum ada aktivitas hari ini | "Belum ada pengiriman hari ini." | Tampilkan empty state |

---

## 6. Arsitektur & Stack Teknologi

### 6.1 Stack Teknologi

| Layer | Teknologi | Detail & Justifikasi |
|---|---|---|
| Frontend | React.js + Tailwind CSS | Framework berbasis komponen untuk UI dinamis. Tailwind CSS untuk desain responsif mobile-first. ES6+ JavaScript. |
| Styling | Tailwind CSS | Utility-first CSS framework. Ringan, responsif, mudah dikustomisasi untuk tampilan lapangan. |
| Backend Runtime | Node.js + npm | Runtime JavaScript untuk server-side. Mendukung ecosystem yang sama dengan frontend. |
| Database | MySQL | Relational database untuk menyimpan data users, mobil, lahan, pengiriman, dan nota. |
| Local Dev Server | XAMPP / Laragon | Local server untuk development. MySQL terbundel, mudah dikonfigurasi. |
| Communication | HTTP/HTTPS + JSON | REST-like API. HTTPS wajib untuk keamanan data. Format JSON untuk pertukaran data. |
| Hosting | Vercel / Netlify / GitHub Pages | Static/cloud hosting untuk frontend. Mendukung Continuous Deployment. |
| Code Editor | Visual Studio Code | IDE utama tim pengembang dengan ekstensi React dan ESLint. |
| Browser Testing | Chrome, Firefox, Edge, Safari | Semua browser modern yang didukung sistem (versi terbaru). |

### 6.2 Database Schema

#### Tabel: users

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | INT | PK, AUTO_INCREMENT | Primary key unik untuk setiap user |
| nama | VARCHAR(100) | NOT NULL | Nama lengkap pengguna |
| email | VARCHAR(150) | UNIQUE, NULLABLE | Email untuk registrasi via email |
| no_hp | VARCHAR(20) | UNIQUE, NULLABLE | Nomor HP untuk registrasi via HP |
| password | VARCHAR(255) | NOT NULL | Password ter-hash (bcrypt) |
| role | ENUM | NOT NULL | Nilai: `pemilik` \| `pekerja` \| `petugas_ram` |
| created_at | DATETIME | DEFAULT NOW() | Waktu registrasi akun |

#### Tabel: mobil

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | INT | PK, AUTO_INCREMENT | Primary key |
| plat_nomor | VARCHAR(20) | UNIQUE, NOT NULL | Nomor plat kendaraan (unik) |
| kapasitas_kg | INT | NOT NULL | Estimasi kapasitas muatan dalam kilogram |
| created_at | DATETIME | DEFAULT NOW() | Waktu data ditambahkan |

#### Tabel: lahan

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | INT | PK, AUTO_INCREMENT | Primary key |
| nama_blok | VARCHAR(50) | NOT NULL | Nama atau kode blok lahan (misal: A1, B2) |
| luas_ha | DECIMAL(8,2) | NOT NULL | Luas lahan dalam hektar |
| created_at | DATETIME | DEFAULT NOW() | Waktu data ditambahkan |

#### Tabel: pengiriman

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | INT | PK, AUTO_INCREMENT | Primary key |
| mobil_id | INT | FK → mobil.id | Referensi ke tabel mobil |
| lahan_id | INT | FK → lahan.id | Referensi ke tabel lahan |
| pekerja_id | INT | FK → users.id | Referensi ke tabel users (role: pekerja) |
| waktu_berangkat | DATETIME | NOT NULL | Timestamp keberangkatan (otomatis) |
| berat_netto_kg | INT | NULLABLE | Berat bersih hasil timbangan (diisi pekerja) |
| status | ENUM | DEFAULT 'perjalanan' | Nilai: `perjalanan` \| `menunggu_nota` \| `selesai` |
| created_at | DATETIME | DEFAULT NOW() | Waktu record dibuat |

#### Tabel: nota

| Kolom | Tipe Data | Constraint | Keterangan |
|---|---|---|---|
| id | INT | PK, AUTO_INCREMENT | Primary key |
| pengiriman_id | INT | FK → pengiriman.id | Referensi ke tabel pengiriman |
| petugas_id | INT | FK → users.id | Referensi ke tabel users (role: petugas_ram) |
| foto_nota_path | VARCHAR(500) | NOT NULL | Path/URL file foto nota yang diunggah |
| waktu_upload | DATETIME | DEFAULT NOW() | Timestamp saat nota diunggah (otomatis) |

---

## 7. Kebutuhan Non-Fungsional

Berdasarkan ISO/IEC 25010. Semua item **Must Have** wajib terpenuhi sebelum sistem dapat diluncurkan.

| Kode | Karakteristik | Sub-Karakteristik | Deskripsi | Prioritas |
|---|---|---|---|---|
| NF01 | Usability | Learnability | Sistem mudah dipahami pengguna non-teknis (pekerja kebun) | Must Have |
| NF02 | Usability | Operability | Antarmuka sederhana dan mudah dioperasikan via smartphone | Must Have |
| NF03 | Usability | Accessibility | Tampilan responsif di semua ukuran layar (mobile-first) | Must Have |
| NF04 | Performance | Time Behavior | Waktu respons sistem maksimal 3 detik untuk semua operasi | Must Have |
| NF05 | Performance | Resource Utilization | Sistem berjalan pada perangkat dengan RAM minimal 2GB | Should Have |
| NF06 | Reliability | Availability | Sistem dapat diakses kapan saja (target uptime 99%) | Must Have |
| NF07 | Reliability | Fault Tolerance | Sistem menangani koneksi tidak stabil dengan mekanisme retry | Must Have |
| NF08 | Security | Confidentiality | Data hanya dapat diakses oleh pengguna dengan hak akses sesuai | Must Have |
| NF09 | Security | Integrity | Data laporan tidak dapat dimodifikasi setelah status Selesai | Must Have |
| NF10 | Security | Authentication | Wajib login sebelum mengakses fitur apapun | Must Have |
| NF11 | Security | Authorization | Hak akses dibatasi ketat berdasarkan role pengguna | Must Have |
| NF12 | Security | Data Validation | Validasi input sisi client dan server (angka, format file, dll) | Must Have |
| NF13 | Compatibility | Interoperability | Sistem dapat diakses via Chrome, Firefox, Edge, Safari terbaru | Should Have |
| NF15 | Maintainability | Modifiability | Kode dapat dikembangkan atau diperbaiki dengan mudah | Should Have |
| NF16 | Maintainability | Modularity | Struktur kode modular per fitur/komponen | Should Have |
| NF17 | Portability | Adaptability | Sistem dapat digunakan di berbagai sistem operasi | Should Have |
| NF18 | Portability | Installability | Tidak memerlukan instalasi — berbasis browser web | Must Have |
| NF20 | Reliability | Recoverability | Mekanisme retry otomatis jika upload nota gagal | Should Have |

---

## 8. Batasan Sistem & Asumsi

### 8.1 Batasan Sistem (v1.0)

1. Sistem hanya dikembangkan dalam bentuk aplikasi web. Aplikasi mobile native (Android/iOS) tidak masuk cakupan v1.0.
2. Sistem hanya mencakup monitoring, pencatatan, dan validasi data panen sawit — bukan manajemen tenaga kerja, perawatan kebun, atau penjadwalan.
3. Tidak ada integrasi API langsung dengan sistem internal pabrik/RAM. Semua data dari RAM diinput secara manual oleh Petugas RAM.
4. Sistem tidak dirancang untuk beroperasi secara offline. Fitur upload dan sinkronisasi membutuhkan koneksi internet aktif.
5. Keakuratan data sangat bergantung pada kejujuran pengguna dalam menginput data lapangan.
6. Tidak ada fitur analisis lanjutan berbasis AI atau prediksi hasil panen pada versi awal.
7. Keamanan difokuskan pada autentikasi dan role-based access. Enkripsi end-to-end dan audit keamanan eksternal belum masuk cakupan.

### 8.2 Asumsi

- Pemilik kebun memiliki akses smartphone dan koneksi internet minimal 3G.
- Pekerja kebun dapat mengoperasikan aplikasi web dasar (form input, pilih dari dropdown).
- Petugas RAM memiliki smartphone dengan kamera yang berfungsi untuk foto nota.
- Semua pengguna melakukan registrasi akun sebelum menggunakan sistem.
- Data plat nomor mobil dan blok lahan sudah diinput Pemilik sebelum pekerja mulai beroperasi.

### 8.3 Dependensi

| Teknologi | Peran |
|---|---|
| React.js | Framework frontend utama untuk membangun UI komponen |
| Tailwind CSS | Framework CSS untuk desain responsif mobile-first |
| Node.js / npm | Runtime dan package manager untuk pengembangan |
| MySQL | Database relasional untuk semua data sistem |
| XAMPP / Laragon | Local server development environment |
| Browser Modern | Chrome, Firefox, Edge, Safari (versi terbaru) |
| Hosting Cloud | Vercel, Netlify, atau GitHub Pages untuk deployment |

---

## 9. Pembagian Tugas Tim

### Frontend Developer

- **Halaman Auth:** Login, Register (pilih role), Logout page
- **Dashboard Pemilik:** Rekapitulasi harian, komparasi side-by-side, filter riwayat
- **Form Pekerja:** Pilih mobil (dropdown), pilih lahan, input berat netto, lihat status
- **Halaman Petugas RAM:** Cari mobil by plat, akses kamera/galeri, upload foto nota
- **Manajemen Data Master:** CRUD mobil & lahan (form + tabel + delete confirmation modal)
- **UI/UX & Responsivitas:** Mobile-first Tailwind CSS, status badge berwarna, error message UI
- **Routing & Guards:** React Router dengan proteksi route per role
- **State Management:** Kelola state login, form, dan data antar komponen

### Backend Developer

- **Database Setup:** Buat database MySQL, semua tabel (users, mobil, lahan, pengiriman, nota), dan relasi FK
- **Auth & Session:** Register, login, logout endpoint. JWT atau session-based. Role-based middleware.
- **API Pengiriman:** POST create pengiriman, PUT update status, GET detail & list. Timestamp otomatis.
- **API Berat & Nota:** PUT input berat netto, POST upload foto nota, validasi format file, simpan path.
- **API Mobil & Lahan:** CRUD endpoint untuk data master. Validasi plat nomor unik, nama blok wajib.
- **API Dashboard:** GET rekapitulasi harian, GET riwayat dengan filter (tanggal, blok, plat).
- **Validasi & Error:** Validasi input sisi server, error response terstandar, HTTP status code tepat.
- **Security:** Role guard middleware, sanitasi input, prevent SQL injection.

### 9.1 Titik Integrasi Frontend ↔ Backend

| Method | Endpoint | Deskripsi | Request Body | Response |
|---|---|---|---|---|
| POST | /auth/register | Registrasi akun baru | `{ nama, email/no_hp, password, role }` | `{ success, message }` |
| POST | /auth/login | Login pengguna | `{ email/no_hp, password }` | `{ token, role, nama }` |
| POST | /auth/logout | Logout & hapus sesi | Header: Bearer token | `{ success }` |
| GET | /mobil | List semua mobil | — | `[{ id, plat_nomor, kapasitas_kg }]` |
| POST | /mobil | Tambah data mobil | `{ plat_nomor, kapasitas_kg }` | `{ id, plat_nomor }` |
| PUT | /mobil/:id | Edit data mobil | `{ plat_nomor, kapasitas_kg }` | `{ success }` |
| DELETE | /mobil/:id | Hapus data mobil | — | `{ success }` |
| GET | /lahan | List semua lahan | — | `[{ id, nama_blok, luas_ha }]` |
| POST | /lahan | Tambah blok lahan | `{ nama_blok, luas_ha }` | `{ id, nama_blok }` |
| POST | /pengiriman | Buat laporan pengiriman | `{ mobil_id, lahan_id }` | `{ id, status, waktu_berangkat }` |
| PUT | /pengiriman/:id/berat | Input berat netto | `{ berat_netto_kg }` | `{ success, status }` |
| POST | /pengiriman/:id/nota | Upload foto nota | FormData: `{ foto_nota }` | `{ success, foto_path }` |
| GET | /dashboard | Rekapitulasi harian | Query: `?tanggal=` | `{ total_kg, total_ritase, list[] }` |
| GET | /pengiriman | Riwayat pengiriman | Query: `?tanggal&blok&plat` | `[{ id, mobil, lahan, berat, status, nota }]` |

---

## 10. Kriteria Sukses & Definition of Done

### 10.1 Definition of Done (DoD)

Sebuah fitur dianggap selesai (Done) apabila memenuhi semua kriteria berikut:

- [ ] Kode frontend dan backend sudah diimplementasikan sesuai spesifikasi di dokumen ini.
- [ ] Validasi input berfungsi di sisi client (React) dan sisi server.
- [ ] Hak akses (role guard) berfungsi — endpoint tidak dapat diakses oleh role yang salah.
- [ ] Tampilan responsif dan dapat digunakan di smartphone (layar 360px ke atas).
- [ ] Semua skenario error menampilkan pesan yang informatif kepada pengguna.
- [ ] Waktu respons tidak melebihi 3 detik pada koneksi normal.
- [ ] Data tidak dapat diubah setelah status pengiriman berubah menjadi 'Selesai'.
- [ ] Foto nota tersimpan dengan benar dan dapat ditampilkan di dashboard pemilik.

### 10.2 Kriteria Penerimaan Sistem (UAT)

| Penguji | Skenario Uji | Kriteria Lulus |
|---|---|---|
| Pemilik Kebun | Login, buka dashboard, cek rekapitulasi harian, lihat foto nota, filter riwayat. | Semua data tampil akurat, foto bisa dibuka, filter berfungsi |
| Pekerja Kebun | Login, input keberangkatan (pilih mobil & lahan), input berat netto setelah timbang. | Form tersubmit, status berubah otomatis, timestamp tercatat |
| Petugas RAM | Login, cari mobil by plat, upload foto nota dari kamera. | Foto tersimpan, status berubah ke Selesai, muncul di dashboard pemilik |
| Tim Dev | Coba akses halaman yang tidak sesuai role. Input data tidak valid. | Sistem menolak dengan pesan error yang tepat dan jelas |

---

## 11. Riwayat Dokumen

| Versi | Tanggal | Penulis | Perubahan |
|---|---|---|---|
| v1.0 | 2024 | Tim Pengembang SISTRA-SAWIT | Dokumen PRD awal dibuat berdasarkan SKPL v1.0. |

---

*CONFIDENTIAL — Dokumen Internal Tim Pengembang SISTRA-SAWIT*