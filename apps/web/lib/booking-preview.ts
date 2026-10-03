import type { DepartureSlot, TripZone } from "./trip-plan"

export type CancellationTemplate = "flexible" | "moderate" | "strict"
export const CANCELLATION_TEMPLATES: Record<CancellationTemplate, { label: string; rules: { minimumHours: number; percent: number }[] }> = {
  flexible: { label: "Fleksibel", rules: [{ minimumHours: 48, percent: 100 }, { minimumHours: 24, percent: 50 }, { minimumHours: 0, percent: 25 }] },
  moderate: { label: "Sedang", rules: [{ minimumHours: 168, percent: 100 }, { minimumHours: 48, percent: 50 }, { minimumHours: 0, percent: 25 }] },
  strict: { label: "Ketat", rules: [{ minimumHours: 336, percent: 100 }, { minimumHours: 168, percent: 50 }, { minimumHours: 0, percent: 25 }] },
}
export type BookingPreview = {
  id: string; title: string; price: number; packageType: "per person" | "per group";
  listingType: "Privat" | "Sharing"; zone: TripZone; slots: DepartureSlot[];
  minimumParticipants: number; maximumParticipants: number;
  dpRate: number | null; dpDeadlineHours: 168 | 72 | 24; cancellation: CancellationTemplate;
  addons: { id: string; name: string; price: number }[]
}

export function currency(amount: number): string {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount)
}

export function previewPrice(trip: BookingPreview, participants: number, addonIds: string[], payment: "full" | "dp") {
  const tripPrice = trip.price * (trip.packageType === "per person" ? participants : 1)
  const addons = trip.addons.filter(addon => addonIds.includes(addon.id))
  const addonsPrice = addons.reduce((sum, addon) => sum + addon.price, 0)
  const base = tripPrice + addonsPrice
  const serviceFee = Math.round(base * 0.02)
  const downPayment = Math.round(base * (trip.dpRate ?? 1))
  const paidBase = payment === "dp" && trip.dpRate !== null ? downPayment : base
  return { tripPrice, addons, addonsPrice, base, serviceFee, total: base + serviceFee, dueNow: paidBase + serviceFee, remaining: base - paidBase }
}

export function dpDeadline(slot: DepartureSlot, trip: BookingPreview): number {
  return Date.parse(slot.startsAt) - trip.dpDeadlineHours * 3600000
}

export function dpAvailable(slot: DepartureSlot, trip: BookingPreview, now: number): boolean {
  return trip.dpRate !== null && dpDeadline(slot, trip) - now >= 24 * 3600000
}

export function validatePreviewBooking(trip: BookingPreview, slot: DepartureSlot | undefined, participants: number, now = Date.now()): string | null {
  if (!slot) return "Pilih slot perjalanan terlebih dahulu."
  if (!Number.isFinite(Date.parse(slot.startsAt)) || Date.parse(slot.startsAt) <= now) return "Waktu keberangkatan sudah lewat. Pilih slot lain."
  if (slot.status !== "available" || slot.remaining <= 0) return "Slot ini penuh atau tidak tersedia. Pilih slot lain."
  if (!Number.isInteger(participants) || participants < trip.minimumParticipants || participants > trip.maximumParticipants) return `Jumlah peserta harus ${trip.minimumParticipants}–${trip.maximumParticipants} orang.`
  const maximum = trip.listingType === "Sharing" ? Math.min(slot.remaining, slot.capacity) : slot.capacity
  if (participants > maximum) return "Jumlah peserta melebihi kapasitas slot yang tersedia."
  return null
}

export const CHECKOUT_HOLD_MS = 15 * 60 * 1000
export type PreviewPaymentStatus = "pending" | "confirmed" | "failed" | "expired" | "late-refund"
export function paymentOutcome(holdUntil: number, now: number, event: "paid" | "failed"): PreviewPaymentStatus {
  if (event === "paid") return now < holdUntil ? "confirmed" : "late-refund"
  return now < holdUntil ? "failed" : "expired"
}

export function holdSeconds(holdUntil: number, now: number): number {
  return Math.max(0, Math.ceil((holdUntil - now) / 1000))
}

export function refundPercent(template: CancellationTemplate, startsAt: number, canceledAt: number): number {
  const hours = (startsAt - canceledAt) / 3600000
  if (hours <= 0) return 0
  return CANCELLATION_TEMPLATES[template].rules.find(rule => hours >= rule.minimumHours)?.percent ?? 0
}
