import { HomeHeader } from "@/components/shared/home-header"
import { GROUP, GROUP_TRIPS, toJourneyCard } from "@/lib/constants/group"
import { GroupTripsContent } from "./_components/group-trips-content"
import { GROUP_QUICK_FILTERS, type GroupQuickFilter } from "@/lib/group-trip-filters"
import { parseExploreState, type ExploreJourney } from "@/lib/explore-filters"
import { notFound } from "next/navigation"

export default async function GroupTripsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  if (id !== GROUP.id) notFound()
  const initialState = parseExploreState(query)
  const initialQuick = typeof query.quick === "string" && Object.hasOwn(GROUP_QUICK_FILTERS, query.quick) ? query.quick as GroupQuickFilter : "all"
  const journeys: ExploreJourney[] = GROUP_TRIPS.map(trip => ({ ...toJourneyCard(trip), categoryIds: trip.category === "Berkemah" ? ["camping"] : ["mountains"] }))
  return (
    <div className="relative h-dvh w-full overflow-y-auto pb-6">
      <HomeHeader />

      <GroupTripsContent groupId={GROUP.id} groupName={GROUP.name} journeys={journeys} initialState={initialState} initialQuick={initialQuick} />
    </div>
  )
}
