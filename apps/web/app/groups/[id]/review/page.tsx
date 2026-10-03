import { notFound } from "next/navigation"
import { GROUP, GROUP_REVIEWS } from "@/lib/constants/group"
import { ReviewList } from "@/components/shared/trips/review-list"
import { REVIEW_FILTERS, type ReviewFilter } from "@/lib/review-preview"

export default async function GroupReviewsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ filter?: string }> }) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  if (id !== GROUP.id) notFound()
  const filter = query.filter && Object.hasOwn(REVIEW_FILTERS, query.filter) ? query.filter as ReviewFilter : "all"
  const reviews = GROUP_REVIEWS.map((review, index) => ({ ...review, postedAt: index === 0 ? "2026-09-19" : "2026-09-03" }))
  return <ReviewList title={GROUP.name} rating={GROUP.rating} total={GROUP.reviews} reviews={reviews} detailHref={`/groups/${GROUP.id}`} backLabel="Kembali ke grup" initialFilter={filter} />
}
