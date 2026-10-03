import { StarIcon, SealCheckIcon, MapPinIcon, MapTrifoldIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Link from "next/link"
import { GROUP, GROUP_MEMBERS, GROUP_TRIPS } from "@/lib/constants/group"

interface GuideGroup {
  id: string
  name: string
  description: string
  category: string
  customTags: string[]
  guideCount: number
  location: string
  totalJourneys: number
  rating: number
  reviews: number
  isVerified: boolean
  imageUrl: string
}

const GUIDE_GROUPS: GuideGroup[] = [{
  id: GROUP.id, name: GROUP.name, description: GROUP.description,
  category: GROUP.category, customTags: ["Pendakian", "Berkemah", "Gunung"], guideCount: GROUP_MEMBERS.length,
  location: GROUP.location, totalJourneys: GROUP_TRIPS.length,
  rating: GROUP.rating, reviews: GROUP.reviews, isVerified: GROUP.isVerified,
  imageUrl: GROUP.logoUrl,
}]

export function GuideGroups() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold text-foreground">Grup Pemandu Terbaik</h2>
      </div>
      <ScrollArea>
        <div className="flex gap-4 px-5 w-max pb-4">
          {GUIDE_GROUPS.map((group) => (
            <Link
              key={group.id}
              href={`/groups/${group.id}`}
              className="w-72 p-4 rounded-3xl border border-border bg-card shadow-md hover:bg-secondary transition cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div>
                  {/* Avatar placeholder with seal */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-success/20 overflow-hidden">
                      {group.imageUrl && <img src={group.imageUrl} alt={group.name} className="w-full h-full object-cover text-xs" />}
                    </div>
                    {group.isVerified && (
                      <div className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-info shadow-sm ring-1 ring-background">
                        <SealCheckIcon weight="fill" className="size-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className={cn(
                    'mt-2 grid w-max',
                    group.guideCount === 1 ? 'w-full grid-cols-1 place-items-center' : 'grid-cols-2',
                    group.guideCount > 2 && '-space-y-2'
                  )}>
                    {/* Mengambil maksimal 3 item pertama untuk ditampilkan sebagai lingkaran */}
                    {Array.from({ length: Math.min(3, group.guideCount) }).map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'relative w-6 h-6 rounded-full bg-muted border border-background overflow-hidden',
                          group.guideCount > 1 && (i % 2 === 0) && 'translate-x-1',
                          group.guideCount < 4 && i == 2 && 'translate-x-[55%]'
                        )}
                      >
                        <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="Pemandu contoh" className="w-full h-full object-cover text-xs" />
                      </div>
                    ))}

                    {group.guideCount > 4 ? (
                      <div className="relative w-6 h-6 rounded-full bg-primary border border-background flex items-center justify-center">
                        <span className="text-[11px] font-extrabold text-primary-foreground">
                          +{group.guideCount - 3}
                        </span>
                      </div>
                    ) : (
                      // Jika data pas 4, tampilkan satu lingkaran lagi (opsional, tergantung logika data Anda)
                      group.guideCount === 4 && (
                        <div className="relative w-6 h-6 rounded-full bg-muted border border-background overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" alt="Pemandu contoh" className="w-full h-full object-cover text-xs" />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Info Column */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="truncate font-heading text-[15px] font-bold text-foreground leading-tight">{group.name}</h3>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground leading-snug">{group.description}</p>
                  </div>

                  {/* Tags: Location & Journeys */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-foreground/80">
                    <div className="flex items-center gap-1">
                      <MapPinIcon weight="fill" className="text-muted-foreground" />
                      <span className="truncate">{group.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapTrifoldIcon weight="fill" className="text-muted-foreground" />
                      <span>{group.totalJourneys} trip contoh</span>
                    </div>
                  </div>

                  {/* Avatar Stack for Guides */}
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-primary text-xs">{group.category}</span>

                    <div className="flex items-center gap-1 text-[13px]">
                      <StarIcon weight="fill" className="text-warning text-[14px]" />
                      <span className="font-bold text-foreground">{group.rating}</span>
                      <span className="text-muted-foreground text-[11px]">({group.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className="my-2" />
              {/* Custom Tags */}
              <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                {group.customTags.map((tag) => (
                  <span key={tag} className="text-muted-foreground font-semibold px-2 py-0.5 rounded-md border border-border bg-background shadow-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
