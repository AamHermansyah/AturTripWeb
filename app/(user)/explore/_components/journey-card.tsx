import { BabyIcon, CalendarBlankIcon, HeartIcon, LineVerticalIcon, MapPinIcon, SealCheckIcon, StarIcon, StepsIcon, UserIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface Journey {
  id: string
  title: string
  category: string
  location: string
  rating: number
  reviews: number
  price: number
  duration: {
    type: "day" | "hour"
    value: number
  }
  type: "Private" | "Shared"
  level: string
  packageType: "per person" | "per group"
  minPersons?: number
  maxPersons?: number
  isWishlist: boolean
  isFamilyFriendly: boolean
  isVerified: boolean
}

export function JourneyCard({ journey }: { journey: Journey }) {
  const { title, category, location, rating, reviews, price, duration, type, level, packageType, minPersons, maxPersons, isWishlist, isFamilyFriendly, isVerified } = journey

  return (
    <div className="w-60 p-3 pb-1 shrink-0 overflow-hidden rounded-4xl border border-border bg-background shadow-md shadow-muted cursor-pointer hover:bg-secondary transition">
      <div className="flex flex-col h-full">
        {/* Image placeholder */}
        <div className="relative">
          <Link href="/trips/1">
            <AspectRatio ratio={16 / 9} className="w-full bg-success/30 rounded-3xl" />
          </Link>

          <Button variant="outline" size="icon" className="absolute top-2 right-2 text-rose-500 bg-white size-7 border-none hover:bg-rose-500 hover:text-white">
            <HeartIcon weight={isWishlist ? "fill" : "bold"} />
          </Button>

          <Badge className="absolute bottom-2 left-2 text-white bg-black/80 px-2 py-0.5 text-xs font-semibold backdrop-blur-sm flex items-center gap-1">
            <StarIcon weight="fill" className="text-xs text-warning" />
            <span className="font-semibold">{rating}</span>
            <span>({reviews})</span>
            {isVerified && <SealCheckIcon weight="fill" className="text-blue-500 text-[14px]" />}
          </Badge>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <h4 className="text-xs font-semibold text-primary uppercase">
              {category}
            </h4>
            <Link href="/trips/1">
              <p className="line-clamp-2 font-heading text-[15px] font-semibold text-foreground leading-5 hover:text-primary transition">
                {title}
              </p>
            </Link>
            <div className="flex flex-wrap gap-x-2 text-muted-foreground">
              <div className="mt-1 font-heading flex items-center gap-1 text-[13px] leading-4">
                <MapPinIcon weight="fill" />
                <span className="truncate">{location}</span>
              </div>
              <div className="mt-1 font-heading flex items-center gap-1 text-[13px] leading-4">
                <CalendarBlankIcon weight="fill" />
                <span className="truncate">{duration.value} {duration.type === "day" ? "Hari" : "Jam"}</span>
              </div>
              {packageType === "per group" && (
                <div className="mt-1 font-heading flex items-center gap-1 text-[13px] leading-4">
                  <UsersIcon weight="fill" />
                  <span className="truncate">
                    {minPersons}-{maxPersons} org
                  </span>
                </div>
              )}
              <div className="mt-1 font-heading flex items-center gap-1 text-[13px] leading-4">
                <StepsIcon weight="fill" />
                <span className="truncate">{level}</span>
              </div>
              {isFamilyFriendly && (
                <div className="mt-1 font-heading flex items-center gap-1 text-[13px] leading-4">
                  <BabyIcon weight="fill" />
                  <span className="truncate">Ramah Keluarga</span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 w-full flex items-center justify-between gap-2">
            <Badge
              variant={type === "Private" ? "default" : "info"}
              className="rounded-full text-xs"
            >
              {type}
            </Badge>
            <div className="mt-2 text-right">
              <p className="text-sm font-extrabold text-primary leading-1">
                Rp {price.toLocaleString("id-ID")}
              </p>
              <span className="text-xs text-muted-foreground leading-0">
                {packageType === "per person" ? "per orang" : "per grup"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
