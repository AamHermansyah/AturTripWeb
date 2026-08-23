import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { JourneyCard, type Journey } from "@/components/shared/trips/journey-card"

interface GroupJourneysProps {
  groupId: string
  journeys: Journey[]
  totalJourneys: number
}

export function GroupJourneys({ groupId, journeys, totalJourneys }: GroupJourneysProps) {
  return (
    <div id="perjalanan" className="scroll-mt-4">
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold tracking-tight">Perjalanan Kami</h2>
        <Link
          href={`/groups/${groupId}/trips`}
          className="text-sm font-semibold text-primary"
        >
          Lihat Semua ({totalJourneys})
        </Link>
      </div>

      <ScrollArea>
        <div className="flex w-max gap-3 px-5 pb-4">
          {journeys.map((journey) => (
            <JourneyCard
              key={journey.id}
              journey={journey}
              href={`/groups/${groupId}/trips/${journey.id}`}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
