# Dashboard awal pemandu

Status: **rancangan kebutuhan rilis awal**, belum ada halaman dashboard pemandu yang berfungsi di kode. Keputusan produk ada di [decisions.md](decisions.md) `D-106`–`D-115`. Detail UI milik `apps/web`; agregasi dan otorisasi milik `apps/api`.

## Tujuan dan cakupan

Dashboard membantu pemandu melihat **apa yang harus ditangani hari ini**, keberangkatan berikutnya, dan hasil trip yang telah selesai. Cakupan awal hanya **empat ringkasan, daftar tugas, tiga keberangkatan terdekat, dan satu grafik pendapatan** (`D-106`, `D-112`). Analitik pengunjung, pemasaran, dan banyak grafik tidak diperlukan pada tahap ini.

Urutan pada mobile web: **ringkasan → tugas → trip terdekat → grafik**. Tiap bagian dapat membuka detail yang sudah menjadi sumber datanya. Ketiadaan data menampilkan angka 0 serta penjelasan/aksi yang sesuai, bukan angka contoh.

## Empat ringkasan

| Ringkasan | Definisi awal |
| --- | --- |
| Trip mendatang | Jumlah keberangkatan berbeda pada konteks terpilih dengan booking terkonfirmasi dan waktu mulai yang belum lewat. Beberapa booking Sharing pada keberangkatan sama dihitung satu trip. |
| Tugas perlu ditangani | Jumlah tindakan yang benar-benar menunggu pemandu: permintaan reschedule wisatawan, bukti sengketa, dan tindak lanjut perubahan penting trip. Booking otomatis yang baru terkonfirmasi atau notifikasi yang hanya perlu dibaca tidak menambah angka ini (`D-08`, `D-110`). |
| Pendapatan periode ini | Jumlah **hak bersih pemandu/grup** dari trip yang selesai dalam **periode terpilih** (default bulan berjalan) menurut zona laporan konteks terpilih. Hitung dari bagian harga trip + add-on pemandu sesudah refund/keputusan sengketa dan komisi platform. Jangan masukkan biaya layanan wisatawan, dana booking yang tripnya belum selesai, atau biaya pencairan yang ditanggung AturTrip (`D-27`, `D-70`–`D-72`, `D-78`, `D-108`). Angka sengketa aktif dapat berubah setelah keputusan final dan perlu diberi penanda sementara. |
| Saldo siap tarik | **Saldo yang masih dapat diminta sekarang**: hak yang sudah melewati waktu selesai trip final + 7 hari tanpa sengketa aktif, dikurangi nominal yang telah dipesan dalam permintaan pencairan berjalan. Berbeda dari pendapatan periode ini; tombol pencairan mengikuti minimum Rp100.000 dan izin pemilik saldo (`D-27`, `D-60`, `D-80`, `D-123`). |

## Tugas dan trip terdekat

- Daftar tugas diurutkan menurut tenggat dan waktu masuk, berisi jenis, trip/booking terkait, batas tindakan bila ada, serta tautan langsung. Permintaan yang **menunggu wisatawan** tidak ditampilkan sebagai tugas pemandu. Untuk perubahan penting peta/linimasa, pemandu menangani booking yang tidak dapat dijalankan pada versi lama sesuai `D-97`–`D-103`.
- Daftar trip menampilkan **tiga keberangkatan berikutnya**, masing-masing dengan tanggal/jam **dan zona waktu lokasi trip**, lokasi, peserta terkonfirmasi, pemandu yang ditugaskan, serta tautan detail. Jangan mengulang satu keberangkatan Sharing per booking (`D-114`).

## Grafik pendapatan

- Sumbernya **hak bersih pemandu/grup dari trip selesai**; bucket berdasarkan **waktu selesai booking final**, bukan tanggal pembayaran wisatawan atau tanggal penarikan (`D-108`).
- Default **bulan berjalan** dengan titik mingguan; pilihan **enam bulan terakhir** dengan titik bulanan (`D-111`). **Kartu pendapatan dan grafik memakai periode terpilih yang sama** serta zona waktu laporan profil pemandu/grup, default WIB; tampilkan label periode dan zona (`D-115`).
- Setiap bucket mempertahankan total historis dan membaginya menjadi **ditahan**, **siap tarik**, serta **sudah dicairkan** (`D-109`). Penarikan memindahkan nilai antarstatus tanpa menghapus pendapatan dari periode asal. Dana dalam sengketa berada pada status ditahan dan nilainya dapat berubah setelah keputusan; tampilkan keterangan bahwa angka itu sementara.
- Dalam grafik tiga status, dana yang sudah layak tetapi sedang menunggu persetujuan superadmin/hasil transfer tetap termasuk kelompok historis **siap tarik**, dengan subketerangan **pencairan diproses**. Nilai itu **tidak termasuk kartu saldo yang dapat diminta lagi**. Setelah transfer berhasil, pindahkan ke **sudah dicairkan**; penolakan/gagal yang direkonsiliasi melepaskan pemesanan saldo tanpa mengubah total pendapatan (`D-123`).
- Grafik sederhana cukup menampilkan tiga bagian dan total pada label/tooltip yang terbaca di ponsel. Nilai kosong ditampilkan sebagai keadaan kosong yang jelas. API menyuplai nominal dan status yang sudah direkonsiliasi; UI tidak menghitung hak keuangan dari data booking mentah.

## Konteks dan izin

- Pemandu yang juga pemilik grup dapat memilih **Pribadi** atau **Grup**. Semua angka, tugas, keberangkatan, grafik, saldo, dan tautan pada satu layar mengikuti **satu konteks saja**; jangan menjumlahkan hak pribadi dan grup (`D-23`, `D-113`).
- Pemandu individu melihat konteks pribadinya. Pemilik grup melihat operasi dan keuangan grup. Pengelola grup hanya melihat ringkasan/tugas/trip **operasional** tanpa pendapatan, saldo, atau grafik keuangan. Pemandu anggota hanya melihat keberangkatan/tugas yang ditugaskan sesuai izin, tanpa data keuangan grup. API menegakkan batas ini pada setiap agregasi dan tautan detail.
- Waktu trip pada daftar memakai WIB/WITA/WIT sesuai lokasi. Waktu laporan keuangan mengikuti zona profil entitas; perubahan zona laporan tidak mengubah hak dana atau masa tunggu tujuh hari (`D-115`).

## Bukti penyelesaian

1. Dashboard memakai data API nyata dan tidak menampilkan angka mock sebagai fakta.
2. Keberangkatan Sharing dengan beberapa booking dihitung sekali; tugas yang menunggu wisatawan tidak dihitung sebagai tindakan pemandu.
3. Grafik dari trip selesai konsisten dengan ledger, refund, sengketa, masa tahan 7 hari, saldo siap tarik, dan penarikan yang sudah terjadi.
4. Peralihan Pribadi/Grup tidak mencampur data, dan pengelola/anggota tidak dapat memperoleh data keuangan lewat API langsung.
5. Tampilan mobile menjaga urutan ringkasan → tugas → trip → grafik dan menjelaskan status kosong/tertahan dengan jelas.
