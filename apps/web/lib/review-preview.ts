import type { ReviewProps } from "@/components/shared/trips/review-card"

export type PreviewReview = ReviewProps & { postedAt: string }
export const REVIEW_FILTERS = { all: "Semua", photos: "Foto", recent: "Terbaru", five: "Bintang 5", critical: "Kritik" } as const
export type ReviewFilter = keyof typeof REVIEW_FILTERS

export function reviewPreview(title: string, photo: string, provider = "Pemandu contoh"): PreviewReview[] {
  return [
    { id: "preview-1", postedAt: "2026-09-25", author: { name: "Rangga Pratama", initials: "RP", location: "Wisatawan contoh dari Jakarta", verified: true }, date: "25 September 2026", rating: 5, title: "Kegiatan tertata rapi", content: `Contoh ulasan ${title}: penjelasan sebelum berangkat jelas dan rencana kegiatan mudah diikuti.`, images: [photo], response: { author: { name: provider }, content: "Terima kasih atas ulasan contoh ini." } },
    { id: "preview-2", postedAt: "2026-09-28", author: { name: "Dina Putri", initials: "DP", location: "Wisatawan contoh dari Bandung", verified: true }, date: "28 September 2026", rating: 4, title: "Koordinasi cukup baik", content: `Contoh ulasan ${title}: perjalanan menyenangkan, tetapi informasi perlengkapan bisa diberikan lebih awal.` },
    { id: "preview-3", postedAt: "2026-09-30", author: { name: "Arif Wibowo", initials: "AW", location: "Wisatawan contoh dari Surabaya", verified: true }, date: "30 September 2026", rating: 3, title: "Waktu istirahat perlu ditambah", content: `Contoh ulasan ${title}: beberapa kegiatan terasa terlalu singkat. Saya berharap ritme kegiatan lebih santai.` },
    { id: "preview-4", postedAt: "2026-09-20", author: { name: "Nadia Putri", initials: "NP", location: "Wisatawan contoh dari Semarang", verified: true }, date: "20 September 2026", rating: 5, title: "Rencana perjalanan mudah dipahami", content: `Contoh ulasan ${title}: jadwal dan titik temu dijelaskan dengan baik sehingga persiapan lebih mudah.`, images: [photo] },
  ]
}

export function filterPreviewReviews(reviews: PreviewReview[], filter: ReviewFilter): PreviewReview[] {
  if (filter === "recent") return [...reviews].sort((a, b) => b.postedAt.localeCompare(a.postedAt))
  return reviews.filter(review => filter === "photos" ? !!review.images?.length : filter === "five" ? review.rating === 5 : filter === "critical" ? review.rating <= 3 : true)
}
