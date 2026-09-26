# Monetisasi dan simulasi kontribusi AturTrip

Status: **rancangan untuk evaluasi**, bukan tarif final produksi atau proyeksi laba. Aturan yang sudah dijawab ada di [keputusan bersama](decisions.md) `D-69`–`D-84`. Mitra pembayaran final dan tarif kontraknya belum dipilih (`D-57`). **Rilis awal memakai QRIS saja** (`D-77`); kupon platform ditunda (`D-81`).

## Model per booking

- Pendapatan dari **komisi pemandu 10%** dan **biaya layanan wisatawan 2%** atas **harga trip utama + add-on berbayar yang dijual pemandu** dalam booking yang sama (`D-70`, `D-78`). Angka ini dipakai untuk simulasi awal, sama bagi pemandu individu, grup, Privat, dan Sharing (`D-75`).
- Pada trip terlaksana penuh: `pendapatan kotor = 12% × (harga trip + add-on pemandu)`. Hak pemandu sebelum biaya lain = `90% × (harga trip + add-on pemandu)`. Pencairan ke rekening ditanggung AturTrip (`D-71`).
- Pada pembatalan wisatawan: satu template listing berlaku untuk harga trip **dan add-on pemandu** (`D-79`). Komisi 10% hanya atas **jumlah yang benar-benar menjadi hak pemandu setelah refund** (`D-72`); biaya layanan yang sudah dibayar tidak dikembalikan (`D-45`). Jangan menghitung komisi dari nilai booking awal bila sebagian dikembalikan.
- Pada DP: biaya layanan 2% atas **harga trip + add-on pemandu yang dipilih** dibayar seluruhnya bersama DP pertama, sekali saja (`D-74`, `D-78`). Rincian setiap komponen tampil sebelum checkout.
- Pada rilis awal, pembayaran penuh, DP, dan pelunasan memakai **QRIS saja**. AturTrip menanggung biaya QRIS dan pencairan; tidak ada biaya gateway terpisah pada tagihan wisatawan (`D-71`, `D-77`). Dalam kasus refund penuh karena pemandu membatalkan atau pembayaran checkout terlambat, wisatawan menerima seluruh jumlah yang dibayar (`D-76`). Aturan biaya metode lain di `D-73` hanya relevan jika metode tersebut dipertimbangkan kelak.
- Satu permintaan pencairan menggabungkan seluruh saldo siap tarik per pemandu/grup dan umumnya minimal **Rp100.000** (`D-80`); setiap permintaan menunggu persetujuan superadmin (`D-123`). Karena beberapa booking bisa dicairkan bersama, asumsi **satu biaya payout per booking** dalam contoh di bawah bersifat konservatif; biaya aktual per booking bergantung pada frekuensi permintaan.

## Contoh kontribusi transaksi berhasil

Contoh **harga trip Rp450.000**, bayar penuh sekali, tanpa promo atau refund. Wisatawan membayar harga trip + biaya layanan Rp9.000 = **Rp459.000**; tidak ada biaya gateway terpisah. Komisi pemandu Rp45.000; **pendapatan kotor AturTrip Rp54.000**; hak pemandu Rp405.000. Menggunakan [tarif publik DOKU](https://www.doku.com/harga) sebagai ilustrasi pada 26 September 2026: QRIS 0,7% dan pencairan contoh Rp1.500. Tarif DOKU di situs **belum termasuk PPN**; tarif kontrak dan perlakuan refund harus diuji. Simulasi mengasumsikan biaya QRIS dihitung atas Rp459.000 dan satu pencairan Rp1.500 per booking.

| Metode | Pendapatan kotor | Biaya proses yang ditanggung AturTrip | Biaya pencairan | Kontribusi sebelum biaya lain |
| --- | ---: | ---: | ---: | ---: |
| QRIS | Rp54.000 | Rp3.213 | Rp1.500 | **Rp49.287** |

[Bank Indonesia menyatakan MDR QRIS ditanggung merchant, bukan konsumen](https://www.bi.go.id/id/publikasi/ruang-media/cerita-bi/Pages/mdr-qris.aspx). Angka Rp49.287 adalah **kontribusi sebelum biaya lain**, bukan laba bersih.

## Risiko yang perlu dihitung sebelum menetapkan tarif

- **Refund 100% atas harga trip karena wisatawan membatalkan**: pada contoh harga Rp450.000, AturTrip menyimpan biaya layanan Rp9.000 dan komisi Rp0. Jika biaya QRIS awal Rp3.213 tidak dikembalikan mitra, sisa hanya **Rp5.787** sebelum biaya refund, pesan, dan operasi. Perlakuan biaya QRIS pada refund harus dibuktikan per mitra; ini bukan pernyataan bahwa DOKU pasti menagih penuh pada refund.
- **Refund penuh karena pemandu membatalkan atau dana terlambat**: pendapatan dari booking menjadi Rp0, sementara biaya QRIS awal, biaya refund, atau pesan mungkin tetap keluar. Kasus ini harus dimasukkan ke perkiraan biaya, bukan dianggap laba dari fee tertahan.
- **DP dengan dua transaksi**: hitung biaya QRIS pada pembayaran pertama dan pelunasan secara terpisah sesuai nilai masing-masing. Periksa apakah ada biaya tetap tambahan per transaksi dalam kontrak; jangan menganggap tarif persentase publik sudah mencakup seluruh biaya.
- Biaya WhatsApp OTP dan notifikasi, KYC, dukungan, penanganan sengketa, promosi, pajak, serta biaya tetap tim/server **belum dihitung**. Kontribusi pada tabel bukan laba bersih. Tidak ada data transaksi riil, campuran metode bayar, tingkat refund, atau biaya akuisisi pelanggan untuk proyeksi laba bulanan.
- [Xendit mencantumkan masa berlaku refund QRIS “7*” hari serta perbedaan dukungan refund parsial menurut penerbit QR](https://docs.xendit.co/docs/qris). Arti tanda bintang dan batas kontraktual perlu dikonfirmasi. Booking yang dibuat jauh sebelum trip dan refund 50%/25% dapat melampaui kemampuan refund asli QRIS. Mekanisme pengembalian alternatif harus lolos uji mitra sebelum rilis; jangan menganggap API refund asli selalu tersedia. Dokumen Xendit yang sama menjelaskan sengketa melalui penerbit QR dapat timbul sekitar 90 hari setelah pembayaran; jendela sengketa internal 48 jam dan tahan dana 7 hari tidak menghapus risiko tersebut.
- Jika refund asli QRIS tidak tersedia, AturTrip memakai **transfer melalui mitra ke rekening/e-wallet wisatawan yang telah diverifikasi** (`D-82`). **AturTrip menanggung biaya transfer**, tidak memotong hak refund wisatawan (`D-83`). Biaya ini belum termasuk dalam contoh Rp49.287. Catat refund asli/transfer sebagai alternatif yang saling eksklusif dan rekonsiliasi biaya per jalur.
- Sengketa eksternal QRIS setelah pencairan pemandu ditutup sementara dari **cadangan risiko AturTrip** (`D-84`), bukan dari perpanjangan masa tahan dana pemandu. Penagihan kembali kepada pemandu/grup hanya setelah bukti kesalahan mereka ditinjau; tingkat cadangan dan frekuensi kerugian harus masuk model profitabilitas setelah data tersedia.

## Data yang perlu dikumpulkan saat uji dan pilot

1. Tarif efektif per metode dan pajak, apakah biaya tertentu boleh ditampilkan terpisah, serta perlakuan biaya saat refund penuh/parsial.
2. Biaya payout aktual, frekuensi penarikan dan kemungkinan penggabungan beberapa booking dalam satu permintaan pencairan.
3. Nilai booking rata-rata, porsi DP, campuran metode pembayaran, konversi checkout, pembatalan, sengketa, refund, serta biaya WhatsApp dan layanan pelanggan per booking.
4. Kontribusi setelah biaya variabel per booking, lalu titik impas terhadap biaya tetap dan pemasaran. Evaluasi tarif 10% + 2% dengan data ini sebelum diputuskan untuk produksi.
