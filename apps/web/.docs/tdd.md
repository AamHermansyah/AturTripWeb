# TDD — apps/web

Status: rancangan integrasi aplikasi web; aturan bisnis final ada di [keputusan bersama](../../../.docs/shared/decisions.md).

## Kondisi kode

`apps/web` memakai Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, dan komponen shadcn/Radix. Route berada di `app/`, komponen fitur di `components/shared/`, komponen UI di `components/ui/`, dan data contoh terutama di `lib/constants/`. Peta saat ini memakai MapLibre. Lihat [current-state.md](current-state.md).

## Pustaka integrasi yang dipilih

Pilihan berikut belum berarti fitur atau dependensinya terpasang. Peta status lintas aplikasi ada di [tech-stack.md](../../../.docs/shared/tech-stack.md).

| Kebutuhan | Pilihan | Batas penggunaan |
| --- | --- | --- |
| Grafik pendapatan pemandu | `apexcharts` + `react-apexcharts` (`D-137`) | Komponen klien Next.js; seri dari API dan hanya untuk pemilik saldo yang berizin. Periksa lisensi sebelum rilis. |
| Data API yang interaktif | `@tanstack/react-query` (`D-141`) | Cache dipisah menurut akun dan konteks Pribadi/Grup; invalidasi setelah mutasi. Data awal boleh diambil di server. |
| Form | `react-hook-form` + `@hookform/resolvers` + Zod (`D-142`) | Gunakan skema `@atur-trip/schemas` yang sesuai; API memvalidasi ulang. |
| Pengujian | Vitest 4 + Playwright (`D-143`) | Uji perilaku berisiko seperti editor slot lintas hari, checkout, OTP, reschedule, dan batas izin grup; jangan menyamakan tes UI dengan bukti transaksi API. |

Sesi memakai Better Auth yang dipasang di `apps/api` (`D-139`); aplikasi web adalah klien. Jangan membuat penyimpanan sesi atau keputusan izin kedua di Next.js. MapLibre yang telah terpasang tetap digunakan untuk peta kegiatan.

## Batas aplikasi

- Wisatawan, pemandu individu, dan grup/agensi memakai aplikasi ini. Staf admin memakai `apps/web-admin`.
- API adalah sumber data, sesi, izin, ketersediaan, harga, dan status transaksi. State browser untuk pilihan sementara tidak menggantikan validasi server.
- Halaman masuk/daftar/pemulihan perlu terhubung ke API. Form wisatawan memakai nomor HP + sandi dengan OTP WhatsApp; form pemandu memakai email + sandi dengan OTP email. OTP wajib pada verifikasi akun, pemulihan sandi, dan perubahan identitas, sedangkan login rutin cukup dengan identitas dan sandi (`D-26`). Route dan aksi berdasarkan peran harus menjaga UX saat sesi hilang atau izin ditolak; API tetap menjadi pengambil keputusan izin.
- UI grup membedakan pemilik, pengelola, dan pemandu anggota. Listing/booking serta pendapatan tetap milik grup; pengelola tidak mendapat fungsi rekening/pencairan dan pemandu anggota hanya melihat tugasnya (`D-23`).
- Lima pola slot ditampilkan dari satu bentuk data keberangkatan. UI menunjukkan zona WIB/WITA/WIT serta tanggal selesai saat trip melintasi tengah malam. Spesifikasi di [availability.md](../../../.docs/shared/availability.md).
- Listing memiliki satu tipe Privat atau Sharing. Pilihan penuh/DP, tahanan 15 menit, konfirmasi otomatis, pelunasan DP, dan refund mengikuti kontrak API serta keputusan bersama.
- Editor trip memakai satu model kegiatan–pin–segmen: kegiatan dapat memilih pin/segmen atau tanpa lokasi; banyak kegiatan boleh memakai satu pin; pin kategori platform dapat mandiri. Editor garis menambah/menggeser titik belokan dan menampilkan pratinjau jarak perkiraan serta metadata segmen (`D-85`–`D-92`). Detail trip menghubungkan interaksi linimasa dengan fokus peta, popup pin, dan sorotan segmen. Gunakan kemampuan `MapRoute` pada komponen MapLibre yang sudah tersedia; data saat ini masih contoh. Lihat [spesifikasi bersama](../../../.docs/shared/itinerary-map.md).
- Editor linimasa menerima offset dari awal trip dan durasi perkiraan nonnegatif, termasuk 0 menit. Pratinjau untuk tiap slot menurunkan tanggal/jam mulai-selesai dari zona waktu trip, termasuk lintas hari (`D-104`, `D-105`).
- Editor mempratinjau tampilan publik versus peserta terkonfirmasi. Pin yang dipilih perkiraan tidak boleh membocorkan koordinat tepat lewat data peta atau ujung garis publik (`D-94`, `D-95`); API menentukan izin. Setelah booking, tampilan perubahan menunjukkan versi serta status persetujuan bila perubahan penting (`D-97`, `D-98`).
- Pada perubahan penting, detail booking menampilkan perbandingan versi, alasan, tombol setuju/tolak, dan hak refund penuh. Tanpa respons, versi lama tetap aktif; perubahan kecil hanya muncul sebagai notifikasi aplikasi, perubahan penting juga dikirim lewat WhatsApp (`D-99`–`D-103`).
- Checkout rilis awal menampilkan **QRIS saja** untuk pembayaran penuh, DP, dan pelunasan (`D-77`). Ringkasan tagihan memisahkan harga trip dan biaya layanan 2%; saat DP, seluruh biaya layanan masuk pembayaran pertama dan tidak muncul lagi pada pelunasan (`D-70`, `D-74`). Tidak ada biaya gateway QRIS terpisah; seluruh angka memakai rincian dari API, termasuk hak pemandu setelah refund dan komisi yang berlaku pada snapshot booking.
- Harga setiap add-on pemandu masuk dasar komisi/biaya layanan dan satu template refund booking (`D-78`, `D-79`). Bila refund asli QRIS tidak tersedia, UI mengumpulkan rekening/e-wallet wisatawan untuk verifikasi dan menampilkan status transfer refund dari API tanpa menjanjikan waktu yang belum disepakati (`D-82`).
- Wizard listing meminta satu template pembatalan platform dan menampilkan isinya sebelum terbit. Checkout memperlihatkan template yang berlaku; detail booking memakai snapshot template saat pemesanan (`D-30`).
- Tampilkan status unggah KTP/swafoto dan hasil verifikasi staf. UI baru dapat **mengirim listing untuk review** setelah identitas penyedia memenuhi syarat; listing baru belum terbit sampai staf menyetujuinya (`D-40`, `D-116`). Anggota grup yang memimpin harus ditetapkan dan terverifikasi sebelum slot dijual (`D-66`). Tampilkan status versi aktif dan usulan perubahan penting sesuai `D-126`; sertifikat opsional yang disetujui memberi badge (`D-42`).
- Jika listing menawarkan DP, wizard menampilkan tenggat 7 hari, 3 hari, atau 24 jam sebelum trip. Checkout hanya menampilkan DP bila tenggat masih berjarak sedikitnya 24 jam; keputusan akhir dari API. Detail booking menampilkan sisa tagihan dan tenggat dari API. Jika sisa DP tidak lunas pada tenggat, tampilkan pembatalan otomatis dan status refund menurut snapshot template booking (`D-36`–`D-38`).
- Detail trip selesai menampilkan batas pengajuan sengketa biasa 48 jam dari waktu selesai final. Form tidak menawarkan pengajuan biasa setelah batas itu; API tetap memutuskan kelayakan (`D-31`).
- Notifikasi transaksi termasuk rilis pertama dan memakai data API: dalam aplikasi bagi pihak terkait; konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, dan pencairan yang relevan juga melalui WhatsApp bagi wisatawan dan email bagi pemandu (`D-35`). Penggantian pemandu grup memakai notifikasi dalam aplikasi dan WhatsApp wisatawan dengan profil publik pengganti (`D-68`). Route percakapan tetap fase berikutnya bersama live tracking dan SOS.
- Status keuangan penyedia membedakan dana dalam masa tunggu 7 hari sejak waktu selesai trip pada booking final, tertahan karena sengketa, saldo siap tarik yang dapat diminta, saldo yang sudah dipesan dalam permintaan pencairan, serta dana yang berhasil dicairkan (`D-27`, `D-123`). Satu saldo tidak dapat diminta dua kali; UI memakai nominal dan kelayakan dari API, bukan menghitung izin sendiri.
- Peristiwa kunjungan, pencarian/filter, buka detail, pilih slot, mulai checkout, dan sumber kunjungan/kampanye dikirim untuk analitik pasar admin tanpa data pribadi. Status pembayaran/booking/trip selesai tetap berasal dari API; jangan memakai klik browser sebagai bukti transaksi (`D-127`–`D-135`).
- Dashboard pemandu mengambil agregat dari API, bukan menghitung ulang ledger di browser. Pada mobile urutannya empat ringkasan → tugas → tiga keberangkatan → satu grafik sederhana. Tampilkan bulan berjalan/minggu atau enam bulan/bulan dan tiga status dana (ditahan/siap tarik/sudah dicairkan). Pemilih Pribadi/Grup mengganti seluruh data dalam satu konteks; sembunyikan komponen keuangan bagi pengelola dan anggota berdasarkan izin API, dengan server tetap menolak aksesnya (`D-106`–`D-115`). Rincian di [dashboard pemandu](../../../.docs/shared/guide-dashboard.md).

## Integrasi yang diperlukan

1. Sesi dan profil: nomor HP + sandi untuk wisatawan, email + sandi untuk pemandu, OTP WhatsApp/email pada alur penting masing-masing, status belum masuk, keluar, pemulihan, dan akses sesuai peran.
2. Katalog dan listing: pencarian, filter, halaman detail, grup/agensi, itinerary, galeri, rute, dan ulasan.
3. Penyedia: wizard listing, verifikasi, lima pola kalender, pesanan, usulan reschedule, dan pendapatan.
4. Wisatawan: slot, checkout, status pembayaran, My Trips, reschedule, refund, dan pelunasan DP.

Setiap alur menangani kosong, loading, gagal, sesi habis, dan perubahan data ketika halaman dimuat ulang. Checklist UI ada di [timeline.md](timeline.md); gerbang lintas aplikasi di [timeline integrasi](../../../.docs/timelines/integration.md).
