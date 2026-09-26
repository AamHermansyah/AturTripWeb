# Fase integrasi — checklist lintas aplikasi

Status: **belum dimulai**. `apps/web` dan `apps/web-admin` adalah konsumen terpisah dari `apps/api`. Centang hanya setelah data nyata mengalir, izin diuji, dan tindakan tersimpan. Tugas UI/API rinci ada di timeline aplikasi masing-masing.

## Autentikasi dan otorisasi

- [ ] Wisatawan memakai nomor HP + sandi dengan OTP WhatsApp dan pemandu email + sandi dengan OTP email. OTP wajib pada verifikasi, pemulihan, serta perubahan identitas; login rutin tidak meminta OTP.
- [ ] Web-admin memakai email + sandi dan OTP email wajib pada setiap login staf/superadmin; sesi baru terbit setelah kedua langkah berhasil dan diverifikasi API.
- [ ] Kedua origin aplikasi web dapat memanggil API sesuai konfigurasi lingkungan; CORS tidak dipakai sebagai pengganti pemeriksaan sesi/izin. Origin admin pengembangan `localhost:3001` ditambahkan sebelum integrasi browser.
- [ ] Kedua aplikasi menangani sesi kedaluwarsa/401 tanpa menampilkan data yang seharusnya terlindungi.
- [ ] Kedua aplikasi menangani 403 dan hanya menampilkan aksi sesuai izin; API menolak URL/request langsung yang tidak berhak.
- [ ] Kepemilikan booking/listing grup, izin pemilik/pengelola/pemandu anggota, dan izin staf/superadmin diuji lintas aplikasi; staf biasa tidak dapat memakai fungsi keuangan atau mengelola staf.
- [ ] Slot grup tidak dijual tanpa pemandu anggota yang ditetapkan dan terverifikasi; pergantian pada booking memeriksa bentrok serta mengirim notifikasi aplikasi/WhatsApp kepada wisatawan.

## Wisatawan dan pemandu pada apps/web

- [ ] Explore, filter, detail, itinerary, peta, grup, galeri, dan ulasan memakai data API.
- [ ] Pemandu menyimpan contoh A–B bertitik belok, pin mata air C tanpa garis, dan kegiatan tanpa pin; detail trip publik menampilkan interaksi linimasa-peta dari data yang sama (`D-85`–`D-93`).
- [ ] Linimasa dari listing yang sama menampilkan jam/tanggal kegiatan yang benar pada dua jam slot berbeda dan pada perjalanan lintas tengah malam (`D-104`).
- [ ] Koordinat/geometri perkiraan tidak bocor pada respons publik; peserta booking terkonfirmasi melihat detail tepat. Perubahan penting sesudah booking meminta persetujuan melalui aplikasi + WhatsApp atau menawarkan refund penuh; koreksi kecil diberitahukan dalam aplikasi dan diam tidak dianggap setuju (`D-94`–`D-103`).
- [ ] Penyedia membuat listing, lima pola slot, kapasitas, tipe Privat/Sharing, serta WIB/WITA/WIT dan hasilnya terlihat benar pada kalender wisatawan.
- [ ] Dashboard pemandu menerima agregat API nyata: empat ringkasan, tugas, tiga keberangkatan berbeda, dan grafik pendapatan bulan berjalan/enam bulan. Status dana tetap benar setelah pencairan; Pribadi/Grup dan izin pengelola/anggota tidak saling bocor (`D-106`–`D-115`).
- [ ] Hari pekan/rentang tanggal/pengecualian Repeat serta batas booking baru 15 menit/24 jam/3 hari/7 hari per listing konsisten antara wizard, API, dan kalender wisatawan.
- [ ] Publikasi listing ditahan sampai KTP/swafoto penyedia **dan setiap listing baru** disetujui staf; sertifikat opsional yang disetujui muncul sebagai badge. Pemandu melihat status dan alasan review (`D-116`, `D-125`).
- [ ] Perubahan penting listing aktif menunggu review staf sambil versi lama tetap terlihat pada katalog; booking terkonfirmasi tetap memakai versinya dan perubahan penting untuk peserta memerlukan persetujuan terpisah (`D-117`).
- [ ] By time lintas tengah malam dan durasi tepat 24 jam tampil benar pada checkout, detail, serta reschedule.
- [ ] Checkout menahan slot dan memberi batas pembayaran gateway 15 menit; pembayaran tepat waktu mengonfirmasi otomatis, gagal/kedaluwarsa melepas slot, dan keberhasilan setelah tenggat tidak otomatis mengonfirmasi.
- [ ] Pembayaran penuh, DP, pilihan tenggat 7 hari/3 hari/24 jam sebelum trip, dan pelunasan DP melalui platform terlihat konsisten di riwayat kedua pihak.
- [ ] Checkout dan pelunasan rilis awal memakai QRIS saja; ringkasan menampilkan harga trip + biaya layanan 2%, menagih biaya layanan sekali pada pembayaran pertama, dan tidak menambah biaya gateway QRIS kepada wisatawan (`D-70`, `D-74`, `D-77`).
- [ ] Add-on pemandu tercantum terpisah pada checkout, masuk dasar komisi/biaya layanan serta satu template refund booking; saldo pemandu siap tarik digabung dalam satu permintaan pencairan minimum Rp100.000 (`D-78`–`D-80`).
- [ ] Refund QRIS asli diuji pada penerbit serta usia transaksi yang berbeda; bila tidak tersedia, transfer ke rekening/e-wallet wisatawan terverifikasi berjalan melalui mitra dan tidak menghasilkan refund ganda (`D-82`).
- [ ] Checkout menolak DP bila tenggat pelunasan kurang dari 24 jam lagi; sisa DP yang terlambat membatalkan booking, melepas slot, dan menampilkan refund menurut template booking di kedua aplikasi.
- [ ] Setelah trip terlaksana, masa tunggu 7 hari, sengketa, saldo yang dapat diminta versus yang dipesan untuk pencairan, dan status persetujuan superadmin/transfer tampil konsisten bagi pemandu individu/pemilik grup; pencairan tidak otomatis (`D-27`, `D-123`).
- [ ] Usulan reschedule pemandu serta refund penuh bila pemandu tidak tersedia berjalan sesuai keputusan produk.
- [ ] Reschedule wisatawan memerlukan persetujuan pemandu; jadwal lama bertahan bila ditolak, sedangkan refund dan tenggat DP setelah disetujui mengikuti `D-50`–`D-52`.
- [ ] Tiga template pembatalan terlihat pada checkout dan tetap sama pada booking; no-show wisatawan tidak mendapat refund biasa, pembatalan pemandu mendapat refund penuh, dan sengketa biasa dapat diajukan hingga 48 jam setelah waktu selesai final.
- [ ] My Trips, profil, saved sesuai cakupan rilis, dan notifikasi transaksi memakai data nyata. Notifikasi terlihat dalam aplikasi; konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, serta pencairan yang relevan juga dikirim lewat WhatsApp wisatawan/email pemandu. Chat, live tracking, dan SOS tidak menjadi gerbang rilis pertama.

## Staf pada apps/web-admin

- [ ] Dashboard web-admin menampilkan antrean verifikasi KTP/swafoto, review listing, serta laporan/sengketa sesuai izin; pengecualian refund hanya bagi superadmin (`D-119`).
- [ ] Dashboard analitik admin memakai event web dan data API/ledger nyata untuk permintaan, pasokan, corong, kualitas, sumber kunjungan, dan keuangan superadmin; hasil diperbarui harian dengan label WIB/waktu pembaruan (`D-127`–`D-136`).
- [ ] Filter/perbandingan periode dan CSV mengikuti izin: staf hanya menerima agregat nonkeuangan, superadmin melihat rincian uang; pencarian anonim, DP, refund, Sharing, dan trip selesai tidak menggandakan angka (`D-129`–`D-134`).
- [ ] Wisatawan/pemandu mengirim laporan listing, perilaku, atau masalah trip/booking; staf memilahnya tanpa otomatis membuka sengketa atau menahan saldo (`D-120`).
- [ ] Staf meminta revisi/menyembunyikan listing tanpa mengedit isinya; penjualan baru berhenti tetapi booking lama tetap dapat ditangani lewat alur resmi (`D-118`, `D-121`, `D-124`).
- [ ] Pembatasan sementara akun oleh staf dan penutupan permanen oleh superadmin konsisten di web/API; booking, sengketa, refund, serta hak saldo lama tidak hilang (`D-122`).
- [ ] Keputusan verifikasi, review listing, dan pembatasan akun diterima pemandu dalam aplikasi serta email berisi alasan dan langkah berikutnya (`D-125`).
- [ ] Keputusan staf memiliki alasan dan jejak audit; perubahan relevan terlihat pada apps/web.
- [ ] Pembayaran checkout/pelunasan DP setelah tenggat dikembalikan penuh tanpa menghidupkan booking; kegagalan refund masuk antrean superadmin. Hanya superadmin mengakses fungsi keuangan dan pengelolaan staf.
- [ ] Superadmin dapat memeriksa penahanan sengketa dan permintaan pencairan; staf biasa tidak mengakses informasi atau aksi keuangan tersebut.
- [ ] Setiap permintaan pencairan memerlukan persetujuan/penolakan beralasan oleh superadmin setelah pemeriksaan ulang; status di dashboard pemandu mengikuti hasil mitra dan saldo sah tetap utuh bila ditolak/gagal (`D-123`).
- [ ] Staf meninjau bukti sengketa, superadmin memutuskan refund/pelepasan dana, dan saldo pemandu siap tarik hanya setelah keputusan final serta masa 7 hari terpenuhi.

## Gerbang end-to-end

- [ ] Data contoh untuk alur rilis sudah diganti atau dibatasi menjadi fixture pengembangan.
- [ ] Aksi tetap benar setelah reload; status kosong, loading, gagal, 401, dan 403 tertangani.
- [ ] Checkout bersamaan tidak overbook; reschedule, refund, dan kegagalan pembayaran tidak meninggalkan slot atau status salah.
- [ ] Fitur pada cakupan rilis diterima pengguna tanpa perbaikan terbuka.
