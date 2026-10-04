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
  let iconBg = "bg-secondary text-primary"

  if (variant === "payment") {
    Icon = WalletIcon
    iconBg = "bg-secondary text-primary"
  } else if (variant === "verification") {
    Icon = SealCheckIcon
    iconBg = "bg-secondary text-primary"
  }

  return (
    <div className={cn("relative flex items-start gap-3 border-b border-border/70 px-1 py-5 transition-colors hover:bg-secondary/40", unread && "bg-primary/[0.025]")}>
      {unread && (
        <div className="absolute top-[18px] right-4 size-2 rounded-full bg-primary" />
      )}

      <div className={cn("size-10 shrink-0 rounded-[12px] flex items-center justify-center", iconBg)}>
        <Icon weight="regular" className="size-5" />
      </div>

      <div className="flex-1 min-w-0 pr-4">
        <h3 className="mb-1.5 font-heading text-[15px] font-semibold leading-snug tracking-tight">{title}</h3>
        <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}
