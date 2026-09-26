# Timeline apps/api — checklist backend

Status: **domain produk belum dibangun**; API saat ini hanya health check. Checkbox menunjukkan hasil yang bisa diverifikasi, bukan estimasi. Fitur di luar MVP tetap tercatat karena PRD mencakup seluruh visi.

## Fondasi lintas peran

- [x] Bootstrap Express, CORS, `GET /health`, dan error handler tersedia.
- [ ] PostgreSQL + Drizzle dipasang; migrasi awal ditinjau dan diterapkan, sedangkan kontrak API di [tdd.md](tdd.md) dibuktikan pada endpoint nyata (`D-138`).
- [ ] Better Auth dipasang di API dengan skema Drizzle/Express ESM; sesi dan OTP tiap peran diuji sebelum dipakai kedua aplikasi (`D-139`).
- [ ] Graphile Worker berjalan sebagai proses worker dengan job tenggat, retry aman, dan rekonsiliasi pada PostgreSQL (`D-140`).
- [ ] Vitest 4 menguji transaksi slot/booking/ledger yang konkurensinya nyata pada PostgreSQL pengujian (`D-143`).
- [ ] Autentikasi: wisatawan memakai nomor HP + sandi, pemandu/staf memakai email + sandi; daftar/undangan, masuk, keluar, verifikasi akun, dan pemulihan bekerja melalui API.
- [ ] OTP nomor HP wisatawan dikirim melalui WhatsApp; OTP pemandu/staf melalui email. Ketiganya memiliki tenggat, batas percobaan, pemakaian sekali, dan penyimpanan aman.
- [ ] OTP wajib pada verifikasi akun, pemulihan sandi, dan perubahan identitas wisatawan/pemandu; staf/superadmin wajib OTP pada setiap login.
- [ ] Manajemen sesi: validasi, kedaluwarsa, pencabutan, dan respons 401 diuji untuk `web` serta `web-admin`.
- [ ] Otorisasi: peran wisatawan, pemandu individu, pemilik/pengelola/pemandu anggota grup, staf, dan superadmin diuji pada tiap endpoint serta kepemilikan resource.
- [ ] Endpoint admin membatasi fungsi keuangan dan pengelolaan staf hanya untuk superadmin; respons 403 dan jejak audit diuji.
- [ ] Penyimpanan media dan dokumen pribadi memiliki izin akses serta aturan retensi.
- [ ] KTP dan swafoto pemandu individu/pemilik grup ditinjau staf sebelum menjual; pemandu anggota yang memimpin slot grup harus ditetapkan dan terverifikasi sebelum slot dijual.
- [ ] Sertifikat opsional yang disetujui menghasilkan badge tanpa menjadi syarat umum publikasi.
- [ ] Notifikasi transaksi booking, pembayaran, reschedule, refund, dan pencairan tersimpan dalam aplikasi bagi pihak terkait tanpa duplikasi.
- [ ] Konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, dan pencairan yang relevan dikirim lewat WhatsApp kepada wisatawan atau email kepada pemandu yang terdampak (`D-35`), terpisah dari OTP.

## Wisatawan dan katalog

- [ ] Akun, profil, preferensi, serta profil publik tersimpan.
- [ ] Listing individu dan grup dapat dicari/filter; detail, itinerary, rute, dan ulasan berasal dari data nyata.
- [ ] Detail trip memakai kegiatan, pin, dan segmen dari satu sumber data; API publik menyamarkan koordinat/geometri pin perkiraan dan API peserta terkonfirmasi menegakkan izin untuk versi tepat (`D-85`–`D-95`).
- [ ] Simpan trip tersedia bila masuk cakupan rilis; chat wisatawan–pemandu dicatat untuk fase berikutnya (`D-29`).
- [ ] Review hanya bisa dibuat oleh peserta yang memenuhi syarat setelah trip.

## Pemandu individu dan grup/agensi

- [ ] Grup memiliki satu pemilik, pengelola, dan pemandu anggota dengan izin `D-23`; listing/booking tetap milik grup walau anggota berubah.
- [ ] Pendapatan dan rekening pencairan grup terpisah dari rekening pribadi anggota; hanya pemilik grup berwenang mengelolanya.
- [ ] Listing, harga, foto, fasilitas, itinerary, dan rute dapat dibuat serta diubah.
- [ ] Event linimasa dapat merujuk satu pin, satu segmen, atau tanpa peta; pin dapat dipakai ulang/mandiri; segmen menyimpan titik belokan, moda, durasi, dan catatan serta jarak perkiraan dihitung (`D-85`–`D-92`).
- [ ] Offset waktu dan durasi perkiraan kegiatan (termasuk 0 menit) diturunkan menjadi tanggal/jam mulai-selesai dalam zona trip untuk setiap slot, termasuk lintas hari (`D-104`, `D-105`).
- [ ] Publikasi memerlukan linimasa dan pin titik temu/mulai, garis opsional; pin memiliki kategori platform dan visibilitas tepat/perkiraan (`D-93`–`D-96`).
- [ ] Perubahan trip setelah booking disimpan per versi: rute yang berubah ≥20%, risiko, dan aspek inti diklasifikasikan penting; koreksi kecil mengirim notifikasi aplikasi, perubahan penting aplikasi + WhatsApp dan menunggu keputusan. Diam mempertahankan versi lama; penolakan/pembatalan pemandu memberi refund penuh (`D-97`–`D-103`).
- [ ] **By day Repeat** menghasilkan slot sesuai [availability.md](../../../.docs/shared/availability.md).
- [ ] Semua pola Repeat memakai pilihan hari dalam pekan, tanggal mulai/akhir aturan, dan tanggal pengecualian dalam zona waktu trip (`D-63`).
- [ ] Durasi By day Repeat ditetapkan penyedia; sistem menurunkan tanggal selesai dari tanggal mulai.
- [ ] **By day Custom** menghasilkan slot sesuai tanggal yang dipilih.
- [ ] **By time Repeat hari + waktu** menghasilkan slot sesuai aturan berulang.
- [ ] **By time Custom hari + Repeat waktu** menghasilkan slot pada tanggal pilihan dengan jam berulang.
- [ ] **By time Custom hari + Custom waktu** menghasilkan pasangan tanggal/jam yang dipilih.
- [ ] By time memvalidasi durasi maksimal 24 jam dan membentuk tanggal+jam selesai dengan benar ketika melewati tengah malam.
- [ ] Durasi tepat 24 jam diterima pada By day maupun By time; semua slot menyimpan zona waktu lokasi trip.
- [ ] Zona waktu diisi dari lokasi Indonesia (WIB/WITA/WIT), dapat dikoreksi pemandu sebelum publikasi, dan dipakai konsisten untuk slot.
- [ ] Pengecualian, penutupan, batas booking, kapasitas, zona waktu, dan bentrok pemandu ditangani.
- [ ] Batas booking baru 15 menit/24 jam/3 hari/7 hari dipilih per listing dan ditolak server bila terlewati, untuk semua pola slot (`D-64`).
- [ ] Penutupan tanggal Repeat hanya menghentikan penjualan baru; booking lama tetap berlaku dan diarahkan ke reschedule/pembatalan jika pemandu berhalangan (`D-62`).
- [ ] Bentrok interval pemandu dicegah sejak tahanan checkout di seluruh listing, termasuk lintas tengah malam; Sharing pada keberangkatan yang sama tetap satu interval (`D-61`).
- [ ] Pergantian pemandu grup pada booking hanya menerima pengganti terverifikasi yang tidak bentrok; wisatawan menerima notifikasi dalam aplikasi dan WhatsApp dengan profil publik pengganti (`D-67`, `D-68`).
- [ ] Dashboard penyedia mengembalikan empat ringkasan, tugas yang benar-benar menunggu tindakan pemandu, dan tiga keberangkatan unik terdekat; Sharing tidak dihitung per booking dan booking otomatis bukan tugas persetujuan (`D-106`, `D-107`, `D-110`, `D-114`).
- [ ] Grafik hak bersih trip selesai konsisten dengan ledger/refund/sengketa, membagi ditahan/siap tarik/sudah dicairkan, dan mengelompokkan minggu/bulan menurut zona laporan profil (default WIB) (`D-108`, `D-109`, `D-111`, `D-115`).
- [ ] Agregasi dashboard dipisah per entitas Pribadi/Grup; API menolak akses data keuangan grup bagi pengelola/anggota serta data entitas lain (`D-23`, `D-113`).

## Booking dan pembayaran

- [ ] Checkout, DP, dan pelunasan rilis awal hanya memakai QRIS; total merinci harga trip dan biaya layanan 2% yang ditagih sekali pada pembayaran pertama, tanpa biaya gateway QRIS terpisah (`D-70`, `D-74`, `D-77`).
- [ ] Ledger memisahkan komisi 10% dari hak pemandu setelah refund, biaya QRIS/pencairan yang ditanggung AturTrip, serta refund penuh seluruh uang wisatawan pada pembatalan pemandu atau checkout terlambat (`D-71`, `D-72`, `D-76`).
- [ ] Refund parsial/penuh lewat jalur QRIS asli bila tersedia, atau transfer mitra ke rekening/e-wallet wisatawan terverifikasi bila tidak; idempotensi mencegah refund ganda dan pengecualian masuk antrean superadmin (`D-82`).
- [ ] Biaya transfer refund cadangan dibayar AturTrip; sengketa QRIS eksternal setelah payout dibebankan sementara ke cadangan risiko platform, dengan pemulihan dari penyedia hanya berdasarkan keputusan superadmin dan bukti (`D-83`, `D-84`).
- [ ] Checkout menahan kapasitas sementara; booking terkonfirmasi otomatis setelah pembayaran yang diwajibkan berhasil tanpa persetujuan manual pemandu.
- [ ] Tahanan slot tepat 15 menit dan masa pembayaran gateway diselaraskan; kegagalan/kedaluwarsa melepas slot, sedangkan keberhasilan setelah tenggat tidak mengonfirmasi dan dananya dikembalikan penuh (`D-55`).
- [ ] Reservasi kapasitas atomik mencegah overbooking pada checkout bersamaan.
- [ ] Bentrok slot lintas tengah malam diperiksa terhadap seluruh interval, termasuk jadwal pada hari berikutnya.
- [ ] Listing hanya satu tipe: Privat mengunci seluruh keberangkatan untuk satu booking, Sharing mengurangi kursi per booking/tahanan.
- [ ] Reschedule mengalokasikan slot baru secara aman dan menyesuaikan slot lama sesuai kebijakan.
- [ ] Pemandu dapat mengajukan reschedule; jika wisatawan memilih refund karena pemandu tidak tersedia, seluruh pembayaran termasuk biaya layanan dikembalikan.
- [ ] Pembatalan booking terkonfirmasi oleh pemandu mengembalikan seluruh pembayaran termasuk biaya layanan untuk semua alasan (`D-53`).
- [ ] Template Fleksibel/Sedang/Ketat dipilih per listing dan disalin ke booking; pembatalan wisatawan memakai tabel 100%/50%/25% pada `D-47`, dengan biaya layanan tidak dikembalikan.
- [ ] No-show wisatawan tidak memberi refund biasa; sengketa yang sah tetap dapat diajukan (`D-48`).
- [ ] Reschedule wisatawan memerlukan persetujuan pemandu dan slot tersedia; batas refund dibekukan saat persetujuan, serta tenggat DP tidak diperpanjang (`D-49`–`D-51`).
- [ ] Reschedule pemandu yang diterima wisatawan menghitung ulang tenggat DP; sisa harus lunas lebih dahulu bila tenggat baru kurang dari 24 jam (`D-52`).
- [ ] Pengajuan sengketa biasa hanya diterima hingga 48 jam setelah waktu selesai booking final; reschedule mengubah acuan waktu dan sengketa aktif menahan dana.
- [ ] Harga, biaya, penuh/DP, pelunasan DP melalui platform, webhook, refund, dan pencairan direkonsiliasi serta aman dari pemrosesan ganda.
- [ ] Jika listing menawarkan DP, penyedia memilih tenggat pelunasan 7 hari, 3 hari, atau 24 jam sebelum trip; booking menyimpan pilihan itu dan menampilkan jumlah tersisa serta batasnya.
- [ ] Opsi DP hanya tersedia bila tenggat pelunasan masih berjarak sedikitnya 24 jam saat checkout; setelah itu hanya bayar penuh (`D-38`).
- [ ] Sisa DP yang belum lunas saat tenggat membatalkan booking otomatis, melepas kapasitas, dan memproses refund menurut snapshot template pembatalan booking secara idempotent (`D-37`).
- [ ] Pembayaran checkout atau pelunasan DP yang masuk setelah tenggat tidak menghidupkan booking; dana terlambat dikembalikan penuh dan kegagalan refund masuk antrean superadmin (`D-55`, `D-56`).
- [ ] Trip yang berhasil terlaksana memiliki waktu selesai final; setelah reschedule, hitungan pencairan memakai waktu selesai yang baru.
- [ ] Dana tetap dalam masa tunggu sampai 7 hari setelah waktu selesai final, serta tetap tertahan ketika ada sengketa aktif.
- [ ] Setelah 7 hari tanpa sengketa, dana berpindah tepat sekali ke saldo siap tarik; sistem tidak mengirim pencairan otomatis.
- [ ] Setelah sengketa selesai, superadmin menetapkan pembagian dana; bagian pemandu siap tarik hanya setelah keputusan final dan masa 7 hari sama-sama terpenuhi (`D-59`, `D-60`).
- [ ] Shortlist DOKU/Xendit diuji terhadap penahanan dana hingga trip selesai + 7 hari, refund, sengketa, serta payout atas permintaan; mitra final dipilih setelah kelayakan kontrak diperiksa (`D-57`, `D-58`).
- [ ] Hanya pemandu individu atau pemilik grup yang dapat meminta pencairan saldo siap tarik ke rekening terverifikasi; saldo, sengketa, dan permintaan ganda diperiksa ulang.
- [ ] Satu permintaan pencairan memesan seluruh saldo siap tarik entitas secara atomik dengan minimum Rp100.000; saldo dalam proses tidak dapat diminta ulang, penolakan/gagal yang direkonsiliasi mengembalikan haknya, dan biaya transfer dibayar AturTrip (`D-71`, `D-80`, `D-123`). Pengecualian penutupan akun hanya setelah kewajiban selesai.

## Admin

- [ ] Event kunjungan sampai checkout dan sumber/referral/kampanye dari web tervalidasi, tanpa data pribadi, aman dari duplikasi/bot serta terhubung ke perjalanan booking yang tepat (`D-130`, `D-135`).
- [ ] Agregat harian WIB untuk pertumbuhan, permintaan, pasokan, konversi, kualitas, dan keuangan dibangun dari event serta data booking/ledger nyata; koreksi status historis dan DP tidak menggandakan hitungan (`D-127`–`D-136`).
- [ ] Endpoint analitik dan CSV menerapkan filter/perbandingan yang sama, menunjukkan waktu pembaruan/definisi, serta menolak akses keuangan bagi staf biasa (`D-129`, `D-131`–`D-134`).
- [ ] Origin browser `apps/web` dan `apps/web-admin` diizinkan secara eksplisit sesuai lingkungan; sesi serta izin API tetap diuji untuk kedua aplikasi.
- [ ] Verifikasi identitas wajib serta sertifikasi opsional pemandu/grup memiliki alur, status, dan jejak keputusan; setiap listing baru juga menunggu persetujuan staf sebelum terbit (`D-116`).
- [ ] Versi listing aktif dan usulan perubahan penting sesuai daftar `D-126` dipisah; koreksi kecil langsung tampil, sedangkan review staf tidak mengubah versi booking atau menggantikan persetujuan wisatawan (`D-117`).
- [ ] API moderasi mencegah staf mengedit isi trip/booking; penyembunyian listing menghentikan penjualan baru tanpa membatalkan booking lama (`D-118`, `D-121`, `D-124`).
- [ ] Laporan listing, perilaku, dan trip/booking ditriase terpisah dari sengketa keuangan; laporan biasa tidak menahan dana otomatis (`D-120`).
- [ ] Antrean admin sesuai izin menampilkan verifikasi, review listing, laporan/sengketa, serta masalah refund hanya untuk superadmin (`D-119`).
- [ ] Pembatasan akun sementara oleh staf dan penutupan permanen oleh superadmin memeriksa izin, alasan, dan kewajiban akun (`D-122`).
- [ ] Setiap permintaan pencairan memerlukan keputusan superadmin dan validasi ulang; penolakan atau kegagalan mitra tidak menghilangkan saldo sah dan tidak menggandakan transfer (`D-123`).
- [ ] Hasil verifikasi, review listing, dan pembatasan akun terkirim kepada pemandu melalui notifikasi aplikasi serta email yang aman (`D-125`).
- [ ] Moderasi listing, laporan, sengketa, dan tindakan akun memiliki hak akses serta jejak audit.
- [ ] Fungsi keuangan dan penambahan/pengelolaan staf hanya dapat dipakai superadmin; staf biasa ditolak API walau memanggil endpoint langsung.

## Gerbang fase

- [ ] Kasus kapasitas bersamaan, transisi status, 401/403, kepemilikan resource, kegagalan pembayaran, snapshot kebijakan, batas sengketa 48 jam, batas pencairan 7 hari, dan permintaan pencairan ganda diuji.
- [ ] Kontrak API untuk kemampuan rilis siap dipakai web dan diterima setelah review fitur.
