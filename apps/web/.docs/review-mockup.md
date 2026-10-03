# Panduan review mockup — 3 Oktober 2026

Jalankan web dengan `pnpm --filter @atur-trip/web dev`, lalu buka tautan di bawah. Semua data, geometri, QRIS, dan status transaksi adalah contoh. State editor/checkout/booking dihapus saat muat ulang; tidak ada akun, reservasi kapasitas, penerbitan listing, atau transfer dana API. Pada Windows dengan pembatasan skrip PowerShell, gunakan `pnpm.cmd`.

## Status penerimaan

| Mockup | Status pemilik produk |
| --- | --- |
| Akun sesuai peran | Belum; perlu review/perbaikan, belum ada rincian perbaikan |
| Pencarian/filter Explore | Belum; perlu review/perbaikan, belum ada rincian perbaikan |
| Detail trip, linimasa, peta publik | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Checkout | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Editor rencana | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Editor ketersediaan | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Wizard listing | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Verifikasi pemandu/KYC | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Simpan | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Notifikasi | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Detail booking lanjutan | Diterima tanpa perbaikan, 3 Oktober 2026 |
| Grup, galeri, dan ulasan | Diterima tanpa perbaikan, 3 Oktober 2026 |

Penerimaan hanya mencakup mockup yang disebutkan, bukan izin API atau transaksi produksi. Checklist rinci ada di [timeline.md](timeline.md).

## Akun dan Explore

- [Masuk](http://localhost:3000/login): ganti Wisatawan/Pemandu; lihat kanal nomor HP/email. Daftar/pemulihan memakai kode contoh `1234`, OTP lima menit, kirim ulang setelah 60 detik. Uji kode salah/kedaluwarsa dan tujuan baru pada keamanan akun.
- [Explore](http://localhost:3000/explore): cari `Lombok`, ganti kategori, terapkan Privat/Sharing, durasi, rating, atau harga. Bandingkan Batal/Terapkan/Reset dan hasil kosong. Muat ulang URL hasil untuk memulihkan pilihan.

## Trip dan rencana

- [Trip Rinjani malam](http://localhost:3000/trips/1?tab=linimasa&slot=evening): ganti slot pagi/malam, perhatikan jam/tanggal WITA dan akhir lintas hari. Pilih kegiatan, pin mandiri, dan segmen; buka Skema bila peta tidak siap. Slot penuh dapat dilihat tetapi tidak dipesan.
- [Editor rencana](http://localhost:3000/guide-mode/itinerary): tambah/edit pin, belokan, dan kegiatan; urutkan, hapus, lalu urungkan. Kegiatan tanpa lokasi dan tanpa garis tetap sah bila titik mulai serta linimasa tersedia. Bandingkan publik/peserta; koordinat tepat peserta hanya contoh editor, bukan izin booking.
- [Editor ketersediaan](http://localhost:3000/guide-mode/availability): pilih setiap pola, ubah durasi dan zona, masukkan tanggal/jam, lalu buat pratinjau. Uji 20.00 + enam jam, tepat 24 jam pada By day/By time, pengecualian Repeat, bentrok contoh, dan cutoff. Simulasikan booking pada slot lalu tutup penjualan: booking lama tetap terlihat.
- [Wizard listing](http://localhost:3000/guide-mode/listing): gunakan foto ilustrasi atau berkas lokal, terapkan rencana/jadwal, tentukan harga dan syarat, lalu periksa ringkasan. Simulasikan identitas disetujui, kirim review, revisi/approval, dan usulan versi baru; versi aktif lama tetap terlihat. Perubahan editor belum masuk draf bila langkah ditinggalkan sebelum tombol penerapan.

## Checkout dan booking

- [Checkout DP + foto](http://localhost:3000/booking/checkout?trip=1&slot=evening&participants=2&payment=dp&addons=photo): isi peserta, baca harga rombongan/add-on/biaya layanan 2%, lalu simulasikan QRIS berhasil/gagal/kedaluwarsa atau pembayaran terlambat. QRIS ilustrasi tidak dapat dibayar.
- [Detail booking DP](http://localhost:3000/booking/preview): simulasikan pelunasan, tenggat DP, pembatalan wisatawan/pemandu, refund QRIS/tujuan alternatif, dan verifikasi/transfer gagal. Pelunasan tidak menambahkan biaya layanan kedua.
- [DP sudah melewati tenggat](http://localhost:3000/booking/preview?trip=1&slot=morning&participants=2&payment=dp): lihat pembatalan otomatis dan refund menurut syarat contoh.
- [Booking lunas](http://localhost:3000/booking/preview?trip=4&slot=evening&participants=10&payment=full): ajukan reschedule lalu simulasikan diterima/ditolak; jadwal lama bertahan saat menunggu. No-show menutup refund biasa. Uji sengketa tepat 48 jam dan setelah batas itu melalui kontrol waktu contoh.

Booking preview adalah contoh baru dari URL; tidak membawa peserta atau hasil pembayaran checkout. Halaman lama `/booking/[id]`, `/booking/[id]/input`, `/booking/[id]/refund`, dan `/booking/[id]/reschedule` belum disatukan dengan alur baru.

## Grup, foto, dan ulasan

- [Trip grup](http://localhost:3000/groups/1/trips): cari `Semeru`, gabungkan filter cepat/drawer, lalu uji kosong/reset dan muat ulang URL. Setiap kartu harus membuka judul/detail yang cocok.
- [Trip grup yang dapat dipesan](http://localhost:3000/groups/1/trips/1?tab=linimasa&slot=evening) dan [pemandu contoh belum terverifikasi](http://localhost:3000/groups/1/trips/2): trip kedua menutup seluruh slot dan CTA booking.
- [Galeri trip](http://localhost:3000/trips/1/gallery) dan [galeri grup](http://localhost:3000/groups/1/trips/1/gallery): foto hanya ilustrasi; uji pembesaran, keyboard, Escape, dan fokus kembali.
- [Ulasan trip](http://localhost:3000/trips/1/review) dan [ulasan grup](http://localhost:3000/groups/1/review): ganti filter foto/terbaru/bintang lima/kritis dan lihat keadaan kosong. Rating agregat, distribusi, serta semua komentar tetap data contoh.

## Bukti teknis dan batas review

- [Verifikasi pemandu](http://localhost:3000/account/kyc): isi berkas contoh, ajukan, simulasikan revisi/persetujuan. Sertifikat ditinjau terpisah dari identitas; tidak ada unggahan atau izin API.
- [Simpan](http://localhost:3000/saved): isi daftar contoh atau gunakan ikon hati di kartu/detail; cari dan hapus satu/semua. Navigasi antarrute mempertahankan state; muat ulang mengosongkannya.
- [Notifikasi](http://localhost:3000/notifications): ganti peran/kategori, buka detail, tandai dibaca/belum dibaca, dan uji kosong. Kanal hanya contoh belum dikirim.

Audit navigasi dan titik masuk/kembali tercatat di [navigation-audit.md](navigation-audit.md): 57 URL/target server-rendered tanpa error. Klik browser masih belum diuji.

Typecheck, build, serta 51 tes domain lulus. Respons HTTP/HTML memverifikasi metadata, konteks trip/grup, filter, penjagaan input checkout, dan proyeksi publik. Browser tidak tersedia pada sesi agen: interaksi klik/drag, tampilan mobile, jaringan peta, dan aksesibilitas visual masih perlu ditinjau di browser pengguna. Ini tidak mengubah penerimaan eksplisit yang sudah diberikan.
