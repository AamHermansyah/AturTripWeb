# Agen aplikasi web-admin AturTrip

Mulai dari [indeks admin](.docs/README.md). Ini aplikasi Next.js tersendiri untuk staf admin, bukan route di `apps/web`.

- Kebutuhan admin ada di `.docs/prd.md`, rancangan di `.docs/tdd.md`, kondisi kode di `.docs/current-state.md`, dan checklist di `.docs/timeline.md`.
- Setiap layar operasional memerlukan sesi admin dan izin yang sesuai. API tetap memverifikasi izin pada server; UI hanya menyajikan kemampuan yang sudah diizinkan.
- Staf/superadmin masuk dengan email + sandi dan OTP email pada setiap login. Staf berbagi akses operasional nonkeuangan; hanya superadmin boleh mengakses keuangan dan mengelola akun staf.
- Masa tunggu pencairan 7 hari, saldo siap tarik, serta penahanan sengketa adalah bagian keuangan yang hanya dapat diakses superadmin (`D-27`).
- Setiap listing baru perlu persetujuan staf sebelum katalog; perubahan penting listing aktif perlu review ulang. Staf tidak mengedit isi trip atau booking langsung. Alur sinkronisasi ada di `../../.docs/shared/admin-operations.md` (`D-116`–`D-126`).
- Dashboard memiliki antrean operasional dan analitik pasar internal; ikuti `../../.docs/shared/admin-analytics.md`. Staf hanya boleh melihat agregat nonkeuangan, sedangkan grafik/CSV uang khusus superadmin (`D-127`–`D-136`).
- Kebutuhan lintas aplikasi seperti verifikasi penyedia, listing, sengketa, dan refund merujuk ke `../../.docs/shared/decisions.md` dan kontrak `apps/api`.
- Semua teks UI Bahasa Indonesia. Kerangka yang ada belum termasuk login, dashboard, atau sistem izin.
- Ikuti aturan persetujuan fitur dan pembaruan checklist di `../../AGENTS.md` serta `../../.docs/shared/ai-workflow.md`.
