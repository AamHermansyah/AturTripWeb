import test from "node:test"
import assert from "node:assert/strict"
import { activityTimes, lineDistanceMeters, relatedActivities, selectionReference, tripInstant, tripMoment, validateTripPlan, visiblePlan } from "./trip-plan.ts"

const plan = {
  pins: [
    { id: "start", name: "Temu", description: "Perkiraan", category: "start", coordinate: [116.401237, -8.402349], publicCoordinate: [116.4, -8.4], visibility: "approximate" },
    { id: "stop", name: "Pos", description: "Istirahat", category: "rest", coordinate: [116.415, -8.388], visibility: "exact" },
    { id: "water", name: "Air", description: "Mandiri", category: "water", coordinate: [116.41, -8.38], visibility: "exact" },
  ],
  segments: [{ id: "route", fromPinId: "start", toPinId: "stop", turns: [[116.404567, -8.399109]], mode: "Berjalan kaki", durationMinutes: 60, notes: "Contoh" }],
  activities: [
    { id: "a", title: "Tiba", description: "", offsetMinutes: 0, durationMinutes: 0, reference: { kind: "pin", id: "stop" } },
    { id: "b", title: "Istirahat", description: "", offsetMinutes: 10, durationMinutes: 30, reference: { kind: "pin", id: "stop" } },
    { id: "c", title: "Bebas", description: "", offsetMinutes: 40, durationMinutes: 0, reference: null },
  ],
}

test("public payload removes exact coordinates and all turns touching an approximate pin", () => {
  const publicPlan = visiblePlan(plan, "public")
  assert.deepEqual(publicPlan.pins[0].coordinate, [116.4, -8.4])
  assert.deepEqual(publicPlan.segments[0].coordinates, [[116.4, -8.4], [116.415, -8.388]])
  const payload = JSON.stringify(publicPlan)
  for (const secret of ["116.401237", "-8.402349", "116.404567", "-8.399109", "publicCoordinate", "turns"]) assert.equal(payload.includes(secret), false)
  assert.equal(publicPlan.segments[0].approximate, true)
})

test("confirmed preview retains exact geometry without mutating source", () => {
  const confirmed = visiblePlan(plan, "confirmed")
  assert.deepEqual(confirmed.pins[0].coordinate, plan.pins[0].coordinate)
  assert.equal(confirmed.segments[0].coordinates.length, 3)
  confirmed.pins[0].coordinate[0] = 0
  assert.equal(plan.pins[0].coordinate[0], 116.401237)
})

test("approximate pin without public location fails closed", () => {
  const invalid = structuredClone(plan)
  delete invalid.pins[0].publicCoordinate
  assert.throws(() => visiblePlan(invalid, "public"), /Lokasi perkiraan/)
  assert.ok(validateTripPlan(invalid, 60).some(message => message.includes("lokasi perkiraan")))
  invalid.pins[0].publicCoordinate = [...invalid.pins[0].coordinate]
  assert.throws(() => visiblePlan(invalid, "public"), /sama dengan lokasi tepat/)
  assert.ok(validateTripPlan(invalid, 60).some(message => message.includes("harus berbeda")))
})

test("public projection whitelists fields instead of forwarding private metadata", () => {
  const withPrivateFields = structuredClone(plan)
  withPrivateFields.activities[0].privateCoordinate = [123.987654, -9.876543]
  withPrivateFields.activities[0].reference.privateBookingId = "secret-booking"
  withPrivateFields.pins[0].privateOwnerEmail = "secret@example.test"
  const payload = JSON.stringify(visiblePlan(withPrivateFields, "public"))
  for (const secret of ["privateCoordinate", "123.987654", "privateBookingId", "secret-booking", "privateOwnerEmail"]) assert.equal(payload.includes(secret), false)
})

test("shared pins link multiple activities while standalone pins and unlocated activities stay independent", () => {
  const visible = visiblePlan(plan, "public")
  assert.deepEqual(relatedActivities(visible, { kind: "pin", id: "stop" }).map(item => item.id), ["a", "b"])
  assert.equal(relatedActivities(visible, { kind: "pin", id: "water" }).length, 0)
  assert.equal(selectionReference(visible, { kind: "activity", id: "c" }), null)
  assert.deepEqual(selectionReference(visible, { kind: "activity", id: "b" }), { kind: "pin", id: "stop" })
})

test("zone conversion and midnight crossing are independent of device timezone", () => {
  for (const [zone, utcHour] of [["WIB", 13], ["WITA", 12], ["WIT", 11]]) {
    const instant = tripInstant("2026-10-17", "20:00", zone)
    assert.equal(new Date(instant).getUTCHours(), utcHour)
    const slot = { startsAt: new Date(instant).toISOString(), durationMinutes: 1440 }
    const times = activityTimes({ offsetMinutes: 240, durationMinutes: 120 }, slot, zone)
    assert.equal(times.start.dateKey, "2026-10-18")
    assert.equal(times.start.time, "00.00")
    assert.equal(times.end.time, "02.00")
    assert.equal(tripMoment(instant + 1440 * 60000, zone).dateKey, "2026-10-18")
    assert.equal(tripMoment(instant + 1440 * 60000, zone).time, "20.00")
  }
})

test("changing slot shifts activity dates while preserving relative offsets and zero duration", () => {
  const first = { startsAt: new Date(tripInstant("2026-10-10", "05:00", "WITA")).toISOString() }
  const next = { startsAt: new Date(tripInstant("2026-10-17", "20:00", "WITA")).toISOString() }
  const activity = { offsetMinutes: 1440, durationMinutes: 0 }
  const a = activityTimes(activity, first, "WITA"), b = activityTimes(activity, next, "WITA")
  assert.equal(a.start.dateKey, "2026-10-11")
  assert.equal(b.start.dateKey, "2026-10-18")
  assert.equal(b.start.time, "20.00")
  assert.deepEqual(b.start, b.end)
})

test("plan review accepts no route lines but rejects bad references, order, duration and missing start", () => {
  assert.deepEqual(validateTripPlan({ ...plan, segments: [] }, 60), [])
  const invalid = structuredClone(plan)
  invalid.pins = invalid.pins.filter(pin => pin.id !== "start")
  invalid.activities[0].offsetMinutes = 50
  invalid.activities[1].durationMinutes = -1
  invalid.activities[2].reference = { kind: "pin", id: "missing" }
  const errors = validateTripPlan(invalid, 30).join(" ")
  for (const phrase of ["titik temu", "berurutan", "negatif", "melewati", "tidak ditemukan", "dua pin berbeda"]) assert.ok(errors.includes(phrase))
})

test("distance uses drawn geometry and invalid calendar dates are rejected", () => {
  assert.equal(lineDistanceMeters([[0, 0], [0, 0]]), 0)
  assert.ok(Math.abs(lineDistanceMeters([[0, 0], [0, 1]]) - 111195) < 2)
  assert.ok(lineDistanceMeters([[0, 0], [1, 1], [0, 1]]) > lineDistanceMeters([[0, 0], [0, 1]]))
  for (const date of ["2026-02-30", "2026-13-01", "2026-1-01"]) assert.throws(() => tripInstant(date, "08:00", "WIB"))
  assert.throws(() => tripInstant("2026-10-10", "24:00", "WIB"))
})
