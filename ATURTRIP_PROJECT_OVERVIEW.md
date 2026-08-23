# AturTrip — Gambaran Umum Proyek

## Apa yang Sedang Kita Bangun

AturTrip adalah **platform marketplace yang menghubungkan wisatawan dengan pemandu wisata lokal di seluruh Indonesia**. Bayangkan ini sebagai infrastruktur digital untuk ekosistem yang saat ini berjalan sepenuhnya lewat WhatsApp — kita memberikan pemandu lokal sebuah platform profesional untuk mengelola bisnis mereka, dan memberikan wisatawan transparansi yang layak mereka dapatkan sebelum memesan trip.

Platform ini dibangun dengan **Next.js + TypeScript**, menargetkan pengguna web dan mobile-web.

---

## Masalah yang Kita Selesaikan

Saat ini, jika kamu ingin memesan trip rafting di Pangandaran atau trekking ke Gunung Bromo, inilah yang sebenarnya terjadi:

- Kamu mencari pemandu dari mulut ke mulut atau Instagram
- Kamu menghubungi mereka via WhatsApp
- Kamu tidak tahu apakah slot masih tersedia atau tidak
- Kamu mendapat deskripsi trip yang samar-samar
- Kamu transfer uang ke rekening mereka dan berharap semuanya berjalan baik

Sistem ini rusak dari dua sisi. Pemandu kewalahan dengan tumpukan chat WhatsApp yang bertabrakan, mengkonfirmasi pesanan secara manual, dan menjelaskan detail trip yang sama berulang kali. Wisatawan memesan tanpa informasi yang cukup — tidak ada jadwal kegiatan yang terstruktur, tidak ada visibilitas rute, tidak ada jaring pengaman.

AturTrip hadir untuk memperbaiki semua ini.

---

## Tiga Role Pengguna

### Wisatawan (Customer)
Siapa saja yang ingin menjelajahi Indonesia bersama pemandu lokal — solo traveler, keluarga, rombongan sekolah, tim korporat. Mereka menggunakan platform untuk mencari, membandingkan, memesan, membayar, dan berwisata dengan aman.

### Pemandu Wisata (Provider)
Pemandu lokal dan operator tur kecil yang menawarkan layanan wisata. Mereka menggunakan platform untuk membuat listing layanan, mengelola pesanan, mengatur jadwal, dan menerima pembayaran — menggantikan alur kerja berbasis WhatsApp mereka saat ini.

### Admin
Tim internal AturTrip. Mereka memverifikasi identitas pemandu, menangani sengketa antara wisatawan dan pemandu, serta memoderasi konten di platform.

---

## Fitur Utama

### Yang Bisa Dilakukan Wisatawan
- **Cari & filter** pemandu berdasarkan lokasi, harga, durasi, spesialisasi, bahasa, dan ketersediaan
- **Lihat timeline event terstruktur** sebelum booking — jadwal detail per jam tentang apa saja yang terjadi selama trip (ini adalah pembeda utama kita)
- **Lihat rute perjalanan** di peta interaktif lengkap dengan checkpoint dan data elevasi
- **Pesan dalam dua mode** — Privat (pemandu eksklusif untuk kelompokmu) atau Sharing (bergabung dengan wisatawan lain, lihat ketersediaan slot secara real-time)
- **Bayar dengan aman** — dana ditahan di escrow dan baru dicairkan ke pemandu setelah trip selesai
- **Beri ulasan** setelah trip selesai

### Yang Bisa Dilakukan Pemandu Wisata
- **Buat listing layanan** dengan wizard multi-langkah — foto, deskripsi, timeline event, peta rute interaktif, harga, dan add-on opsional
- **Kelola jadwal** — atur ketersediaan, blokir hari libur, batasi kapasitas per hari
- **Konfirmasi atau tolak pesanan** dari dashboard terpusat (tidak perlu lagi kekacauan WhatsApp)
- **Pantau pendapatan** — lihat saldo pending (ditahan 7 hari setelah trip selesai), tarik dana ke rekening bank atau dompet digital
- **Bangun kredibilitas** — unggah sertifikasi (SAR, P3K, pemandu gunung berlisensi, dll.) yang diverifikasi dan ditampilkan sebagai badge bertingkat di profil

### Yang Dilakukan Admin
- Tinjau dan verifikasi dokumen identitas (KTP) dan sertifikasi pemandu
- Mediasi sengketa antara wisatawan dan pemandu
- Pantau dan moderasi listing layanan

---

## Alur Utama Platform

```
Wisatawan mencari layanan
  → Melihat detail trip lengkap (timeline, peta, profil pemandu)
    → Memesan dan membayar (dana masuk ke escrow)
      → Pemandu mengkonfirmasi pesanan
        → Trip berlangsung
          → Trip selesai
            → Wisatawan memberi ulasan
              → Pemandu menarik dana (7 hari setelah trip)
```

---

## Apa yang Membedakan AturTrip

Sebagian besar platform perjalanan (Traveloka, GetYourGuide, Airbnb Experiences) dibangun untuk pemesanan aktivitas secara umum. Tidak ada yang dirancang khusus untuk ekosistem pemandu wisata lokal Indonesia.

Keunggulan utama kita:

| Fitur | AturTrip | Platform Lain |
|---|---|---|
| Timeline event per jam | ✅ | ❌ |
| Peta rute interaktif dengan checkpoint | ✅ | ❌ |
| Ketersediaan slot real-time untuk trip sharing | ✅ | ❌ |
| Sistem badge sertifikasi pemandu | ✅ | Terbatas |
| Fitur komunitas & agensi pemandu | ✅ | ❌ |

---

## Tech Stack (Referensi Singkat)

| | |
|---|---|
| Framework | Next.js 14 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL + Prisma |
| Auth | NextAuth.js |
| Maps | Mapbox GL JS |
| Pembayaran | Midtrans |
| Notifikasi | WhatsApp Business API + Email |

---

## Fokus Saat Ini

Kita sedang dalam **fase UI/UX** — membangun tampilan antarmuka sebelum menyambungkan backend apa pun. Semua data masih menggunakan mock. Tujuan saat ini adalah membuat pengalaman pengguna yang tepat: bersih, simpel, dan cukup mudah dipercaya sehingga pemandu lokal di desa kecil pun bisa menggunakannya tanpa kebingungan.

---

*AturTrip — Memberdayakan pemandu wisata lokal Indonesia, satu perjalanan dalam satu waktu.*