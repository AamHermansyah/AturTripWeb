import { IconProps } from "@phosphor-icons/react"
import { ComponentType } from "react"

export interface ProfileStat {
  icon: ComponentType<IconProps>
  label: string
  value: string
}

export function ProfileStats({ stats }: { stats: ProfileStat[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1.5 rounded-3xl border border-border/80 bg-card p-3 text-center shadow-sm"
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
            <Icon weight="fill" className="size-4 text-primary" />
          </div>
          <p className="font-heading text-base font-extrabold leading-none text-foreground">
            {value}
          </p>
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}
