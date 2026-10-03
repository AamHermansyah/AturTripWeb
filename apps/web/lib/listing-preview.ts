import { validateTripPlan, type TripPlan, type DepartureSlot, type TripZone } from "./trip-plan.ts"
import { validateAvailability, type AvailabilityConfig } from "./availability-preview.ts"
import type { CancellationTemplate } from "./booking-preview"

export type ListingPhoto = { id: string; src: string; name: string }
export type ListingInfo = { title: string; location: string; region: "java" | "ntb" | "papua"; zone: TripZone; category: string; difficulty: "Mudah" | "Sedang" | "Sulit"; description: string; preparation: string; included: string; durationMinutes: number; photos: ListingPhoto[] }
export type ListingPricing = { price: number; minimumParticipants: number; dpEnabled: boolean; dpDeadlineHours: 168 | 72 | 24; cancellation: CancellationTemplate; addons: { id: string; name: string; price: number }[] }
export type ListingDraft = { info: ListingInfo; plan: TripPlan; availability: AvailabilityConfig; slots: DepartureSlot[]; pricing: ListingPricing }
export type ListingReviewState = "draft" | "pending" | "revision" | "approved"
export type IdentityPreviewState = "unsubmitted" | "pending" | "revision" | "verified"
export const REGION_ZONES = { java: "WIB", ntb: "WITA", papua: "WIT" } as const

export function validateListingInfo(info: ListingInfo): string[] {
  const errors = []
  if (!info.title.trim()) errors.push("Isi nama trip.")
  if (!info.location.trim()) errors.push("Isi lokasi kegiatan.")
  if (!info.category.trim()) errors.push("Pilih kategori trip.")
  if (!info.description.trim()) errors.push("Isi deskripsi trip.")
  if (!info.preparation.trim()) errors.push("Isi persiapan dan risiko kegiatan.")
  if (!info.included.trim()) errors.push("Jelaskan fasilitas yang termasuk harga.")
  if (!Number.isInteger(info.durationMinutes) || info.durationMinutes < 1) errors.push("Durasi harus berupa menit utuh lebih dari 0.")
  if (!info.photos.length) errors.push("Tambahkan foto utama trip.")
  if (!["WIB", "WITA", "WIT"].includes(info.zone)) errors.push("Zona waktu tidak valid.")
  return errors
}
export function validateListingPricing(pricing: ListingPricing, capacity: number): string[] {
  const errors = []
  if (!Number.isSafeInteger(pricing.price) || pricing.price <= 0) errors.push("Harga trip harus berupa rupiah utuh lebih dari 0.")
  if (!Number.isInteger(pricing.minimumParticipants) || pricing.minimumParticipants < 1 || pricing.minimumParticipants > capacity) errors.push("Peserta minimum harus antara 1 dan kapasitas trip.")
  if (!["flexible", "moderate", "strict"].includes(pricing.cancellation)) errors.push("Pilih template pembatalan platform.")
  if (pricing.dpEnabled && ![168, 72, 24].includes(pricing.dpDeadlineHours)) errors.push("Pilih tenggat DP 7 hari, 3 hari, atau 24 jam.")
  if (pricing.addons.some(addon => !addon.name.trim() || !Number.isSafeInteger(addon.price) || addon.price <= 0)) errors.push("Setiap add-on perlu nama dan harga rupiah utuh lebih dari 0.")
  if (new Set(pricing.addons.map(addon => addon.id)).size !== pricing.addons.length) errors.push("Identitas add-on harus unik.")
  return errors
}
export function validateListingDraft(draft: ListingDraft, now: number): string[] {
  const errors = [...validateListingInfo(draft.info), ...validateTripPlan(draft.plan, draft.info.durationMinutes), ...validateAvailability(draft.availability), ...validateListingPricing(draft.pricing, draft.availability.capacity)]
  if (draft.availability.zone !== draft.info.zone || draft.availability.durationMinutes !== draft.info.durationMinutes) errors.push("Jadwal harus memakai zona dan durasi informasi trip terbaru. Terapkan ulang jadwal.")
  if (!draft.slots.some(slot => slot.status === "available" && slot.remaining > 0 && Date.parse(slot.startsAt) - draft.availability.bookingCutoffMinutes * 60000 > now)) errors.push("Sediakan sedikitnya satu keberangkatan yang masih terbuka sebelum batas booking.")
  if (draft.slots.some(slot => slot.durationMinutes !== draft.info.durationMinutes || slot.capacity !== draft.availability.capacity)) errors.push("Slot belum sesuai durasi/kapasitas aturan terbaru. Terapkan ulang jadwal.")
  return [...new Set(errors)]
}
export function listingSubmissionError(draft: ListingDraft, identity: IdentityPreviewState, status: ListingReviewState, now: number): string | null {
  if (identity !== "verified") return "Identitas penyedia harus disetujui sebelum listing dikirim untuk review."
  if (status === "pending") return "Pengajuan contoh ini masih menunggu review."
  return validateListingDraft(draft, now)[0] ?? null
}

/** Review staf listing terpisah dari persetujuan peserta pada booking lama. */
export function listingReviewChanges(active: ListingDraft, proposed: ListingDraft): string[] {
  const changes: string[] = []
  const differs = (a: unknown, b: unknown) => JSON.stringify(a) !== JSON.stringify(b)
  if (differs(active.pricing, proposed.pricing) || active.availability.listingType !== proposed.availability.listingType) changes.push("Harga atau syarat")
  if (active.info.photos[0]?.src !== proposed.info.photos[0]?.src) changes.push("Foto utama")
  if (differs(active.plan.pins.filter(pin => pin.category === "start"), proposed.plan.pins.filter(pin => pin.category === "start"))) changes.push("Titik temu")
  if (differs(active.plan.activities, proposed.plan.activities) || differs(active.plan.segments, proposed.plan.segments) || differs(active.plan.pins, proposed.plan.pins)) changes.push("Kegiatan atau rute")
  if (active.info.durationMinutes !== proposed.info.durationMinutes || active.info.zone !== proposed.info.zone) changes.push("Durasi atau zona waktu")
  if (active.availability.capacity !== proposed.availability.capacity) changes.push("Kapasitas")
  if (active.info.difficulty !== proposed.info.difficulty) changes.push("Tingkat kesulitan")
  if (active.info.location !== proposed.info.location || active.info.region !== proposed.info.region || active.info.category !== proposed.info.category) changes.push("Lokasi atau kategori kegiatan")
  return changes
}
