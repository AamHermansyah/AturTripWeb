# Kondisi implementasi apps/api

Terakhir ditinjau: 26 September 2026.

`apps/api` adalah Express + TypeScript. `src/index.ts` saat ini menyediakan parsing JSON/form, CORS, `GET /health`, respons 404, error handler, dan listener pada port default 4000. Belum ada endpoint domain produk.

CORS saat ini memakai satu origin default `http://localhost:3000` melalui `CORS_ORIGIN`. Kerangka `apps/web-admin` berjalan pada port 3001, sehingga akses browser admin ke API belum terakomodasi tanpa konfigurasi ulang. Saat integrasi, origin web dan web-admin perlu didaftarkan secara eksplisit bersama pengujian sesi/izin; ini belum menjadi bukti integrasi admin.

Belum terlihat penyimpanan database, migrasi, sistem autentikasi, middleware otorisasi, katalog, ketersediaan, booking, pembayaran, refund, atau endpoint admin. Paket bersama `packages/types`, `interfaces`, `schemas`, dan `utils` ada tetapi definisi domainnya masih minimal.

Target dan batas implementasi ada di [PRD](prd.md), [TDD](tdd.md), serta [timeline](timeline.md). Kerangka API tidak boleh dianggap sebagai fitur autentikasi atau transaksi yang selesai.
