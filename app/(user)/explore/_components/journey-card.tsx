import { MapPinIcon, StarIcon } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export interface Journey {
  id: string
  title: string
  location: string
  rating: number
  reviews: number
  price: number
  days: number
  type: "Private" | "Shared"
}

export function JourneyCard({ journey }: { journey: Journey }) {
  const { title, location, rating, reviews, price, days, type } = journey

  return (
    <div className="w-60 p-3 shrink-0 overflow-hidden rounded-4xl border border-border bg-background shadow-md shadow-muted cursor-pointer hover:bg-secondary transition">
      {/* Image placeholder */}
      <AspectRatio ratio={16 / 9} className="relative w-full bg-success/30 rounded-3xl">
        <div className="absolute left-2 top-2">
          <Badge
            variant={type === "Private" ? "default" : "info"}
            className="rounded-full text-xs"
          >
            {type === "Private" ? "Privat" : "Bersama"}
          </Badge>
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm">
          <span className="size-2 rounded-full bg-success" />
          {days} Hari
        </div>
      </AspectRatio>

      {/* Info */}
      <div className="py-2">
        <p className="truncate text-[15px] font-bold text-foreground">{title}</p>
        <div className="mt-1 text-primary font-heading flex items-center gap-1 text-[13px]">
          <MapPinIcon weight="fill" />
          <span className="truncate">{location}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarIcon weight="fill" className="text-sm text-warning" />
            <span className="text-sm font-semibold text-foreground">{rating}</span>
            <sup className="text-xs text-muted-foreground">({reviews})</sup>
          </div>
          <span className="text-sm font-extrabold text-primary">
            Rp {price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  )
}
