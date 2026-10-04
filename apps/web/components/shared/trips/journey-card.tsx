import { BabyIcon, CalendarBlankIcon, MapPinAreaIcon, MapPinIcon, SealCheckIcon, StarIcon, StepsIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import { SaveTripButton } from "./save-trip-button"
import Link from "next/link"
import { cn } from "@/lib/utils"

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
  imageUrl: string
  radius?: number
  /** Trip komunitas bisa dipandu beberapa anggota sekaligus. */
  guides?: { id: string; name: string; imageUrl: string }[]
}

const JOURNEY_TYPE_LABEL: Record<Journey["type"], string> = {
  Private: "Privat",
  Shared: "Sharing",
}

interface JourneyCardProps {
  journey: Journey
  /** Default-nya /trips/[id]; trip komunitas mengarah ke rute grupnya. */
  href?: string
  className?: string
}

export function JourneyCard({ journey, href, className }: JourneyCardProps) {
  const {
    id,
    title,
    category,
    location,
    rating,
    reviews,
    price,
    duration,
    type,
    level,
    packageType,
    minPersons,
    maxPersons,
    isFamilyFriendly,
    isVerified,
    imageUrl,
    radius,
    guides,
  } = journey

  const detailHref = href ?? `/trips/${id}`

  return (
    <div
      className={cn(
        "group/journey w-64 min-w-0 shrink-0",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          <Link href={detailHref} className="block h-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring">
              {imageUrl && <Image src={imageUrl} alt={title} fill sizes="(max-width: 430px) 90vw, 390px" unoptimized className="object-cover transition-transform duration-300 motion-safe:group-hover/journey:scale-[1.025]" />}
          </Link>

          <SaveTripButton trip={{ href: detailHref, journey }} compact className="absolute top-3 right-3 size-9" />
        </div>

        <div className="flex flex-1 flex-col justify-between pt-3 pb-2">
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-2 text-xs"><span className="font-medium text-primary">{category}</span><span className="inline-flex shrink-0 items-center gap-1"><StarIcon weight="fill" className="size-3.5 text-primary" /><span className="font-semibold">{rating}</span><span className="text-muted-foreground">({reviews})</span></span></div>
            <Link href={detailHref}>
              <h3 className="line-clamp-2 min-h-11 font-heading text-base font-semibold leading-snug transition-colors hover:text-primary">
                {title}
              </h3>
            </Link>
            <div className="flex flex-wrap gap-x-2 text-muted-foreground">
              <div className="mt-2 flex w-full min-w-0 items-center gap-1 text-xs leading-5">
                <MapPinIcon className="shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs leading-5">
                <CalendarBlankIcon />
                <span className="truncate">{duration.value} {duration.type === "day" ? "Hari" : "Jam"}</span>
              </div>
              {packageType === "per group" && (
                <div className="mt-1 flex items-center gap-1 text-xs leading-5">
                  <UsersIcon />
                  <span className="truncate">
                    {minPersons}-{maxPersons} org
                  </span>
                </div>
              )}
              <div className="mt-1 flex items-center gap-1 text-xs leading-5">
                <StepsIcon />
                <span className="truncate">{level}</span>
              </div>
              {isFamilyFriendly && (
                <div className="mt-1 flex items-center gap-1 text-xs leading-5">
                  <BabyIcon />
                  <span className="truncate">Ramah Keluarga</span>
                </div>
              )}
              {radius && <span className="mt-1 inline-flex items-center gap-1 text-xs leading-5"><MapPinAreaIcon />{radius} km</span>}
            </div>
            {guides && guides.length > 0 && (
              <div className="mt-2 flex items-center gap-1.5">
                <div className="flex items-center">
                  {guides.slice(0, 3).map((guide, i) => (
                    <Image
                      key={guide.id}
                      src={guide.imageUrl}
                      alt={guide.name}
                      width={20}
                      height={20}
                      unoptimized
                      className={cn(
                        "size-5 rounded-full border border-background object-cover",
                        i > 0 && "-ml-2"
                      )}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {guides.length} pemandu
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 flex w-full items-end justify-between gap-2 border-t border-border/70 pt-3">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">{JOURNEY_TYPE_LABEL[type]}{isVerified && <SealCheckIcon weight="fill" className="size-4 text-primary" aria-label="Pemandu contoh terverifikasi" />}</span>
            <div className="text-right">
              <p className="text-base font-bold leading-6">
                Rp {price.toLocaleString("id-ID")}
              </p>
              <span className="text-xs leading-5 text-muted-foreground">
                {packageType === "per person" ? "per orang" : "per grup"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
