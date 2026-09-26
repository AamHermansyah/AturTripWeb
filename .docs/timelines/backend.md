# Fase backend — ringkasan lintas aplikasi

Sumber checklist rinci adalah [timeline apps/api](../../apps/api/.docs/timeline.md). File ringkas ini menandai gerbang yang diperlukan oleh kedua aplikasi web.

- [x] Kerangka Express dan `GET /health` tersedia.
- [ ] **Autentikasi** API: nomor HP + sandi dan OTP WhatsApp untuk wisatawan; email + sandi dan OTP email untuk pemandu/staf. OTP wajib pada alur penting wisatawan/pemandu dan setiap login staf; sesi dan kedaluwarsa bekerja.
- [ ] **Otorisasi** API: peran wisatawan, pemandu, pemilik/pengelola/pemandu anggota grup, staf, dan superadmin dibatasi pada endpoint serta resource miliknya.
- [ ] Endpoint staf admin menolak akses tak berhak dengan 401/403; keuangan dan pengelolaan staf hanya untuk superadmin, serta aksi sensitif tercatat.
- [ ] Listing/booking/pendapatan grup tetap dimiliki grup dan rekening pencairan grup hanya dikelola pemiliknya.
- [ ] KTP dan swafoto penyedia wajib diverifikasi sebelum menjual; sertifikat opsional hanya memberi badge setelah disetujui.
- [ ] Setiap listing baru menjalani review staf sebelum katalog; versi usulan perubahan penting terpisah dari versi aktif dan versi booking (`D-116`, `D-117`).
- [ ] Antrean admin, laporan operasional, moderasi tanpa edit konten/booking, pembatasan akun, dan notifikasi keputusan berjalan sesuai izin serta jejak audit (`D-118`–`D-122`, `D-124`, `D-125`).
- [ ] Event perilaku web dan status transaksi API membentuk agregat analitik pasar harian WIB yang dapat diaudit; filter, perbandingan 30 hari, koreksi terlambat, CSV, dan pemisahan akses keuangan bekerja (`D-127`–`D-136`).
- [ ] Database, listing, lima pola slot, booking otomatis, pembayaran/DP melalui platform, refund, dan operasi admin siap sesuai keputusan produk.
- [ ] Agregasi dashboard pemandu memakai keberangkatan unik, tugas operasional yang perlu tindakan, hak bersih trip selesai, status dana, serta izin Pribadi/Grup tanpa mencampur saldo (`D-106`–`D-115`).
- [ ] Kegiatan, pin, dan segmen rute memakai satu model; publikasi memvalidasi titik temu/mulai, API publik menyamarkan geometri perkiraan, dan versi perubahan setelah booking mengikuti klasifikasi, persetujuan/refund, serta notifikasi (`D-85`–`D-103`).
- [ ] Pembayaran rilis awal QRIS saja; komisi 10% dan biaya layanan 2% masih hipotesis tarif, dengan biaya QRIS/pencairan pada AturTrip dan komisi hanya dari hak pemandu setelah refund (`D-69`–`D-77`).
- [ ] Harga trip dan add-on pemandu menjadi dasar komisi/biaya layanan dan mengikuti satu template refund; pencairan menggabungkan saldo siap tarik dengan minimum Rp100.000, kecuali penutupan akun sah (`D-78`–`D-80`).
- [ ] Repeat menghasilkan slot dari hari pekan, rentang tanggal, dan pengecualian; batas booking baru 15 menit/24 jam/3 hari/7 hari dipilih per listing dan dicek API.
- [ ] Dana trip terlaksana menunggu 7 hari sejak waktu selesai final; sengketa menahan dana, lalu saldo siap tarik hanya dicairkan atas permintaan pemandu/pemilik grup.
- [ ] Setiap permintaan pencairan diperiksa dan diputuskan superadmin sebelum instruksi payout, dengan validasi ulang dan pemulihan saldo bila ditolak/gagal (`D-123`).
- [ ] Setelah sengketa diputuskan superadmin, bagian hak pemandu baru siap tarik jika masa 7 hari juga lewat. Shortlist DOKU/Xendit diuji untuk penahanan dan pencairan; rekening khusus AturTrip hanya opsi cadangan setelah ditinjau.
- [ ] Tenggat pelunasan DP 7 hari, 3 hari, atau 24 jam sebelum trip dipilih penyedia per listing dan disimpan pada booking tanpa mengubah syarat pesanan lama.
- [ ] Opsi DP ditolak bila tenggatnya kurang dari 24 jam saat checkout; sisa DP yang terlambat membatalkan booking otomatis dan memicu refund sesuai snapshot template pembatalan.
- [ ] Snapshot template Fleksibel/Sedang/Ketat tersimpan pada booking; refund wisatawan mengikuti batas 100%/50%/25% dan biaya layanan tidak dikembalikan, sedangkan pembatalan pemandu mengembalikan semuanya.
- [ ] Reschedule wisatawan/pemandu, batas refund setelah reschedule, tenggat DP yang berubah, serta no-show mengikuti keputusan `D-48`–`D-53`.
- [ ] Sengketa biasa dibatasi 48 jam setelah trip selesai final dan menahan dana bila aktif.
- [ ] Notifikasi transaksi rilis pertama tersimpan dalam aplikasi; konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, dan pencairan yang relevan juga memakai WhatsApp wisatawan/email pemandu. Chat, live tracking, dan SOS dijadwalkan setelah rilis pertama.
- [ ] Uji kapasitas bersamaan, hak akses lintas peran, transaksi gagal, tenggat gateway 15 menit, batas 7 hari, sengketa, dan rekonsiliasi status terlambat lulus.
