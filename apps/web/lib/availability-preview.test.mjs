import test from "node:test"
import assert from "node:assert/strict"
import { generateAvailability, intervalsOverlap, validateAvailability } from "./availability-preview.ts"
import { tripInstant, tripMoment } from "./trip-plan.ts"

const now = Date.parse("2026-10-03T12:00:00Z")
const base = {
  pattern: "time-repeat", zone: "WIB", durationMinutes: 360, capacity: 10, listingType: "Sharing", bookingCutoffMinutes: 1440,
  startDate: "2026-10-10", endDate: "2026-10-31", weekdays: [6], excludedDates: ["2026-10-24"], dayStartTime: "05:00",
  customDates: ["2026-10-10", "2026-10-17"], repeatedTimes: ["08:00", "20:00"],
  customStarts: [{ date: "2026-10-10", time: "20:00" }, { date: "2026-10-17", time: "14:00" }],
}

test("By day Repeat uses chosen weekdays, range, exclusions, and fixed duration", () => {
  const config = { ...base, pattern: "day-repeat", durationMinutes: 4320 }
  const result = generateAvailability(config, now)
  assert.equal(result.slots.length, 3)
  assert.deepEqual(result.slots.map(slot => tripMoment(Date.parse(slot.startsAt), "WIB").dateKey), ["2026-10-10", "2026-10-17", "2026-10-31"])
  const first = result.slots[0]
  assert.equal(tripMoment(Date.parse(first.startsAt) + first.durationMinutes * 60000, "WIB").dateKey, "2026-10-13")
})

test("By day Custom only creates unique explicitly entered dates", () => {
  const result = generateAvailability({ ...base, pattern: "day-custom", durationMinutes: 1440, customDates: ["2026-10-17", "2026-10-10", "2026-10-10"] }, now)
  assert.equal(result.slots.length, 2)
  assert.equal(tripMoment(Date.parse(result.slots[0].startsAt), "WIB").time, "05.00")
})

test("By time Repeat combines recurring days and recurring times", () => {
  const result = generateAvailability(base, now)
  assert.equal(result.slots.length, 6)
  assert.deepEqual(result.slots.slice(0, 2).map(slot => tripMoment(Date.parse(slot.startsAt), "WIB").time), ["08.00", "20.00"])
})

test("By time Custom days with Repeat times uses only entered dates", () => {
  const result = generateAvailability({ ...base, pattern: "time-custom-repeat" }, now)
  assert.equal(result.slots.length, 4)
  assert.ok(result.slots.every(slot => ["2026-10-10", "2026-10-17"].includes(tripMoment(Date.parse(slot.startsAt), "WIB").dateKey)))
})

test("By time Custom date/time pairs preserve different times and midnight end", () => {
  const result = generateAvailability({ ...base, pattern: "time-custom" }, now)
  assert.equal(result.slots.length, 2)
  const first = result.slots[0], last = result.slots[1]
  assert.equal(tripMoment(Date.parse(last.startsAt), "WIB").time, "14.00")
  const end = tripMoment(Date.parse(first.startsAt) + first.durationMinutes * 60000, "WIB")
  assert.equal(end.dateKey, "2026-10-11")
  assert.equal(end.time, "02.00")
})

test("exactly 24 hours is valid in both groups and all three timezones", () => {
  for (const zone of ["WIB", "WITA", "WIT"]) for (const pattern of ["day-custom", "time-custom"]) {
    const result = generateAvailability({ ...base, pattern, zone, durationMinutes: 1440 }, now)
    assert.equal(result.errors.length, 0)
    const first = result.slots[0]
    const start = tripMoment(Date.parse(first.startsAt), zone)
    const end = tripMoment(Date.parse(first.startsAt) + first.durationMinutes * 60000, zone)
    assert.equal(end.dateKey, "2026-10-11")
    assert.equal(end.time, start.time)
  }
})

test("overlap detects cross-midnight schedules but permits touching endpoints", () => {
  const a = tripInstant("2026-10-10", "20:00", "WIB")
  const b = tripInstant("2026-10-11", "01:00", "WIB")
  assert.equal(intervalsOverlap(a, 360, b, 120), true)
  assert.equal(intervalsOverlap(a, 360, a + 360 * 60000, 120), false)
  const result = generateAvailability({ ...base, pattern: "time-custom" }, now, [{ startsAt: new Date(b).toISOString(), durationMinutes: 120, label: "Lain" }])
  assert.equal(result.slots[0].conflict, true)
  assert.equal(result.slots[0].status, "closed")
  assert.equal(result.slots[1].status, "available")
})

test("distinct generated departures are checked for conflicts while duplicate starts collapse", () => {
  const result = generateAvailability({ ...base, pattern: "time-custom", customStarts: [{ date: "2026-10-10", time: "08:00" }, { date: "2026-10-10", time: "08:00" }, { date: "2026-10-10", time: "09:00" }] }, now)
  assert.equal(result.slots.length, 2)
  assert.ok(result.slots.every(slot => slot.conflict && slot.status === "closed"))
})

test("booking cutoff closes new sales at its exact boundary", () => {
  for (const cutoff of [15, 1440, 4320, 10080]) {
    const config = { ...base, pattern: "time-custom", bookingCutoffMinutes: cutoff }
    const start = tripInstant("2026-10-10", "20:00", "WIB")
    const boundary = start - cutoff * 60000
    assert.equal(generateAvailability(config, boundary - 1).slots[0].status, "available")
    assert.equal(generateAvailability(config, boundary).slots[0].status, "closed")
  }
})

test("invalid dates, time, duration, capacity and empty rules produce no slots", () => {
  for (const update of [{ durationMinutes: 1441 }, { durationMinutes: 0 }, { capacity: 1.5 }, { weekdays: [] }, { endDate: "2026-10-01" }, { repeatedTimes: ["24:00"] }, { excludedDates: ["2026-02-30"] }, { pattern: "time-custom", customStarts: [] }]) {
    const config = { ...base, ...update }
    assert.ok(validateAvailability(config).length > 0)
    assert.equal(generateAvailability(config, now).slots.length, 0)
  }
  assert.ok(validateAvailability({ ...base, pattern: "day-custom", durationMinutes: 1439 }).length)
})

test("empty valid schedule and truncated preview are explicit states", () => {
  const empty = generateAvailability({ ...base, endDate: "2026-10-10", excludedDates: ["2026-10-10"] }, now)
  assert.equal(empty.errors.length, 0)
  assert.equal(empty.slots.length, 0)
  const limited = generateAvailability({ ...base, endDate: "2027-10-31" }, now)
  assert.equal(limited.limited, true)
  assert.ok(limited.slots.every(slot => Date.parse(slot.startsAt) < tripInstant("2026-12-09", "00:00", "WIB")))
})
