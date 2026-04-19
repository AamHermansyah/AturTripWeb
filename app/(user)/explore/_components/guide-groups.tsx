import { UsersIcon, StarIcon } from "@phosphor-icons/react/dist/ssr"
import { Badge } from "@/components/ui/badge"

interface GuideGroup {
  id: string
  name: string
  description: string
  guideCount: number
  rating: number
  badge: "Pro Team" | "Certified" | null
}

const GUIDE_GROUPS: GuideGroup[] = [
  {
    id: "1",
    name: "Nusantara Trekkers",
    description: "Spesialis pendakian ketinggian & jalur vulkanik Jawa–Bali.",
    guideCount: 12,
    rating: 4.9,
    badge: "Pro Team",
  },
  {
    id: "2",
    name: "Arus Liar Co.",
    description: "Instruktur kayak dan arung jeram bersertifikat internasional.",
    guideCount: 8,
    rating: 4.7,
    badge: "Certified",
  },
  {
    id: "3",
    name: "Kota Tua Explorers",
    description: "Pemandu bersejarah untuk wisata budaya kota-kota tua Indonesia.",
    guideCount: 5,
    rating: 4.6,
    badge: null,
  },
]

export function GuideGroups() {
  return (
    <div className="pb-6">
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="text-base font-extrabold text-foreground">Grup Pemandu Terbaik</h2>
      </div>
      <div className="flex flex-col gap-3 px-5">
        {GUIDE_GROUPS.map((group, index) => (
          <div
            key={group.id}
            className="flex items-center gap-3 p-3 rounded-4xl border border-border bg-background shadow-md shadow-muted hover:bg-secondary transition cursor-pointer"
          >
            {/* Avatar placeholder */}
            <div className="w-14 h-14 shrink-0 rounded-full bg-success/30" />

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="flex-1 truncate text-[15px] font-bold text-foreground">{group.name}</p>
                {group.badge && (
                  <Badge
                    variant={group.badge === "Pro Team" ? "default" : "info"}
                    className="shrink-0 rounded-full text-xs"
                  >
                    {group.badge}
                  </Badge>
                )}
              </div>
              <p className="mt-0.5 truncate text-[13px] text-primary">{group.description}</p>
              <div className="mt-1.5 flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <UsersIcon weight="fill" />
                  <span>{group.guideCount} Pemandu</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <StarIcon weight="fill" className="text-warning" />
                  <span className="font-semibold text-foreground">{group.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
