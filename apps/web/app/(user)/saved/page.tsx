import { SavedTrips } from "@/components/shared/trips/saved-trips"
import { EXPLORE_JOURNEYS } from "@/lib/constants/explore-journeys"
import { GROUP, GROUP_TRIPS, toJourneyCard } from "@/lib/constants/group"

export default function SavedPage() {
  const examples = [
    ...EXPLORE_JOURNEYS.slice(0, 2).map(journey => ({ journey, href: `/trips/${journey.id}` })),
    { journey: toJourneyCard(GROUP_TRIPS[0]), href: `/groups/${GROUP.id}/trips/${GROUP_TRIPS[0].id}` },
  ]
  return <SavedTrips examples={examples} />
}
