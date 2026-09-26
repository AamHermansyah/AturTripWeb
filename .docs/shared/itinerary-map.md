# Linimasa kegiatan dan peta rencana trip

Status: **aturan produk yang telah dijawab**. Keputusan bernomor ada di [decisions.md](decisions.md) `D-85`–`D-105`. Dokumen ini menjelaskan **rencana trip**, bukan GPS langsung; live tracking tetap fase berikutnya (`D-28`, `D-86`).

## Contoh yang harus didukung

Contoh jam di bawah adalah tampilan untuk **slot yang mulai pukul 05.00**; slot mulai lain menggeser jam kegiatan sesuai offsetnya (`D-104`).

| Unsur | Contoh | Hubungan |
| --- | --- | --- |
| Kegiatan 1 | 05.00 Keberangkatan | Merujuk pin A (titik mulai) |
| Kegiatan 2 | 06.00 Berjalan ke pos 1 | Merujuk segmen A–B; tidak perlu pin sendiri |
| Kegiatan 3 | 07.30 Tiba di pos 1 | Merujuk pin B |
| Kegiatan 4 | 08.00 Istirahat | Boleh merujuk pin B yang sama atau tanpa referensi peta |
| Pin informasi | Mata air C | Tampil di peta tanpa wajib terhubung ke garis atau kegiatan |

Pemandu membuat garis dari A ke B dan dapat menambah/menggeser titik belokan agar garis mengikuti jalur yang ingin dijelaskan. Peta tidak otomatis menganggap semua pin sebagai bagian rute. Trip satu lokasi dapat memiliki linimasa dan satu pin titik temu tanpa garis.

## Hubungan data

- **Kegiatan linimasa:** urutan, selisih waktu dari awal trip, **durasi perkiraan (boleh 0 menit untuk kejadian sesaat)**, judul, keterangan, dan referensi peta opsional. Satu kegiatan merujuk **satu pin**, **satu segmen**, atau **tanpa referensi peta** (`D-88`, `D-91`). Banyak kegiatan boleh memakai pin yang sama. Saat slot dipilih, tanggal/jam mulai serta selesai dihitung dalam zona waktu trip; satu linimasa dapat dipakai pada berbagai jam keberangkatan (`D-104`, `D-105`).
- **Pin:** ID tetap, koordinat tepat, kategori, nama, keterangan, dan pilihan visibilitas publik tepat/perkiraan (`D-89`, `D-94`, `D-96`). Pin boleh menjadi lokasi kegiatan, ujung segmen, pin informasi mandiri, atau lebih dari satu peran tersebut.
- **Segmen rute:** referensi pin awal dan akhir, titik belokan di antaranya, moda perjalanan, estimasi durasi, dan catatan pemandu. Jarak dihitung dari garis yang disimpan dan ditampilkan sebagai **perkiraan** (`D-87`, `D-92`). Segmen merupakan pilihan pemandu; jangan membuat sambungan otomatis antar-pin hanya karena urutan kegiatan.
- **Versi perubahan:** simpan versi lama dan baru ketika pin/rute/urutan kegiatan berubah setelah ada booking. Perubahan kecil diberitahukan; perubahan penting memerlukan persetujuan wisatawan atau pilihan refund sebelum berlaku pada booking mereka (`D-97`). Jam mulai mengikuti alur reschedule dan perubahan titik temu utama perlu persetujuan (`D-98`).

Perubahan penting mencakup titik temu/tujuan utama, kegiatan inti, moda, durasi, tingkat kesulitan, serta rute yang berubah nyata. Koreksi teks dan pergeseran pin/rute kecil yang tidak mengubah substansi cukup diberitahukan (`D-99`).

Rute dianggap berubah nyata bila wilayah/medan utama berubah, risiko meningkat, atau jarak maupun estimasi durasi rencana berubah **setidaknya 20%** dari versi booking. Satu pemicu cukup; hasil perbandingan disimpan bersama versi usulan (`D-101`).

Jika wisatawan menolak perubahan penting yang diusulkan pemandu, refund **seluruh pembayaran termasuk biaya layanan** (`D-100`), bukan perhitungan template pembatalan wisatawan. Penolakan tidak boleh diam-diam dianggap sebagai persetujuan versi baru.

Tidak ada respons juga **bukan persetujuan**. Booking tetap memakai versi lama; pemandu harus menjalankannya atau membatalkan dengan refund penuh (`D-102`).

Notifikasi perubahan kecil masuk aplikasi. Usulan perubahan penting masuk aplikasi **dan WhatsApp** dengan tautan untuk menyetujui atau menolak; ringkasan tidak mengungkap koordinat tepat kepada penerima yang tidak berhak (`D-103`).

## Alur pemandu saat membuat trip

1. Isi linimasa kegiatan. Kegiatan dapat tetap tanpa pin dan tanpa segmen.
2. Tambah pin dengan memilih koordinat di peta, kategori platform, nama, keterangan, serta visibilitas sebelum booking.
3. Hubungkan pin yang memang dilalui. Pemandu dapat menambah titik belokan dan mengisi moda, estimasi durasi, serta catatan setiap segmen.
4. Hubungkan kegiatan yang relevan ke pin atau segmen. Pin informasi seperti mata air dapat berdiri sendiri.
5. Pratinjau tampilan publik dan tampilan peserta terkonfirmasi. Publikasi memerlukan linimasa dan minimal satu pin titik temu/mulai; garis tidak wajib (`D-93`).

Kategori pin awal: mulai/titik temu, tujuan, pos, istirahat, air, fasilitas, tempat menarik, perhatian, dan lainnya (`D-96`). Nama/keterangan ditulis pemandu.

## Alur wisatawan pada detail trip

- Peta dan linimasa memakai data listing yang sama. Mengetuk kegiatan yang merujuk pin/segmen membawa fokus peta dan menyorotnya. Kegiatan tanpa referensi peta tetap terbaca tanpa memindahkan peta.
- Mengetuk pin membuka kategori, nama, keterangan, dan kegiatan terkait. Pin mandiri juga dapat dibuka. Mengetuk segmen membuka titik asal/tujuan, jarak perkiraan, moda, estimasi durasi, serta catatan pemandu.
- Tampilan publik hanya menerima koordinat tepat untuk pin yang memang dipilih pemandu sebagai publik. Pin perkiraan dan ujung garis yang terhubung harus **disamarkan pada data peta/API**, bukan hanya disembunyikan oleh UI (`D-94`, `D-95`). Peserta dengan booking terkonfirmasi dapat melihat data tepat sesuai izin server.
- Label dan legenda membedakan pin kegiatan, pin informasi, segmen rute, dan lokasi perkiraan. Data jarak dari garis yang digambar pemandu tidak dinyatakan sebagai rekaman perjalanan atau navigasi GPS langsung.

## Bukti penyelesaian lintas aplikasi

- `apps/web`: editor pin/segmen/kegiatan dan detail trip interaktif berfungsi pada ponsel; tampilan publik serta peserta berbeda sesuai pilihan visibilitas.
- `apps/api`: satu sumber data untuk kegiatan, pin, dan segmen; validasi relasi, urutan, koordinat, publikasi minimum, kepemilikan listing, serta keluaran publik yang tidak membocorkan koordinat tepat.
- Integrasi: buat contoh A–B + C mandiri + kegiatan tanpa pin, terbitkan, tampilkan pada detail trip publik, lalu verifikasi tampilan peserta terkonfirmasi dan notifikasi perubahan pada booking yang sudah ada.
