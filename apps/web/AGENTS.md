# Agen aplikasi web AturTrip

Mulai dari [indeks web](.docs/README.md). Aplikasi ini melayani wisatawan, pemandu individu, dan grup/agensi; panel staf admin berada di `apps/web-admin`.

- Kebutuhan UI dan alur ada di `.docs/prd.md`; keadaan kode di `.docs/current-state.md`; checklist di `.docs/timeline.md`.
- Untuk slot, booking, pembayaran, dan refund, baca aturan bersama di `../../.docs/shared/decisions.md` serta `availability.md` sebelum mengubah perilaku.
- `apps/web` tidak boleh menjadi tempat halaman staf admin. Auth dan izin peran harus divalidasi oleh API, bukan hanya menyembunyikan menu.
- Wisatawan masuk dengan nomor HP + sandi dan OTP WhatsApp pada alur penting; pemandu dengan email + sandi dan OTP email pada alur penting. Login rutin keduanya tanpa OTP. Pemilik, pengelola, dan pemandu anggota grup punya izin berbeda sesuai keputusan bersama.
- Pendapatan trip terlaksana menunggu 7 hari sejak waktu selesai final, tertahan jika sengketa, lalu masuk saldo siap tarik. Pemandu individu atau pemilik grup meminta pencairan; UI mengikuti status API (`D-27`).
- Pakai komponen yang sudah tersedia di `components/` bila sesuai. Teks UI Bahasa Indonesia dan mobile-first.
- Ikuti aturan persetujuan fitur dan pembaruan checklist di `../../AGENTS.md` serta `../../.docs/shared/ai-workflow.md`.
