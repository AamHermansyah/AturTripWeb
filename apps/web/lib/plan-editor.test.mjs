import test from "node:test"
import assert from "node:assert/strict"
import { moveListItem, removePlanPin, removePlanSegment } from "./plan-editor.ts"

const plan = {
  pins: [{ id: "a" }, { id: "b" }, { id: "c" }],
  segments: [{ id: "ab", fromPinId: "a", toPinId: "b" }, { id: "bc", fromPinId: "b", toPinId: "c" }],
  activities: [{ id: "1", reference: { kind: "pin", id: "a" } }, { id: "2", reference: { kind: "segment", id: "ab" } }, { id: "3", reference: { kind: "pin", id: "c" } }, { id: "4", reference: null }],
}

test("removing a pin cascades only attached segments and clears dependent references", () => {
  const result = removePlanPin(plan, "a")
  assert.deepEqual(result.pins.map(pin => pin.id), ["b", "c"])
  assert.deepEqual(result.segments.map(segment => segment.id), ["bc"])
  assert.equal(result.activities.length, 4)
  assert.equal(result.activities[0].reference, null)
  assert.equal(result.activities[1].reference, null)
  assert.deepEqual(result.activities[2].reference, plan.activities[2].reference)
  assert.equal(plan.segments.length, 2)
})

test("removing a segment keeps its endpoints and independent activities", () => {
  const result = removePlanSegment(plan, "ab")
  assert.equal(result.pins.length, 3)
  assert.equal(result.activities[1].reference, null)
  assert.deepEqual(result.activities[0].reference, plan.activities[0].reference)
})

test("list ordering preserves IDs, source, and bounds", () => {
  const items = ["a", "b", "c"]
  assert.deepEqual(moveListItem(items, 1, -1), ["b", "a", "c"])
  assert.deepEqual(moveListItem(items, 1, 1), ["a", "c", "b"])
  assert.deepEqual(moveListItem(items, 0, -1), items)
  assert.deepEqual(moveListItem(items, 2, 1), items)
  assert.deepEqual(items, ["a", "b", "c"])
})
