import { CHECKOUT_HOLD_MS, dpDeadline, validatePreviewBooking, type BookingPreview } from "./booking-preview.ts"
import { guideReschedule } from "./booking-lifecycle-preview.ts"
import type { DepartureSlot } from "./trip-plan"

export type GuideProposalState = {
  status: "draft" | "pending" | "accepted" | "refunded";
  settled: boolean; holdUntil: number | null; refund: number; lateRefund: number;
}
export type GuideProposalInput = { booking: BookingPreview; oldSlot: DepartureSlot; newSlot: DepartureSlot; participants: number; now: number; paidBase: number; serviceFee: number; remaining: number }
export type GuideProposalAction = "submit" | "accept" | "refund" | "start-payment" | "paid" | "failed"
export function initialGuideProposal(): GuideProposalState { return { status: "draft", settled: false, holdUntil: null, refund: 0, lateRefund: 0 } }
export function guideProposalTransition(state: GuideProposalState, action: GuideProposalAction, input: GuideProposalInput): { state: GuideProposalState; error: string | null } {
  const fail = (error: string) => ({ state, error })
  const done = (next: Partial<GuideProposalState>) => ({ state: { ...state, ...next }, error: null })
  if (state.status === "accepted" || state.status === "refunded") return fail("Contoh sudah selesai. Ulangi simulasi untuk mencoba lagi.")
  const oldExpired = input.remaining > 0 && !state.settled && input.now >= dpDeadline(input.oldSlot, input.booking)
  if (oldExpired && action !== "refund" && action !== "paid" && action !== "failed") return fail("Tenggat DP lama telah lewat. Booking lama perlu ditangani melalui pembatalan otomatis.")
  if (action === "submit") {
    if (state.status !== "draft") return fail("Usulan sudah dikirim.")
    if (Date.parse(input.oldSlot.startsAt) <= input.now) return fail("Trip lama sudah mulai. Usulan sebelum keberangkatan tidak tersedia.")
    const error = validatePreviewBooking(input.booking, input.newSlot, input.participants, input.now)
    return error ? fail(error) : done({ status: "pending" })
  }
  if (state.status !== "pending") return fail("Kirim usulan terlebih dahulu.")
  if (action === "refund") return done({ status: "refunded", holdUntil: null, refund: input.paidBase + input.serviceFee + (state.settled ? input.remaining : 0) })
  if (action === "failed") return done({ holdUntil: null })
  if (action === "paid") {
    if (state.holdUntil === null || state.settled) return fail("Tidak ada instruksi pelunasan aktif.")
    if (oldExpired || input.now >= state.holdUntil || input.now >= Date.parse(input.newSlot.startsAt)) return done({ holdUntil: null, lateRefund: state.lateRefund + input.remaining })
    return done({ settled: true, holdUntil: null })
  }
  const error = validatePreviewBooking(input.booking, input.newSlot, input.participants, input.now)
  if (error) return fail(error)
  const remaining = input.remaining > 0 && !state.settled
  if (action === "start-payment") return remaining ? done({ holdUntil: Math.min(input.now + CHECKOUT_HOLD_MS, Date.parse(input.newSlot.startsAt), dpDeadline(input.oldSlot, input.booking)) }) : fail("Tidak ada sisa pembayaran.")
  if (action === "accept") {
    if (guideReschedule(input.booking, input.newSlot, input.now, remaining).requiresSettlement) return fail("Lunasi sisa terlebih dahulu. Tenggat baru berjarak kurang dari 24 jam atau sudah lewat.")
    return done({ status: "accepted", holdUntil: null })
  }
  return fail("Tindakan tidak tersedia.")
}
