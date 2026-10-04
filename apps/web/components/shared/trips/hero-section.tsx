'use client'

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPinIcon, ArrowLeftIcon } from "@phosphor-icons/react"
import Link from "next/link"
import Image from "next/image"
import { SaveTripButton } from "./save-trip-button"
import { ShareTripButton } from "./share-trip-button"
import type { SavedTripPreview } from "./saved-preview-provider"

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"

interface HeroSectionProps {
  backButton?: boolean
  title?: string
  location?: string
  imageUrl?: string
  /** Chip tambahan di atas lokasi, mis. penanda "Trip Komunitas". */
  badge?: React.ReactNode
  /** Baris kecil di bawah judul, mis. "oleh Nusantara Trekkers". */
  subtitle?: string
  savedTrip?: SavedTripPreview
  backHref?: string
}

export function HeroSection({
  backButton,
  title = "Pendakian Gunung Rinjani dan Danau Segara Anak",
  location = "Nusa Tenggara Barat, Indonesia",
  imageUrl = DEFAULT_IMAGE,
  badge,
  subtitle,
  savedTrip,
  backHref = "/explore",
}: HeroSectionProps) {
  return (
    <header>
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
      <Image src={imageUrl} alt={title} fill sizes="(max-width: 430px) 100vw, 430px" priority unoptimized className="object-cover" />
      <div className={cn(
        'absolute top-0 inset-x-0 px-5 pt-[max(1rem,env(safe-area-inset-top))] flex items-center gap-3',
        backButton ? 'justify-between' : 'justify-end'
      )}>
        {backButton && (
          <Button
            variant="outline"
            size="icon"
            className="border-white/40 bg-zinc-950/65 text-white hover:bg-zinc-950/80 hover:text-white"
            asChild
            aria-label="Kembali"
          >
            <Link href={backHref}><ArrowLeftIcon weight="bold" /></Link>
          </Button>
        )}
        <div className="flex items-center gap-3">
          {savedTrip && <><ShareTripButton href={savedTrip.href} title={title} /><SaveTripButton trip={savedTrip} compact /></>}
        </div>
      </div>

      </div>
      <div className="flex flex-col gap-3 px-5 pt-6">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-4 shrink-0 text-primary" />
            <span>
              {location}
            </span>
          </div>
        <h1 className="font-heading text-[1.75rem] font-bold leading-[1.2] tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {badge && <div className="flex">{badge}</div>}
      </div>
    </header>
  )
}
