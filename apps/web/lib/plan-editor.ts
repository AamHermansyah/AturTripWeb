import type { TripPlan } from "./trip-plan"

/** Hapus relasi yang terputus; kegiatan terkait tetap berada di linimasa. */
export function removePlanPin(plan: TripPlan, pinId: string): TripPlan {
  const removedSegments = new Set(plan.segments.filter(segment => segment.fromPinId === pinId || segment.toPinId === pinId).map(segment => segment.id))
  return {
    pins: plan.pins.filter(pin => pin.id !== pinId),
    segments: plan.segments.filter(segment => !removedSegments.has(segment.id)),
    activities: plan.activities.map(activity => ({ ...activity, reference: activity.reference && (activity.reference.kind === "pin" ? activity.reference.id === pinId : removedSegments.has(activity.reference.id)) ? null : activity.reference })),
  }
}

export function removePlanSegment(plan: TripPlan, segmentId: string): TripPlan {
  return { ...plan, segments: plan.segments.filter(segment => segment.id !== segmentId), activities: plan.activities.map(activity => ({ ...activity, reference: activity.reference?.kind === "segment" && activity.reference.id === segmentId ? null : activity.reference })) }
}

export function moveListItem<T>(items: T[], index: number, direction: -1 | 1): T[] {
  const target = index + direction
  if (index < 0 || index >= items.length || target < 0 || target >= items.length) return items
  const result = [...items]
  ;[result[index], result[target]] = [result[target], result[index]]
  return result
}
