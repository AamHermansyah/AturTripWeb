# Peta dokumentasi monorepo AturTrip

Pilih **satu aplikasi** sebagai titik awal. Baca dokumen bersama hanya bila tugas menyentuh aturan produk lintas aplikasi.

| Aplikasi | Tanggung jawab | Pintu masuk |
| --- | --- | --- |
| `apps/web` | Wisatawan, pemandu individu, grup/agensi, dan UI trip | [AGENTS](../apps/web/AGENTS.md) · [dokumen web](../apps/web/.docs/README.md) |
| `apps/api` | Data, autentikasi, otorisasi, ketersediaan, booking, pembayaran, dan API admin | [AGENTS](../apps/api/AGENTS.md) · [dokumen API](../apps/api/.docs/README.md) |
| `apps/web-admin` | Antarmuka staf admin yang berdiri sendiri | [AGENTS](../apps/web-admin/AGENTS.md) · [dokumen admin](../apps/web-admin/.docs/README.md) |

## Dokumen bersama

- [Konteks produk](shared/context.md): masalah, pengguna, dan visi.
- [Keputusan](shared/decisions.md): aturan yang disetujui dan pertanyaan terbuka.
- [Peta pustaka teknis](shared/tech-stack.md): pilihan library per aplikasi, status pemasangan, dan syarat integrasi.
- [Monetisasi](shared/monetization.md): hipotesis tarif, simulasi kontribusi, dan biaya yang perlu diuji.
- [Ketersediaan trip](shared/availability.md): lima pola slot, zona waktu, kapasitas, dan pembayaran.
- [Linimasa dan peta](shared/itinerary-map.md): pin kegiatan, segmen rute, visibilitas, dan interaksi pada detail trip.
- [Dashboard pemandu](shared/guide-dashboard.md): ringkasan operasional, pendapatan, grafik, serta batas izin pribadi dan grup.
- [Operasi web-admin](shared/admin-operations.md): antrean staf, review listing, laporan, pembatasan akun, pencairan, dan sinkronisasi lintas aplikasi.
- [Analitik pasar admin](shared/admin-analytics.md): metrik permintaan, pasokan, konversi, kualitas, pertumbuhan, dan keuangan sesuai izin.
- [Alur kerja agen](shared/ai-workflow.md): cara membaca, mengerjakan, memverifikasi, dan memperbarui checklist.
- [Timeline monorepo](timelines/timeline.md): indeks kemajuan lintas aplikasi. [Integrasi](timelines/integration.md) memuat gerbang end-to-end.
- [Audit sinkronisasi 26 September 2026](audit-2026-09-26.md): temuan dokumen, pembetulan lintas aplikasi, status kode, dan butir terbuka.

## Sumber informasi

Keputusan bersama mengatur niat produk. PRD aplikasi menerjemahkannya untuk pengguna aplikasi tersebut. TDD aplikasi menjelaskan rancangan teknisnya. Kode adalah bukti kondisi saat ini; `current-state.md` per aplikasi adalah ringkasan yang mungkin tertinggal. Checklist hanya dicentang sesuai arti butirnya dan persetujuan pengguna bila butir meminta persetujuan.
