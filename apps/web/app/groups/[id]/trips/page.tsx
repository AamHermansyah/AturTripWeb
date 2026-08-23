import { HomeHeader } from "@/components/shared/home-header"
import { JourneyCard } from "@/components/shared/trips/journey-card"
import { GROUP, GROUP_TRIPS, toJourneyCard } from "@/lib/constants/group"
import { TripSearch } from "./_components/trip-search"

export default function GroupTripsPage() {
  return (
    <div className="relative h-dvh w-full overflow-y-auto pb-6">
      <HomeHeader />

      <div className="space-y-4 px-5">
        <div>
          <h1 className="font-heading text-lg font-extrabold tracking-tight">
            Perjalanan {GROUP.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {GROUP.totalJourneys} perjalanan pernah dijalankan komunitas ini. Berikut yang
            sedang dibuka pendaftarannya.
          </p>
        </div>

        <TripSearch />

        <div className="flex flex-col gap-3">
          {GROUP_TRIPS.map((trip) => (
            <JourneyCard
              key={trip.id}
              journey={toJourneyCard(trip)}
              href={`/groups/${GROUP.id}/trips/${trip.id}`}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
