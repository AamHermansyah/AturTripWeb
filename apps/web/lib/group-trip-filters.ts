import type { ExploreJourney } from "./explore-filters"

export const GROUP_QUICK_FILTERS = { all: "Semua", hiking: "Pendakian", camping: "Berkemah", easy: "Mudah", hard: "Sulit", family: "Ramah keluarga" } as const
export type GroupQuickFilter = keyof typeof GROUP_QUICK_FILTERS
export function matchesGroupQuick(trip: ExploreJourney, quick: GroupQuickFilter): boolean {
  if (quick === "hiking") return trip.categoryIds.includes("mountains")
  if (quick === "camping") return trip.categoryIds.includes("camping")
  if (quick === "easy") return trip.level === "Mudah"
  if (quick === "hard") return trip.level === "Sulit"
  if (quick === "family") return trip.isFamilyFriendly
  return true
}
