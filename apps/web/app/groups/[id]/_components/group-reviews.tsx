'use client'

import { useState } from "react"
import { StarIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ImageZoom from "@/components/core/image-zoom"
import { ReviewCard, type ReviewProps } from "@/components/shared/trips/review-card"
import Link from "next/link"

type GalleryImage = { src: string; alt: string }

interface GroupReviewsProps {
  rating: number
  totalReviews: number
  reviews: ReviewProps[]
  href?: string
}

export function GroupReviews({ rating, totalReviews, reviews, href = "/groups/1/review" }: GroupReviewsProps) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="font-heading text-lg font-extrabold tracking-tight">Ulasan Wisatawan</h2>

      {/* Ringkasan padat — versi panjang dengan distribusi bintang ada di halaman ulasan trip */}
      <div className="flex items-center gap-4 rounded-3xl border border-border/80 bg-card p-4 shadow-sm">
        <div className="text-center">
          <p className="font-heading text-3xl font-black leading-none tracking-tighter">
            {rating}
          </p>
          <div className="mt-1.5 flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <StarIcon
                key={n}
                weight={n <= Math.round(rating) ? "fill" : "regular"}
                className="size-3 text-warning"
              />
            ))}
          </div>
        </div>

        <Separator orientation="vertical" className="h-10" />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold leading-tight">
            {totalReviews} ulasan
          </p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
            Data ulasan contoh untuk peninjauan mockup, belum terhubung ke API.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <div key={review.id} className="space-y-4">
            <ReviewCard review={review} onClickImage={setSelected} />
            {i !== reviews.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <Button asChild variant="outline" size="sm"><Link href={href}>Lihat semua {totalReviews} ulasan contoh</Link></Button>

      <ImageZoom image={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
