# Fase mockup — checklist UI/UX

Status: **berjalan**. `[x] UI awal` berarti route/tampilan memang ada dalam kode pada 26 September 2026, **belum berarti desain final disetujui**. Butir review tetap `[ ]` sampai pemilik produk menerima fitur tanpa perbaikan. Lihat arti checkbox di [timeline monorepo](../../../.docs/timelines/timeline.md).

## Fondasi desain

- [ ] Revisi UI mobile 4 Oktober 2026 memakai `design-taste-frontend` dan tiga konsep `imagegen-frontend-mobile`: autentikasi, Explore/kartu, detail trip/grup, checkout/booking, Simpan, notifikasi, serta hub/editor/wizard/KYC. Build, lint, 64 tes domain, dan audit 60 URL lulus; menunggu penerimaan tampilan baru dan audit visual browser. Rincian [mobile-ui-review.md](mobile-ui-review.md).

- [x] Redesign fondasi + komponen `apps/web` (Plus Jakarta Sans, palet jade + netral hangat, radius berjenjang, state tekan/fokus, skeleton loading) diterima pemilik produk tanpa perbaikan pada 26 September 2026.
- [x] Tahap 2: level halaman memakai bentuk komponen yang sama (tanpa tab/tombol pil yang dipaksa) dan label kecil yang terbaca; diterima pemilik produk pada 26 September 2026.

## Wisatawan

- [x] UI awal onboarding dan personalisasi (`/onboarding`, `/personalize`).
- [x] UI awal daftar, masuk, verifikasi, lupa kata sandi, dan kata sandi baru.
- [ ] Form wisatawan memakai nomor HP + sandi dan OTP WhatsApp; form pemandu memakai email + sandi dan OTP email. OTP wajib saat verifikasi akun, pemulihan sandi, serta perubahan identitas; login rutin tanpa OTP.
- [ ] Alur UI autentikasi memakai sesi API nyata: masuk, keluar, pemulihan, kedaluwarsa sesi, dan status belum masuk.
- [ ] Route dan aksi pemandu/wisatawan mengikuti izin peran dari API; akses yang dilarang mendapat tampilan yang benar.
- [x] UI awal Explore (`/explore`) dengan kartu trip, pemandu, dan grup.
- [ ] Review final Explore: pencarian, filter, kategori, dan hasil yang benar-benar berubah sesuai pilihan.
- [ ] Event analitik kunjungan, pencarian/filter, detail trip, pilihan slot, mulai checkout, dan sumber kampanye/referral terkirim aman tanpa data pribadi untuk dashboard pasar admin (`D-130`, `D-135`).
- [ ] Explore/detail hanya menampilkan versi listing yang telah disetujui staf dan aktif; listing yang menunggu review atau disembunyikan tidak dapat menerima booking baru (`D-116`, `D-121`).
- [x] UI awal detail trip, linimasa kegiatan, galeri, dan ulasan (`/trips/[id]/*`).
- [x] Mockup detail trip menghubungkan kegiatan dan peta: pin/segmen tersorot saat kegiatan dipilih, pin mandiri terbaca, dan segmen menampilkan asal/tujuan, jarak perkiraan, moda, durasi, serta catatan (`D-85`–`D-92`). Data rute sintetis; diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026.
- [x] Mockup jam/tanggal kegiatan pada detail trip bergeser sesuai slot terpilih dalam WIB/WITA/WIT, termasuk lintas tengah malam dan hari berikutnya (`D-104`). Diterima pemilik produk pada 3 Oktober 2026; tes ketiga zona dan durasi tepat 24 jam lulus.
- [x] Keluaran server untuk mockup publik menyamarkan pin perkiraan dan seluruh geometri segmen terkait sebelum dikirim ke browser (`D-94`, `D-95`). Diterima pemilik produk pada 3 Oktober 2026; koordinat tepat tidak ditemukan pada respons publik.
- [ ] Peserta booking terkonfirmasi dapat melihat koordinat tepat sesuai izin API (`D-94`, `D-95`); pratinjau editor dengan data sintetis belum memenuhi integrasi ini.
- [ ] Review final detail trip: data rute, checkpoint/elevasi, persiapan, harga, dan kredibilitas terbaca jelas di mobile.
- [x] UI awal profil grup/agensi, daftar trip, detail trip grup, dan galeri (`/groups/[id]/*`).
- [x] Mockup publik grup, pencarian/filter trip, detail sesuai kartu, slot terblokir bila pemandu utama contoh belum terverifikasi, galeri, dan filter ulasan diterima pemilik produk pada 3 Oktober 2026. Data sintetis; pengelolaan grup/izin API belum termasuk.
- [ ] Profil/reputasi, penugasan pemandu, dan perjalanan grup memakai data/izin API.
- [x] UI awal pemilihan tanggal, peserta, serta pilihan bayar penuh/DP pada booking drawer.
- [x] Mockup checkout menunjukkan tipe listing Privat/Sharing sebagai ketetapan penyedia dan masa tahan pembayaran 15 menit; wisatawan tidak memilih ulang tipe. Simulasi berhasil/gagal/kedaluwarsa/pembayaran terlambat diterima pemilik produk pada 3 Oktober 2026; belum menahan kapasitas API.
- [x] Mockup checkout hanya menawarkan QRIS; rincian harga trip dan biaya layanan 2% jelas, seluruh biaya layanan dibayar bersama DP pertama, tanpa biaya gateway QRIS terpisah (`D-70`, `D-74`, `D-77`). Diterima pemilik produk pada 3 Oktober 2026.
- [ ] Pelunasan DP lewat QRIS pada platform dan integrasi status pembayaran API diverifikasi (`D-70`, `D-74`, `D-77`).
- [x] Harga add-on pemandu tercantum terpisah pada mockup checkout dan memakai satu template refund booking (`D-78`, `D-79`). Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup detail booking mengumpulkan tujuan rekening/e-wallet alternatif saat refund QRIS asli tidak tersedia dan menunjukkan verifikasi/transfer gagal atau berhasil (`D-82`). `/booking/preview` diterima pemilik produk pada 3 Oktober 2026; state lokal, tanpa transfer dana.
- [ ] Verifikasi tujuan dan status transfer refund berasal dari API/mitra.
- [ ] UI dan review final pemilihan slot wisatawan untuk kelima pola di [availability.md](../../../.docs/shared/availability.md), termasuk penuh/kosong/berubah saat checkout.
- [ ] UI By time menampilkan tanggal **dan** jam selesai pada hari berikutnya untuk trip lintas tengah malam, termasuk durasi tepat 24 jam.
- [ ] Detail slot/checkout menampilkan zona waktu lokasi trip secara jelas, termasuk saat wisatawan berada di zona berbeda.
- [x] UI awal data peserta, riwayat booking, detail booking, refund, dan reschedule (`/booking/*`).
- [x] Mockup detail booking dengan pelunasan, pembatalan/refund, reschedule, no-show, dan sengketa diterima pemilik produk pada 3 Oktober 2026. `/booking/preview` membentuk booking sintetis baru; belum terhubung transaksi checkout/API.
- [ ] Alur booking/pelunasan/refund/reschedule terintegrasi API dan route booking lama digabung dengan alur baru.
- [x] Mockup checkout/detail booking menampilkan sisa DP dan tenggat dari konfigurasi trip contoh (7 hari/24 jam); fungsi domain mendukung pilihan 7 hari, 3 hari, dan 24 jam. Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup checkout hanya menawarkan DP bila tenggat masih berjarak sedikitnya 24 jam; setelah itu hanya bayar penuh (`D-37`, `D-38`). Diterima pemilik produk pada 3 Oktober 2026; batas tepat 24 jam diuji.
- [x] Mockup detail booking menunjukkan pembatalan DP otomatis dan refund menurut syarat contoh (`D-37`, `D-38`). Diterima pemilik produk pada 3 Oktober 2026; jam/status masih lokal.
- [x] Mockup checkout memperlihatkan template pembatalan platform yang dipilih pemandu. Diterima pemilik produk pada 3 Oktober 2026.
- [ ] Detail booking menyimpan syarat yang berlaku saat pemesanan melalui snapshot API.
- [x] Mockup detail booking menerapkan template 100%/50%/25%, biaya layanan tidak dikembalikan untuk pembatalan wisatawan, serta refund penuh termasuk biaya layanan bila pemandu membatalkan. Diterima pemilik produk pada 3 Oktober 2026; tiga template diuji pada fungsi domain.
- [x] Mockup reschedule menunggu persetujuan; ditolak mempertahankan jadwal lama, diterima memperbarui slot/batas refund/tenggat DP sesuai `D-50`/`D-51`. Diterima pemilik produk pada 3 Oktober 2026.
- [ ] Persetujuan reschedule, perpindahan kapasitas, dan batas refund/tenggat berasal dari API.
- [x] Mockup no-show menutup refund biasa dan tetap menyediakan sengketa bila memenuhi waktu. Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup sengketa memperlihatkan form/status sampai tepat 48 jam setelah selesai final dan menutup pengajuan biasa sesudahnya. Diterima pemilik produk pada 3 Oktober 2026; API belum memvalidasi kelayakan/menahan dana.
- [ ] Wisatawan dapat melaporkan listing, perilaku, atau masalah trip/booking; laporan operasional dibedakan jelas dari sengketa yang menahan dana (`D-120`).
- [x] UI awal My Trips, detail, dan galeri (`/my-trips/*`).
- [ ] Review final My Trips untuk kondisi akan datang, berlangsung, selesai, dan kosong.
- [x] UI awal profil sendiri dan profil publik (`/profile/*`).
- [ ] Review final profil, pengeditan data, preferensi, dan reputasi publik.
- [x] UI awal akun, keamanan akun, dan notifikasi.
- [ ] Semua pihak terkait melihat notifikasi transaksi dalam aplikasi; konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, dan pencairan yang relevan juga dikirim via WhatsApp ke wisatawan dan email ke pemandu (`D-35`).
- [x] Mockup kotak notifikasi dengan filter, dibaca/belum dibaca, detail/tautan, kosong, dan contoh peran/kanal diterima pemilik produk pada 3 Oktober 2026. Pemberitahuan pencairan hanya pada contoh individu/pemilik; tidak ada WhatsApp/email dikirim.
- [ ] Pengaturan akun serta peristiwa/status notifikasi transaksi terintegrasi API dan kanal pengiriman sebenarnya.
- [x] Mockup `/saved` memiliki simpan/hapus melalui ikon hati kartu/detail, daftar publik/grup dengan kunci route terpisah, pencarian, kosong, hapus semua dengan konfirmasi, serta salin tautan publik. Diterima pemilik produk pada 3 Oktober 2026; state selama navigasi, belum akun/API.
- [ ] Simpanan tersimpan pada akun lewat API dan pulih setelah masuk/muat ulang.
- [ ] Fase berikutnya: halaman `conversations` memiliki isi dan alur chat yang dapat direview (sekarang hanya kerangka; tidak menghalangi rilis pertama).
- [ ] Fase berikutnya: live tracking dan SOS dirancang serta ditinjau setelah rilis pertama (`D-28`).
- [x] Audit menu akun/navigasi 3 Oktober 2026: mode pemandu/KYC terhubung, penarikan/kontak/ketentuan yang belum dibuat tidak menjadi tautan aktif, empat target tidak valid Explore dihilangkan. Audit 57 URL server-rendered lulus; klik/visual browser belum diuji.

## Pemandu individu

- [x] Mockup verifikasi di `/account/kyc` menunjukkan peran individu/pemilik/anggota, KTP/swafoto, persetujuan kepemilikan, pengajuan, revisi, dan hasil contoh. Diterima pemilik produk pada 3 Oktober 2026; hanya metadata berkas, tidak ada unggahan.
- [ ] Onboarding/verifikasi pemandu terhubung akun dan API.
- [x] Mockup KTP/swafoto meminta keduanya sebelum pengajuan; sertifikat opsional memiliki tinjauan/badge terpisah. Identitas disetujui belum menggantikan review listing (`D-40`, `D-116`). Diterima pemilik produk pada 3 Oktober 2026.
- [ ] Unggahan dokumen privat, akses staf berizin, keputusan verifikasi, serta izin menjual berasal dari API.
- [x] Mockup wizard menampilkan pengajuan menunggu review, alasan revisi, persetujuan contoh, serta versi aktif yang tetap terpisah selama usulan perubahan penting (`D-116`–`D-118`, `D-126`). `/guide-mode/listing` diterima pemilik produk pada 3 Oktober 2026; respons staf/status lokal, bukan publikasi.
- [ ] Antrean review, versi listing aktif/usulan, dan izin publikasi berasal dari API; kapasitas versi baru tidak boleh kurang dari terjual/ditahan.
- [ ] Pemandu menerima hasil verifikasi, review listing, dan pembatasan akun melalui notifikasi aplikasi serta email berisi alasan dan langkah berikutnya (`D-125`).
- [x] Mockup wizard informasi/foto, rencana, jadwal, harga, kapasitas, Privat/Sharing, dan add-on dalam satu draf lokal diterima pemilik produk pada 3 Oktober 2026. Foto dibaca lokal; tidak ada unggahan atau penyimpanan API.
- [x] Mockup editor trip membuat kegiatan dengan atau tanpa referensi peta, pin kategori platform yang bisa dipakai ulang/mandiri, serta segmen antar-pin dengan titik belokan dan metadata (`D-85`–`D-92`, `D-96`). `/guide-mode/itinerary` diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026; perubahan belum tersimpan ke API.
- [x] Mockup editor linimasa memasukkan selisih waktu dari awal trip serta durasi perkiraan (0 menit diperbolehkan), lalu menampilkan pratinjau jam mulai/selesai pada beberapa slot (`D-104`, `D-105`). Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup pratinjau rencana meminta linimasa dan minimal satu pin titik temu/mulai; garis rute opsional. Pemandu dapat memilih visibilitas tepat/perkiraan tiap pin (`D-93`–`D-95`). Diterima pemilik produk pada 3 Oktober 2026; tombol mengirim hanya simulasi review, belum publikasi listing.
- [ ] Perubahan setelah ada booking menunjukkan versi lama/baru dan klasifikasi perubahan penting, termasuk rute yang berubah ≥20% atau menaikkan risiko. Perubahan kecil muncul dalam aplikasi; perubahan penting juga lewat WhatsApp dengan aksi setuju/tolak. Diam mempertahankan versi lama; penolakan atau pembatalan pemandu memberi refund penuh (`D-97`–`D-103`).
- [x] Mockup wizard menawarkan DP 50% contoh dengan tenggat 7 hari/3 hari/24 jam serta pratinjau harga dan syarat. Diterima pemilik produk pada 3 Oktober 2026; persentase DP hanya konfigurasi demonstrasi.
- [x] Mockup wizard meminta satu template Fleksibel/Sedang/Ketat dan menampilkan ketentuannya sebelum simulasi pengajuan review. Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup **By day Repeat** dan pratinjau tanggal mulai/selesai di `/guide-mode/availability` diterima pemilik produk pada 3 Oktober 2026; aturan belum tersimpan ke API.
- [x] Mockup By day Repeat meminta durasi tetap dan menghitung tanggal selesai. Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup **By day Custom** dan tanggal satu per satu diterima pemilik produk pada 3 Oktober 2026; durasi/kapasitas masih satu konfigurasi contoh per listing.
- [x] Mockup **By time Repeat hari + waktu** diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup **By time Custom hari + Repeat waktu** diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup **By time Custom hari + Custom waktu** diterima pemilik produk pada 3 Oktober 2026.
- [x] Pratinjau By time menunjukkan durasi maksimal 24 jam, slot lintas malam, dan bentrok dengan seluruh interval jadwal contoh. Diterima pemilik produk pada 3 Oktober 2026; pemeriksaan lintas listing/pemandu melalui API belum termasuk.
- [x] Mockup ketersediaan mengizinkan tepat 24 jam pada By day/By time dan memperlihatkan zona trip. Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup wizard mengisi WIB/WITA/WIT dari tiga wilayah contoh dan menyediakan koreksi zona sebelum pengajuan. Diterima pemilik produk pada 3 Oktober 2026; pemetaan semua lokasi Indonesia belum termasuk.
- [x] Mockup ketersediaan meminta satu tipe Privat/Sharing dan menjelaskan kapasitas/eksklusivitasnya. Diterima pemilik produk pada 3 Oktober 2026.
- [x] Mockup daftar slot menunjukkan kapasitas/sisa dan penutupan penjualan baru, dengan booking lama contoh tetap berlaku. Diterima pemilik produk pada 3 Oktober 2026.
- [ ] Kalender kapasitas operasional tersambung API, penutupan atomik, dan perubahan aturan terhadap booking yang sudah ada.
- [x] Mockup Repeat menunjukkan hari pekan, rentang tanggal, pengecualian, serta cutoff 15 menit/24 jam/3 hari/7 hari (`D-63`, `D-64`). Diterima pemilik produk pada 3 Oktober 2026; preview Repeat dibatasi 60 hari, bukan batas produk.
- [ ] Dashboard pemandu mobile menampilkan empat ringkasan → tugas perlu ditangani → tiga keberangkatan terdekat → satu grafik pendapatan memakai ApexCharts, dengan keadaan kosong/loading/error dan tautan detail yang benar (`D-106`–`D-114`, `D-137`).
- [ ] Grafik bulan berjalan/mingguan atau enam bulan/bulanan menunjukkan pendapatan hak bersih trip selesai menurut status ditahan, siap tarik, dan sudah dicairkan; label zona laporan profil terlihat (`D-108`, `D-109`, `D-111`, `D-115`).
- [ ] Konteks Pribadi/Grup mengganti semua data tanpa mencampur saldo. Pengelola/anggota hanya melihat data operasional yang diizinkan, tidak komponen keuangan grup (`D-23`, `D-113`).
- [ ] UI pemandu dapat mengajukan reschedule untuk booking yang tidak dapat dipenuhi; wisatawan dapat menerima jadwal baru atau meminta refund penuh termasuk biaya layanan.
- [ ] UI profil, sertifikasi, dan ulasan pemandu.
- [ ] UI pendapatan menunjukkan waktu selesai trip final, masa tunggu 7 hari, sengketa, saldo yang dapat diminta, saldo dalam permintaan pencairan, dan status transfer; nominal yang sedang diproses tidak dapat diminta ulang (`D-27`, `D-123`).
- [ ] Pemandu individu dapat meminta pencairan setelah dana siap tarik; permintaan belum tersedia selama masa tunggu atau sengketa.
- [ ] Permintaan pencairan menggabungkan seluruh saldo siap tarik dan menunjukkan minimum Rp100.000 serta alasan bila saldo belum memenuhi batas; penutupan akun yang sah adalah pengecualian (`D-80`).
- [ ] Permintaan pencairan menampilkan status menunggu persetujuan superadmin, disetujui/ditolak beralasan, dan hasil transfer mitra tanpa menghilangkan saldo saat ditolak/gagal (`D-123`).
- [ ] Review final setiap alur pemandu yang masuk rilis.

## Grup/agensi pemandu

- [x] UI awal halaman publik grup serta trip grup tersedia.
- [ ] UI pemilik grup untuk mengelola anggota, peran, dan rekening pencairan grup; listing/booking tetap dimiliki grup.
- [ ] UI pengelola mengatur listing/slot/pesanan tanpa fungsi pencairan; pemandu anggota yang memimpin ditetapkan dan terverifikasi sebelum slot dijual.
- [ ] Penggantian pemandu grup menunjukkan syarat pengganti terverifikasi/tidak bentrok; wisatawan menerima notifikasi aplikasi dan WhatsApp dengan profil publik pengganti.
- [ ] UI membuat/mengelola listing dan kalender atas nama grup.
- [ ] UI pesanan, pendapatan, dan reputasi grup.
- [ ] Hanya pemilik grup dapat meminta pencairan saldo siap tarik grup; pengelola dan pemandu anggota tidak mendapat aksi ini.
- [ ] Review final alur grup/agensi yang masuk rilis.

## Gerbang fase

- [ ] Semua layar pada cakupan rilis memiliki navigasi valid serta status kosong, loading, dan error yang relevan.
- [ ] Setiap fitur pada cakupan rilis telah diuji dan diterima pemilik produk tanpa perbaikan terbuka.
