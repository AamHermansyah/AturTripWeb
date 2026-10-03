import test from "node:test"
import assert from "node:assert/strict"
import { validateListingDraft, listingSubmissionError, listingReviewChanges } from "./listing-preview.ts"
import { generateAvailability } from "./availability-preview.ts"

const now = Date.parse("2026-10-03T00:00:00Z")
function fixture() {
  const availability = { pattern: "day-custom", zone: "WITA", durationMinutes: 1440, capacity: 10, listingType: "Privat", bookingCutoffMinutes: 1440, startDate: "2026-10-10", endDate: "2026-10-31", weekdays: [6], excludedDates: [], dayStartTime: "05:00", customDates: ["2026-10-10", "2026-10-17"], repeatedTimes: ["05:00"], customStarts: [] }
  return { info: { title: "Trip", location: "Lombok", region: "ntb", zone: "WITA", category: "Pegunungan", difficulty: "Sedang", description: "Deskripsi", preparation: "Persiapan", included: "Fasilitas", durationMinutes: 1440, photos: [{ id: "p1", src: "sample.jpg", name: "sample" }] }, plan: { pins: [{ id: "start", name: "Start", description: "", category: "start", coordinate: [116,-8], visibility: "exact" }], segments: [], activities: [{ id: "a1", title: "Activity", description: "", offsetMinutes: 0, durationMinutes: 0, reference: null }] }, availability, slots: generateAvailability(availability, now).slots, pricing: { price: 2000000, minimumParticipants: 1, dpEnabled: true, dpDeadlineHours: 168, cancellation: "moderate", addons: [] } }
}
test("listing needs both a complete draft and verified identity before submission", () => {
  const draft = fixture()
  assert.deepEqual(validateListingDraft(draft, now), [])
  for (const state of ["unsubmitted", "pending", "revision"]) assert.ok(listingSubmissionError(draft, state, "draft", now))
  assert.equal(listingSubmissionError(draft, "verified", "draft", now), null)
  assert.ok(listingSubmissionError(draft, "verified", "pending", now))
  draft.info.photos = []
  assert.ok(listingSubmissionError(draft, "verified", "draft", now))
})
test("schedule must match latest location timezone, duration and capacity", () => {
  for (const mutate of [draft => draft.info.zone = "WIB", draft => draft.info.durationMinutes = 2880, draft => draft.availability.capacity = 5]) {
    const draft = fixture(); mutate(draft)
    assert.ok(validateListingDraft(draft, now).length)
  }
  const draft = fixture()
  assert.ok(validateListingDraft(draft, Date.parse("2026-10-18T00:00:00Z")).length)
  draft.slots.forEach(slot => slot.status = "closed")
  assert.ok(validateListingDraft(draft, now).length)
})
test("price, terms, photo, core plan, duration, capacity and difficulty require staff review", () => {
  const active = fixture()
  for (const mutate of [draft => draft.pricing.price++, draft => draft.pricing.cancellation = "strict", draft => draft.pricing.dpDeadlineHours = 72, draft => draft.info.photos[0].src = "new.jpg", draft => draft.plan.pins[0].coordinate = [117,-8], draft => draft.plan.activities[0].title = "Different activity", draft => draft.info.durationMinutes = 2880, draft => draft.availability.capacity++, draft => draft.info.difficulty = "Sulit"]) {
    const proposed = structuredClone(active); mutate(proposed)
    assert.ok(listingReviewChanges(active, proposed).length)
  }
  assert.equal(active.pricing.price, 2000000)
})
test("minor description correction leaves protected listing fields and old snapshots intact", () => {
  const active = fixture(), proposed = structuredClone(active)
  proposed.info.description += " typo corrected"
  assert.deepEqual(listingReviewChanges(active, proposed), [])
  assert.notEqual(active.info.description, proposed.info.description)
})
