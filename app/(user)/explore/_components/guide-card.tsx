import { StarIcon, SealCheckIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/ui/badge"

export interface Guide {
  id: string
  name: string
  specialty: string
  location: string
  rating: number
  reviewCount: number
  tags: string[]
  verified: boolean
}

export function GuideCard({ guide }: { guide: Guide }) {
  const { name, specialty, location, rating, reviewCount, tags, verified } = guide

  return (
    <div className="w-68 shrink-0 rounded-4xl border border-border bg-background p-4 shadow-md shadow-muted transition hover:bg-secondary cursor-pointer">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative mb-3 size-12">
          <div className="size-12 rounded-full bg-success/30" />
          {verified && (
            <div className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-info shadow-sm ring-1 ring-background">
              <SealCheckIcon weight="fill" className="size-3 text-white" />
            </div>
          )}
        </div>

        <div>
          {/* Info */}
          <p className="font-heading truncate text-[15px] font-semibold text-foreground">{name}</p>
          <p className="truncate text-[13px] text-muted-foreground">{specialty}</p>
          <div className="mt-0.5 flex items-center gap-0.5 text-muted-foreground">
            <MapPinIcon weight="fill" className="size-3 shrink-0 text-primary" />
            <span className="truncate text-xs">{location}</span>
          </div>

          {/* Rating */}
          <div className="mt-0.5 flex items-center gap-1">
            <StarIcon weight="fill" className="text-warning size-3" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <Badge key={tag} variant="default" className="bg-primary/30 rounded-full text-xs font-medium text-foreground/70">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
