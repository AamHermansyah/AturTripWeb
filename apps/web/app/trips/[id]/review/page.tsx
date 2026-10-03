import { notFound } from "next/navigation"
import { getTripPreview } from "@/lib/server/trip-preview"
import { ReviewList } from "@/components/shared/trips/review-list"
import { REVIEW_FILTERS, type ReviewFilter } from "@/lib/review-preview"

export default async function TripReviewsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ filter?: string }> }) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  const trip = getTripPreview(id)
  if (!trip) notFound()
  const filter = query.filter && Object.hasOwn(REVIEW_FILTERS, query.filter) ? query.filter as ReviewFilter : "all"
  return <ReviewList key={id} title={trip.journey.title} rating={trip.journey.rating} total={trip.journey.reviews} reviews={trip.reviews} detailHref={trip.detailHref} initialFilter={filter} />
}
