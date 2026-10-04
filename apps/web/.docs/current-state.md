# Kondisi implementasi apps/web

Terakhir ditinjau untuk mockup akun, Explore, detail trip/grup, galeri/ulasan, checkout/detail booking, editor/wizard pemandu, KYC, Simpan, notifikasi, serta navigasi: 3 Oktober 2026. Area lain mengikuti tinjauan 26 September 2026; cek kode untuk perubahan terbaru. Penerimaan pemilik produk dicatat terpisah dari hasil pemeriksaan teknis.

## Status umum

AturTrip berada pada fase **prototipe UI/UX dengan data contoh**. Ada 43 route `page.tsx` di `apps/web/app`, termasuk redirect `/` dan halaman percakapan yang masih berupa kerangka. Jumlah halaman tidak sama dengan jumlah fitur siap pakai.

Revisi 4 Oktober 2026: UI mobile dirapikan menurut [audit desain](mobile-ui-review.md). Tiga gambar konsep tersedia; implementasi memakai bagian yang lebih datar, foto/kartu yang lebih jelas, navigasi kembali tunggal, form/editor yang lebih ringkas, dan safe area action bar. Tampilan baru masih menunggu penerimaan eksplisit. Build/lint/TypeScript lulus; 64 tes domain dan audit HTTP/SSR 60 URL lulus. Browser visual dan Lighthouse belum tersedia.

Tiga route baru: `/guide-mode/changes` (draf pemandu), `/booking/changes` (contoh usulan penting menunggu wisatawan), dan `/booking/guide-reschedule` (usulan jadwal dari pemandu). Perbandingan versi memakai metrik garis tepat yang dihitung di server, tetapi hanya peta publik tersamar dikirim ke browser. Enam kasus: koreksi kecil, waktu rute +20%, rute memutar ≥20%, risiko/medan, titik temu, dan kegiatan inti/moda. Diam mempertahankan versi lama; setuju menerapkan usulan; tolak atau pemandu membatalkan memberi simulasi refund seluruh pembayaran termasuk biaya layanan.

Reschedule pemandu memeriksa batas tepat 24 jam terhadap tenggat DP baru, meminta pelunasan bila terlalu dekat/lewat, memeriksa ulang kapasitas saat persetujuan, dan memisahkan refund pelunasan terlambat. Satu contoh booking dibuat ulang tiap halaman; state lintas halaman tidak tersinkronisasi. Versi/kapasitas/snapshot/kanal/pembayaran/refund belum berasal dari API. Kedua fitur baru belum mendapat penerimaan pemilik produk.

| Area                | Yang sudah tampak di kode                                                                                                                   | Batas saat ini                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Onboarding dan akun | Onboarding, personalisasi; form masuk/daftar/pemulihan sesuai peran, validasi, dan verifikasi OTP contoh                                    | State sementara antarhalaman; belum ada akun tersimpan, pengiriman OTP, atau sesi API               |
| Penjelajahan        | Explore dan trip grup dengan pencarian/filter, detail sesuai ID, linimasa, galeri, dan filter ulasan                                        | Katalog contoh; belum ada API, filter bahasa/ketersediaan, atau bukti listing aktif disetujui        |
| Peta                | Pin/segmen interaktif, kegiatan relatif terhadap slot, keluaran publik disamarkan server, skema cadangan saat peta gagal                     | Geometri sintetis; belum ada elevasi atau izin API untuk koordinat tepat peserta                    |
| Booking             | Checkout QRIS ilustrasi, DP, harga/add-on, tahanan lokal 15 menit; simulasi pelunasan, refund, reschedule, no-show, dan sengketa                | Tidak ada transaksi, reservasi kapasitas, snapshot, atau status booking API; route lama masih statis |
| Profil dan akun     | Profil sendiri/publik, preferensi, keamanan akun, notifikasi; perubahan nomor HP/email dengan OTP contoh dan nilai baru pada layar          | Sebagian besar state lokal dan data statis; perubahan identitas hilang setelah halaman dimuat ulang |
| Grup/agensi         | Profil grup, pencarian trip, detail/galeri/ulasan sesuai trip; slot ditutup bila pemandu utama contoh belum terverifikasi                    | Tampilan publik satu grup contoh; pengelolaan grup dan pemeriksaan izin API belum ada              |
| Pesan dan simpan    | Simpan/hapus dari kartu/detail, daftar dan pencarian simpanan publik/grup; route percakapan tersedia                                          | Simpanan hanya selama navigasi; percakapan masih kerangka                                           |
| Pemandu             | Hub, editor rencana/ketersediaan, wizard listing bertahap dengan review/revisi/versi, serta mockup KYC                                         | State lokal; belum ada dashboard, unggahan privat, publikasi, atau pengelolaan pesanan API           |

## Fondasi desain

Redesign fondasi + komponen diterima pemilik produk pada 26 September 2026; struktur halaman tidak berubah.

- Font tunggal Plus Jakarta Sans (`app/layout.tsx`); `font-heading` memakai keluarga yang sama dengan tracking rapat.
- Palet di `app/globals.css`: satu aksen jade (`--primary`) di atas netral hangat bernada pasir, mode gelap arang hangat, warna status diredam, bayangan diberi rona hangat. Logo belum final; bila warna brand berubah, ganti `--primary` beserta pasangannya di `.dark`.
- Radius berjenjang: badge 6px, tombol/input 12px, kartu/dialog/sheet 20px (`rounded-4xl`); tombol ikon tetap bulat.
- Tombol punya umpan balik tekan (`scale`), bottom navbar menandai halaman aktif (`aria-current`), dan loading route `(user)`, `trips`, `groups` memakai `components/ui/skeleton.tsx`.
- Tahap 2 (diterima 26 September 2026): tab, chip, tag, dan badge di halaman mengikuti skala radius; label memakai huruf kalimat minimal 11px tanpa `uppercase`. Bentuk bulat hanya untuk avatar, progress, dan tombol ikon. CTA booking memakai `primary`, bukan `success`.

## Lokasi kode yang sering diperlukan

- Route web: `apps/web/app/`
- Komponen fitur: `apps/web/components/shared/`
- Komponen UI: `apps/web/components/ui/`
- Data contoh: `apps/web/lib/constants/` dan beberapa file halaman/komponen
- Paket bersama: `packages/types`, `interfaces`, `schemas`, `utils` (masih minimal)

## Mockup akun sesuai peran — 3 Oktober 2026

- `/login`, `/register`, dan `/forgot-password` menawarkan Wisatawan (nomor HP) dan Pemandu (email). Navigasi daftar/masuk/pemulihan mempertahankan pilihan peran lewat `role`; identitas dan sandi tidak dimasukkan ke URL.
- Login rutin memperlihatkan hasil pratinjau tanpa OTP. Form memiliki label, pesan validasi, konfirmasi sandi, dan persetujuan contoh. OAuth contoh di layar masuk/daftar dihilangkan agar jalur akun sesuai `D-22`/`D-26`.
- Pendaftaran dan pemulihan membuka `/verify` dengan tujuan yang disamarkan serta kanal WhatsApp/email sesuai peran. Kode contoh `1234`, masa berlaku 5 menit, dan jeda kirim ulang 60 detik **hanya konfigurasi demonstrasi**, bukan kebijakan API produksi. Tersedia kondisi kode salah, kedaluwarsa, kirim ulang, dan aksi demonstrasi kedaluwarsa.
- `/new-password` hanya menampilkan form setelah OTP pemulihan contoh terverifikasi dan belum kedaluwarsa. Verifikasi pendaftaran tidak membuka form ini. Verifikasi/pemulihan yang dibuka langsung atau dimuat ulang meminta pengguna mengulang dari form identitas.
- `AuthPreviewProvider` menyimpan tantangan OTP hanya dalam state React di layout autentikasi. Tidak ada akun/sesi lokal, penyimpanan sandi, atau pengambilan keputusan izin API. Hub editor pemandu tersedia, tetapi hasil masuk contoh belum menjadi sesi yang mengizinkan operasi penyedia.
- Drawer perubahan nomor HP/email pada `/account/security` memvalidasi nilai berbeda, memperlihatkan tujuan OTP baru, dan memperbarui nilai contoh setelah kode benar. Pembatalan tidak mengubah identitas. Halaman keamanan tetap memakai akun contoh, bukan izin peran nyata.
- Verifikasi: typecheck, lint file terdampak, enam tes `pnpm --filter @atur-trip/web test:auth-preview`, build produksi, serta respons HTTP dan HTML form per peran lulus. Build memerlukan akses ke Google Fonts. Pemeriksaan visual/interaksi browser mobile belum dilakukan karena browser tidak tersedia pada sesi agen.
- Pemilik produk menjawab **belum; perlu meninjau atau memberi perbaikan** pada 3 Oktober 2026. Butir penyelesaian pada timeline tetap belum dicentang. Integrasi Better Auth/API, OTP sebenarnya, dan izin peran tetap pekerjaan fase backend/integrasi.

## Pencarian dan filter Explore — 3 Oktober 2026

- Status review: pemilik produk menjawab **belum; perlu meninjau atau memberi perbaikan** pada 3 Oktober 2026. Checklist penerimaan tetap terbuka.
- `/explore` memakai satu katalog empat trip contoh untuk kartu unggulan, kartu terdekat, dan daftar hasil. Kategori awal **Semua**; kategori yang belum memiliki contoh menampilkan keadaan kosong, bukan trip yang tidak cocok.
- Pencarian langsung mencocokkan nama trip, lokasi, dan label kategori tanpa membedakan kapital. Kata-kata dalam pencarian digabung dengan semua pilihan kategori/filter.
- Drawer menerapkan tipe Privat/Sharing, durasi (termasuk trip per jam), rating minimum, dan batas harga sesuai label. Pilihan awal seluruhnya **Semua**. Perubahan di drawer hanya berlaku setelah **Terapkan filter**; **Batal** mempertahankan filter aktif dan **Reset** mengosongkan pilihan sementara.
- URL menyimpan kata kunci, kategori, filter, dan mode semua hasil; memuat ulang/berbagi URL memulihkan pilihan. URL yang berisi pilihan filter tidak valid kembali ke **Semua**.
- Daftar hasil menampilkan jumlah, pencarian/kategori aktif, serta reset semua. **Lihat semua** pada bagian perjalanan kini membuka daftar pada Explore, menggantikan tautan ke `/explore/journeys` yang belum tersedia.
- Jarak pada bagian terdekat diberi keterangan contoh; lokasi perangkat belum digunakan. Filter bahasa, tanggal/ketersediaan, hasil pemandu/grup pada Explore, dan penjualan hanya dari listing aktif yang disetujui belum dikerjakan. Pencarian dan drawer yang sama kini tersambung ke katalog trip pada halaman grup; lihat bagian grup di bawah.
- Verifikasi: typecheck, enam tes `pnpm --filter @atur-trip/web test:explore`, build produksi, serta enam respons HTML termasuk pencarian lokasi, kategori, filter gabungan, semua hasil, dan kosong lulus. Lint tidak memiliki error; lima warning lama terdapat di `guide-groups.tsx` yang tidak diubah. Browser untuk pemeriksaan visual/interaksi mobile belum tersedia pada sesi agen. Penerimaan final Explore masih terbuka pada timeline.

## Detail trip, linimasa, dan peta — 3 Oktober 2026

- `/trips/[id]` memakai metadata dari katalog Explore yang sama untuk empat ID contoh. Data grup menggunakan katalog grup. ID yang tidak dikenal ditolak melalui `notFound()`.
- Tab dan slot dipulihkan dari URL. Memilih slot menggeser tanggal/jam kegiatan berdasarkan offset serta durasi dalam zona trip; waktu selesai lintas hari ditampilkan eksplisit. Slot penuh dapat dilihat, tetapi tidak dapat dipesan.
- Peta dan skema menghubungkan pin, segmen, dan kegiatan. Segmen menunjukkan asal/tujuan, jarak perkiraan, moda, durasi, serta catatan. Kegiatan dapat tanpa referensi peta, berbagi pin, atau memakai segmen; pin mandiri tetap dapat dipilih.
- `lib/server/trip-preview.ts` membuat geometri sintetis; `visiblePlan()` di `lib/trip-plan.ts` memproyeksikan hanya field yang diizinkan. Pin perkiraan memakai koordinat publik berbeda dan segmen terkait mengganti seluruh geometri dengan ujung publik sebelum dikirim ke klien. Koordinat tepat editor bukan data peserta nyata.
- MapLibre memiliki pilihan skema dan cadangan ketika peta gagal/delapan detik tidak siap; retry tersedia. Elevasi dan rute lapangan belum tersedia.
- `/trips/1?tab=linimasa&slot=evening` **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026** untuk interaksi peta/kegiatan, waktu relatif, serta penyamaran keluaran publik. Integrasi izin koordinat peserta masih terbuka.

## Checkout dan detail booking contoh — 3 Oktober 2026

- Drawer booking memakai slot/config trip, satu tipe Privat/Sharing, jumlah peserta, add-on terpisah, dan pilihan penuh/DP. Harga mengikuti konfigurasi per peserta (dikalikan jumlah) atau per rombongan (sekali), terpisah dari aturan eksklusivitas Privat/kapasitas Sharing. Data pilihan nonpribadi masuk query checkout.
- `/booking/checkout` memvalidasi trip, slot, jumlah peserta, add-on, dan metode pembayaran dari fixture server. Tanggal lampau, slot penuh/tertutup, jumlah tidak sah, serta add-on tidak dikenal ditolak. Form peserta memakai state sementara; identitas tidak masuk URL atau penyimpanan browser.
- Harga contoh memisahkan trip/add-on, biaya layanan 2%, total, pembayaran pertama, dan sisa. Seluruh biaya layanan dibayar pada pembayaran pertama; pelunasan tidak menambahnya lagi. DP hanya tersedia bila tenggat masih berjarak sedikitnya 24 jam.
- QRIS berupa ilustrasi yang tidak dapat dibayar. Masa tahan lokal 15 menit memakai waktu absolut. Simulasi berhasil mengonfirmasi hanya sebelum tahanan habis; pembayaran terlambat menunjukkan refund penuh. Simulasi slot berubah menolak checkout sebelum pembayaran.
- `/booking/checkout?trip=1&slot=evening&participants=2&payment=dp&addons=photo` **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026**. Tidak ada transaksi maupun kapasitas API yang dibuat.
- `/booking/preview` adalah booking sintetis baru, bukan hasil transaksi checkout. Menampilkan rincian saat pemesanan, pelunasan QRIS, pembatalan DP otomatis, refund sukarela menurut tiga template, dan refund penuh termasuk biaya layanan bila pemandu membatalkan.
- Refund alternatif mengumpulkan rekening/e-wallet contoh untuk simulasi verifikasi dan hasil transfer. Penolakan/gagal transfer mempertahankan hak refund. Tidak ada dana ditransfer atau data tujuan disimpan setelah muat ulang.
- Permintaan reschedule mempertahankan slot lama selama menunggu/ditolak. Simulasi disetujui memeriksa slot serta batas refund yang tidak meningkat dan tenggat DP yang tidak mundur (`D-50`, `D-51`). No-show menutup refund biasa; sengketa dapat disimulasikan hingga tepat 48 jam setelah waktu selesai final.
- Jam contoh dapat dimajukan untuk meninjau tenggat. Detail booking preview **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026** untuk pelunasan, pembatalan, refund alternatif, reschedule, no-show, serta sengketa lokal. Detail booking, peserta, refund, dan reschedule lama pada `/booking/[id]/*` masih statis dan belum disatukan dengan preview baru. Riwayat `/booking` kini memiliki jalur langsung ke preview baru.

## Editor pemandu — 3 Oktober 2026

- `/guide-mode` menghubungkan dua editor lokal. Ini bukan dashboard operasional atau bukti izin peran.
- `/guide-mode/itinerary` menyediakan pin sembilan kategori, segmen dengan belokan, kegiatan dengan/tanpa referensi, urutan, penghapusan, dan urungkan. Perubahan koordinat dari form diterapkan setelah validasi. Menghapus pin/segmen membersihkan referensi tanpa menghapus kegiatan.
- Validasi meminta kegiatan dan titik temu/mulai, offset berurutan, durasi nonnegatif dalam batas trip, koordinat/referensi sah, serta lokasi publik berbeda untuk pin perkiraan. Garis rute opsional. Pratinjau publik/peserta dan dua slot memakai data sintetis; tombol kirim hanya simulasi review.
- Editor rencana **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026**. Belum tersimpan ke API, melewati KYC nyata, atau menerbitkan listing.
- `/guide-mode/listing` menyatukan informasi, foto lokal/ilustrasi, kedua editor, harga/add-on, DP contoh 50%, tenggat 7 hari/3 hari/24 jam, dan tiga template pembatalan. Zona terisi dari tiga wilayah contoh serta dapat dikoreksi; penerapan jadwal memeriksa zona/durasi informasi. Perubahan editor masuk draf melalui tombol penerapan.
- Wizard memblokir pengajuan sebelum simulasi identitas disetujui dan draf lengkap. Simulasi review/revisi/approval menyimpan versi aktif terpisah dari usulan; perubahan harga/syarat, foto utama, titik temu/rencana, durasi, kapasitas, dan kesulitan memicu review ulang. Snapshot booking lama serta persetujuan peserta merupakan pekerjaan API terpisah.
- Wizard listing **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026**. Foto blob hanya ada di browser sampai halaman ditutup; tidak diunggah. Listing tidak diterbitkan dan tidak menyinkronkan katalog.
- `/guide-mode/availability` menyediakan lima pola Repeat/Custom, durasi, WIB/WITA/WIT, hari pekan/rentang/pengecualian, batas booking, serta satu tipe Privat/Sharing. Durasi tepat 24 jam dapat memakai By day atau By time.
- Hasil pratinjau menunjukkan tanggal/jam mulai dan selesai, kapasitas/sisa, cutoff, bentrok seluruh interval (termasuk lintas malam), dan penutupan penjualan baru. Simulasi booking lama tetap berlaku setelah slot ditutup. Repeat dibatasi 60 hari pada pratinjau, bukan kebijakan produk.
- Editor ketersediaan **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026** untuk lima pola, zona, bentrok, cutoff, kapasitas, dan penutupan simulasi lokal. Editor terpisah dari katalog wisatawan dan belum menyimpan aturan, memeriksa jadwal lintas listing/pemandu lewat API, atau menyediakan kalender kapasitas penuh.

## Grup, galeri, dan ulasan — 3 Oktober 2026

- `/groups/1/trips` mencocokkan pencarian, filter cepat, dan drawer secara bersamaan; jumlah/keadaan kosong/reset serta query URL berfungsi. Profil dan empat trip milik satu grup contoh menggunakan ID yang benar.
- Detail trip grup memakai linimasa, peta, slot, dan booking bersama, dengan kunci booking `group-1-[tripId]`. Pada trip grup 2/4, pemandu utama contoh belum terverifikasi sehingga seluruh slot ditutup dan booking diblokir. Ini demonstrasi `D-66`, bukan pemeriksaan API.
- Galeri publik/grup mendapat konteks trip yang sesuai. Foto masih ilustrasi: dua varian dari gambar trip yang sama, bukan bukti lokasi atau koleksi lapangan. Pembesaran memakai Dialog dengan akses keyboard/Escape.
- Daftar ulasan trip/grup memiliki filter semua, foto, terbaru, bintang lima, dan kritis, dengan jumlah/keadaan kosong serta URL. Rating agregat katalog dan distribusi masih contoh; ulasan tidak membuktikan perjalanan nyata. Teks ulasan dan label gambar memakai Bahasa Indonesia.
- Mockup grup/galeri/ulasan **diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026**. Pengelolaan grup, reputasi nyata, serta izin/penugasan API belum termasuk.

## Verifikasi perubahan 3 Oktober 2026

- Typecheck dan build produksi lulus. Build memerlukan akses Google Fonts. Skrip tes preview memakai Node `--experimental-strip-types`, tanpa dependensi tes baru: 6 auth, 6 Explore, dan 39 rencana/booking/editor/ketersediaan/listing (51 total).
- Tes domain mencakup proyeksi publik tanpa metadata/koordinat privat, tiga zona, lintas hari/24 jam, referensi, harga Privat/Sharing/add-on, DP tepat batas, tahanan terlambat, refund, reschedule, sengketa 48 jam, lima pola slot, cutoff, dan bentrok.
- Respons HTTP/HTML memverifikasi detail empat trip publik/grup, konteks galeri/ulasan, hasil pencarian/filter kosong, checkout valid/tidak sah, slot grup terblokir, detail booking lunas/DP kedaluwarsa, serta kedua editor. Ini pemeriksaan server render, bukan interaksi browser.
- Temuan 19 error lama `react-hooks/refs` pada komponen UI peta diperbaiki: callback, event listener, posisi marker, dan popup disinkronkan melalui efek dengan pelepasan listener. Komponen peta lulus lint/typecheck; gambar `<img>` pada komponen foto/kartu lama masih memberi warning. Browser tidak tersedia pada sesi agen, sehingga pemeriksaan visual, drag peta, alur klik, dan layout mobile belum dilakukan.
- Pemeriksaan akhir seluruh file TypeScript yang berubah/baru lulus lint dengan **0 error dan 15 warning gambar**. `git diff --check` bersih; 51 tes domain dijalankan ulang dan semuanya lulus.

## KYC, Simpan, dan notifikasi — 3 Oktober 2026

- `/account/kyc` meminta nama, KTP, swafoto, dan pernyataan kepemilikan sebelum simulasi pengajuan. Peran individu/pemilik/anggota, revisi, approval, serta sertifikat opsional/badge terpisah dapat ditinjau. Halaman hanya membaca metadata nama/ukuran berkas; isi tidak dibaca atau diunggah. Status KYC tidak menyinkronkan wizard atau izin API. **Diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026.**
- `/saved` memakai `SavedPreviewProvider` pada layout root: ikon hati kartu/detail menyimpan berdasarkan route lengkap, sehingga ID trip publik/grup tidak bertabrakan. Pencarian, daftar contoh, kosong, penghapusan satu/semua, serta konfirmasi hapus semua tersedia. State bertahan selama navigasi dan kosong setelah muat ulang; bukan simpanan akun. Dialog bagikan menyalin tautan publik dengan tab/slot saja, tanpa query identitas. **Diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026.**
- `/notifications` menyediakan kategori, belum dibaca, tandai semua, detail/tautan, tandai belum dibaca, dan keadaan kosong. Contoh mencakup booking, tenggat DP, reschedule, refund, sengketa, tim grup, KYC, review listing, serta pencairan. Pemilih peran hanya demonstrasi; contoh pribadi/grup dipisahkan dan pemberitahuan pencairan tidak ditampilkan pada pengelola/anggota.
- Kanal aplikasi dan WhatsApp wisatawan/email pemandu diberi label belum dikirim. Membaca notifikasi tidak menyetujui perubahan atau membayar tagihan. Halaman tujuan membuka contoh baru dan belum tersinkronisasi dengan peristiwa inbox. **Mockup notifikasi diterima pemilik produk tanpa perbaikan pada 3 Oktober 2026.**

## Audit navigasi — 3 Oktober 2026

- Audit 47 URL awal dan seluruh tautan internal hasil server render memeriksa 57 URL unik; tidak ada target 404, fallback not-found, atau error render pada cakupan tersebut. Bukti terstruktur ada di [navigation-audit.json](navigation-audit.json), peta jalur di [navigation-audit.md](navigation-audit.md). Pemeriksaan ini tidak menjalankan klik browser.
- Detail publik kembali ke Explore; detail grup kembali ke daftar grup. Header galeri/halaman turunan memakai jalur induk eksplisit, tidak bergantung riwayat browser. Ulasan grup memiliki label kembali yang sesuai.
- Hub pemandu terhubung menu akun dan hasil login contoh pemandu. Wizard/editor/KYC memiliki jalur kembali; wizard menggulir container editor ke awal langkah. Checkout terhubung drawer, hasil berhasil terhubung detail booking, dan riwayat memiliki tombol preview langsung.
- Empat target tidak valid di Explore dibersihkan: grup contoh 2/3/4 yang tidak memiliki data tidak ditautkan, dan tautan `/explore/guides` yang belum tersedia dihilangkan. Explore hanya menautkan grup contoh yang didukung; kartu pemandu masih informasi contoh tanpa profil pemandu.
- Menu akun tidak lagi menautkan penarikan/kontak/ketentuan yang belum tersedia. Tiga area tersebut diberi keterangan pratinjau; tidak ada syarat hukum atau fungsi keuangan baru yang diasumsikan.

## Batas yang perlu diingat

- Tidak ada integrasi sesi Better Auth/API, transaksi gateway, WhatsApp Business API, atau escrow pada web. Better Auth dipilih untuk `apps/api`, bukan sesi kedua di Next.js.
- `apps/web/package.json` memakai Next.js 16 dan React 19. Peta yang terpasang memakai MapLibre, bukan Mapbox GL JS.
- `/guide-mode` dan `/account/kyc` tersedia. Penarikan, kontak, dan ketentuan belum memiliki route dan tidak menjadi tautan aktif pada menu.
- Riwayat commit menunjukkan pekerjaan UI sejak April 2026 dan perluasan halaman grup pada Agustus 2026. Itu riwayat pengerjaan, bukan jadwal rilis.
- `date-availability.tsx` dan reschedule lama masih memakai tanggal contoh Agustus–September 2026. Drawer/detail baru memakai slot sintetis Oktober, bukan aturan yang disimpan editor. Lima pola sudah dapat dipratinjau secara lokal; sinkronisasi tetap pekerjaan API.
- Perhitungan waktu/konfirmasi lokal telah diuji, tetapi reservasi kapasitas atomik, pemeriksaan tenggat server, webhook idempoten, snapshot persisten, serta usulan jadwal oleh pemandu belum terintegrasi.
- Panel staf admin dipisahkan ke `apps/web-admin`; tidak ada halaman admin operasional di aplikasi web ini.
