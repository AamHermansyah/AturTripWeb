"use client"

import { JourneyCard } from "@/components/shared/trips/journey-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { EXPLORE_JOURNEYS } from "@/lib/constants/explore-journeys"

export function FeaturedJourneys({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold">
          Perjalanan unggulan
        </h2>
        <Button variant="link" onClick={onViewAll}>
          Lihat semua
        </Button>
      </div>
      <ScrollArea>
        <div className="flex w-max gap-3 px-5 pb-4">
          {EXPLORE_JOURNEYS.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
