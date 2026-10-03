import "server-only"
import { getBookingTripPreview } from "./trip-preview"
import { validatePreviewBooking } from "@/lib/booking-preview"

export function bookingPreviewInput(query: Record<string, string | string[] | undefined>) {
  const trip = typeof query.trip === "string" ? getBookingTripPreview(query.trip) : null
  const slot = trip?.slots.find(item => item.id === query.slot)
  const participants = typeof query.participants === "string" && /^\d+$/.test(query.participants) ? Number(query.participants) : 0
  const addons = typeof query.addons === "string" ? [...new Set(query.addons.split(",").filter(Boolean))] : []
  const payment = query.payment === "dp" ? "dp" as const : "full" as const
  const error = !trip ? "Trip belum dipilih atau tidak ditemukan." : query.payment !== "dp" && query.payment !== "full" ? "Pilihan pembayaran tidak valid." : addons.some(id => !trip.booking.addons.some(addon => addon.id === id)) ? "Pilihan tambahan tidak tersedia." : validatePreviewBooking(trip.booking, slot, participants)
  if (error || !trip || !slot) return { ok: false as const, error, trip }
  return { ok: true as const, trip, slot, participants, addons, payment }
}
