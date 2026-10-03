# Audit navigasi mockup — 3 Oktober 2026

Permintaan pemilik produk: semua halaman baru memiliki navigasi yang baik sebelum commit/push. Audit memulai dari 47 URL, mengambil seluruh tautan internal hasil HTML server, dan memeriksa **57 URL unik tanpa error**. Target dianggap gagal bila HTTP 404, payload `notFound`, atau error server render muncul meski status HTTP 200.

| Jalur | Titik masuk | Kembali/lanjut |
| --- | --- | --- |
| Masuk/daftar/pemulihan/OTP | Onboarding dan tautan antarform sesuai peran | OTP pendaftaran → masuk; OTP pemulihan → sandi baru → masuk; hasil masuk pemandu → hub, wisatawan → Explore |
| Explore dan detail publik | Navbar Explore → kartu | Detail → Explore; tab/slot tetap dapat dipulihkan dari URL |
| Grup dan trip grup | Explore → grup 1 → daftar trip | Detail → daftar grup; daftar → profil grup |
| Galeri | Foto/link detail trip publik/grup | Header → detail trip yang sama; pembesaran → Dialog ditutup |
| Ulasan | Cuplikan/link detail atau profil grup | Tombol → detail trip atau profil grup yang sama |
| Simpan | Navbar Simpan; hati kartu/detail | Kartu → detail publik/grup; kosong → Explore; hapus semua → konfirmasi |
| Checkout | Detail trip → drawer pilihan → checkout | Kembali → detail/slot; hasil sukses → detail booking preview |
| Detail booking preview | Hasil checkout, riwayat, notifikasi contoh | Kembali → trip; dialog pelunasan/refund/reschedule menutup ke detail |
| Hub pemandu | Menu akun dan hasil masuk pemandu contoh | Akun; tiga tautan menuju wizard/rencana/ketersediaan |
| Wizard listing | Hub pemandu | Langkah maju/mundur, penerapan editor, review/revisi/versi baru; kembali → hub |
| Editor mandiri | Hub pemandu | Kembali → hub; pratinjau tetap di editor |
| KYC | Menu akun | Kembali → akun; setelah simulasi disetujui → wizard |
| Notifikasi | Ikon lonceng Explore | Header → Explore; detail → halaman contoh relevan; dibaca tidak berarti persetujuan |

Perbaikan audit: empat target tidak valid di Explore dibersihkan; menu akun tidak menautkan halaman yang belum tersedia; tombol kembali galeri/detail memakai tujuan pasti; label ulasan grup diperbaiki; riwayat memiliki jalur langsung ke booking preview; scroll wizard mengikuti container editor.

URL dan tautan yang benar-benar diperiksa tersimpan di [navigation-audit.json](navigation-audit.json). Navigasi yang hanya muncul sesudah interaksi (OTP terverifikasi, hasil bayar, editor diterapkan, dan KYC disetujui) juga ditinjau melalui kode/validasi domain. **Tidak ada browser tersedia pada sesi agen**, sehingga audit HTTP/kode ini belum membuktikan klik, drag, fokus, atau layout visual mobile.

ID tak dikenal pada trip/grup diuji terpisah dan menampilkan fallback tidak ditemukan. Halaman booking lama masih statis; preview baru tidak menyimpan hasil transaksi/PII checkout. Kartu pemandu Explore tetap informasi contoh, tanpa tautan profil pemandu yang belum dibuat.
