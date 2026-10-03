"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { JourneyCard } from "@/components/shared/trips/journey-card"
import { DEFAULT_TRIP_FILTERS, exploreUrl, filterExploreJourneys, type ExploreJourney, type ExploreState } from "@/lib/explore-filters"
import { TripSearch } from "./trip-search"
import { matchesGroupQuick, type GroupQuickFilter } from "@/lib/group-trip-filters"

export function GroupTripsContent({ groupId, groupName, journeys, initialState, initialQuick }: {
  groupId: string; groupName: string; journeys: ExploreJourney[]; initialState: ExploreState; initialQuick: GroupQuickFilter
}) {
  const [state, setState] = useState(initialState)
  const [quick, setQuick] = useState(initialQuick)
  const matches = filterExploreJourneys(journeys, state.query, "all", state.filters).filter(trip => matchesGroupQuick(trip, quick))
  function update(nextState: ExploreState, nextQuick = quick) {
    setState(nextState); setQuick(nextQuick)
    const url = new URL(exploreUrl({ ...nextState, category: "all", viewAll: false }), window.location.origin)
    url.pathname = `/groups/${groupId}/trips`
    if (nextQuick !== "all") url.searchParams.set("quick", nextQuick)
    window.history.replaceState(null, "", url)
  }
  return <div className="flex flex-col gap-5 px-5"><div><h1 className="font-heading text-xl font-extrabold">Perjalanan {groupName}</h1><p className="mt-2 text-sm text-muted-foreground">Empat listing contoh. Ketersediaan dan status penugasan pemandu dapat ditinjau pada detail masing-masing trip.</p></div><TripSearch query={state.query} onQueryChange={query => update({ ...state, query })} quick={quick} onQuickChange={value => update(state, value)} filters={state.filters} onApplyFilters={filters => update({ ...state, filters })} /><div className="flex items-center justify-between gap-3"><p className="text-sm text-muted-foreground" role="status">{matches.length} trip ditemukan</p><Button variant="ghost" size="sm" onClick={() => update({ query: "", category: "all", filters: DEFAULT_TRIP_FILTERS, viewAll: false }, "all")}>Reset semua</Button></div>{matches.length ? matches.map(trip => <JourneyCard key={trip.id} journey={trip} href={`/groups/${groupId}/trips/${trip.id}`} className="w-full" />) : <Alert><AlertTitle>Belum ada trip yang cocok</AlertTitle><AlertDescription>Coba kata kunci lain atau reset kategori dan filter.</AlertDescription></Alert>}</div>
}
