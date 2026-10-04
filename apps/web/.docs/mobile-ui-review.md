# Revisi UI mobile, 4 Oktober 2026

Pemilik produk meminta perbaikan UI hasil 3 Oktober memakai `design-taste-frontend` dan `imagegen-frontend-mobile`. Revisi ini belum dianggap diterima sampai ada jawaban eksplisit. Penerimaan alur sebelumnya tetap merupakan catatan historis, bukan persetujuan atas tampilan baru.

## Audit sebelum revisi

- Identitas yang dipertahankan: logo AturTrip, Plus Jakarta Sans melalui `next/font`, aksen jade, netral hangat, dan tema terang/gelap dari token semantik.
- Arsitektur tetap: autentikasi sesuai peran; Explore → detail → slot/drawer → checkout → booking; akun → mode pemandu → editor/wizard/KYC. Slug lama, label navigasi utama, urutan field, dan isi ketentuan pembatalan dipertahankan.
- Masalah dari pembacaan kode: kartu berulang pada hampir setiap blok, status contoh serta alert teknis mendominasi bagian atas, rating/badge menutupi foto, line-height harga sangat rapat, form editor terlalu panjang, dan navigasi kembali ganda pada checkout/KYC.
- Sebelum revisi, gaya masih berpusat pada kartu dengan banyak border/badge. Tidak ada browser yang tersedia: inventaris CUA kosong dan pembukaan in-app browser gagal. Audit ini berbasis kode, bukan pengamatan screenshot.
- Baseline metadata root tetap `AturTrip | Pandu ke arah yang tepat!`; URL, metadata root, logo, dan model navigasi lama tidak dimigrasikan.

## Arah visual dan konsep

Redesign mempertahankan identitas produk. Variasi 5, gerak 2, kepadatan 4: aplikasi perjalanan dengan fotografi dominan, teks rata kiri, permukaan datar, dan pemisah tipis. Radius 16 px untuk foto/wadah, 12 px untuk kontrol; kontrol ikon bulat tetap dibatasi pada aksi foto/navigasi. Fokus keyboard dan reduced motion tetap tersedia.

Skill mobile dipakai pada tahap pembuatan gambar, dengan mode cross-platform premium neutral. Sistem gambar: near-white/jade/graphite, foto alam, tipografi sans yang terbaca, bingkai perangkat graphite seragam. Empat pola utama: strip foto, fakta ringkas, segmented control, dan ringkasan checkout. Aset pendukung terbatas pada ikon garis dan panah navigasi; gerak tersirat berupa perpindahan tab dan carousel yang tenang.

Tiga **gambar konsep, bukan screenshot implementasi**:

1. [Explore](design-concepts/explore-mobile.png)
2. [Detail trip](design-concepts/trip-detail-mobile.png)
3. [Checkout](design-concepts/checkout-mobile.png)

Gambar tidak ditampilkan sebagai produk di halaman aplikasi. Tidak ada gambar UI yang dipotong menjadi aset situs. Konsep checkout memperlihatkan ringkasan menutupi sebagian form; implementasi mempertahankan urutan form dan ringkasan yang dapat di-scroll agar input peserta tetap terjangkau. Foto pada konsep bersifat ilustratif, bukan dokumentasi destinasi. Label navigasi aktual mengikuti kode proyek, bukan teks hasil generasi gambar.

## Perubahan implementasi

| Area | Revisi |
| --- | --- |
| Autentikasi | Judul/form rata kiri, logo ringkas, ruang antarblok lebih jelas, catatan contoh yang dapat dibuka |
| Explore/kartu/Simpan | Foto 4:3 tanpa badge informasi menumpuk; rating di luar foto; harga dengan line-height normal; metadata serta foto memakai ukuran tetap |
| Detail publik/grup | Judul/lokasi di bawah foto; fakta ringkas tanpa empat wadah; slot sebelum tim; tab garis; ringkasan dan persiapan berupa bagian datar |
| Peta/linimasa | Daftar kegiatan berbentuk linimasa dengan border kiri; sorotan pilihan dan referensi tetap berfungsi |
| Checkout/booking | Peserta memakai bagian form terbuka; catatan simulasi dilipat; syarat/refund tetap terbaca; kontrol simulasi detail booking dilipat |
| Notifikasi | Daftar datar, bobot teks lebih tenang, waktu dengan kontras normal, kategori dalam grid dua kolom |
| Pemandu/KYC | Hub dengan satu jalur listing utama dan daftar alat; langkah wizard tetap satu baris; kegiatan editor dapat dilipat; daftar slot lebih datar |
| Komponen bersama | Card memiliki varian `plain`; input/textarea 16 px; border input lebih tegas di kedua tema; header kembali ganda dihapus; navbar/action bar memperhitungkan safe area bawah |

Splash global dengan persentase waktu buatan dilepas dari root layout. Halaman SSR langsung dapat dilihat; komponen splash lama tetap tersimpan sebagai berkas, tetapi tidak dipanggil. Tema default mengikuti perangkat bila belum ada preferensi tersimpan; pilihan manual tetap tersedia. Ini menghindari loading buatan pada setiap pemuatan ulang dan heading tambahan tersembunyi dari splash.

CTA detail sekarang memisahkan harga dari tombol `Pilih slot`. Aksi hubungi ke kerangka percakapan dihapus dari action bar. Route percakapan masih tersedia melalui navigasi utama sesuai scope fase berikutnya.

## Pemeriksaan dan batas

- Build produksi dan TypeScript lulus; lint semua TS/TSX yang diubah lulus tanpa error/warning pada pemeriksaan 4 Oktober.
- 64 tes domain lulus: autentikasi 6, Explore 6, serta trip/booking/editor/perubahan 52.
- Audit HTTP/SSR 60 URL lulus, termasuk koordinat contoh privat tidak ditemukan pada payload publik perubahan trip. Skrip dapat dijalankan ulang dengan `python apps/web/scripts/audit-navigation.py` saat server port 3000 berjalan.
- Perhitungan token warna: tombol primary terang sekitar 5,03:1; teks muted terang 5,76:1; primary gelap 7,60:1; muted gelap 7,51:1. Border input memakai warna solid dan latar card, dengan rasio sedikitnya 3:1 terhadap permukaan field. Ini pemeriksaan token, bukan audit seluruh warna hasil render.
- Browser visual, screenshot implementasi, keyboard/touch, dua tema secara visual, overflow 320/390/430 px, Lighthouse, dan Core Web Vitals **belum diuji**. Tidak diklaim sudah sesuai piksel dengan gambar konsep.
- Skill frontend secara eksplisit tidak ditujukan untuk wizard/form bertahap: aturan hero/marketing yang tidak relevan tidak dipaksakan ke editor atau checkout. Pola form tetap memakai shadcn/Radix yang telah dipilih proyek.

Review pemilik produk dibutuhkan untuk tampilan baru. Data dan seluruh transaksi/persetujuan masih contoh lokal; tidak ada integrasi API tambahan.
