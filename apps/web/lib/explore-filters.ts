import type { Journey } from "@/components/shared/trips/journey-card"
import type { CategoryId } from "@/lib/constants/explore"
import type {
  Duration,
  JourneyType,
  PriceRange,
  Rating,
} from "@/lib/constants/filter"

export type ExploreCategory = CategoryId | "all"
export type ExploreJourney = Journey & { categoryIds: CategoryId[] }
export type TripFilters = {
  type: JourneyType
  duration: Duration
  rating: Rating
  price: PriceRange
}
export const DEFAULT_TRIP_FILTERS: TripFilters = {
  type: "all",
  duration: "all",
  rating: "all",
  price: "all",
}

export type ExploreState = {
  query: string
  category: ExploreCategory
  filters: TripFilters
  viewAll: boolean
}

export function parseExploreState(
  params: Record<string, string | string[] | undefined>
): ExploreState {
  const pick = <T extends string>(
    value: string | string[] | undefined,
    values: readonly T[],
    fallback: T
  ): T =>
    typeof value === "string" && values.includes(value as T)
      ? (value as T)
      : fallback
  return {
    query: typeof params.q === "string" ? params.q : "",
    category: pick(
      params.category,
      ["all", "mountains", "rivers", "city", "camping", "island", "forest"],
      "all"
    ),
    filters: {
      type: pick(params.type, ["all", "private", "shared"], "all"),
      duration: pick(params.duration, ["all", "1", "2-3", "4+"], "all"),
      rating: pick(params.rating, ["all", "3.5", "4.0", "4.5"], "all"),
      price: pick(params.price, ["all", "500", "1000", "2000"], "all"),
    },
    viewAll: params.view === "all",
  }
}

export function exploreUrl(state: ExploreState): string {
  const params = new URLSearchParams()
  if (state.query.trim()) params.set("q", state.query.trim())
  if (state.category !== "all") params.set("category", state.category)
  for (const [key, value] of Object.entries(state.filters)) {
    if (value !== "all") params.set(key, value)
  }
  if (state.viewAll) params.set("view", "all")
  return params.size ? `/explore?${params}` : "/explore"
}

export function countTripFilters(filters: TripFilters): number {
  return Object.values(filters).filter((value) => value !== "all").length
}

export function filterExploreJourneys(
  journeys: ExploreJourney[],
  query: string,
  category: ExploreCategory,
  filters: TripFilters
): ExploreJourney[] {
  const words = query
    .trim()
    .toLocaleLowerCase("id-ID")
    .split(/\s+/)
    .filter(Boolean)
  return journeys.filter((journey) => {
    const searchable =
      `${journey.title} ${journey.location} ${journey.category}`.toLocaleLowerCase(
        "id-ID"
      )
    if (!words.every((word) => searchable.includes(word))) return false
    if (category !== "all" && !journey.categoryIds.includes(category))
      return false
    if (filters.type !== "all" && journey.type.toLowerCase() !== filters.type)
      return false
    if (
      filters.price !== "all" &&
      journey.price >= Number(filters.price) * 1000
    )
      return false
    if (filters.rating !== "all" && journey.rating < Number(filters.rating))
      return false
    const days =
      journey.duration.type === "hour"
        ? journey.duration.value / 24
        : journey.duration.value
    if (filters.duration === "1" && days > 1) return false
    if (filters.duration === "2-3" && (days <= 1 || days > 3)) return false
    if (filters.duration === "4+" && days <= 3) return false
    return true
  })
}
