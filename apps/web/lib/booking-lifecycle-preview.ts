import type { BookingPreview } from "./booking-preview"
import { dpDeadline, refundPercent } from "./booking-preview.ts"
import type { DepartureSlot } from "./trip-plan"

export function cancellationAmount(trip: BookingPreview, slot: DepartureSlot, paidBase: number, paidServiceFee: number, canceledAt: number, by: "traveler" | "guide" | "dp", refundCeiling = 100) {
  if (by === "guide") return { percent: 100, amount: paidBase + paidServiceFee, returnedServiceFee: paidServiceFee }
  const percent = Math.min(refundCeiling, refundPercent(trip.cancellation, Date.parse(slot.startsAt), canceledAt))
  return { percent, amount: Math.round(paidBase * percent / 100), returnedServiceFee: 0 }
}

export function travelerReschedule(trip: BookingPreview, oldSlot: DepartureSlot, newSlot: DepartureSlot, currentDeadline: number, refundCeiling: number, acceptedAt: number, hasRemaining: boolean) {
  const nextDeadline = Math.min(currentDeadline, dpDeadline(newSlot, trip))
  return {
    nextDeadline,
    nextRefundCeiling: Math.min(refundCeiling, refundPercent(trip.cancellation, Date.parse(oldSlot.startsAt), acceptedAt)),
    requiresSettlement: hasRemaining && nextDeadline <= acceptedAt,
  }
}

export function disputeDeadline(slot: DepartureSlot): number {
  return Date.parse(slot.startsAt) + slot.durationMinutes * 60000 + 48 * 3600000
}
export function canOpenDispute(slot: DepartureSlot, now: number): boolean {
  return now <= disputeDeadline(slot)
}

export function settlementOutcome(deadline: number, holdUntil: number, paidAt: number): "settled" | "late-refund" | "payment-expired" {
  if (paidAt >= deadline) return "late-refund"
  return paidAt < holdUntil ? "settled" : "payment-expired"
}
