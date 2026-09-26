# PRD — apps/web-admin

Status: draf kebutuhan panel staf admin. Ini aplikasi tersendiri dari `apps/web`. Keputusan lintas aplikasi ada di [decisions.md](../../../.docs/shared/decisions.md); API tetap menjadi penegak izin dan pemilik data.

## Tujuan

Staf AturTrip dapat memverifikasi penyedia, memoderasi listing, menangani laporan/sengketa, dan menelusuri tindakan operasional dari satu panel yang aksesnya terbatas. Staf memiliki akses operasional nonkeuangan yang sama; hanya superadmin dapat memakai fungsi keuangan serta menambah/mengelola staf (`D-24`).

| ID | Kemampuan | Hasil yang diperlukan |
| --- | --- | --- |
| ADM-AUTH-01 | Masuk dan sesi admin | Staf/superadmin masuk dengan email + sandi dan **wajib OTP email setiap login**; sesi tidak sah/kedaluwarsa diarahkan ke alur masuk yang aman. |
| ADM-AUTH-02 | Otorisasi per aksi | Staf mendapat akses operasional nonkeuangan; superadmin juga mendapat akses keuangan dan pengelolaan staf. Menu, halaman, dan aksi mengikuti izin API; request langsung yang tidak berhak ditolak. |
| ADM-01 | Dashboard kerja | Staf melihat antrean verifikasi identitas, review listing, dan laporan/sengketa dengan status serta tautan tindakan. Superadmin juga melihat refund gagal/pengecualian keuangan (`D-119`). Dashboard analitik pasar terpisah dirinci pada `ADM-10`. |
| ADM-02 | Verifikasi | Staf meninjau KTP dan swafoto pemandu individu/pemilik grup serta pemandu anggota yang ditugaskan (`D-40`, `D-41`). Sertifikat opsional dapat disetujui/ditolak dengan alasan dan memberi badge bila disetujui. Listing tertahan sampai identitas penyedia disetujui (`D-42`). |
| ADM-03 | Moderasi listing | Setiap listing baru ditinjau staf sebelum tampil pada katalog. Perubahan harga/syarat, foto utama, titik temu, kegiatan/rute inti, durasi, kapasitas, atau tingkat kesulitan pada listing terbit ditinjau sebelum versi baru tampil; koreksi kecil langsung tampil. Staf memberi alasan dan meminta revisi tanpa mengedit isi trip, serta dapat menyembunyikan listing atau menghentikan penjualan baru. Booking lama tidak otomatis batal; persetujuan staf tidak menggantikan keputusan wisatawan atas perubahan penting booking (`D-116`–`D-118`, `D-121`, `D-126`). |
| ADM-04 | Sengketa dan transaksi | Staf dapat menelusuri booking, reschedule, dan bukti nonkeuangan untuk mediasi. Hanya superadmin mengambil keputusan akhir refund atau pelepasan dana (`D-59`), serta mengakses detail keuangan, waktu kelayakan pencairan (7 hari sejak trip selesai tercatat), saldo siap tarik, refund/pencairan, dan tindakan finansial. Sengketa aktif menahan dana; bagian hak pemandu siap tarik setelah keputusan final dan masa 7 hari sama-sama terpenuhi (`D-60`). |
| ADM-05 | Jejak audit | Staf berwenang dapat melihat siapa mengambil keputusan, kapan, alasan, dan status sebelum/sesudahnya. |
| ADM-06 | Pengelolaan staf | Hanya superadmin dapat menambah, mengubah akses, atau menonaktifkan akun staf. |
| ADM-07 | Laporan dan akun pengguna | Wisatawan/pemandu dapat melaporkan listing, perilaku pihak lain, atau masalah trip/booking. Staf memilah laporan tanpa otomatis membuka sengketa keuangan; staf dapat membatasi akun sementara dengan alasan. Hanya superadmin menutup permanen setelah kewajiban terkait selesai (`D-120`–`D-122`). |
| ADM-08 | Persetujuan pencairan | Setiap permintaan pencairan diperiksa superadmin terhadap rekening, nominal, saldo siap tarik, dan sengketa lalu disetujui/ditolak dengan alasan. Penolakan tidak menghapus hak saldo; status akhir mengikuti konfirmasi mitra (`D-123`). |
| ADM-09 | Komunikasi keputusan | Hasil verifikasi, review listing, dan pembatasan akun dikirim melalui notifikasi aplikasi serta email kepada pemandu yang terdampak, berisi alasan yang boleh dibagikan dan langkah berikutnya (`D-125`). |
| ADM-10 | Analitik pasar | Dashboard analitik lengkap dari data internal AturTrip: pertumbuhan dan sumber kunjungan/kampanye, permintaan wilayah/kategori serta pencarian tak terlayani, pasokan pemandu/listing/slot, corong kunjungan–booking, kualitas trip, dan tren transaksi. Staf/superadmin melihat nonkeuangan; hanya superadmin melihat pendapatan, biaya, refund nominal, kontribusi, dan status dana. Filter periode, provinsi/kota lokasi trip, kategori, Privat/Sharing, individu/grup; default 30 hari versus 30 hari sebelumnya, rentang kustom, agregasi harian berlabel WIB dan waktu pembaruan. CSV agregat mengikuti filter serta izin, tanpa data pribadi (`D-127`–`D-136`). Lihat [spesifikasi analitik](../../../.docs/shared/admin-analytics.md). |

Jika pemandu membatalkan booking terkonfirmasi, pembayaran termasuk biaya layanan dikembalikan (`D-53`). Instruksi gateway berakhir sejalan dengan tahanan 15 menit; pembayaran yang masuk setelah tenggat tidak otomatis mengonfirmasi booking dan dikembalikan penuh otomatis. Kegagalan refund checkout atau pelunasan DP terlambat masuk antrean superadmin (`D-55`, `D-56`).

Rilis awal hanya memakai QRIS; biaya pemrosesan dan pencairan ditanggung AturTrip (`D-71`, `D-77`). Laporan superadmin memisahkan harga trip/add-on, biaya layanan, komisi atas hak pemandu setelah refund, biaya QRIS, biaya pencairan, dan refund. Jika refund penuh diperlukan karena pemandu membatalkan atau pembayaran checkout terlambat, seluruh jumlah yang dibayar wisatawan kembali dan biaya mitra yang tidak pulih dicatat sebagai biaya AturTrip (`D-76`, `D-78`, `D-79`). Permintaan pencairan pemandu/grup menggabungkan saldo siap tarik dan memakai minimum Rp100.000 dengan pengecualian penutupan akun (`D-80`). Tarif 10% + 2% masih hipotesis untuk evaluasi, dijelaskan di [monetisasi](../../../.docs/shared/monetization.md).

Jika refund QRIS asli tidak tersedia, superadmin melihat jalur transfer melalui mitra, bukti kepemilikan rekening/e-wallet wisatawan, nominal, status, dan alasan pengecualian. Transfer yang gagal atau statusnya tidak pasti direkonsiliasi sebelum tindakan ulang agar wisatawan tidak menerima refund ganda (`D-82`).

Untuk sengketa eksternal QRIS setelah pencairan, superadmin melihat nilai yang ditutup sementara dari cadangan risiko AturTrip, bukti penyebabnya, serta keputusan apakah pemulihan dari pemandu/grup dibenarkan. Penagihan hanya dilakukan bila bukti menunjukkan kesalahan penyedia dan keputusan terekam (`D-84`).

Kriteria produk dan UI dirinci pada [timeline.md](timeline.md); struktur teknis pada [tdd.md](tdd.md). Kerangka aplikasi saat ini belum memenuhi kemampuan di atas.

Staf meninjau booking, reschedule, serta bukti dan mengarahkan pihak terkait ke alur resmi; staf tidak mengubah booking/jadwal langsung. Superadmin hanya menangani pengecualian tercatat (`D-124`). Peta alur lintas aplikasi ada di [operasi web-admin](../../../.docs/shared/admin-operations.md).
