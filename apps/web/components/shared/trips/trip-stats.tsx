import { IconProps } from "@phosphor-icons/react"
import { ComponentType } from "react"

export interface TripStatItem {
  icon: ComponentType<IconProps>
  label: string
  value: string
  iconWeight?: IconProps["weight"]
}

interface TripStatsProps {
  stats: TripStatItem[]
}

export function TripStats({ stats }: TripStatsProps) {
  return (
    <div className="border-y border-border/80 py-4">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {stats.map((stat, i) => {
          return (
            <div 
              key={i} 
              className="min-w-0"
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  <stat.icon weight={stat.iconWeight || "regular"} className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground leading-none mb-1.5">{stat.label}</p>
                  <p className="text-sm font-semibold leading-snug">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
