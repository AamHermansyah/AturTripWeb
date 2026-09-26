# Timeline apps/web-admin — checklist panel staf

`[x]` hanya berarti butir tertulis sudah ada. Persetujuan fitur tetap `[ ]` sampai pengguna menyatakan selesai tanpa perbaikan. Lihat [aturan checklist](../../../.docs/timelines/timeline.md).

## Fondasi dan akses

- [x] Workspace `apps/web-admin` tersendiri, skrip, layout, dan halaman penanda tersedia.
- [ ] UI masuk/keluar staf/superadmin dengan email + sandi dan OTP email wajib setiap login, serta penanganan sesi kedaluwarsa dibuat.
- [ ] Route admin terlindungi; tampilan 401 dan 403 jelas, tanpa menampilkan data sensitif.
- [ ] Menu/aksi staf hanya memuat operasi nonkeuangan; superadmin mendapat fungsi keuangan serta pengelolaan staf sesuai izin API.
- [ ] Integrasi autentikasi dan otorisasi dengan API diuji untuk staf berizin, tidak berizin, dan belum masuk.

## Operasi admin

- [ ] Dashboard antrean verifikasi identitas, review listing, serta laporan/sengketa sesuai izin; refund gagal/pengecualian keuangan hanya tampil bagi superadmin (`D-119`).
- [ ] Dashboard analitik pasar terpisah dari antrean kerja: ringkasan pertumbuhan, permintaan, pasokan, konversi, kualitas, dan keuangan superadmin; grafik memakai ApexCharts (`D-127`–`D-129`, `D-137`).
- [ ] Visualisasi wilayah/kategori, pencarian tanpa hasil/slot, pemanfaatan Privat versus Sharing, dan corong kunjungan sampai booking menggunakan definisi serta penyebut jelas (`D-130`, `D-131`).
- [ ] Filter periode, provinsi/kota trip, kategori, Privat/Sharing, individu/grup; default 30 hari dibanding 30 hari sebelumnya dan rentang kustom, dengan WIB serta waktu pembaruan harian (`D-131`, `D-133`, `D-134`, `D-136`).
- [ ] Grafik sumber kunjungan/kampanye menampilkan performa tanpa mengklaim CAC/ROAS sebelum biaya iklan tersedia (`D-135`).
- [ ] Pembeli pertama/ulang, kohort bulanan, dan aktivasi pemandu dari pendaftaran sampai trip pertama terlihat dengan definisi penyebut yang jelas (`D-127`, `D-130`).
- [ ] Staf hanya melihat agregat nonkeuangan; grafik dan CSV keuangan hanya untuk superadmin, dengan ekspor sesuai filter tanpa data pribadi (`D-129`, `D-132`).
- [ ] Alur verifikasi KTP/swafoto wajib dan sertifikat opsional untuk badge pada penyedia individu/grup, termasuk alasan keputusan.
- [ ] Listing tetap tertahan sampai identitas penyedia disetujui; hasilnya terlihat pada web penyedia.
- [ ] Setiap listing baru menjalani review staf sebelum tampil pada katalog; harga/syarat, foto utama, titik temu, kegiatan/rute inti, durasi, kapasitas, atau tingkat kesulitan memicu review ulang sementara versi aktif tetap tampil dan booking lama mempertahankan versi yang berlaku (`D-116`, `D-117`, `D-126`).
- [ ] Staf dapat memberi alasan/meminta revisi serta menyembunyikan listing atau menghentikan penjualan baru tanpa mengedit isi pemandu atau membatalkan booking lama otomatis (`D-118`, `D-121`).
- [ ] Laporan listing, perilaku, serta trip/booking dapat dipilah tanpa otomatis berubah menjadi sengketa yang menahan dana (`D-120`).
- [ ] Staf dapat membatasi akun sementara dengan alasan; penutupan permanen hanya oleh superadmin setelah kewajiban akun diperiksa (`D-122`).
- [ ] Hasil verifikasi, review listing, dan pembatasan akun terkirim ke pemandu melalui aplikasi dan email berisi alasan serta langkah berikutnya (`D-125`).
- [ ] Tampilan sengketa dan reschedule untuk staf; detail pembayaran, refund, pencairan, dan laporan keuangan hanya untuk superadmin.
- [ ] Laporan superadmin merinci transaksi QRIS, biaya layanan, komisi pada hak pemandu setelah refund, biaya QRIS/pencairan AturTrip, dan refund penuh seluruh pembayaran bila diwajibkan (`D-70`–`D-79`).
- [ ] Superadmin dapat merekonsiliasi refund transfer ke rekening/e-wallet wisatawan terverifikasi ketika refund QRIS asli tidak tersedia, menangani kegagalan tanpa refund ganda (`D-82`).
- [ ] Superadmin meninjau sengketa QRIS eksternal setelah payout, mencatat penggunaan cadangan risiko platform, dan memutuskan pemulihan dari pemandu/grup hanya berdasarkan bukti kesalahan (`D-84`).
- [ ] Staf dapat menangani sengketa yang diajukan dalam jendela biasa 48 jam dari waktu selesai booking final; kasus tetap terlihat sampai selesai dan menahan dana tanpa membuka aksi keuangan untuk staf.
- [ ] Superadmin melihat waktu selesai trip final, akhir masa tunggu 7 hari, sengketa yang menahan dana, saldo siap tarik, dan permintaan pencairan.
- [ ] Superadmin menyetujui/menolak setiap permintaan pencairan setelah memeriksa rekening, nominal, saldo, dan sengketa; penolakan/gagal transfer tidak menghilangkan saldo yang sah (`D-123`).
- [ ] Superadmin dapat menambah/mengelola akun staf; staf biasa tidak dapat memanggil aksi ini melalui UI atau API.
- [ ] Jejak audit keputusan staf terlihat sesuai izin.
- [ ] Pembayaran checkout/pelunasan DP setelah tenggat tidak mengonfirmasi atau menghidupkan booking; refund penuh otomatis dan kegagalannya masuk antrean superadmin (`D-55`, `D-56`).
- [ ] Staf tidak dapat mengubah booking/jadwal langsung; superadmin hanya menjalankan pengecualian dengan alasan dan jejak audit (`D-124`).

## Gerbang selesai

- [ ] Aksi admin benar-benar tersimpan melalui API; perubahan terlihat pada `apps/web` bila relevan.
- [ ] Setiap fitur admin pada cakupan rilis diverifikasi dan diterima pengguna tanpa perbaikan.
