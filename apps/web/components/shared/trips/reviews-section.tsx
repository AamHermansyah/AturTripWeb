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
      location: "Wisatawan dari Kanada",
      verified: true
    },
    date: "2 hari lalu",
    rating: 5,
    title: "Pengalaman Tak Terlupakan!",
    content: "Alex pemandu yang luar biasa. Dia tahu semua spot tersembunyi yang tidak ada di peta. Pendakiannya menantang tapi sangat memuaskan. Sangat merekomendasikan tur matahari terbenamnya!",
    images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=200&q=80",
      "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=200&q=80",
    ],
    response: {
      author: {
        name: "Alex Riverstone",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      },
      content: "Terima kasih banyak, Sarah! Senang sekali bisa memandumu. Aku senang kamu menikmati pemandangan matahari terbenamnya!"
    }
  },
  {
    id: "2",
    author: {
      name: "Michael Johnson",
      initials: "MJ",
      location: "Wisatawan dari Inggris",
      verified: false
    },
    date: "1 minggu lalu",
    rating: 4,
    title: "Perjalanan seru, sayang hujan...",
    content: "Pemandunya sangat baik dan menguasai medan. Sayangnya cuaca kurang bersahabat, jadi kami tidak sempat menikmati pemandangan puncak. Tetap jadi hari yang menyenangkan.",
  },
  {
    id: "3",
    author: {
      name: "Rangga Pratama",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
      location: "Wisatawan dari Jakarta",
      verified: true
    },
    date: "2 minggu lalu",
    rating: 5,
    title: "Benar-benar memukau!",
    content: "Semuanya tertata rapi. Ritme perjalanannya pas dan makanan yang disediakan melebihi ekspektasi saya. Pasti akan pesan trip lain bersama mereka.",
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
