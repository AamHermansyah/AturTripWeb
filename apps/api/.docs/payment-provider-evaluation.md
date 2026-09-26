# Evaluasi mitra pembayaran — apps/api

Status: **DOKU dan Xendit menjadi shortlist (`D-57`), penyedia final belum dipilih**. Rancangan utama menahan dana pada mitra bila fitur serta kontraknya mendukung; rekening khusus dana trip AturTrip hanya cadangan setelah ditinjau (`D-58`). Aturan produk yang mengikat ada di [keputusan bersama](../../../.docs/shared/decisions.md). Jangan menganggap fitur pada tabel sudah aktif di akun AturTrip atau berlaku untuk semua metode pembayaran.

## Kebutuhan AturTrip

**Rilis awal hanya memakai QRIS** untuk bayar penuh, DP, dan pelunasan (`D-77`). Biaya QRIS ditanggung AturTrip; evaluasi metode lain hanya untuk fase berikutnya.

1. Checkout dan tahanan slot memakai batas **15 menit yang sama** (`D-16`, `D-25`).
2. Pembayaran penuh/DP, pelunasan, refund parsial/penuh, dan callback dapat direkonsiliasi per booking (`D-21`, `D-54`–`D-56`).
3. Dana pemandu tidak dapat dicairkan sebelum trip berhasil selesai + **7 hari**, atau selama sengketa aktif (`D-27`). Setelah layak, pemandu/pemilik grup **meminta pencairan** dan setiap permintaan diperiksa superadmin (`D-123`), bukan payout otomatis.
4. Dana grup, rekening terverifikasi, fee platform, dan saldo siap tarik dapat dipisahkan dalam ledger serta laporan.
5. Pengecualian refund otomatis yang gagal dapat ditangani superadmin dengan jejak audit.

## Kandidat dari dokumentasi resmi

| Kandidat | Yang terdokumentasi | Yang harus dikonfirmasi sebelum dipilih |
| --- | --- | --- |
| DOKU | [Hold & Release Settlement](https://developers.doku.com/accept-payments/finance-and-settlement/hold-and-release-settlement) menahan settlement hingga API release; dapat digabung dengan [Split Settlement](https://developers.doku.com/accept-payments/finance-and-settlement/split-settlement). [Checkout](https://developers.doku.com/accept-payments/doku-checkout/integration-guide/backend-integration) memiliki parameter tenggat pembayaran dalam menit. | Batas maksimum hold dari waktu booking sampai selesai trip + 7 hari, ketersediaan fitur pada akun/kanal yang dipakai, refund penuh/parsial saat hold, tujuan release untuk pemandu/grup, dan kontrak komersial. Dokumentasi menyebut settlement ke bank sekitar H+1 setelah release. |
| Xendit | [Sub-account](https://docs.xendit.co/docs/sub-accounts) memisahkan saldo penyedia; [master account dapat membuat payout](https://docs.xendit.co/docs/payouts-for-sub-accounts) melalui API. | Model sub-account dan KYC untuk pemandu individu/grup, kendali terhadap dashboard/auto-withdrawal, refund per kanal, lama saldo boleh ditahan, serta kontrak dan biaya. |
| Midtrans (pembanding riset, **bukan shortlist**) | [Pencairan manual](https://docs.midtrans.com/docs/kapan-saya-menerima-dana-transaksi-dari-midtrans) dari portal merchant setelah transaksi settled dan melewati waktu proses. | Penahanan per booking, payout atas permintaan yang disetujui superadmin ke banyak pemandu/grup, refund parsial per kanal, dan lama dana dapat tetap berada pada saldo merchant. |

## Gerbang pemilihan

- Uji satu checkout 15 menit sampai sukses, kedaluwarsa, serta callback terlambat di sandbox.
- Uji refund 100%/50%/25% dan refund biaya layanan sesuai sebab pembatalan untuk metode pembayaran yang akan ditawarkan.
- Uji pembayaran DP dan pelunasan sebagai dua transaksi pada satu booking, termasuk pembatalan otomatis dan pembayaran terlambat.
- Uji hold dari tanggal booking yang bisa jauh sebelum trip sampai kelayakan +7 hari, sengketa, dan permintaan payout manual.
- Uji pencairan ke rekening pemandu individu serta rekening grup terverifikasi, kegagalan payout, dan laporan rekonsiliasi.
- Uji tahap **permintaan → saldo dipesan → persetujuan/penolakan superadmin → instruksi payout → hasil mitra**; kegagalan/penolakan tidak boleh menghilangkan hak saldo atau membuat transfer ganda (`D-123`).
- Untuk **QRIS**, bandingkan tarif efektif, pajak, biaya refund/payout, perlakuan MDR pada refund, batas kedaluwarsa 15 menit, serta dukungan hold sampai trip selesai + 7 hari. AturTrip menanggung biaya QRIS; refund penuh mencakup semua jumlah yang dibayar wisatawan (`D-76`, `D-77`). Catat dampaknya pada [simulasi monetisasi](../../../.docs/shared/monetization.md).
- **Gerbang QRIS wajib:** uji refund penuh dan **parsial 50%/25%** menurut penerbit QR, baik dalam 24 jam, sesudah 7 hari sejak pembayaran, maupun untuk booking jauh sebelum trip. [Xendit mencantumkan masa berlaku refund QRIS “7*” hari dan penerbit tertentu tanpa refund parsial](https://docs.xendit.co/docs/qris); arti tanda bintang, batas kontraktual, dan penerbit yang didukung harus dikonfirmasi. DOKU mendokumentasikan [endpoint refund QRIS](https://developers.doku.com/accept-payments/direct-api/snap/integration-guide/qris), tetapi batas waktu dan cakupan penerbitnya perlu konfirmasi tertulis. Bukti refund asli yang tidak cukup memerlukan jalur pengembalian alternatif yang disetujui sebelum rilis.
- Uji jalur alternatif `D-82`: verifikasi kepemilikan rekening/e-wallet wisatawan, transfer refund penuh/parsial melalui mitra, biaya dan waktu proses, status gagal/tidak pasti, serta pencegahan refund ganda. Biaya transfer ditanggung AturTrip (`D-83`). Jika jalur itu tidak tersedia secara kontraktual dan teknis, QRIS saja belum memenuhi kebijakan refund AturTrip.
- Uji dampak sengketa/chargeback QRIS yang datang setelah jendela sengketa produk 48 jam dan sesudah pencairan 7 hari. [Xendit menjelaskan sengketa melalui penerbit QR dapat dimulai sekitar 90 hari sejak transaksi](https://docs.xendit.co/docs/qris); tentukan rekonsiliasi, bukti, tanggung jawab biaya, dan penanganan saldo negatif bersama mitra.
- Tanyakan mekanisme debit/chargeback setelah payout, kebutuhan saldo minimum, dan laporan bukti untuk menerapkan cadangan risiko platform (`D-84`); nilai cadangan dan syarat penagihan kembali kepada pemandu/grup harus diputuskan sebelum peluncuran.
- Pastikan model penampungan, lama hold, pihak pemegang dana, serta hak dan kewajiban dalam perjanjian ditinjau bersama mitra pembayaran sebelum rilis. [Bank Indonesia menjelaskan aspek pengelolaan dan jangka waktu penampungan dana](https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI_230621.aspx).

Pilihan ini tidak mengubah waktu **saldo siap tarik** AturTrip: 7 hari setelah trip selesai tanpa sengketa. Waktu dana tiba di rekening pemandu setelah permintaan pencairan bergantung pada mitra dan metode payout yang akhirnya dipilih.
