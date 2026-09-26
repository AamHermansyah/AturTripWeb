# PRD — apps/web

Status: **draf kebutuhan aplikasi wisatawan dan pemandu untuk seluruh visi produk**. Keputusan lintas aplikasi ada di [decisions.md](../../../.docs/shared/decisions.md). Cakupan rilis awal yang telah disepakati ditandai di bagian terkait; rincian yang masih terbuka dicatat terpisah. Panel staf admin berada di `apps/web-admin`. Jangan menafsirkan layar yang sudah ada sebagai fitur yang telah berfungsi.

## 1. Tujuan produk

AturTrip adalah marketplace web dan mobile web yang menghubungkan wisatawan dengan pemandu lokal Indonesia. Produk mengurangi pencarian dan pemesanan manual lewat WhatsApp, memberi wisatawan informasi trip yang jelas sebelum memesan, dan memberi pemandu sarana mengelola layanan serta pesanan.

Nilai pembeda utama: **linimasa kegiatan terstruktur sebelum booking**. Kepercayaan dibangun lewat identitas/sertifikasi yang terverifikasi, ulasan, informasi rute, dan status pemesanan yang jelas.

## 2. Pengguna dan kebutuhan

| Peran | Kebutuhan utama |
| --- | --- |
| Wisatawan | Menemukan trip yang cocok, memahami kegiatan dan risiko, mengetahui harga/ketersediaan, memesan, membayar, memantau pesanan, memberi ulasan. |
| Pemandu/penyedia | Membuat layanan, mengatur jadwal/kapasitas, menangani pesanan, menunjukkan kredibilitas, melihat pendapatan. |

Pemandu individu serta grup/agensi sama-sama dapat menjual trip sejak MVP (`D-07`). Listing, booking, dan pendapatan grup dimiliki entitas grup; pemilik mengelola anggota dan rekening pencairan, pengelola menangani listing/slot/pesanan, dan pemandu anggota melihat tugas trip yang diberikan (`D-23`). Wilayah rilis awal terbuka di seluruh Indonesia (`D-43`); tidak ada kuota tetap pemandu atau kategori, dan katalog mengikuti listing yang lolos review (`D-65`). Wisatawan masuk dengan nomor HP + sandi dan OTP WhatsApp; pemandu dengan email + sandi dan OTP email. OTP mereka wajib pada verifikasi, pemulihan, dan perubahan identitas (`D-22`, `D-26`). Layar serta aksi web mengikuti izin yang dikembalikan API.

## 3. Perjalanan utama

1. Wisatawan mencari dan membandingkan trip.
2. Wisatawan membuka detail: deskripsi, harga, linimasa kegiatan, rute, persiapan, profil pemandu, dan ulasan.
3. Wisatawan memilih slot pada listing yang telah ditetapkan pemandu sebagai **Privat atau Sharing**, jumlah peserta, serta opsi pembayaran yang tersedia. Untuk By day Repeat, durasi ditetapkan pemandu dan wisatawan memilih tanggal mulai.
4. Saat checkout, slot ditahan **15 menit** dan instruksi pembayaran gateway mengikuti batas yang sama. Setelah pembayaran yang diwajibkan berhasil dalam masa tahan, booking terkonfirmasi otomatis tanpa persetujuan manual pemandu (`D-08`, `D-11`, `D-16`). Pembayaran gagal atau masa tahan berakhir mengembalikan kapasitas; pembayaran setelah tenggat tidak otomatis mengonfirmasi (`D-20`, `D-25`).
5. Wisatawan dapat memberi ulasan setelah trip selesai; penyedia melihat hasil transaksi dan pencairan sesuai kebijakan yang disetujui.

## 4. Kebutuhan fungsional

Persyaratan berikut mencakup **seluruh visi produk** (`D-06`). Rilis awal sudah mencakup pemandu individu dan grup, lima pola slot, booking otomatis, QRIS/DP, verifikasi dan review listing, notifikasi transaksi, dashboard pemandu, serta operasi dan analitik admin sesuai keputusan bersama. Chat, live tracking, SOS, dan kupon platform berada pada fase berikutnya (`D-28`, `D-29`, `D-81`). Detail yang belum diputuskan tetap dicatat sebagai pertanyaan terbuka, bukan diasumsikan selesai.

| ID | Kemampuan | Hasil yang harus tampak bagi pengguna |
| --- | --- | --- |
| A-01 | Akun dan akses | Wisatawan mendaftar/masuk dengan nomor HP + sandi, pemandu dengan email + sandi. OTP wajib saat verifikasi akun, pemulihan sandi, dan perubahan nomor HP/email: WhatsApp bagi wisatawan, email bagi pemandu. Login rutin tidak meminta OTP. Keduanya dapat keluar dan menangani sesi kedaluwarsa; aksi mengikuti izin API. |
| C-01 | Katalog, pencarian, dan filter | Wisatawan dapat menemukan trip berdasarkan lokasi, harga, durasi, kategori/spesialisasi, bahasa, dan ketersediaan; hasil sesuai filter yang dipilih. Hanya versi listing yang lolos review staf serta aktif tersedia untuk penjualan (`D-116`–`D-118`). |
| C-02 | Detail trip dan linimasa | Sebelum booking, wisatawan dapat membaca urutan kegiatan, waktu, titik penting, informasi persiapan, fasilitas, harga, dan identitas penyedia. |
| C-03 | Peta rute | Detail trip menampilkan rute dan checkpoint yang berasal dari data trip; data elevasi ditampilkan jika tersedia. |
| C-04 | Ketersediaan | Penyedia dapat memilih satu dari lima pola By day/By time; By time berlaku hingga 24 jam meski melewati tengah malam, dan tepat 24 jam boleh juga By day. Repeat memilih hari pekan, tanggal mulai/akhir, serta pengecualian; batas booking baru per listing adalah 15 menit, 24 jam, 3 hari, atau 7 hari sebelum trip (`D-63`, `D-64`). Untuk By day Repeat, penyedia menetapkan durasi. Zona waktu trip adalah WIB/WITA/WIT sesuai lokasi, terisi otomatis dan bisa dikoreksi penyedia. Tanggal dan kapasitas sesuai data terbaru; kapasitas tidak dapat terlampaui. Rincian di [availability.md](../../../.docs/shared/availability.md). |
| C-05 | Booking Privat/Sharing | Tipe dipilih per listing dan tidak dicampur. Privat memberi satu pihak pemesan seluruh slot; Sharing menjual kursi hingga kapasitas habis. Wisatawan memilih slot dan peserta; ringkasan harga serta waktu mulai–selesai jelas sebelum checkout. |
| C-06 | Pembayaran dan status | Slot dan instruksi pembayaran gateway memiliki tenggat 15 menit yang sama; booking otomatis terkonfirmasi setelah pembayaran yang diwajibkan berhasil dalam masa tahan. Wisatawan melihat tagihan, opsi penuh/DP bila tersedia, tenggat pelunasan DP 7 hari/3 hari/24 jam sebelum trip yang dipilih penyedia, serta status transaksi. Opsi DP tersembunyi bila pada saat checkout tenggatnya kurang dari 24 jam lagi atau sudah lewat; hanya bayar penuh tersedia (`D-36`, `D-38`). Pelunasan DP tetap melalui AturTrip. Jika sisa DP belum dibayar saat tenggat, booking batal otomatis; refund harga trip yang sudah dibayar mengikuti template booking dan biaya layanan tidak dikembalikan (`D-54`). Pembayaran gagal/kedaluwarsa saat checkout melepaskan slot; pembayaran setelah tenggat checkout tidak otomatis mengonfirmasi (`D-20`). |
| C-07 | Pengelolaan pesanan wisatawan | Wisatawan dapat melihat riwayat, detail, serta meminta perubahan jadwal; jadwal baru berlaku setelah pemandu menyetujui dan slot tersedia. Bila ditolak, jadwal lama tetap berlaku (`D-49`). Pembatalan mengikuti template kebijakan yang dipilih pemandu pada listing dan ditampilkan sebelum bayar (`D-30`, `D-47`). Untuk pembatalan sukarela, biaya layanan tidak dikembalikan dan syaratnya tampil jelas sebelum bayar (`D-45`). Tidak hadir tanpa membatalkan sebelum trip mulai tidak memberi refund biasa (`D-48`). Sengketa melalui alur biasa dapat diajukan hingga 48 jam setelah waktu selesai trip final (`D-31`). |
| C-08 | Ulasan | Wisatawan yang menyelesaikan trip dapat memberi ulasan; profil dan listing menampilkan ulasan yang sah. |
| C-09 | Notifikasi transaksi (rilis pertama) | Semua pihak terkait melihat pembaruan transaksi yang relevan dalam aplikasi. Konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, dan pencairan yang relevan juga dikirim via WhatsApp ke wisatawan dan email ke pemandu sesuai pihak yang terdampak (`D-35`). Penggantian pemandu grup juga diberitahukan kepada wisatawan dalam aplikasi dan WhatsApp dengan profil publik pengganti (`D-68`). |
| C-13 | Peristiwa analitik pasar | Web mencatat kunjungan, pencarian/filter, pembukaan detail trip, pilihan slot, dan mulai checkout, termasuk pengunjung belum masuk. Sumber/referral/kampanye ditautkan bila tersedia. Data ini mendukung analitik pasar admin; status pembayaran, booking, dan trip selesai berasal dari API, bukan klaim browser (`D-127`–`D-135`). |
| C-10 | Chat (fase berikutnya) | Wisatawan dan penyedia dapat berkomunikasi terkait trip melalui platform setelah kemampuan inti rilis pertama stabil. |
| C-11 | Live tracking (fase berikutnya) | Bila dikembangkan, peserta berizin dapat melihat posisi perjalanan sesuai kebijakan privasi yang ditetapkan sebelum fase tersebut. |
| C-12 | SOS (fase berikutnya) | Bila dikembangkan, peserta dapat memicu bantuan melalui alur keselamatan yang didefinisikan sebelum fase tersebut. |
| P-01 | Pembuatan listing | Penyedia dapat mengisi foto, deskripsi, timeline kegiatan, rute, harga, kapasitas, dan add-on opsional melalui alur bertahap. Jika menawarkan DP, penyedia memilih tenggat pelunasan 7 hari, 3 hari, atau 24 jam sebelum trip (`D-36`). Identitas penyedia harus terverifikasi dan **setiap listing baru harus disetujui staf** sebelum terbit; pemandu melihat status review, alasan revisi, serta versi aktif versus usulan perubahan penting. Harga/syarat, foto utama, titik temu, kegiatan/rute inti, durasi, kapasitas, dan tingkat kesulitan memicu review ulang (`D-126`). Sertifikat opsional untuk badge (`D-42`, `D-116`–`D-118`). |
| P-07 | Laporan dan hasil moderasi | Wisatawan/pemandu dapat melaporkan listing, perilaku, atau masalah trip/booking. Pemandu menerima hasil verifikasi, review listing, dan pembatasan akun melalui aplikasi serta email, dengan alasan dan langkah berikutnya. Listing yang disembunyikan berhenti menerima booking baru, sementara booking lama tetap tersedia untuk ditangani (`D-120`, `D-121`, `D-125`). |
| P-02 | Kalender penyedia | Penyedia dapat memilih pola By day/By time, menetapkan pengulangan atau tanggal/waktu custom, blokir hari, dan kapasitas sesuai [availability.md](../../../.docs/shared/availability.md). |
| P-03 | Penanganan pesanan | Penyedia dapat melihat booking yang otomatis dikonfirmasi, perubahan jadwal, pembatalan, dan status pembayaran tanpa tahap persetujuan booking manual. Jika tidak dapat memenuhi slot yang sudah terpesan, penyedia dapat mengajukan reschedule; bila wisatawan memilih refund, seluruh pembayaran termasuk biaya layanan dikembalikan (`D-19`). Pembatalan booking terkonfirmasi oleh pemandu sendiri juga mendapat refund penuh termasuk biaya layanan (`D-53`). |
| P-04 | Profil dan keuangan | Penyedia melihat pendapatan per trip, waktu selesai yang tercatat, masa tunggu 7 hari, status sengketa, saldo siap tarik yang dapat diminta, serta nominal/status permintaan pencairan yang sedang diproses. Setelah 7 hari tanpa sengketa, pemandu individu/pemilik grup dapat meminta pencairan; superadmin memeriksa setiap permintaan dan dana tidak dikirim otomatis (`D-27`, `D-123`). Pemandu individu/pemilik grup mengirim KTP dan swafoto untuk verifikasi staf sebelum menjual (`D-40`). Sertifikat opsional yang disetujui tampil sebagai badge (`D-42`). |
| P-05 | Kebijakan pembatalan listing | Saat membuat listing, penyedia memilih satu dari tiga template pembatalan wisatawan: Fleksibel, Sedang, atau Ketat (`D-44`). Batas 100%/50%/25% masing-masing mengikuti `D-47` dan ditampilkan jelas sebelum checkout, bersama biaya layanan yang tidak dikembalikan bila wisatawan membatalkan sendiri (`D-45`). Template tidak dapat diganti untuk booking yang sudah terjadi. |
| P-06 | Dashboard awal pemandu | Pada mobile, tampil empat ringkasan: trip mendatang, tugas perlu ditangani, pendapatan periode ini, dan saldo siap tarik; diikuti daftar tugas, tiga keberangkatan terdekat, dan satu grafik pendapatan (`D-106`–`D-114`). Grafik hak bersih dari trip selesai memakai bulan berjalan atau enam bulan terakhir, membedakan dana ditahan/siap tarik/sudah dicairkan. Pemandu dengan trip pribadi dan grup memilih konteks tanpa mencampur data; pengelola/anggota tidak melihat keuangan grup (`D-113`). Zona laporan keuangan dari profil konteks, default WIB, ditampilkan jelas (`D-115`). Detail lengkap di [dashboard pemandu](../../../.docs/shared/guide-dashboard.md). |
| G-01 | Pengelolaan grup/agensi | Pemilik mengelola anggota dan rekening pencairan grup. Pengelola mengurus listing, slot, dan pesanan grup tanpa fungsi pencairan. Pemandu anggota harus ditetapkan serta lolos verifikasi sebelum slot dijual (`D-66`). Pengganti pada booking berjalan harus terverifikasi dan tidak bentrok; wisatawan diberi tahu. Bila tidak ada pengganti, grup menawarkan reschedule atau membatalkan dengan refund penuh (`D-67`). Listing/booking dan pendapatan tetap tercatat atas grup. |

## 5. Prinsip pengalaman

Linimasa kegiatan dan peta rencana **memakai data trip yang sama**. Pemandu dapat menautkan kegiatan ke satu pin, satu segmen rute, atau tanpa referensi peta. Pin informasi mandiri seperti mata air tetap tampil walau tidak terhubung garis. Garis antar-pin dapat dibentuk dengan titik belokan; detail segmen menunjukkan asal/tujuan, jarak perkiraan, moda, estimasi durasi, dan catatan. Mengetuk kegiatan, pin, atau segmen pada detail trip saling menyorot dan memberi fokus yang sesuai (`D-85`–`D-92`). Rincian ada di [linimasa dan peta](../../../.docs/shared/itinerary-map.md).

Waktu kegiatan disusun sebagai selisih dari awal trip ditambah durasi perkiraan; kegiatan sesaat boleh 0 menit. Saat wisatawan memilih slot mulai, jam dan tanggal mulai/selesai kegiatan dihitung ulang di zona waktu lokasi; linimasa tetap sama meski jam keberangkatan berbeda atau perjalanan melewati tengah malam (`D-104`, `D-105`).

Sebelum terbit, listing memerlukan linimasa dan minimal satu pin titik temu/mulai; garis rute opsional. Pemandu memilih kategori pin platform, nama/keterangan, dan apakah koordinat tepat tampil sebelum booking. Pin perkiraan serta ujung garis terkait disamarkan pada tampilan publik; peserta dengan booking terkonfirmasi mendapat koordinat tepat (`D-93`–`D-96`). Ini peta **rencana trip**; GPS langsung tetap fase berikutnya (`D-86`).

Perubahan kecil setelah ada booking diberitahukan dengan versi yang jelas. Perubahan penting perlu persetujuan wisatawan atau pilihan refund sebelum berlaku pada booking mereka; jam mulai mengikuti reschedule dan titik temu utama memerlukan persetujuan (`D-97`, `D-98`).

Perubahan penting mencakup kegiatan inti, tujuan, moda, durasi, kesulitan, peningkatan risiko, perubahan wilayah/medan utama, atau perubahan jarak/durasi rute ≥20%. Wisatawan yang menolak mendapat refund penuh termasuk biaya layanan; bila tidak merespons, versi lama tetap berlaku dan pemandu menjalankannya atau membatalkan dengan refund penuh. Perubahan kecil diberitahukan di aplikasi; perubahan penting juga melalui WhatsApp berisi tautan persetujuan/penolakan (`D-99`–`D-103`).

Pada rilis awal, checkout hanya menawarkan **QRIS** untuk pembayaran penuh, DP, dan pelunasan (`D-77`). Ringkasan checkout menampilkan harga trip, setiap add-on pemandu, biaya layanan **2% atas jumlah keduanya**, dan total; seluruh biaya layanan dibayar pada transaksi pertama jika memakai DP (`D-70`, `D-74`, `D-78`). Tidak ada biaya gateway QRIS terpisah. Tampilan pendapatan pemandu menunjukkan hipotesis komisi **10% dari hak pemandu setelah refund** dan biaya pencairan ditanggung AturTrip (`D-71`, `D-72`); tarif produksi masih perlu divalidasi. Lihat [monetisasi](../../../.docs/shared/monetization.md).

Harga trip dan seluruh add-on pemandu pada booking mengikuti **template refund listing yang sama** saat wisatawan membatalkan atau DP kedaluwarsa (`D-79`); syaratnya terlihat sebelum checkout.

Jika refund langsung ke sumber QRIS tidak tersedia, wisatawan dapat memberikan rekening atau e-wallet miliknya untuk diverifikasi dan menerima pengembalian lewat mitra. Status serta nominal refund tetap terlihat pada detail booking; kegagalan ditangani superadmin (`D-82`).

Permintaan pencairan oleh pemandu individu/pemilik grup menggabungkan seluruh saldo siap tarik entitas terkait dengan minimum **Rp100.000**; sisa di bawah minimum menunggu saldo bertambah, kecuali penutupan akun yang sah (`D-80`).

- Antarmuka berbahasa Indonesia dan nyaman digunakan pada layar ponsel.
- Informasi sebelum booking harus mudah ditemukan: apa yang dilakukan, kapan, di mana, bersama siapa, biaya, dan syarat fisik/peralatan.
- Status verifikasi, ulasan, dan rekam jejak ditampilkan dengan jelas tanpa menyiratkan verifikasi yang belum dilakukan.
- Harga, biaya tambahan, DP, dan kebijakan pembatalan terlihat sebelum wisatawan mengonfirmasi pesanan.

## 6. Ukuran keberhasilan yang perlu disepakati

Belum ada target numerik yang disetujui. Kandidat sinyal: wisatawan yang berhasil menemukan trip dan membuka detail; tingkat mulai/selesai booking; pesanan yang berhasil dibayar dan terlaksana; waktu penyedia merespons; pembatalan/sengketa; jumlah penyedia dan listing aktif. Definisi serta target metrik ditentukan bersama pemilik produk sebelum rilis.

## 7. Hal yang belum ditetapkan

Aturan produk yang disetujui serta butir yang masih terbuka ada di [decisions.md](../../../.docs/shared/decisions.md). Pemilihan mitra dan tarif pembayaran final masih menunggu uji serta kontrak (`D-57`, `D-70`); cakupan **saved** belum diputuskan (`O-23`). Live tracking, SOS, chat, dan kupon platform masuk fase setelah rilis pertama (`D-28`, `D-29`, `D-81`), sedangkan notifikasi transaksi masuk rilis pertama.

## 8. Hubungan dengan implementasi

Status kode di [current-state.md](current-state.md), pekerjaan web di [timeline.md](timeline.md), dan keputusan teknologi di [tdd.md](tdd.md). Kontrak domain serta penegakan izin berada pada [PRD API](../../api/.docs/prd.md).
