import { notFound } from "next/navigation"
import { PublicTripDetail } from "@/components/shared/trips/public-trip-detail"
import { getTripPreview } from "@/lib/server/trip-preview"

export default async function PublicTripDetailPage({ params, searchParams }: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ slot?: string; tab?: string }>
}) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  const trip = getTripPreview(id)
  if (!trip) notFound()
  return <PublicTripDetail key={id} trip={trip} initialSlot={query.slot} initialTab={query.tab} />
}
