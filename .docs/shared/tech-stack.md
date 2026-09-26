# Peta pustaka teknis AturTrip

Status: **pilihan rancangan**, bukan bukti dependensi terpasang atau fitur selesai. Baca TDD aplikasi untuk cara pemakaiannya; keputusan bernomor ada di [decisions.md](decisions.md) (`D-137`–`D-143`). Tambahkan paket hanya saat fitur yang memerlukannya diimplementasikan, lalu perbarui keadaan kode dan checklist sesuai bukti.

| Area | Pilihan | Lokasi | Status saat ini |
| --- | --- | --- | --- |
| Grafik | `apexcharts` + `react-apexcharts` | Dashboard pemandu di `apps/web`; analitik di `apps/web-admin` | Dipilih; belum terpasang |
| Database dan migrasi | PostgreSQL + `drizzle-orm` + `drizzle-kit` | `apps/api` | Dipilih; belum terpasang |
| Sesi dan OTP | `better-auth` + adapter Drizzle | `apps/api`; kedua web sebagai klien | Dipilih; belum terpasang |
| Job tertunda dan berulang | `graphile-worker` | Proses worker API dengan PostgreSQL yang sama | Dipilih; belum terpasang |
| Data API interaktif | `@tanstack/react-query` | `apps/web`, `apps/web-admin` | Dipilih; belum terpasang |
| Form dan validasi | `react-hook-form` + `@hookform/resolvers` + Zod | Kedua web; validasi ulang di API | RHF/resolver dipilih tetapi belum terpasang; Zod 3 sudah ada di `@atur-trip/schemas` |
| Pengujian | Vitest **major 4** + Playwright | Domain/API, komponen penting, dan alur lintas aplikasi | Dipilih; belum terpasang |

## Aturan integrasi yang perlu dijaga

- **Grafik:** API mengirim seri yang sudah diagregasi dan disaring menurut izin. Gunakan wrapper ApexCharts pada komponen klien Next.js; label, zona waktu, dan keadaan kosong tetap dapat dipahami tanpa grafik. Jangan mengirim angka keuangan kepada staf biasa. Rujukan: [panduan ApexCharts untuk Next.js](https://apexcharts.com/docs/nextjs-integration/).
- **Lisensi grafik:** sebelum penggunaan produksi, periksa [Community License](https://apexcharts.com/license/community/) dan [aturan OEM serta pengecualian dashboard view-only](https://apexcharts.com/license/oem/) terhadap dua aplikasi dan kemampuan filter/interaksi pengguna. Minta konfirmasi tertulis penyedia bila klasifikasinya tidak jelas; jangan menganggap lisensi gratis otomatis berlaku.
- **Database:** gunakan satu sumber kebenaran untuk hold, kapasitas, bentrok pemandu, booking, ledger, dan pencairan. Tinjau migrasi SQL dan batasan unik/relasional; pakai transaksi untuk perubahan status yang harus atomik. [Drizzle mendukung migrasi SQL](https://orm.drizzle.team/docs/migrations) dan [transaksi](https://orm.drizzle.team/docs/transactions).
- **Autentikasi:** Better Auth menangani sesi, bukan seluruh kebijakan produk. Integrasi [Express](https://better-auth.com/docs/integrations/express) meminta ESM dan handler auth sebelum `express.json()`; `apps/api` belum dikonfigurasi sebagai ESM. [Adapter Drizzle](https://better-auth.com/docs/adapters/drizzle) perlu skema/migrasi yang selaras. Plugin [nomor HP](https://better-auth.com/docs/plugins/phone-number) harus mengirim OTP via WhatsApp untuk wisatawan; email pemandu memakai verifikasi/pemulihan OTP. Login staf perlu sandi **dan OTP email setiap kali** melalui alur faktor kedua yang tidak bisa dilewati atau dianggap selesai karena perangkat dipercaya; uji konfigurasi [2FA](https://better-auth.com/docs/plugins/2fa) sebelum implementasi final. API memeriksa izin per resource pada setiap endpoint.
- **Job:** Graphile Worker memakai PostgreSQL dan dapat [menambahkan job melalui SQL](https://worker.graphile.org/docs/sql-add-job) dalam transaksi domain. Payload membawa ID resource, bukan salinan saldo/status. Pekerja memeriksa ulang waktu dan status terkini, memakai kunci idempoten untuk efek eksternal, serta menyediakan rekonsiliasi bila proses terlewat. Jadwal bukan bukti bahwa pembayaran, refund, atau pencairan telah berhasil.
- **Data dan form:** gunakan TanStack Query untuk cache, invalidasi sesudah mutasi, dan refetch bagian interaktif; Server Components boleh mengambil data awal. Kunci query memuat konteks pribadi/grup, filter, dan izin. Bersihkan cache saat logout atau pergantian akun. Form memakai Zod untuk umpan balik cepat, tetapi API tetap menjadi pemeriksa terakhir.
- **Pengujian:** Vitest 4 sesuai target Node `>=20` yang ada; [Vitest 5 membutuhkan Node lebih baru](https://vitest.dev/guide/). Gunakan Playwright pada alur kritis seperti OTP staf, booking Sharing/Privat, DP, refund, dan larangan akses keuangan staf. Uji aturan transaksi pada database nyata, termasuk dua checkout bersamaan serta job yang diproses ulang; mock hanya batas eksternal seperti gateway dan pengirim pesan.

## Belum dipilih di sini

Penyedia pembayaran tetap shortlist DOKU/Xendit sampai uji sandbox/kontrak (`O-19`). Penyedia WhatsApp, email, media KYC, dan hosting belum diputuskan. MapLibre sudah ada pada `apps/web`; kebutuhan editor rute tidak memaksa pustaka peta lain sebelum kemampuan komponen yang ada diuji.
