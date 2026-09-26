# AturTrip — Gambaran Umum Proyek

> Dokumen ini menjelaskan visi lintas aplikasi. Kebutuhan rinci ada pada PRD masing-masing aplikasi melalui [peta dokumentasi](../README.md). Aturan yang belum diputuskan ada di [decisions.md](decisions.md).

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
- **Lihat rencana rute perjalanan** di peta interaktif dengan pin dan segmen yang dibuat pemandu; data elevasi ditampilkan bila tersedia. Pelacakan GPS langsung menyusul pada fase berikutnya.
- **Dua tipe listing** — Privat (satu pemesan/rombongan eksklusif pada satu slot) atau Sharing (beberapa pemesan mengisi kursi pada slot yang sama). Tipe ditentukan pemandu saat membuat listing.
- **Bayar melalui platform** — pembayaran penuh atau DP dan pelunasannya tercatat; dana trip yang terlaksana menunggu 7 hari sejak waktu selesai tercatat dan tetap ditahan bila ada sengketa. Rancangan utama menahan dana pada mitra pembayaran, dengan DOKU/Xendit sebagai shortlist yang masih perlu diuji; detailnya ada di [decisions.md](decisions.md) dan [evaluasi mitra](../../apps/api/.docs/payment-provider-evaluation.md).
- **Beri ulasan** setelah trip selesai

### Yang Bisa Dilakukan Pemandu Wisata
- **Buat listing layanan** dengan wizard bertahap untuk foto, deskripsi, linimasa, peta rencana, harga, dan add-on opsional. Setiap listing baru ditinjau staf sebelum terbit (`D-116`).
- **Kelola jadwal** — atur ketersediaan, blokir hari libur, batasi kapasitas per hari
- **Pantau pesanan** yang terkonfirmasi otomatis setelah pembayaran memenuhi syarat, serta ajukan reschedule bila slot tidak dapat dipenuhi
- **Pantau pendapatan** dan status pencairan melalui platform; setelah 7 hari tanpa sengketa, dana masuk saldo siap tarik, pemandu/pemilik grup mengajukan pencairan, lalu superadmin memeriksa permintaannya (`D-27`, `D-123` di [decisions.md](decisions.md)).
- **Bangun kredibilitas** dengan sertifikasi opsional yang ditinjau staf dan ditampilkan sebagai badge bila disetujui. KTP dan swafoto tetap wajib untuk verifikasi identitas sebelum menjual (`D-40`, `D-42`).

### Yang Dilakukan Admin
- Tinjau KTP/swafoto pemandu, sertifikasi opsional, dan setiap listing baru sebelum tampil di katalog.
- Tangani laporan dan tinjau bukti sengketa; hanya superadmin memutuskan tindakan keuangan dan persetujuan pencairan.
- Moderasi listing tanpa mengedit isi trip pemandu atau menghapus booking lama.
- Gunakan antrean operasional dan analitik pasar internal; metrik keuangan hanya untuk superadmin. Lihat [operasi admin](admin-operations.md) dan [analitik admin](admin-analytics.md).

---

## Alur Utama Platform

```
Wisatawan mencari layanan
  → Melihat detail trip: linimasa, peta rencana, profil pemandu
    → Memesan dan membayar melalui platform
      → Booking terkonfirmasi otomatis setelah pembayaran memenuhi syarat
        → Trip berlangsung lalu selesai
          → Wisatawan dapat memberi ulasan; sengketa biasa dapat diajukan hingga 48 jam
          → Dana menunggu 7 hari sejak trip selesai dan tertahan jika ada sengketa
            → Saldo siap tarik; pemandu/pemilik grup meminta pencairan
              → Superadmin memeriksa dan menyetujui atau menolak permintaan
```

---

## Apa yang Membedakan AturTrip

Hipotesis pembeda AturTrip ialah **linimasa kegiatan dan peta rencana yang saling terhubung**, lima pola slot untuk trip lokal, serta dukungan pemandu individu dan grup. Nilai pembeda dan posisi terhadap platform lain masih perlu diuji dengan riset pengguna dan pasar; dokumen ini tidak menyatakan bahwa pesaing tidak memiliki fitur tertentu.

---

## Teknologi

Stack yang benar-benar terpasang dan rancangan yang belum diputuskan dicatat di TDD aplikasi terkait. Visi produk di dokumen ini tidak menetapkan pilihan teknologi.

---

## Fokus Saat Ini

Saat dokumen ini ditinjau, UI wisatawan memakai data contoh. Untuk status terbaru, lihat `current-state.md` aplikasi terkait dan [timeline monorepo](../timelines/timeline.md).

---

*AturTrip — Memberdayakan pemandu wisata lokal Indonesia, satu perjalanan dalam satu waktu.*
