# Agen API AturTrip

Mulai dari [indeks API](.docs/README.md). Aplikasi ini melayani `apps/web` dan `apps/web-admin` dengan autentikasi, otorisasi, data, booking, dan operasi admin.

- Kebutuhan API ada di `.docs/prd.md`, rancangan di `.docs/tdd.md`, dan tugas terverifikasi di `.docs/timeline.md`.
- Aturan slot dan transaksi lintas aplikasi ada di `../../.docs/shared/decisions.md` serta `availability.md`; jangan menyimpulkan aturan bisnis dari mock UI.
- Autentikasi membuktikan identitas; otorisasi memeriksa izin pada **setiap** endpoint dan resource. Admin, pemandu individu, anggota grup, serta wisatawan tidak boleh mendapat akses silang tanpa izin.
- Wisatawan memakai nomor HP + sandi dan OTP WhatsApp pada alur penting; pemandu memakai email + sandi dan OTP email pada alur penting; staf/superadmin memakai email + sandi dan OTP email setiap login. Staf biasa tidak mendapat fungsi keuangan atau pengelolaan staf; hanya superadmin mendapatkannya. Listing dan booking grup tetap milik grup.
- Dana trip terlaksana menunggu 7 hari sejak waktu selesai booking final. Sengketa menahan dana; setelah layak, saldo siap tarik hanya dicairkan atas permintaan pemandu individu atau pemilik grup. Lihat `D-27` sebelum mengubah transaksi.
- Jangan menganggap UI yang menyembunyikan tombol sebagai pengamanan. Jaga dokumen KYC, data pribadi, dan status pembayaran pada server.
- Ikuti aturan persetujuan fitur dan pembaruan checklist di `../../AGENTS.md` serta `../../.docs/shared/ai-workflow.md`.
