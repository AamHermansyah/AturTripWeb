import test from "node:test"
import assert from "node:assert/strict"
import { classifyTripChange, initialChangeState, relativeChange, transitionTripChange } from "./trip-change-preview.ts"

const old = { meeting: "start", destination: "finish", coreActivities: ["berjalan"], modes: ["kaki"], durationMinutes: 4320, difficulty: "sedang", region: "Lombok", terrain: "jalur", risk: 1, routeMeters: 10000, routeMinutes: 100, startsAt: "2026-10-17T12:00:00Z" }
test("route thresholds compare unrounded measurements and include decreases and exactly 20 percent", () => {
  for (const routeMeters of [11999, 8001]) assert.equal(classifyTripChange(old, { ...old, routeMeters }).kind, "minor")
  for (const routeMeters of [12000, 8000]) assert.equal(classifyTripChange(old, { ...old, routeMeters }).kind, "important")
  assert.equal(classifyTripChange(old, { ...old, routeMinutes: 120 }).kind, "important")
  assert.equal(classifyTripChange(old, { ...old, routeMinutes: 80 }).kind, "important")
})
test("a single substantive or increased-risk trigger is sufficient below 20 percent", () => {
  for (const change of [{ meeting: "baru" }, { destination: "baru" }, { coreActivities: ["berperahu"] }, { modes: ["perahu"] }, { durationMinutes: 4200 }, { difficulty: "berat" }, { region: "baru" }, { terrain: "batu" }, { risk: 2 }]) assert.equal(classifyTripChange(old, { ...old, ...change }).kind, "important")
  assert.equal(classifyTripChange(old, { ...old, risk: 0 }).kind, "minor")
  assert.equal(classifyTripChange({ ...old, coreActivities: ["berjalan", "istirahat"], modes: ["kaki", "jeep"] }, { ...old, coreActivities: ["istirahat", "berjalan"], modes: ["jeep", "kaki"] }).kind, "minor")
})
test("adding a route without a baseline requires consent and invalid measurements fail", () => {
  assert.equal(relativeChange(0, 0), 0)
  assert.equal(relativeChange(0, 1), null)
  assert.equal(classifyTripChange({ ...old, routeMeters: 0 }, old).kind, "important")
  assert.throws(() => relativeChange(-1, 100))
  assert.throws(() => relativeChange(100, NaN))
})
test("starting time changes cannot be accepted through an itinerary-only consent flow", () => {
  const result = classifyTripChange(old, { ...old, startsAt: "2026-10-18T12:00:00Z" })
  assert.equal(result.kind, "reschedule")
  const state = initialChangeState()
  assert.equal(transitionTripChange(state, "submit", result.kind, 100, 2), state)
})
test("silence keeps the accepted version and only traveler acceptance applies the proposal", () => {
  const draft = initialChangeState()
  assert.equal(transitionTripChange(draft, "accept", "important", 100, 2), draft)
  const pending = transitionTripChange(draft, "submit", "important", 100, 2)
  assert.equal(pending.activeVersion, "old")
  assert.equal(transitionTripChange(pending, "no-response", "important", 100, 2), pending)
  const accepted = transitionTripChange(pending, "accept", "important", 100, 2)
  assert.equal(accepted.activeVersion, "proposed")
  assert.equal(pending.activeVersion, "old")
  assert.equal(transitionTripChange(accepted, "reject", "important", 100, 2), accepted)
})
test("rejecting or provider cancellation returns all paid amounts including service fee once", () => {
  const pending = transitionTripChange(initialChangeState(), "submit", "important", 175000, 7000)
  for (const action of ["reject", "cancel"]) {
    const canceled = transitionTripChange(pending, action, "important", 175000, 7000)
    assert.equal(canceled.refund, 182000)
    assert.equal(canceled.status, "refunded")
    assert.equal(canceled.activeVersion, "old")
    assert.equal(transitionTripChange(canceled, action, "important", 175000, 7000), canceled)
  }
})
test("minor revisions notify in-app only; withdrawing an important proposal preserves the old version", () => {
  const minor = transitionTripChange(initialChangeState(), "submit", "minor", 100, 2)
  assert.equal(minor.activeVersion, "proposed")
  assert.deepEqual(minor.events[0].channels, ["Aplikasi"])
  const pending = transitionTripChange(initialChangeState(), "submit", "important", 100, 2)
  assert.deepEqual(pending.events[0].channels, ["Aplikasi", "WhatsApp"])
  const kept = transitionTripChange(pending, "keep-old", "important", 100, 2)
  assert.equal(kept.activeVersion, "old")
  assert.equal(kept.refund, 0)
  assert.equal(kept.status, "kept-old")
})
