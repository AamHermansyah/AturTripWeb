# Timeline monorepo AturTrip

Indeks ini merangkum **kemajuan lintas aplikasi**. Rincian tidak disalin di sini: [web](../../apps/web/.docs/timeline.md), [API](../../apps/api/.docs/timeline.md), [web-admin](../../apps/web-admin/.docs/timeline.md), dan [integrasi end-to-end](integration.md).

## Arti checkbox

- `[x]` berarti **butir yang tertulis** telah terbukti. “UI awal tersedia” tidak berarti fitur produksi selesai.
- `[ ]` berarti belum selesai atau belum disetujui. Butir persetujuan hanya dicentang setelah pengguna menyatakan fitur selesai tanpa perbaikan.
- Setelah fitur dibuat dan diverifikasi, agen menanyakan penerimaan pengguna; jawaban ya langsung memperbarui timeline aplikasi dan rollup ini bila gerbangnya tercapai. Lihat [alur kerja agen](../shared/ai-workflow.md).

## Gerbang produk dan project

- [x] Dokumentasi per aplikasi dan `AGENTS.md` pada web, API, serta web-admin tersedia.
- [x] Project `apps/web-admin` tersendiri tersedia sebagai kerangka, belum sebagai panel operasional.
- [ ] Parameter rilis yang masih terbuka pada [daftar keputusan](../shared/decisions.md) diputuskan, terutama mitra/tarif pembayaran, cadangan risiko, retensi data, dan cakupan saved. Fitur inti yang sudah diputuskan tetap mengikuti PRD aplikasi.
- [ ] [Fase mockup](mockup.md) selesai untuk fitur rilis.
- [ ] [Fase backend](backend.md), termasuk autentikasi dan otorisasi, selesai untuk fitur rilis.
- [ ] [Fase integrasi](integration.md), termasuk sesi dan izin kedua web, selesai.
- [ ] Pemeriksaan produk lintas peran dan persetujuan rilis akhir selesai.

Tidak ada tanggal rilis yang disepakati. Checklist rinci per aplikasi adalah sumber kemajuan tugas; dokumen ini hanya gerbang utamanya.
