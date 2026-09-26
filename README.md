# AturTrip

Monorepo pnpm + Turborepo untuk marketplace wisata bersama pemandu lokal Indonesia.

| Project | Fungsi | Pengembangan |
| --- | --- | --- |
| [`apps/web`](apps/web/.docs/README.md) | Web wisatawan, pemandu individu, grup/agensi | `pnpm dev:web` (port 3000) |
| [`apps/api`](apps/api/.docs/README.md) | API, autentikasi, otorisasi, data, booking, pembayaran | `pnpm dev:api` (port 4000) |
| [`apps/web-admin`](apps/web-admin/.docs/README.md) | Panel staf admin terpisah | `pnpm dev:web-admin` (port 3001) |

Mulai dari [peta dokumentasi](.docs/README.md). Visi produk ada di [konteks bersama](.docs/shared/context.md), keputusan yang disetujui di [decision log](.docs/shared/decisions.md), dan kemajuan pada [timeline monorepo](.docs/timelines/timeline.md). Baca `AGENTS.md` pada aplikasi yang sedang dikerjakan.

Perintah umum: `pnpm dev`, `pnpm build`, `pnpm typecheck`, dan `pnpm lint`. Kode saat ini terutama UI dengan data contoh; ringkasan status terdapat di dokumen masing-masing aplikasi.
