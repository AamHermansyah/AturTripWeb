import test from "node:test"
import assert from "node:assert/strict"
import { CHECKOUT_HOLD_MS, dpAvailable, dpDeadline, holdSeconds, paymentOutcome, previewPrice, refundPercent, validatePreviewBooking } from "./booking-preview.ts"

const startsAt = Date.parse("2026-10-17T12:00:00Z")
const slot = { id: "a", startsAt: new Date(startsAt).toISOString(), durationMinutes: 240, capacity: 10, remaining: 4, status: "available" }
const trip = { id: "1", price: 100000, packageType: "per person", listingType: "Sharing", zone: "WITA", slots: [slot], minimumParticipants: 1, maximumParticipants: 10, dpRate: 0.5, dpDeadlineHours: 72, cancellation: "moderate", addons: [{ id: "photo", name: "Foto", price: 150000 }] }
const now = Date.parse("2026-10-03T12:00:00Z")

test("DP covers half of trip and add-ons plus the entire 2 percent service fee", () => {
  const price = previewPrice(trip, 2, ["photo", "photo", "unknown"], "dp")
  assert.equal(price.tripPrice, 200000)
  assert.equal(price.addonsPrice, 150000)
  assert.equal(price.serviceFee, 7000)
  assert.equal(price.dueNow, 182000)
  assert.equal(price.remaining, 175000)
  assert.equal(price.dueNow + price.remaining, price.total)
})

test("per-group price is charged once and full payment has no remaining balance", () => {
  const group = { ...trip, packageType: "per group" }
  assert.equal(previewPrice(group, 8, [], "full").tripPrice, 100000)
  assert.equal(previewPrice(group, 8, [], "full").remaining, 0)
  assert.equal(previewPrice(group, 8, [], "full").dueNow, 102000)
})

test("DP window includes exactly 24 hours before selected deadline and closes immediately afterwards", () => {
  for (const hours of [168, 72, 24]) {
    const config = { ...trip, dpDeadlineHours: hours }
    const deadline = dpDeadline(slot, config)
    assert.equal(deadline, startsAt - hours * 3600000)
    assert.equal(dpAvailable(slot, config, deadline - 24 * 3600000), true)
    assert.equal(dpAvailable(slot, config, deadline - 24 * 3600000 + 1), false)
  }
  assert.equal(dpAvailable(slot, { ...trip, dpRate: null }, now), false)
})

test("Sharing validates remaining seats; Privat uses full exclusive capacity", () => {
  assert.equal(validatePreviewBooking(trip, slot, 4, now), null)
  assert.match(validatePreviewBooking(trip, slot, 5, now), /kapasitas/)
  assert.equal(validatePreviewBooking({ ...trip, listingType: "Privat" }, slot, 8, now), null)
  for (const quantity of [0, 1.5, 11, NaN]) assert.ok(validatePreviewBooking(trip, slot, quantity, now))
  assert.match(validatePreviewBooking(trip, { ...slot, status: "full" }, 1, now), /penuh/)
  assert.match(validatePreviewBooking(trip, { ...slot, remaining: 0 }, 1, now), /penuh/)
  assert.match(validatePreviewBooking(trip, slot, 1, startsAt), /lewat/)
  assert.match(validatePreviewBooking(trip, undefined, 1, now), /Pilih slot/)
})

test("15 minute hold uses absolute time; payment at or after deadline cannot confirm", () => {
  const until = now + CHECKOUT_HOLD_MS
  assert.equal(CHECKOUT_HOLD_MS, 900000)
  assert.equal(holdSeconds(until, now), 900)
  assert.equal(holdSeconds(until, until - 1), 1)
  assert.equal(holdSeconds(until, until), 0)
  assert.equal(holdSeconds(until, until + 1000), 0)
  assert.equal(paymentOutcome(until, until - 1, "paid"), "confirmed")
  assert.equal(paymentOutcome(until, until, "paid"), "late-refund")
  assert.equal(paymentOutcome(until, until - 1, "failed"), "failed")
  assert.equal(paymentOutcome(until, until, "failed"), "expired")
})

test("each cancellation template changes at its exact documented thresholds", () => {
  for (const [template, first, second] of [["flexible", 48, 24], ["moderate", 168, 48], ["strict", 336, 168]]) {
    assert.equal(refundPercent(template, startsAt, startsAt - first * 3600000), 100)
    assert.equal(refundPercent(template, startsAt, startsAt - first * 3600000 + 1), 50)
    assert.equal(refundPercent(template, startsAt, startsAt - second * 3600000), 50)
    assert.equal(refundPercent(template, startsAt, startsAt - second * 3600000 + 1), 25)
    assert.equal(refundPercent(template, startsAt, startsAt), 0)
  }
})
