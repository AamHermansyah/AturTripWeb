# Fase mockup — checklist UI/UX

Status: **berjalan**. `[x] UI awal` berarti route/tampilan memang ada dalam kode pada 26 September 2026, **belum berarti desain final disetujui**. Butir review tetap `[ ]` sampai pemilik produk menerima fitur tanpa perbaikan. Lihat arti checkbox di [timeline monorepo](../../../.docs/timelines/timeline.md).

## Fondasi desain

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
- [ ] Detail trip menghubungkan kegiatan dan peta: pin/segmen tersorot saat kegiatan dipilih, pin mandiri terbaca, dan segmen menampilkan asal/tujuan, jarak perkiraan, moda, durasi, serta catatan (`D-85`–`D-92`).
- [ ] Jam/tanggal kegiatan pada detail trip bergeser sesuai slot terpilih dalam WIB/WITA/WIT, termasuk lintas tengah malam dan hari berikutnya (`D-104`).
- [ ] Tampilan publik menyamarkan pin perkiraan dan ujung garis terkait; peserta booking terkonfirmasi dapat melihat koordinat tepat sesuai izin API (`D-94`, `D-95`).
- [ ] Review final detail trip: data rute, checkpoint/elevasi, persiapan, harga, dan kredibilitas terbaca jelas di mobile.
- [x] UI awal profil grup/agensi, daftar trip, detail trip grup, dan galeri (`/groups/[id]/*`).
- [ ] Review final halaman grup/agensi dan perjalanan trip yang dimilikinya.
- [x] UI awal pemilihan tanggal, peserta, serta pilihan bayar penuh/DP pada booking drawer.
- [ ] Checkout menunjukkan tipe listing Privat/Sharing sebagai ketetapan penyedia dan masa tahan pembayaran 15 menit; wisatawan tidak memilih ulang tipe.
- [ ] Checkout serta pelunasan DP rilis awal hanya menawarkan QRIS; rincian harga trip dan biaya layanan 2% jelas, seluruh biaya layanan dibayar bersama DP pertama, tanpa biaya gateway QRIS terpisah (`D-70`, `D-74`, `D-77`).
- [ ] Harga add-on pemandu tercantum terpisah dan mengikuti template refund booking; jika refund QRIS asli tidak tersedia, wisatawan dapat menyerahkan rekening/e-wallet miliknya untuk verifikasi dan memantau transfer refund (`D-78`, `D-79`, `D-82`).
- [ ] UI dan review final pemilihan slot wisatawan untuk kelima pola di [availability.md](../../../.docs/shared/availability.md), termasuk penuh/kosong/berubah saat checkout.
- [ ] UI By time menampilkan tanggal **dan** jam selesai pada hari berikutnya untuk trip lintas tengah malam, termasuk durasi tepat 24 jam.
- [ ] Detail slot/checkout menampilkan zona waktu lokasi trip secara jelas, termasuk saat wisatawan berada di zona berbeda.
- [x] UI awal data peserta, riwayat booking, detail booking, refund, dan reschedule (`/booking/*`).
- [ ] Review final alur booking otomatis, pelunasan DP lewat platform, refund penuh bila pemandu tidak tersedia, dan reschedule sesuai kebijakan yang disetujui.
- [ ] Checkout dan detail booking menampilkan jumlah sisa DP serta pilihan tenggat 7 hari, 3 hari, atau 24 jam sebelum trip yang dipilih penyedia.
- [ ] Checkout hanya menawarkan DP bila tenggat masih berjarak sedikitnya 24 jam; setelah itu hanya bayar penuh. Detail booking menunjukkan pembatalan otomatis serta status refund bila sisa DP tidak dilunasi (`D-37`, `D-38`).
- [ ] Checkout memperlihatkan template pembatalan platform yang dipilih pemandu; detail booking menyimpan syarat yang berlaku saat pemesanan.
- [ ] Detail booking menunjukkan tiga template dengan batas 100%/50%/25%, biaya layanan yang tidak dikembalikan untuk pembatalan wisatawan, dan refund penuh bila pemandu membatalkan.
- [ ] Permintaan reschedule wisatawan menunggu persetujuan pemandu; jika ditolak, jadwal lama bertahan. Sesudah disetujui, UI menampilkan batas refund dan tenggat DP baru sesuai API.
- [ ] No-show wisatawan tidak menawarkan refund biasa; jalur sengketa tetap terlihat bila memenuhi syarat.
- [ ] Wisatawan dapat mengajukan sengketa melalui alur biasa hingga 48 jam setelah waktu selesai trip final; status sengketa terlihat pada booking.
- [ ] Wisatawan dapat melaporkan listing, perilaku, atau masalah trip/booking; laporan operasional dibedakan jelas dari sengketa yang menahan dana (`D-120`).
- [x] UI awal My Trips, detail, dan galeri (`/my-trips/*`).
- [ ] Review final My Trips untuk kondisi akan datang, berlangsung, selesai, dan kosong.
- [x] UI awal profil sendiri dan profil publik (`/profile/*`).
- [ ] Review final profil, pengeditan data, preferensi, dan reputasi publik.
- [x] UI awal akun, keamanan akun, dan notifikasi.
- [ ] Semua pihak terkait melihat notifikasi transaksi dalam aplikasi; konfirmasi booking, tenggat DP, reschedule, pembatalan/refund, sengketa, dan pencairan yang relevan juga dikirim via WhatsApp ke wisatawan dan email ke pemandu (`D-35`).
- [ ] Review final pengaturan akun dan notifikasi transaksi rilis pertama; booking, pembayaran, reschedule, refund, dan pencairan yang relevan terlihat jelas.
- [ ] Halaman `saved` memiliki isi serta alur simpan/hapus yang dapat direview (sekarang hanya kerangka).
- [ ] Fase berikutnya: halaman `conversations` memiliki isi dan alur chat yang dapat direview (sekarang hanya kerangka; tidak menghalangi rilis pertama).
- [ ] Fase berikutnya: live tracking dan SOS dirancang serta ditinjau setelah rilis pertama (`D-28`).
- [ ] Audit menu akun: route guide mode, KYC, penarikan, kontak, dan ketentuan memiliki tujuan atau dihilangkan sesuai cakupan.

## Pemandu individu

- [ ] UI onboarding dan verifikasi pemandu.
- [ ] UI meminta KTP dan swafoto untuk ditinjau staf, menunjukkan statusnya, serta sertifikat opsional untuk badge; listing baru tidak dapat terbit sebelum identitas penyedia **dan review listing** disetujui (`D-40`, `D-116`).
- [ ] Wizard/listing pemandu menunjukkan antrean review setiap listing baru, alasan revisi, dan status terbit; perubahan dalam daftar `D-126` menunggu review staf sambil versi lama tetap tampil kepada calon wisatawan (`D-116`–`D-118`).
- [ ] Pemandu menerima hasil verifikasi, review listing, dan pembatasan akun melalui notifikasi aplikasi serta email berisi alasan dan langkah berikutnya (`D-125`).
- [ ] UI wizard listing: informasi trip, foto, itinerary, rute, harga, kapasitas, Privat/Sharing, dan add-on.
- [ ] Wizard trip membuat kegiatan dengan atau tanpa referensi peta, pin kategori platform yang bisa dipakai ulang/mandiri, serta segmen antar-pin dengan titik belokan dan metadata (`D-85`–`D-92`, `D-96`).
- [ ] Wizard linimasa memasukkan selisih waktu dari awal trip serta durasi perkiraan (0 menit diperbolehkan), lalu menampilkan pratinjau jam mulai/selesai pada beberapa slot (`D-104`, `D-105`).
- [ ] Pratinjau publikasi meminta linimasa dan minimal satu pin titik temu/mulai; garis rute opsional. Pemandu dapat memilih visibilitas tepat/perkiraan tiap pin (`D-93`–`D-95`).
- [ ] Perubahan setelah ada booking menunjukkan versi lama/baru dan klasifikasi perubahan penting, termasuk rute yang berubah ≥20% atau menaikkan risiko. Perubahan kecil muncul dalam aplikasi; perubahan penting juga lewat WhatsApp dengan aksi setuju/tolak. Diam mempertahankan versi lama; penolakan atau pembatalan pemandu memberi refund penuh (`D-97`–`D-103`).
- [ ] Jika DP ditawarkan, wizard menyediakan pilihan tenggat pelunasan 7 hari, 3 hari, atau 24 jam sebelum trip per listing dan pratinjau syarat sebelum terbit.
- [ ] Wizard listing meminta satu dari tiga template pembatalan platform (Fleksibel, Sedang, Ketat); pemandu dapat melihat syarat sebelum menerbitkan trip.
- [ ] UI **By day Repeat** dan pratinjau tanggal mulai selesai serta diterima pemilik produk.
- [ ] By day Repeat meminta durasi tetap dari pemandu dan menghitung tanggal selesai saat tanggal mulai dipilih.
- [ ] UI **By day Custom** dan pratinjau tanggal satu per satu selesai serta diterima pemilik produk.
- [ ] UI **By time Repeat hari + waktu** selesai serta diterima pemilik produk.
- [ ] UI **By time Custom hari + Repeat waktu** selesai serta diterima pemilik produk.
- [ ] UI **By time Custom hari + Custom waktu** selesai serta diterima pemilik produk.
- [ ] Pratinjau By time menunjukkan durasi maksimal 24 jam, slot lintas tengah malam, dan bentrok dengan jadwal hari berikutnya.
- [ ] Wizard mengizinkan durasi tepat 24 jam pada By day maupun By time dan memperlihatkan zona waktu trip.
- [ ] Wizard mengisi WIB/WITA/WIT dari lokasi serta memungkinkan pemandu memeriksa dan mengoreksinya sebelum terbit.
- [ ] Wizard meminta satu tipe listing, Privat atau Sharing, dan menjelaskan kapasitas/eksklusivitasnya.
- [ ] UI kalender dan pengelolaan kapasitas/penutupan slot.
- [ ] Wizard menunjukkan hari pekan, tanggal mulai/akhir, dan pengecualian untuk Repeat; pemandu memilih batas booking baru 15 menit/24 jam/3 hari/7 hari per listing (`D-63`, `D-64`).
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
