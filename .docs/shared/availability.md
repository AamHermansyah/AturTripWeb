# Spesifikasi produk — ketersediaan dan slot trip

Status: **aturan inti slot telah diputuskan**. Baca bersama [PRD web](../../apps/web/.docs/prd.md), [PRD API](../../apps/api/.docs/prd.md), dan [`decisions.md`](decisions.md). Dokumen ini adalah sumber utama perilaku slot; timeline hanya berisi checklist pengerjaan.

## Pilihan saat membuat trip

Pemandu memilih cara wisatawan memilih slot: **By day** untuk memilih tanggal keberangkatan atau **By time** untuk memilih tanggal dan jam mulai. Lalu pemandu memilih pola ketersediaan. Istilah *Repeat* berarti aturan yang menghasilkan slot berulang; *Custom* berarti pemandu memasukkan tanggal/waktu satu per satu. Pada durasi tepat 24 jam, **kedua kelompok boleh dipilih** (`D-12`).

Untuk semua pola **Repeat**, pemandu memilih hari dalam pekan, tanggal mulai dan akhir berlakunya aturan, serta pengecualian tanggal (`D-63`). Tanggal dan jam pada pola By time tetap mengacu pada tanggal mulai trip di zona waktunya.

| Kelompok | Pola | Konfigurasi oleh pemandu | Yang dipilih wisatawan |
| --- | --- | --- | --- |
| **By day** — trip satu hari atau lebih | **Repeat** | Aturan hari/tanggal yang berulang, **durasi tetap yang ditetapkan pemandu**, kapasitas, serta pengecualian | Tanggal mulai; tanggal selesai dihitung dari durasi listing |
| **By day** | **Custom** | Tanggal ketersediaan satu per satu, durasi dan kapasitas tiap keberangkatan bila diperlukan | Salah satu tanggal yang dibuka pemandu |
| **By time** — durasi maksimal 24 jam, boleh lintas tengah malam | **Repeat hari + waktu** | Aturan hari berulang dan jam keberangkatan berulang | Tanggal dan jam mulai yang tersedia |
| **By time** | **Custom hari + Repeat waktu** | Tanggal satu per satu, dengan pola jam yang sama untuk tanggal pilihan | Tanggal dan salah satu jam berulang |
| **By time** | **Custom hari + Custom waktu** | Tanggal satu per satu, masing-masing dengan jamnya sendiri | Pasangan tanggal dan jam yang tersedia |

**Tanggal Custom atau hari Repeat pada By time selalu merujuk tanggal mulai.** Akhir slot dihitung dari tanggal+jam mulai ditambah durasi. Karena itu 09.00–09.00 esok hari (24 jam) dan 20.00–02.00 esok hari (6 jam) sama-sama valid sebagai By time. Perubahan tanggal tidak otomatis mengubahnya menjadi By day. Pada durasi tepat 24 jam, pemandu boleh memilih By day jika wisatawan cukup memilih tanggal; jam mulai yang berlaku tetap ditentukan pada listing.

## Aturan pengalaman yang sudah jelas

- Pemandu mengatur ketersediaan sebelum listing bisa dibooking. Wisatawan hanya melihat slot yang benar-benar dapat dipilih.
- Setiap listing ditetapkan sebagai **Privat atau Sharing**, tidak keduanya. Pada Privat, satu booking wisatawan/rombongan memakai slot keberangkatan secara eksklusif. Pada Sharing, beberapa booking dapat mengisi slot sampai kapasitas habis (`D-15`).
- Satu pemandu tidak boleh memiliki dua keberangkatan berbeda yang intervalnya tumpang tindih, termasuk lintas listing dan lintas tengah malam; pemeriksaan dimulai ketika slot ditahan saat checkout. Booking Sharing pada keberangkatan yang sama tidak dihitung sebagai bentrok terpisah. Pada grup, pemandu anggota harus ditetapkan dan terverifikasi **sebelum slot dijual**, lalu dipakai untuk pemeriksaan bentrok (`D-61`, `D-66`).
- Pada pola Repeat, tanggal tertentu dapat ditutup untuk **penjualan baru**. Booking lama pada tanggal itu tetap berlaku dan harus ditangani melalui reschedule atau pembatalan oleh pemandu jika tidak dapat dijalankan (`D-62`).
- Pemandu memilih batas booking baru **15 menit, 24 jam, 3 hari, atau 7 hari** sebelum waktu mulai trip per listing. Semua pola memakai batas ini; DP punya batas tambahan 24 jam menuju tenggat pelunasannya (`D-64`, `D-38`).
- Booking tidak menunggu persetujuan manual pemandu. Saat checkout, sistem menahan kapasitas slot selama **15 menit** dan memberi instruksi pembayaran gateway dengan batas yang selaras. Setelah pembayaran yang diwajibkan berhasil dalam masa tahan, booking otomatis berstatus terkonfirmasi. Jika pembayaran gagal atau masa tahan habis, kapasitas dilepas. API tetap memeriksa tenggat server; pembayaran yang terbukti berhasil setelah masa tahan tidak otomatis mengonfirmasi booking dan dikembalikan penuh (`D-20`, `D-25`, `D-55`).
- Kalender menandai tanggal **mulai** sebagai tanggal yang bisa dipilih. Ringkasan trip menampilkan **tanggal dan jam selesai** secara eksplisit bila berakhir di hari berikutnya.
- Setiap trip memakai **zona waktu lokasi kegiatan**: WIB, WITA, atau WIT. Sistem mengisinya dari lokasi, pemandu dapat mengoreksinya sebelum listing terbit, dan wisatawan melihat zona itu sebelum checkout (`D-18`).
- Wisatawan dapat meminta reschedule; pemandu harus menyetujui dan slot baru diperiksa seperti booking baru. Jika disetujui, batas refund serta tenggat DP mengikuti `D-50` dan `D-51`. Jika ditolak, jadwal lama tetap berlaku (`D-49`).
- Jika pemandu tidak dapat memenuhi slot yang telah dibooking, ia dapat mengusulkan jadwal baru. Jika wisatawan memilih refund atau pemandu membatalkan booking, seluruh pembayaran termasuk biaya layanan dikembalikan (`D-19`, `D-53`). Aturan pembatalan sukarela wisatawan mengikuti `D-44`–`D-47`.
- Informasi slot penuh/tidak tersedia harus terlihat jelas, termasuk ketika slot berubah sebelum checkout selesai.

## Saran rancangan agar lima pola tetap konsisten

1. Simpan **aturan ketersediaan** terpisah dari **slot keberangkatan** yang dihasilkan. Kelima pola adalah cara mengisi aturan, sedangkan hasilnya memiliki bentuk slot yang sama: tanggal+jam mulai, tanggal+jam selesai, zona waktu, kapasitas, dan sisa tempat.
2. Terapkan pengecualian/penutupan tanggal dan perubahan kapasitas pada slot tanpa mengubah booking yang sudah ada diam-diam. Perubahan aturan berlaku pada slot mendatang sesuai kebijakan yang dipilih.
3. Jangan campur Privat dan Sharing pada satu listing. Privat mengunci seluruh keberangkatan untuk satu pihak pemesan; Sharing menghitung sisa kursi dari semua booking dan tahanan pembayaran.
4. Cek slot dan reservasi kapasitas secara atomik pada backend. Tampilan “tersedia” saja tidak cukup untuk mencegah dua checkout terakhir mengambil kursi yang sama.
5. Simpan identitas zona waktu lokasi trip (WIB/WITA/WIT) bersama jadwal. Pakai waktu lokal trip saat membentuk aturan Repeat/Custom, lalu konversi menjadi waktu absolut untuk bentrok, pembayaran, dan notifikasi. Tetapkan batas pemesanan serta jeda antartrip; periksa bentrok pemandu yang menjual lebih dari satu listing.
6. Saat reschedule, pindahkan kapasitas secara aman: pastikan slot baru berhasil dialokasikan sebelum slot lama dilepas.
7. Untuk By time, cek **seluruh interval** mulai–selesai ketika mendeteksi bentrok; jangan membandingkan hanya tanggal mulai atau jam pada hari yang sama. Dua slot yang melewati tengah malam dapat bertabrakan dengan slot hari berikutnya.

## Contoh yang perlu dipastikan

- Trip pendakian 3 hari dengan By day Repeat: pemandu menetapkan durasi 3 hari, wisatawan memilih **tanggal mulai**, dan tanggal selesai dihitung sistem.
- Tur kota 4 jam setiap Sabtu pukul 08.00 dan 13.00: By time Repeat hari + waktu.
- Trip mulai Jumat 20.00 dan selesai Sabtu 02.00: By time dengan tanggal mulai Jumat dan durasi 6 jam.
- Trip mulai Sabtu 09.00 dan selesai Minggu 09.00: By time dengan durasi tepat 24 jam.
- Pemandu hanya tersedia 3, 10, dan 17 Oktober pada jam yang sama: By time Custom hari + Repeat waktu.
- Pemandu tersedia 3 Oktober pukul 08.00 dan 10 Oktober pukul 14.00: By time Custom hari + Custom waktu.

## Kondisi kode sekarang

`apps/web/components/shared/date-availability.tsx` sudah memiliki tampilan `by_days` dan `by_hours` dengan data tanggal contoh. `booking-drawer.tsx` dan halaman reschedule saat ini memakai `by_hours` yang di-hardcode; lima pola konfigurasi penyedia dan sinkronisasi kapasitas belum dibangun. Lihat [kondisi web](../../apps/web/.docs/current-state.md) dan [kondisi API](../../apps/api/.docs/current-state.md).
