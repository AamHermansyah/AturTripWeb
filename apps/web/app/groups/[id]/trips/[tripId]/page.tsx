import { notFound } from "next/navigation"
import { getGroupTripPreview } from "@/lib/server/trip-preview"
import { PublicTripDetail } from "@/components/shared/trips/public-trip-detail"

export default async function GroupTripDetailPage({ params, searchParams }: { params: Promise<{ id: string; tripId: string }>; searchParams: Promise<{ slot?: string; tab?: string }> }) {
  const [{ id, tripId }, query] = await Promise.all([params, searchParams])
  const trip = getGroupTripPreview(id, tripId)
  if (!trip) notFound()
  return <PublicTripDetail key={trip.booking.id} trip={trip} initialSlot={query.slot} initialTab={query.tab} />
}
