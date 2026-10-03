"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Journey } from "./journey-card"

export type SavedTripPreview = { href: string; journey: Journey }
type SavedPreview = { trips: SavedTripPreview[]; toggle: (trip: SavedTripPreview) => void; clear: () => void; addExamples: (trips: SavedTripPreview[]) => void }
const SavedContext = createContext<SavedPreview | null>(null)

export function SavedPreviewProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<SavedTripPreview[]>([])
  function toggle(trip: SavedTripPreview) { setTrips(current => current.some(item => item.href === trip.href) ? current.filter(item => item.href !== trip.href) : [...current, trip]) }
  function addExamples(examples: SavedTripPreview[]) { setTrips(current => [...current, ...examples.filter(example => !current.some(trip => trip.href === example.href))]) }
  return <SavedContext.Provider value={{ trips, toggle, clear: () => setTrips([]), addExamples }}>{children}</SavedContext.Provider>
}

export function useSavedPreview() {
  const context = useContext(SavedContext)
  if (!context) throw new Error("Pratinjau simpan harus berada di dalam provider.")
  return context
}
