"use client"

import { useState } from "react"
import { MagnifyingGlassIcon } from "@phosphor-icons/react"
import { ExploreSearch } from "./explore-search"
import { CategoryFilter } from "./category-filter"
import { FeaturedJourneys } from "./featured-journeys"
import { NearbyJourneys } from "./nearby-journeys"
import { FeaturedGuides } from "./featured-guides"
import { SafetyBanner } from "./safety-banner"
import { GuideGroups } from "./guide-groups"
import { HowItWorks } from "./how-it-works"
import { GuideCta } from "./guide-cta"
import { JourneyCard } from "@/components/shared/trips/journey-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { EXPLORE_JOURNEYS } from "@/lib/constants/explore-journeys"
import { EXPLORE_CATEGORIES } from "@/lib/constants/explore"
import {
  countTripFilters,
  DEFAULT_TRIP_FILTERS,
  exploreUrl,
  filterExploreJourneys,
  type ExploreState,
} from "@/lib/explore-filters"

export function ExploreContent({
  initialState,
}: {
  initialState: ExploreState
}) {
  const [state, setState] = useState(initialState)
  const activeCount = countTripFilters(state.filters)
  const searching =
    !!state.query.trim() ||
    state.category !== "all" ||
    activeCount > 0 ||
    state.viewAll
  const results = filterExploreJourneys(
    EXPLORE_JOURNEYS,
    state.query,
    state.category,
    state.filters
  )
  const categoryLabel = EXPLORE_CATEGORIES.find(
    (category) => category.id === state.category
  )?.label

  function update(nextState: ExploreState) {
    setState(nextState)
    // Simpan pilihan pada URL tanpa mengganti fokus input saat mengetik.
    window.history.replaceState(null, "", exploreUrl(nextState))
  }

  function reset() {
    update({
      query: "",
      category: "all",
      filters: { ...DEFAULT_TRIP_FILTERS },
      viewAll: false,
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="px-5 pt-5">
        <h1 className="font-heading text-3xl leading-tight font-extrabold">
          Temukan petualangan <span className="text-primary">berikutmu!</span>
        </h1>
      </div>
      <div>
        <ExploreSearch
          query={state.query}
          onQueryChange={(query) => update({ ...state, query })}
          filters={state.filters}
          onApplyFilters={(filters) => update({ ...state, filters })}
        />
        <CategoryFilter
          active={state.category}
          onChange={(category) => update({ ...state, category })}
        />
      </div>
      {searching ? (
        <section
          className="flex flex-col gap-4 px-5"
          aria-labelledby="explore-results-heading"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2
                id="explore-results-heading"
                className="font-heading text-lg font-extrabold"
              >
                Hasil perjalanan
              </h2>
              <p role="status" className="mt-1 text-sm text-muted-foreground">
                {results.length} trip contoh ditemukan
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={reset}>
              Reset semua
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {state.query.trim() && (
              <Badge variant="secondary">Pencarian: {state.query.trim()}</Badge>
            )}
            {categoryLabel && (
              <Badge variant="secondary">{categoryLabel}</Badge>
            )}
            {activeCount > 0 && (
              <Badge variant="secondary">{activeCount} filter aktif</Badge>
            )}
          </div>
          {results.length ? (
            <div className="flex flex-col gap-4">
              {results.map((journey) => (
                <JourneyCard
                  key={journey.id}
                  journey={journey}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <Empty className="px-4 py-8">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MagnifyingGlassIcon />
                </EmptyMedia>
                <EmptyTitle>Belum ada trip yang cocok</EmptyTitle>
                <EmptyDescription>
                  Coba kata kunci lain atau kurangi filter untuk melihat lebih
                  banyak perjalanan.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={reset}>Lihat semua perjalanan</Button>
              </EmptyContent>
            </Empty>
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">
            Katalog contoh untuk meninjau pencarian. Harga, detail trip, dan
            ketersediaan belum tersinkron dengan API.
          </p>
        </section>
      ) : (
        <div className="flex flex-col gap-6">
          <FeaturedJourneys
            onViewAll={() => update({ ...state, viewAll: true })}
          />
          <NearbyJourneys
            onViewAll={() => update({ ...state, viewAll: true })}
          />
          <FeaturedGuides />
          <div className="px-5">
            <SafetyBanner />
          </div>
          <GuideGroups />
          <div className="flex flex-col gap-6 px-5">
            <HowItWorks />
            <GuideCta />
          </div>
        </div>
      )}
    </div>
  )
}
