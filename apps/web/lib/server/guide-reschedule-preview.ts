import "server-only"
import { getTripPreview } from "./trip-preview"
import { tripInstant, type DepartureSlot } from "@/lib/trip-plan"

export function getGuideReschedulePreview() {
  const trip = getTripPreview("1")!
  const oldSlot = trip.slots.find(slot => slot.id === "evening")!
  const nextSlots: DepartureSlot[] = [
    { ...oldSlot, id: "earlier", startsAt: new Date(tripInstant("2026-10-13", "20:00", trip.zone)).toISOString() },
    { ...oldSlot, id: "later", startsAt: new Date(tripInstant("2026-10-31", "20:00", trip.zone)).toISOString() },
  ]
  return { booking: trip.booking, oldSlot, nextSlots, initialNow: Date.now() }
}
