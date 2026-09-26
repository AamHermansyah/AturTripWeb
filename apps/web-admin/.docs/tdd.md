# TDD — apps/web-admin

Status: kerangka rancangan aplikasi admin terpisah. Implementasi saat ini ada di [current-state.md](current-state.md).

## Pustaka integrasi yang dipilih

Pilihan ini belum berarti dependensi atau dashboard telah dibuat. Lihat [peta teknis](../../../.docs/shared/tech-stack.md) untuk status dan syarat lintas aplikasi.

| Kebutuhan | Pilihan | Batas penggunaan |
| --- | --- | --- |
| Grafik analitik pasar | `apexcharts` + `react-apexcharts` (`D-137`) | Komponen klien; API mengirim agregat sesuai izin. Grafik keuangan tidak boleh dikirim kepada staf biasa. Periksa lisensi sebelum rilis. |
| Filter, antrean, dan data interaktif | `@tanstack/react-query` (`D-141`) | Query key memuat filter dan izin; invalidasi antrean setelah keputusan admin. Pengambilan data awal di server tetap boleh. |
| Form keputusan dan login | `react-hook-form` + `@hookform/resolvers` + Zod (`D-142`) | Validasi browser membantu pengguna, sedangkan API memutuskan izin dan menyimpan alasan/audit. |
| Pengujian | Vitest 4 + Playwright (`D-143`) | Uji pemisahan data staf/superadmin, OTP setiap login, filter/CSV, dan alur keputusan sensitif. |

Sesi dikeluarkan oleh Better Auth di `apps/api` (`D-139`). Web-admin memakai klien sesi yang sesuai; jangan menerbitkan sesi admin lokal. Pilihan komponen UI admin dilakukan saat implementasi, dengan penggunaan kembali komponen monorepo bila memang sesuai.

## Batas aplikasi

- `apps/web-admin` adalah aplikasi Next.js tersendiri pada monorepo; port pengembangan 3001. Tidak menaruh halaman staf pada `apps/web`.
- Panel ini memanggil `apps/api` untuk sesi, izin, antrean, dokumen, listing, sengketa, dan transaksi. Kontrak API di [PRD API](../../api/.docs/prd.md).
- Tidak ada logika verifikasi izin, mutasi booking, atau keputusan pembayaran yang hanya hidup di browser. API memvalidasi peran dan resource.

## Autentikasi dan otorisasi yang diperlukan

1. Sediakan alur masuk/keluar dengan email + sandi dan OTP email wajib pada setiap login staf/superadmin (`D-26`), serta penanganan sesi kedaluwarsa. Sesi baru hanya dibuat setelah kedua langkah login berhasil.
2. Lindungi route admin sebelum menampilkan data sensitif. UI membedakan belum masuk (401), tidak punya izin (403), dan kegagalan layanan.
3. Tampilkan menu/aksi berdasarkan izin staf yang dikembalikan API. Staf berbagi akses operasional nonkeuangan; hanya superadmin melihat fungsi keuangan serta pengelolaan staf. Setiap mutasi tetap dicek API.
4. KYC, moderasi, refund oleh superadmin, pengelolaan staf, dan sengketa harus menyertakan alasan/jejak audit sesuai kebijakan final.
5. Layar verifikasi membedakan KTP/swafoto wajib dan sertifikat opsional untuk badge. Keputusan staf tercatat; API menentukan apakah listing boleh terbit berdasarkan identitas penyedia (`D-40`, `D-42`).
6. Informasi masa tunggu pencairan 7 hari, saldo siap tarik, permintaan pencairan, dan penahanan karena sengketa hanya terlihat pada fungsi keuangan superadmin; waktu kelayakan berasal dari API, bukan hitungan browser (`D-27`).
7. Alur sengketa memakai batas pengajuan biasa 48 jam sejak waktu selesai trip final (`D-31`). Staf menangani bukti dan status nonkeuangan; hanya superadmin melihat atau mengambil tindakan finansial yang berkaitan dengan penahanan/pencairan.
8. Dashboard membaca antrean yang disaring API menurut izin. Detail review listing membandingkan versi aktif dan usulan; aksi approve, minta revisi, sembunyikan, serta hentikan penjualan hanya mengubah status lewat API dan meminta alasan. Aksi admin tidak mengganti versi booking yang telah disetujui (`D-116`–`D-121`).
9. Laporan operasional memiliki alur terpisah dari sengketa keuangan. Pembatasan akun sementara dicatat, dan penutupan permanen hanya muncul untuk superadmin setelah prasyarat kewajiban dicek server (`D-120`, `D-122`).
10. Persetujuan pencairan oleh superadmin selalu memuat hasil validasi saldo/rekening/sengketa terbaru; keputusan dan status mitra dipisah agar klik berulang atau respons terlambat tidak menggandakan transfer (`D-123`).
11. Hasil verifikasi, review listing, dan pembatasan akun memicu notifikasi aplikasi/email kepada pemandu; UI admin menunjukkan status pengiriman tanpa memperlihatkan dokumen identitas pada pesan (`D-125`).
12. Pisahkan route/komponen **antrean kerja** dari **analitik pasar**. Analitik mengambil agregat berizin dari API, bukan menghitung angka dari tabel tampilan atau data mentah browser. Berikan filter konsisten, perbandingan periode, definisi/penyebut metrik, keadaan kosong/terlambat, label WIB, dan waktu pembaruan (`D-127`–`D-136`).
13. Tab dan CSV keuangan hanya tersedia bagi superadmin; UI menyembunyikan akses staf, tetapi API tetap memeriksa izin. Grafik nilai booking, dana QRIS masuk, refund, komisi, biaya, hak pemandu, dan kontribusi tidak saling dijumlahkan sebagai satu angka laba. Rincian pada [analitik admin](../../../.docs/shared/admin-analytics.md).

## Struktur awal

`app/` saat ini berisi layout, CSS sederhana, dan halaman penanda. Komponen dashboard serta sistem UI belum dibuat; Better Auth telah dipilih tetapi belum dipasang. Jangan menyalin seluruh aplikasi wisatawan hanya demi memulai panel admin; gunakan komponen bersama ketika ada kebutuhan nyata lintas aplikasi.

Kebutuhan layar ada di [PRD](prd.md), tugas di [timeline.md](timeline.md), dan gerbang lintas aplikasi di [timeline integrasi](../../../.docs/timelines/integration.md).
