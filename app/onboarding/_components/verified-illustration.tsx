import { StarIcon } from "@phosphor-icons/react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"

const guides = [
  { initials: "BS", name: "Budi Santoso", loc: "Bromo, Jawa Timur", rating: "4.9" },
  { initials: "RA", name: "Rani Astuti", loc: "Raja Ampat, Papua", rating: "5.0" },
  { initials: "DP", name: "Deni Pratama", loc: "Labuan Bajo, NTT", rating: "4.8" },
]

export function VerifiedIllustration() {
  return (
    <div className="overflow-hidden rounded-3xl bg-muted">
      <AspectRatio ratio={1}>
        <div className="flex h-full flex-col items-center justify-center gap-2.5 px-5">
          {guides.map((g, i) => (
            <div
              key={i}
              className="flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-muted-foreground">
                {g.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{g.name}</p>
                <p className="truncate text-xs text-muted-foreground">{g.loc}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <StarIcon weight="fill" className="h-3 w-3 text-amber-400" />
                  <span className="text-xs font-bold">{g.rating}</span>
                </div>
                <Badge className="h-4 border-0 bg-primary/10 px-1.5 py-0 text-[10px] text-primary hover:bg-primary/10">
                  Terverifikasi ✓
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </AspectRatio>
    </div>
  )
}
