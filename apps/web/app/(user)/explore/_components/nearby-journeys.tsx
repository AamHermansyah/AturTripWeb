"use client"

import { JourneyCard } from "@/components/shared/trips/journey-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { EXPLORE_JOURNEYS } from "@/lib/constants/explore-journeys"

export function NearbyJourneys({ onViewAll }: { onViewAll: () => void }) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold">
          Terdekat dari kamu
        </h2>
        <Button variant="link" onClick={onViewAll}>
          Lihat semua
        </Button>
      </div>
      <p className="mb-3 px-5 text-xs text-muted-foreground">
        Jarak contoh; belum memakai lokasi perangkat.
      </p>
      <ScrollArea>
        <div className="flex w-max gap-3 px-5 pb-4">
          {EXPLORE_JOURNEYS.map((journey, index) => (
            <JourneyCard
              key={journey.id}
              journey={{ ...journey, radius: index === 0 ? 1.2 : 10 }}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}
