import { HomeHeader } from "@/components/shared/home-header"
import { GalleryView } from "@/components/shared/trips/gallery-view"
import { getGroupTripPreview } from "@/lib/server/trip-preview"
import { notFound } from "next/navigation"

export default async function CommunityTripGalleryPage({ params }: { params: Promise<{ id: string; tripId: string }> }) {
  const { id, tripId } = await params
  const trip = getGroupTripPreview(id, tripId)
  if (!trip) notFound()
  return (
    <div className="relative h-dvh w-full pb-5 overflow-y-auto">
      <HomeHeader />
      <p className="px-5 pb-4 text-sm text-muted-foreground">{trip.journey.title} · foto ilustrasi contoh.</p>
      <GalleryView images={trip.images} caption={`${trip.images.length} foto contoh`} />
    </div>
  )
}
