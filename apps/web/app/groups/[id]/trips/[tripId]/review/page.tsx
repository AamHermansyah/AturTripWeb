import { notFound } from "next/navigation"
import { getGroupTripPreview } from "@/lib/server/trip-preview"
import { ReviewList } from "@/components/shared/trips/review-list"
import { REVIEW_FILTERS, type ReviewFilter } from "@/lib/review-preview"

export default async function GroupTripReviewsPage({ params, searchParams }: { params: Promise<{ id: string; tripId: string }>; searchParams: Promise<{ filter?: string }> }) {
  const [{ id, tripId }, query] = await Promise.all([params, searchParams])
  const trip = getGroupTripPreview(id, tripId)
  if (!trip) notFound()
  const filter = query.filter && Object.hasOwn(REVIEW_FILTERS, query.filter) ? query.filter as ReviewFilter : "all"
  return <ReviewList key={trip.booking.id} title={trip.journey.title} rating={trip.journey.rating} total={trip.journey.reviews} reviews={trip.reviews} detailHref={trip.detailHref} initialFilter={filter} />
}
