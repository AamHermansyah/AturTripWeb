# Analitik pasar web-admin

Status: **spesifikasi kebutuhan rilis awal, belum diimplementasikan**. Dashboard admin mempunyai dua area: [antrean operasional](admin-operations.md) dengan status terbaru, serta analitik pasar internal AturTrip yang diperbarui harian (`D-127`–`D-136`). Analitik ini mengukur aktivitas di AturTrip, bukan seluruh pasar wisata Indonesia. Pembanding eksternal menyusul.

## Akses dan navigasi

Staf dan superadmin melihat tab **Pasar & pertumbuhan**, **Permintaan**, **Pasokan**, **Konversi**, serta **Kualitas**. Tab **Keuangan** hanya untuk superadmin; respons API dan berkas CSV mengikuti izin yang sama. Dashboard ringkas menautkan metrik ke grafik serta daftar agregat terkait. Tidak ada KTP, nomor HP, email, koordinat peserta, atau identitas pribadi di analitik/ekspor.

| Area | Pertanyaan yang dijawab | Tampilan utama |
| --- | --- | --- |
| Pasar & pertumbuhan | Apakah minat dan penggunaan bertambah? Dari sumber mana? | Pengunjung dan sesi, pencarian, pengguna/penyedia baru, pembeli pertama versus pembeli ulang, pemandu yang pertama kali menerbitkan listing/menjalankan trip, booking terkonfirmasi, peserta/trip terlaksana, tren periode, kohort bulanan, serta asal kunjungan/kampanye. |
| Permintaan | Lokasi/kategori apa dicari, tetapi belum terlayani? | Peringkat pencarian dan filter, provinsi/kota/kategori diminati, pencarian tanpa hasil, pencarian dengan listing namun tanpa slot tersedia, rentang harga yang dicari bila filter harga dipakai. |
| Pasokan | Di mana jumlah/kapasitas trip kurang atau berlebih? | Pemandu/grup terverifikasi aktif, listing menunggu review/aktif, keberangkatan dan kursi tersedia, pemanfaatan Sharing serta keterisian Privat secara terpisah, menurut wilayah/kategori. |
| Konversi | Pada langkah mana wisatawan berhenti? | Corong kunjungan → pencarian → detail → pilih slot → mulai checkout → booking dibayar; rasio dan penyebab yang bisa diamati seperti tanpa hasil, slot habis, checkout kedaluwarsa, atau pembayaran gagal. Trip selesai menjadi tahap pemenuhan terpisah karena dapat terjadi lama setelah booking. |
| Kualitas | Apakah pengalaman dan pelaksanaan membaik? | Trip selesai, pembatalan menurut pihak/penyebab, reschedule, no-show, laporan/sengketa, refund sebagai **jumlah kasus** bagi staf, rating/ulasan sah, serta tren per kategori/wilayah. |
| Keuangan — superadmin | Apakah transaksi memberi kontribusi yang sehat? | Nilai booking terkonfirmasi (harga trip + add-on), dana QRIS diterima, refund, hak pemandu, komisi terealisasi, biaya layanan, biaya QRIS/refund/pencairan, dan **kontribusi setelah biaya variabel yang tercatat**. Pisahkan ditahan, siap tarik, dan dicairkan; angka kontribusi bukan laba bersih. |

## Definisi dan ketepatan angka

- **Periode default:** 30 hari lengkap terakhir versus 30 hari lengkap sebelumnya berdasarkan agregat terbaru. Rentang kustom dibandingkan dengan rentang sebelumnya yang sama panjang; tampilkan tanggal persis, zona **WIB**, waktu pembaruan terakhir, dan status data kosong/terlambat. Hari berjalan yang belum lengkap tidak dicampur tanpa label.
- **Filter bersama:** periode, provinsi/kota **lokasi trip**, kategori, Privat/Sharing, serta penyedia individu/grup. Analitik pengunjung yang belum memilih trip tidak mempunyai semua dimensi; tampilkan bahwa filter tertentu tidak berlaku atau gunakan dimensi yang benar-benar dipilih pengunjung, bukan menebak lokasi/jenis trip.
- **Kunjungan dan corong:** catat peristiwa awal untuk pengunjung yang belum masuk memakai pengenal analitik yang tidak memuat identitas pribadi; hubungkan tahap berikutnya ke sesi/perjalanan checkout bila tersedia. Tampilkan jumlah tahap dan penyebut rasio. Jangan membagi jumlah booking satu periode dengan seluruh pengunjung tak terkait lalu menyebutnya konversi sesi. Pisahkan kunjungan, pengguna unik yang dapat diukur, booking, peserta, dan keberangkatan unik.
- **Retensi:** pembeli ulang dihitung dari akun yang pernah memiliki booking terkonfirmasi sebelumnya; kohort memakai bulan booking pertama lalu menunjukkan proporsi yang kembali memesan pada bulan berikutnya. Bedakan pendaftaran pemandu, lolos verifikasi, listing pertama terbit, dan trip pertama terlaksana agar hambatan pasokan terlihat.
- **Permintaan vs pasokan:** pencarian tanpa hasil berbeda dari hasil ada tetapi tidak ada slot pada tanggal yang dipilih. Hitung kursi Sharing dan keberangkatan Privat secara terpisah; satu booking Privat tidak disamakan dengan banyak kursi Sharing. Lokasi dalam grafik adalah lokasi trip, bukan lokasi fisik wisatawan.
- **Booking dan uang:** booking terkonfirmasi berasal dari pembayaran QRIS yang diverifikasi dalam masa tahan. Nilai booking, dana masuk, nilai setelah refund, hak pemandu, saldo siap tarik, dan payout adalah metrik berbeda. DP tidak dihitung sebagai booking kedua saat pelunasan. Komisi memakai hak pemandu setelah refund (`D-72`); tarif 10% + 2% masih hipotesis, sehingga laporan memakai snapshot transaksi aktual. Kontribusi mengurangi biaya variabel yang benar-benar tercatat dan tidak disebut laba bersih (`D-70`, `D-77`).
- **Sumber kunjungan:** simpan kategori sumber (misalnya mesin pencari, media sosial, akses langsung, referral/tautan pemandu), serta penanda kampanye yang tersedia sejak awal. Sumber tak dikenal diberi kategori tersendiri. Tanpa biaya kampanye, tampilkan kunjungan dan booking teratribusi, **tanpa klaim CAC/ROAS**. Aturan atribusi dan jendela waktunya perlu didefinisikan saat kontrak event dibuat.
- **Kualitas data:** deduplikasi event dan webhook; bot/aktivitas internal tidak ikut metrik pasar; simpan versi definisi metrik. Koreksi refund, sengketa, dan status trip yang datang terlambat harus dapat memperbarui agregat historis. Grafik memuat sumber dan definisi singkat; perbedaan angka analitik harian versus status operasional terbaru dijelaskan.

## Pengumpulan dan ekspor

`apps/web` mengirim peristiwa kunjungan, pencarian/filter, buka detail, pilih slot, dan mulai checkout. `apps/api` menjadi sumber kebenaran untuk pembayaran, booking, trip selesai, listing/slot, refund, sengketa, serta ledger keuangan. `apps/web-admin` membaca agregat melalui endpoint berizin; browser admin tidak menghitung nilai keuangan atau menarik data mentah lintas akun. Proses agregasi harian disertai pemeriksaan terhadap data sumber dan cap waktu pembaruan.

CSV mengikuti filter yang terlihat, berisi agregat serta definisi periode/zona, tanpa data pribadi. Staf mendapat kolom nonkeuangan saja; superadmin boleh mengekspor kolom keuangan. Ekspor dan aksesnya dicatat. Kegagalan agregasi atau data belum cukup ditampilkan jelas, bukan diisi nol seolah tidak ada permintaan.

## Gerbang selesai

Uji alur contoh dari pencarian anonim sampai pembayaran QRIS dan trip selesai; pencarian tanpa hasil, slot kosong, DP/pelunasan, pembatalan/refund, Sharing multi-booking, dan pencairan tidak membuat hitungan ganda. Bandingkan hasil agregat dengan booking/ledger sumber, uji batas izin staf versus superadmin pada layar, endpoint, dan CSV, serta pastikan laporan 30 hari dan zona WIB konsisten.
