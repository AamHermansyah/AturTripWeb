import test from "node:test"
import assert from "node:assert/strict"
import { guideProposalTransition, initialGuideProposal } from "./guide-reschedule-preview.ts"
const oldSlot = { id: "old", startsAt: "2026-10-17T12:00:00Z", durationMinutes: 4320, capacity: 10, remaining: 10, status: "available" }
const newSlot = { ...oldSlot, id: "new", startsAt: "2026-10-13T12:00:00Z" }
const booking = { dpDeadlineHours: 168, listingType: "Sharing", minimumParticipants: 1, maximumParticipants: 10 }
const input = { booking, oldSlot, newSlot, participants: 2, now: Date.parse("2026-10-06T13:00:00Z"), paidBase: 1825000, serviceFee: 73000, remaining: 1825000 }
const step = (state, action, overrides = {}) => guideProposalTransition(state, action, { ...input, ...overrides })
test("guide proposal keeps old schedule pending and cannot accept overdue new deadline before settlement", () => {
  const pending = step(initialGuideProposal(), "submit").state
  assert.equal(pending.status, "pending")
  assert.match(step(pending, "accept").error, /Lunasi/)
  assert.equal(step(pending, "accept").state, pending)
  const instruction = step(pending, "start-payment").state
  const paid = step(instruction, "paid").state
  assert.equal(paid.settled, true)
  assert.equal(paid.status, "pending")
  assert.equal(step(paid, "accept").state.status, "accepted")
})
test("new deadline exactly 24 hours away permits DP; stale capacity is rechecked at acceptance", () => {
  const pending = step(initialGuideProposal(), "submit").state
  const now = Date.parse("2026-10-05T12:00:00Z")
  assert.equal(step(pending, "accept", { now }).state.status, "accepted")
  for (const slot of [{ ...newSlot, status: "full", remaining: 0 }, { ...newSlot, remaining: 1 }, { ...newSlot, startsAt: new Date(now).toISOString() }]) assert.ok(step(pending, "accept", { newSlot: slot, now }).error)
})
test("refund includes original service fee and any settlement without double refund", () => {
  const pending = step(initialGuideProposal(), "submit").state
  const refunded = step(pending, "refund").state
  assert.equal(refunded.refund, 1898000)
  assert.equal(step(refunded, "refund").state, refunded)
  const paid = step(step(pending, "start-payment").state, "paid").state
  assert.equal(step(paid, "refund").state.refund, 3723000)
})
test("late settlement is separately refunded, never applies the new slot, and failed payments keep the balance", () => {
  const pending = step(initialGuideProposal(), "submit").state
  const instruction = step(pending, "start-payment").state
  const late = step(instruction, "paid", { now: instruction.holdUntil }).state
  assert.equal(late.settled, false)
  assert.equal(late.status, "pending")
  assert.equal(late.lateRefund, input.remaining)
  assert.equal(step(late, "paid").state.lateRefund, input.remaining)
  const failed = step(instruction, "failed").state
  assert.equal(failed.settled, false)
  assert.equal(failed.holdUntil, null)
})
test("a pending guide proposal does not extend the old DP deadline before consent", () => {
  const pending = step(initialGuideProposal(), "submit").state
  const now = Date.parse(oldSlot.startsAt) - booking.dpDeadlineHours * 3600000
  assert.match(step(pending, "accept", { now, newSlot: { ...newSlot, startsAt: "2026-10-31T12:00:00Z" } }).error, /Tenggat DP lama/)
  const instruction = step(pending, "start-payment").state
  assert.equal(step(instruction, "paid", { now }).state.settled, false)
})
