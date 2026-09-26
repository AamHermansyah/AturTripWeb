# Alur kerja agen AI

## Mulai tugas

1. Baca [peta monorepo](../README.md), `AGENTS.md` aplikasi, dan satu atau dua dokumen aplikasinya yang sesuai tugas.
2. Buka file kode yang akan diubah; pakai pencarian terarah untuk dependensinya. Jangan membuka seluruh repo tanpa alasan.
3. Cek [`decisions.md`](decisions.md) sebelum menetapkan aturan booking, pembayaran, peran, atau kebijakan lain. Untuk jadwal/slot, baca juga [`availability.md`](availability.md).
4. Sebutkan fase dan hasil yang hendak dicapai. Jika aturan produk masih terbuka, kerjakan bagian independen atau tanyakan keputusan yang diperlukan.
5. Untuk keputusan produk yang memerlukan jawaban pengguna, pakai pilihan interaktif berbentuk bubble jika alatnya tersedia: 2–3 opsi singkat, saran agen di urutan pertama, dan jawaban bebas tetap tersedia. Ajukan satu pertanyaan setiap kali saat pengguna perlu waktu berpikir dan tunggu jawabannya sebelum menutup giliran, agar popup tidak hilang. Jangan meminta ulang keputusan yang sudah tercatat.

## Saat mengerjakan

- Bedakan **UI dengan data contoh**, **interaksi lokal**, dan **alur yang tersimpan melalui backend**. Route yang ada belum berarti fitur selesai.
- Ikuti struktur monorepo: `apps/web` untuk wisatawan/pemandu, `apps/web-admin` untuk staf admin, `apps/api` untuk layanan kedua aplikasi, dan `packages/*` untuk kode bersama yang memang dipakai lintas aplikasi.
- Pakai komponen dan pola yang sudah tersedia sebelum membuat salinan baru. Teks UI tetap Bahasa Indonesia dan mobile-first.
- Jangan mengunci kebijakan produk yang belum diputuskan melalui angka, status, atau alur hardcode baru.

## Menutup tugas

1. Jalankan pemeriksaan yang sesuai dengan perubahan (misalnya `pnpm typecheck`, `pnpm lint`, atau build aplikasi terkait).
2. Laporkan apa yang berubah, apa yang diverifikasi, dan batas yang masih ada.
3. Perbarui `current-state.md` aplikasi bila kemampuan nyata berubah. Centang butir objektif pada timeline aplikasi ketika kodenya memenuhi kriteria; perbarui timeline lintas aplikasi jika gerbangnya tercapai.
4. Bila satu **fitur** telah selesai dibuat dan diverifikasi, tanyakan: “Apakah fitur [nama] sudah selesai dan tidak ada perbaikan lagi?” Jangan mengulang pertanyaan untuk tiap perubahan kecil. Jika pengguna menjawab **ya**, langsung centang butir persetujuan/penyelesaian fitur pada timeline aplikasi dan selaraskan `current-state.md`, PRD/TDD jika memang berubah. Jika jawabannya **belum**, kerjakan umpan baliknya dan tanyakan lagi setelah selesai.
5. Jangan menganggap diam, waktu berlalu, atau keberadaan route sebagai persetujuan. Tambahkan keputusan produk hanya setelah pengguna menyetujuinya.

Dokumen ini adalah navigasi kerja, bukan pengganti instruksi pengguna atau pemeriksaan kode.
