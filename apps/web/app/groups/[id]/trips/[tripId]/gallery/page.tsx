import { HomeHeader } from "@/components/shared/home-header"
import { GalleryView } from "@/components/shared/trips/gallery-view"

export default function CommunityTripGalleryPage() {
  return (
    <div className="relative h-dvh w-full pb-5 overflow-y-auto">
      <HomeHeader />
      <GalleryView caption="12 foto dari komunitas" />
    </div>
  )
}
