export type JourneyType = "all" | "private" | "shared"
export type Duration = "1" | "2-3" | "4+"
export type Rating = "3.5" | "4.0" | "4.5"
export type PriceRange = "500" | "1000" | "2000" | "all"

export const JOURNEY_TYPE_OPTIONS: { id: JourneyType; label: string }[] = [
  { id: "all",     label: "Semua" },
  { id: "private", label: "Privat" },
  { id: "shared",  label: "Bersama" },
]

export const DURATION_OPTIONS: { id: Duration; label: string }[] = [
  { id: "1", label: "≤ 1 Hari" },
  { id: "2-3", label: "2-3 Hari" },
  { id: "4+", label: "4+ Hari" },
]

export const PRICE_OPTIONS: { id: PriceRange; label: string }[] = [
  { id: "500", label: "< Rp500rb" },
  { id: "1000", label: "< Rp1jt" },
  { id: "2000", label: "< Rp2jt" },
  { id: "all", label: "Semua" },
]

export const RATING_OPTIONS: { id: Rating; label: string }[] = [
  { id: "4.5", label: "4.5+" },
  { id: "4.0", label: "4.0+" },
  { id: "3.5", label: "3.5+" },
]