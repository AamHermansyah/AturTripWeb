'use client'

import { ReviewSummary } from "@/components/shared/trips/review-summary"
import { ReviewCard } from "@/components/shared/trips/review-card"
import { MOCK_REVIEWS } from "@/components/shared/trips/reviews-section"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { HomeHeader } from "@/components/shared/home-header"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import ImageZoom from "@/components/core/image-zoom"

type GalleryImage = {
  src: string;
  alt: string;
}

export default function TripReviewsPage() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <div className="relative h-dvh w-full overflow-y-auto">
      <HomeHeader />
      <div className="px-5 py-6 space-y-6">
        <ReviewSummary />

        {/* Filter categories */}
        <ScrollArea>
          <div className="flex items-center gap-2 pb-3">
            <Button variant="default" size="xs">Semua</Button>
            <Button variant="outline" size="xs">Gambar</Button>
            <Button variant="outline" size="xs">Terbaru</Button>
            <Button variant="outline" size="xs">Bintang 5</Button>
            <Button variant="outline" size="xs">Kritik</Button>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="space-y-4">
          {MOCK_REVIEWS.slice(0, 3).map((r, i, arr) => (
            <div key={r.id} className="space-y-4">
              <ReviewCard review={r} onClickImage={setSelected} />
              {i !== arr.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>

      <ImageZoom
        image={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
