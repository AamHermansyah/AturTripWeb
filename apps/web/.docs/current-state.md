# Kondisi implementasi apps/web

Terakhir ditinjau: 26 September 2026. Ringkasan ini berdasarkan kode pada saat peninjauan; cek kode untuk perubahan terbaru.

## Status umum

AturTrip berada pada fase **prototipe UI/UX dengan data contoh**. Ada 31 route `page.tsx` di `apps/web/app`, termasuk redirect `/` dan dua halaman yang masih berupa kerangka. Jumlah halaman tidak sama dengan jumlah fitur siap pakai.

| Area | Yang sudah tampak di kode | Batas saat ini |
| --- | --- | --- |
| Onboarding dan akun | Onboarding, personalisasi, daftar, masuk, verifikasi, pemulihan sandi | Navigasi dan state lokal; belum ada autentikasi atau akun tersimpan |
| Penjelajahan | Explore, kartu trip dan grup, detail, timeline kegiatan, galeri, ulasan | Data contoh; pencarian/filter belum terhubung ke hasil nyata |
| Peta | Komponen MapLibre dan contoh marker pada detail trip | Rute/checkpoint/elevasi berbasis data trip belum tersedia |
| Booking | Pemilih tanggal/peserta, opsi bayar penuh/DP, data peserta, riwayat, detail, ubah jadwal, pembatalan | Harga/slot/status contoh; tombol melanjutkan navigasi, belum membuat transaksi |
| Profil dan akun | Profil sendiri/publik, preferensi, keamanan akun, notifikasi | Sebagian besar state lokal dan data statis; penyimpanan belum ada |
| Grup/agensi | Profil grup, daftar dan detail trip grup, galeri | Tampilan publik contoh; pengelolaan grup belum ada |
| Pesan dan simpan | Route `conversations` dan `saved` | Halaman kerangka |
| Pemandu | Layout route group tersedia | Halaman dashboard dan alur operasional belum ada |

## Fondasi desain

Redesign fondasi + komponen diterima pemilik produk pada 26 September 2026; struktur halaman tidak berubah.

- Font tunggal Plus Jakarta Sans (`app/layout.tsx`); `font-heading` memakai keluarga yang sama dengan tracking rapat.
- Palet di `app/globals.css`: satu aksen jade (`--primary`) di atas netral hangat bernada pasir, mode gelap arang hangat, warna status diredam, bayangan diberi rona hangat. Logo belum final; bila warna brand berubah, ganti `--primary` beserta pasangannya di `.dark`.
- Radius berjenjang: badge 6px, tombol/input 12px, kartu/dialog/sheet 20px (`rounded-4xl`); tombol ikon tetap bulat.
- Tombol punya umpan balik tekan (`scale`), bottom navbar menandai halaman aktif (`aria-current`), dan loading route `(user)`, `trips`, `groups` memakai `components/ui/skeleton.tsx`.
- Tahap 2 (diterima 26 September 2026): tab, chip, tag, dan badge di halaman mengikuti skala radius; label memakai huruf kalimat minimal 11px tanpa `uppercase`. Bentuk bulat hanya untuk avatar, progress, dan tombol ikon. CTA booking memakai `primary`, bukan `success`.

## Lokasi kode yang sering diperlukan

- Route web: `apps/web/app/`
- Komponen fitur: `apps/web/components/shared/`
- Komponen UI: `apps/web/components/ui/`
- Data contoh: `apps/web/lib/constants/` dan beberapa file halaman/komponen
- Paket bersama: `packages/types`, `interfaces`, `schemas`, `utils` (masih minimal)

## Batas yang perlu diingat

- Tidak ada bukti integrasi PostgreSQL/Prisma, NextAuth, Midtrans, WhatsApp Business API, atau escrow dalam dependensi dan implementasi saat tinjauan.
- `apps/web/package.json` memakai Next.js 16 dan React 19. Peta yang terpasang memakai MapLibre, bukan Mapbox GL JS.
- Link menuju `/guide-mode`, `/account/kyc`, `/account/withdrawal`, `/contact`, dan `/terms` ada pada menu akun, tetapi route tersebut belum ditemukan.
- Riwayat commit menunjukkan pekerjaan UI sejak April 2026 dan perluasan halaman grup pada Agustus 2026. Itu riwayat pengerjaan, bukan jadwal rilis.
- Pemilih tanggal memiliki cabang tampilan `by_days` dan `by_hours`, tetapi booking drawer dan reschedule mengunci `by_hours` serta memakai tanggal contoh Agustus–September 2026. Lima pola aturan penyedia dalam [availability.md](../../../.docs/shared/availability.md) belum tersedia.
- Tampilan sekarang belum membuktikan perhitungan akhir trip lintas tengah malam, tahanan slot selama pembayaran, atau konfirmasi otomatis setelah pembayaran berhasil.
- UI booking masih memiliki harga, kapasitas, tipe availability, dan hitung mundur contoh; keputusan tahanan 15 menit, tipe listing tunggal Privat/Sharing, dan usulan reschedule oleh pemandu belum diterapkan pada kode.
- Panel staf admin dipisahkan ke `apps/web-admin`; tidak ada halaman admin operasional di aplikasi web ini.
