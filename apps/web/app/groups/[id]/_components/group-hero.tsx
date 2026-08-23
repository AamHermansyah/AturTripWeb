'use client'

import { useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  ShareNetworkIcon,
  HeartIcon,
  SealCheckIcon,
  MapPinIcon,
  StarIcon,
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ImageCarousel, type CarouselImage } from "@/components/shared/image-carousel"

interface GroupHeroProps {
  name: string
  category: string
  location: string
  rating: number
  reviews: number
  images: CarouselImage[]
  logoUrl: string
  isVerified?: boolean
}

export function GroupHero({
  name,
  category,
  location,
  rating,
  reviews,
  images,
  logoUrl,
  isVerified,
}: GroupHeroProps) {
  const router = useRouter()

  return (
    <div>
      <ImageCarousel
        images={images}
        className="h-56 w-full"
        overlay={
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-2 pt-4">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Kembali"
              className="border-none bg-black/40 text-white hover:bg-black/60 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon weight="bold" />
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Bagikan"
                className="border-none bg-black/40 text-white hover:bg-black/60 hover:text-white"
              >
                <ShareNetworkIcon weight="bold" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Simpan"
                className="border-none bg-white/40 text-rose-500 hover:bg-white/60 hover:text-rose-500"
              >
                <HeartIcon weight="fill" />
              </Button>
            </div>
          </div>
        }
      />

      {/* Tanpa tumpang tindih: -mt sebelumnya menutupi titik indikator carousel
          sehingga slider tidak terlihat sebagai slider. */}
      <div className="px-5 pt-3">
        <div className="flex items-start gap-3">
          <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
            <img src={logoUrl} alt={name} className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-start gap-1.5">
              <h1 className="font-heading text-lg font-extrabold leading-tight tracking-tight">
                {name}
              </h1>
              {isVerified && (
                <SealCheckIcon weight="fill" className="mt-0.5 size-4 shrink-0 text-info" />
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Badge className="rounded-full bg-primary/15 text-[11px] font-semibold text-primary">
                {category}
              </Badge>

              <div className="flex items-center gap-1">
                <StarIcon weight="fill" className="size-3.5 text-warning" />
                <span className="text-xs font-bold text-foreground">{rating}</span>
                <span className="text-xs text-muted-foreground">({reviews})</span>
              </div>
            </div>

            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPinIcon weight="fill" className="size-3.5 shrink-0" />
              <span className="truncate text-xs font-medium">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
