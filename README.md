# AturTrip — Project Overview for AI Agents

AturTrip adalah platform marketplace digital yang menghubungkan wisatawan dengan pemandu wisata lokal Indonesia. Platform ini hadir untuk menggantikan sistem pemesanan manual via WhatsApp yang selama ini digunakan pemandu lokal, dan memberikan wisatawan informasi yang lengkap dan transparan sebelum mereka memutuskan untuk booking.

---

## Apa yang Sedang Kita Bangun

Sebuah website berbasis Next.js + TypeScript yang memiliki dua sisi utama:

- **Sisi Wisatawan (Customer)** — mencari, memesan, dan melakukan perjalanan bersama pemandu lokal
- **Sisi Pemandu (Provider)** — membuat dan mengelola layanan wisata, menerima pesanan, dan menerima pembayaran

---

## Role Pengguna

### 1. Wisatawan (Customer)
Orang yang ingin berwisata dan mencari pemandu lokal. Mereka bisa menjelajahi layanan wisata, melihat alur kegiatan trip secara detail, melakukan pemesanan, dan membayar lewat platform.

### 2. Pemandu Wisata (Provider)
Pemandu lokal yang menawarkan layanan wisata. Mereka membuat paket layanan lengkap dengan jadwal kegiatan, mengelola pesanan yang masuk, dan menerima pembayaran dari platform.

### 3. Admin Platform
Tim internal AturTrip yang memverifikasi identitas pemandu, menangani laporan, dan menyelesaikan sengketa antara wisatawan dan pemandu.

---

## Fitur Utama

### Untuk Wisatawan
- **Cari & filter layanan** — cari pemandu berdasarkan lokasi, harga, durasi, spesialisasi, dan ketersediaan tanggal
- **Lihat timeline event** — jadwal detail trip per jam sebelum booking (ini yang membedakan AturTrip dari platform lain)
- **Lihat rute perjalanan** — peta interaktif yang menampilkan rute dan titik-titik destinasi
- **Booking** — pesan layanan dalam mode Privat (eksklusif) atau Sharing (bergabung dengan peserta lain, ada slot tersisa yang terlihat real-time)
- **Metode Pembayaran** — menggunakan midtrans, dan ada metode full payment atau down payment
- **Bayar lewat platform** — dana ditahan escrow, aman untuk kedua pihak
- **Beri ulasan** — nilai pemandu setelah trip selesai

### Untuk Pemandu Wisata
- **Buat layanan** — wizard multi-langkah untuk membuat paket wisata lengkap dengan foto, deskripsi, jadwal kegiatan, dan rute
- **Kelola jadwal** — atur ketersediaan dan kapasitas per hari
- **Terima & konfirmasi pesanan** — dashboard manajemen pesanan masuk
- **Dashboard keuangan** — lihat pendapatan, saldo, dan tarik dana ke rekening
- **Profil & reputasi** — tampilkan sertifikasi, rekam jejak trip, dan ulasan dari wisatawan

### Untuk Admin
- **Verifikasi pemandu** — setujui atau tolak dokumen KTP dan sertifikasi yang diunggah
- **Tangani sengketa** — mediasi antara wisatawan dan pemandu jika ada keluhan
- **Moderasi konten** — pantau listing layanan yang bermasalah

---

## Alur Utama Platform

```
Wisatawan cari layanan
    → Lihat detail (timeline, rute, profil guide)
        → Booking & bayar
            → Pemandu konfirmasi
                → Trip berlangsung (dengan live tracking & SOS)
                    → Trip selesai
                        → Wisatawan beri ulasan
                            → Pemandu tarik dana (7 hari setelah trip)
```

---

## Hal Penting yang Perlu Selalu Diingat

- Ini adalah platform baru dan belum ada sebelumnya jadi pengalaman UI dan UX harus sangat bagus
- Kepercayaan adalah elemen terpenting — badge verifikasi, rating, dan rekam jejak pemandu harus selalu terlihat jelas
- Semua teks UI menggunakan Bahasa Indonesia
- Mobile-first — mayoritas pengguna mengakses lewat smartphone