import { StarIcon, SealCheckIcon, MapPinIcon, MapTrifoldIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
}

const GUIDE_GROUPS: GuideGroup[] = [
  {
    id: "1",
    name: "Nusantara Trekkers",
    description: "Spesialis pendakian ketinggian & jalur vulkanik Jawa–Bali.",
    category: "Petualangan",
    customTags: ["Pendakian", "Camping", "Gunung"],
    guideCount: 12,
    location: "Malang, Jatim",
    totalJourneys: 45,
    rating: 4.9,
    reviews: 128,
    isVerified: true,
  },
  {
    id: "2",
    name: "Arus Liar Co.",
    description: "Instruktur kayak dan arung jeram bersertifikat internasional.",
    category: "Olahraga Air",
    customTags: ["Arung Jeram", "Kayak", "Sungai"],
    guideCount: 4,
    location: "Sukabumi, Jabar",
    totalJourneys: 24,
    rating: 4.7,
    reviews: 89,
    isVerified: true,
  },
  {
    id: "3",
    name: "Kota Tua Explorers",
    description: "Pemandu bersejarah untuk wisata budaya kota-kota tua Indonesia.",
    category: "Tur Budaya",
    customTags: ["Sejarah", "Museum", "City Tour"],
    guideCount: 3,
    location: "Jakarta Barat",
    totalJourneys: 18,
    rating: 4.6,
    reviews: 56,
    isVerified: false,
  },
  {
    id: "4",
    name: "Kota Tua Explorers",
    description: "Pemandu bersejarah untuk wisata budaya kota-kota tua Indonesia.",
    category: "Tur Budaya",
    customTags: ["Sejarah", "Museum", "City Tour"],
    guideCount: 1,
    location: "Jakarta Barat",
    totalJourneys: 18,
    rating: 4.6,
    reviews: 56,
    isVerified: false,
  },
]

export function GuideGroups() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold text-foreground">Grup Pemandu Terbaik</h2>
      </div>
      <ScrollArea>
        <div className="flex gap-4 px-5 w-max pb-4">
          {GUIDE_GROUPS.map((group) => (
            <div
              key={group.id}
              className="w-72 p-4 rounded-3xl border border-border bg-background shadow-sm hover:shadow-md hover:bg-secondary transition cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div>
                  {/* Avatar placeholder with seal */}
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-success/20" />
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
                          'w-6 h-6 rounded-full bg-muted border border-background',
                          group.guideCount > 1 && (i % 2 === 0) && 'translate-x-1',
                          group.guideCount < 4 && i == 2 && 'translate-x-[55%]'
                        )}
                      />
                    ))}

                    {group.guideCount > 4 ? (
                      <div className="w-6 h-6 rounded-full bg-muted border border-background flex items-center justify-center">
                        <span className="text-[9px] font-extrabold text-muted-foreground">
                          +{group.guideCount - 4}
                        </span>
                      </div>
                    ) : (
                      // Jika data pas 4, tampilkan satu lingkaran lagi (opsional, tergantung logika data Anda)
                      group.guideCount === 4 && (
                        <div className="w-6 h-6 rounded-full bg-muted border border-background" />
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
                      <span>{group.totalJourneys} Perjalanan</span>
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
              <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
                {group.customTags.map((tag) => (
                  <span key={tag} className="text-muted-foreground font-semibold px-2 py-0.5 rounded-full border border-border bg-background shadow-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
