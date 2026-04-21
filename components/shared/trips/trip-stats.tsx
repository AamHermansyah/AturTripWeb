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
    <div className="bg-card rounded-4xl shadow-sm border border-border/80 overflow-hidden">
      <div className="grid grid-cols-2">
        {stats.map((stat, i) => {
          const isEvenTotal = stats.length % 2 === 0
          const itemsInLastRow = isEvenTotal ? 2 : 1
          const isLastRow = i >= stats.length - itemsInLastRow
          const isEvenCols = i % 2 === 0
          
          return (
            <div 
              key={i} 
              className={`p-4 sm:p-5 transition-colors ${!isLastRow ? 'border-b border-border/80' : ''} ${isEvenCols ? 'border-r border-border/80' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon weight={stat.iconWeight || "fill"} className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
                  <p className="text-[14px] font-extrabold text-foreground leading-none">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
