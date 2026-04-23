'use client'

import { ReviewSummary } from "./review-summary"
import { ReviewCard, ReviewProps } from "./review-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import ImageZoom from "@/components/core/image-zoom"
import { useState } from "react"

export const MOCK_REVIEWS: ReviewProps[] = [
  {
    id: "1",
    author: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      location: "Traveler from Canada",
      verified: true
    },
    date: "2 days ago",
    rating: 5,
    title: "Unforgettable Experience!",
    content: "Alex was an incredible guide. He knew all the hidden spots that weren't on the map. The hike was challenging but rewarding. Highly recommend the sunset tour!",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=200&q=80",
    ],
    response: {
      author: {
        name: "Alex Riverstone",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      },
      content: "Thank you so much, Sarah! It was a pleasure showing you around. I'm glad you enjoyed the sunset view!"
    }
  },
  {
    id: "2",
    author: {
      name: "Michael Johnson",
      initials: "MJ",
      location: "Traveler from UK",
      verified: false
    },
    date: "1 week ago",
    rating: 4,
    title: "Great trip, but rain...",
    content: "The guide was excellent and very knowledgeable. Unfortunately, the weather didn't cooperate, so we missed out on the peak view. Still a good day out.",
  },
  {
    id: "3",
    author: {
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
      location: "Traveler from Singapore",
      verified: true
    },
    date: "2 weeks ago",
    rating: 5,
    title: "Absolutely stunning!",
    content: "Everything was perfectly organized. The pace was great and the food provided exceeded my expectations. Will definitely book another trip with them.",
  }
]

type GalleryImage = {
  src: string;
  alt: string;
}

export function ReviewsSection({ tripId }: { tripId: string }) {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-extrabold text-foreground">Ulasan & Penilaian</h3>
      </div>

      <ReviewSummary />

      <div className="space-y-4 pt-4">
        {MOCK_REVIEWS.slice(0, 3).map((r, i, arr) => (
          <div key={r.id} className="space-y-4">
            <ReviewCard review={r} onClickImage={setSelected} />
            {i !== arr.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <div>
        <Link href={`/trips/${tripId}/review`} className="w-full">
          <Button size="xs" variant="outline">
            Lihat semua 128 ulasan
          </Button>
        </Link>
      </div>

      <ImageZoom
        image={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
