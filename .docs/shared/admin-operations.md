# Operasi web-admin rilis awal

Panel staf berada di `apps/web-admin`. `apps/api` menyimpan status dan memeriksa izin; `apps/web` menampilkan akibat keputusan bagi wisatawan dan pemandu. Detail keputusan ada pada `D-116`–`D-126` di [keputusan bersama](decisions.md). [Analitik pasar](admin-analytics.md) adalah area dashboard lain yang memakai agregat harian. Panel admin saat ini masih kerangka, sehingga seluruh alur di bawah adalah kebutuhan, bukan fitur yang telah berfungsi.

## Menu awal dan izin

| Area | Staf | Superadmin | Dampak pada web wisatawan/pemandu |
| --- | --- | --- | --- |
| Dashboard kerja | Antrean verifikasi, listing, laporan, dan sengketa | Antrean yang sama ditambah refund gagal/pengecualian keuangan | Status dan tindakan yang menunggu terlihat pada akun terkait. |
| Verifikasi penyedia | Tinjau KTP/swafoto dan sertifikat opsional; putuskan dengan alasan | Sama | KYC bersama review listing menentukan kelayakan menjual; sertifikat disetujui memberi badge. |
| Trip dan moderasi | Tinjau setiap listing baru/perubahan penting, minta revisi, sembunyikan atau hentikan penjualan baru | Sama | Hanya versi listing yang disetujui tampil di katalog; pemandu melihat status dan alasan. |
| Laporan dan sengketa | Triase laporan, tinjau bukti, arahkan alur resmi | Putuskan dampak keuangan sengketa | Pihak terkait melihat perkembangan; sengketa aktif menahan dana. |
| Keuangan | Tidak dapat melihat detail atau menjalankan aksi keuangan | Periksa refund gagal, pembayaran terlambat, saldo ditahan/siap tarik, setiap permintaan pencairan, dan laporan transaksi QRIS | Refund, saldo, dan status pencairan konsisten di detail booking/dashboard pemandu. |
| Akun | Batasi sementara akun dengan alasan | Tutup permanen setelah kewajiban selesai; tambah/kelola staf | Kemampuan akun mengikuti pembatasan tanpa menghapus booking atau hak dana. |
| Audit | Lihat jejak keputusan operasional sesuai izin | Lihat juga jejak keuangan dan pengelolaan staf | Riwayat internal menjelaskan perubahan status; data sensitif tidak bocor. |

## Alur listing dan booking

1. Pemandu mengirim listing baru untuk review. Identitas wajib telah disetujui sebelum listing dijual. Staf menyetujui atau mengembalikan untuk revisi dengan alasan. Katalog hanya menampilkan listing yang telah disetujui dan aktif.
2. Pada listing aktif, perubahan harga/syarat, foto utama, titik temu, kegiatan/rute inti, durasi, kapasitas, atau tingkat kesulitan disimpan sebagai usulan versi yang menunggu review. Calon wisatawan tetap melihat versi terbit sebelumnya sampai review berhasil. Koreksi kecil di luar daftar itu dapat langsung tampil dengan riwayat versi (`D-126`).
3. Persetujuan review staf **tidak menggantikan** persetujuan wisatawan untuk perubahan penting pada booking yang sudah terkonfirmasi. Tiap booking tetap menunjuk versi yang berlaku baginya; penolakan dan diam mengikuti alur perubahan/refund yang ada.
   Harga dan syarat booking lama tetap sesuai snapshot-nya; kapasitas baru tidak boleh melanggar kursi yang sudah terjual atau ditahan.
4. Staf dapat menghentikan penjualan baru atau menyembunyikan listing dengan alasan. Booking lama tetap terlihat dan diproses lewat alur reschedule, pembatalan, atau sengketa. Staf tidak menulis ulang detail trip atau jadwal booking dari panel.

## Laporan, akun, dan uang

- Laporan listing, perilaku, serta trip/booking memiliki status, bukti, penanggung jawab, dan alasan penutupan. Laporan dapat ditautkan ke booking, tetapi hanya **sengketa resmi** yang memicu penahanan dana sesuai aturan sengketa.
- Pembatasan akun sementara mencegah tindakan baru yang berisiko, sedangkan akses untuk melihat booking, menanggapi sengketa, dan menyelesaikan hak/kewajiban tetap harus tersedia secara aman. Penutupan permanen superadmin menunggu penyelesaian kewajiban terkait.
- Setiap permintaan pencairan masuk antrean superadmin dan **memesan saldo terkait** agar tidak dapat diajukan lagi. API memeriksa ulang saldo, rekening terverifikasi, minimum nominal, sengketa, dan pemrosesan ganda sebelum menyetujui instruksi ke mitra. Penolakan dengan alasan atau kegagalan transfer yang telah direkonsiliasi mengembalikan dana sah ke saldo yang dapat diminta; status tidak diasumsikan berhasil sebelum mitra mengonfirmasi.
- Kegagalan refund QRIS, transfer refund cadangan, serta pembayaran terlambat masuk antrean pengecualian superadmin. Rekonsiliasi mencegah pengembalian ganda. Staf biasa hanya melihat informasi operasional nonkeuangan yang diperlukan untuk menangani laporan.
- Hasil verifikasi, review listing, dan pembatasan akun dikirim melalui notifikasi aplikasi dan email kepada pemandu yang terdampak. Perubahan status transaksi/sengketa mengikuti kanal notifikasi yang sudah disepakati (`D-35`). Semua mutasi menyimpan pelaku, waktu, alasan, objek, dan status sebelum/sesudah.

## Gerbang integrasi

Verifikasi melalui API bahwa keputusan admin muncul pada web terkait, sementara akses langsung staf ke endpoint keuangan/akun staf ditolak. Uji listing yang masih review tidak tampil di katalog, perubahan penting tidak mengganti versi booking diam-diam, moderasi tidak menghapus booking lama, laporan tidak otomatis menahan dana, dan pencairan yang ditolak/gagal tidak menggandakan atau menghilangkan saldo.
