import { CalendarBlankIcon, WalletIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  variant: "booking" | "payment" | "verification"
  title: string
  description: React.ReactNode
  time: string
  unread?: boolean
}

export default function NotificationItem({ variant, title, description, time, unread }: NotificationItemProps) {
  let Icon = CalendarBlankIcon
  let iconBg = "bg-primary/20 text-primary"

  if (variant === "payment") {
    Icon = WalletIcon
    iconBg = "bg-primary/20 text-primary"
  } else if (variant === "verification") {
    Icon = SealCheckIcon
    iconBg = "bg-info text-info-foreground"
  }

  return (
    <div className="relative flex gap-4 p-4 rounded-4xl bg-card border border-border/50 items-start shadow-xs">
      {unread && (
        <div className="absolute top-[18px] right-4 size-2 rounded-full bg-primary" />
      )}

      <div className={cn("size-10 shrink-0 rounded-[12px] flex items-center justify-center", iconBg)}>
        <Icon weight="fill" className="size-5" />
      </div>

      <div className="flex-1 min-w-0 pr-4">
        <h3 className="font-heading font-extrabold text-[15px] leading-tight mb-1 text-foreground tracking-tight">{title}</h3>
        <p className="text-[13px] text-muted-foreground leading-snug mb-2 font-medium">{description}</p>
        <span className="text-xs text-muted-foreground/60 font-medium">{time}</span>
      </div>
    </div>
  )
}
