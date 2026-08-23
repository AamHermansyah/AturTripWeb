import { IconProps } from "@phosphor-icons/react"
import { ComponentType } from "react"
import { cn } from "@/lib/utils"

export interface TravelerBadge {
  icon: ComponentType<IconProps>
  label: string
  description: string
  /** Kelas warna latar + teks ikon, ditulis utuh agar terpindai Tailwind. */
  tone: string
}

export function TravelerBadges({ badges }: { badges: TravelerBadge[] }) {
  return (
    <div className="flex flex-col gap-2">
      {badges.map(({ icon: Icon, label, description, tone }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-3 shadow-xs"
        >
          <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-2xl", tone)}>
            <Icon weight="fill" className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold leading-tight">{label}</p>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
