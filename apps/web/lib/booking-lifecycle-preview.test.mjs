import test from "node:test"
import assert from "node:assert/strict"
import { cancellationAmount, canOpenDispute, disputeDeadline, guideReschedule, settlementOutcome, travelerReschedule } from "./booking-lifecycle-preview.ts"

const oldStart = Date.parse("2026-10-17T12:00:00Z")
const old = { id: "old", startsAt: new Date(oldStart).toISOString(), durationMinutes: 360, capacity: 10, remaining: 10, status: "available" }
const next = { ...old, id: "new", startsAt: "2026-10-24T12:00:00Z" }
const trip = { cancellation: "moderate", dpDeadlineHours: 72 }
const oldDeadline = oldStart - 72 * 3600000

test("guide proposals use the new DP deadline and exactly 24 hours still allows later settlement", () => {
  const newDeadline = Date.parse(next.startsAt) - 72 * 3600000
  assert.equal(guideReschedule(trip, next, newDeadline - 24 * 3600000, true).requiresSettlement, false)
  assert.equal(guideReschedule(trip, next, newDeadline - 24 * 3600000 + 1, true).requiresSettlement, true)
  assert.equal(guideReschedule(trip, next, newDeadline, true).requiresSettlement, true)
  assert.equal(guideReschedule(trip, next, newDeadline + 1, true).requiresSettlement, true)
  assert.equal(guideReschedule(trip, next, newDeadline + 1, false).requiresSettlement, false)
  assert.equal(guideReschedule(trip, next, oldStart - 200 * 3600000, true).nextDeadline, newDeadline)
  assert.ok(newDeadline > oldDeadline)
})

test("voluntary and automatic DP cancellation refund only the paid trip and add-ons, never the service fee", () => {
  for (const by of ["traveler", "dp"]) {
    const result = cancellationAmount(trip, old, 175000, 7000, oldStart - 72 * 3600000, by)
    assert.equal(result.percent, 50)
    assert.equal(result.amount, 87500)
    assert.equal(result.returnedServiceFee, 0)
    assert.ok(result.amount <= 175000)
  }
})

test("guide cancellation refunds all payments including service fee regardless of timing or reschedule ceiling", () => {
  const result = cancellationAmount(trip, old, 175000, 7000, oldStart + 3600000, "guide", 25)
  assert.deepEqual(result, { percent: 100, amount: 182000, returnedServiceFee: 7000 })
})

test("reschedule freezes the old refund percentage and moving trip later cannot restore 100 percent", () => {
  const acceptedAt = oldStart - 72 * 3600000
  const changed = travelerReschedule(trip, old, next, oldDeadline, 100, acceptedAt, false)
  assert.equal(changed.nextRefundCeiling, 50)
  const laterCancel = cancellationAmount(trip, next, 175000, 7000, acceptedAt, "traveler", changed.nextRefundCeiling)
  assert.equal(laterCancel.percent, 50)
  const laterAccepted = travelerReschedule(trip, next, { ...next, startsAt: "2026-11-01T12:00:00Z" }, changed.nextDeadline, 25, acceptedAt, false)
  assert.equal(laterAccepted.nextRefundCeiling, 25)
})

test("reschedule preserves earlier DP deadline and requires settlement if resulting deadline has passed", () => {
  assert.equal(travelerReschedule(trip, old, next, oldDeadline, 100, oldStart - 200 * 3600000, true).nextDeadline, oldDeadline)
  const earlier = { ...old, startsAt: "2026-10-10T12:00:00Z" }
  const acceptedAt = Date.parse("2026-10-08T12:00:00Z")
  const result = travelerReschedule(trip, old, earlier, oldDeadline, 100, acceptedAt, true)
  assert.equal(result.nextDeadline, Date.parse("2026-10-07T12:00:00Z"))
  assert.equal(result.requiresSettlement, true)
  assert.equal(travelerReschedule(trip, old, earlier, oldDeadline, 100, acceptedAt, false).requiresSettlement, false)
})

test("no-show does not offer ordinary refund; dispute boundary follows final end time including reschedule", () => {
  assert.equal(cancellationAmount(trip, old, 350000, 7000, oldStart, "traveler").amount, 0)
  const limit = disputeDeadline(old)
  assert.equal(limit, oldStart + 360 * 60000 + 48 * 3600000)
  assert.equal(canOpenDispute(old, limit), true)
  assert.equal(canOpenDispute(old, limit + 1), false)
  assert.equal(disputeDeadline(next) - limit, 7 * 86400000)
})

test("settlement checks both QRIS instruction expiry and DP deadline without reviving canceled booking", () => {
  const holdUntil = oldDeadline - 3600000
  assert.equal(settlementOutcome(oldDeadline, holdUntil, holdUntil - 1), "settled")
  assert.equal(settlementOutcome(oldDeadline, holdUntil, holdUntil), "payment-expired")
  assert.equal(settlementOutcome(oldDeadline, oldDeadline, oldDeadline), "late-refund")
  assert.equal(settlementOutcome(oldDeadline, oldDeadline + 3600000, oldDeadline + 1), "late-refund")
})
